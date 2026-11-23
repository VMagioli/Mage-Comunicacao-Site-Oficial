import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Globe,
  Share2,
  MapPin,
  CheckCircle2,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react';
import type { ProjectCase } from '@/src/lib/cases';
import { CasePrintFeed } from './CasePrintFeed';

function ProjectsCtaBanner() {
  return (
    <section className="rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-950/35 via-[#111923]/80 to-emerald-950/25 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400">
          Quer ser o próximo case?
        </span>
        <h2 className="text-xl sm:text-2xl font-medium text-white mt-1">
          Vamos estruturar o site, as redes sociais e o Google da sua empresa.
        </h2>
      </div>
      <Link
        href="/contato"
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white text-sm font-medium rounded-xl transition-all shrink-0"
      >
        Solicitar Diagnóstico <ArrowRight size={16} />
      </Link>
    </section>
  );
}

interface PortfolioHubProps {
  counts: {
    sites: number;
    social: number;
    socialCurrent: number;
    google: number;
  };
}

/**
 * Hub principal em /projetos com 3 cards direcionando para páginas próprias
 */
export function PortfolioGrid({ counts }: PortfolioHubProps) {
  const categories = [
    {
      href: '/projetos/sites',
      number: '01',
      badge: `${counts.sites} ${counts.sites === 1 ? 'projeto' : 'projetos'}`,
      icon: Globe,
      title: 'Sites & Landing Pages',
      description:
        'Sites institucionais ultravelozes em Next.js e landing pages de alta conversão construídos com foco em SEO, autoridade visual e captação de leads.',
      highlights: [
        'Preview interativo dos sites no ar',
        'Arquitetura rápida otimizada para Google',
        'Design responsivo pensado para conversão',
      ],
      cta: 'Ver projetos de sites',
      borderClass: 'border-blue-500/15 hover:border-blue-500/40',
      iconClass: 'bg-blue-500/10 border-blue-500/25 text-blue-400',
      badgeClass: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
      accentText: 'text-blue-400',
      glowClass: 'from-blue-500/15 via-blue-500/5 to-transparent',
    },
    {
      href: '/projetos/redes-sociais',
      number: '02',
      badge:
        counts.social > 0
          ? `${counts.social} ${counts.social === 1 ? 'cliente' : 'clientes'}${
              counts.socialCurrent > 0 ? ` • ${counts.socialCurrent} atual` : ''
            }`
          : 'Cases de Social Media',
      icon: Share2,
      title: 'Gestão de Redes Sociais',
      description:
        'Perfis gerenciados atualmente e cases anteriores com página dedicada por cliente, prints reais de métricas e análise de antes e depois.',
      highlights: [
        'Feed de prints reais das redes sociais',
        'Análise detalhada de Antes vs. Depois',
        'Perfis sob gestão atual e cases anteriores',
      ],
      cta: 'Ver cases de redes sociais',
      borderClass: 'border-purple-500/15 hover:border-purple-500/40',
      iconClass: 'bg-purple-500/10 border-purple-500/25 text-purple-400',
      badgeClass: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
      accentText: 'text-purple-400',
      glowClass: 'from-purple-500/15 via-purple-500/5 to-transparent',
    },
    {
      href: '/projetos/perfil-google',
      number: '03',
      badge:
        counts.google > 0
          ? `${counts.google} ${counts.google === 1 ? 'case' : 'cases'}`
          : 'Google & SEO Local',
      icon: MapPin,
      title: 'Perfis da Empresa no Google',
      description:
        'Principais projetos de criação, otimização e gestão de Perfil da Empresa no Google (Google Meu Negócio) com prints de desempenho e SEO local.',
      highlights: [
        'Prints reais do Google Business Profile',
        'Evolução de buscas, rotas, ligações e cliques',
        'Página dedicada por cliente com estratégia',
      ],
      cta: 'Ver cases do Google',
      borderClass: 'border-emerald-500/15 hover:border-emerald-500/40',
      iconClass: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400',
      badgeClass: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
      accentText: 'text-emerald-400',
      glowClass: 'from-emerald-500/15 via-emerald-500/5 to-transparent',
    },
  ];

  return (
    <div className="px-4 md:px-8 py-8 md:py-10 relative z-20 space-y-12">
      <header className="space-y-3">
        <span className="text-slate-500 text-[10px] font-mono tracking-widest uppercase">
          Portfólio & Cases de Resultado
        </span>
        <h1 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
          Nossos Projetos
        </h1>
        <p className="text-slate-400 font-light max-w-2xl text-sm md:text-base leading-relaxed">
          Escolha uma das frentes abaixo para explorar os principais projetos entregues pela MAGE com métricas, prints reais e análises detalhadas.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.href}
              href={cat.href}
              className={`group relative overflow-hidden bg-[#111923]/60 backdrop-blur-md border ${cat.borderClass} rounded-2xl p-6 md:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]`}
            >
              <div
                aria-hidden="true"
                className={`absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl ${cat.glowClass} rounded-bl-full opacity-50 group-hover:opacity-90 transition-opacity pointer-events-none`}
              />

              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between gap-3">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${cat.iconClass}`}>
                    <Icon size={22} strokeWidth={1.6} />
                  </div>
                  <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border ${cat.badgeClass}`}>
                    {cat.badge}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    Frente {cat.number}
                  </span>
                  <h2 className="text-xl font-medium text-white tracking-tight mt-1">
                    {cat.title}
                  </h2>
                </div>

                <p className="text-sm text-slate-400 font-light leading-relaxed">
                  {cat.description}
                </p>

                <ul className="space-y-2 pt-1">
                  {cat.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-slate-300 font-light">
                      <CheckCircle2 size={14} className={`${cat.accentText} shrink-0 mt-0.5`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <span className={`${cat.accentText} font-medium`}>{cat.cta}</span>
                <ArrowRight
                  size={15}
                  className={`${cat.accentText} transition-transform duration-300 group-hover:translate-x-1`}
                />
              </div>
            </Link>
          );
        })}
      </div>

      <ProjectsCtaBanner />
    </div>
  );
}

const SITE_PALETTES = [
  {
    accentColor: 'text-blue-400',
    tagColorClass: 'text-blue-400/90 bg-blue-500/10 border-blue-500/20',
  },
  {
    accentColor: 'text-emerald-400',
    tagColorClass: 'text-emerald-400/90 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    accentColor: 'text-pink-400',
    tagColorClass: 'text-pink-400/90 bg-pink-500/10 border-pink-500/20',
  },
  {
    accentColor: 'text-amber-400',
    tagColorClass: 'text-amber-400/90 bg-amber-500/10 border-amber-500/20',
  },
  {
    accentColor: 'text-cyan-400',
    tagColorClass: 'text-cyan-400/90 bg-cyan-500/10 border-cyan-500/20',
  },
];

/**
 * Página dedicada: /projetos/sites (vai direto para o site externo do cliente)
 */
export function SitesProjectsSection({ cases }: { cases: ProjectCase[] }) {
  return (
    <div className="px-4 md:px-8 py-8 md:py-10 relative z-20 space-y-10">
      <div className="space-y-4">
        <Link
          href="/projetos"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} /> Voltar para Projetos
        </Link>

        <div>
          <span className="text-blue-400 text-[10px] font-mono tracking-widest uppercase inline-flex items-center gap-1.5">
            <Globe size={12} /> Desenvolvimento Web
          </span>
          <h1 className="text-3xl sm:text-4xl font-medium text-white tracking-tight mt-2">
            Sites & Landing Pages
          </h1>
          <p className="text-slate-400 text-sm md:text-base font-light mt-2 max-w-2xl leading-relaxed">
            Sites institucionais e landing pages de alta velocidade desenvolvidos pela MAGE com foco em SEO, autoridade visual e conversão.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {cases.map((project, index) => {
          const palette = SITE_PALETTES[index % SITE_PALETTES.length];
          const urlHref = project.external_url || '#';
          const shortUrl =
            project.display_url ||
            urlHref.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

          return (
            <article
              key={project.id}
              className="group bg-[#111923]/60 backdrop-blur-md border border-white/5 rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:border-white/10 hover:shadow-[0_0_40px_rgba(0,0,0,0.3)] flex flex-col justify-between"
            >
              <div>
                <a
                  href={urlHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-[#0B0F14]/90 border border-white/10 rounded-xl overflow-hidden shadow-2xl mb-6 hover:border-white/20 transition-colors cursor-pointer group/browser"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#0B0F14]">
                    <div className="flex gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <div className="bg-white/5 rounded-md px-3 py-1 text-[10px] font-mono text-slate-500 w-1/2 text-center truncate border border-white/5">
                      {shortUrl}
                    </div>
                    <div className="w-[30px] flex justify-end">
                      <ExternalLink
                        size={10}
                        className="text-slate-600 group-hover/browser:text-slate-300 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="h-72 overflow-hidden relative group/screen bg-[#0d121a]">
                    {project.cover_image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.cover_image}
                        alt={project.client_name}
                        loading="lazy"
                        className="absolute top-0 left-0 w-full h-auto object-cover transition-transform duration-[6000ms] ease-in-out transform translate-y-0 group-hover/screen:-translate-y-[calc(100%-18rem)] group-hover:-translate-y-[calc(100%-18rem)]"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-slate-600 font-mono text-xs">
                        {shortUrl}
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-[#0B0F14]/80 to-transparent pointer-events-none" />
                  </div>
                </a>

                <div className="px-2">
                  {project.subtitle && (
                    <span
                      className={`text-[10px] font-mono tracking-widest block mb-2 font-semibold uppercase ${palette.accentColor}`}
                    >
                      {project.subtitle}
                    </span>
                  )}
                  <h2 className="text-xl font-medium text-white tracking-tight mb-3">
                    {project.client_name}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed font-light mb-6">
                    {project.summary}
                  </p>
                </div>
              </div>

              <div className="px-2 mt-auto">
                <div className="flex flex-wrap gap-2 items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex flex-wrap gap-2">
                    {project.platforms.map((tag) => (
                      <span
                        key={tag}
                        className={`text-[10px] font-mono px-2 py-1 rounded-md border ${palette.tagColorClass}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={urlHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 text-xs font-medium font-mono group-hover:underline transition-colors ${palette.accentColor}`}
                  >
                    Ver Projeto
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <ProjectsCtaBanner />
    </div>
  );
}

/**
 * Listagem de clientes de Redes Sociais (/projetos/redes-sociais) -> abre página do cliente
 */
export function SocialProjectsSection({ cases }: { cases: ProjectCase[] }) {
  return (
    <div className="px-4 md:px-8 py-8 md:py-10 relative z-20 space-y-10">
      <div className="space-y-4">
        <Link
          href="/projetos"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} /> Voltar para Projetos
        </Link>

        <div>
          <span className="text-purple-400 text-[10px] font-mono tracking-widest uppercase inline-flex items-center gap-1.5">
            <Share2 size={12} /> Social Media & Conteúdo
          </span>
          <h1 className="text-3xl sm:text-4xl font-medium text-white tracking-tight mt-2">
            Gestão de Redes Sociais
          </h1>
          <p className="text-slate-400 text-sm md:text-base font-light mt-2 max-w-2xl leading-relaxed">
            Selecione um cliente abaixo para abrir a página completa do case, com prints reais das métricas e a análise detalhada de antes e depois.
          </p>
        </div>
      </div>

      {cases.length === 0 ? (
        <div className="bg-[#111923]/50 border border-white/5 rounded-2xl p-10 md:p-14 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto">
            <Sparkles size={22} />
          </div>
          <h2 className="text-lg font-medium text-white">Cases de Redes Sociais em atualização</h2>
          <p className="text-sm text-slate-400 font-light max-w-md mx-auto">
            Estamos publicando os prints e análises detalhadas dos nossos clientes de gestão de redes sociais.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {cases.map((item) => {
            const thumb = item.cover_image || item.media_items[0]?.image_url || null;
            return (
              <Link
                key={item.id}
                href={`/projetos/redes-sociais/${item.slug}`}
                className="group bg-[#111923]/60 backdrop-blur-md border border-white/5 hover:border-purple-500/35 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
              >
                <div>
                  {/* Cover Preview */}
                  <div className="h-56 w-full relative bg-gradient-to-br from-purple-950/50 via-[#0F1622] to-blue-950/30 overflow-hidden border-b border-white/5">
                    {thumb ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={thumb}
                        alt={item.client_name}
                        loading="lazy"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Share2 size={36} className="text-purple-400/25" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14]/85 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      <span
                        className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md ${
                          item.management_status === 'atual'
                            ? 'bg-emerald-500/20 text-emerald-200 border-emerald-500/35'
                            : 'bg-black/60 text-slate-200 border-white/15'
                        }`}
                      >
                        {item.management_status === 'atual' ? '● Gestão Atual' : 'Case Anterior'}
                      </span>
                      {item.niche && (
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/60 text-purple-200 border border-purple-500/30 backdrop-blur-md">
                          {item.niche}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/70 border border-white/10 text-[10px] font-mono text-slate-200 inline-flex items-center gap-1.5 backdrop-blur-md">
                      <ImageIcon size={11} className="text-purple-400" />
                      {item.media_items.length}{' '}
                      {item.media_items.length === 1 ? 'print e análise' : 'prints e análises'}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-3">
                    {item.subtitle && (
                      <span className="text-xs font-mono text-purple-400 block">{item.subtitle}</span>
                    )}
                    <h2 className="text-xl font-medium text-white group-hover:text-purple-200 transition-colors tracking-tight">
                      {item.client_name}
                    </h2>
                    <p className="text-sm text-slate-400 font-light leading-relaxed line-clamp-3">
                      {item.summary}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {item.platforms.slice(0, 3).map((plat) => (
                      <span
                        key={plat}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-300"
                      >
                        {plat}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-mono text-purple-300 inline-flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform">
                    Ver métricas e análises <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <ProjectsCtaBanner />
    </div>
  );
}

/**
 * Listagem de clientes de Perfil da Empresa no Google (/projetos/perfil-google) -> abre página do cliente
 */
export function GoogleProjectsSection({ cases }: { cases: ProjectCase[] }) {
  return (
    <div className="px-4 md:px-8 py-8 md:py-10 relative z-20 space-y-10">
      <div className="space-y-4">
        <Link
          href="/projetos"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} /> Voltar para Projetos
        </Link>

        <div>
          <span className="text-emerald-400 text-[10px] font-mono tracking-widest uppercase inline-flex items-center gap-1.5">
            <MapPin size={12} /> Busca Local & SEO
          </span>
          <h1 className="text-3xl sm:text-4xl font-medium text-white tracking-tight mt-2">
            Perfis da Empresa no Google
          </h1>
          <p className="text-slate-400 text-sm md:text-base font-light mt-2 max-w-2xl leading-relaxed">
            Clique em um cliente para abrir a página completa do case com prints do Google Meu Negócio, métricas de busca local e análise de antes e depois.
          </p>
        </div>
      </div>

      {cases.length === 0 ? (
        <div className="bg-[#111923]/50 border border-white/5 rounded-2xl p-10 md:p-14 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <Sparkles size={22} />
          </div>
          <h2 className="text-lg font-medium text-white">Cases do Google em atualização</h2>
          <p className="text-sm text-slate-400 font-light max-w-md mx-auto">
            Estamos publicando os principais Perfis da Empresa no Google com prints de desempenho e resultados de SEO local.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {cases.map((item) => {
            const thumb = item.cover_image || item.media_items[0]?.image_url || null;
            return (
              <Link
                key={item.id}
                href={`/projetos/perfil-google/${item.slug}`}
                className="group bg-[#111923]/60 backdrop-blur-md border border-white/5 hover:border-emerald-500/35 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
              >
                <div>
                  <div className="h-56 w-full relative bg-gradient-to-br from-emerald-950/50 via-[#0F1622] to-blue-950/30 overflow-hidden border-b border-white/5">
                    {thumb ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={thumb}
                        alt={item.client_name}
                        loading="lazy"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <MapPin size={36} className="text-emerald-400/25" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14]/85 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      {item.niche && (
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-500/35 backdrop-blur-md">
                          {item.niche}
                        </span>
                      )}
                      {item.subtitle && (
                        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-black/60 text-slate-200 border border-white/15 backdrop-blur-md">
                          {item.subtitle}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/70 border border-white/10 text-[10px] font-mono text-slate-200 inline-flex items-center gap-1.5 backdrop-blur-md">
                      <ImageIcon size={11} className="text-emerald-400" />
                      {item.media_items.length}{' '}
                      {item.media_items.length === 1 ? 'print e análise' : 'prints e análises'}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    {item.period && (
                      <span className="text-[11px] font-mono text-emerald-400 block">{item.period}</span>
                    )}
                    <h2 className="text-xl font-medium text-white group-hover:text-emerald-200 transition-colors tracking-tight">
                      {item.client_name}
                    </h2>
                    <p className="text-sm text-slate-400 font-light leading-relaxed line-clamp-3">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between gap-3">
                  <span className="text-[11px] font-mono text-slate-500">
                    Google Meu Negócio + SEO
                  </span>
                  <span className="text-xs font-mono text-emerald-300 inline-flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform">
                    Ver resultados e prints <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <ProjectsCtaBanner />
    </div>
  );
}

/**
 * Página individual do cliente (/projetos/redes-sociais/[slug] e /projetos/perfil-google/[slug])
 */
export function ClientCaseDetailView({ item }: { item: ProjectCase }) {
  const isSocial = item.type === 'social';
  const backHref = isSocial ? '/projetos/redes-sociais' : '/projetos/perfil-google';
  const backLabel = isSocial ? 'Voltar para Redes Sociais' : 'Voltar para Perfis no Google';
  const accent = isSocial ? 'purple' : 'emerald';

  return (
    <div className="px-4 md:px-8 py-8 md:py-10 relative z-20 space-y-10">
      {/* Back + Header */}
      <header className="space-y-5">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} /> {backLabel}
        </Link>

        <div className="bg-[#111923]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 md:p-8 space-y-5">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                {isSocial && (
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      item.management_status === 'atual'
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25'
                        : 'bg-slate-500/10 text-slate-300 border-white/10'
                    }`}
                  >
                    {item.management_status === 'atual' ? '● Gestão Atual' : 'Case Anterior'}
                  </span>
                )}
                {item.niche && (
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      isSocial
                        ? 'bg-purple-500/10 text-purple-300 border-purple-500/25'
                        : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25'
                    }`}
                  >
                    {item.niche}
                  </span>
                )}
                {item.period && (
                  <span className="text-[11px] font-mono text-slate-400">{item.period}</span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
                {item.client_name}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                {item.subtitle && (
                  <span
                    className={`font-mono ${isSocial ? 'text-purple-400' : 'text-emerald-400'}`}
                  >
                    {item.subtitle}
                  </span>
                )}
                {item.platforms.length > 0 && (
                  <>
                    <span className="text-slate-600">•</span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.platforms.map((plat) => (
                        <span
                          key={plat}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300"
                        >
                          {plat}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-3xl">
                {item.summary}
              </p>
            </div>

            {item.external_url && (
              <a
                href={item.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2.5 rounded-xl border text-xs font-mono inline-flex items-center gap-2 shrink-0 transition-colors ${
                  isSocial
                    ? 'bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/30 text-purple-200'
                    : 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30 text-emerald-200'
                }`}
              >
                {isSocial ? 'Abrir Perfil' : 'Ver no Google Maps'}
                <ExternalLink size={13} />
              </a>
            )}
          </div>

          {/* Strategy Overview Cards */}
          {(item.challenge || item.strategy || item.results) && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-4 border-t border-white/5">
              {item.challenge && (
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
                  <h2 className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                    Cenário Inicial
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light whitespace-pre-line">
                    {item.challenge}
                  </p>
                </div>
              )}

              {item.strategy && (
                <div
                  className={`bg-white/[0.02] border rounded-xl p-5 ${
                    isSocial ? 'border-purple-500/20' : 'border-emerald-500/20'
                  }`}
                >
                  <h2
                    className={`text-xs font-mono uppercase tracking-wider mb-2 ${
                      isSocial ? 'text-purple-300' : 'text-emerald-300'
                    }`}
                  >
                    Estratégia Aplicada
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light whitespace-pre-line">
                    {item.strategy}
                  </p>
                </div>
              )}

              {item.results && (
                <div className="bg-white/[0.02] border border-emerald-500/20 rounded-xl p-5">
                  <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-300 mb-2">
                    Resultado Gerado
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light whitespace-pre-line">
                    {item.results}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Feed de Prints & Análises Antes e Depois */}
      <section className="space-y-6" aria-labelledby="feed-metricas-heading">
        <div>
          <span
            className={`text-[10px] font-mono uppercase tracking-widest ${
              isSocial ? 'text-purple-400' : 'text-emerald-400'
            }`}
          >
            Comprovação Visual • Clique em qualquer print para ampliar
          </span>
          <h2
            id="feed-metricas-heading"
            className="text-2xl sm:text-3xl font-medium text-white tracking-tight mt-1"
          >
            Métricas e Análises — Antes e Depois
          </h2>
        </div>

        <CasePrintFeed items={item.media_items} accent={accent} />
      </section>

      <ProjectsCtaBanner />
    </div>
  );
}
