"use server";

import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export async function obterTodosClientesAction() {
  try {
    // 1. Validar se quem está chamando é um admin
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
    
    const adminsAutorizados = [
      'magioli@magecomunicacao.com.br', 
      'vitor@magecomunicacao.com.br',
      'lana@magecomunicacao.com.br'
    ];

    const emailLogado = user?.email?.toLowerCase() ?? '';

    if (!user || !adminsAutorizados.includes(emailLogado)) {
      return { success: false, error: 'Acesso negado. Apenas administradores autorizados.' };
    }

    // 2. Buscar todos os clientes usando o cliente Admin
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: { autoRefreshToken: false, persistSession: false }
      }
    );

    const { data: databaseClientes, error: dbError } = await supabaseAdmin
      .from('clientes')
      .select('*')
      .order('created_at', { ascending: false });

    if (dbError) {
      return { success: false, error: dbError.message };
    }

    return { success: true, clientes: databaseClientes };

  } catch (err: any) {
    return { success: false, error: err.message || 'Erro interno no servidor.' };
  }
}
