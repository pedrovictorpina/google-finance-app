-- Create a table for public profiles if you want additional user data
create table profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  username text,
  full_name text,
  avatar_url text,
  website text,

  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on profiles
  for update using ((select auth.uid()) = id);

-- Create a table for transactions
create table transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  amount numeric not null,
  type text check (type in ('income', 'expense')) not null,
  category text,
  description text,
  date timestamp with time zone default timezone('utc'::text, now()) not null,
  is_recurring boolean default false,
  recurrence_type text, -- 'recurring' or 'installments'
  installments_current integer,
  installments_total integer,
  origin text, -- 'Dia 15 Pedro', 'Dia 30 Pedro', 'David', etc.
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up RLS for transactions
alter table transactions enable row level security;

create policy "Users can view their own transactions." on transactions
  for select using ((select auth.uid()) = user_id);

create policy "Users can insert their own transactions." on transactions
  for insert with check ((select auth.uid()) = user_id);

create policy "Users can update their own transactions." on transactions
  for update using ((select auth.uid()) = user_id);

create policy "Users can delete their own transactions." on transactions
  for delete using ((select auth.uid()) = user_id);

-- This triggers a profile creation when a user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
