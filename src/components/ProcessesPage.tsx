import React from 'react';
import { MessageSquare, Layout, Code2, Rocket, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    phase: '01',
    title: 'Alinhamento & Estratégia',
    icon: MessageSquare,
    description: 'Imersão total no seu modelo de negócios. Realizamos reuniões de discovery para compreender os desafios técnicos, comportamento do usuário e objetivos estratégicos.',
    techs: ['Reuniões de Discovery', 'Análise de Concorrentes', 'Escopo Técnico Detalhado'],
    glowColor: 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]',
    iconColor: 'text-blue-400 border-blue-500/20 bg-blue-500/5'
  },
  {
    phase: '02',
    title: 'Estruturação & Design (UI/UX)',
    icon: Layout,
    description: 'Traduzimos a estratégia em wireframes e designs visuais deslumbrantes. Focamos em criar uma experiência limpa, futurista e altamente intuitiva.',
    techs: ['Protótipo Figma Interativo', 'Design System Exclusivo', 'Design Responsivo Mobile/Desktop'],
    glowColor: 'bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]',
    iconColor: 'text-purple-400 border-purple-500/20 bg-purple-500/5'
  },
  {
    phase: '03',
    title: 'Desenvolvimento de Alta Performance',
    icon: Code2,
    description: 'Escrevemos código limpo utilizando stacks de ponta. Desenvolvemos com foco em modularidade, velocidade de carregamento, SEO de fábrica e segurança robusta.',
    techs: ['Next.js / React', 'TailwindCSS / CSS Limpo', 'Otimização Extrema de Web Vitals'],
    glowColor: 'bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]',
    iconColor: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5'
  },
  {
    phase: '04',
    title: 'Homologação & Lançamento',
    icon: Rocket,
    description: 'Realizamos baterias de testes rigorosos em múltiplos dispositivos e navegadores. Lançamos a plataforma garantindo integração com analíticos e configurações perfeitas de SEO.',
    techs: ['Testes em Múltiplos Viewports', 'Deploy em Vercel/AWS', 'Configuração de DNS e Domínio'],
    glowColor: 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]',
    iconColor: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5'
  }
];

export function ProcessesPage() {
  return (
    <section className="px-4 md:px-8 py-8 md:py-10 relative z-20">
      {/* Page Header */}
      <div className="mb-12">
        <span className="text-slate-500 text-[10px] font-mono tracking-widest uppercase">// nossa metodologia</span>
        <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight mt-2">
          Como Trabalhamos
        </h2>
        <p className="text-slate-400 font-light mt-4 max-w-2xl text-sm md:text-base">
          Seguimos um processo refinado e iterativo que transforma conceitos complexos em produtos digitais funcionais de altíssimo nível técnico.
        </p>
      </div>

      {/* Timeline Steps */}
      <div className="relative border-l border-white/5 ml-4 md:ml-6 space-y-12">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="relative pl-8 md:pl-10 group">
              {/* Timeline Connector Indicator (Glowing dot) */}
              <span className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ${step.glowColor}`}></span>
              
              <div className="bg-[#111923]/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 md:p-8 hover:border-white/10 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  {/* Phase & Title */}
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-slate-500 tracking-wider">FASE {step.phase}</span>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${step.iconColor} border`}>
                      <Icon size={18} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg md:text-xl font-medium text-white tracking-tight">{step.title}</h3>
                  </div>

                  {/* Badges/Tags of deliverables in the process */}
                  <div className="flex flex-wrap gap-1.5">
                    {step.techs.map((tech, idx) => (
                      <span key={idx} className="text-[9px] font-mono text-slate-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
