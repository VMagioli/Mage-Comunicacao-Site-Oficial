-- ============================================================================
-- MAGE Comunicação — Fase 4: Hub de Conteúdos (CMS) & Upload de Imagens
-- Execute este script uma única vez no SQL Editor do seu projeto Supabase.
-- ============================================================================

-- 1. Tabela de Conteúdos / Artigos
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  summary_box text,
  content text not null,
  category text not null default 'Estratégia',
  tags text[] not null default '{}',
  cover_image text,
  author_name text not null default 'Equipe MAGE',
  reading_time integer not null default 3,
  featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_posts_status_published_at
  on public.posts (status, published_at desc);

create index if not exists idx_posts_slug
  on public.posts (slug);

-- Trigger para atualizar updated_at automaticamente
create or replace function public.handle_posts_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_posts_updated_at on public.posts;
create trigger trg_posts_updated_at
  before update on public.posts
  for each row
  execute function public.handle_posts_updated_at();

-- 2. Segurança RLS (leitura pública apenas de posts publicados; escrita via Service Role no /admin)
alter table public.posts enable row level security;

grant usage on schema public to anon, authenticated;
grant select on public.posts to anon, authenticated;

drop policy if exists "Public can read published posts" on public.posts;
create policy "Public can read published posts"
  on public.posts
  for select
  using (status = 'published');

-- 3. Bucket público no Supabase Storage para capas e imagens dos conteúdos
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'blog-covers',
  'blog-covers',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']
)
on conflict (id) do update
set public = true;

drop policy if exists "Public read access for blog-covers" on storage.objects;
create policy "Public read access for blog-covers"
  on storage.objects
  for select
  using (bucket_id = 'blog-covers');

