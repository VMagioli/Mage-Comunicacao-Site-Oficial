import React from 'react';
import { Compass, Palette, Cpu, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

const DETAILED_SERVICES = [
  {
    icon: Compass,
    title: 'Estratégia Digital',
    description: 'A base de qualquer projeto de sucesso. Alinhamos sua visão de negócios a dados concretos para definir o escopo ideal.',
    deliverables: [
      'Análise de viabilidade técnica',
      'Mapeamento de jornada do usuário',
      'Arquitetura de informação e sitemaps',
      'Planejamento de roadmap de produto'
    ],
    borderClass: 'border-blue-500/10 hover:border-blue-500/30',
    iconColor: 'text-blue-400',
    bgIcon: 'bg-blue-500/5'
  },
  {
    icon: Palette,
    title: 'Design de Experiência (UI/UX)',
    description: 'Criamos interfaces que contam histórias. Focamos no minimalismo, usabilidade e estéticas futuristas que encantam.',
    deliverables: [
      'Protótipos interativos de alta fidelidade',
      'Direção de arte e identidade visual',
      'Micro-interações e animações fluidas',
      'Sistemas de design (Design Systems) escaláveis'
    ],
    borderClass: 'border-purple-500/10 hover:border-purple-500/30',
    iconColor: 'text-purple-400',
    bgIcon: 'bg-purple-500/5'
  },
  {
    icon: Cpu,
    title: 'Desenvolvimento Web Premium',
    description: 'Código de alto desempenho. Usamos as ferramentas mais modernas do mercado para entregar velocidade, segurança e robustez.',
    deliverables: [
      'Aplicações escaláveis com Next.js & React',
      'Sites institucionais focados em conversão',
      'Integrações de APIs de terceiros e microsserviços',
      'Otimização extrema para Web Vitals'
    ],
    borderClass: 'border-cyan-500/10 hover:border-cyan-500/30',
    iconColor: 'text-cyan-400',
    bgIcon: 'bg-cyan-500/5'
  },
  {
    icon: Sparkles,
    title: 'SEO & Performance',
    description: 'Não basta ser bonito, precisa ser encontrado. Otimizamos todos os aspectos para que você domine os resultados do Google.',
    deliverables: [
      'Auditoria completa de SEO técnico',
      'Otimização de tempo de carregamento (LCP, FID, CLS)',
      'Estruturação de dados rich snippets',
      'Monitoramento com Google Search Console'
    ],
    borderClass: 'border-emerald-500/10 hover:border-emerald-500/30',
    iconColor: 'text-emerald-400',
    bgIcon: 'bg-emerald-500/5'
  }
];

export function ServicesPage() {
  return (
    <section className="px-4 md:px-8 py-8 md:py-10 relative z-20">
      {/* Page Header */}
      <div className="mb-12">
        <span className="text-slate-500 text-[10px] font-mono tracking-widest uppercase">// soluções sob medida</span>
        <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight mt-2">
          Nossos Serviços
        </h2>
        <p className="text-slate-400 font-light mt-4 max-w-2xl text-sm md:text-base">
          Combinamos criatividade de ponta com excelência técnica para projetar, desenvolver e otimizar aplicações web digitais que geram impacto real.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {DETAILED_SERVICES.map((service, index) => {
          const Icon = service.icon;
          return (
            <div 
              key={index}
              className={`bg-[#111923]/40 backdrop-blur-md border ${service.borderClass} rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.2)]`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${service.bgIcon} ${service.iconColor} border border-white/5`}>
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg md:text-xl font-medium text-white tracking-tight">{service.title}</h3>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed font-light mb-6">
                  {service.description}
                </p>

                {/* Deliverables List */}
                <div className="space-y-2.5 mb-8">
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className={`${service.iconColor} shrink-0 mt-0.5`} />
                      <span className="text-xs text-slate-300 font-light tracking-wide">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom indicator */}
              <div className="pt-4 border-t border-white/5 flex justify-between items-center text-xs font-mono text-slate-500">
                <span>Mage Service #{index + 1}</span>
                <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                  Saber mais <ArrowRight size={12} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
