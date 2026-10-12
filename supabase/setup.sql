-- Run this once in Supabase: Dashboard > SQL Editor > New query > Run.

create table if not exists public.portfolio_content (
  id int primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.portfolio_content enable row level security;

-- Everyone (visitors) can read the content.
drop policy if exists "public read" on public.portfolio_content;
create policy "public read" on public.portfolio_content
  for select using (true);

-- Only your account can insert / update. Change the email if you use another.
drop policy if exists "owner insert" on public.portfolio_content;
create policy "owner insert" on public.portfolio_content
  for insert to authenticated
  with check ((auth.jwt() ->> 'email') = 'magallanesmannix2000@gmail.com');

drop policy if exists "owner update" on public.portfolio_content;
create policy "owner update" on public.portfolio_content
  for update to authenticated
  using ((auth.jwt() ->> 'email') = 'magallanesmannix2000@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'magallanesmannix2000@gmail.com');
