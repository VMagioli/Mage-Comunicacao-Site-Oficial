import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, Send, ExternalLink } from 'lucide-react';

const BUDGET_RANGES = [
  'Até R$ 5k',
  'R$ 5k - R$ 15k',
  'R$ 15k - R$ 30k',
  'R$ 30k+'
];

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'web',
    budget: 'R$ 5k - R$ 15k',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', projectType: 'web', budget: 'R$ 5k - R$ 15k', message: '' });
    }, 1500);
  };

  const whatsappNumber = '5500000000000'; // Placeholder to be edited later by the user
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento%20de%20projeto.`;

  return (
    <section className="px-4 md:px-8 py-8 md:py-10 relative z-20">
      {/* Page Header */}
      <div className="mb-12">
        <span className="text-slate-500 text-[10px] font-mono tracking-widest uppercase">// start a conversation</span>
        <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight mt-2">
          Entre em Contato
        </h2>
        <p className="text-slate-400 font-light mt-4 max-w-2xl text-sm md:text-base">
          Tem uma ideia de projeto ou precisa de ajuda técnica e visual para seu produto digital? Escreva abaixo ou mande mensagem direta.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Contact Form Section */}
        <div className="lg:col-span-3 bg-[#111923]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 md:p-8 hover:border-white/10 transition-colors duration-300">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4 animate-bounce">
                <Send size={20} />
              </div>
              <h3 className="text-xl font-medium text-white">Mensagem Enviada!</h3>
              <p className="text-slate-400 text-sm max-w-xs mx-auto font-light leading-relaxed">
                Agradecemos o contato. Nossa equipe analisará seus dados e entrará em contato em menos de 24 horas úteis.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-6 text-xs text-blue-400 hover:text-blue-300 underline font-mono cursor-pointer"
              >
                Enviar nova mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name field */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-xs font-mono text-slate-400 uppercase tracking-wide">Seu Nome</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0B0F14]/80 border border-white/10 focus:border-blue-500 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-colors duration-300"
                    placeholder="Ex: João Silva"
                  />
                </div>

                {/* Email field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-xs font-mono text-slate-400 uppercase tracking-wide">Seu E-mail</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#0B0F14]/80 border border-white/10 focus:border-blue-500 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-colors duration-300"
                    placeholder="Ex: joao@empresa.com"
                  />
                </div>
              </div>

              {/* Project Type */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wide">Tipo de Projeto</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'web', label: 'Plataforma Web' },
                    { id: 'design', label: 'Design UI/UX' },
                    { id: 'landing', label: 'Landing Page' },
                    { id: 'branding', label: 'Identidade Visual' },
                    { id: 'other', label: 'Outro' }
                  ].map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, projectType: type.id })}
                      className={`px-3 py-2.5 rounded-lg border text-xs font-medium transition-all duration-300 text-center cursor-pointer ${
                        formData.projectType === type.id
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.1)]'
                          : 'bg-white/5 text-slate-400 border-white/5 hover:border-white/10 hover:text-white'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget selector */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wide">Estimativa de Investimento</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {BUDGET_RANGES.map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => setFormData({ ...formData, budget: range })}
                      className={`px-3 py-2.5 rounded-lg border text-xs font-medium transition-all duration-300 text-center cursor-pointer ${
                        formData.budget === range
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.1)]'
                          : 'bg-white/5 text-slate-400 border-white/5 hover:border-white/10 hover:text-white'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message field */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-xs font-mono text-slate-400 uppercase tracking-wide">Detalhes do Projeto</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#0B0F14]/80 border border-white/10 focus:border-blue-500 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Descreva brevemente sua ideia, objetivos e requisitos..."
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 bg-blue-500/10 border border-blue-500/30 text-blue-300 hover:bg-blue-500/20 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] rounded-lg font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Briefing'}
                <Send size={14} />
              </button>
            </form>
          )}
        </div>

        {/* Contact Info Sidebar */}
        <div className="lg:col-span-2 space-y-6">
          {/* Direct WhatsApp Card */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-emerald-500/5 border border-emerald-500/10 hover:border-emerald-500/20 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] rounded-2xl p-6 md:p-8 transition-all duration-300 group"
          >
            <div className="flex items-center gap-3 text-emerald-400 mb-4">
              <Phone size={20} />
              <h3 className="font-medium text-white tracking-tight">Fale direto via WhatsApp</h3>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed font-light mb-6">
              Prefere bater um papo dinâmico? Clique abaixo e abra uma conversa direto no WhatsApp comercial da MAGE.
            </p>
            <div className="flex items-center gap-1 text-emerald-400 text-xs font-mono font-medium group-hover:underline">
              Conversar Agora <ExternalLink size={12} />
            </div>
          </a>

          {/* Quick info list */}
          <div className="bg-[#111923]/40 border border-white/5 rounded-2xl p-6 md:p-8 space-y-6">
            <h4 className="text-white font-mono text-xs uppercase tracking-wider">// Informações Adicionais</h4>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg border border-white/5 bg-white/5 text-slate-400 flex items-center justify-center shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wide">E-mail Comercial</div>
                  <div className="text-sm text-slate-300 mt-0.5">contato@magecomunicacao.com.br</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg border border-white/5 bg-white/5 text-slate-400 flex items-center justify-center shrink-0">
                  <MessageSquare size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wide">Horário de Atendimento</div>
                  <div className="text-sm text-slate-300 mt-0.5">Segunda à Sexta, das 09h às 18h</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
