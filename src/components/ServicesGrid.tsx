import React from 'react';
import { Lightbulb, PenTool, Terminal, Sparkles } from 'lucide-react';

const SERVICES = [
  {
    icon: Lightbulb,
    title: 'Estratégia',
    description: 'Mapeamento de jornada e pesquisa para decisões precisas.',
    glowColor: 'from-blue-500/40 to-transparent'
  },
  {
    icon: PenTool,
    title: 'Design',
    description: 'Interfaces minimalistas, focadas na clareza e conversão.',
    glowColor: 'from-purple-500/40 to-transparent'
  },
  {
    icon: Terminal,
    title: 'Tecnologia',
    description: 'Arquiteturas robustas, escaláveis e de alta performance.',
    glowColor: 'from-emerald-500/40 to-transparent'
  },
  {
    icon: Sparkles,
    title: 'Experiência',
    description: 'Interações fluidas que transformam usuários em fãs.',
    glowColor: 'from-amber-500/40 to-transparent'
  }
];

export function ServicesGrid() {
  return (
    <section className="px-8 mt-4 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICES.map((service, index) => {
          const Icon = service.icon;
          return (
            <div 
              key={index}
              className="bg-white/[0.02] border border-white/5 rounded-xl p-6 hover:bg-white/[0.04] transition-colors duration-300 relative overflow-hidden group"
            >
              <div className="mb-4">
                <Icon size={24} className="text-slate-400 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">{service.title}</h3>
              <p className="text-sm text-slate-400 tracking-wide font-light leading-relaxed">
                {service.description}
              </p>
              
              {/* Bottom gradient line */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className={`w-full h-full bg-gradient-to-r ${service.glowColor}`}></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
