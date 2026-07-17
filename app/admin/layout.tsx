import { redirect } from 'next/navigation';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  
  const supabase = createServerClient(
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

  const { data: { session } } = await supabase.auth.getSession();

  // Se não tem ninguém logado, manda pro login com parâmetro next
  if (!session) {
    redirect('/login?next=/admin');
  }

  // Lista VIP de acessos (Aqui entram os e-mails corporativos de vocês)
  const adminsAutorizados = [
    'vitor@magecomunicacao.com.br', 
    'lana@magecomunicacao.com.br' // Altere para o e-mail real da Lana
  ];
  const emailLogado = session.user.email?.toLowerCase() ?? '';

  // Se o e-mail logado não for um de vocês, expulsa de volta para o portal de cliente
  if (!adminsAutorizados.includes(emailLogado)) {
    redirect('/portal');
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans selection:bg-blue-500/30">
      {/* Header Fixo do Admin */}
      <header className="border-b border-white/5 bg-[#0F1424]/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-[#0B0F19] tracking-wider text-sm shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            M
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-tight text-white">MAGE Backoffice</h1>
            <p className="text-[10px] text-emerald-500 font-mono tracking-wider uppercase">// Acesso Administrativo</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
          <span>{session.user.email}</span>
        </div>
      </header>

      {/* Conteúdo da Página Admin */}
      <main className="p-6 md:p-10 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}