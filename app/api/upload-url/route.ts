import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Re‐usable R2 client (S3-compatible)
const r2 = new S3Client({
  region: process.env.R2_REGION!,
  endpoint: process.env.R2_ENDPOINT!,      // ex.: https://<account-id>.r2.cloudflarestorage.com
  credentials: {
    accessKeyId:     process.env.R2_ACCESS_KEY!,
    secretAccessKey: process.env.R2_SECRET_KEY!,
  },
  forcePathStyle: true,                    // necessário para Cloudflare R2
});

export async function POST(request: NextRequest) {
  /** ───────────────── Validar sessão Supabase ───────────────── */
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } },
  );

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  /** ───────────────── Extrair dados do body ─────────────────── */
  const { fileName, fileType } = await request.json();
  if (!fileName || !fileType) {
    return NextResponse.json({ error: 'fileName e fileType são obrigatórios.' }, { status: 400 });
  }

  /** ───────────────── Gerar chave segura no bucket ───────────── */
  const sanitizedName  = fileName.replace(/[^a-zA-Z0-9_.-]/g, '_');
  const timestamp      = Date.now();
  const fileKey        = `${session.user.id}/${timestamp}-${sanitizedName}`;

  /** ───────────────── Signed URL de upload (15 min) ──────────── */
  const putCommand     = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET!,
    Key:    fileKey,
    ContentType: fileType,
  });

  const signedUrl = await getSignedUrl(r2, putCommand, { expiresIn: 60 * 15 }); // 15 min

  return NextResponse.json({ signedUrl, fileKey }, { status: 200 });
}
