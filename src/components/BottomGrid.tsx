import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export function BottomGrid() {
  return (
    <section className="px-8 mt-6 mb-12 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
        
        {/* Metrics & Purpose Box */}
        <div className="col-span-1 md:col-span-4 lg:col-span-4 bg-white/[0.02] border border-white/5 rounded-xl p-8 backdrop-blur-sm flex flex-col md:flex-row justify-between items-stretch gap-8 hover:border-white/10 transition-all duration-300">
          
          {/* Left: Purpose */}
          <div className="flex-1 flex flex-col justify-between relative">
            <div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-[10px] text-slate-500 tracking-wider uppercase">// nosso propósito</span>
                {/* Code icon brackets */}
                <span className="font-mono text-xs text-slate-600 select-none">&lt;/&gt;</span>
              </div>
              <h4 className="text-lg md:text-xl font-medium text-white tracking-tight mt-6 leading-relaxed max-w-[320px]">
                Menos ruído. Mais clareza.<br />Melhores experiências.
              </h4>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-[1px] bg-white/5 self-stretch my-2"></div>

          {/* Right: Metrics Grid */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-medium text-white mb-2">+30</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-light leading-snug">Projetos entregues</div>
              </div>
              <div>
                <div className="text-2xl font-medium text-white mb-2">12</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-light leading-snug">Clientes parceiros</div>
              </div>
              <div>
                <div className="text-2xl font-medium text-white mb-2">98%</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-light leading-snug">Satisfação média</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Box (Próximo Passo) */}
        <div className="col-span-1 md:col-span-4 lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-xl p-8 backdrop-blur-sm flex flex-col justify-between min-h-[160px] relative overflow-hidden group cursor-pointer hover:border-blue-500/20 transition-all duration-300">
          <div>
            <span className="text-slate-500 text-[10px] font-semibold tracking-widest uppercase">Próximo passo</span>
          </div>
          
          <div className="flex items-end justify-between mt-6">
            <h4 className="text-slate-200 text-sm md:text-base font-medium leading-relaxed max-w-[180px] group-hover:text-white transition-colors duration-300">
              Vamos construir algo incrível juntos?
            </h4>
            
            {/* Glowing button with Arrow */}
            <div className="w-11 h-11 shrink-0 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300 group-hover:bg-blue-500 group-hover:text-white group-hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]">
              <ArrowUpRight size={18} />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
