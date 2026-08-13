import React from 'react';
import { 
  Terminal, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  MessageSquare,
  Cpu,
  Compass
} from 'lucide-react';

const MAGE_METHOD = [
  {
    letter: 'M',
    title: 'Método',
    description: 'Processos claros, cronogramas rigorosamente cumpridos e entregas com padrão técnico consistente. Nada é feito no improviso.',
    borderColor: 'border-blue-500/20 hover:border-blue-500/40',
    bgGradient: 'from-blue-500/10 to-transparent',
    badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30'
  },
  {
    letter: 'A',
    title: 'Autoridade',
    description: 'Construímos uma presença visual e narrativa que faz o seu cliente reconhecer o valor real do seu trabalho antes mesmo da primeira conversa.',
    borderColor: 'border-purple-500/20 hover:border-purple-500/40',
    bgGradient: 'from-purple-500/10 to-transparent',
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30'
  },
  {
    letter: 'G',
    title: 'Gestão',
    description: 'Assumimos a operação de ponta a ponta com atendimento direto e transparente. Você para de ser o revisor do marketing e volta a ser o líder da sua empresa.',
    borderColor: 'border-emerald-500/20 hover:border-emerald-500/40',
    bgGradient: 'from-emerald-500/10 to-transparent',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
  },
  {
    letter: 'E',
    title: 'Estratégia',
    description: 'Cada linha de código e cada peça de comunicação são desenhadas com um único objetivo: trazer atenção qualificada para sua empresa.',
    borderColor: 'border-amber-500/20 hover:border-amber-500/40',
    bgGradient: 'from-amber-500/10 to-transparent',
    badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
  }
];

const LEADERSHIP = [
  {
    name: 'Vitor Magioli',
    role: 'Cofundador | Analista de sistemas & Tecnologia Estrutural',
    bio: 'Focado na arquitetura técnica, desenvolvimento de sites e sistemas de alta performance, automações e segurança. Garante que a fachada digital do seu negócio seja rápida, estável e preparada para suportar o crescimento da operação sem falhas.',
    icon: Terminal,
    accentColor: 'text-blue-400',
    gradient: 'from-blue-500/20 via-blue-500/5 to-transparent',
    border: 'border-blue-500/20 hover:border-blue-500/40',
    badge: 'TECNOLOGIA & SISTEMAS'
  },
  {
    name: 'Lana Magioli',
    role: 'Cofundadora | Branding & Estratégia Narrativa',
    bio: 'Especialista em posicionamento de marca, psicologia de conversão e orquestração de conteúdo. Transforma a autoridade real de empresas e profissionais liberais em uma comunicação magnética, elegante e voltada para criação de comunidades e atração de leads.',
    icon: Sparkles,
    accentColor: 'text-emerald-400',
    gradient: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    badge: 'BRANDING & CONVERSÃO'
  }
];

const PRINCIPLES = [
  {
    number: '01',
    title: 'Clareza antes do malabarismo',
    description: 'Eliminamos jargões vazios, modismos passageiros e promessas fúteis. Trabalhamos com o que gera resultado concreto para o seu modelo de negócio.',
    icon: Compass
  },
  {
    number: '02',
    title: 'Tecnologia palpável e de alta velocidade',
    description: 'Nossos sites e sistemas são construídos com código limpo e arquitetura moderna, garantindo carregamento em milissegundos e navegação sem atrito.',
    icon: Cpu
  },
  {
    number: '03',
    title: 'Comunicação que preserva a sua autoridade',
    description: 'Conteúdos que educam e qualificam o seu público, sem obrigar profissionais sérios a se exporem a formatos infantis ou constrangedores.',
    icon: ShieldCheck
  },
  {
    number: '04',
    title: 'Atendimento com previsibilidade',
    description: 'Respostas ágeis, alinhamentos objetivos e reporte periódico. Você sempre sabe em que fase o seu projeto está.',
    icon: Zap
  }
];

const WHATSAPP_URL = 'https://wa.me/5521993963503?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20diagn%C3%B3stico%20estrat%C3%A9gico%20para%20minha%20empresa.';

export function AboutPage() {
  return (
    <section className="px-4 md:px-8 py-8 md:py-12 relative z-20 space-y-16 md:space-y-20">
      
      {/* SEÇÃO 1: CABEÇALHO DA PÁGINA */}
      <div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight mt-2">
          Sobre a MAGE
        </h1>
        <p className="text-slate-300 font-light mt-4 w-full text-sm md:text-base leading-relaxed">
          A MAGE é um Digital Studio para empresas e profissionais que estão começando ou já construíram algo relevante no mundo físico e querem delegar a preocupação e o trabalho de estar presente e avançar no digital.
        </p>

        <div className="mt-6">
          <a 
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-medium rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 cursor-pointer text-sm md:text-base group"
          >
            <MessageSquare size={18} className="text-white group-hover:scale-110 transition-transform" />
            <span>Quero saber mais</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* SEÇÃO 2: O MANIFESTO (A Tese da MAGE) */}
      <div className="space-y-6 bg-[#111923]/40 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
        <div>
          <span className="text-blue-400 font-mono text-xs uppercase tracking-widest">NOSSA TESE</span>
          <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight mt-2">
            Nossa Missão é unir <span className="text-blue-400">código</span> e <span className="text-emerald-400">criatividade</span>.
          </h2>
          <h3 className="text-lg md:text-xl font-medium text-slate-200 tracking-tight mt-3">
            Empresas maduras não escalam em fragmentos.
          </h3>
        </div>

        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed font-light w-full">
          <p>
            A maioria das empresas vive o mesmo ciclo de frustração: contratam uma agência para fazer posts soltos, um desenvolvedor isolado para o site e ferramentas que não conversam entre si. O resultado é um ecossistema digital desordenado, onde o empresário gasta horas gerenciando fornecedores em vez de focar no próprio negócio.
          </p>
          <p>
            A MAGE nasceu para substituir essa colcha de retalhos por uma <strong className="text-white font-medium">estrutura completa e integrada</strong>. Nós não somos uma agência de social media; somos um digital studio que une engenharia de software, branding de autoridade e estratégia comercial na mesma mesa.
          </p>
          <p className="text-white font-normal pt-1">
            Tiramos o peso da operação das suas costas para que a sua empresa tenha uma presença digital à altura do tamanho do seu negócio.
          </p>
        </div>
      </div>

      {/* SEÇÃO 3: O SIGNIFICADO DE M.A.G.E (O Nosso Método) */}
      <div>
        <div className="mb-8">
          <span className="text-slate-500 font-mono text-xs uppercase tracking-widest">O PILAR OPERACIONAL</span>
          <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight mt-2">
            Construído com método. Sustentado por resultados.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MAGE_METHOD.map((pilar) => (
            <div 
              key={pilar.letter}
              className={`bg-[#111923]/40 border ${pilar.borderColor} rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group flex flex-col justify-between`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${pilar.bgGradient} rounded-bl-full opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none`} />
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`w-10 h-10 rounded-xl border flex items-center justify-center font-mono font-bold text-lg ${pilar.badgeBg}`}>
                    {pilar.letter}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white tracking-tight mb-2">
                  {pilar.title}
                </h3>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-light">
                  {pilar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEÇÃO 4: A LIDERANÇA (A Colisão de Forças) */}
      <div>
        <div className="mb-8">
          <span className="text-slate-500 font-mono text-xs uppercase tracking-widest">QUEM CONSTRÓI A MAGE</span>
          <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight mt-2">
            A Colisão de Forças.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {LEADERSHIP.map((leader) => {
            const IconComponent = leader.icon;
            return (
              <div 
                key={leader.name}
                className={`bg-[#111923]/50 border ${leader.border} rounded-2xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:shadow-xl`}
              >
                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${leader.gradient} rounded-bl-full pointer-events-none`} />
                
                <div className="relative z-10 flex flex-col h-full justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[10px] tracking-wider text-slate-400 uppercase bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                        {leader.badge}
                      </span>
                      <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${leader.accentColor}`}>
                        <IconComponent size={22} strokeWidth={1.5} />
                      </div>
                    </div>

                    <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
                      {leader.name}
                    </h3>
                    <p className={`text-xs md:text-sm font-medium ${leader.accentColor} mt-1 mb-4 italic`}>
                      {leader.role}
                    </p>

                    <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-light">
                      {leader.bio}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SEÇÃO 5: NOSSOS PRINCÍPIOS (Como Operamos) */}
      <div>
        <div className="mb-8">
          <span className="text-slate-500 font-mono text-xs uppercase tracking-widest">CULTURA & PADRÃO DE ENTREGA</span>
          <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight mt-2">
            O que você encontra na MAGE:
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRINCIPLES.map((principle) => {
            return (
              <div 
                key={principle.number}
                className="bg-[#111923]/40 border border-white/5 hover:border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm transition-colors flex gap-4 items-start"
              >
                <div className="font-mono text-blue-400 font-semibold text-base sm:text-lg bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-xl shrink-0">
                  {principle.number}
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
                    {principle.title}
                  </h3>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-light">
                    {principle.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SEÇÃO 6: FECHAMENTO & CTA (Conversão) */}
      <div className="relative rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-950/40 via-[#111923] to-emerald-950/30 p-8 md:p-12 overflow-hidden shadow-2xl">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-6">
          <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest">O PRÓXIMO PASSO</span>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-white tracking-tight leading-tight">
            Pronto para construir uma presença digital à altura da sua empresa?
          </h2>
          
          <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
            Agende uma reunião de diagnóstico estratégico. Vamos analisar a sua estrutura atual e traçar o plano ideal para a sua marca.
          </p>

          <div className="pt-2">
            <a 
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-medium rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 cursor-pointer text-sm md:text-base group"
            >
              <MessageSquare size={18} className="text-white group-hover:scale-110 transition-transform" />
              <span>Agendar Diagnóstico Estratégico</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}

