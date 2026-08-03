import React from 'react';
import Image from 'next/image';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { PROJECTS } from '../data/projects';


export function PortfolioGrid() {
  return (
    <section className="px-4 md:px-8 py-8 md:py-10 relative z-20">
      {/* Title / Section Header */}
      <div className="mb-8 md:mb-10">
        <span className="text-slate-500 text-[10px] font-mono tracking-widest uppercase">Cases de Sucesso</span>
        <h2 className="text-3xl font-medium text-white tracking-tight mt-2">
          Nossos Projetos
        </h2>
      </div>

      {/* Grid of Portfolio Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {PROJECTS.map((project) => (
          <div 
            key={project.id}
            className="group bg-[#111923]/60 backdrop-blur-md border border-white/5 rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:border-white/10 hover:shadow-[0_0_40px_rgba(0,0,0,0.3)] flex flex-col justify-between"
          >
            <div>
              {/* Browser Window Simulation */}
              <a 
                href={project.realUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#0B0F14]/90 border border-white/10 rounded-xl overflow-hidden shadow-2xl mb-6 hover:border-white/20 transition-colors cursor-pointer group/browser"
              >
                {/* Browser Header / Tab Bar */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#0B0F14]">
                  {/* Left Controls */}
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                  </div>

                  {/* Address Bar */}
                  <div className="bg-white/5 rounded-md px-3 py-1 text-[10px] font-mono text-slate-500 w-1/2 text-center truncate border border-white/5">
                    {project.url}
                  </div>

                  {/* Right Spacing / Icon */}
                  <div className="w-[30px] flex justify-end">
                    <ExternalLink size={10} className="text-slate-600 group-hover/browser:text-slate-300 transition-colors" />
                  </div>
                </div>

                {/* Screenshot Container */}
                <div className="h-72 overflow-hidden relative group/screen bg-[#0d121a]">
                  {/* Scrollable screenshot image */}
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={1200}
                    height={1800}
                    className="absolute top-0 left-0 w-full h-auto object-cover transition-transform duration-[6000ms] ease-in-out transform translate-y-0 group-hover/screen:-translate-y-[calc(100%-18rem)] group-hover:-translate-y-[calc(100%-18rem)]"
                  />
                  {/* Glass overlay at the bottom to give depth */}
                  <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-[#0B0F14]/80 to-transparent pointer-events-none"></div>
                </div>
              </a>

              {/* Project Metadados */}
              <div className="px-2">
                {/* Tech Label */}
                <span className={`text-[10px] font-mono tracking-widest block mb-2 font-semibold ${project.accentColor}`}>
                  {project.label}
                </span>

                {/* Title */}
                <h3 className="text-xl font-medium text-white tracking-tight mb-3">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed font-light mb-6">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Bottom Details (Tags + Link) */}
            <div className="px-2 mt-auto">
              <div className="flex flex-wrap gap-2 items-center justify-between pt-4 border-t border-white/5">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className={`text-[10px] font-mono px-2 py-1 rounded-md border ${project.tagColorClass}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link "Ver Projeto" */}
                <a 
                  href={project.realUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 text-xs font-medium font-mono group-hover:underline transition-colors ${project.accentColor}`}
                >
                  Ver Projeto
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
