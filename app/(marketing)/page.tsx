import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, ExternalLink, Layers } from 'lucide-react';
import { Hero } from '@/src/components/Hero';
import { ServicesGrid } from '@/src/components/ServicesGrid';
import { BottomGrid } from '@/src/components/BottomGrid';
import { FaqSection } from '@/src/components/seo/FaqSection';
import { PROJECTS } from '@/src/data/projects';

export const metadata: Metadata = {
  title: {
    absolute: 'MAGE Comunicação — Criação de Sites, Gestão de Redes Sociais & SEO',
  },
  description:
    'Digital studio especializado em criação de sites e landing pages, gestão de redes sociais (Instagram, Facebook, TikTok) e gestão de Perfil da Empresa no Google com SEO. Base no Rio de Janeiro com atendimento nacional remoto.',
  alternates: {
    canonical: '/',
  },
};

const MAGE_METHOD_SUMMARY = [
  {
    letter: 'M',
    title: 'Método',
    description:
      'Processos claros, cronograma definido e entregas consistentes. Nada na sua presença digital fica no improviso.',
    badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  },
  {
    letter: 'A',
    title: 'Autoridade',
    description:
      'Conteúdo e design que fazem o cliente reconhecer o valor real da sua empresa antes mesmo do primeiro contato.',
    badgeClass: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  },
  {
    letter: 'G',
    title: 'Gestão',
    description:
      'Assumimos a operação de ponta a ponta com atendimento próximo e transparente para você voltar a focar no seu negócio.',
    badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  },
  {
    letter: 'E',
    title: 'Estratégia',
    description:
      'Cada página, vídeo e otimização no Google é pensada para atrair atenção qualificada e gerar oportunidades reais.',
    badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  },
];

export default function MarketingHomePage() {
  const featuredProjects = PROJECTS.filter((p) => [1, 2, 5].includes(p.id));

  return (
    <>
      {/* SEÇÃO 1: HERO (H1) */}
      <Hero />

      {/* SEÇÃO 2: A TESE / ECOSSISTEMA INTEGRADO (H2) */}
      <section
        className="px-4 md:px-8 mt-10 relative z-20"
        aria-labelledby="tese-ecossistema-heading"
      >
        <div className="bg-[#111923]/55 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-blue-400 font-mono text-[11px] uppercase tracking-widest inline-flex items-center gap-2">
                <Layers size={13} />
                Ecossistema Integrado
              </span>
              <h2
                id="tese-ecossistema-heading"
                className="text-2xl sm:text-3xl font-medium text-white tracking-tight leading-snug"
              >
                Empresas maduras não escalam em fragmentos.
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
                Muitas empresas vivem o mesmo desgaste: contratam posts soltos sem estratégia, um site lento que não converte e deixam o perfil no Google desatualizado. O resultado é uma colcha de retalhos digital que consome tempo e trava o crescimento.
              </p>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
                Na MAGE, <strong className="text-white font-medium">tecnologia e comunicação trabalham juntas como um único ecossistema</strong>. Conectamos gestão de redes sociais, desenvolvimento de sites e landing pages e gestão do Perfil da Empresa no Google com SEO para que sua marca seja encontrada e escolhida com previsibilidade.
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 gap-3">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider">
                  01 • Comunicação & Conteúdo
                </span>
                <p className="text-xs sm:text-sm text-slate-300 font-light mt-1">
                  Gestão de Instagram, Facebook, TikTok e apoio prático para quem já grava ou quer criar conteúdo sem travar na rotina.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider">
                  02 • Sites & Landing Pages
                </span>
                <p className="text-xs sm:text-sm text-slate-300 font-light mt-1">
                  Páginas ultrarrápidas construídas para transformar o interesse do público em contatos e pedidos de orçamento.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                  03 • Google & SEO
                </span>
                <p className="text-xs sm:text-sm text-slate-300 font-light mt-1">
                  Criação e gestão do Perfil da Empresa no Google integrada a SEO para capturar clientes no momento exato da busca.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: NOSSAS FRENTES DE ATUAÇÃO (H2 + 4 Cards H3) */}
      <ServicesGrid />

      {/* SEÇÃO 4: CASES EM DESTAQUE (H2 + 3 Cards H3) */}
      <section
        className="px-4 md:px-8 mt-16 relative z-20"
        aria-labelledby="cases-destaque-heading"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-slate-500 text-[11px] font-mono tracking-widest uppercase">
              Portfólio Selecionado
            </span>
            <h2
              id="cases-destaque-heading"
              className="text-2xl sm:text-3xl font-medium text-white tracking-tight mt-2"
            >
              Projetos construídos para gerar autoridade e conversão
            </h2>
          </div>

          <Link
            href="/projetos"
            className="text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 shrink-0"
          >
            Ver todos os projetos <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              className="group bg-[#111923]/55 border border-white/5 hover:border-white/15 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <a
                  href={project.realUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block h-44 w-full rounded-xl overflow-hidden border border-white/10 mb-4 bg-[#0B0F14]"
                >
                  <Image
                    src={project.image}
                    alt={`Projeto ${project.title} desenvolvido pela MAGE Comunicação`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14]/70 via-transparent to-transparent" />
                  <span className="absolute top-2.5 right-2.5 w-7 h-7 rounded-lg bg-[#0B0F14]/80 border border-white/10 text-slate-300 group-hover:text-white flex items-center justify-center">
                    <ExternalLink size={12} />
                  </span>
                </a>

                <span
                  className={`text-[10px] font-mono tracking-wider uppercase block mb-1.5 font-semibold ${project.accentColor}`}
                >
                  {project.label}
                </span>
                <h3 className="text-base font-medium text-white leading-snug mb-2">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-light line-clamp-3 mb-4">
                  {project.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border ${project.tagColorClass}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.realUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-[11px] font-mono flex items-center gap-1 hover:underline ${project.accentColor}`}
                >
                  Visitar <ArrowUpRight size={12} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SEÇÃO 5: O MÉTODO M.A.G.E. (H2 + 4 Cards H3) */}
      <section
        className="px-4 md:px-8 mt-16 relative z-20"
        aria-labelledby="metodo-mage-heading"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-slate-500 text-[11px] font-mono tracking-widest uppercase">
              Como Operamos
            </span>
            <h2
              id="metodo-mage-heading"
              className="text-2xl sm:text-3xl font-medium text-white tracking-tight mt-2"
            >
              O Método M.A.G.E.
            </h2>
            <p className="text-slate-400 text-sm md:text-base font-light mt-2 max-w-2xl">
              Um padrão de entrega pensado para tirar o peso da operação digital das suas costas.
            </p>
          </div>

          <Link
            href="/sobre"
            className="text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 shrink-0"
          >
            Conheça quem constrói a MAGE <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MAGE_METHOD_SUMMARY.map((item) => (
            <div
              key={item.letter}
              className="bg-[#111923]/45 border border-white/5 hover:border-white/15 rounded-2xl p-5 backdrop-blur-sm transition-all duration-300"
            >
              <span
                className={`w-9 h-9 rounded-xl border inline-flex items-center justify-center font-mono font-bold text-base mb-4 ${item.badgeClass}`}
              >
                {item.letter}
              </span>
              <h3 className="text-base font-semibold text-white tracking-tight mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SEÇÃO 6: FAQ VISÍVEL COM SCHEMA FAQPage (H2 + H3) */}
      <FaqSection />

      {/* SEÇÃO 7: CTA FINAL DE CONVERSÃO (H2) */}
      <BottomGrid />
    </>
  );
}
