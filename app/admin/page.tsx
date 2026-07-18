"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  Users, Search, Plus, Building2, FolderKanban, ShieldCheck, Settings,
  X, Mail, Clock, HardDrive, Loader2, CheckCircle2, AlertCircle, Check
} from 'lucide-react';
import { obterTodosClientesAction } from './actions';

type ToastType = 'success' | 'error';
interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

export default function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados do formulário do Novo Cliente
  const [novoEmail, setNovoEmail] = useState("");
  const [novaEmpresa, setNovaEmpresa] = useState("");
  const [pacoteFoundation, setPacoteFoundation] = useState(false);
  const [pacoteManagement, setPacoteManagement] = useState(false);
  const [pacoteAuthority, setPacoteAuthority] = useState(false);
  const [urlGoogleDrive, setUrlGoogleDrive] = useState("");
  const [tempoPermanencia, setTempoPermanencia] = useState(12);

  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");

  // Sistema de feedback visual (substitui alert())
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastIdRef = useRef(0);

  const mostrarToast = (type: ToastType, message: string) => {
    const id = ++toastIdRef.current;
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  const fecharToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const carregarClientes = async () => {
    try {
      setLoading(true);
      const res = await obterTodosClientesAction();
      if (res.success && res.clientes) {
        const mapeados = res.clientes.map((c: any) => {
          const pacotes = [];
          if (c.pacote_foundation) pacotes.push('Foundation');
          if (c.pacote_management) pacotes.push('Management');
          if (c.pacote_authority) pacotes.push('Authority');
          return {
            id: c.id,
            empresa: c.nome_empresa,
            email: c.email,
            pacotes: pacotes
          };
        });
        setClientes(mapeados);
      } else {
        mostrarToast('error', res.error || 'Não foi possível carregar os clientes.');
      }
    } catch (err) {
      mostrarToast('error', 'Erro de conexão ao carregar os clientes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  const handleCadastrarCliente = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/clientes/novo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: novoEmail,
          nome_empresa: novaEmpresa,
          pacote_foundation: pacoteFoundation,
          pacote_management: pacoteManagement,
          pacote_authority: pacoteAuthority,
          google_drive_link: urlGoogleDrive,
          url_google_drive: urlGoogleDrive,
          tempo_permanencia_meses: Number(tempoPermanencia)
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ocorreu um erro ao cadastrar o cliente.');
      }

      mostrarToast('success', `Cliente "${novaEmpresa}" cadastrado com sucesso. Convite enviado por e-mail.`);

      // Limpa os estados do formulário
      setNovoEmail("");
      setNovaEmpresa("");
      setPacoteFoundation(false);
      setPacoteManagement(false);
      setPacoteAuthority(false);
      setUrlGoogleDrive("");
      setTempoPermanencia(12);
      setIsModalOpen(false);
      carregarClientes();

    } catch (error: any) {
      mostrarToast('error', error.message || 'Ocorreu um erro ao cadastrar o cliente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const clientesFiltrados = clientes.filter(c => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return true;
    return c.empresa?.toLowerCase().includes(termo) || c.email?.toLowerCase().includes(termo);
  });

  return (
    <div className="animate-fadeIn">
      {/* Container de Toasts - feedback visual no topo da tela */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-2 w-full max-w-sm px-4 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 shadow-2xl backdrop-blur-md animate-toastIn ${
              toast.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-200'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 shrink-0" />
            ) : (
              <AlertCircle size={16} className="text-rose-400 mt-0.5 shrink-0" />
            )}
            <p className="text-xs leading-relaxed flex-1">{toast.message}</p>
            <button
              onClick={() => fecharToast(toast.id)}
              className="text-slate-400 hover:text-white transition shrink-0 cursor-pointer"
            >
              <X size={13} />
            </button>
          </div>
        ))}
      </div>

      {/* Cabeçalho da Área */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-white tracking-tight flex items-center gap-2">
            <Users className="text-blue-500" size={24} />
            Gestão de Clientes
          </h2>
          <p className="text-xs text-slate-400 font-light mt-1.5">Administre contratos, pacotes e libere acessos para novos parceiros.</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
            <input
              type="text"
              value={busca}
              onChange={e => setBusca(e.target.value)}
              placeholder="Buscar cliente..."
              className="w-full bg-[#0F1424]/60 border border-white/5 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/40 transition"
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-[0_0_15px_rgba(37,99,235,0.3)] transition shrink-0 cursor-pointer"
          >
            <Plus size={14} />
            Novo Cliente
          </button>
        </div>
      </div>

      {/* Grid de Clientes Ativos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <div className="flex justify-center items-center py-12 col-span-full">
            <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : clientesFiltrados.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs font-mono col-span-full">
            {clientes.length === 0
              ? 'Nenhum cliente cadastrado no banco de dados.'
              : 'Nenhum cliente encontrado para essa busca.'}
          </div>
        ) : (
          clientesFiltrados.map(cliente => (
            <div key={cliente.id} className="bg-[#0F1424]/40 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition duration-300 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-transparent transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-[#0B0F19] border border-white/5 flex items-center justify-center text-[11px] font-semibold text-slate-300">
                    {cliente.empresa?.slice(0, 2).toUpperCase() || <Building2 size={18} className="text-slate-400" />}
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-mono font-semibold rounded-full uppercase">
                    Ativo
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white truncate">{cliente.empresa}</h3>
                <p className="text-xs text-slate-400 mt-1 truncate">{cliente.email}</p>
                <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-white/5">
                  {cliente.pacotes.length === 0 ? (
                    <span className="text-[10px] text-slate-600 font-mono">Sem pacotes vinculados</span>
                  ) : (
                    cliente.pacotes.map((pacote: string) => (
                      <span key={pacote} className="px-2 py-1 bg-white/5 text-slate-300 text-[10px] rounded flex items-center gap-1.5">
                        {pacote === 'Foundation' && <ShieldCheck size={10} className="text-blue-400" />}
                        {pacote === 'Management' && <FolderKanban size={10} className="text-purple-400" />}
                        {pacote === 'Authority' && <Settings size={10} className="text-emerald-400" />}
                        {pacote}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Expandido: Cadastrar Novo Cliente */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0B0F19]/80 backdrop-blur-sm" onClick={() => !isSubmitting && setIsModalOpen(false)}></div>

          <div className="relative w-full max-w-xl bg-[#0F1424] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn max-h-[90vh] flex flex-col">
            {/* Header Modal */}
            <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-white/[0.02] shrink-0">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Plus size={16} className="text-blue-500" />
                Cadastrar Novo Cliente MAGE
              </h3>
              <button
                onClick={() => !isSubmitting && setIsModalOpen(false)}
                className="text-slate-500 hover:text-white transition cursor-pointer disabled:opacity-30"
                disabled={isSubmitting}
              >
                <X size={16} />
              </button>
            </div>

            {/* Form Modal com Scroll interno se necessário */}
            <form onSubmit={handleCadastrarCliente} className="p-6 space-y-5 overflow-y-auto flex-1">
              {/* Grid Dados Básicos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 uppercase font-mono">Nome da Empresa</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                    <input
                      type="text"
                      value={novaEmpresa}
                      onChange={e => setNovaEmpresa(e.target.value)}
                      placeholder="Ex: Studio Corp"
                      required
                      disabled={isSubmitting}
                      className="w-full bg-[#0B0F19]/60 border border-white/5 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/40 transition disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 uppercase font-mono">E-mail Corporativo</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                    <input
                      type="email"
                      value={novoEmail}
                      onChange={e => setNovoEmail(e.target.value)}
                      placeholder="contato@empresa.com"
                      required
                      disabled={isSubmitting}
                      className="w-full bg-[#0B0F19]/60 border border-white/5 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/40 transition disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* Seção de Seleção de Módulos Contratados */}
              <div className="bg-[#0B0F19]/40 p-4 border border-white/5 rounded-xl space-y-3">
                <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">// Módulos do Contrato</span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      key: 'foundation', label: 'Foundation', checked: pacoteFoundation, set: setPacoteFoundation, Icon: ShieldCheck,
                      activeCard: 'bg-blue-500/10 border-blue-500/40 text-blue-200',
                      activeIcon: 'text-blue-400',
                      activeBox: 'bg-blue-500 border-blue-500',
                    },
                    {
                      key: 'management', label: 'Management', checked: pacoteManagement, set: setPacoteManagement, Icon: FolderKanban,
                      activeCard: 'bg-purple-500/10 border-purple-500/40 text-purple-200',
                      activeIcon: 'text-purple-400',
                      activeBox: 'bg-purple-500 border-purple-500',
                    },
                    {
                      key: 'authority', label: 'Authority', checked: pacoteAuthority, set: setPacoteAuthority, Icon: Settings,
                      activeCard: 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200',
                      activeIcon: 'text-emerald-400',
                      activeBox: 'bg-emerald-500 border-emerald-500',
                    },
                  ].map(({ key, label, checked, set, Icon, activeCard, activeIcon, activeBox }) => (
                    <label
                      key={key}
                      className={`relative border rounded-xl p-3 flex flex-col justify-between cursor-pointer select-none transition ${
                        checked ? activeCard : "bg-white/[0.01] border-white/5 text-slate-400 hover:border-white/10"
                      } ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={e => set(e.target.checked)}
                        disabled={isSubmitting}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <Icon size={14} className={checked ? activeIcon : "text-slate-500"} />
                        <div
                          className={`h-4 w-4 rounded-md border flex items-center justify-center transition ${
                            checked ? activeBox : 'border-slate-600 bg-transparent'
                          }`}
                        >
                          {checked && <Check size={10} className="text-[#0B0F19]" strokeWidth={3} />}
                        </div>
                      </div>
                      <span className="text-xs font-semibold mt-3">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Seção Configurações do Contrato e Infra */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[10px] text-slate-400 uppercase font-mono">Pasta Oficial Google Drive</label>
                  <div className="relative">
                    <HardDrive className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                    <input
                      type="url"
                      value={urlGoogleDrive}
                      onChange={e => setUrlGoogleDrive(e.target.value)}
                      placeholder="https://drive.google.com/drive/..."
                      disabled={isSubmitting}
                      className="w-full bg-[#0B0F19]/60 border border-white/5 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/40 transition disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 uppercase font-mono">Fidelidade Contratual</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                    <select
                      value={tempoPermanencia}
                      onChange={e => setTempoPermanencia(Number(e.target.value))}
                      disabled={isSubmitting}
                      className="w-full bg-[#0B0F19]/60 border border-white/5 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40 transition appearance-none disabled:opacity-50"
                    >
                      <option value={3} className="bg-[#0F1424]">3 meses</option>
                      <option value={6} className="bg-[#0F1424]">6 meses</option>
                      <option value={12} className="bg-[#0F1424]">12 meses</option>
                      <option value={24} className="bg-[#0F1424]">24 meses</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Botões Ação */}
              <div className="pt-4 border-t border-white/5 flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-xs font-semibold text-slate-300 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-semibold text-white shadow-[0_0_15px_rgba(37,99,235,0.3)] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={13} className="animate-spin" />
                      Cadastrando...
                    </>
                  ) : (
                    'Criar e Convidar'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-toastIn {
          animation: toastIn 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}
