-- ============================================================================
-- MAGE Comunicação — Evolução MAGE Studio: Gestão de Cases (Sites, Redes Sociais e Google)
-- Execute este script no SQL Editor do seu projeto Supabase.
-- ============================================================================

-- 1. Tabela unificada de cases (Sites, Redes Sociais e Perfil da Empresa no Google)
create table if not exists public.cases (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('site', 'social', 'google')),
  slug text not null unique,
  client_name text not null,
  subtitle text,
  niche text,
  management_status text not null default 'atual' check (management_status in ('atual', 'anterior')),
  platforms text[] not null default '{}',
  period text,
  external_url text,
  display_url text,
  cover_image text,
  summary text not null,
  challenge text,
  strategy text,
  results text,
  media_items jsonb not null default '[]'::jsonb,
  display_order integer not null default 0,
  status text not null default 'published' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_cases_type_status_order
  on public.cases (type, status, display_order asc, created_at desc);

create index if not exists idx_cases_slug
  on public.cases (slug);

create or replace function public.handle_cases_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_cases_updated_at on public.cases;
create trigger trg_cases_updated_at
  before update on public.cases
  for each row
  execute function public.handle_cases_updated_at();

-- 2. Segurança RLS (leitura pública apenas para cases publicados; escrita via Service Role no /admin)
alter table public.cases enable row level security;

drop policy if exists "Public can read published cases" on public.cases;
create policy "Public can read published cases"
  on public.cases
  for select
  using (status = 'published');

-- 3. Garante bucket público blog-covers com limite de 10 MB (para capas, screenshots e prints)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'blog-covers',
  'blog-covers',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']
)
on conflict (id) do update
set public = true, file_size_limit = 10485760;

-- 4. Seed inicial dos 5 sites já existentes no portfólio (não duplica se rodar de novo)
insert into public.cases (
  type, slug, client_name, subtitle, niche, platforms, external_url, display_url, cover_image, summary, display_order, status
) values
(
  'site',
  'plataforma-imobiliaria-fabricio-magiolli',
  'Plataforma Imobiliária Fabrício Magiolli',
  'HIGH-PERFORMANCE WEB DEVELOPMENT',
  'Mercado Imobiliário',
  array['Next.js', 'SEO', 'Real Estate', 'Tailwind'],
  'https://www.fabriciomagioli.com.br/',
  'fabriciomagioli.com.br',
  '/images/site-fabriciomagioli.webp',
  'Plataforma de alto padrão com busca inteligente de propriedades de luxo, mapas interativos e otimização SEO de extrema performance.',
  1,
  'published'
),
(
  'site',
  'posicionamento-plataforma-dra-ingrid',
  'Posicionamento & Plataforma Dra. Ingrid',
  'BRAND STRATEGY & IDENTITY',
  'Saúde & Nutrição',
  array['Strategy', 'Content', 'Identity', 'React'],
  'https://www.ingrydcarolnutri.com.br/',
  'ingrydcarolnutri.com.br',
  '/images/site-ingrydcarolnutri.webp',
  'Desenvolvimento de identidade de marca premium, estratégia de conteúdo integrado e portal de agendamentos exclusivo de alta conversão.',
  2,
  'published'
),
(
  'site',
  'projeto-reputacao-digital',
  'Projeto Reputação Digital',
  'PERSONAL BRANDING & INFLUENCE',
  'Mentoria & Personal Branding',
  array['Branding', 'Copywriting', 'Conversion', 'React'],
  'https://reputacaodigital-laizeandreatta.vercel.app/',
  'reputacaodigital-laizeandreatta.vercel.app',
  '/images/screencapture-reputacaodigital-laizeandreatta-vercel-app-2026-07-05-00_31_55.webp',
  'Landing page de altíssima conversão focada na venda de mentorias e construção de autoridade digital por meio de posicionamento de alto valor.',
  3,
  'published'
),
(
  'site',
  'posicionamento-plataforma-patricia-gavazza',
  'Posicionamento & Plataforma Patrícia Gavazza',
  'CLINICAL PSYCHOLOGY & BRANDING',
  'Psicologia Clínica',
  array['Psychology', 'Strategy', 'Branding', 'React'],
  'https://www.patriciagavazzapsicologa.com.br/',
  'patriciagavazza.com.br',
  '/images/site_patricia-gavazza.webp',
  'Desenvolvimento de landing page de alta conversão, posicionamento de autoridade para atendimento de psicologia clínica e estrutura estratégica de captação.',
  4,
  'published'
),
(
  'site',
  'dr-alexandre-savio-urologista',
  'Dr. Alexandre Sávio | Urologista',
  'HEALTHCARE & MEDICAL BRANDING',
  'Medicina & Urologia',
  array['Healthcare', 'Strategy', 'Conversion', 'React'],
  'https://alexandresaviourologista.vercel.app/',
  'alexandresaviourologista.vercel.app',
  '/images/full-page-dr-alexandre-savio-urologista.webp',
  'Plataforma médica de alto padrão e alta conversão para o Dr. Alexandre Sávio, especialista com mais de 30 anos de experiência em urologia clínica e cirúrgica.',
  5,
  'published'
)
on conflict (slug) do nothing;

