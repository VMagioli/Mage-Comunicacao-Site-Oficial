"use client";

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  Globe,
  Share2,
  MapPin,
  Image as ImageIcon,
  AlertTriangle,
  FolderKanban,
} from 'lucide-react';
import type { ProjectCase, CaseType } from '@/src/lib/cases';
import {
  alternarStatusCaseAction,
  excluirCaseAction,
} from '@/app/admin/cases-actions';

interface AdminCasesDashboardProps {
  initialCases: ProjectCase[];
  tableMissing: boolean;
}

const TYPE_META: Record<
  CaseType,
  { label: string; badgeClass: string; icon: React.ElementType; publicPrefix: string }
> = {
  site: {
    label: 'Site / LP',
    badgeClass: 'bg-blue-500/10 text-blue-300 border-blue-500/25',
    icon: Globe,
    publicPrefix: '/projetos/sites',
  },
  social: {
    label: 'Redes Sociais',
    badgeClass: 'bg-purple-500/10 text-purple-300 border-purple-500/25',
    icon: Share2,
    publicPrefix: '/projetos/redes-sociais',
  },
  google: {
    label: 'Perfil Google',
    badgeClass: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
    icon: MapPin,
    publicPrefix: '/projetos/perfil-google',
  },
};

export function AdminCasesDashboard({
  initialCases,
  tableMissing,
}: AdminCasesDashboardProps) {
  const router = useRouter();
  const [cases, setCases] = useState<ProjectCase[]>(initialCases);
  const [filterType, setFilterType] = useState<'all' | CaseType>('all');
  const [busca, setBusca] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const sitesCount = cases.filter((c) => c.type === 'site').length;
  const socialCount = cases.filter((c) => c.type === 'social').length;
  const googleCount = cases.filter((c) => c.type === 'google').length;

  const filtered = cases.filter((c) => {
    const matchesType = filterType === 'all' || c.type === filterType;
    const term = busca.trim().toLowerCase();
    const matchesSearch =
      !term ||
      c.client_name.toLowerCase().includes(term) ||
      (c.subtitle || '').toLowerCase().includes(term) ||
      (c.niche || '').toLowerCase().includes(term) ||
      c.slug.toLowerCase().includes(term);
    return matchesType && matchesSearch;
  });

  const handleToggleStatus = (item: ProjectCase) => {
    setFeedback(null);
    startTransition(async () => {
      const res = await alternarStatusCaseAction(item.id, item.status);
      if (res.success && res.status) {
        setCases((prev) =>
          prev.map((c) => (c.id === item.id ? { ...c, status: res.status! } : c))
        );
        setFeedback({
          type: 'success',
          message:
            res.status === 'published'
              ? `"${item.client_name}" publicado no site!`
              : `"${item.client_name}" movido para rascunho.`,
        });
        router.refresh();
      } else {
        setFeedback({ type: 'error', message: res.error || 'Erro ao alterar status.' });
      }
    });
  };

  const handleDelete = (item: ProjectCase) => {
    if (!window.confirm(`Tem certeza que deseja excluir o case "${item.client_name}"?`)) {
      return;
    }
    setFeedback(null);
    startTransition(async () => {
      const res = await excluirCaseAction(item.id);
      if (res.success) {
        setCases((prev) => prev.filter((c) => c.id !== item.id));
        setFeedback({ type: 'success', message: `Case "${item.client_name}" excluído.` });
        router.refresh();
      } else {
        setFeedback({ type: 'error', message: res.error || 'Erro ao excluir case.' });
      }
    });
  };

  const getPublicUrl = (item: ProjectCase) => {
    if (item.type === 'site') return item.external_url || '/projetos/sites';
    if (item.type === 'social') return `/projetos/redes-sociais/${item.slug}`;
    return `/projetos/perfil-google/${item.slug}`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
            Projetos & Cases do Site
          </h1>
          <p className="text-sm text-slate-400 font-light mt-1">
            Cadastre clientes, suba prints de métricas com análises de antes/depois e gerencie seus sites direto do painel.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/projetos/novo?tipo=site"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/25 text-blue-300 text-xs font-medium transition-colors"
          >
            <Plus size={14} /> Novo Site
          </Link>
          <Link
            href="/admin/projetos/novo?tipo=social"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/25 text-purple-300 text-xs font-medium transition-colors"
          >
            <Plus size={14} /> Novo Cliente Social
          </Link>
          <Link
            href="/admin/projetos/novo?tipo=google"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 text-emerald-300 text-xs font-medium transition-colors"
          >
            <Plus size={14} /> Novo Perfil Google
          </Link>
        </div>
      </div>

      {/* Warning if SQL migration hasn't been executed yet */}
      {tableMissing && (
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 flex items-start gap-3.5">
          <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs sm:text-sm">
            <div className="font-semibold text-amber-300">
              Ação pendente no Supabase: tabela <code className="font-mono">cases</code> ainda não criada
            </div>
            <p className="text-amber-100/80 font-light leading-relaxed">
              Execute o script{' '}
              <code className="font-mono bg-black/30 px-1.5 py-0.5 rounded">supabase/fase4-cases.sql</code>{' '}
              no <strong>SQL Editor</strong> do Supabase para ativar o cadastro de clientes de Sites, Redes Sociais e Perfil no Google (já com seus 5 sites atuais importados automaticamente!).
            </p>
          </div>
        </div>
      )}

      {feedback && (
        <div
          className={`p-4 rounded-xl text-xs sm:text-sm border flex items-center justify-between ${
            feedback.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-300'
              : 'bg-red-500/10 border-red-500/25 text-red-300'
          }`}
        >
          <span>{feedback.message}</span>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-xs opacity-70 hover:opacity-100 cursor-pointer"
          >
            Fechar
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#111923]/60 border border-white/5 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase">Sites & Landing Pages</div>
            <div className="text-3xl font-semibold text-blue-400 mt-1">{sitesCount}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
            <Globe size={18} />
          </div>
        </div>

        <div className="bg-[#111923]/60 border border-white/5 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase">Clientes Redes Sociais</div>
            <div className="text-3xl font-semibold text-purple-400 mt-1">{socialCount}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
            <Share2 size={18} />
          </div>
        </div>

        <div className="bg-[#111923]/60 border border-white/5 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase">Perfis no Google</div>
            <div className="text-3xl font-semibold text-emerald-400 mt-1">{googleCount}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <MapPin size={18} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: `Todos (${cases.length})` },
            { id: 'site', label: `Sites (${sitesCount})` },
            { id: 'social', label: `Redes Sociais (${socialCount})` },
            { id: 'google', label: `Perfil Google (${googleCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterType(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                filterType === tab.id
                  ? 'bg-blue-500/15 border-blue-500/30 text-blue-300'
                  : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search size={15} className="text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por cliente, nicho..."
            className="w-full bg-[#111923]/80 border border-white/10 focus:border-blue-500/40 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 outline-none"
          />
        </div>
      </div>

      {/* List */}
      <div className="bg-[#111923]/60 border border-white/5 rounded-2xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <FolderKanban size={32} className="text-slate-600 mx-auto" />
            <p className="text-sm text-slate-300">
              {cases.length === 0
                ? 'Nenhum case cadastrado ainda.'
                : 'Nenhum case encontrado para este filtro.'}
            </p>
            {!tableMissing && (
              <Link
                href="/admin/projetos/novo"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-medium"
              >
                <Plus size={14} /> Cadastrar primeiro case
              </Link>
            )}
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filtered.map((item) => {
              const meta = TYPE_META[item.type];
              const Icon = meta.icon;
              return (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="w-16 h-14 rounded-xl overflow-hidden border border-white/10 bg-[#0B0F14] shrink-0 flex items-center justify-center">
                      {item.cover_image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.cover_image}
                          alt={item.client_name}
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <Icon size={18} className="text-slate-600" />
                      )}
                    </div>

                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border inline-flex items-center gap-1 ${meta.badgeClass}`}
                        >
                          <Icon size={10} /> {meta.label}
                        </span>
                        <span
                          className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                            item.status === 'published'
                              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25'
                              : 'bg-amber-500/10 text-amber-300 border-amber-500/25'
                          }`}
                        >
                          {item.status === 'published' ? 'Publicado' : 'Rascunho'}
                        </span>
                        {item.type === 'social' && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
                            {item.management_status === 'atual' ? '● Gestão Atual' : 'Case Anterior'}
                          </span>
                        )}
                        {item.type !== 'site' && (
                          <span className="text-[10px] font-mono text-slate-400 inline-flex items-center gap-1">
                            <ImageIcon size={11} /> {item.media_items.length} prints
                          </span>
                        )}
                      </div>

                      <h2 className="text-base font-medium text-white truncate">{item.client_name}</h2>
                      <p className="text-xs text-slate-400 font-mono truncate">
                        {item.type === 'site'
                          ? item.display_url || item.external_url
                          : `${meta.publicPrefix}/${item.slug}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {item.status === 'published' && (
                      <Link
                        href={getPublicUrl(item)}
                        target="_blank"
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white inline-flex items-center gap-1.5 transition-colors"
                      >
                        <ExternalLink size={12} /> Ver
                      </Link>
                    )}

                    <Link
                      href={`/admin/projetos/editar/${item.id}`}
                      className="px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/25 text-xs text-blue-300 inline-flex items-center gap-1.5 transition-colors"
                    >
                      <Edit3 size={12} /> Editar
                    </Link>

                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleToggleStatus(item)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {item.status === 'published' ? (
                        <>
                          <EyeOff size={12} /> Ocultar
                        </>
                      ) : (
                        <>
                          <Eye size={12} /> Publicar
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleDelete(item)}
                      aria-label="Excluir case"
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

