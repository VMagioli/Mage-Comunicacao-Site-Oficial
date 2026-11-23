"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Send,
  Upload,
  Globe,
  Share2,
  MapPin,
  Loader2,
  X,
  Trash2,
  ArrowUp,
  ArrowDown,
  ImagePlus,
} from 'lucide-react';
import {
  SOCIAL_PLATFORM_PRESETS,
  MEDIA_TAG_OPTIONS,
  type CaseType,
  type CaseManagementStatus,
  type CasePublishStatus,
  type CaseMediaItem,
  type ProjectCase,
} from '@/src/lib/cases';
import { slugify } from '@/src/lib/posts';
import { salvarCaseAction } from '@/app/admin/cases-actions';

interface CaseEditorProps {
  initialCase?: ProjectCase | null;
  defaultType?: CaseType;
}

export function CaseEditor({ initialCase, defaultType = 'social' }: CaseEditorProps) {
  const router = useRouter();
  const coverInputRef = useRef<HTMLInputElement>(null);
  const printsInputRef = useRef<HTMLInputElement>(null);

  const [type, setType] = useState<CaseType>(initialCase?.type ?? defaultType);
  const [clientName, setClientName] = useState(initialCase?.client_name ?? '');
  const [slug, setSlug] = useState(initialCase?.slug ?? '');
  const [slugLocked, setSlugLocked] = useState(Boolean(initialCase?.slug));
  const [subtitle, setSubtitle] = useState(initialCase?.subtitle ?? '');
  const [niche, setNiche] = useState(initialCase?.niche ?? '');
  const [managementStatus, setManagementStatus] = useState<CaseManagementStatus>(
    initialCase?.management_status ?? 'atual'
  );
  const [platforms, setPlatforms] = useState<string[]>(initialCase?.platforms ?? []);
  const [tagsInput, setTagsInput] = useState(
    initialCase?.type === 'site' ? initialCase.platforms.join(', ') : ''
  );
  const [period, setPeriod] = useState(initialCase?.period ?? '');
  const [externalUrl, setExternalUrl] = useState(initialCase?.external_url ?? '');
  const [displayUrl, setDisplayUrl] = useState(initialCase?.display_url ?? '');
  const [coverImage, setCoverImage] = useState(initialCase?.cover_image ?? '');
  const [summary, setSummary] = useState(initialCase?.summary ?? '');
  const [challenge, setChallenge] = useState(initialCase?.challenge ?? '');
  const [strategy, setStrategy] = useState(initialCase?.strategy ?? '');
  const [results, setResults] = useState(initialCase?.results ?? '');
  const [displayOrder, setDisplayOrder] = useState<number>(initialCase?.display_order ?? 0);
  const [mediaItems, setMediaItems] = useState<CaseMediaItem[]>(initialCase?.media_items ?? []);

  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingPrints, setUploadingPrints] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleNameChange = (value: string) => {
    setClientName(value);
    if (!slugLocked) {
      setSlug(slugify(value));
    }
  };

  const uploadFileToSupabase = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'cases');

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
      const url = await uploadFileToSupabase(file);
      setCoverImage(url);
      setFeedback({ type: 'success', message: 'Imagem principal enviada para o Supabase!' });
    } catch (err: any) {
      setFeedback({ type: 'error', message: err?.message || 'Erro no upload.' });
    } finally {
      setUploadingCover(false);
      e.target.value = '';
    }
  };

  const handleMultiplePrintsUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setUploadingPrints(true);
    setFeedback(null);
    try {
      const uploadedItems: CaseMediaItem[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = await uploadFileToSupabase(file);
        const defaultTitle = file.name
          .replace(/\.[^.]+$/, '')
          .replace(/[-_]+/g, ' ')
          .replace(/\b\w/g, (l) => l.toUpperCase());

        uploadedItems.push({
          id: `print-${Date.now()}-${i}`,
          image_url: url,
          title: defaultTitle || `Print de Métrica #${mediaItems.length + i + 1}`,
          tag: 'Antes & Depois',
          period: '',
          analysis: '',
        });
      }

      setMediaItems((prev) => [...prev, ...uploadedItems]);
      // Se ainda não tiver capa, usa o primeiro print como sugestão opcional? Deixamos livre para não sobrescrever sem querer
      setFeedback({
        type: 'success',
        message: `${uploadedItems.length} print(s) enviado(s) com sucesso! Preencha a análise de cada um abaixo.`,
      });
    } catch (err: any) {
      setFeedback({ type: 'error', message: err?.message || 'Erro ao enviar prints.' });
    } finally {
      setUploadingPrints(false);
      e.target.value = '';
    }
  };

  const updateMediaItem = (id: string, patch: Partial<CaseMediaItem>) => {
    setMediaItems((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  };

  const removeMediaItem = (id: string) => {
    setMediaItems((prev) => prev.filter((m) => m.id !== id));
  };

  const moveMediaItem = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= mediaItems.length) return;
    setMediaItems((prev) => {
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const togglePlatform = (platform: string) => {
    setPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  const handleSave = async (targetStatus: CasePublishStatus) => {
    setSaving(true);
    setFeedback(null);

    const finalPlatforms =
      type === 'site'
        ? tagsInput
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        : platforms;

    const res = await salvarCaseAction({
      id: initialCase?.id,
      type,
      slug: slug || slugify(clientName),
      client_name: clientName,
      subtitle,
      niche,
      management_status: managementStatus,
      platforms: finalPlatforms,
      period,
      external_url: externalUrl,
      display_url: displayUrl,
      cover_image: coverImage,
      summary,
      challenge,
      strategy,
      results,
      media_items: mediaItems,
      display_order: displayOrder,
      status: targetStatus,
    });

    setSaving(false);

    if (!res.success) {
      setFeedback({ type: 'error', message: res.error || 'Erro ao salvar case.' });
      return;
    }

    setFeedback({
      type: 'success',
      message:
        targetStatus === 'published'
          ? 'Case publicado com sucesso no site!'
          : 'Rascunho salvo com sucesso!',
    });

    router.refresh();
    if (!initialCase?.id && res.id) {
      router.push(`/admin/projetos/editar/${res.id}`);
    }
  };

  const routePreviewPrefix =
    type === 'site'
      ? '/projetos/sites'
      : type === 'social'
      ? `/projetos/redes-sociais/${slug || 'slug-do-cliente'}`
      : `/projetos/perfil-google/${slug || 'slug-do-cliente'}`;

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projetos"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
            aria-label="Voltar para Projetos"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-medium text-white tracking-tight">
              {initialCase ? 'Editar Projeto / Case' : 'Novo Projeto / Case'}
            </h1>
            <p className="text-xs text-slate-400 font-mono">{routePreviewPrefix}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave('draft')}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs sm:text-sm font-medium inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Salvar Rascunho
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave('published')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white text-xs sm:text-sm font-medium inline-flex items-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer disabled:opacity-50"
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

      {/* Type Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          {
            id: 'site' as CaseType,
            label: 'Site / Landing Page',
            desc: 'Card com preview de navegador + link direto para o site',
            icon: Globe,
            activeClass: 'bg-blue-500/15 border-blue-500/40 text-blue-300',
          },
          {
            id: 'social' as CaseType,
            label: 'Gestão de Redes Sociais',
            desc: 'Página do cliente com feed de prints e análises Antes/Depois',
            icon: Share2,
            activeClass: 'bg-purple-500/15 border-purple-500/40 text-purple-300',
          },
          {
            id: 'google' as CaseType,
            label: 'Perfil da Empresa no Google',
            desc: 'Página do cliente com prints do Google/Maps e análises',
            icon: MapPin,
            activeClass: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300',
          },
        ].map((opt) => {
          const Icon = opt.icon;
          const isSelected = type === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setType(opt.id)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? opt.activeClass
                  : 'bg-[#111923]/50 border-white/5 text-slate-400 hover:border-white/15 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 font-medium text-sm">
                <Icon size={16} />
                <span>{opt.label}</span>
              </div>
              <p className="text-[11px] opacity-75 font-light mt-1">{opt.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Main Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#111923]/60 border border-white/5 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5">
                {type === 'site' ? 'Nome do Projeto / Site *' : 'Nome do Cliente / Empresa *'}
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder={
                  type === 'site'
                    ? 'Ex: Plataforma Dr. Fulano'
                    : 'Ex: Clínica Saúde Integrada'
                }
                className="w-full bg-[#0B0F19]/80 border border-white/10 focus:border-blue-500/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5">
                Slug (identificador na URL) *
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlugLocked(true);
                  setSlug(slugify(e.target.value));
                }}
                placeholder="nome-do-cliente"
                className="w-full bg-[#0B0F19]/80 border border-white/10 focus:border-blue-500/50 rounded-xl px-4 py-2.5 text-xs font-mono text-blue-300 placeholder-slate-600 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5">
                {type === 'site'
                  ? 'Label Superior'
                  : type === 'social'
                  ? '@Arroba do Perfil'
                  : 'Cidade / Região'}
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder={
                  type === 'site'
                    ? 'HIGH-PERFORMANCE WEB'
                    : type === 'social'
                    ? '@nomedocliente'
                    : 'Rio de Janeiro, RJ'
                }
                className="w-full bg-[#0B0F19]/80 border border-white/10 focus:border-blue-500/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5">
                Nicho / Segmento
              </label>
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="Ex: Saúde, Estética, Advocacia"
                className="w-full bg-[#0B0F19]/80 border border-white/10 focus:border-blue-500/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5">
                Ordem de Exibição
              </label>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(Number(e.target.value))}
                className="w-full bg-[#0B0F19]/80 border border-white/10 focus:border-blue-500/50 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
              />
            </div>
          </div>

          {/* URL & Period */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5">
                {type === 'site'
                  ? 'Link Real do Site (https://...)'
                  : type === 'social'
                  ? 'Link do Perfil (Instagram/TikTok - opcional)'
                  : 'Link do Perfil no Google Maps (opcional)'}
              </label>
              <input
                type="url"
                value={externalUrl}
                onChange={(e) => setExternalUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-[#0B0F19]/80 border border-white/10 focus:border-blue-500/50 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-200 placeholder-slate-600 outline-none"
              />
            </div>

            {type === 'site' ? (
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5">
                  URL Curta (barra do navegador)
                </label>
                <input
                  type="text"
                  value={displayUrl}
                  onChange={(e) => setDisplayUrl(e.target.value)}
                  placeholder="cliente.com.br"
                  className="w-full bg-[#0B0F19]/80 border border-white/10 focus:border-blue-500/50 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-200 placeholder-slate-600 outline-none"
                />
              </div>
            ) : (
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5">
                  Período de Gestão / Trabalho
                </label>
                <input
                  type="text"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  placeholder="Ex: 6 meses de gestão • Em andamento"
                  className="w-full bg-[#0B0F19]/80 border border-white/10 focus:border-blue-500/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none"
                />
              </div>
            )}
          </div>

          {/* Site tags OR Social status + platforms */}
          {type === 'site' && (
            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5">
                Tags (separadas por vírgula)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Next.js, SEO, Landing Page, Tailwind"
                className="w-full bg-[#0B0F19]/80 border border-white/10 focus:border-blue-500/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none"
              />
            </div>
          )}

          {type === 'social' && (
            <div className="space-y-4 pt-1">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[11px] font-mono uppercase text-slate-400">Status do Cliente:</span>
                {[
                  { id: 'atual' as CaseManagementStatus, label: '● Gestão Atual' },
                  { id: 'anterior' as CaseManagementStatus, label: 'Case Anterior' },
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setManagementStatus(st.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs border cursor-pointer transition-colors ${
                      managementStatus === st.id
                        ? 'bg-emerald-500/15 border-emerald-500/35 text-emerald-300'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              <div>
                <span className="block text-[11px] font-mono uppercase text-slate-400 mb-2">
                  Redes Atendidas
                </span>
                <div className="flex flex-wrap gap-2">
                  {SOCIAL_PLATFORM_PRESETS.map((plat) => {
                    const active = platforms.includes(plat);
                    return (
                      <button
                        key={plat}
                        type="button"
                        onClick={() => togglePlatform(plat)}
                        className={`px-3 py-1.5 rounded-lg text-xs border cursor-pointer transition-colors ${
                          active
                            ? 'bg-purple-500/20 border-purple-500/40 text-purple-200'
                            : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
                        }`}
                      >
                        {plat}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5">
              Resumo do Projeto (exibido no card da listagem) *
            </label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Resumo claro do trabalho realizado e do principal impacto para o cliente..."
              className="w-full bg-[#0B0F19]/80 border border-white/10 focus:border-blue-500/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none resize-none"
            />
          </div>
        </div>

        {/* Cover Image Upload */}
        <div className="bg-[#111923]/60 border border-white/5 rounded-2xl p-5 sm:p-6 space-y-4">
          <label className="block text-[11px] font-mono uppercase text-slate-400">
            {type === 'site'
              ? 'Screenshot do Site (Upload Supabase)'
              : 'Capa / Foto do Card do Cliente'}
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
                alt="Capa"
                className="w-full h-48 object-cover object-top"
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
              className="w-full h-44 rounded-xl border border-dashed border-white/15 hover:border-blue-500/40 bg-[#0B0F19]/60 flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer px-4 text-center"
            >
              {uploadingCover ? (
                <>
                  <Loader2 size={22} className="animate-spin text-blue-400" />
                  <span className="text-xs font-mono">Enviando...</span>
                </>
              ) : (
                <>
                  <Upload size={22} className="text-blue-400" />
                  <span className="text-xs">Clique para subir a imagem de capa</span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    JPG, PNG, WebP ou AVIF (até 10 MB)
                  </span>
                </>
              )}
            </button>
          )}

          <input
            type="text"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="Ou cole a URL da imagem..."
            className="w-full bg-[#0B0F19]/80 border border-white/10 focus:border-blue-500/40 rounded-lg px-3 py-2 text-[11px] font-mono text-slate-300 placeholder-slate-600 outline-none"
          />
        </div>
      </div>

      {/* Narrative + Prints Feed (For Social & Google cases) */}
      {type !== 'site' && (
        <>
          {/* Context / Strategy / Results */}
          <div className="bg-[#111923]/60 border border-white/5 rounded-2xl p-5 sm:p-6 space-y-4">
            <div>
              <h2 className="text-base font-medium text-white">Visão Geral da Estratégia do Cliente</h2>
              <p className="text-xs text-slate-400 font-light mt-0.5">
                Estes blocos aparecem no topo da página exclusiva do cliente antes do feed de prints.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5">
                  Cenário Inicial (Desafio)
                </label>
                <textarea
                  rows={4}
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                  placeholder="Como estava o perfil/presença do cliente antes da MAGE?"
                  className="w-full bg-[#0B0F19]/80 border border-white/10 focus:border-blue-500/50 rounded-xl p-3.5 text-xs sm:text-sm text-white placeholder-slate-600 outline-none resize-y"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-purple-300 mb-1.5">
                  Estratégia Aplicada
                </label>
                <textarea
                  rows={4}
                  value={strategy}
                  onChange={(e) => setStrategy(e.target.value)}
                  placeholder="O que a MAGE planejou e executou na prática?"
                  className="w-full bg-[#0B0F19]/80 border border-white/10 focus:border-purple-500/50 rounded-xl p-3.5 text-xs sm:text-sm text-white placeholder-slate-600 outline-none resize-y"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-emerald-300 mb-1.5">
                  Resultado Geral
                </label>
                <textarea
                  rows={4}
                  value={results}
                  onChange={(e) => setResults(e.target.value)}
                  placeholder="Qual foi o impacto prático gerado para o cliente?"
                  className="w-full bg-[#0B0F19]/80 border border-white/10 focus:border-emerald-500/50 rounded-xl p-3.5 text-xs sm:text-sm text-white placeholder-slate-600 outline-none resize-y"
                />
              </div>
            </div>
          </div>

          {/* Prints & Before/After Feed Builder */}
          <div className="bg-[#111923]/60 border border-white/5 rounded-2xl p-5 sm:p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
              <div>
                <h2 className="text-base sm:text-lg font-medium text-white">
                  Feed de Prints de Métricas & Análise Antes e Depois
                </h2>
                <p className="text-xs text-slate-400 font-light mt-1">
                  Suba os prints direto do Instagram, TikTok, Facebook ou Google Insights e escreva a análise de antes/depois em cada imagem.
                </p>
              </div>

              <input
                ref={printsInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
                onChange={handleMultiplePrintsUpload}
                className="hidden"
              />

              <button
                type="button"
                disabled={uploadingPrints}
                onClick={() => printsInputRef.current?.click()}
                className="px-4 py-2.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/35 text-purple-200 text-xs sm:text-sm font-medium inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
              >
                {uploadingPrints ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Enviando prints...
                  </>
                ) : (
                  <>
                    <ImagePlus size={15} />
                    Adicionar Prints (Upload)
                  </>
                )}
              </button>
            </div>

            {mediaItems.length === 0 ? (
              <div className="p-10 rounded-xl border border-dashed border-white/10 text-center space-y-2">
                <p className="text-sm text-slate-300">Nenhum print adicionado ainda.</p>
                <p className="text-xs text-slate-500">
                  Clique em <strong>&ldquo;Adicionar Prints (Upload)&rdquo;</strong> acima — você pode selecionar vários prints de uma vez.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {mediaItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-4 sm:p-5 rounded-2xl bg-[#0B0F19]/80 border border-white/10"
                  >
                    {/* Print Image Preview */}
                    <div className="lg:col-span-5 space-y-2">
                      <div className="rounded-xl overflow-hidden border border-white/10 bg-[#05080d] flex items-center justify-center min-h-[200px]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full max-h-[340px] object-contain"
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                        <span>Print #{idx + 1}</span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => moveMediaItem(idx, -1)}
                            disabled={idx === 0}
                            title="Subir"
                            className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowUp size={12} />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveMediaItem(idx, 1)}
                            disabled={idx === mediaItems.length - 1}
                            title="Descer"
                            className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowDown size={12} />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeMediaItem(item.id)}
                            title="Remover print"
                            className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 cursor-pointer"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Print Analysis Fields */}
                    <div className="lg:col-span-7 space-y-3.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                            Título deste Print / Métrica
                          </label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => updateMediaItem(item.id, { title: e.target.value })}
                            placeholder="Ex: Crescimento de Alcance em 90 dias"
                            className="w-full bg-[#111923] border border-white/10 focus:border-blue-500/40 rounded-lg px-3 py-2 text-xs sm:text-sm text-white outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                              Etiqueta
                            </label>
                            <select
                              value={item.tag}
                              onChange={(e) => updateMediaItem(item.id, { tag: e.target.value })}
                              className="w-full bg-[#111923] border border-white/10 rounded-lg px-2.5 py-2 text-xs text-white outline-none"
                            >
                              {MEDIA_TAG_OPTIONS.map((tag) => (
                                <option key={tag} value={tag}>
                                  {tag}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                              Período
                            </label>
                            <input
                              type="text"
                              value={item.period || ''}
                              onChange={(e) => updateMediaItem(item.id, { period: e.target.value })}
                              placeholder="Jan vs. Abr"
                              className="w-full bg-[#111923] border border-white/10 focus:border-blue-500/40 rounded-lg px-2.5 py-2 text-xs text-white outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                          Análise do Antes e Depois (explicação para o visitante)
                        </label>
                        <textarea
                          rows={5}
                          value={item.analysis}
                          onChange={(e) => updateMediaItem(item.id, { analysis: e.target.value })}
                          placeholder="Explique o que este print mostra: como era antes, o que foi ajustado na estratégia e qual resultado foi alcançado..."
                          className="w-full bg-[#111923] border border-white/10 focus:border-blue-500/40 rounded-xl p-3 text-xs sm:text-sm text-slate-200 placeholder-slate-600 outline-none resize-y leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

