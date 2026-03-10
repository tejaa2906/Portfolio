create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  year text not null default '',
  type text not null default '',
  description text not null default '',
  stack jsonb not null default '[]'::jsonb,
  link_url text,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.travel_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  city text not null default '',
  date_label text not null default '',
  summary text not null default '',
  body text not null default '',
  gallery jsonb not null default '[]'::jsonb,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_display_order_idx
  on public.projects (display_order asc, created_at desc);

create index if not exists travel_posts_display_order_idx
  on public.travel_posts (display_order asc, created_at desc);

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
before update on public.projects
for each row
execute function public.set_updated_at();

drop trigger if exists set_travel_posts_updated_at on public.travel_posts;
create trigger set_travel_posts_updated_at
before update on public.travel_posts
for each row
execute function public.set_updated_at();

alter table public.projects enable row level security;
alter table public.travel_posts enable row level security;

drop policy if exists "Projects are viewable by everyone" on public.projects;
create policy "Projects are viewable by everyone"
on public.projects
for select
using (true);

drop policy if exists "Projects are editable by authenticated users" on public.projects;
create policy "Projects are editable by authenticated users"
on public.projects
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Travel posts are viewable by everyone" on public.travel_posts;
create policy "Travel posts are viewable by everyone"
on public.travel_posts
for select
using (true);

drop policy if exists "Travel posts are editable by authenticated users" on public.travel_posts;
create policy "Travel posts are editable by authenticated users"
on public.travel_posts
for all
to authenticated
using (true)
with check (true);

insert into storage.buckets (id, name, public)
values ('travel-images', 'travel-images', true)
on conflict (id) do update
set public = excluded.public;

drop policy if exists "Travel images are viewable by everyone" on storage.objects;
create policy "Travel images are viewable by everyone"
on storage.objects
for select
using (bucket_id = 'travel-images');

drop policy if exists "Authenticated users can upload travel images" on storage.objects;
create policy "Authenticated users can upload travel images"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'travel-images');

drop policy if exists "Authenticated users can update travel images" on storage.objects;
create policy "Authenticated users can update travel images"
on storage.objects
for update
to authenticated
using (bucket_id = 'travel-images')
with check (bucket_id = 'travel-images');

drop policy if exists "Authenticated users can delete travel images" on storage.objects;
create policy "Authenticated users can delete travel images"
on storage.objects
for delete
to authenticated
using (bucket_id = 'travel-images');
