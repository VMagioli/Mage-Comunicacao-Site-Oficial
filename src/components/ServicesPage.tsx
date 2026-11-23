import React from 'react';
import Link from 'next/link';
import { Compass, Palette, Cpu, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

const DETAILED_SERVICES = [
  {
    icon: Compass,
    title: 'Gestão de Redes Sociais & Conteúdo',
    description:
      'Social media completo para Instagram, Facebook, TikTok e outros canais — pensado inclusive para profissionais e empresas que têm pouca disponibilidade ou dificuldade para criar conteúdo, mas já gravam ou querem aparecer com consistência e autoridade.',
    deliverables: [
      'Gestão de Redes Sociais (Instagram, Facebook, TikTok e mais)',
      'Criação, Roteirização e Edição de Conteúdo Estratégico',
      'Apoio para quem grava ou quer começar a gravar com facilidade',
      'Estudo de Marca, Branding e Posicionamento',
      'Direção Criativa e Calendário Editorial',
      'Gestão de Tráfego Pago',
    ],
    borderClass: 'border-blue-500/10 hover:border-blue-500/30',
    iconColor: 'text-blue-400',
    bgIcon: 'bg-blue-500/5',
    projectTypeId: 'branding',
  },
  {
    icon: Palette,
    title: 'Sites, Landing Pages & SEO no Google',
    description:
      'Desenvolvimento de sites ultravelozes, landing pages de alta conversão e criação/gestão do Perfil da Empresa no Google com SEO técnico para sua empresa ser encontrada por quem já procura seus serviços.',
    deliverables: [
      'Sites Institucionais de Alta Performance (Next.js)',
      'Landing Pages e Páginas de Vendas de Alta Conversão',
      'Criação e Gestão de Perfil da Empresa no Google (Google Meu Negócio)',
      'SEO Técnico, Local e Semântico para Google e IAs',
      'Blogs, Integrações e Automações Web',
      'Manutenção Contínua e Performance Web',
    ],
    borderClass: 'border-purple-500/10 hover:border-purple-500/30',
    iconColor: 'text-purple-400',
    bgIcon: 'bg-purple-500/5',
    projectTypeId: 'web',
  },
  {
    icon: Cpu,
    title: 'Comercial & Automação',
    description: 'Estruturamos processos comerciais e integrações que transformam a atenção gerada no digital em oportunidades reais de venda.',
    deliverables: [
      'Estratégia de Vendas e Funis Digitais',
      'Otimização de Processos Comerciais',
      'CRM e Funis de Vendas',
      'Automação Comercial',
      'Agentes de IA para Atendimento e Vendas',
      'Canais de Comunicação com IA (WhatsApp, Telegram, etc.)',
      'Treinamento de Equipe Comercial',
    ],
    borderClass: 'border-cyan-500/10 hover:border-cyan-500/30',
    iconColor: 'text-cyan-400',
    bgIcon: 'bg-cyan-500/5',
    projectTypeId: 'commercial',
  },
  {
    icon: Sparkles,
    title: 'Gestão & Estrutura Digital',
    description: 'Organizamos processos e ferramentas para sustentar o crescimento da empresa sem depender de soluções improvisadas.',
    deliverables: [
      'Mapeamento e Padronização de Processos',
      'Consultoria em Estrutura Digital',
      'Organização Operacional',
      'Implantação de Ferramentas',
      'Dashboards e Indicadores',
    ],
    borderClass: 'border-emerald-500/10 hover:border-emerald-500/30',
    iconColor: 'text-emerald-400',
    bgIcon: 'bg-emerald-500/5',
    projectTypeId: 'management',
  },
];

export function ServicesPage() {
  return (
    <section className="px-4 md:px-8 py-8 md:py-10 relative z-20">
      {/* Page Header */}
      <div className="mb-12">
        <span className="text-slate-500 text-[10px] font-mono tracking-widest uppercase">
          Soluções sob medida
        </span>
        <h1 className="text-3xl sm:text-4xl font-medium text-white tracking-tight mt-2">
          Nossos Serviços
        </h1>
        <p className="text-slate-400 mt-4 max-w-2xl text-sm md:text-base leading-relaxed">
          Tecnologia e comunicação trabalhando como um ecossistema integrado. Conheça as frentes que utilizamos para estruturar empresas, fortalecer sua presença digital e acelerar resultados.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {DETAILED_SERVICES.map((service, index) => {
          const Icon = service.icon;
          return (
            <article
              key={service.title}
              className={`bg-[#111923]/40 backdrop-blur-md border ${service.borderClass} rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.2)]`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${service.bgIcon} ${service.iconColor} border border-white/5`}
                  >
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <h2 className="text-lg md:text-xl font-medium text-white tracking-tight">
                    {service.title}
                  </h2>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed font-light mb-6">
                  {service.description}
                </p>

                {/* Deliverables List */}
                <ul className="space-y-2.5 mb-8">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className={`${service.iconColor} shrink-0 mt-0.5`} />
                      <span className="text-xs text-slate-300 font-light tracking-wide">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom indicator */}
              <div className="pt-4 border-t border-white/5 flex justify-between items-center text-xs font-mono text-slate-500">
                <span>Mage Service #{index + 1}</span>
                <Link
                  href={`/contato?tipo=${service.projectTypeId}`}
                  className="flex items-center gap-1 hover:text-white transition-colors text-xs font-mono text-slate-400"
                >
                  Solicitar Orçamento <ArrowRight size={12} />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
