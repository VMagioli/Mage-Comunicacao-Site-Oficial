import { createClient } from '@supabase/supabase-js';

export const POST_CATEGORIES = [
  'Redes Sociais',
  'Sites & Conversão',
  'Google & SEO',
  'Estratégia & Negócios',
  'Guias Práticos',
] as const;

export const POST_AUTHORS = [
  'Equipe MAGE',
  'Vitor Magioli',
  'Lana Magioli',
] as const;

export type PostStatus = 'draft' | 'published';

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  summary_box: string | null;
  content: string;
  category: string;
  tags: string[];
  cover_image: string | null;
  author_name: string;
  reading_time: number;
  featured: boolean;
  status: PostStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function getPublicSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function getAdminSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function getPublishedPosts(): Promise<Post[]> {
  try {
    const supabase = getPublicSupabase();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .order('featured', { ascending: false })
      .order('published_at', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false });

    if (error || !data) {
      return [];
    }
    return data as Post[];
  } catch {
    return [];
  }
}

export async function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  try {
    const supabase = getPublicSupabase();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle();

    if (error || !data) return null;
    return data as Post;
  } catch {
    return null;
  }
}

export async function getAllPostsAdmin(): Promise<{ posts: Post[]; tableMissing: boolean }> {
  try {
    const supabase = getAdminSupabase();
    if (!supabase) return { posts: [], tableMissing: false };

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      const msg = error.message?.toLowerCase() || '';
      const tableMissing =
        error.code === '42P01' ||
        msg.includes('could not find the table') ||
        msg.includes('does not exist');
      return { posts: [], tableMissing };
    }

    return { posts: (data as Post[]) ?? [], tableMissing: false };
  } catch {
    return { posts: [], tableMissing: false };
  }
}

export async function getPostByIdAdmin(id: string): Promise<Post | null> {
  try {
    const supabase = getAdminSupabase();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error || !data) return null;
    return data as Post;
  } catch {
    return null;
  }
}

