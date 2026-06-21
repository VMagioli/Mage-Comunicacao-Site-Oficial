import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export function BottomGrid() {
  return (
    <section className="px-8 mt-12 mb-12 relative z-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Metrics Box */}
        <div className="bg-white/[0.03] border border-white/5 rounded-xl p-8 backdrop-blur-sm lg:col-span-2 flex flex-col justify-between">
          <div className="font-mono text-xs text-slate-500 mb-8 uppercase tracking-widest border-b border-white/5 pb-4">
            <span className="text-emerald-400 mr-2">//</span>
            nosso propósito: Menos ruído. Mais clareza. Melhores experiências.
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-3xl font-medium text-white mb-1">+30</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-light">Projetos entregues</div>
            </div>
            <div>
              <div className="text-3xl font-medium text-white mb-1">12</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-light">Clientes parceiros</div>
            </div>
            <div>
              <div className="text-3xl font-medium text-white mb-1">98%</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-light">Satisfação</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Featured Project */}
          <div className="relative h-40 rounded-xl overflow-hidden border border-white/10 group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800" 
              alt="Northpeak Project" 
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <div className="text-xs text-blue-300 font-mono mb-1">Projeto em destaque</div>
                <div className="text-lg font-medium text-white">Northpeak</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white text-white group-hover:text-black transition-all">
                <ArrowUpRight size={16} />
              </div>
            </div>
          </div>

          {/* CTA Box */}
          <div className="bg-gradient-to-br from-blue-900/40 to-[#0B0F14] border border-blue-500/20 rounded-xl p-6 flex flex-row items-center justify-between group cursor-pointer hover:border-blue-400/40 transition-colors">
            <div className="pr-4">
              <div className="text-xs text-blue-300/70 font-mono mb-2 uppercase tracking-wider">Próximo passo</div>
              <div className="text-white font-medium leading-snug">Vamos construir algo incrível juntos?</div>
            </div>
             <div className="w-10 h-10 shrink-0 rounded-full bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)] flex items-center justify-center group-hover:bg-white group-hover:text-blue-600 transition-all duration-300">
                <ArrowUpRight size={20} />
              </div>
          </div>
        </div>

      </div>
    </section>
  );
}
