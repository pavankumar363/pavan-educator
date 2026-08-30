-- Pavan Educator: student/presence database
-- Run this in Supabase SQL Editor before using the student admin tools.

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
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

create index if not exists students_username_idx on public.students(username);
create index if not exists students_online_idx on public.students(is_online, last_seen_at);

alter table public.students enable row level security;

-- Admin reads are intentionally handled through an authenticated admin policy.
-- Keep student password handling inside Supabase Auth / Edge Functions; never store passwords here.
create policy if not exists "authenticated can read students"
on public.students for select
to authenticated using (true);

create policy if not exists "authenticated can update student presence"
on public.students for update
to authenticated using (true) with check (true);

-- Enforce the requested maximum of 25 student records.
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

-- Presence is considered online when a heartbeat was received in the last 2 minutes.
create or replace function public.refresh_student_presence()
returns void
language sql
as $$
  update public.students
  set is_online = (last_seen_at is not null and last_seen_at > now() - interval '2 minutes')
  where is_online <> (last_seen_at is not null and last_seen_at > now() - interval '2 minutes');
$$;
