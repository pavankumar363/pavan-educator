-- Pavan Educator: student presence/activity support
create table if not exists public.student_presence (
  user_id uuid primary key references auth.users(id) on delete cascade,
  last_seen timestamptz not null default now(),
  logged_in_at timestamptz not null default now(),
  is_online boolean not null default true
);

alter table public.student_presence enable row level security;

drop policy if exists "students manage own presence" on public.student_presence;
create policy "students manage own presence" on public.student_presence
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "admins read presence" on public.student_presence;
create policy "admins read presence" on public.student_presence
for select using (auth.jwt() ->> 'role' = 'service_role');

create or replace function public.touch_student_presence()
returns void language plpgsql security definer set search_path = public
as $$
begin
  insert into public.student_presence(user_id,last_seen,logged_in_at,is_online)
  values(auth.uid(),now(),now(),true)
  on conflict(user_id) do update set last_seen=now(),is_online=true;
end;
$$;
