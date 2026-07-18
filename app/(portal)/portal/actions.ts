"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

// Inicializa a conexão com o Cloudflare R2
const S3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function gerarUrlDeUpload(fileName: string, fileType: string) {
  try {
    // 1. Identifica de qual cliente é esse arquivo
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { getAll() { return cookieStore.getAll(); } } }
    );

    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error("Sessão expirada. Faça login novamente.");
    }

    const clienteId = session.user.id;

    // 2. CRIA A ESTRUTURA DE PASTAS MÁGICA NO R2
    // Ficará assim: uuid-do-cliente/brandbook/16892394-logo.png
    const timestamp = Date.now();
    const nomeLimpo = fileName.replace(/[^a-zA-Z0-9.-]/g, '_'); // Evita acentos e espaços quebrando a URL
    const fileKey = `${clienteId}/brandbook/${timestamp}-${nomeLimpo}`;

    // 3. Gera o passe livre (URL Assinada) válido por apenas 60 segundos
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: fileKey,
      ContentType: fileType,
    });

    const signedUrl = await getSignedUrl(S3, command, { expiresIn: 60 });
    const publicUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${fileKey}`;

    return { success: true, signedUrl, publicUrl, fileKey };
  } catch (error: any) {
    console.error("Erro ao gerar URL do R2:", error);
    return { success: false, error: error.message };
  }
}

export async function registrarArquivoAction(fileName: string, publicUrl: string) {
  try {
    const cookieStore = await cookies();
    const supabaseAuth = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { getAll() { return cookieStore.getAll(); } } }
    );

    const { data: { session } } = await supabaseAuth.auth.getSession();
    
    if (!session) {
      throw new Error("Sessão expirada. Faça login novamente.");
    }

    const clienteId = session.user.id;

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: { autoRefreshToken: false, persistSession: false }
      }
    );

    const { error: dbError } = await supabaseAdmin
      .from('arquivos_clientes')
      .insert({
        cliente_id: clienteId,
        nome_arquivo: fileName,
        url_publica: publicUrl
      });

    if (dbError) {
      throw new Error(dbError.message);
    }

    return { success: true };
  } catch (error: any) {
    console.error("Erro ao registrar arquivo no banco:", error);
    return { success: false, error: error.message };
  }
}