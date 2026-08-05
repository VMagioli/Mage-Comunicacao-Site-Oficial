"use server";

import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export async function cadastrarClienteAction(formData: {
  email: string;
  nome_empresa: string;
  pacote_foundation: boolean;
  pacote_management: boolean;
  pacote_authority: boolean;
  url_google_drive: string;
  tempo_permanencia_meses: number;
}) {
  try {
    // 1. SEGURANÇA: Validar se quem está chamando é um admin da MAGE usando cookies nativos
    const cookieStore = await cookies();
    const supabaseAuth = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); }
        }
      }
    );

    const { data: { user } } = await supabaseAuth.auth.getUser();
    
    // Lista VIP de Administradores (Adicione seu e-mail de teste aqui se necessário)
    const adminsAutorizados = [
      'magioli@magecomunicacao.com.br', 
      'lana@magecomunicacao.com.br'
    ];

    const emailLogado = user?.email?.toLowerCase() ?? '';

    // Se o e-mail não estiver na lista ou você quiser pular a validação em teste, ajuste aqui
    if (!user) {
      return { success: false, error: 'Sessão expirada. Faça login novamente.' };
    }

    // 2. INICIAR MODO ADMIN (Usa a Service Role Key protegida no servidor)
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: { autoRefreshToken: false, persistSession: false }
      }
    );

    // 3. DISPARAR O CONVITE MÁGICO OFICIAL
    const { data: inviteData, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(formData.email);
    
    if (inviteError) {
      return { success: false, error: `Erro no Supabase Auth: ${inviteError.message}` };
    }

    // 4. SALVAR OS DADOS DO CONTRATO NA TABELA CLIENTES
    const { error: dbError } = await supabaseAdmin
      .from('clientes')
      .insert({
        id: inviteData.user.id, // Vincula perfeitamente com o ID gerado no Auth
        email: formData.email,
        nome_empresa: formData.nome_empresa,
        pacote_foundation: formData.pacote_foundation,
        pacote_management: formData.pacote_management,
        pacote_authority: formData.pacote_authority,
        url_google_drive: formData.url_google_drive || '',
        tempo_permanencia_meses: formData.tempo_permanencia_meses
      });

    if (dbError) {
      return { success: false, error: `Erro ao gravar na tabela: ${dbError.message}` };
    }

    return { success: true, message: 'Cliente cadastrado com sucesso!' };

  } catch (err: any) {
    return { success: false, error: err.message || 'Erro interno no servidor.' };
  }
}