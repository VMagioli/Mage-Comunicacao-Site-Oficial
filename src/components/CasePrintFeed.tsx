"use client";

import React, { useState } from 'react';
import { Maximize2, X, TrendingUp } from 'lucide-react';
import type { CaseMediaItem } from '@/src/lib/cases';

interface CasePrintFeedProps {
  items: CaseMediaItem[];
  accent: 'purple' | 'emerald';
}

export function CasePrintFeed({ items, accent }: CasePrintFeedProps) {
  const [zoomed, setZoomed] = useState<CaseMediaItem | null>(null);

  const badgeColors =
    accent === 'purple'
      ? 'bg-purple-500/15 text-purple-300 border-purple-500/30'
      : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';

  const borderHover =
    accent === 'purple' ? 'hover:border-purple-500/30' : 'hover:border-emerald-500/30';

  const iconColor = accent === 'purple' ? 'text-purple-400' : 'text-emerald-400';

  if (items.length === 0) {
    return (
      <div className="bg-[#111923]/50 border border-white/5 rounded-2xl p-8 text-center text-sm text-slate-400 font-light">
        Em breve os prints detalhados de métricas deste case serão exibidos aqui.
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {items.map((item, index) => (
          <article
            key={item.id || index}
            className={`bg-[#111923]/60 backdrop-blur-md border border-white/5 ${borderHover} rounded-2xl overflow-hidden transition-all duration-300`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Print Image Container */}
              <div className="lg:col-span-6 bg-[#070A0F] p-4 sm:p-5 flex items-center justify-center relative group border-b lg:border-b-0 lg:border-r border-white/5">
                <button
                  type="button"
                  onClick={() => setZoomed(item)}
                  aria-label={`Ampliar print: ${item.title}`}
                  className="relative w-full flex items-center justify-center cursor-zoom-in focus:outline-none"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image_url}
                    alt={item.title}
                    loading="lazy"
                    className="max-h-[460px] w-auto max-w-full rounded-xl object-contain border border-white/10 shadow-xl"
                  />
                  <span className="absolute bottom-3 right-3 px-2.5 py-1.5 rounded-lg bg-black/75 border border-white/15 text-[11px] font-mono text-slate-200 inline-flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={12} /> Ampliar print
                  </span>
                </button>
              </div>

              {/* Before & After Analysis */}
              <div className="lg:col-span-6 p-6 md:p-8 flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-500">
                      0{index + 1}.
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${badgeColors}`}
                    >
                      {item.tag || 'Antes & Depois'}
                    </span>
                    {item.period && (
                      <span className="text-[11px] font-mono text-slate-400">
                        • {item.period}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-medium text-white tracking-tight leading-snug">
                    {item.title}
                  </h3>

                  {item.analysis ? (
                    <div className="space-y-3 text-sm sm:text-base text-slate-300 font-light leading-relaxed whitespace-pre-line">
                      {item.analysis}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500 italic font-light">
                      Comparativo visual de métricas registrado diretamente na plataforma.
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-slate-500">
                  <TrendingUp size={13} className={iconColor} />
                  <span>Análise de Antes & Depois • MAGE Comunicação</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Lightbox Modal for full-size print inspection */}
      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setZoomed(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col bg-[#0B0F14] border border-white/15 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="text-sm font-medium text-white truncate">{zoomed.title}</div>
                {zoomed.period && (
                  <div className="text-[11px] font-mono text-slate-400">{zoomed.period}</div>
                )}
              </div>
              <button
                type="button"
                onClick={() => setZoomed(null)}
                aria-label="Fechar ampliação"
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-4 overflow-auto flex items-center justify-center bg-black/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={zoomed.image_url}
                alt={zoomed.title}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

