import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const WHATSAPP_HERO_URL =
  'https://wa.me/5521993963503?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20um%20especialista%20da%20MAGE%20sobre%20sites%2C%20redes%20sociais%20ou%20SEO.';

export function Hero() {
  return (
    <section className="relative z-20 flex flex-col lg:flex-row items-center justify-between px-4 md:px-8 py-8 md:py-12 gap-12">
      <div className="max-w-2xl w-full">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[11px] font-mono uppercase tracking-wider mb-5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Base no Rio de Janeiro • Atendimento nacional remoto
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white leading-[1.15] mb-5 tracking-tight">
          Agência digital especializada em{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            sites, redes sociais e SEO
          </span>{' '}
          para empresas.
        </h1>

        <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8 max-w-xl font-light">
          Criamos sites e landing pages rápidos otimizados para o Google, fazemos gestão completa de redes sociais — ideal para quem tem pouca disponibilidade para criar conteúdo — e estruturamos seu Perfil da Empresa no Google para gerar demanda qualificada.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
          <a
            href={WHATSAPP_HERO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white rounded-xl font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>Falar com um especialista</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>

          <Link
            href="/projetos"
            className="px-6 py-3.5 bg-white/[0.03] border border-white/10 text-slate-200 hover:text-white hover:bg-white/[0.06] hover:border-white/20 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
          >
            Explorar portfólio
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-blue-400 shrink-0" />
            Sites & Landing Pages
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-purple-400 shrink-0" />
            Instagram, Facebook, TikTok & mais
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
            Google Meu Negócio & SEO
          </span>
        </div>
      </div>

      {/* Technical Stack Card */}
      <div className="hidden lg:block relative group shrink-0">
        <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 rounded-xl blur-lg opacity-50 group-hover:opacity-70 transition duration-500" />
        <div className="relative bg-[#111923]/80 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl min-w-[330px]">
          <div className="flex gap-2 mb-4 border-b border-white/5 pb-4" aria-hidden="true">
            <div className="h-2.5 w-2.5 rounded-full bg-slate-600/50" />
            <div className="h-2.5 w-2.5 rounded-full bg-slate-600/50" />
            <div className="h-2.5 w-2.5 rounded-full bg-slate-600/50" />
          </div>
          <pre className="font-mono text-sm">
            <code className="text-slate-300">
              <span className="text-purple-400">function</span>{' '}
              <span className="text-blue-400">ecossistemaMage</span>() {'{'}
              <br />
              {'  '}
              <span className="text-yellow-200">redesSociais</span>();
              <br />
              {'  '}
              <span className="text-yellow-200">sitesELandingPages</span>();
              <br />
              {'  '}
              <span className="text-yellow-200">googleSeo</span>();
              <br />
              {'  '}
              <br />
              {'  '}
              <span className="text-purple-400">return</span>{' '}
              <span className="text-emerald-300">&apos;crescimento&apos;</span>;
              <br />
              {'}'}
            </code>
          </pre>
          <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-xs font-mono text-slate-400">
            <span>Mage Ecosystem</span>
            <span className="text-emerald-400">RJ → Brasil</span>
          </div>
        </div>
      </div>
    </section>
  );
}
