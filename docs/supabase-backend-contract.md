# Supabase Backend Contract

The mobile app will use the existing approved AMG Supabase backend.

Do not change backend schema from the mobile repo without explicit approval.

Do not create migrations, tables, storage buckets, RLS policies, database functions, Edge Functions, or production credentials from this initial setup task.

Supabase RLS remains the source of truth for data access.

Required future mapping areas:

- users/profiles
- roles
- requests
- aircraft
- documents/storage
- quotes/invoices
- messages
- notifications

The current client scaffold reads `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY`, never service-role keys. Supabase docs reviewed during setup note publishable keys as the forward path; this repo preserves the requested anon-key env name until AMG confirms the production key strategy.
