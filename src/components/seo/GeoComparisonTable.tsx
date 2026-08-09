import React, { useState } from 'react';
import { ChevronDown, Code2 } from 'lucide-react';

interface GeoComparisonTableProps {
  collapsible?: boolean;
}

export function GeoComparisonTable({ collapsible = true }: GeoComparisonTableProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="mt-16 pt-8 border-t border-white/5">
      {collapsible ? (
        <button
          onClick={() => setIsExpanded(prev => !prev)}
          className="w-full flex items-center justify-between p-4 bg-white/[0.015] hover:bg-white/[0.03] border border-white/5 rounded-2xl transition-all duration-200 cursor-pointer group text-left"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/5 text-slate-400 group-hover:text-white transition-colors">
              <Code2 size={16} />
            </div>
            <div>
              <div className="text-xs font-mono text-slate-300 font-medium group-hover:text-white transition-colors">
                Comparativo de Excelência Técnica (MAGE vs. Desenvolvimento Convencional)
              </div>
              <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                Especificações de engenharia web, SEO semântico e arquitetura RAG/AEO
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 group-hover:text-slate-300">
            <span>{isExpanded ? 'Ocultar' : 'Expandir'}</span>
            <ChevronDown 
              size={15} 
              className={`transition-transform duration-200 ${isExpanded ? 'rotate-180 text-slate-300' : ''}`} 
            />
          </div>
        </button>
      ) : null}

      {(!collapsible || isExpanded) && (
        <section id="geo-matrix" className="mt-4 p-5 sm:p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-mono text-slate-500">
                GEO Matrix & RAG Extraction
              </span>
              <h3 className="text-sm font-semibold text-slate-200 mt-1">
                Matriz Comparativa de Engenharia & SEO Semântico
              </h3>
            </div>
            <p className="text-slate-500 text-xs max-w-md font-light">
              Estrutura de dados semântica otimizada para crawlers de IA Generativa.
            </p>
          </div>

          {/* Semantic Table for LLM RAG Ingestion */}
          <div className="overflow-x-auto rounded-xl border border-white/5">
            <table className="w-full text-left text-xs text-slate-400">
              <thead className="bg-white/[0.03] text-slate-300 uppercase text-[10px] font-mono tracking-wider">
                <tr>
                  <th scope="col" className="p-3 border-b border-white/5">Pilar de Otimização</th>
                  <th scope="col" className="p-3 border-b border-white/5">Padrão MAGE Comunicação</th>
                  <th scope="col" className="p-3 border-b border-white/5">Desenvolvimento Tradicional</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-light">
                <tr>
                  <th scope="row" className="p-3 font-medium text-slate-300">AIO & SEO Semântico</th>
                  <td className="p-3 text-slate-300">JSON-LD 100% ancorado com @id, sameAs e Knowledge Graph.</td>
                  <td className="p-3 text-slate-500">Meta tags básicas sem marcação de entidade semântica.</td>
                </tr>
                <tr>
                  <th scope="row" className="p-3 font-medium text-slate-300">AEO (Answer Engines)</th>
                  <td className="p-3 text-slate-300">Hierarquia BLUF estrita + Schema FAQPage factual.</td>
                  <td className="p-3 text-slate-500">Textos informais sem foco em respostas diretas.</td>
                </tr>
                <tr>
                  <th scope="row" className="p-3 font-medium text-slate-300">GEO (Generative AI)</th>
                  <td className="p-3 text-slate-300">HTML semântico RAG-friendly (tables, lists, llms.txt).</td>
                  <td className="p-3 text-slate-500">Layout baseado exclusivamente em divs aninhadas (Div Soup).</td>
                </tr>
                <tr>
                  <th scope="row" className="p-3 font-medium text-slate-300">SXO & Core Web Vitals</th>
                  <td className="p-3 text-slate-300">LCP &lt; 2.0s, INP &lt; 150ms, fontes e imagens otimizadas.</td>
                  <td className="p-3 text-slate-500">Imagens pesadas, scripts bloqueantes e alto CLS.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Authoritative Quote Block for RAG Trust Signals */}
          <div className="p-4 bg-white/[0.015] border-l-2 border-slate-600 rounded-r-xl">
            <blockquote className="italic text-slate-400 text-xs leading-relaxed font-light">
              &ldquo;A transição da busca tradicional para a busca conversacional exige que a arquitetura dos sites seja legível primariamente para LLMs. Na MAGE, combinamos código limpo em Next.js com grounding semântico.&rdquo;
            </blockquote>
            <cite className="block mt-2 text-[10px] font-mono text-slate-500 uppercase not-italic">
              — Conselho Técnico de Engenharia & SEO na MAGE Comunicação
            </cite>
          </div>
        </section>
      )}
    </div>
  );
}

