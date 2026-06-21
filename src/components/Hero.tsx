import React from 'react';

export function Hero() {
  return (
    <section className="relative z-20 flex flex-col lg:flex-row items-center justify-between px-8 py-12 gap-12">
      <div className="max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-medium text-white leading-tight mb-6 tracking-tight">
          Tecnologia com propósito. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            Design com clareza.
          </span>
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-xl font-light">
          Unimos código e criatividade para construir soluções digitais que conectam, inspiram e geram impacto real.
        </p>

        <div className="flex items-center gap-6">
          <button className="px-6 py-3 bg-blue-500/10 border border-blue-500/30 text-blue-300 rounded-lg font-medium hover:bg-blue-500/20 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 flex items-center gap-2">
            Ver projetos <span className="font-mono text-lg leading-none">&rarr;</span>
          </button>
          
          <button className="group flex items-center gap-3 text-slate-300 hover:text-white transition-colors duration-300 font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 group-hover:shadow-[0_0_10px_rgba(16,185,129,0.8)] transition-all duration-300"></span>
            Falar com o time
          </button>
        </div>
      </div>

      <div className="hidden lg:block relative group">
        <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl blur-lg opacity-50 group-hover:opacity-70 transition duration-500"></div>
        <div className="relative bg-[#111923]/80 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl min-w-[320px]">
          <div className="flex gap-2 mb-4 border-b border-white/5 pb-4">
            <div className="h-2.5 w-2.5 rounded-full bg-slate-600/50"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-slate-600/50"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-slate-600/50"></div>
          </div>
          <pre className="font-mono text-sm">
            <code className="text-slate-300">
              <span className="text-purple-400">function</span> <span className="text-blue-400">mage</span>() {'{'}
              <br />
              {'  '}<span className="text-yellow-200">strategy</span>();
              <br />
              {'  '}<span className="text-yellow-200">design</span>();
              <br />
              {'  '}<span className="text-yellow-200">code</span>();
              <br />
              {'  '}
              <br />
              {'  '}<span className="text-purple-400">return</span> <span className="text-emerald-300">'impact'</span>;
              <br />
              {'}'}
            </code>
          </pre>
          <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-xs font-mono text-slate-500">
            <span>Mage Stack</span>
            <span>v2.4.1</span>
          </div>
        </div>
      </div>
    </section>
  );
}
