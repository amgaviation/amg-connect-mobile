# Supabase Backend Contract

The mobile app will use the existing approved AMG Supabase backend.

AMG Connect Mobile must use the same Supabase Auth project, client credential model, `portal_users` role/profile source, and existing Supabase Storage/RLS policy model as the portal. The mobile app must not introduce a parallel auth system, separate role store, separate credentials, or mobile-only storage access rules.

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

The current mobile client reads `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY`, never service-role keys. Supabase docs reviewed during setup note publishable keys as the forward path; this repo preserves the requested anon-key env name until AMG confirms the production key strategy.

## Step 2 Auth Contract

- Supabase Auth is used for email/password sign-in, sign-out, session refresh, auth-state subscription, and password reset requests.
- Mobile sign-in uses the same Supabase Auth accounts as the portal.
- Sessions persist through Supabase client storage.
- On native platforms, the session payload is encrypted into AsyncStorage and the encryption key is stored in Expo SecureStore.
- The app verifies the current user with `auth.getUser()` before resolving mobile access.
- The role resolver uses `portal_users` as the confirmed primary role/profile source and only performs current-user lookups under standard anon/authenticated client access and existing RLS.
- Missing profile tables, missing grants, missing columns, or no current-user row do not trigger schema changes. The app falls back to metadata and/or routes to pending/access-denied.
- Future document/storage screens must use the existing portal Supabase Storage buckets and policies. Step 2 adds no storage bucket access.

## No Backend Changes

Step 2 did not add migrations, tables, views, storage buckets, RLS policies, auth settings, Edge Functions, or API routes.
