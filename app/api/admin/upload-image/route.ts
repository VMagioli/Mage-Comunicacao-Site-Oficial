import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { verificarSeEhAdmin } from '@/lib/admin-auth';
import { getAdminSupabase } from '@/src/lib/posts';

const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
]);
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
const BUCKET_NAME = 'blog-covers';

export async function POST(request: Request) {
  try {
    const supabaseAuth = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabaseAuth.auth.getUser();

    if (!user || !verificarSeEhAdmin(user.email)) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const rawFolder = (formData.get('folder') as string | null) || 'conteudos';
    const folder = rawFolder === 'cases' ? 'cases' : 'conteudos';

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado.' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: 'Formato inválido. Envie JPG, PNG, WebP, AVIF ou GIF.' },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: 'A imagem deve ter no máximo 10 MB.' },
        { status: 400 }
      );
    }

    const supabaseAdmin = getAdminSupabase();
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Configuração do Supabase ausente no servidor.' },
        { status: 500 }
      );
    }

    // Garante que o bucket exista caso ainda não tenha sido criado manualmente
    const { data: buckets } = await supabaseAdmin.storage.listBuckets();
    const bucketExists = buckets?.some((b) => b.id === BUCKET_NAME);
    if (!bucketExists) {
      await supabaseAdmin.storage.createBucket(BUCKET_NAME, {
        public: true,
        fileSizeLimit: MAX_SIZE_BYTES,
      });
    }

    const ext = file.name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'webp';
    const safeBase = file.name
      .replace(/\.[^.]+$/, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 40) || 'imagem';

    const filePath = `${folder}/${Date.now()}-${safeBase}.${ext}`;
    const arrayBuffer = await file.arrayBuffer();

    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .upload(filePath, Buffer.from(arrayBuffer), {
        contentType: file.type,
        cacheControl: '31536000',
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: `Erro ao enviar imagem para o Supabase: ${uploadError.message}` },
        { status: 500 }
      );
    }

    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from(BUCKET_NAME).getPublicUrl(filePath);

    return NextResponse.json({ url: publicUrl });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Erro inesperado ao enviar imagem.' },
      { status: 500 }
    );
  }
}

