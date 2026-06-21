import React from 'react';
import { Compass, Palette, Cpu, Sparkles, ArrowUpRight } from 'lucide-react';

const SERVICES = [
  {
    icon: Compass,
    title: 'ESTRATÉGIA',
    description: 'Transformamos ideias em planos digitais sólidos e escaláveis.',
    lineClass: 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]',
    iconContainerClass: 'border-blue-500/20 bg-blue-500/5 text-blue-400'
  },
  {
    icon: Palette,
    title: 'DESIGN',
    description: 'Interfaces intuitivas que comunicam e criam conexão.',
    lineClass: 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]',
    iconContainerClass: 'border-purple-500/20 bg-purple-500/5 text-purple-400'
  },
  {
    icon: Cpu,
    title: 'TECNOLOGIA',
    description: 'Soluções modernas, seguras e feitas para performance.',
    lineClass: 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]',
    iconContainerClass: 'border-cyan-500/20 bg-cyan-500/5 text-cyan-400'
  },
  {
    icon: Sparkles,
    title: 'EXPERIÊNCIA',
    description: 'Criamos experiências digitais que deixam marcas reais.',
    lineClass: 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]',
    iconContainerClass: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400'
  }
];

export function ServicesGrid() {
  return (
    <section className="px-8 mt-4 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {SERVICES.map((service, index) => {
          const Icon = service.icon;
          return (
            <div 
              key={index}
              className="col-span-1 md:col-span-2 lg:col-span-1 bg-white/[0.02] border border-white/5 rounded-xl p-6 backdrop-blur-sm flex flex-col justify-between min-h-[300px] relative group hover:border-white/10 transition-all duration-300"
            >
              <div>
                <div className={`w-12 h-12 rounded-full border flex items-center justify-center mb-6 ${service.iconContainerClass}`}>
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className="text-xs font-semibold text-white tracking-widest uppercase mb-4">{service.title}</h3>
                <p className="text-slate-400 text-xs tracking-wide leading-relaxed font-light">
                  {service.description}
                </p>
              </div>
              
              <div className="mt-6">
                <div className={`w-12 h-[2.5px] rounded-full ${service.lineClass}`}></div>
              </div>
            </div>
          );
        })}

        {/* Featured Project Card (Projetos em Destaque) */}
        <div className="col-span-1 md:col-span-4 lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-xl p-8 backdrop-blur-sm flex flex-col justify-between min-h-[300px] relative group hover:border-white/10 transition-all duration-300">
          
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-[10px] font-semibold tracking-widest uppercase">PROJETOS EM DESTAQUE</span>
            <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300 text-[11px] font-medium flex items-center gap-1">
              Ver todos <ArrowUpRight size={14} className="inline" />
            </a>
          </div>

          {/* Center Row: Split into Title/Description and Image */}
          <div className="flex items-center gap-6 my-4">
            <div className="flex-1">
              <h4 className="text-xl font-medium text-white mb-2">Northpeak</h4>
              <p className="text-slate-400 text-xs leading-relaxed font-light tracking-wide">
                Plataforma digital para experiências ao ar livre.
              </p>
            </div>
            
            {/* Image Container with Hover Effect */}
            <div className="relative w-36 h-24 shrink-0 rounded-lg overflow-hidden border border-white/10 group-hover:border-white/20 transition-colors duration-300">
              <img 
                src="/fotofront.png" 
                alt="Northpeak Project" 
                className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Overlapping arrow button on image */}
              <div className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full border border-blue-500/30 bg-blue-950/80 text-blue-400 flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-all duration-300 hover:bg-blue-500 hover:text-white">
                <ArrowUpRight size={12} />
              </div>
            </div>
          </div>

          {/* Footer Indicators */}
          <div className="flex gap-1.5 items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/10"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/10"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/10"></span>
          </div>

        </div>
      </div>
    </section>
  );
}
