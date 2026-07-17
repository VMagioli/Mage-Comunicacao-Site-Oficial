"use server";

import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export async function completarPrimeiroAcessoAction() {
  try {
    // 1. Obter o usuário logado a partir dos cookies da requisição
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

    if (!user) {
      return { success: false, error: 'Sessão expirada ou usuário não autenticado.' };
    }

    // 2. Inicializar o cliente Admin para atualizar o status do primeiro acesso no banco
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: { autoRefreshToken: false, persistSession: false }
      }
    );

    const { error: dbError } = await supabaseAdmin
      .from('clientes')
      .update({ precisa_mudar_senha: false })
      .eq('id', user.id);

    if (dbError) {
      return { success: false, error: `Erro ao gravar status no banco: ${dbError.message}` };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Erro interno no servidor.' };
  }
}

export async function obterPerfilClienteAction() {
  try {
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

    if (!user) {
      return { success: false, error: 'Usuário não autenticado.' };
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: { autoRefreshToken: false, persistSession: false }
      }
    );

    const { data: profile, error: dbError } = await supabaseAdmin
      .from('clientes')
      .select('*')
      .eq('id', user.id)
      .single();

    if (dbError) {
      return { success: false, error: dbError.message };
    }

    return { success: true, profile };
  } catch (err: any) {
    return { success: false, error: err.message || 'Erro interno no servidor.' };
  }
}
