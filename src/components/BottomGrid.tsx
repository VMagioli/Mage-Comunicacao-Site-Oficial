import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageSquare } from 'lucide-react';

const WHATSAPP_CTA_URL =
  'https://wa.me/5521993963503?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20diagn%C3%B3stico%20estrat%C3%A9gico%20com%20a%20MAGE.';

export function BottomGrid() {
  return (
    <section className="px-4 md:px-8 mt-16 mb-14 relative z-20" aria-labelledby="cta-final-heading">
      <div className="relative rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-950/40 via-[#111923]/90 to-emerald-950/30 p-8 md:p-12 overflow-hidden shadow-2xl">
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
        />

        <div className="relative z-10 max-w-3xl space-y-5">
          <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest block">
            Próximo Passo
          </span>

          <h2
            id="cta-final-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-medium text-white tracking-tight leading-tight"
          >
            Pronto para ter uma estrutura digital à altura da sua empresa?
          </h2>

          <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed max-w-2xl">
            Agende um diagnóstico estratégico gratuito. Vamos analisar suas redes sociais, seu site e sua presença no Google para desenhar o plano ideal para o seu próximo ciclo de crescimento.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href={WHATSAPP_CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-medium rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 text-sm md:text-base group"
            >
              <MessageSquare size={18} className="text-white" />
              <span>Agendar pelo WhatsApp</span>
              <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
            </a>

            <Link
              href="/contato"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-slate-200 hover:text-white font-medium rounded-xl transition-all duration-300 text-sm md:text-base"
            >
              Preencher formulário de projeto
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
