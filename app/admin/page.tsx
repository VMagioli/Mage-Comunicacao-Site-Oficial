"use client";

import React, { useState } from 'react';
import { Users, Search, Plus, Building2, FolderKanban, ShieldCheck, Settings, X, Mail } from 'lucide-react';

export default function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estados do formulário do Novo Cliente
  const [novoEmail, setNovoEmail] = useState("");
  const [novaEmpresa, setNovaEmpresa] = useState("");

  // Dados mocados (visuais) para vermos os cards antes da API
  const mockClientes = [
    { id: '1', empresa: 'Tech Corp Solutions', email: 'contato@techcorp.com', pacotes: ['Foundation', 'Management'] },
    { id: '2', empresa: 'Studio Arquitetura', email: 'projetos@studio.arq.br', pacotes: ['Authority'] },
  ];

  const handleCadastrarCliente = (e: React.FormEvent) => {
    e.preventDefault();
    // A API mágica que vamos criar no próximo passo entrará exatamente aqui!
    console.log("Pronto para chamar a API para:", novoEmail, novaEmpresa);
    setIsModalOpen(false);
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
        {mockClientes.map(cliente => (
          <div key={cliente.id} className="bg-[#0F1424]/40 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition duration-300 group cursor-pointer relative overflow-hidden">
            {/* Efeito de hover brilhante */}
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
        ))}
      </div>

      {/* Modal: Cadastrar Novo Cliente */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0B0F19]/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative w-full max-w-md bg-[#0F1424] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
            {/* Header Modal */}
            <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Plus size={16} className="text-blue-500" />
                Cadastrar Novo Cliente
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white transition cursor-pointer">
                <X size={16} />
              </button>
            </div>

            {/* Form Modal */}
            <form onSubmit={handleCadastrarCliente} className="p-6 space-y-5">
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
                <p className="text-[10px] text-emerald-500/80 mt-1 flex items-center gap-1">
                  <ShieldCheck size={10} /> O convite mágico será enviado para este e-mail.
                </p>
              </div>

              {/* Botões Ação */}
              <div className="pt-4 flex items-center gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-xs font-semibold text-slate-300 transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-semibold text-white shadow-[0_0_15px_rgba(37,99,235,0.3)] transition cursor-pointer"
                >
                  Criar e Convidar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}