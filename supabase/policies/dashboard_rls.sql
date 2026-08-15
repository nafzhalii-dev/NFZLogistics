-- =============================================================================
-- NFZ Logistics — Row Level Security for the admin dashboard tables
-- =============================================================================
-- WHY THIS FILE EXISTS
-- The frontend fix only guards the /dashboard ROUTE (it now requires a signed-in
-- Supabase session and redirects to /admin/login otherwise). That alone does
-- NOT stop someone from calling the Supabase REST API directly with the public
-- anon key, bypassing the app entirely — this was confirmed during the audit:
-- shipments, quotes (including customer email/phone), customers, drivers, and
-- vehicles were all readable via the anon key with zero authentication.
--
-- This script closes that hole at the database level. It cannot be run by the
-- assistant automatically: this project only has the public anon key
-- (VITE_SUPABASE_ANON_KEY) available to it, which has no permission to alter
-- policies. Applying RLS requires the Supabase SQL Editor (or CLI with a
-- service-role/DB connection), which is intentionally not available to
-- frontend code. Run this once, manually, as the project owner:
--   Supabase Dashboard → SQL Editor → paste this file → Run
--
-- WHAT ACCESS THIS GRANTS
-- There is no admin/profile/role table in this schema yet — Supabase Auth's
-- built-in `authenticated` role (anyone holding a valid session JWT) is the
-- only authorization signal that exists today. These policies therefore
-- treat "authenticated" as "admin", matching what the new /dashboard login
-- gate already assumes. See the note at the bottom of this file about the
-- residual risk that implies and how to close it later.
--
-- Public (anon) access is preserved ONLY where an existing, unmodified
-- feature genuinely needs it:
--   - Shipment tracking (/tracking, homepage widget) reads `shipments`,
--     `shipment_events`, and the joined `drivers` columns anonymously.
--   - The Request a Quote form (/quote) inserts into `quotes` anonymously.
-- Every other read/write is restricted to authenticated sessions.
-- =============================================================================

-- ── 1. Enable Row Level Security on every dashboard-related table ──────────
alter table public.shipments        enable row level security;
alter table public.shipment_events  enable row level security;
alter table public.quotes           enable row level security;
alter table public.customers        enable row level security;
alter table public.drivers          enable row level security;
alter table public.vehicles         enable row level security;

-- ── 2. Drop any existing policies on these tables ───────────────────────────
-- Postgres OR's all matching policies together, so a pre-existing permissive
-- policy (e.g. "allow all") would still apply even after adding a stricter
-- one below. This removes whatever is currently configured first, regardless
-- of its name, so the policies created in step 3 are the only ones in effect.
do $$
declare
  pol record;
begin
  for pol in
    select policyname, tablename
    from pg_policies
    where schemaname = 'public'
      and tablename in ('shipments', 'shipment_events', 'quotes', 'customers', 'drivers', 'vehicles')
  loop
    execute format('drop policy if exists %I on public.%I', pol.policyname, pol.tablename);
  end loop;
end $$;

-- ── 3. shipments ─────────────────────────────────────────────────────────
-- Public tracking (anon) needs to read shipments by tracking number.
create policy "shipments_select_public"
  on public.shipments for select
  to anon, authenticated
  using (true);

-- Only signed-in admin sessions may create/edit/delete shipments.
create policy "shipments_write_admin"
  on public.shipments for insert
  to authenticated
  with check (true);

create policy "shipments_update_admin"
  on public.shipments for update
  to authenticated
  using (true)
  with check (true);

create policy "shipments_delete_admin"
  on public.shipments for delete
  to authenticated
  using (true);

-- ── 4. shipment_events ──────────────────────────────────────────────────
-- Public tracking joins this table to show the status timeline.
create policy "shipment_events_select_public"
  on public.shipment_events for select
  to anon, authenticated
  using (true);

-- Only the admin dashboard logs status-change events.
create policy "shipment_events_write_admin"
  on public.shipment_events for insert
  to authenticated
  with check (true);

create policy "shipment_events_update_admin"
  on public.shipment_events for update
  to authenticated
  using (true)
  with check (true);

create policy "shipment_events_delete_admin"
  on public.shipment_events for delete
  to authenticated
  using (true);

-- ── 5. drivers ───────────────────────────────────────────────────────────
-- Public tracking joins `drivers(id, name, phone)` onto a shipment result,
-- so anon SELECT must stay available or /tracking breaks.
create policy "drivers_select_public"
  on public.drivers for select
  to anon, authenticated
  using (true);

-- Only the admin dashboard's Drivers panel manages driver records.
create policy "drivers_write_admin"
  on public.drivers for insert
  to authenticated
  with check (true);

create policy "drivers_update_admin"
  on public.drivers for update
  to authenticated
  using (true)
  with check (true);

create policy "drivers_delete_admin"
  on public.drivers for delete
  to authenticated
  using (true);

-- ── 6. quotes ────────────────────────────────────────────────────────────
-- The public Request a Quote form only ever INSERTs — it never reads quotes
-- back. Anon SELECT is intentionally NOT granted: the audit found the anon
-- key could previously read every customer's name, email, and phone number
-- off this table, which is the customer-PII exposure named in the P0 finding.
create policy "quotes_insert_public"
  on public.quotes for insert
  to anon, authenticated
  with check (true);

-- Only the admin Quotes panel may read/update/delete submitted quotes.
create policy "quotes_select_admin"
  on public.quotes for select
  to authenticated
  using (true);

create policy "quotes_update_admin"
  on public.quotes for update
  to authenticated
  using (true)
  with check (true);

create policy "quotes_delete_admin"
  on public.quotes for delete
  to authenticated
  using (true);

-- ── 7. customers ─────────────────────────────────────────────────────────
-- No public page reads or writes this table — admin-only, full stop.
create policy "customers_all_admin"
  on public.customers for all
  to authenticated
  using (true)
  with check (true);

-- ── 8. vehicles ──────────────────────────────────────────────────────────
-- No public page reads or writes this table — admin-only, full stop.
create policy "vehicles_all_admin"
  on public.vehicles for all
  to authenticated
  using (true)
  with check (true);

-- =============================================================================
-- RESIDUAL RISK — READ BEFORE CONSIDERING THIS DONE
-- =============================================================================
-- "authenticated" currently means "holds ANY valid Supabase Auth session for
-- this project" — there is no admin/staff role check, because no such table
-- exists in this schema. That means:
--
--   1. If public sign-up is enabled for this Supabase project's Auth
--      settings, anyone can self-register, confirm their email, and pass
--      every policy above as "authenticated". Go to
--      Authentication → Providers → Email in the Supabase dashboard and
--      disable "Allow new users to sign up" (or the equivalent toggle in
--      the onspace.ai admin panel), then create the one or few real admin
--      accounts yourself via Authentication → Users → Add user.
--
--   2. During this audit, one throwaway account was created while probing
--      whether the Auth API was reachable:
--        probe-test-not-real@example.com
--      Its email was never confirmed, so it cannot sign in — but you should
--      delete it from Authentication → Users once you've reviewed this.
--
--   3. For real role separation (e.g. distinguishing an "admin" from a
--      future "read-only staff" account), the next step is a `profiles`
--      table keyed on auth.uid() with a `role` column, and rewriting the
--      `to authenticated` clauses above to also check that role. That is
--      out of scope for this fix and is intentionally left for a dedicated
--      follow-up, per the instruction not to invent a client-only admin
--      check as a substitute for real authorization.
-- =============================================================================
