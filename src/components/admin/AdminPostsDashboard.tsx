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
  FileText,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Star,
} from 'lucide-react';
import type { Post } from '@/src/lib/posts';
import {
  alternarStatusPostAction,
  excluirPostAction,
} from '@/app/admin/posts-actions';

interface AdminPostsDashboardProps {
  initialPosts: Post[];
  tableMissing: boolean;
}

export function AdminPostsDashboard({
  initialPosts,
  tableMissing,
}: AdminPostsDashboardProps) {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const totalPosts = posts.length;
  const totalPublished = posts.filter((p) => p.status === 'published').length;
  const totalDrafts = posts.filter((p) => p.status === 'draft').length;

  const filteredPosts = posts.filter((post) => {
    const matchesStatus = filtroStatus === 'all' || post.status === filtroStatus;
    const term = busca.trim().toLowerCase();
    const matchesSearch =
      !term ||
      post.title.toLowerCase().includes(term) ||
      post.category.toLowerCase().includes(term) ||
      post.slug.toLowerCase().includes(term);
    return matchesStatus && matchesSearch;
  });

  const handleToggleStatus = (post: Post) => {
    setFeedback(null);
    startTransition(async () => {
      const res = await alternarStatusPostAction(post.id, post.status);
      if (res.success && res.status) {
        setPosts((prev) =>
          prev.map((p) => (p.id === post.id ? { ...p, status: res.status! } : p))
        );
        setFeedback({
          type: 'success',
          message:
            res.status === 'published'
              ? `"${post.title}" publicado no site!`
              : `"${post.title}" movido para rascunho.`,
        });
        router.refresh();
      } else {
        setFeedback({ type: 'error', message: res.error || 'Erro ao alterar status.' });
      }
    });
  };

  const handleDelete = (post: Post) => {
    if (!window.confirm(`Tem certeza que deseja excluir "${post.title}"? Esta ação não pode ser desfeita.`)) {
      return;
    }
    setFeedback(null);
    startTransition(async () => {
      const res = await excluirPostAction(post.id);
      if (res.success) {
        setPosts((prev) => prev.filter((p) => p.id !== post.id));
        setFeedback({ type: 'success', message: `Conteúdo "${post.title}" excluído.` });
        router.refresh();
      } else {
        setFeedback({ type: 'error', message: res.error || 'Erro ao excluir conteúdo.' });
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
            Gestão de Conteúdos
          </h1>
          <p className="text-sm text-slate-400 font-light mt-1">
            Escreva, revise no preview ao vivo e publique artigos diretamente em <span className="font-mono text-blue-400">/conteudos</span>.
          </p>
        </div>

        <Link
          href="/admin/novo"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white text-sm font-medium shadow-lg shadow-blue-500/20 transition-all shrink-0"
        >
          <Plus size={16} />
          Novo Conteúdo
        </Link>
      </div>

      {/* Warning if SQL migration hasn't been executed yet */}
      {tableMissing && (
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 flex items-start gap-3.5">
          <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs sm:text-sm">
            <div className="font-semibold text-amber-300">
              Ação pendente no Supabase: tabela <code className="font-mono">posts</code> ainda não criada
            </div>
            <p className="text-amber-100/80 font-light leading-relaxed">
              Abra o <strong>SQL Editor</strong> do seu projeto Supabase e execute o script salvo em{' '}
              <code className="font-mono bg-black/30 px-1.5 py-0.5 rounded">supabase/fase4-conteudos.sql</code>{' '}
              para criar a tabela <code className="font-mono">posts</code> e o bucket de imagens{' '}
              <code className="font-mono">blog-covers</code>. Depois, recarregue esta página.
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
            <div className="text-xs font-mono text-slate-400 uppercase">Total de Conteúdos</div>
            <div className="text-3xl font-semibold text-white mt-1">{totalPosts}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
            <FileText size={18} />
          </div>
        </div>

        <div className="bg-[#111923]/60 border border-white/5 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase">Publicados no Site</div>
            <div className="text-3xl font-semibold text-emerald-400 mt-1">{totalPublished}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 size={18} />
          </div>
        </div>

        <div className="bg-[#111923]/60 border border-white/5 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase">Rascunhos</div>
            <div className="text-3xl font-semibold text-amber-300 mt-1">{totalDrafts}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
            <Clock size={18} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por título, categoria ou slug..."
            className="w-full bg-[#111923]/80 border border-white/10 focus:border-blue-500/40 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'published', label: 'Publicados' },
            { id: 'draft', label: 'Rascunhos' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFiltroStatus(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                filtroStatus === tab.id
                  ? 'bg-blue-500/15 border-blue-500/30 text-blue-300'
                  : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Posts List */}
      <div className="bg-[#111923]/60 border border-white/5 rounded-2xl overflow-hidden">
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <FileText size={32} className="text-slate-600 mx-auto" />
            <p className="text-sm text-slate-300">
              {posts.length === 0
                ? 'Nenhum conteúdo criado ainda.'
                : 'Nenhum conteúdo encontrado com esse filtro.'}
            </p>
            {posts.length === 0 && !tableMissing && (
              <Link
                href="/admin/novo"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-medium hover:bg-blue-500/25 transition-colors"
              >
                <Plus size={14} /> Criar primeiro conteúdo
              </Link>
            )}
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                        post.status === 'published'
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25'
                          : 'bg-amber-500/10 text-amber-300 border-amber-500/25'
                      }`}
                    >
                      {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                    </span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
                      {post.category}
                    </span>
                    {post.featured && (
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/25 inline-flex items-center gap-1">
                        <Star size={10} /> Destaque
                      </span>
                    )}
                    <span className="text-[11px] text-slate-500 font-mono">
                      {post.reading_time} min • {post.author_name}
                    </span>
                  </div>

                  <h2 className="text-base font-medium text-white truncate">{post.title}</h2>
                  <p className="text-xs text-slate-400 font-mono truncate">/conteudos/{post.slug}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {post.status === 'published' && (
                    <Link
                      href={`/conteudos/${post.slug}`}
                      target="_blank"
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white inline-flex items-center gap-1.5 transition-colors"
                    >
                      <ExternalLink size={12} /> Ver
                    </Link>
                  )}

                  <Link
                    href={`/admin/editar/${post.id}`}
                    className="px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/25 text-xs text-blue-300 inline-flex items-center gap-1.5 transition-colors"
                  >
                    <Edit3 size={12} /> Editar
                  </Link>

                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleToggleStatus(post)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {post.status === 'published' ? (
                      <>
                        <EyeOff size={12} /> Despublicar
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
                    onClick={() => handleDelete(post)}
                    aria-label="Excluir conteúdo"
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

