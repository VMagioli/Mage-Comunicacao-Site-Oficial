import React from 'react';
import { Award, Eye, Heart, Target, Users } from 'lucide-react';

const VALUES = [
  {
    icon: Target,
    title: 'Foco na Clareza',
    description: 'Buscamos simplificar o complexo. Nossas interfaces e arquiteturas de software são criadas para eliminar atritos e destacar o que realmente importa.',
    accentColor: 'text-blue-400',
    bgClass: 'bg-blue-500/5'
  },
  {
    icon: Award,
    title: 'Performance Extrema',
    description: 'Aplicações lentas perdem usuários e vendas. Codificamos seguindo os padrões mais exigentes de velocidade de carregamento e pontuações do Lighthouse.',
    accentColor: 'text-purple-400',
    bgClass: 'bg-purple-500/5'
  },
  {
    icon: Heart,
    title: 'Parceria Genuína',
    description: 'Não somos apenas um fornecedor técnico. Nós nos tornamos parceiros de longo prazo, entendendo seus gargalos operacionais e traçando soluções tecnológicas sob medida.',
    accentColor: 'text-emerald-400',
    bgClass: 'bg-emerald-500/5'
  }
];

export function AboutPage() {
  return (
    <section className="px-4 md:px-8 py-8 md:py-10 relative z-20">
      {/* Page Header */}
      <div className="mb-12">
        <span className="text-slate-500 text-[10px] font-mono tracking-widest uppercase">// nossa história & valores</span>
        <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight mt-2">
          Sobre a MAGE
        </h2>
        <p className="text-slate-400 font-light mt-4 max-w-2xl text-sm md:text-base">
          Somos um estúdio de desenvolvimento e design que ajuda empresas modernas a crescerem no ecossistema digital por meio de produtos que combinam visual de altíssimo nível e engenharia refinada.
        </p>
      </div>

      {/* Main Grid: Split Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl md:text-2xl font-medium text-white tracking-tight">
            Nossa Missão é unir <span className="text-blue-400">código</span> e <span className="text-emerald-400">criatividade</span>.
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed font-light">
            Acreditamos que a tecnologia deve servir a um propósito estratégico claro. Por isso, recusamos layouts prontos ou códigos inchados de plataformas genéricas. Desenvolvemos cada componente do zero, assegurando que sua presença online seja única, extremamente rápida e altamente responsiva.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed font-light">
            Desde o planejamento inicial da jornada do usuário até a configuração final do servidor e SEO estruturado, nossa equipe preza pelos detalhes que diferenciam marcas comuns de líderes em seus respectivos nichos.
          </p>
        </div>

        {/* Floating Quick Info Card */}
        <div className="bg-[#111923]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:border-white/10 transition-colors">
          <div>
            <h4 className="text-white font-mono text-xs uppercase tracking-wider mb-6">// MAGE em números</h4>
            <div className="space-y-6">
              <div>
                <div className="text-3xl font-medium text-white tracking-tight">+30</div>
                <div className="text-xs text-slate-400 font-light mt-1">Projetos entregues com excelência técnica</div>
              </div>
              <div>
                <div className="text-3xl font-medium text-blue-400 tracking-tight">100%</div>
                <div className="text-xs text-slate-400 font-light mt-1">Desenvolvimentos sob medida (sem templates)</div>
              </div>
              <div>
                <div className="text-3xl font-medium text-emerald-400 tracking-tight">&lt; 1.5s</div>
                <div className="text-xs text-slate-400 font-light mt-1">Tempo médio de carregamento de nossas plataformas</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Grid */}
      <div className="mb-8">
        <h3 className="text-white font-mono text-xs uppercase tracking-wider mb-8">// Nossos Pilares</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div 
                key={idx}
                className="bg-[#111923]/40 border border-white/5 hover:border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${val.bgClass} ${val.accentColor} mb-6 border border-white/5`}>
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <h4 className="text-base font-semibold text-white tracking-tight mb-3">{val.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed font-light">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
