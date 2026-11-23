'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { verificarSeEhAdmin } from '@/lib/admin-auth';
import {
  getAdminSupabase,
  slugify,
  estimateReadingTime,
  type PostStatus,
} from '@/src/lib/posts';

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

export interface SavePostPayload {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  summary_box?: string;
  content: string;
  category: string;
  tags: string[];
  cover_image?: string;
  author_name: string;
  featured: boolean;
  status: PostStatus;
}

export async function salvarPostAction(payload: SavePostPayload) {
  try {
    const supabase = await requireAdmin();

    const title = payload.title.trim();
    const cleanSlug = slugify(payload.slug || title);
    const excerpt = payload.excerpt.trim();
    const content = payload.content.trim();

    if (!title || !cleanSlug || !excerpt || !content) {
      return {
        success: false,
        error: 'Preencha título, slug, resumo e conteúdo antes de salvar.',
      };
    }

    const readingTime = estimateReadingTime(content);
    const nowIso = new Date().toISOString();

    const record = {
      title,
      slug: cleanSlug,
      excerpt,
      summary_box: payload.summary_box?.trim() || null,
      content,
      category: payload.category || 'Estratégia & Negócios',
      tags: payload.tags.map((t) => t.trim()).filter(Boolean),
      cover_image: payload.cover_image?.trim() || null,
      author_name: payload.author_name || 'Equipe MAGE',
      reading_time: readingTime,
      featured: Boolean(payload.featured),
      status: payload.status,
      ...(payload.status === 'published' ? { published_at: nowIso } : {}),
    };

    if (payload.id) {
      const { data: existing } = await supabase
        .from('posts')
        .select('published_at, slug')
        .eq('id', payload.id)
        .maybeSingle();

      const updateRecord = {
        ...record,
        published_at:
          payload.status === 'published'
            ? existing?.published_at || nowIso
            : existing?.published_at || null,
      };

      const { data, error } = await supabase
        .from('posts')
        .update(updateRecord)
        .eq('id', payload.id)
        .select('id, slug')
        .single();

      if (error) {
        if (error.code === '23505') {
          return { success: false, error: 'Já existe um conteúdo com esse slug. Altere o slug.' };
        }
        return { success: false, error: error.message };
      }

      revalidatePath('/conteudos');
      revalidatePath(`/conteudos/${data.slug}`);
      if (existing?.slug && existing.slug !== data.slug) {
        revalidatePath(`/conteudos/${existing.slug}`);
      }
      revalidatePath('/sitemap.xml');
      revalidatePath('/admin');

      return { success: true, id: data.id, slug: data.slug };
    } else {
      const { data, error } = await supabase
        .from('posts')
        .insert(record)
        .select('id, slug')
        .single();

      if (error) {
        if (error.code === '23505') {
          return { success: false, error: 'Já existe um conteúdo com esse slug. Altere o slug.' };
        }
        return { success: false, error: error.message };
      }

      revalidatePath('/conteudos');
      revalidatePath(`/conteudos/${data.slug}`);
      revalidatePath('/sitemap.xml');
      revalidatePath('/admin');

      return { success: true, id: data.id, slug: data.slug };
    }
  } catch (err: any) {
    return { success: false, error: err?.message || 'Erro ao salvar conteúdo.' };
  }
}

export async function alternarStatusPostAction(id: string, currentStatus: PostStatus) {
  try {
    const supabase = await requireAdmin();
    const nextStatus: PostStatus = currentStatus === 'published' ? 'draft' : 'published';

    const { data, error } = await supabase
      .from('posts')
      .update({
        status: nextStatus,
        ...(nextStatus === 'published' ? { published_at: new Date().toISOString() } : {}),
      })
      .eq('id', id)
      .select('slug')
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath('/conteudos');
    if (data?.slug) revalidatePath(`/conteudos/${data.slug}`);
    revalidatePath('/sitemap.xml');
    revalidatePath('/admin');

    return { success: true, status: nextStatus };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Erro ao alterar status.' };
  }
}

export async function excluirPostAction(id: string) {
  try {
    const supabase = await requireAdmin();

    const { data, error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)
      .select('slug')
      .maybeSingle();

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath('/conteudos');
    if (data?.slug) revalidatePath(`/conteudos/${data.slug}`);
    revalidatePath('/sitemap.xml');
    revalidatePath('/admin');

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Erro ao excluir conteúdo.' };
  }
}

export async function sairAdminAction() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect('/login');
}

