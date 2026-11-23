import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Calendar, Clock, Sparkles, User } from 'lucide-react';
import { getPublishedPostBySlug } from '@/src/lib/posts';
import { MarkdownRenderer } from '@/src/components/blog/MarkdownRenderer';
import { JsonLd } from '@/src/components/seo/JsonLd';
import { generateBreadcrumbSchema } from '@/src/lib/seo-schemas';

export const revalidate = 60;

interface ConteudoDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ConteudoDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return { title: 'Conteúdo não encontrado' };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/conteudos/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://magecomunicacao.com.br/conteudos/${post.slug}`,
      type: 'article',
      publishedTime: post.published_at || post.created_at,
      modifiedTime: post.updated_at,
      authors: [post.author_name],
      ...(post.cover_image
        ? { images: [{ url: post.cover_image, alt: post.title }] }
        : {}),
    },
  };
}

function formatDatePtBr(dateStr: string | null) {
  if (!dateStr) return '';
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(new Date(dateStr));
  } catch {
    return '';
  }
}

export default async function ConteudoDetailPage({ params }: ConteudoDetailProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Início', path: '/' },
    { name: 'Conteúdos', path: '/conteudos' },
    { name: post.title, path: `/conteudos/${post.slug}` },
  ]);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `https://magecomunicacao.com.br/conteudos/${post.slug}`,
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at,
    inLanguage: 'pt-BR',
    author: {
      '@type': post.author_name === 'Equipe MAGE' ? 'Organization' : 'Person',
      name: post.author_name,
    },
    publisher: {
      '@id': 'https://magecomunicacao.com.br/#organization',
    },
    ...(post.cover_image ? { image: post.cover_image } : {}),
    articleSection: post.category,
    keywords: post.tags.join(', '),
  };

  return (
    <article className="px-4 md:px-8 py-8 md:py-12 relative z-20 max-w-4xl mx-auto w-full">
      <JsonLd data={breadcrumb} />
      <JsonLd data={articleSchema} />

      {/* Back Link */}
      <div className="mb-8">
        <Link
          href="/conteudos"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          Voltar para Conteúdos
        </Link>
      </div>

      {/* Article Header */}
      <header className="space-y-5 mb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
          <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/25 uppercase text-[10px]">
            {post.category}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={13} className="text-slate-500" />
            {post.reading_time} min de leitura
          </span>
          {(post.published_at || post.created_at) && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={13} className="text-slate-500" />
              {formatDatePtBr(post.published_at || post.created_at)}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <User size={13} className="text-slate-500" />
            {post.author_name}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed">
          {post.excerpt}
        </p>
      </header>

      {/* Cover Image */}
      {post.cover_image && (
        <div className="mb-8 rounded-2xl overflow-hidden border border-white/10 bg-[#111923]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full max-h-[460px] object-cover"
          />
        </div>
      )}

      {/* Optional BLUF Summary Box */}
      {post.summary_box && (
        <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-blue-500/[0.06] border border-blue-500/20 space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-widest text-blue-300 inline-flex items-center gap-1.5">
            <Sparkles size={13} />
            Resumo Rápido
          </div>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light">
            {post.summary_box}
          </p>
        </div>
      )}

      {/* Main Content */}
      <div className="bg-[#111923]/45 border border-white/5 rounded-2xl p-6 sm:p-8 md:p-10">
        <MarkdownRenderer content={post.content} />
      </div>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono text-slate-500 uppercase mr-1">Tags:</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Contextual CTA */}
      <div className="mt-12 rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-950/40 via-[#111923] to-emerald-950/30 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
            Quer aplicar isso na sua empresa?
          </span>
          <h2 className="text-xl font-medium text-white">
            Fale com a MAGE sobre sites, redes sociais e SEO no Google.
          </h2>
        </div>
        <Link
          href="/contato"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white text-sm font-medium shrink-0 transition-all"
        >
          Solicitar Diagnóstico <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
}

