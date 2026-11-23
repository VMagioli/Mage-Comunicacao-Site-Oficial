import React from 'react';
import Link from 'next/link';
import {
  Share2,
  Globe,
  MapPin,
  Cpu,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';

const HOME_SERVICES = [
  {
    icon: Share2,
    badge: 'Foco Principal',
    title: 'Gestão de Redes Sociais & Conteúdo',
    description:
      'Presença estratégica no Instagram, Facebook, TikTok e outros canais. Estruturado especialmente para quem tem dificuldade ou pouca disponibilidade para criar conteúdo — mesmo que já grave ou queira começar a gravar com direcionamento.',
    deliverables: [
      'Gestão completa de Instagram, Facebook, TikTok e mais',
      'Roteiros, edição e apoio para quem já grava ou quer gravar',
      'Posicionamento de marca e calendário editorial estratégico',
      'Gestão de tráfego pago orientada à demanda qualificada',
    ],
    href: '/contato?tipo=branding',
    accentLine: 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]',
    iconClass: 'border-blue-500/20 bg-blue-500/10 text-blue-400',
    badgeClass: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
    checkClass: 'text-blue-400',
  },
  {
    icon: Globe,
    badge: 'Foco Principal',
    title: 'Sites & Landing Pages',
    description:
      'Desenvolvemos sites institucionais rápidos em Next.js e landing pages desenhadas para converter visitantes em leads e elevar a percepção de valor da sua empresa.',
    deliverables: [
      'Sites institucionais modernos de alta velocidade',
      'Landing pages e páginas de vendas de alta conversão',
      'Design exclusivo pensado para celular e desktop',
      'Integrações com WhatsApp, formulários e manutenção contínua',
    ],
    href: '/contato?tipo=web',
    accentLine: 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]',
    iconClass: 'border-purple-500/20 bg-purple-500/10 text-purple-400',
    badgeClass: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    checkClass: 'text-purple-400',
  },
  {
    icon: MapPin,
    badge: 'Foco Principal',
    title: 'Perfil da Empresa no Google & SEO',
    description:
      'Criamos, otimizamos e gerenciamos seu Perfil da Empresa no Google (Google Meu Negócio) junto ao SEO técnico para sua empresa aparecer para quem já busca o seu serviço.',
    deliverables: [
      'Criação e otimização completa do Perfil da Empresa no Google',
      'Gestão contínua de categorias, fotos, postagens e reputação',
      'SEO técnico, local e semântico para Google e buscadores com IA',
      'Estrutura de páginas voltada para atrair tráfego orgânico',
    ],
    href: '/contato?tipo=web',
    accentLine: 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]',
    iconClass: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
    badgeClass: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    checkClass: 'text-emerald-400',
  },
  {
    icon: Cpu,
    badge: 'Escala & Processos',
    title: 'Comercial, IA & Estrutura Digital',
    description:
      'Para negócios prontos para o próximo estágio, integramos seus canais digitais a funis comerciais, CRM, automações e organização operacional.',
    deliverables: [
      'Estruturação de CRM, funis de vendas e automação comercial',
      'Agentes de IA para atendimento e qualificação de leads',
      'Mapeamento de processos e implantação de ferramentas',
      'Dashboards e indicadores para decisões baseadas em dados',
    ],
    href: '/contato?tipo=commercial',
    accentLine: 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]',
    iconClass: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-400',
    badgeClass: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    checkClass: 'text-cyan-400',
  },
];

export function ServicesGrid() {
  return (
    <section className="px-4 md:px-8 mt-14 relative z-20" aria-labelledby="frentes-atuacao-heading">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-slate-400 text-[11px] font-mono tracking-widest uppercase">
            Nossas Frentes de Atuação
          </span>
          <h2
            id="frentes-atuacao-heading"
            className="text-2xl sm:text-3xl font-medium text-white tracking-tight mt-2"
          >
            Do conteúdo nas redes sociais ao topo do Google
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-light mt-2 max-w-2xl">
            Atuamos nas frentes que trazem visibilidade real, autoridade e conversão — tudo conectado sob o mesmo padrão técnico e criativo.
          </p>
        </div>

        <Link
          href="/servicos"
          className="text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 shrink-0"
        >
          Ver todos os serviços <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {HOME_SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <article
              key={service.title}
              className="bg-[#111923]/80 border border-white/5 hover:border-white/15 rounded-2xl p-6 md:p-7 flex flex-col justify-between transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div
                    className={`w-11 h-11 rounded-xl border flex items-center justify-center ${service.iconClass}`}
                  >
                    <Icon size={20} strokeWidth={1.6} />
                  </div>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border ${service.badgeClass}`}
                  >
                    {service.badge}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-medium text-white tracking-tight mb-3">
                  {service.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed font-light mb-5">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-xs text-slate-300 font-light">
                      <CheckCircle2 size={14} className={`${service.checkClass} shrink-0 mt-0.5`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div className={`w-10 h-[2.5px] rounded-full ${service.accentLine}`} />
                <Link
                  href={service.href}
                  className="text-xs font-mono text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  Solicitar orçamento <ArrowUpRight size={13} />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
