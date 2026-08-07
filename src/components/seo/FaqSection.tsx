import React from 'react';
import { JsonLd } from './JsonLd';
import { generateFaqSchema, FaqItem } from '@/src/lib/seo-schemas';

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

export function FaqSection() {
  const faqSchema = generateFaqSchema(faqData);

  return (
    <section id="faq" className="py-16 px-4 max-w-4xl mx-auto border-t border-white/10">
      <JsonLd data={faqSchema} />
      <div className="mb-10 text-center">
        <span className="text-xs uppercase tracking-widest font-mono text-cyan-400 bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-500/20">
          AEO & Knowledge Graph
        </span>
        <h2 className="text-3xl font-bold text-white mt-3 tracking-tight">
          Perguntas Frequentes & Diretrizes de Autoridade
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
          Respostas diretas e factuais otimizadas com a técnica BLUF para mecanismo de busca tradicionais e motores de resposta conversacional (AEO / GEO).
        </p>
      </div>

      <div className="space-y-6">
        {faqData.map((faq, index) => (
          <article 
            key={index}
            className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30"
          >
            {/* BLUF Strict Hierarchy: H3 (Question Intent) -> direct <p> (40-60 words answer) */}
            <h3 className="text-xl font-semibold text-white mb-3 flex items-start gap-3">
              <span className="text-cyan-400 font-mono text-base font-bold">0{index + 1}.</span>
              {faq.question}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed pl-7 border-l-2 border-cyan-500/40">
              {faq.answer}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
