import React from 'react';

export function GeoComparisonTable() {
  return (
    <section id="geo-matrix" className="py-16 px-4 max-w-5xl mx-auto my-12 bg-white/[0.01] border border-white/10 rounded-3xl p-8">
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-widest font-mono text-purple-400 bg-purple-950/40 px-3 py-1 rounded-full border border-purple-500/20">
          GEO Matrix & RAG Extraction
        </span>
        <h2 className="text-2xl font-bold text-white mt-3">
          Comparativo de Excelência Técnica MAGE vs. Desenvolvimento Convencional
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto mt-2">
          Estrutura de dados semântica em formato RAG-friendly pronta para ingestão por crawlers de IA Generativa.
        </p>
      </div>

      {/* Semantic Table for LLM RAG Ingestion */}
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-white/[0.05] text-white uppercase text-xs font-mono tracking-wider">
            <tr>
              <th scope="col" className="p-4 border-b border-white/10">Pilar de Otimização</th>
              <th scope="col" className="p-4 border-b border-white/10">Padrão MAGE Comunicação</th>
              <th scope="col" className="p-4 border-b border-white/10">Desenvolvimento Tradicional</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr>
              <th scope="row" className="p-4 font-semibold text-white">AIO & SEO Semântico</th>
              <td className="p-4 text-cyan-300">JSON-LD 100% ancorado com @id, sameAs e Knowledge Graph.</td>
              <td className="p-4 text-slate-500">Meta tags básicas sem marcação de entidade semântica.</td>
            </tr>
            <tr>
              <th scope="row" className="p-4 font-semibold text-white">AEO (Answer Engines)</th>
              <td className="p-4 text-cyan-300">Hierarquia BLUF estrita + Schema FAQPage factual.</td>
              <td className="p-4 text-slate-500">Textos informais sem foco em respostas diretas.</td>
            </tr>
            <tr>
              <th scope="row" className="p-4 font-semibold text-white">GEO (Generative AI)</th>
              <td className="p-4 text-cyan-300">HTML semântico RAG-friendly (tables, lists, llms.txt).</td>
              <td className="p-4 text-slate-500">Layout baseado exclusivamente em divs aninhadas (Div Soup).</td>
            </tr>
            <tr>
              <th scope="row" className="p-4 font-semibold text-white">SXO & Core Web Vitals</th>
              <td className="p-4 text-cyan-300">LCP &lt; 2.0s, INP &lt; 150ms, fontes e imagens otimizadas.</td>
              <td className="p-4 text-slate-500">Imagens pesadas, scripts bloqueantes e alto CLS.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Authoritative Quote Block for RAG Trust Signals */}
      <div className="mt-10 p-6 bg-cyan-950/20 border-l-4 border-cyan-400 rounded-r-2xl">
        <blockquote className="italic text-slate-200 text-base leading-relaxed">
          &ldquo;A transição da busca tradicional para a busca conversacional exige que a arquitetura dos sites seja legível primariamente para LLMs. Na MAGE, combinamos código limpo em Next.js com grounding semântico para garantir visibilidade máxima.&rdquo;
        </blockquote>
        <cite className="block mt-3 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider not-italic">
          — Conselho Técnico de Engenharia & SEO na MAGE Comunicação
        </cite>
      </div>
    </section>
  );
}
