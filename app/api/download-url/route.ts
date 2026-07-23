import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const r2 = new S3Client({
  region: process.env.R2_REGION!,
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId:     process.env.R2_ACCESS_KEY!,
    secretAccessKey: process.env.R2_SECRET_KEY!,
  },
  forcePathStyle: true,
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

  /** ───────────────── Extrair fileKey do body ───────────────── */
  const { fileKey } = await request.json();
  if (!fileKey) {
    return NextResponse.json({ error: 'fileKey é obrigatório.' }, { status: 400 });
  }

  /** ───────────────── Signed URL de download (1 h) ───────────── */
  const getCommand = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET!,
    Key:    fileKey,
  });

  const signedUrl = await getSignedUrl(r2, getCommand, { expiresIn: 60 * 60 }); // 1 hora

  return NextResponse.json({ signedUrl }, { status: 200 });
}
