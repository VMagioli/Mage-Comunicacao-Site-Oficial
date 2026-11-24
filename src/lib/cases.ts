import { createClient } from '@supabase/supabase-js';
import { PROJECTS } from '@/src/data/projects';

export type CaseType = 'site' | 'social' | 'google';
export type CaseManagementStatus = 'atual' | 'anterior';
export type CasePublishStatus = 'draft' | 'published';

export interface CaseMediaItem {
  id: string;
  image_url: string;
  title: string;
  tag: string; // Ex: 'Antes & Depois', 'Antes', 'Depois', 'Evolução', 'Destaque'
  period?: string;
  analysis: string;
}

export interface ProjectCase {
  id: string;
  type: CaseType;
  slug: string;
  client_name: string;
  subtitle: string | null;
  niche: string | null;
  management_status: CaseManagementStatus;
  platforms: string[];
  period: string | null;
  external_url: string | null;
  display_url: string | null;
  cover_image: string | null;
  summary: string;
  challenge: string | null;
  strategy: string | null;
  results: string | null;
  media_items: CaseMediaItem[];
  display_order: number;
  status: CasePublishStatus;
  created_at: string;
  updated_at: string;
}

export const SOCIAL_PLATFORM_PRESETS = [
  'Instagram',
  'Facebook',
  'TikTok',
  'YouTube Shorts',
  'LinkedIn',
  'Threads',
] as const;

export const MEDIA_TAG_OPTIONS = [
  'Antes & Depois',
  'Antes',
  'Depois',
  'Evolução Mensal',
  'Destaque',
] as const;

function getPublicSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Usa SERVICE_ROLE no servidor (sempre filtrando status='published') para evitar bloqueio 42501 de GRANT no role anon
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function getAdminSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function normalizeCase(row: any): ProjectCase {
  return {
    ...row,
    platforms: Array.isArray(row.platforms) ? row.platforms : [],
    media_items: Array.isArray(row.media_items) ? row.media_items : [],
  } as ProjectCase;
}

function getFallbackSiteCases(): ProjectCase[] {
  const now = new Date().toISOString();
  return PROJECTS.map((p, idx) => ({
    id: `fallback-site-${p.id}`,
    type: 'site',
    slug: `site-${p.id}`,
    client_name: p.title,
    subtitle: p.label,
    niche: p.tags[0] || 'Web',
    management_status: 'atual',
    platforms: p.tags,
    period: null,
    external_url: p.realUrl,
    display_url: p.url,
    cover_image: p.image,
    summary: p.description,
    challenge: null,
    strategy: null,
    results: null,
    media_items: [],
    display_order: idx + 1,
    status: 'published',
    created_at: now,
    updated_at: now,
  }));
}

export async function getPublishedCasesByType(type: CaseType): Promise<ProjectCase[]> {
  try {
    const supabase = getPublicSupabase();
    if (!supabase) {
      return type === 'site' ? getFallbackSiteCases() : [];
    }

    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .eq('type', type)
      .eq('status', 'published')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error || !data) {
      return type === 'site' ? getFallbackSiteCases() : [];
    }

    if (type === 'site' && data.length === 0) {
      return getFallbackSiteCases();
    }

    return data.map(normalizeCase);
  } catch {
    return type === 'site' ? getFallbackSiteCases() : [];
  }
}

export async function getPublishedCaseBySlug(
  type: CaseType,
  slug: string
): Promise<ProjectCase | null> {
  try {
    const supabase = getPublicSupabase();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .eq('type', type)
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle();

    if (error || !data) return null;
    return normalizeCase(data);
  } catch {
    return null;
  }
}

export async function getAllPublishedCases(): Promise<ProjectCase[]> {
  try {
    const supabase = getPublicSupabase();
    if (!supabase) return getFallbackSiteCases();

    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .eq('status', 'published')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error || !data) return getFallbackSiteCases();
    return data.map(normalizeCase);
  } catch {
    return getFallbackSiteCases();
  }
}

export async function getPublishedCaseCounts(): Promise<{
  sites: number;
  social: number;
  socialCurrent: number;
  google: number;
}> {
  const [sites, social, google] = await Promise.all([
    getPublishedCasesByType('site'),
    getPublishedCasesByType('social'),
    getPublishedCasesByType('google'),
  ]);

  return {
    sites: sites.length,
    social: social.length,
    socialCurrent: social.filter((c) => c.management_status === 'atual').length,
    google: google.length,
  };
}

export async function getAllCasesAdmin(): Promise<{
  cases: ProjectCase[];
  tableMissing: boolean;
}> {
  try {
    const supabase = getAdminSupabase();
    if (!supabase) return { cases: [], tableMissing: false };

    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .order('type', { ascending: true })
      .order('display_order', { ascending: true })
      .order('updated_at', { ascending: false });

    if (error) {
      const msg = error.message?.toLowerCase() || '';
      const tableMissing =
        error.code === '42P01' ||
        msg.includes('could not find the table') ||
        msg.includes('does not exist');
      return { cases: [], tableMissing };
    }

    return { cases: (data ?? []).map(normalizeCase), tableMissing: false };
  } catch {
    return { cases: [], tableMissing: false };
  }
}

export async function getCaseByIdAdmin(id: string): Promise<ProjectCase | null> {
  try {
    const supabase = getAdminSupabase();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error || !data) return null;
    return normalizeCase(data);
  } catch {
    return null;
  }
}

