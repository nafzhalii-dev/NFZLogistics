-- =============================================================================
-- NFZ Logistics — contact_submissions table
-- =============================================================================
-- WHY THIS FILE EXISTS
-- The audit found the public Contact form (/contact) was fake: it faked a
-- success message with setTimeout and never persisted anything. No existing
-- table in this schema is suitable for a generic contact message (shipments,
-- quotes, customers, drivers, vehicles are all shipment/logistics-specific —
-- confirmed by inspecting src/lib/supabase.ts and by probing the live schema
-- for contacts/contact_messages/messages/inquiries/leads, none of which
-- exist). This creates a small, dedicated table for it.
--
-- This project only has the public anon key available to it
-- (VITE_SUPABASE_ANON_KEY) — that key cannot run DDL. Run this file once,
-- manually, as the project owner:
--   Supabase Dashboard → SQL Editor → paste this file → Run
-- =============================================================================

-- ── 1. Table ─────────────────────────────────────────────────────────────
create table if not exists public.contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  subject     text,
  message     text not null,
  status      text not null default 'new' check (status in ('new', 'read', 'replied', 'archived')),
  created_at  timestamptz not null default now()
);

comment on table public.contact_submissions is
  'Messages submitted through the public /contact form.';

-- ── 2. Row Level Security ────────────────────────────────────────────────
alter table public.contact_submissions enable row level security;

-- Remove any pre-existing policies on this table before recreating, so this
-- script is safe to re-run and never stacks with a stale/permissive policy.
do $$
declare
  pol record;
begin
  for pol in
    select policyname
    from pg_policies
    where schemaname = 'public' and tablename = 'contact_submissions'
  loop
    execute format('drop policy if exists %I on public.contact_submissions', pol.policyname);
  end loop;
end $$;

-- The public Contact form may INSERT a message — nothing else. It never
-- reads submissions back, so anonymous SELECT/UPDATE/DELETE are intentionally
-- not granted; this is the same PII-exposure mistake the P0 audit flagged on
-- the quotes table (anon could previously read every customer's contact
-- details), and this table must not repeat it.
create policy "contact_submissions_insert_public"
  on public.contact_submissions for insert
  to anon, authenticated
  with check (true);

-- Only a signed-in admin session (the same "authenticated" role the
-- /dashboard fix now requires) may read, update, or delete submissions —
-- e.g. for a future admin inbox view.
create policy "contact_submissions_select_admin"
  on public.contact_submissions for select
  to authenticated
  using (true);

create policy "contact_submissions_update_admin"
  on public.contact_submissions for update
  to authenticated
  using (true)
  with check (true);

create policy "contact_submissions_delete_admin"
  on public.contact_submissions for delete
  to authenticated
  using (true);
