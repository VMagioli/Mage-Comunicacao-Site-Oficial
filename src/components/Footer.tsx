import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, HelpCircle } from 'lucide-react';
import { ThreadsIcon } from '@/src/components/icons/ThreadsIcon';

export function Footer() {
  return (
    <footer className="mt-auto py-8 px-4 md:px-8 border-t border-white/5 bg-[#0B0F14]/40 backdrop-blur-sm relative z-20">
      <div className="max-w-6xl w-full mx-auto flex flex-col gap-6">
        {/* Top Row: Quick internal navigation for crawlers and users */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-white/5">
          <div className="text-xs text-slate-400 text-center md:text-left">
            <span className="text-white font-semibold tracking-widest uppercase">MAGE Comunicação</span>
            <span className="mx-2 text-slate-600">•</span>
            <span>Sites, Redes Sociais e SEO • Atendimento nacional e internacional</span>
          </div>

          <nav aria-label="Links do rodapé" className="flex items-center gap-5 text-xs text-slate-400 flex-wrap justify-center">
            <Link href="/" className="hover:text-white transition-colors">
              Início
            </Link>
            <Link href="/servicos" className="hover:text-white transition-colors">
              Serviços
            </Link>
            <Link href="/projetos" className="hover:text-white transition-colors">
              Projetos
            </Link>
            <Link href="/conteudos" className="hover:text-white transition-colors">
              Conteúdos
            </Link>
            <Link href="/sobre" className="hover:text-white transition-colors">
              Sobre nós
            </Link>
            <Link href="/contato" className="hover:text-white transition-colors">
              Contato
            </Link>
          </nav>
        </div>

        {/* Bottom Row: Copyright, Socials & Legal */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[11px] font-mono text-slate-400 tracking-wider text-center md:text-left">
            © {new Date().getFullYear()} MAGE COMUNICAÇÃO. TODOS OS DIREITOS RESERVADOS.
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/magecomunicacao/"
              className="text-slate-400 hover:text-white p-1 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da MAGE"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://www.threads.com/@magecomunicacao"
              className="text-slate-400 hover:text-white p-1 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Threads da MAGE"
            >
              <ThreadsIcon size={16} />
            </a>
            <a
              href="https://www.facebook.com/magecomunicacao"
              className="text-slate-400 hover:text-white p-1 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook da MAGE"
            >
              <Facebook size={16} />
            </a>
          </div>

          <div className="flex items-center gap-5 sm:gap-6 text-[11px] font-mono flex-wrap justify-center">
            <Link
              href="/#faq"
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <HelpCircle size={13} className="text-slate-400" />
              <span>FAQ / Dúvidas</span>
            </Link>

            <Link
              href="/privacidade"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Política de Privacidade
            </Link>

            <Link
              href="/termos"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
