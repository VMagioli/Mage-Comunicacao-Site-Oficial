import React from 'react';
import { Compass, Palette, Cpu, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

const DETAILED_SERVICES = [
  {
    icon: Compass,
    title: 'Comunicação e Conteúdo',
    description: 'Gestão de redes sociais, criação de conteúdo estratégico e gestão de tráfego pago para posicionamento digital.',
    deliverables: [
      'Gestão de Instagram',
      'Estratégia de Conteúdo',
      'Estudo de Marca e Posicionamento',
      'Direção Criativa',
      'Calendário Editorial',
      'Gestão de Tráfego Pago'
    ],
    borderClass: 'border-blue-500/10 hover:border-blue-500/30',
    iconColor: 'text-blue-400',
    bgIcon: 'bg-blue-500/5',
    projectTypeId: 'branding'
  },
  {
    icon: Palette,
    title: 'Sites e Tecnologia',
    description: 'Desenvolvimento de soluções digitais para tornar empresas mais eficientes e preparadas para crescer.',
    deliverables: [
      'Sites Institucionais',
      'Landing Pages',
      'Página de vendas',
      'Agentes de IA',
      'Blog',
      'Integrações entre plataformas',
      'Automações',
      'Manutenção de Sites'
    ],
    borderClass: 'border-purple-500/10 hover:border-purple-500/30',
    iconColor: 'text-purple-400',
    bgIcon: 'bg-purple-500/5',
    projectTypeId: 'web'
  },
  {
    icon: Cpu,
    title: 'Comercial',
    description: 'Estruturamos processos que ajudam empresas a vender melhor.',
    deliverables: [
      'Estratégia de Vendas',
      'Otimização de Processos',
      'Treinamento de Equipe Comercial',
      'Automação Comercial',
      'Agentes de IA para Atendimento e Vendas',
      'Canais de Comunicação com IA (WhatsApp, Telegram, etc)',
      'CRM e Funis de Vendas'
    ],
    borderClass: 'border-cyan-500/10 hover:border-cyan-500/30',
    iconColor: 'text-cyan-400',
    bgIcon: 'bg-cyan-500/5',
    projectTypeId: 'commercial'
  },
  {
    icon: Sparkles,
    title: 'Gestão',
    description: 'Organizamos processos para sustentar o crescimento da empresa.',
    deliverables: [
      'Mapeamento e Padronização de Processos',
      'Consultoria em Estrutura Digital',
      'Organização Operacional',
      'Implantação de Ferramentas',
      'Dashboards e Indicadores'
    ],
    borderClass: 'border-emerald-500/10 hover:border-emerald-500/30',
    iconColor: 'text-emerald-400',
    bgIcon: 'bg-emerald-500/5',
    projectTypeId: 'management'
  }
];

interface ServicesPageProps {
  setActiveTab?: (tab: string) => void;
  setSelectedProjectType?: (type: string) => void;
}

export function ServicesPage({ setActiveTab, setSelectedProjectType }: ServicesPageProps) {
  return (
    <section className="px-4 md:px-8 py-8 md:py-10 relative z-20">
      {/* Page Header */}
      <div className="mb-12">
        <span className="text-slate-500 text-[10px] font-mono tracking-widest uppercase">Soluções sob medida</span>
        <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight mt-2">
          Nossos Serviços
        </h2>
        <p className="text-slate-400 mt-4 max-w-2xl text-sm md:text-base">
          Toda solução existe para resolver um limite de crescimento. <br/>Conheça as frentes que utilizamos para estruturar empresas, fortalecer operações e acelerar resultados.
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
                <button
                  onClick={() => {
                    if (service.projectTypeId) {
                      setSelectedProjectType?.(service.projectTypeId);
                    }
                    setActiveTab?.('contato');
                    document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 text-xs font-mono text-slate-500"
                >
                  Solicitar Orçamento <ArrowRight size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
