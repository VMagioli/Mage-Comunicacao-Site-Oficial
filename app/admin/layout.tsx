import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FileText, FolderKanban, PlusCircle, ExternalLink, LogOut } from 'lucide-react';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { verificarSeEhAdmin } from '@/lib/admin-auth';
import { sairAdminAction } from './posts-actions';

export const metadata: Metadata = {
  title: 'MAGE Studio — Gestão do Site',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/admin');
  }

  if (!verificarSeEhAdmin(user.email)) {
    redirect('/login?error=unauthorized');
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans selection:bg-blue-500/30">
      <header className="border-b border-white/5 bg-[#0F1424]/90 backdrop-blur-md sticky top-0 z-50 px-4 sm:px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center font-bold text-white tracking-wider text-sm shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                M
              </div>
              <div>
                <div className="text-sm font-semibold tracking-tight text-white">MAGE Studio</div>
                <p className="text-[10px] text-emerald-400 font-mono tracking-wider uppercase">
                  // Gestão do Site
                </p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-2 text-xs">
              <Link
                href="/admin"
                className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors inline-flex items-center gap-1.5"
              >
                <FileText size={14} className="text-blue-400" />
                Conteúdos
              </Link>
              <Link
                href="/admin/projetos"
                className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors inline-flex items-center gap-1.5"
              >
                <FolderKanban size={14} className="text-purple-400" />
                Projetos & Cases
              </Link>
              <Link
                href="/admin/novo"
                className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors inline-flex items-center gap-1.5"
              >
                <PlusCircle size={14} className="text-emerald-400" />
                Novo Conteúdo
              </Link>
              <Link
                href="/"
                target="_blank"
                className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors inline-flex items-center gap-1.5"
              >
                Ver Site
                <ExternalLink size={12} />
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="hidden sm:inline text-slate-400 font-mono text-[11px]">
              {user.email}
            </span>
            <form action={sairAdminAction}>
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-red-500/15 border border-white/10 hover:border-red-500/30 text-slate-300 hover:text-red-300 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut size={13} />
                <span>Sair</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto">{children}</main>
    </div>
  );
}
