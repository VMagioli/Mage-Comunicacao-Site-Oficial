import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const supabaseAuth = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll() }
        }
      }
    );

    // CORREÇÃO: Usar getUser() em vez de getSession() para rotas de API no Next.js 15
    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser();
    
    // DEBUG: Imprime no terminal do VS Code quem o servidor acha que está logado
    console.log("🕵️ DEBUG API - Email Logado:", user?.email);
    if (authError) console.log("🕵️ DEBUG API - Erro de Auth:", authError.message);

    // LISTA VIP (Certifique-se de preencher corretamente aqui)
    const adminsAutorizados = [
      'vitor@magecomunicacao.com.br', 
      'lana@magecomunicacao.com.br',
    ];
    
    const emailLogado = user?.email?.toLowerCase() ?? '';

    // Se falhar, a API agora vai te avisar exatamente O POR QUÊ falhou no balão de erro
    if (!user || !adminsAutorizados.includes(emailLogado)) {
      console.log(`🚨 BLOQUEADO: O email '${emailLogado}' tentou acessar, mas não está na lista.`);
      return NextResponse.json({ 
        error: `Acesso Negado. O servidor identificou o email: ${emailLogado || 'Nenhum'}` 
      }, { status: 403 });
    }

    const { 
      email, 
      nome_empresa,
      pacote_foundation,
      pacote_management,
      pacote_authority,
      url_google_drive,
      google_drive_link,
      tempo_permanencia_meses 
    } = await request.json();

    if (!email || !nome_empresa) {
      return NextResponse.json({ error: 'E-mail e nome da empresa são obrigatórios.' }, { status: 400 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: { autoRefreshToken: false, persistSession: false }
      }
    );

    const { data: inviteData, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email);

    if (inviteError) throw new Error(`Erro ao convidar: ${inviteError.message}`);

    const { error: dbError } = await supabaseAdmin
      .from('clientes')
      .insert({
        id: inviteData.user.id,
        email: email,
        nome_empresa: nome_empresa,
        pacote_foundation: !!pacote_foundation,
        pacote_management: !!pacote_management,
        pacote_authority: !!pacote_authority,
        google_drive_link: google_drive_link || url_google_drive || '',
        tempo_permanencia_meses: tempo_permanencia_meses ?? 12
      });

    if (dbError) throw new Error(`Erro ao salvar no banco: ${dbError.message}`);

    return NextResponse.json({ message: 'Cliente cadastrado com sucesso!' }, { status: 200 });

  } catch (error: any) {
    console.error("🚨 FALHA NA API DE NOVO CLIENTE:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}