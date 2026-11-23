'use server';

import { revalidatePath } from 'next/cache';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { verificarSeEhAdmin } from '@/lib/admin-auth';
import { getAdminSupabase, slugify } from '@/src/lib/posts';
import type {
  CaseType,
  CaseManagementStatus,
  CasePublishStatus,
  CaseMediaItem,
} from '@/src/lib/cases';

async function requireAdmin() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !verificarSeEhAdmin(user.email)) {
    throw new Error('Acesso não autorizado.');
  }

  const adminSupabase = getAdminSupabase();
  if (!adminSupabase) {
    throw new Error('Credenciais de servidor do Supabase não configuradas.');
  }

  return adminSupabase;
}

function revalidateAllProjectRoutes(type?: CaseType, slug?: string, oldSlug?: string) {
  revalidatePath('/projetos');
  revalidatePath('/projetos/sites');
  revalidatePath('/projetos/redes-sociais');
  revalidatePath('/projetos/perfil-google');
  revalidatePath('/sitemap.xml');
  revalidatePath('/admin/projetos');

  if (type === 'social') {
    if (slug) revalidatePath(`/projetos/redes-sociais/${slug}`);
    if (oldSlug && oldSlug !== slug) revalidatePath(`/projetos/redes-sociais/${oldSlug}`);
  } else if (type === 'google') {
    if (slug) revalidatePath(`/projetos/perfil-google/${slug}`);
    if (oldSlug && oldSlug !== slug) revalidatePath(`/projetos/perfil-google/${oldSlug}`);
  }
}

export interface SaveCasePayload {
  id?: string;
  type: CaseType;
  slug: string;
  client_name: string;
  subtitle?: string;
  niche?: string;
  management_status: CaseManagementStatus;
  platforms: string[];
  period?: string;
  external_url?: string;
  display_url?: string;
  cover_image?: string;
  summary: string;
  challenge?: string;
  strategy?: string;
  results?: string;
  media_items: CaseMediaItem[];
  display_order: number;
  status: CasePublishStatus;
}

export async function salvarCaseAction(payload: SaveCasePayload) {
  try {
    const supabase = await requireAdmin();

    const clientName = payload.client_name.trim();
    const cleanSlug = slugify(payload.slug || clientName);
    const summary = payload.summary.trim();

    if (!clientName || !cleanSlug || !summary) {
      return {
        success: false,
        error: 'Preencha o nome do cliente/projeto, slug e resumo antes de salvar.',
      };
    }

    const sanitizedMedia: CaseMediaItem[] = (payload.media_items || [])
      .filter((item) => item.image_url?.trim())
      .map((item, idx) => ({
        id: item.id || `media-${Date.now()}-${idx}`,
        image_url: item.image_url.trim(),
        title: item.title?.trim() || `Métrica #${idx + 1}`,
        tag: item.tag?.trim() || 'Antes & Depois',
        period: item.period?.trim() || '',
        analysis: item.analysis?.trim() || '',
      }));

    const record = {
      type: payload.type,
      slug: cleanSlug,
      client_name: clientName,
      subtitle: payload.subtitle?.trim() || null,
      niche: payload.niche?.trim() || null,
      management_status: payload.management_status || 'atual',
      platforms: (payload.platforms || []).map((p) => p.trim()).filter(Boolean),
      period: payload.period?.trim() || null,
      external_url: payload.external_url?.trim() || null,
      display_url: payload.display_url?.trim() || null,
      cover_image: payload.cover_image?.trim() || null,
      summary,
      challenge: payload.challenge?.trim() || null,
      strategy: payload.strategy?.trim() || null,
      results: payload.results?.trim() || null,
      media_items: sanitizedMedia,
      display_order: Number.isFinite(Number(payload.display_order))
        ? Number(payload.display_order)
        : 0,
      status: payload.status,
    };

    if (payload.id) {
      const { data: existing } = await supabase
        .from('cases')
        .select('slug, type')
        .eq('id', payload.id)
        .maybeSingle();

      const { data, error } = await supabase
        .from('cases')
        .update(record)
        .eq('id', payload.id)
        .select('id, slug, type')
        .single();

      if (error) {
        if (error.code === '23505') {
          return { success: false, error: 'Já existe um case com esse slug. Altere o slug.' };
        }
        return { success: false, error: error.message };
      }

      revalidateAllProjectRoutes(data.type as CaseType, data.slug, existing?.slug);
      return { success: true, id: data.id, slug: data.slug };
    } else {
      const { data, error } = await supabase
        .from('cases')
        .insert(record)
        .select('id, slug, type')
        .single();

      if (error) {
        if (error.code === '23505') {
          return { success: false, error: 'Já existe um case com esse slug. Altere o slug.' };
        }
        return { success: false, error: error.message };
      }

      revalidateAllProjectRoutes(data.type as CaseType, data.slug);
      return { success: true, id: data.id, slug: data.slug };
    }
  } catch (err: any) {
    return { success: false, error: err?.message || 'Erro ao salvar case.' };
  }
}

export async function alternarStatusCaseAction(id: string, currentStatus: CasePublishStatus) {
  try {
    const supabase = await requireAdmin();
    const nextStatus: CasePublishStatus = currentStatus === 'published' ? 'draft' : 'published';

    const { data, error } = await supabase
      .from('cases')
      .update({ status: nextStatus })
      .eq('id', id)
      .select('slug, type')
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    revalidateAllProjectRoutes(data.type as CaseType, data.slug);
    return { success: true, status: nextStatus };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Erro ao alterar status.' };
  }
}

export async function excluirCaseAction(id: string) {
  try {
    const supabase = await requireAdmin();

    const { data, error } = await supabase
      .from('cases')
      .delete()
      .eq('id', id)
      .select('slug, type')
      .maybeSingle();

    if (error) {
      return { success: false, error: error.message };
    }

    revalidateAllProjectRoutes(data?.type as CaseType | undefined, data?.slug);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Erro ao excluir case.' };
  }
}

