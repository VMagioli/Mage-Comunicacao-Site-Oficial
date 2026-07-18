import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

import { verificarSeEhAdmin } from '@/lib/admin-auth';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();

    const supabaseAuth = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
        },
      }
    );

    // Valida o usuário autenticado diretamente com o Supabase.
    const {
      data: { user },
      error: authError,
    } = await supabaseAuth.auth.getUser();

    console.log('🕵️ DEBUG API - Email logado:', user?.email);

    if (authError) {
      console.error(
        '🕵️ DEBUG API - Erro de autenticação:',
        authError.message
      );

      return NextResponse.json(
        { error: 'Não foi possível validar sua autenticação.' },
        { status: 401 }
      );
    }

    const emailLogado = user?.email?.trim().toLowerCase() ?? '';

    // A lista de administradores agora fica centralizada em lib/admin-auth.ts.
    if (!user || !verificarSeEhAdmin(emailLogado)) {
      console.warn(
        `🚨 BLOQUEADO: O e-mail '${emailLogado || 'Nenhum'}' tentou cadastrar um cliente.`
      );

      return NextResponse.json(
        {
          error: `Acesso negado. O servidor identificou o e-mail: ${
            emailLogado || 'Nenhum'
          }`,
        },
        { status: 403 }
      );
    }

    const body = await request.json();

    const {
      email,
      nome_empresa,
      pacote_foundation,
      pacote_management,
      pacote_authority,
      url_google_drive,
      google_drive_link,
      tempo_permanencia_meses,
    } = body;

    const emailCliente =
      typeof email === 'string' ? email.trim().toLowerCase() : '';

    const nomeEmpresa =
      typeof nome_empresa === 'string' ? nome_empresa.trim() : '';

    if (!emailCliente || !nomeEmpresa) {
      return NextResponse.json(
        { error: 'E-mail e nome da empresa são obrigatórios.' },
        { status: 400 }
      );
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    /*
     * Primeiro cria o usuário no Supabase Auth.
     */
    const { data: inviteData, error: inviteError } =
      await supabaseAdmin.auth.admin.inviteUserByEmail(emailCliente);

    if (inviteError) {
      throw new Error(`Erro ao convidar cliente: ${inviteError.message}`);
    }

    const usuarioConvidado = inviteData.user;

    if (!usuarioConvidado?.id) {
      throw new Error(
        'O Supabase enviou o convite, mas não retornou o ID do usuário.'
      );
    }

    /*
     * Depois tenta criar o registro correspondente na tabela clientes.
     */
    const { error: dbError } = await supabaseAdmin
      .from('clientes')
      .insert({
        id: usuarioConvidado.id,
        email: emailCliente,
        nome_empresa: nomeEmpresa,
        pacote_foundation: Boolean(pacote_foundation),
        pacote_management: Boolean(pacote_management),
        pacote_authority: Boolean(pacote_authority),
        google_drive_link:
          google_drive_link?.trim?.() ||
          url_google_drive?.trim?.() ||
          '',
        tempo_permanencia_meses: tempo_permanencia_meses ?? 12,
      });

    if (dbError) {
      console.error(
        '🚨 Erro ao inserir cliente. Iniciando rollback do usuário:',
        {
          userId: usuarioConvidado.id,
          dbError: dbError.message,
        }
      );

      /*
       * ROLLBACK:
       * Se o usuário foi criado no Auth, mas o registro em clientes falhou,
       * remove o usuário para evitar registros órfãos.
       */
      const { error: rollbackError } =
        await supabaseAdmin.auth.admin.deleteUser(usuarioConvidado.id);

      if (rollbackError) {
        console.error(
          '🚨 O insert falhou e o rollback também falhou:',
          {
            userId: usuarioConvidado.id,
            dbError: dbError.message,
            rollbackError: rollbackError.message,
          }
        );

        throw new Error(
          `Erro ao salvar o cliente no banco: ${dbError.message}. ` +
            `Além disso, não foi possível remover o usuário criado: ${rollbackError.message}`
        );
      }

      console.log(
        `✅ Rollback concluído: usuário ${usuarioConvidado.id} removido do Auth.`
      );

      throw new Error(`Erro ao salvar o cliente no banco: ${dbError.message}`);
    }

    return NextResponse.json(
      {
        message: 'Cliente cadastrado com sucesso!',
        cliente: {
          id: usuarioConvidado.id,
          email: emailCliente,
          nome_empresa: nomeEmpresa,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('🚨 FALHA NA API DE NOVO CLIENTE:', error);

    const mensagem =
      error instanceof Error
        ? error.message
        : 'Ocorreu um erro inesperado ao cadastrar o cliente.';

    return NextResponse.json({ error: mensagem }, { status: 500 });
  }
}