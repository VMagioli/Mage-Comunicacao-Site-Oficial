import React, { useState, useEffect } from 'react';
import { Mail, MessageSquare, Phone, Send, ExternalLink } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const BUDGET_RANGES = ['Até R$ 5k', 'R$ 5k - R$ 15k', 'R$ 15k - R$ 30k', 'R$ 30k+'];

/* ---------------------------  Schema de validação -------------------------- */
const ContactSchema = z.object({
  name: z.string().min(2, 'Informe seu nome.'),
  email: z.string().email('E-mail inválido.'),
  phone: z
    .string()
    .regex(/^\d{10,15}$/, 'Telefone deve ter entre 10 e 15 dígitos.'),
  projectType: z.string(),              // selecionado por botões
  budget: z.string(),                   // idem
  message: z.string().min(10, 'Descreva seu projeto.'),
});

type ContactFormInputs = z.infer<typeof ContactSchema>;

interface ContactPageProps {
  defaultProjectType?: string;
}

export function ContactPage({ defaultProjectType = 'web' }: ContactPageProps) {
  /* ---------------------------  RHF – inicialização --------------------------- */
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      projectType: defaultProjectType,
      budget: 'R$ 5k - R$ 15k',
      message: '',
    },
  });

  const [submitted, setSubmitted] = useState(false);
  const projectType = watch('projectType');
  const budget = watch('budget');

  useEffect(() => {
    if (defaultProjectType) {
      setValue('projectType', defaultProjectType);
    }
  }, [defaultProjectType, setValue]);

  /* ---------------------------  Submissão assíncrona -------------------------- */
  const onSubmit = async (data: ContactFormInputs) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao enviar mensagem.');
      }

      setSubmitted(true);
      reset();                            // limpa formulário
    } catch (error: any) {
      console.error('❌ Erro no formulário de contato:', error);
      alert(error?.message || 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.');
    }
  };

  const whatsappNumber = '5500000000000'; // Placeholder
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento%20de%20projeto.`;

  return (
    <section className="px-4 md:px-8 py-8 md:py-10 relative z-20">
      {/* Header */}
      <div className="mb-12">
        <span className="text-slate-500 text-[10px] font-mono uppercase tracking-widest">Ficou interessado em nossos serviços?</span>
        <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight mt-2">
          Entre em Contato
        </h2>
        <p className="text-slate-400 font-light mt-4 max-w-2xl text-sm md:text-base">
          O próximo salto da sua empresa começa com a estrutura certa. <br/>Conte-nos onde você quer chegar. Nós desenhamos o caminho digital para isso. Escreva abaixo ou mande mensagem via WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Formulário */}
        <div className="lg:col-span-3 bg-[#111923]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 md:p-8 hover:border-white/10 transition-colors">
          {submitted ? (
            /* --------------- Tela de sucesso --------------- */
            <div className="py-12 text-center space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4 animate-bounce">
                <Send size={20} />
              </div>
              <h3 className="text-xl font-medium text-white">Mensagem Enviada!</h3>
              <p className="text-slate-400 text-sm max-w-xs mx-auto font-light leading-relaxed">
                Agradecemos o contato. Nossa equipe analisará seus dados e retornará em até 24&nbsp;h úteis.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-xs text-blue-400 hover:text-blue-300 underline font-mono cursor-pointer"
              >
                Enviar nova mensagem
              </button>
            </div>
          ) : (
            /* ------------------ Form ------------------ */
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Nome */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-xs font-mono text-slate-400 uppercase tracking-wide">Seu Nome</label>
                  <input
                    id="name"
                    className="w-full bg-[#0B0F14]/80 border border-white/10 focus:border-blue-500 rounded-lg px-4 py-3 text-sm text-white outline-none transition-colors"
                    placeholder="Ex: João Silva"
                    {...register('name')}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* E-mail */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-xs font-mono text-slate-400 uppercase tracking-wide">Seu E-mail</label>
                  <input
                    id="email"
                    type="email"
                    className="w-full bg-[#0B0F14]/80 border border-white/10 focus:border-blue-500 rounded-lg px-4 py-3 text-sm text-white outline-none transition-colors"
                    placeholder="Ex: joao@empresa.com"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Telefone */}
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-xs font-mono text-slate-400 uppercase tracking-wide">Telefone (WhatsApp)</label>
                <input
                  id="phone"
                  type="tel"
                  className="w-full bg-[#0B0F14]/80 border border-white/10 focus:border-blue-500 rounded-lg px-4 py-3 text-sm text-white outline-none transition-colors"
                  placeholder="Ex: 21987654321"
                  {...register('phone')}
                />
                {errors.phone && (
                  <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Tipo de Projeto */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wide">Tipo de Projeto</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'web', label: 'Sites e Tecnologia' },
                    { id: 'branding', label: 'Comunicação e Conteúdo' },
                    { id: 'commercial', label: 'Comercial' },
                    { id: 'management', label: 'Gestão' },
                    { id: 'other', label: 'Outro' },
                  ].map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setValue('projectType', type.id)}
                      className={`px-3 py-2.5 rounded-lg border text-xs font-medium transition-all text-center cursor-pointer ${
                        projectType === type.id
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.1)]'
                          : 'bg-white/5 text-slate-400 border-white/5 hover:border-white/10 hover:text-white'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Investimento */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wide">Estimativa de Investimento</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {BUDGET_RANGES.map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => setValue('budget', range)}
                      className={`px-3 py-2.5 rounded-lg border text-xs font-medium transition-all text-center cursor-pointer ${
                        budget === range
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.1)]'
                          : 'bg-white/5 text-slate-400 border-white/5 hover:border-white/10 hover:text-white'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Detalhes */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-xs font-mono text-slate-400 uppercase tracking-wide">Detalhes do Projeto</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-[#0B0F14]/80 border border-white/10 focus:border-blue-500 rounded-lg px-4 py-3 text-sm text-white outline-none transition-colors resize-none"
                  placeholder="Descreva brevemente sua ideia, objetivos e requisitos..."
                  {...register('message')}
                />
                {errors.message && (
                  <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* Botão Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 bg-blue-500/10 border border-blue-500/30 text-blue-300 hover:bg-blue-500/20 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar'}
                <Send size={14} />
              </button>
            </form>
          )}
        </div>

        {/* Lateral de Contato Rápido */}
        <div className="lg:col-span-2 space-y-6">
          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-emerald-500/5 border border-emerald-500/10 hover:border-emerald-500/20 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] rounded-2xl p-6 md:p-8 transition-all group"
          >
            <div className="flex items-center gap-3 text-emerald-400 mb-4">
              <Phone size={20} />
              <h3 className="font-medium text-white tracking-tight">Fale direto via WhatsApp</h3>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed font-light mb-6">
              Prefere bater um papo dinâmico? Clique abaixo e abra uma conversa direta no WhatsApp comercial da MAGE.
            </p>
            <div className="flex items-center gap-1 text-emerald-400 text-xs font-mono group-hover:underline">
              Conversar Agora <ExternalLink size={12} />
            </div>
          </a>

          {/* Info Extra */}
          <div className="bg-[#111923]/40 border border-white/5 rounded-2xl p-6 md:p-8 space-y-6">
            <h4 className="text-white font-mono text-xs uppercase tracking-wider">Informações Adicionais</h4>

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
