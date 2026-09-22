-- Bujhi MVP database schema for Supabase
-- Run this once in the Supabase SQL editor for the Bujhi project.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  role text not null default 'student' check (role in ('student','teacher')),
  class_level text,
  subject text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

grant select, update on table public.profiles to authenticated;

create policy "Users can read their own profile"
on public.profiles for select
using (auth.uid() = id);

create policy "Users can update their own profile"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role, class_level, subject)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'role', 'student'),
    new.raw_user_meta_data ->> 'class_level',
    new.raw_user_meta_data ->> 'subject'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create table if not exists public.learning_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  subject text,
  chapter text,
  learning_style text,
  updated_at timestamptz not null default now()
);

alter table public.learning_preferences enable row level security;

grant select, insert, update on table public.learning_preferences to authenticated;

create policy "Students can read their own learning preference"
on public.learning_preferences for select
using (auth.uid() = user_id);

create policy "Students can create their own learning preference"
on public.learning_preferences for insert
with check (auth.uid() = user_id);

create policy "Students can update their own learning preference"
on public.learning_preferences for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
