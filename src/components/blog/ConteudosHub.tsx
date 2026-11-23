"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock, Search, Sparkles } from 'lucide-react';
import { POST_CATEGORIES, type Post } from '@/src/lib/posts';

interface ConteudosHubProps {
  posts: Post[];
}

function formatDatePtBr(dateStr: string | null) {
  if (!dateStr) return '';
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(dateStr));
  } catch {
    return '';
  }
}

export function ConteudosHub({ posts }: ConteudosHubProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = ['Todos', ...POST_CATEGORIES];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'Todos' || post.category === selectedCategory;
    const term = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !term ||
      post.title.toLowerCase().includes(term) ||
      post.excerpt.toLowerCase().includes(term) ||
      post.tags.some((t) => t.toLowerCase().includes(term));
    return matchesCategory && matchesSearch;
  });

  const featuredPost =
    selectedCategory === 'Todos' && !searchTerm.trim()
      ? filteredPosts.find((p) => p.featured) || filteredPosts[0]
      : null;

  const gridPosts = featuredPost
    ? filteredPosts.filter((p) => p.id !== featuredPost.id)
    : filteredPosts;

  return (
    <div className="px-4 md:px-8 py-8 md:py-10 relative z-20 space-y-10">
      {/* Header */}
      <header className="space-y-4">
        <span className="text-blue-400 text-[10px] font-mono tracking-widest uppercase inline-flex items-center gap-1.5">
          <BookOpen size={12} />
          Hub de Conteúdos & Guias Práticos
        </span>
        <h1 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
          Conteúdos MAGE
        </h1>
        <p className="text-slate-400 font-light max-w-2xl text-sm md:text-base leading-relaxed">
          Guias práticos, análises e insights diretos ao ponto sobre redes sociais, criação de sites, SEO, Perfil da Empresa no Google e crescimento digital.
        </p>
      </header>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-500/15 border-blue-500/35 text-blue-300'
                  : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white hover:border-white/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-72 shrink-0">
          <Search size={14} className="text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar temas ou tags..."
            className="w-full bg-[#111923]/70 border border-white/10 focus:border-blue-500/40 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 outline-none"
          />
        </div>
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 ? (
        <div className="bg-[#111923]/50 border border-white/5 rounded-2xl p-10 md:p-14 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
            <Sparkles size={22} />
          </div>
          <h2 className="text-lg font-medium text-white">
            {posts.length === 0
              ? 'Novos conteúdos chegando em breve'
              : 'Nenhum conteúdo encontrado para este filtro'}
          </h2>
          <p className="text-sm text-slate-400 font-light max-w-md mx-auto">
            {posts.length === 0
              ? 'Estamos preparando guias práticos sobre redes sociais, sites de alta conversão e SEO no Google. Enquanto isso, conheça nossos serviços ou fale com o time.'
              : 'Tente selecionar outra categoria ou limpar o termo de busca.'}
          </p>
          {posts.length === 0 ? (
            <div className="pt-2">
              <Link
                href="/servicos"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-medium hover:bg-blue-500/25 transition-colors"
              >
                Conhecer nossos serviços <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('Todos');
                setSearchTerm('');
              }}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-200 cursor-pointer"
            >
              Limpar filtros
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-10">
          {/* Featured Article */}
          {featuredPost && (
            <Link
              href={`/conteudos/${featuredPost.slug}`}
              className="group block bg-[#111923]/60 border border-white/5 hover:border-blue-500/30 rounded-2xl overflow-hidden transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-5 relative min-h-[220px] bg-gradient-to-br from-blue-950/60 via-[#111923] to-emerald-950/40 overflow-hidden">
                  {featuredPost.cover_image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={featuredPost.cover_image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-8">
                      <span className="text-4xl font-bold tracking-[0.35em] text-white/10 select-none">
                        MAGE
                      </span>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-400">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/25 uppercase">
                        Destaque
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10 uppercase">
                        {featuredPost.category}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={12} /> {featuredPost.reading_time} min
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-medium text-white group-hover:text-blue-300 transition-colors leading-snug">
                      {featuredPost.title}
                    </h2>

                    <p className="text-sm text-slate-400 font-light leading-relaxed line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-mono">
                      Por {featuredPost.author_name}
                      {featuredPost.published_at ? ` • ${formatDatePtBr(featuredPost.published_at)}` : ''}
                    </span>
                    <span className="text-blue-400 font-mono inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Ler conteúdo <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Articles Grid */}
          {gridPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/conteudos/${post.slug}`}
                  className="group bg-[#111923]/55 border border-white/5 hover:border-white/15 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300"
                >
                  <div>
                    <div className="h-44 w-full relative bg-gradient-to-br from-blue-950/50 via-[#0F1622] to-emerald-950/30 overflow-hidden">
                      {post.cover_image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-2xl font-bold tracking-[0.3em] text-white/10 select-none">
                            MAGE
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-slate-400">
                        <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 uppercase">
                          {post.category}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock size={11} /> {post.reading_time} min
                        </span>
                      </div>

                      <h3 className="text-base font-medium text-white group-hover:text-blue-300 transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-xs text-slate-400 font-light leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 py-3.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>{formatDatePtBr(post.published_at || post.created_at)}</span>
                    <span className="text-blue-400 inline-flex items-center gap-1">
                      Ler <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

