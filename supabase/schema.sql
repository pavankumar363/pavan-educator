-- Pavan Educator: production-ready student/presence database
-- Run this complete script in Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  name text not null,
  username text unique not null,
  class text not null,
  age integer,
  location text,
  login_count integer not null default 0,
  last_login_at timestamptz,
  last_seen_at timestamptz,
  is_online boolean not null default false,
  created_at timestamptz not null default now()
);

-- Safe upgrade for an already-created table.
alter table public.students add column if not exists auth_user_id uuid unique;
alter table public.students add column if not exists login_count integer not null default 0;
alter table public.students add column if not exists last_login_at timestamptz;
alter table public.students add column if not exists last_seen_at timestamptz;
alter table public.students add column if not exists is_online boolean not null default false;

create index if not exists students_username_idx on public.students(username);
create index if not exists students_auth_user_idx on public.students(auth_user_id);
create index if not exists students_online_idx on public.students(is_online, last_seen_at);

alter table public.students enable row level security;

drop policy if exists "authenticated can read students" on public.students;
create policy "authenticated can read students"
on public.students for select
to authenticated using (true);

drop policy if exists "authenticated can update student presence" on public.students;
create policy "authenticated can update student presence"
on public.students for update
to authenticated using (true) with check (true);

-- Maximum of 25 student records.
create or replace function public.enforce_student_limit()
returns trigger
language plpgsql
as $$
begin
  if (select count(*) from public.students) >= 25 then
    raise exception 'Maximum of 25 student accounts reached';
  end if;
  return new;
end;
$$;

drop trigger if exists student_limit_trigger on public.students;
create trigger student_limit_trigger
before insert on public.students
for each row execute function public.enforce_student_limit();

-- Refresh stale presence records.
create or replace function public.refresh_student_presence()
returns void
language sql
as $$
  update public.students
  set is_online = false
  where is_online = true
    and (last_seen_at is null or last_seen_at <= now() - interval '2 minutes');
$$;

-- Atomic login counter/presence update for a student.
create or replace function public.record_student_login(p_auth_user_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.students
  set login_count = login_count + 1,
      last_login_at = now(),
      last_seen_at = now(),
      is_online = true
  where auth_user_id = p_auth_user_id;
$$;

create or replace function public.record_student_heartbeat(p_auth_user_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.students
  set last_seen_at = now(), is_online = true
  where auth_user_id = p_auth_user_id;
$$;

create or replace function public.record_student_logout(p_auth_user_id uuid)
returns void
security definer
set search_path = public
language sql
as $$
  update public.students
  set is_online = false, last_seen_at = now()
  where auth_user_id = p_auth_user_id;
$$;
