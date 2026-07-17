"use client";

import React, { useState, useEffect } from 'react';
import { Users, Search, Plus, Building2, FolderKanban, ShieldCheck, Settings, X, Mail, Clock, HardDrive } from 'lucide-react';
import { obterTodosClientesAction } from './actions';

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
        console.error(res.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  const handleCadastrarCliente = async (e: React.FormEvent) => {
    e.preventDefault();
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

      alert('Sucesso! O cliente foi cadastrado na tabela e o convite de e-mail foi enviado.');
      
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
      alert(`Erro: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fadeIn">
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
        ) : clientes.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs font-mono col-span-full">
            Nenhum cliente cadastrado no banco de dados.
          </div>
        ) : (
          clientes.map(cliente => (
          <div key={cliente.id} className="bg-[#0F1424]/40 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition duration-300 group cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-transparent transition-all duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-lg bg-[#0B0F19] border border-white/5 flex items-center justify-center">
                  <Building2 size={18} className="text-slate-400" />
                </div>
                <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-mono font-semibold rounded-full uppercase">
                  Ativo
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white truncate">{cliente.empresa}</h3>
              <p className="text-xs text-slate-400 mt-1 truncate">{cliente.email}</p>
              <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-white/5">
                {cliente.pacotes.map(pacote => (
                  <span key={pacote} className="px-2 py-1 bg-white/5 text-slate-300 text-[10px] rounded flex items-center gap-1.5">
                    {pacote === 'Foundation' && <ShieldCheck size={10} className="text-blue-400"/>}
                    {pacote === 'Management' && <FolderKanban size={10} className="text-purple-400"/>}
                    {pacote === 'Authority' && <Settings size={10} className="text-emerald-400"/>}
                    {pacote}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )))}
      </div>

      {/* Modal Expandido: Cadastrar Novo Cliente */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0B0F19]/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative w-full max-w-xl bg-[#0F1424] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn max-h-[90vh] flex flex-col">
            {/* Header Modal */}
            <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-white/[0.02] shrink-0">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Plus size={16} className="text-blue-500" />
                Cadastrar Novo Cliente MAGE
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white transition cursor-pointer">
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
                      className="w-full bg-[#0B0F19]/60 border border-white/5 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/40 transition"
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
                      className="w-full bg-[#0B0F19]/60 border border-white/5 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/40 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Seção de Seleção de Módulos Contratados */}
              <div className="bg-[#0B0F19]/40 p-4 border border-white/5 rounded-xl space-y-3">
                <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">// Módulos do Contrato</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className={`border rounded-xl p-3 flex flex-col justify-between cursor-pointer select-none transition ${
                    pacoteFoundation ? "bg-blue-500/10 border-blue-500/40 text-blue-200" : "bg-white/[0.01] border-white/5 text-slate-400 hover:border-white/10"
                  }`}>
                    <div className="flex items-center justify-between">
                      <ShieldCheck size={14} className={pacoteFoundation ? "text-blue-400" : "text-slate-500"} />
                      <input type="checkbox" checked={pacoteFoundation} onChange={e => setPacoteFoundation(e.target.checked)} className="rounded border-slate-700 bg-slate-800 text-blue-500 accent-blue-500 h-3 w-3" />
                    </div>
                    <span className="text-xs font-semibold mt-3">Foundation</span>
                  </label>

                  <label className={`border rounded-xl p-3 flex flex-col justify-between cursor-pointer select-none transition ${
                    pacoteManagement ? "bg-purple-500/10 border-purple-500/40 text-purple-200" : "bg-white/[0.01] border-white/5 text-slate-400 hover:border-white/10"
                  }`}>
                    <div className="flex items-center justify-between">
                      <FolderKanban size={14} className={pacoteManagement ? "text-purple-400" : "text-slate-500"} />
                      <input type="checkbox" checked={pacoteManagement} onChange={e => setPacoteManagement(e.target.checked)} className="rounded border-slate-700 bg-slate-800 text-purple-500 accent-purple-500 h-3 w-3" />
                    </div>
                    <span className="text-xs font-semibold mt-3">Management</span>
                  </label>

                  <label className={`border rounded-xl p-3 flex flex-col justify-between cursor-pointer select-none transition ${
                    pacoteAuthority ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-200" : "bg-white/[0.01] border-white/5 text-slate-400 hover:border-white/10"
                  }`}>
                    <div className="flex items-center justify-between">
                      <Settings size={14} className={pacoteAuthority ? "text-emerald-400" : "text-slate-500"} />
                      <input type="checkbox" checked={pacoteAuthority} onChange={e => setPacoteAuthority(e.target.checked)} className="rounded border-slate-700 bg-slate-800 text-emerald-500 accent-emerald-500 h-3 w-3" />
                    </div>
                    <span className="text-xs font-semibold mt-3">Authority</span>
                  </label>
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
                      className="w-full bg-[#0B0F19]/60 border border-white/5 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/40 transition"
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
                      className="w-full bg-[#0B0F19]/60 border border-white/5 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40 transition appearance-none"
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
                  className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-xs font-semibold text-slate-300 transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-semibold text-white shadow-[0_0_15px_rgba(37,99,235,0.3)] transition cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Processando...' : 'Criar e Convidar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}