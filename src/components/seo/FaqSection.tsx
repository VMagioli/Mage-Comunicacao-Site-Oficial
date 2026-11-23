import React from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { JsonLd } from './JsonLd';
import { generateFaqSchema, FaqItem } from '@/src/lib/seo-schemas';

export const HOME_FAQ_DATA: FaqItem[] = [
  {
    question: 'Quais serviços a MAGE Comunicação oferece atualmente?',
    answer:
      'A MAGE atua com tecnologia e comunicação integradas como um ecossistema. Nosso foco atual está em gestão de redes sociais (Instagram, Facebook, TikTok e outros canais), criação de conteúdo estratégico, desenvolvimento de sites institucionais e landing pages de alta conversão, além da criação e gestão do Perfil da Empresa no Google com SEO.',
  },
  {
    question:
      'Tenho dificuldade ou pouca disponibilidade para criar conteúdo nas redes sociais. A MAGE consegue me ajudar?',
    answer:
      'Sim. Nosso processo de social media foi desenhado exatamente para empresários e profissionais que têm agenda corrida ou dificuldade para criar conteúdo sozinhos. Se você já grava vídeos ou deseja começar a gravar, entregamos planejamento, roteiros objetivos, direção criativa, edição e publicação constante em Instagram, Facebook, TikTok e demais redes.',
  },
  {
    question: 'Qual o prazo médio para criação de um site ou landing page na MAGE?',
    answer:
      'O prazo médio para entrega de uma landing page ou site institucional na MAGE varia entre 15 e 30 dias úteis, conforme a complexidade do projeto. Todo desenvolvimento inclui arquitetura pensada para conversão, design responsivo, carregamento ultrarrápido em Next.js e otimização completa de SEO.',
  },
  {
    question: 'Por que investir na gestão do Perfil da Empresa no Google com SEO?',
    answer:
      'O Perfil da Empresa no Google (Google Meu Negócio) aliado a um site otimizado para SEO coloca sua marca diante de clientes que já estão procurando exatamente pelo seu serviço. Isso aumenta ligações, mensagens no WhatsApp e pedidos de orçamento de forma orgânica e previsível.',
  },
  {
    question: 'A MAGE atende empresas fora do Rio de Janeiro? Como funciona o primeiro passo?',
    answer:
      'Sim. Temos base no Rio de Janeiro (RJ) e realizamos atendimento nacional 100% remoto para empresas e profissionais liberais em todo o Brasil. O primeiro passo é agendar um diagnóstico estratégico pelo WhatsApp ou formulário de contato para analisarmos sua presença atual e montarmos uma proposta sob medida.',
  },
];

export function FaqSection() {
  const faqSchema = generateFaqSchema(HOME_FAQ_DATA);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="px-4 md:px-8 mt-16 relative z-20 scroll-mt-8"
    >
      {/* Structured data matches the visible FAQ content below */}
      <JsonLd data={faqSchema} />

      <div className="mb-8">
        <span className="text-slate-500 text-[11px] font-mono tracking-widest uppercase inline-flex items-center gap-1.5">
          <HelpCircle size={13} className="text-blue-400" />
          Dúvidas Frequentes
        </span>
        <h2
          id="faq-heading"
          className="text-2xl sm:text-3xl font-medium text-white tracking-tight mt-2"
        >
          Perguntas frequentes sobre nossos serviços
        </h2>
        <p className="text-slate-400 text-sm md:text-base font-light mt-2 max-w-2xl">
          Respostas diretas sobre como trabalhamos com redes sociais, sites, landing pages e SEO no Google.
        </p>
      </div>

      <div className="space-y-3">
        {HOME_FAQ_DATA.map((faq, index) => (
          <details
            key={faq.question}
            open={index === 0}
            className="group bg-[#111923]/50 border border-white/5 hover:border-white/15 rounded-2xl transition-all duration-200 overflow-hidden"
          >
            <summary className="list-none cursor-pointer p-5 md:p-6 flex items-start justify-between gap-4 select-none">
              <h3 className="text-sm md:text-base font-medium text-slate-100 group-hover:text-white transition-colors flex items-start gap-3 leading-snug">
                <span className="text-blue-400/80 font-mono text-xs mt-0.5 shrink-0">
                  0{index + 1}.
                </span>
                <span>{faq.question}</span>
              </h3>
              <ChevronDown
                size={18}
                className="text-slate-500 group-hover:text-slate-300 shrink-0 mt-0.5 transition-transform duration-200 group-open:rotate-180 group-open:text-blue-400"
              />
            </summary>

            <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0 text-sm text-slate-300 leading-relaxed font-light border-t border-white/[0.04]">
              <p className="pt-4 border-l-2 border-blue-500/30 pl-4">
                {faq.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
