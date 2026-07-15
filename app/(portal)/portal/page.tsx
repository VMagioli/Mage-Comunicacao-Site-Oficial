"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";
import { 
  User, CheckCircle, Clock, Copy, Download, 
  Send, ArrowUpRight, CheckSquare, LogOut,
  Settings, FolderKanban, ShieldCheck, HelpCircle, HardDrive,
  ChevronLeft, ChevronRight, X, Menu
} from "lucide-react";
import { TermsPage } from "@/src/components/TermsPage";

interface ClientePerfil {
  id?: string;
  nome_empresa: string;
  email: string;
  pacote_foundation: boolean;
  pacote_management: boolean;
  pacote_authority: boolean;
  url_google_drive: string;
  tempo_permanencia_meses: number;
}

export default function DashboardPortal() {
  const router = useRouter();

  const getInitials = (name: string) => {
    if (!name) return "US";
    const cleanName = name.replace(/\s*\(.*?\)\s*/g, "").trim();
    const parts = cleanName.split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  const [profile, setProfile] = useState<ClientePerfil | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("visao_geral");
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  
  // Custom states for interactive headers and retractable sidebar
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("portal-sidebar-collapsed");
    if (saved === "true") {
      setIsSidebarCollapsed(true);
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => {
      const next = !prev;
      localStorage.setItem("portal-sidebar-collapsed", String(next));
      return next;
    });
  };

  // Form inputs
  const [chamadoTitulo, setChamadoTitulo] = useState("");
  const [chamadoDesc, setChamadoDesc] = useState("");
  const [comentariosMap, setComentariosMap] = useState<Record<string, string>>({});

  // DB States
  const [posts, setPosts] = useState<any[]>([]);
  const [chamados, setChamados] = useState<any[]>([]);
  const [roadmap, setRoadmap] = useState<any[]>([]);

  useEffect(() => {
    const loadProfile = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Fallback for visual demonstration if session is not active
        setProfile({
          nome_empresa: "Mage Tech Solutions (Demo)",
          email: "diretoria@magetech.com.br",
          pacote_foundation: true,
          pacote_management: true,
          pacote_authority: true,
          url_google_drive: "https://drive.google.com/drive/folders/shared-mage-folder",
          tempo_permanencia_meses: 12
        });
        setPosts([
          {
            id: "demo-1",
            titulo: "Post Carrossel: 'Por que tecnologia sem design falha?'",
            copy_post: "Um design claro resolve problemas de usabilidade...",
            tipo_midia: "imagem_r2",
            url_midia: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
            status: "pendente"
          },
          {
            id: "demo-2",
            titulo: "Roteiro/Video: Reels Institucional MAGE Stack",
            copy_post: "Apresentando a nossa stack técnica por trás dos grandes sites.",
            tipo_midia: "video_youtube",
            url_midia: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            status: "pendente"
          }
        ]);
        setChamados([
          { id: 1, titulo: "Ajuste na tipografia do cabeçalho", status: "concluido", created_at: new Date().toISOString() },
          { id: 2, titulo: "Configuração do Pixel do Facebook", status: "em_andamento", created_at: new Date().toISOString() }
        ]);
        setRoadmap([
          { sprint_nome: "Sprint 1: Integração de APIs de Pagamento", status_desenvolvimento: "concluido", seo_score: 96 },
          { sprint_nome: "Sprint 2: Área Premium de Assinantes", status_desenvolvimento: "em_desenvolvimento", seo_score: 96 },
          { sprint_nome: "Sprint 3: Indexador SEO Avançado & Landing Pages Dinâmicas", status_desenvolvimento: "planejado", seo_score: 96 }
        ]);
        setLoading(false);
        return;
      }

      // Fetch profile
      const { data: profileData } = await supabase
        .from('clientes')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profileData) {
        setProfile(profileData);

        // Fetch posts
        const { data: postsData } = await supabase
          .from('posts_aprovacao')
          .select('*')
          .eq('cliente_id', session.user.id)
          .order('created_at', { ascending: false });

        if (postsData && postsData.length > 0) {
          setPosts(postsData);
        } else {
          // Default mock if table is empty
          setPosts([
            {
              id: "demo-1",
              titulo: "Post Carrossel: 'Por que tecnologia sem design falha?'",
              copy_post: "Um design claro resolve problemas de usabilidade...",
              tipo_midia: "imagem_r2",
              url_midia: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
              status: "pendente"
            }
          ]);
        }

        // Fetch tickets
        const { data: ticketsData } = await supabase
          .from('chamados_tech')
          .select('*')
          .eq('cliente_id', session.user.id)
          .order('created_at', { ascending: false });

        if (ticketsData) setChamados(ticketsData);
        
        // Fetch roadmap
        if (profileData.pacote_authority) {
          const { data: roadmapData } = await supabase
            .from('roadmap_authority')
            .select('*')
            .eq('cliente_id', session.user.id)
            .order('updated_at', { ascending: true });
          
          if (roadmapData) setRoadmap(roadmapData);
        }
      }
      else {
        // CORREÇÃO: O usuário logou, mas não tem cadastro na tabela clientes ainda. 
        // Vamos forçar o perfil com os dados de demonstração para a tela abrir!
        setProfile({
          nome_empresa: "Mage Tech Solutions (Sua Empresa)",
          email: session.user.email || "contato@empresa.com",
          pacote_foundation: true,
          pacote_management: true,
          pacote_authority: true,
          url_google_drive: "https://drive.google.com",
          tempo_permanencia_meses: 12
        });
        setPosts([
          {
            id: "demo-1",
            titulo: "Bem-vindo ao Portal MAGE",
            copy_post: "Aguardando cadastro completo do seu perfil na base de dados.",
            tipo_midia: "imagem_r2",
            url_midia: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
            status: "pendente"
          }
        ]);
        setChamados([]);
        setRoadmap([]);
      }
      setLoading(false);
    };

    loadProfile();
  }, []);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handlePostAction = async (id: string, status: "aprovado" | "ajuste_solicitado") => {
    const supabase = createClient();
    const comentarios = comentariosMap[id] || "";
    
    // Attempt mutation if not in demo mode
    if (profile?.id) {
      await supabase
        .from('posts_aprovacao')
        .update({ status, comentarios_cliente: status === "ajuste_solicitado" ? comentarios : null })
        .eq('id', id);
    }
    
    setPosts(prev => prev.map(p => p.id === id ? { ...p, status, comentarios_cliente: status === "ajuste_solicitado" ? comentarios : null } : p));
  };

  const handleAddChamado = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chamadoTitulo || !chamadoDesc) return;
    
    const supabase = createClient();
    let newTicket = {
      id: Date.now(),
      titulo: chamadoTitulo,
      descricao: chamadoDesc,
      status: "na_fila",
      created_at: new Date().toISOString()
    };

    if (profile?.id) {
      const { data, error } = await supabase
        .from('chamados_tech')
        .insert({
          cliente_id: profile.id,
          titulo: chamadoTitulo,
          descricao: chamadoDesc,
          status: 'na_fila'
        })
        .select()
        .single();
      
      if (!error && data) {
        newTicket = data;
      }
    }

    setChamados(prev => [newTicket, ...prev]);
    setChamadoTitulo("");
    setChamadoDesc("");
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    document.cookie = "mage_mock_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.refresh();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-slate-400 text-sm tracking-wider font-mono">// Carregando portal...</p>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans selection:bg-blue-500/30">
      {/* Top Header do Portal */}
      <header className="border-b border-white/5 bg-[#0F1424]/40 backdrop-blur-md sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden text-slate-400 hover:text-white p-2 border border-white/5 hover:border-white/10 rounded-lg transition-colors cursor-pointer shrink-0"
            aria-label="Abrir menu"
          >
            <Menu size={18} />
          </button>
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center font-bold text-white tracking-wider text-sm shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            M
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-tight text-white">{profile.nome_empresa}</h1>
            <p className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">// Portal do Cliente</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-white/[0.02] border border-white/5 rounded-full px-3 py-1 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            <span className="text-slate-400 font-mono text-[10px]">CONEXÃO ATIVA</span>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-3 bg-white/[0.02] hover:bg-white/[0.06] active:bg-white/[0.08] border border-white/5 hover:border-white/10 rounded-full pl-3 pr-2 py-1.5 text-xs text-slate-300 hover:text-white transition-all cursor-pointer select-none"
            >
              <span className="font-medium tracking-tight max-w-[150px] truncate">{profile.nome_empresa}</span>
              <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-[10px] text-white shadow-sm border border-white/10">
                {getInitials(profile.nome_empresa)}
              </div>
            </button>

            {showProfileDropdown && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowProfileDropdown(false)} />
                <div className="absolute right-0 mt-2 w-64 bg-[#0F1424] border border-white/10 rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-50 animate-fadeIn space-y-4">
                  <div className="flex flex-col items-center text-center pb-3 border-b border-white/5">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-base text-white mb-2 shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-white/10">
                      {getInitials(profile.nome_empresa)}
                    </div>
                    <span className="font-semibold text-sm text-white tracking-tight leading-tight block">{profile.nome_empresa}</span>
                    <span className="text-[10px] text-slate-500 font-mono mt-0.5 truncate max-w-full">{profile.email}</span>
                  </div>

                  <div className="space-y-1">
                    <button 
                      onClick={() => {
                        setShowProfileDropdown(false);
                        setShowHelpModal(true);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/[0.04] transition flex items-center gap-2 cursor-pointer"
                    >
                      <HelpCircle size={14} className="text-blue-400" />
                      Ajuda e Suporte
                    </button>
                    
                    <button 
                      onClick={() => {
                        setShowProfileDropdown(false);
                        setShowTermsModal(true);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/[0.04] transition flex items-center gap-2 cursor-pointer"
                    >
                      <ShieldCheck size={14} className="text-emerald-400" />
                      Termos de Uso
                    </button>
                  </div>

                  <div className="pt-2 border-t border-white/5">
                    <button 
                      onClick={handleLogout}
                      className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <LogOut size={13} />
                      Sair do Portal
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Backdrop overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Menu Lateral Inteligente e Condicional */}
        <aside className={`fixed inset-y-0 left-0 z-50 lg:static flex flex-col justify-between py-6 px-5 shrink-0 bg-[#0C1121]/95 lg:bg-[#0C1121]/50 backdrop-blur-md lg:backdrop-blur-none border-r border-white/5 transition-all duration-300 ease-in-out
          ${isSidebarCollapsed ? "lg:w-[76px] p-4 lg:px-2" : "lg:w-64 p-6"}
          ${isMobileMenuOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0"}
        `}>
          {/* Close button (Mobile only) */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-lg border border-white/5 hover:border-white/10 transition-colors cursor-pointer"
            aria-label="Fechar menu"
          >
            <X size={16} />
          </button>

          {/* Collapse Toggle Button (Desktop only) */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex absolute top-6 -right-3 w-6 h-6 rounded-full bg-[#111923] border border-white/10 hover:border-white/20 text-slate-400 hover:text-white items-center justify-center transition-all duration-300 cursor-pointer z-30 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
            aria-label={isSidebarCollapsed ? "Expandir menu" : "Recolher menu"}
          >
            {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>

          <div className="space-y-6">
            <div>
              {!isSidebarCollapsed ? (
                <span className="text-[10px] font-semibold tracking-widest text-slate-500 uppercase block mb-3">// Navegação</span>
              ) : (
                <div className="h-4" />
              )}
              <nav className="flex flex-col gap-1.5">
                <button 
                  onClick={() => {
                    setActiveTab("visao_geral");
                    setIsMobileMenuOpen(false);
                  }}
                  title={isSidebarCollapsed ? "Painel Geral" : undefined}
                  className={`w-full transition duration-200 flex items-center rounded-lg cursor-pointer ${
                    isSidebarCollapsed 
                      ? "justify-center p-2.5" 
                      : "text-left px-3 py-2 gap-2 text-xs font-medium"
                  } ${
                    activeTab === "visao_geral" 
                      ? "bg-blue-500/10 border border-blue-500/20 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.1)]" 
                      : "border border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]"
                  }`}
                >
                  <FolderKanban size={16} />
                  {!isSidebarCollapsed && <span>Painel Geral</span>}
                </button>

                {profile.pacote_foundation && (
                  <button 
                    onClick={() => {
                      setActiveTab("foundation");
                      setIsMobileMenuOpen(false);
                    }}
                    title={isSidebarCollapsed ? "MAGE Foundation" : undefined}
                    className={`w-full transition duration-200 flex items-center rounded-lg cursor-pointer ${
                      isSidebarCollapsed 
                        ? "justify-center p-2.5" 
                        : "text-left px-3 py-2 gap-2 text-xs font-medium"
                    } ${
                      activeTab === "foundation" 
                        ? "bg-blue-500/10 border border-blue-500/20 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.1)]" 
                        : "border border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]"
                    }`}
                  >
                    <ShieldCheck size={16} />
                    {!isSidebarCollapsed && <span>MAGE Foundation</span>}
                  </button>
                )}

                {profile.pacote_management && (
                  <button 
                    onClick={() => {
                      setActiveTab("management");
                      setIsMobileMenuOpen(false);
                    }}
                    title={isSidebarCollapsed ? "MAGE Management" : undefined}
                    className={`w-full transition duration-200 flex items-center rounded-lg cursor-pointer ${
                      isSidebarCollapsed 
                        ? "justify-center p-2.5" 
                        : "text-left px-3 py-2 gap-2 text-xs font-medium"
                    } ${
                      activeTab === "management" 
                        ? "bg-blue-500/10 border border-blue-500/20 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.1)]" 
                        : "border border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]"
                    }`}
                  >
                    <CheckSquare size={16} />
                    {!isSidebarCollapsed && <span>MAGE Management</span>}
                  </button>
                )}

                {profile.pacote_authority && (
                  <button 
                    onClick={() => {
                      setActiveTab("authority");
                      setIsMobileMenuOpen(false);
                    }}
                    title={isSidebarCollapsed ? "MAGE Authority" : undefined}
                    className={`w-full transition duration-200 flex items-center rounded-lg cursor-pointer ${
                      isSidebarCollapsed 
                        ? "justify-center p-2.5" 
                        : "text-left px-3 py-2 gap-2 text-xs font-medium"
                    } ${
                      activeTab === "authority" 
                        ? "bg-blue-500/10 border border-blue-500/20 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.1)]" 
                        : "border border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]"
                    }`}
                  >
                    <Settings size={16} />
                    {!isSidebarCollapsed && <span>MAGE Authority</span>}
                  </button>
                )}
              </nav>
            </div>

            {/* Resumo do Contrato Geral */}
            {!isSidebarCollapsed && (
              <div className="pt-6 border-t border-white/5 space-y-4">
                <div className="bg-white/[0.01] border border-white/5 rounded-xl p-4">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block mb-1">FIDELIDADE CONTRATUAL</span>
                  <p className="text-xs text-slate-300 font-medium">{profile.tempo_permanencia_meses} meses restantes</p>
                  <div className="w-full bg-white/5 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-emerald-500/80 h-full w-[45%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Área Central de Conteúdo */}
        <main className="flex-1 p-6 md:p-8 lg:p-10 max-w-5xl">
          {/* TELA DE VISÃO GERAL */}
          {activeTab === "visao_geral" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-white/5 pb-5">
                <h2 className="text-2xl font-semibold text-white tracking-tight">Bem-vindo à MAGE</h2>
                <p className="text-xs text-slate-400 font-light mt-1.5">Acompanhe todos os detalhes de seus pacotes contratados em tempo real.</p>
              </div>

              {/* Grid dos Módulos Contratados */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Card Foundation */}
                <div className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  profile.pacote_foundation 
                    ? "bg-[#0F1528]/50 border-white/5 hover:border-blue-500/20" 
                    : "bg-black/10 border-white/5 opacity-40 select-none"
                }`}>
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[9px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full uppercase">Setup</span>
                      {profile.pacote_foundation ? <CheckCircle size={16} className="text-emerald-500" /> : <Clock size={16} className="text-slate-600" />}
                    </div>
                    <h3 className="text-sm font-semibold text-white">MAGE Foundation</h3>
                    <p className="text-xs text-slate-400 font-light mt-2 leading-relaxed">Configuração da identidade visual da marca, paleta de cores primárias e Landing Page dedicada de alta conversão.</p>
                  </div>
                  {profile.pacote_foundation && (
                    <button onClick={() => setActiveTab("foundation")} className="mt-5 w-full py-2 bg-white/5 hover:bg-white/10 text-xs rounded-lg transition duration-200 border border-white/5 font-medium cursor-pointer text-center">
                      Acessar Setup
                    </button>
                  )}
                </div>

                {/* Card Management */}
                <div className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  profile.pacote_management 
                    ? "bg-[#0F1528]/50 border-white/5 hover:border-blue-500/20" 
                    : "bg-black/10 border-white/5 opacity-40 select-none"
                }`}>
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[9px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full uppercase">Recorrência</span>
                      {profile.pacote_management ? <CheckCircle size={16} className="text-emerald-500" /> : <Clock size={16} className="text-slate-600" />}
                    </div>
                    <h3 className="text-sm font-semibold text-white">MAGE Management</h3>
                    <p className="text-xs text-slate-400 font-light mt-2 leading-relaxed">Gestão contínua de publicações nas redes sociais da empresa, relatórios e suporte com chamados técnicos ilimitados.</p>
                  </div>
                  {profile.pacote_management && (
                    <button onClick={() => setActiveTab("management")} className="mt-5 w-full py-2 bg-white/5 hover:bg-white/10 text-xs rounded-lg transition duration-200 border border-white/5 font-medium cursor-pointer text-center">
                      Acessar Gestão
                    </button>
                  )}
                </div>

                {/* Card Authority */}
                <div className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  profile.pacote_authority 
                    ? "bg-[#0F1528]/50 border-white/5 hover:border-blue-500/20" 
                    : "bg-black/10 border-white/5 opacity-40 select-none"
                }`}>
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase">Escala</span>
                      {profile.pacote_authority ? <CheckCircle size={16} className="text-emerald-500" /> : <Clock size={16} className="text-slate-600" />}
                    </div>
                    <h3 className="text-sm font-semibold text-white">MAGE Authority</h3>
                    <p className="text-xs text-slate-400 font-light mt-2 leading-relaxed">Posicionamento estratégico completo de SEO corporativo avançado e roadmap ágil de novas sprints de software.</p>
                  </div>
                  {profile.pacote_authority && (
                    <button onClick={() => setActiveTab("authority")} className="mt-5 w-full py-2 bg-white/5 hover:bg-white/10 text-xs rounded-lg transition duration-200 border border-white/5 font-medium cursor-pointer text-center">
                      Acessar Roadmap
                    </button>
                  )}
                </div>
              </div>

              {/* Armazenamento Híbrido R2 & Google Drive */}
              <div className="bg-[#0F1424]/40 border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <HardDrive size={18} className="text-blue-400" />
                  <h3 className="text-sm font-semibold text-white">Cofre de Arquivos Brutos (Upload Híbrido)</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Upload Leves no R2 */}
                  <div className="bg-[#0B0F19]/60 border border-white/5 hover:border-white/10 p-5 rounded-xl transition duration-300">
                    <h4 className="text-xs font-semibold text-slate-200 mb-2">Upload de Imagens e Logos (R2)</h4>
                    <p className="text-[11px] text-slate-400 font-light mb-4 leading-relaxed">Artes de referência ou imagens leves de produtos de até 15MB. Os arquivos são armazenados no R2 da agência.</p>
                    <div className="border border-dashed border-white/10 hover:border-blue-500/40 rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition bg-white/[0.01]">
                      <Download size={20} className="text-slate-500 rotate-180" />
                      <span className="text-[10px] text-slate-400 font-mono">SELECIONAR ARQUIVOS</span>
                    </div>
                  </div>

                  {/* Drive para pesados */}
                  <div className="bg-[#0B0F19]/60 border border-white/5 hover:border-white/10 p-5 rounded-xl transition duration-300 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-slate-200 mb-2">Enviar Gravações em Vídeos Brutos (Drive)</h4>
                      <p className="text-[11px] text-slate-400 font-light leading-relaxed mb-4">Arquivos pesados e filmagens brutas em 4K. Enviando diretamente no link do Drive compartilhado mantemos custo de storage zero no portal.</p>
                    </div>
                    <a 
                      href={profile.url_google_drive} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 border border-white/5 rounded-lg text-center transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Abrir Pasta Segura (2 TB)
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MÓDULO FOUNDATION */}
          {activeTab === "foundation" && profile.pacote_foundation && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-white/5 pb-5">
                <h2 className="text-2xl font-semibold text-white tracking-tight">Cofre de Marca (Brandbook)</h2>
                <p className="text-xs text-slate-400 font-light mt-1.5">Consulte as principais regras visuais e faça o download dos logos oficiais de sua marca.</p>
              </div>

              {/* Checklist Visual Setup */}
              <div className="bg-[#0F1424]/40 border border-white/5 rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-white mb-4">Progresso de Setup Visual & Landing Page</h3>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-emerald-500 h-full w-[80%] rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)]"></div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2.5">
                    <span className="text-slate-300 flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500" /> Definição de Paleta & Logos</span>
                    <span className="text-slate-500 font-mono">Concluído</span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2.5">
                    <span className="text-slate-300 flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500" /> Roteiro e Copys da Landing Page</span>
                    <span className="text-slate-500 font-mono">Concluído</span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2.5">
                    <span className="text-slate-300 flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500" /> Wireframe Estrutural UX</span>
                    <span className="text-slate-500 font-mono">Concluído</span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2.5">
                    <span className="text-slate-300 flex items-center gap-2"><Clock size={14} className="text-blue-400" /> Desenvolvimento Front-end</span>
                    <span className="text-blue-400 font-mono font-medium">Em Andamento</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-2"><Clock size={14} className="text-slate-600" /> Publicação & SEO Inicial</span>
                    <span className="text-slate-600 font-mono">Planejado</span>
                  </div>
                </div>
              </div>

              {/* Grid Hexadecimais & Logo download */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Paleta Hex */}
                <div className="bg-[#0F1424]/40 border border-white/5 rounded-2xl p-6">
                  <h3 className="text-sm font-semibold text-white mb-4">Cores Corporativas</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { hex: "#0B0F19", name: "Midnight" },
                      { hex: "#3B82F6", name: "Classic Blue" },
                      { hex: "#10B981", name: "Mint Emerald" },
                      { hex: "#F3F4F6", name: "Silver Light" }
                    ].map(color => (
                      <div key={color.hex} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full h-12 rounded-lg border border-white/5 relative group cursor-pointer" style={{ backgroundColor: color.hex }}>
                          <button 
                            onClick={() => copyToClipboard(color.hex)}
                            className="absolute inset-0 bg-black/60 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-200"
                          >
                            <Copy size={12} className="text-white" />
                          </button>
                        </div>
                        <span className="text-[10px] text-slate-300 font-medium">{color.name}</span>
                        <span className="text-[9px] text-slate-500 font-mono">{color.hex}</span>
                      </div>
                    ))}
                  </div>
                  {copiedHex && (
                    <p className="text-[10px] text-emerald-400 font-mono mt-3 text-center">Cor {copiedHex} copiada com sucesso!</p>
                  )}
                </div>

                {/* Logos */}
                <div className="bg-[#0F1424]/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-2">Logos e Fontes</h3>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">Download do pacote compactado contendo logos oficiais em vetor (SVG/EPS) e fontes do sistema visual da marca.</p>
                  </div>
                  <button className="mt-5 w-full py-3 bg-white/5 hover:bg-white/10 text-xs font-semibold rounded-lg transition duration-200 border border-white/5 flex items-center justify-center gap-2 cursor-pointer">
                    <Download size={14} />
                    Download Brandbook (.ZIP)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MÓDULO MANAGEMENT */}
          {activeTab === "management" && profile.pacote_management && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-white/5 pb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-white tracking-tight">Aprovação de Conteúdos</h2>
                  <p className="text-xs text-slate-400 font-light mt-1.5">Avalie os posts e roteiros desenvolvidos pela agência para suas redes sociais.</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-full px-3.5 py-1 text-xs text-purple-400 font-mono">
                  {posts.filter(p => p.status === "pendente").length} Pendentes
                </div>
              </div>

              {/* Grid dos Cards de Aprovação */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map(post => (
                  <div key={post.id} className="bg-[#0F1424]/40 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition duration-300 flex flex-col justify-between">
                    <div>
                      {/* Midia Renderizada baseada no R2 ou Iframe do YouTube */}
                      <div className="rounded-xl overflow-hidden mb-4 bg-slate-900 border border-white/5 aspect-video relative flex items-center justify-center">
                        {post.tipo_midia === "imagem_r2" ? (
                          <img src={post.url_midia} alt={post.titulo} className="w-full h-full object-cover" />
                        ) : (
                          <iframe 
                            src={post.url_midia} 
                            title={post.titulo} 
                            className="w-full h-full border-none"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                          ></iframe>
                        )}
                        {post.status !== "pendente" && (
                          <div className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                            post.status === "aprovado" 
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                              : "bg-red-500/10 text-red-400 border-red-500/20"
                          }`}>
                            {post.status.toUpperCase()}
                          </div>
                        )}
                      </div>

                      <h4 className="text-xs font-semibold text-white mb-2">{post.titulo}</h4>
                      <p className="text-[11px] text-slate-400 font-light line-clamp-3 mb-4 leading-relaxed bg-[#0B0F19]/40 p-2.5 rounded-lg border border-white/5 font-mono">{post.copy_post}</p>
                    </div>

                    {post.status === "pendente" && (
                      <div className="space-y-3 mt-2">
                        <textarea 
                          rows={2}
                          value={comentariosMap[post.id] || ""}
                          onChange={e => setComentariosMap(prev => ({ ...prev, [post.id]: e.target.value }))}
                          placeholder="Digite aqui as alterações necessárias..."
                          className="w-full bg-[#0B0F19]/60 border border-white/5 rounded-lg px-2.5 py-1.5 text-[11px] text-white focus:outline-none focus:border-blue-500/30 transition resize-none"
                        />
                        <div className="flex gap-2.5">
                          <button 
                            onClick={() => handlePostAction(post.id, "ajuste_solicitado")}
                            className="flex-1 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg text-xs font-semibold transition cursor-pointer"
                          >
                            Solicitar Ajuste
                          </button>
                          <button 
                            onClick={() => handlePostAction(post.id, "aprovado")}
                            className="flex-1 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-semibold transition cursor-pointer"
                          >
                            Aprovar Conteúdo
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Central de Suporte Técnico */}
              <div className="bg-[#0F1424]/40 border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <HelpCircle size={18} className="text-blue-400" />
                  <h3 className="text-sm font-semibold text-white">Central de Suporte Técnico</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Formulário Novo Chamado */}
                  <form onSubmit={handleAddChamado} className="space-y-4">
                    <h4 className="text-xs font-semibold text-slate-300">// Novo Chamado</h4>
                    
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-400 uppercase font-mono">Assunto</label>
                      <input 
                        type="text" 
                        value={chamadoTitulo}
                        onChange={e => setChamadoTitulo(e.target.value)}
                        placeholder="Ex: Erro ao carregar botão no rodapé"
                        required
                        className="w-full bg-[#0B0F19]/60 border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/40 transition"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-400 uppercase font-mono">Descrição do Problema</label>
                      <textarea 
                        rows={3}
                        value={chamadoDesc}
                        onChange={e => setChamadoDesc(e.target.value)}
                        placeholder="Descreva brevemente a correção técnica necessária..."
                        required
                        className="w-full bg-[#0B0F19]/60 border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/40 transition resize-none"
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="w-full py-2.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <Send size={12} />
                      Enviar Solicitação
                    </button>
                  </form>

                  {/* Listagem de Chamados Abertos */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-semibold text-slate-300">// Histórico de Chamados</h4>
                    <div className="space-y-3">
                      {chamados.map(ticket => (
                        <div key={ticket.id} className="p-3.5 bg-[#0B0F19]/40 border border-white/5 rounded-xl flex items-center justify-between text-xs animate-fadeIn">
                          <div>
                            <span className="text-[9px] text-slate-500 font-mono uppercase block">
                              {ticket.created_at ? new Date(ticket.created_at).toLocaleDateString("pt-BR") : "Recém Aberto"}
                            </span>
                            <span className="text-slate-300 font-medium block mt-1">{ticket.titulo}</span>
                          </div>
                          
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold border uppercase ${
                            ticket.status === "concluido" 
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                              : ticket.status === "em_andamento"
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                              : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          }`}>
                            {ticket.status.replace("_", " ")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MÓDULO AUTHORITY */}
          {activeTab === "authority" && profile.pacote_authority && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-white/5 pb-5">
                <h2 className="text-2xl font-semibold text-white tracking-tight">Roadmap de Escala & Dev</h2>
                <p className="text-xs text-slate-400 font-light mt-1.5">Monitore os lançamentos de novas sprints técnicas e o seu ranqueamento de SEO corporativo.</p>
              </div>

              {/* Status SEO & Projetos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-[#0F1424]/40 border border-white/5 rounded-2xl p-5 text-center">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block mb-1">SCORE MÁXIMO SEO</span>
                  <div className="text-3xl font-medium text-emerald-400 mt-2">
                    {roadmap.length > 0 ? roadmap[0].seo_score || 96 : 96} / 100
                  </div>
                  <span className="text-[10px] text-slate-400 font-light mt-1 block">Aritmética Google Lighthouse</span>
                </div>
                
                <div className="bg-[#0F1424]/40 border border-white/5 rounded-2xl p-5 text-center">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block mb-1">PALAVRAS CHAVE TOP 3</span>
                  <div className="text-3xl font-medium text-blue-400 mt-2">12 Ativas</div>
                  <span className="text-[10px] text-slate-400 font-light mt-1 block">Termos orgânicos indexados</span>
                </div>

                <div className="bg-[#0F1424]/40 border border-white/5 rounded-2xl p-5 text-center">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block mb-1">SPRINTS CONCLUÍDAS</span>
                  <div className="text-3xl font-medium text-purple-400 mt-2">
                    {roadmap.filter(r => r.status_desenvolvimento === "concluido").length || 1} Sprints
                  </div>
                  <span className="text-[10px] text-slate-400 font-light mt-1 block">Progresso do Desenvolvimento</span>
                </div>
              </div>

              {/* Visualização de Sprints de Desenvolvimento */}
              <div className="bg-[#0F1424]/40 border border-white/5 rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-white mb-6">Roadmap de Sprints da Plataforma</h3>
                
                <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/5">
                  {roadmap.map((sprint, idx) => (
                    <div key={idx} className="relative pl-8">
                      <div className={`absolute left-1.5 top-1.5 h-3 w-3 rounded-full border ${
                        sprint.status_desenvolvimento === "concluido" 
                          ? "bg-emerald-500 border-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                          : sprint.status_desenvolvimento === "em_desenvolvimento"
                          ? "bg-blue-500 border-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                          : "bg-[#0B0F19] border-white/10"
                      }`}></div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h4 className="text-xs font-semibold text-white">{sprint.sprint_nome}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold border uppercase shrink-0 w-fit ${
                          sprint.status_desenvolvimento === "concluido" 
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                            : sprint.status_desenvolvimento === "em_desenvolvimento"
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                            : "bg-white/5 text-slate-500 border-white/5"
                        }`}>
                          {sprint.status_desenvolvimento.replace("_", " ")}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-light mt-1 max-w-2xl leading-relaxed">
                        Planejamento estratégico de entrega técnica sob metodologia ágil.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0C1121] border border-white/10 w-full max-w-lg rounded-2xl flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-[#0F1424]">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-tight">Central de Ajuda e Suporte</h3>
                <p className="text-[10px] text-slate-500 font-mono tracking-wider">// Atendimento & FAQ MAGE</p>
              </div>
              <button 
                onClick={() => setShowHelpModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg border border-white/5 hover:border-white/10 transition cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            
            {/* Scrollable Content */}
            <div className="p-6 space-y-6 text-slate-300">
              <div className="space-y-4">
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">// Como podemos ajudar?</h4>
                
                <div className="space-y-3">
                  <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl space-y-1">
                    <span className="text-xs font-semibold text-white block">Aprovação de Conteúdos</span>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">
                      Na aba <strong className="text-blue-400">MAGE Management</strong>, avalie as publicações e copys preparadas. Você pode aprovar ou solicitar ajustes preenchendo as alterações no campo de texto.
                    </p>
                  </div>
                  
                  <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl space-y-1">
                    <span className="text-xs font-semibold text-white block">Suporte Técnico</span>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">
                      Para correções técnicas, atualizações ou novos recursos em seu site, abra um chamado técnico diretamente na aba <strong className="text-blue-400">MAGE Management</strong>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-3">
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">// Canais de Atendimento Direto</h4>
                
                <div className="grid grid-cols-2 gap-3">
                  <a 
                    href="mailto:suporte@magecomunicacao.com.br"
                    className="py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-center text-xs font-semibold text-white transition flex items-center justify-center gap-2"
                  >
                    Suporte por E-mail
                  </a>
                  <a 
                    href="https://wa.me/5531999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-xl text-center text-xs font-semibold text-emerald-400 transition flex items-center justify-center gap-2"
                  >
                    WhatsApp Oficial
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Terms Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0C1121] border border-white/10 w-full max-w-4xl max-h-[85vh] rounded-2xl flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-[#0F1424]">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-tight">Termos de Uso</h3>
                <p className="text-[10px] text-slate-500 font-mono tracking-wider">// Termos e condições gerais da MAGE</p>
              </div>
              <button 
                onClick={() => setShowTermsModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg border border-white/5 hover:border-white/10 transition cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
              <TermsPage />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
