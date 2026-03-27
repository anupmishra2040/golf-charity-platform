create extension if not exists "pgcrypto";

create table charities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  is_featured boolean default false,
  created_at timestamptz default now()
);

create table users (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text unique not null,
  password_hash text not null,
  role text not null default 'subscriber' check (role in ('subscriber', 'admin')),
  charity_id uuid references charities(id) on delete set null,
  charity_percentage numeric(5,2) not null default 10.00 check (charity_percentage >= 10 and charity_percentage <= 100),
  created_at timestamptz default now()
);

create table subscription_plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  billing_interval text not null check (billing_interval in ('month', 'year')),
  price numeric(10,2) not null,
  active boolean default true
);

create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  plan_id uuid not null references subscription_plans(id),
  stripe_customer_id text,
  stripe_subscription_id text,
  status text not null check (status in ('active', 'cancelled', 'lapsed', 'past_due')),
  started_at timestamptz,
  renewal_date timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz default now()
);

create table golf_scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  score int not null check (score between 1 and 45),
  played_on date not null,
  created_at timestamptz default now()
);

create table draws (
  id uuid primary key default gen_random_uuid(),
  month int not null,
  year int not null,
  draw_mode text not null check (draw_mode in ('random', 'algorithmic')),
  winning_numbers int[] not null,
  prize_pool numeric(12,2) not null default 0,
  rollover_amount numeric(12,2) not null default 0,
  status text not null default 'draft' check (status in ('draft', 'simulated', 'published')),
  created_at timestamptz default now(),
  published_at timestamptz
);

create table winners (
  id uuid primary key default gen_random_uuid(),
  draw_id uuid not null references draws(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  match_type int not null check (match_type in (3,4,5)),
  prize_amount numeric(12,2) not null,
  proof_url text,
  verification_status text not null default 'pending' check (verification_status in ('pending','approved','rejected')),
  payment_status text not null default 'pending' check (payment_status in ('pending','paid')),
  created_at timestamptz default now()
);

create table donations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete set null,
  charity_id uuid not null references charities(id) on delete cascade,
  amount numeric(12,2) not null,
  source text not null check (source in ('subscription', 'independent')),
  created_at timestamptz default now()
);
