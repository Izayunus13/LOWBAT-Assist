-- LOWBAT Assist: tabel Riwayat Bersama
-- Jalankan di Supabase SQL Editor hanya jika tabel belum dibuat.

create table if not exists public.jarkoman_history (
  id uuid primary key default gen_random_uuid(),
  template_title text not null,
  faculty text not null,
  mikat_name text,
  sport text,
  event_date date,
  event_time time,
  event_place text,
  generated_text text not null,
  created_by text,
  created_at timestamptz not null default now()
);

create index if not exists jarkoman_history_created_at_idx
on public.jarkoman_history (created_at desc);

alter table public.jarkoman_history enable row level security;

grant select, insert
on table public.jarkoman_history
to anon, authenticated;

revoke update, delete
on table public.jarkoman_history
from anon, authenticated;

drop policy if exists "Riwayat dapat dilihat bersama" on public.jarkoman_history;
create policy "Riwayat dapat dilihat bersama"
on public.jarkoman_history
for select
to anon, authenticated
using (true);

drop policy if exists "Jarkoman dapat disimpan" on public.jarkoman_history;
create policy "Jarkoman dapat disimpan"
on public.jarkoman_history
for insert
to anon, authenticated
with check (true);
