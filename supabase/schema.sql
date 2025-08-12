-- Supabase schema for HerAi (Phase 1)
create extension if not exists "pg_trgm";
create extension if not exists "uuid-ossp";

create table if not exists users_ext (
  id uuid primary key default uuid_generate_v4(),
  auth_uid uuid,
  email text,
  display_name text,
  country text,
  favorite_day text,
  is_age_verified boolean default false,
  consent_adult_content boolean default false,
  created_at timestamptz default now()
);

create table if not exists girlfriends (
  id uuid primary key default uuid_generate_v4(),
  name text,
  slug text,
  accent text,
  age_range text,
  personality jsonb,
  pet_info jsonb,
  voice_id text,
  face_id text,
  base_moral int default 60,
  favorite_day text,
  created_at timestamptz default now()
);

create table if not exists user_girlfriends (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users_ext(id),
  gf_id uuid references girlfriends(id),
  moral_score int default 60,
  mood_tier text default 'neutral',
  gift_history jsonb,
  total_spent numeric default 0,
  personal_memory jsonb,
  last_contact timestamptz,
  created_at timestamptz default now()
);

create table if not exists messages (
  id uuid primary key default uuid_generate_v4(),
  relationship_id uuid references user_girlfriends(id),
  user_id uuid references users_ext(id),
  gf_id uuid references girlfriends(id),
  direction text,
  channel text,
  content text,
  audio_url text,
  video_url text,
  tone_score int,
  moderation_flags jsonb,
  created_at timestamptz default now()
);

create table if not exists company_payment_accounts (
  id uuid primary key default uuid_generate_v4(),
  method_name text,
  display_name text,
  account_identifier text,
  currency text default 'USD',
  is_active boolean default true,
  priority int default 10,
  notes text,
  created_at timestamptz default now()
);

create table if not exists payments (
  id uuid primary key default uuid_generate_v4(),
  relationship_id uuid references user_girlfriends(id),
  payment_account_id uuid references company_payment_accounts(id),
  amount numeric,
  currency text,
  provider text,
  provider_tx_id text,
  status text,
  meta jsonb,
  created_at timestamptz default now()
);

create table if not exists memories (
  id uuid primary key default uuid_generate_v4(),
  relationship_id uuid references user_girlfriends(id),
  summary text,
  tags text[],
  created_at timestamptz default now()
);

/* Note: For pgvector, add extension and vector column in production */
