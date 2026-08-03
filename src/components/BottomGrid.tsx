import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export function BottomGrid() {
  return (
    <section className="px-4 md:px-8 mt-6 mb-12 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
        
        {/* Metrics & Purpose Box */}
        <div className="col-span-1 md:col-span-4 lg:col-span-4 bg-white/[0.02] border border-white/5 rounded-xl p-6 md:p-8 backdrop-blur-sm flex flex-col md:flex-row justify-between items-stretch gap-8 hover:border-white/10 transition-all duration-300">
          
          {/* Left: Title & Purpose */}
          <div className="flex-1 flex flex-col justify-between relative">
            <div>
              <div className="w-fit flex items-center gap-2 md:gap-3 bg-white/5 border border-white/5 rounded-full pl-2.5 pr-3.5 py-1.5 md:pl-3 md:pr-5 md:py-2 backdrop-blur-sm overflow-hidden">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" /> 
                <span className="text-[10px] md:text-xs font-mono text-slate-300 truncate max-w-[110px] sm:max-w-[150px] md:max-w-xs">
                  NOSSAS SOLUÇÕES
                </span>
              </div>
              <h4 className="text-lg md:text-xl font-medium text-white tracking-tight mt-4 md:mt-6 leading-relaxed max-w-[320px]">
                A estrutura digital para o próximo ciclo de crescimento da sua empresa.
              </h4>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-[1px] bg-white/5 self-stretch my-2"></div>

          {/* Right: Description & Button */}
          <div className="flex-1 flex flex-col justify-between relative">
            <p className="text-sm text-slate-400 tracking-wide mt-4 md:mt-6 leading-relaxed max-w-[320px]">
              Tecnologia, comunicação e estratégia integradas para resolver os desafios que impedem empresas de escalar.
            </p>
            <button 
              onClick={() => console.log('Projetos')}
              className="mt-4 text-slate-400 hover:text-white transition-colors duration-300 text-[11px] font-medium flex items-center gap-1 cursor-pointer self-start"
            >
                Conheça todos os serviços
               <ArrowUpRight size={16} className="inline" />
            </button>
          </div>
        </div>

        {/* CTA Box (Próximo Passo) */}
        <a 
          href="https://wa.me/5500000000000?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20MAGE."
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-1 md:col-span-4 lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-xl p-6 md:p-8 backdrop-blur-sm flex flex-col justify-between min-h-[160px] relative overflow-hidden group cursor-pointer hover:border-blue-500/20 transition-all duration-300 block text-left"
        >
          <div>
            <span className="text-slate-500 text-[10px] font-semibold tracking-widest uppercase">Próximo passo</span>
          </div>
          
          <div className="flex items-end justify-between mt-6 gap-4">
            <h4 className="text-slate-200 text-sm md:text-base font-medium leading-relaxed max-w-[180px] group-hover:text-white transition-colors duration-300">
              Vamos construir algo incrível juntos?
            </h4>
            
            {/* Glowing button with Arrow */}
            <div className="w-11 h-11 shrink-0 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300 group-hover:bg-blue-500 group-hover:text-white group-hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]">
              <ArrowUpRight size={18} />
            </div>
          </div>
        </a>

      </div>
    </section>
  );
}
