"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  HelpCircle, ArrowLeft, Mail, Phone, Search, 
  ChevronDown, MessageSquare, ShieldCheck, HardDrive, 
  ExternalLink, CheckSquare 
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
  category: 'geral' | 'financeiro_contrato' | 'tecnico_arquivos';
  icon: React.ReactNode;
}

export default function HelpPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'todos' | 'geral' | 'financeiro_contrato' | 'tecnico_arquivos'>('todos');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      category: 'tecnico_arquivos',
      icon: <CheckSquare size={16} className="text-purple-400" />,
      question: 'Como faço para aprovar ou solicitar ajustes em um post?',
      answer: (
        <p className="leading-relaxed">
          Acesse a aba <strong className="text-purple-400">MAGE Management</strong> no painel principal do portal. Lá você verá todas as criações pendentes. Se estiver tudo perfeito, clique em <strong className="text-emerald-400">Aprovar Conteúdo</strong>. Caso precise de alterações na copy ou na imagem, digite os detalhes no campo de observações e clique em <strong className="text-red-400">Solicitar Ajuste</strong>. Nossa equipe receberá o feedback e fará as modificações em até 24h úteis.
        </p>
      )
    },
    {
      id: 'faq-2',
      category: 'tecnico_arquivos',
      icon: <ShieldCheck size={16} className="text-blue-400" />,
      question: 'Onde encontro meus arquivos de marca, logos e paleta de cores?',
      answer: (
        <p className="leading-relaxed">
          Na aba <strong className="text-blue-400">MAGE Foundation</strong> você tem acesso ao seu <em>Brandbook (Cofre de Marca)</em>. Você pode visualizar os códigos hexadecimais das cores corporativas e copiá-los diretamente para a área de transferência, ou baixar o pacote compactado contendo os logotipos oficiais e fontes clicando no botão <strong className="text-slate-200">Download Brandbook (.ZIP)</strong>.
        </p>
      )
    },
    {
      id: 'faq-3',
      category: 'geral',
      icon: <HelpCircle size={16} className="text-indigo-400" />,
      question: 'Qual é a diferença entre os pacotes Foundation, Management e Authority?',
      answer: (
        <div className="space-y-2">
          <p className="leading-relaxed">A MAGE trabalha com módulos complementares de acordo com o estágio da sua empresa:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li><strong className="text-blue-400">MAGE Foundation:</strong> Módulo de setup inicial. Focado na estruturação de marca, paleta de cores e na criação da sua Landing Page de alta conversão.</li>
            <li><strong className="text-purple-400">MAGE Management:</strong> Gestão contínua e mensal. Envolve criação de posts para redes sociais, relatórios analíticos de tráfego e suporte com chamados de suporte técnico ilimitados.</li>
            <li><strong className="text-emerald-400">MAGE Authority:</strong> Módulo de escala de software e autoridade. Inclui otimizações de SEO corporativo avançado e desenvolvimento sob metodologia ágil de novas sprints de software.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'faq-4',
      category: 'tecnico_arquivos',
      icon: <HardDrive size={16} className="text-emerald-400" />,
      question: 'Como funciona o cofre de arquivos híbrido (Cloudflare R2 & Google Drive)?',
      answer: (
        <p className="leading-relaxed">
          Para garantir alta velocidade e segurança, dividimos o armazenamento em duas categorias: Arquivos mais leves (imagens de referência, logos, PDFs de até 15MB) podem ser enviados diretamente pelo portal na área de arquivos e ficam guardados de forma segura e criptografada via <strong className="text-blue-400">Cloudflare R2</strong>. Materiais extremamente pesados, como gravações de vídeo brutas ou filmagens em 4K, devem ser enviados clicando em <strong className="text-slate-200">Abrir Pasta Segura (2 TB)</strong>, que o redirecionará para a pasta dedicada do Google Drive compartilhada com a MAGE.
        </p>
      )
    },
    {
      id: 'faq-5',
      category: 'tecnico_arquivos',
      icon: <MessageSquare size={16} className="text-blue-400" />,
      question: 'Como acompanho o progresso do desenvolvimento do meu software ou site?',
      answer: (
        <p className="leading-relaxed">
          Caso o seu pacote inclua o nível <strong className="text-emerald-400">MAGE Authority</strong>, a aba dedicada a este pacote exibirá o nosso <em>Roadmap de Sprints da Plataforma</em>. Ali é possível ver em tempo real quais recursos estão em planejamento, em desenvolvimento ativo ou concluídos, além da pontuação atual de SEO do Google Lighthouse do seu sistema.
        </p>
      )
    },
    {
      id: 'faq-6',
      category: 'geral',
      icon: <HelpCircle size={16} className="text-slate-400" />,
      question: 'O que significam os status dos meus chamados técnicos?',
      answer: (
        <div className="space-y-1">
          <p className="leading-relaxed">O progresso das suas solicitações técnicas segue três etapas:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li><strong className="text-amber-400">Na Fila:</strong> Sua solicitação foi recebida e está aguardando a análise técnica de nossa equipe de engenharia.</li>
            <li><strong className="text-blue-400">Em Andamento:</strong> Um desenvolvedor já está trabalhando ativamente na correção ou melhoria.</li>
            <li><strong className="text-emerald-400">Concluído:</strong> A alteração foi implementada, testada e publicada em produção.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'faq-7',
      category: 'financeiro_contrato',
      icon: <ShieldCheck size={16} className="text-emerald-400" />,
      question: 'Como posso falar com um atendente se meu problema não estiver no FAQ?',
      answer: (
        <p className="leading-relaxed">
          Você pode abrir um chamado técnico estruturado na aba <strong className="text-purple-400">MAGE Management</strong> do seu portal. Se preferir um contato direto ou necessitar de suporte administrativo/financeiro, use os canais diretos de suporte listados nesta tela para enviar um e-mail para <strong className="text-slate-200">contato@magecomunicacao.com.br</strong> ou clicar no link do nosso WhatsApp comercial de atendimento rápido.
        </p>
      )
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (typeof faq.answer === 'string' && faq.answer.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === 'todos' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans selection:bg-blue-500/30">
      {/* Background Image & Overlay */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/background-image.png"
          alt="Atmospheric Background"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/20 via-[#0B0F19] to-[#0B0F19]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10 space-y-10">
        {/* Header de Navegação */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.push('/portal')}
              className="p-2 border border-white/5 hover:border-white/10 bg-white/[0.02] hover:bg-white/[0.05] rounded-xl text-slate-400 hover:text-white transition cursor-pointer flex items-center justify-center"
              aria-label="Voltar para o portal"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-white tracking-tight">FAQ & Central de Ajuda</h1>
              <p className="text-[10px] text-slate-500 font-mono tracking-wider uppercase mt-0.5">// Suporte ao Cliente MAGE</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#0F1424]/60 border border-white/5 rounded-full px-3.5 py-1.5 backdrop-blur-md">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="text-[10px] font-mono text-slate-300">Tempo médio de resposta: &lt; 24h</span>
          </div>
        </div>

        {/* Caixa de Busca */}
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquise por palavras-chave (ex: post, arquivos, suporte)..."
            className="w-full bg-[#111923]/60 border border-white/5 focus:border-blue-500 rounded-2xl pl-12 pr-6 py-4 text-sm text-white placeholder-slate-500 focus:outline-none transition backdrop-blur-md"
          />
        </div>

        {/* Filtros por Categoria */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'todos', label: 'Todas as Dúvidas' },
            { id: 'geral', label: 'Sobre os Planos' },
            { id: 'tecnico_arquivos', label: 'Mídia, Entregas & Códigos' },
            { id: 'financeiro_contrato', label: 'Atendimento & Contrato' }
          ].map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as any)}
              className={`px-4 py-2 rounded-xl border text-xs font-medium transition cursor-pointer ${
                activeCategory === category.id
                  ? 'bg-blue-500/10 text-blue-300 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                  : 'bg-white/[0.02] text-slate-400 border-white/5 hover:border-white/10 hover:text-white'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Listagem de Perguntas / Acordeon */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map(faq => {
              const isExpanded = expandedId === faq.id;
              return (
                <div 
                  key={faq.id} 
                  className={`bg-[#111923]/40 border rounded-2xl transition duration-300 overflow-hidden ${
                    isExpanded ? 'border-white/10 bg-[#111923]/60 shadow-[0_10px_30px_rgba(0,0,0,0.3)]' : 'border-white/5 hover:border-white/10'
                  }`}
                >
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/5 text-slate-400">
                        {faq.icon}
                      </div>
                      <span className="text-sm font-semibold text-white tracking-tight leading-snug">{faq.question}</span>
                    </div>
                    <ChevronDown 
                      size={18} 
                      className={`text-slate-400 transition-transform duration-300 shrink-0 ${isExpanded ? 'rotate-180 text-white' : ''}`} 
                    />
                  </button>

                  <div className={`transition-all duration-300 ease-in-out ${
                    isExpanded ? 'max-h-[500px] border-t border-white/5 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}>
                    <div className="px-6 py-5 text-xs text-slate-400 leading-relaxed font-light">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-[#111923]/20 border border-white/5 rounded-2xl">
              <HelpCircle size={32} className="text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 text-sm font-light">Nenhuma dúvida encontrada para sua busca.</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveCategory('todos'); }}
                className="mt-4 text-xs text-blue-400 hover:text-blue-300 underline font-mono cursor-pointer"
              >
                Limpar filtros de busca
              </button>
            </div>
          )}
        </div>

        {/* Seção Fale Conosco / Suporte Direto */}
        <div className="bg-[#111923]/30 border border-white/5 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-white tracking-tight">Não encontrou o que precisava?</h3>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              Nosso time está pronto para ajudar você. Fale diretamente pelos canais oficiais de suporte abaixo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* E-mail */}
            <div className="bg-[#0B0F19]/40 border border-white/5 hover:border-white/10 rounded-xl p-5 transition duration-300 flex flex-col justify-between items-start gap-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/10 shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Suporte por E-mail</h4>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">contato@magecomunicacao.com.br</p>
                </div>
              </div>
              <a 
                href="mailto:contato@magecomunicacao.com.br"
                className="text-xs text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1 cursor-pointer"
              >
                Enviar E-mail <ExternalLink size={12} />
              </a>
            </div>

            {/* WhatsApp */}
            <div className="bg-[#0B0F19]/40 border border-white/5 hover:border-white/10 rounded-xl p-5 transition duration-300 flex flex-col justify-between items-start gap-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/10 shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">WhatsApp Comercial</h4>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">Segunda à Sexta, das 9h às 18h</p>
                </div>
              </div>
              <a 
                href="https://wa.me/5531999999999" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1 cursor-pointer"
              >
                Iniciar Conversa <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
