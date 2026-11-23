"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Send,
  Upload,
  Image as ImageIcon,
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link2,
  Eye,
  Edit3,
  Columns,
  Loader2,
  X,
  Clock,
  Sparkles,
} from 'lucide-react';
import {
  POST_CATEGORIES,
  POST_AUTHORS,
  slugify,
  estimateReadingTime,
  type Post,
  type PostStatus,
} from '@/src/lib/posts';
import { MarkdownRenderer } from '@/src/components/blog/MarkdownRenderer';
import { salvarPostAction } from '@/app/admin/posts-actions';

interface PostEditorProps {
  initialPost?: Post | null;
}

export function PostEditor({ initialPost }: PostEditorProps) {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const inlineImageInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(initialPost?.title ?? '');
  const [slug, setSlug] = useState(initialPost?.slug ?? '');
  const [slugLocked, setSlugLocked] = useState(Boolean(initialPost?.slug));
  const [category, setCategory] = useState(initialPost?.category ?? POST_CATEGORIES[0]);
  const [authorName, setAuthorName] = useState(initialPost?.author_name ?? POST_AUTHORS[0]);
  const [tagsText, setTagsText] = useState(initialPost?.tags?.join(', ') ?? '');
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt ?? '');
  const [summaryBox, setSummaryBox] = useState(initialPost?.summary_box ?? '');
  const [coverImage, setCoverImage] = useState(initialPost?.cover_image ?? '');
  const [featured, setFeatured] = useState(initialPost?.featured ?? false);
  const [content, setContent] = useState(
    initialPost?.content ??
      `## Introdução\n\nEscreva aqui uma abertura direta explicando por que este tema importa para o leitor.\n\n## Principais pontos práticos\n\n- Primeiro ponto objetivo com **destaque em negrito**\n- Segundo ponto prático aplicável no dia a dia\n- Terceiro ponto conectando estratégia e resultado\n\n> Dica MAGE: use citações para destacar insights importantes durante a leitura.\n\n## Conclusão\n\nFeche o conteúdo com um resumo claro e próximo passo.`
  );

  const [viewMode, setViewMode] = useState<'split' | 'edit' | 'preview'>('split');
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingInline, setUploadingInline] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const readingTime = estimateReadingTime(content);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slugLocked) {
      setSlug(slugify(value));
    }
  };

  const uploadImageFile = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/admin/upload-image', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Falha ao enviar imagem.');
    }
    return data.url as string;
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
    setFeedback(null);
    try {
      const url = await uploadImageFile(file);
      if (url) {
        setCoverImage(url);
        setFeedback({ type: 'success', message: 'Imagem de capa enviada para o Supabase!' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err?.message || 'Erro no upload da capa.' });
    } finally {
      setUploadingCover(false);
      e.target.value = '';
    }
  };

  const insertAtCursor = (before: string, after = '', placeholder = '') => {
    const el = textareaRef.current;
    if (!el) {
      setContent((prev) => `${prev}\n${before}${placeholder}${after}`);
      return;
    }

    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = content.slice(start, end) || placeholder;
    const nextValue = content.slice(0, start) + before + selected + after + content.slice(end);
    setContent(nextValue);

    requestAnimationFrame(() => {
      el.focus();
      const cursorStart = start + before.length;
      const cursorEnd = cursorStart + selected.length;
      el.setSelectionRange(cursorStart, cursorEnd);
    });
  };

  const handleInlineImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingInline(true);
    setFeedback(null);
    try {
      const url = await uploadImageFile(file);
      if (url) {
        const alt = file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ');
        insertAtCursor(`\n![${alt}](${url})\n`, '', '');
        setFeedback({ type: 'success', message: 'Imagem inserida no conteúdo!' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err?.message || 'Erro ao enviar imagem.' });
    } finally {
      setUploadingInline(false);
      e.target.value = '';
    }
  };

  const handleSave = async (targetStatus: PostStatus) => {
    setSaving(true);
    setFeedback(null);

    const tags = tagsText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const res = await salvarPostAction({
      id: initialPost?.id,
      title,
      slug: slug || slugify(title),
      excerpt,
      summary_box: summaryBox,
      content,
      category,
      tags,
      cover_image: coverImage,
      author_name: authorName,
      featured,
      status: targetStatus,
    });

    setSaving(false);

    if (!res.success) {
      setFeedback({ type: 'error', message: res.error || 'Erro ao salvar.' });
      return;
    }

    setFeedback({
      type: 'success',
      message:
        targetStatus === 'published'
          ? 'Conteúdo publicado com sucesso no site!'
          : 'Rascunho salvo com sucesso!',
    });

    router.refresh();
    if (!initialPost?.id && res.id) {
      router.push(`/admin/editar/${res.id}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
            aria-label="Voltar"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-medium text-white tracking-tight">
              {initialPost ? 'Editar Conteúdo' : 'Novo Conteúdo'}
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              {initialPost?.status === 'published' ? '● Publicado' : '○ Rascunho'} • {readingTime} min de leitura
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave('draft')}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs sm:text-sm font-medium inline-flex items-center gap-2 cursor-pointer disabled:opacity-50 transition-colors"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Salvar Rascunho
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave('published')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white text-xs sm:text-sm font-medium inline-flex items-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer disabled:opacity-50 transition-all"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
            Publicar no Site
          </button>
        </div>
      </div>

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

      {/* Metadata Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 cols: Title, Slug, Excerpt, Summary Box */}
        <div className="lg:col-span-2 bg-[#111923]/60 border border-white/5 rounded-2xl p-5 sm:p-6 space-y-4">
          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5">
              Título do Conteúdo *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Ex: Como estruturar o Perfil da Empresa no Google para gerar clientes"
              className="w-full bg-[#0B0F19]/80 border border-white/10 focus:border-blue-500/50 rounded-xl px-4 py-3 text-base text-white placeholder-slate-600 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5">
                Slug (URL) *
              </label>
              <div className="flex items-center bg-[#0B0F19]/80 border border-white/10 focus-within:border-blue-500/50 rounded-xl px-3">
                <span className="text-xs font-mono text-slate-500 shrink-0">/conteudos/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => {
                    setSlugLocked(true);
                    setSlug(slugify(e.target.value));
                  }}
                  placeholder="slug-do-conteudo"
                  className="w-full bg-transparent py-2.5 pl-1 text-xs font-mono text-blue-300 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5">
                Tags (separadas por vírgula)
              </label>
              <input
                type="text"
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                placeholder="SEO, Google Meu Negócio, Redes Sociais"
                className="w-full bg-[#0B0F19]/80 border border-white/10 focus:border-blue-500/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5">
              Resumo Curto (usado nos cards e como Meta Description no Google) *
            </label>
            <textarea
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Resumo direto em 1 a 2 frases explicando o que o leitor vai aprender..."
              className="w-full bg-[#0B0F19]/80 border border-white/10 focus:border-blue-500/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5">
              Box &ldquo;Resumo Rápido&rdquo; (Opcional — destaque no topo do artigo)
            </label>
            <textarea
              rows={2}
              value={summaryBox}
              onChange={(e) => setSummaryBox(e.target.value)}
              placeholder="Resposta rápida ou principal takeaway para quem quer entender a ideia em 10 segundos..."
              className="w-full bg-[#0B0F19]/80 border border-white/10 focus:border-blue-500/50 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 outline-none resize-none"
            />
          </div>
        </div>

        {/* Right col: Category, Author, Featured, Cover Image Upload */}
        <div className="bg-[#111923]/60 border border-white/5 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5">
                Categoria
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none"
              >
                {POST_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5">
                Autor
              </label>
              <select
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none"
              >
                {POST_AUTHORS.map((author) => (
                  <option key={author} value={author}>
                    {author}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 cursor-pointer">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="rounded accent-blue-500"
            />
            <span className="text-xs text-slate-300">Destacar no topo de /conteudos</span>
          </label>

          {/* Cover Image Upload (Direct to Supabase Storage) */}
          <div className="space-y-2">
            <label className="block text-[11px] font-mono uppercase text-slate-400">
              Imagem de Capa (Upload direto para Supabase)
            </label>

            <input
              ref={coverInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
              onChange={handleCoverUpload}
              className="hidden"
            />

            {coverImage ? (
              <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#0B0F19]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverImage}
                  alt="Capa do conteúdo"
                  className="w-full h-36 object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => coverInputRef.current?.click()}
                    className="px-2.5 py-1 rounded-lg bg-black/75 hover:bg-black text-white text-[10px] font-mono cursor-pointer"
                  >
                    Trocar
                  </button>
                  <button
                    type="button"
                    onClick={() => setCoverImage('')}
                    aria-label="Remover capa"
                    className="p-1 rounded-lg bg-black/75 hover:bg-red-600 text-white cursor-pointer"
                  >
                    <X size={13} />
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                disabled={uploadingCover}
                onClick={() => coverInputRef.current?.click()}
                className="w-full h-32 rounded-xl border border-dashed border-white/15 hover:border-blue-500/40 bg-[#0B0F19]/60 flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {uploadingCover ? (
                  <>
                    <Loader2 size={20} className="animate-spin text-blue-400" />
                    <span className="text-xs font-mono">Enviando para Supabase...</span>
                  </>
                ) : (
                  <>
                    <Upload size={20} className="text-blue-400" />
                    <span className="text-xs">Clique para subir a capa (até 5 MB)</span>
                    <span className="text-[10px] text-slate-500 font-mono">JPG, PNG, WebP ou AVIF</span>
                  </>
                )}
              </button>
            )}

            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="Ou cole a URL de uma imagem..."
              className="w-full bg-[#0B0F19]/80 border border-white/10 focus:border-blue-500/40 rounded-lg px-3 py-2 text-[11px] font-mono text-slate-300 placeholder-slate-600 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Editor & Live Preview Workspace */}
      <div className="bg-[#111923]/60 border border-white/5 rounded-2xl overflow-hidden">
        {/* Toolbar */}
        <div className="px-4 py-3 border-b border-white/5 bg-[#0F1622] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1">
            <button
              type="button"
              title="Título H2"
              onClick={() => insertAtCursor('\n## ', '\n', 'Subtítulo')}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
            >
              <Heading2 size={15} />
            </button>
            <button
              type="button"
              title="Subtítulo H3"
              onClick={() => insertAtCursor('\n### ', '\n', 'Tópico')}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
            >
              <Heading3 size={15} />
            </button>
            <div className="w-px h-4 bg-white/10 mx-1" />
            <button
              type="button"
              title="Negrito"
              onClick={() => insertAtCursor('**', '**', 'texto em negrito')}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
            >
              <Bold size={15} />
            </button>
            <button
              type="button"
              title="Itálico"
              onClick={() => insertAtCursor('*', '*', 'texto em itálico')}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
            >
              <Italic size={15} />
            </button>
            <div className="w-px h-4 bg-white/10 mx-1" />
            <button
              type="button"
              title="Lista com marcadores"
              onClick={() => insertAtCursor('\n- ', '', 'Item da lista')}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
            >
              <List size={15} />
            </button>
            <button
              type="button"
              title="Lista numerada"
              onClick={() => insertAtCursor('\n1. ', '', 'Primeiro passo')}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
            >
              <ListOrdered size={15} />
            </button>
            <button
              type="button"
              title="Citação / Destaque"
              onClick={() => insertAtCursor('\n> ', '\n', 'Insight ou citação importante')}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
            >
              <Quote size={15} />
            </button>
            <button
              type="button"
              title="Link"
              onClick={() => insertAtCursor('[', '](https://magecomunicacao.com.br)', 'texto do link')}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
            >
              <Link2 size={15} />
            </button>
            <div className="w-px h-4 bg-white/10 mx-1" />
            <input
              ref={inlineImageInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
              onChange={handleInlineImageUpload}
              className="hidden"
            />
            <button
              type="button"
              disabled={uploadingInline}
              onClick={() => inlineImageInputRef.current?.click()}
              className="px-2.5 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-300 text-xs inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {uploadingInline ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <ImageIcon size={13} />
              )}
              <span>Inserir Imagem</span>
            </button>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 bg-[#0B0F19] p-1 rounded-lg border border-white/5">
            <button
              type="button"
              onClick={() => setViewMode('edit')}
              className={`px-2.5 py-1 rounded text-xs inline-flex items-center gap-1 cursor-pointer ${
                viewMode === 'edit' ? 'bg-blue-500/20 text-blue-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Edit3 size={12} /> Editor
            </button>
            <button
              type="button"
              onClick={() => setViewMode('split')}
              className={`hidden lg:inline-flex px-2.5 py-1 rounded text-xs items-center gap-1 cursor-pointer ${
                viewMode === 'split' ? 'bg-blue-500/20 text-blue-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Columns size={12} /> Dividido
            </button>
            <button
              type="button"
              onClick={() => setViewMode('preview')}
              className={`px-2.5 py-1 rounded text-xs inline-flex items-center gap-1 cursor-pointer ${
                viewMode === 'preview' ? 'bg-blue-500/20 text-blue-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye size={12} /> Preview
            </button>
          </div>
        </div>

        {/* Split Editor & Preview */}
        <div
          className={`grid ${
            viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/5' : 'grid-cols-1'
          }`}
        >
          {/* Textarea Pane */}
          {viewMode !== 'preview' && (
            <div className="p-4 sm:p-5 bg-[#0B0F19]/60">
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={22}
                placeholder="Escreva seu conteúdo aqui usando a barra acima ou Markdown..."
                className="w-full h-full min-h-[480px] bg-transparent text-sm text-slate-200 font-mono leading-relaxed outline-none resize-y placeholder-slate-600"
              />
            </div>
          )}

          {/* Live Preview Pane */}
          {viewMode !== 'edit' && (
            <div className="p-5 sm:p-8 bg-[#0B0F14] max-h-[680px] overflow-y-auto custom-scrollbar">
              <div className="max-w-2xl mx-auto space-y-5">
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-400">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/25 uppercase">
                    {category}
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} /> {readingTime} min de leitura
                  </span>
                  <span>•</span>
                  <span>Por {authorName}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight leading-tight">
                  {title || 'Título do seu conteúdo aparecerá aqui'}
                </h2>

                {excerpt && (
                  <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed">
                    {excerpt}
                  </p>
                )}

                {coverImage && (
                  <div className="rounded-xl overflow-hidden border border-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={coverImage}
                      alt={title || 'Capa'}
                      className="w-full max-h-72 object-cover"
                    />
                  </div>
                )}

                {summaryBox && (
                  <div className="p-4 rounded-xl bg-blue-500/[0.06] border border-blue-500/20 space-y-1.5">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-blue-300 inline-flex items-center gap-1.5">
                      <Sparkles size={12} /> Resumo Rápido
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                      {summaryBox}
                    </p>
                  </div>
                )}

                <div className="pt-2 border-t border-white/5">
                  <MarkdownRenderer content={content} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

