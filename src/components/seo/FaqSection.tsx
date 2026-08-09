import React, { useState } from 'react';
import { JsonLd } from './JsonLd';
import { generateFaqSchema, FaqItem } from '@/src/lib/seo-schemas';
import { X, HelpCircle, ChevronDown } from 'lucide-react';

const faqData: FaqItem[] = [
  {
    question: 'O que é a MAGE Comunicação e quais serviços ela oferece?',
    answer: 'A MAGE Comunicação é uma agência digital especialista em autoridade de marca, gestão estratégica, branding e desenvolvimento de plataformas web de alta velocidade. Entregamos sites otimizados para SEO semântico, AEO, GEO e SXO, além de gestão completa de redes sociais e soluções tecnológicas sob medida para escalar empresas.'
  },
  {
    question: 'Como a otimização AEO e GEO beneficia o ranqueamento do meu site?',
    answer: 'AEO (Answer Engine Optimization) e GEO (Generative Engine Optimization) estruturam seu conteúdo com a tática BLUF e dados RAG-friendly para que assistentes virtuais e IAs generativas como ChatGPT, Claude, Perplexity e Google Gemini citem sua marca como resposta principal nas pesquisas conversacionais diretas.'
  },
  {
    question: 'Por que a performance do site afeta a taxa de conversão (SXO)?',
    answer: 'O SXO combina SEO com experiência do usuário. Sites com tempo de carregamento inferior a 2 segundos e INP abaixo de 200ms reduzem drasticamente a taxa de rejeição, aumentam a retenção mobile e garantem jornadas sem atrito com chamadas para ação (CTAs) estratégicas que elevam a conversão de leads.'
  },
  {
    question: 'Qual o tempo médio para o desenvolvimento de um site na MAGE?',
    answer: 'O prazo médio para o desenvolvimento completo de uma landing page ou site institucional na MAGE varia entre 15 e 30 dias úteis. Nosso processo engloba planejamento arquitetural, design UI/UX exclusivo, engenharia de código Next.js, testes de performance e otimização total de buscadores.'
  }
];

interface FaqSectionProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function FaqSection({ isOpen = false, onClose }: FaqSectionProps) {
  const faqSchema = generateFaqSchema(faqData);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

  return (
    <>
      {/* JsonLd schema is always rendered for search engine crawlers */}
      <JsonLd data={faqSchema} />

      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 transition-opacity"
            onClick={onClose}
          />

          {/* Floating Drawer / Modal near footer */}
          <div className="fixed bottom-16 right-4 sm:right-8 z-50 max-w-md w-[calc(100vw-2rem)] max-h-[75vh] flex flex-col bg-[#0B0F14]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300">
            {/* Header with Footer Aesthetic */}
            <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 tracking-wider uppercase">
                <HelpCircle size={14} className="text-slate-400" />
                <span>Perguntas Frequentes (FAQ)</span>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white p-1 transition-colors cursor-pointer rounded-lg hover:bg-white/5"
                aria-label="Fechar FAQ"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content List / Accordion */}
            <div className="p-4 overflow-y-auto custom-scrollbar space-y-3">
              <div className="text-[11px] font-mono text-slate-500 mb-2 px-1">
                Diretrizes de Autoridade & Respostas Factuais (AEO / GEO)
              </div>
              {faqData.map((faq, index) => {
                const isExpanded = expandedIndex === index;
                return (
                  <article 
                    key={index}
                    className="bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-xl transition-all duration-200 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full p-3.5 text-left flex items-start justify-between gap-3 cursor-pointer group"
                    >
                      <h3 className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-white transition-colors flex items-start gap-2 leading-snug">
                        <span className="text-slate-500 font-mono text-xs font-normal shrink-0">0{index + 1}.</span>
                        {faq.question}
                      </h3>
                      <ChevronDown 
                        size={14} 
                        className={`text-slate-500 group-hover:text-slate-300 shrink-0 transition-transform duration-200 mt-0.5 ${
                          isExpanded ? 'rotate-180 text-cyan-400' : ''
                        }`} 
                      />
                    </button>

                    {isExpanded && (
                      <div className="px-3.5 pb-3.5 pt-1 text-xs text-slate-400 leading-relaxed font-light pl-7 border-t border-white/[0.03]">
                        <p className="border-l border-white/10 pl-3 py-0.5">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>

            {/* Footer sub-bar */}
            <div className="px-4 py-2.5 border-t border-white/5 bg-white/[0.01] flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>MAGE AEO/GEO Knowledge</span>
              <span>BLUF Optimization</span>
            </div>
          </div>
        </>
      )}
    </>
  );
}

