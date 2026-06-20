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

## Step 3 Frontend Data Contract

Step 3 adds typed frontend adapters for requests and aircraft without changing the backend:

- `RequestSummary`, `RequestDetail`, `RequestStatus`, `SupportType`, `SupportRequestDraft`, and validation helpers live under `src/features/requests/`.
- `AircraftSummary`, `AircraftDetail`, and `AircraftStatus` live under `src/features/aircraft/`.
- `RequestActivityItem` lives under `src/features/activity/`.
- Mapper files accept generic records so future Supabase responses can be normalized after the portal table/field mapping is confirmed.

Step 3 screens use local demo data only:

- `src/features/requests/request.demo.ts`
- `src/features/aircraft/aircraft.demo.ts`

No real Supabase request, aircraft, document, quote, invoice, message, or storage queries were added. No mutations were added. New Support Request submission is deferred and disabled until AMG confirms the safe request table, fields, storage policy, and RLS path.

Required backend confirmations before live data:

- Request table or API route name
- Request field mapping for status, support type, route/location, aircraft, timing, contact preference, notes, documents, quotes/invoices, and activity
- Aircraft table or API route name
- Aircraft client-scope relationship and RLS behavior
- Document/storage bucket names and client-safe access policies
- Whether request creation is direct table insert, RPC, Edge Function, or portal API route

Step 3 did not add migrations, tables, views, storage buckets, RLS policies, auth settings, Edge Functions, API routes, service-role keys, or production data.

## Step 4 Frontend Data Contract

Step 4 adds frontend-only typed adapters and demo records for these areas:

- Documents: `src/features/documents/document.types.ts`, `document.mappers.ts`, `document.demo.ts`
- Quotes: `src/features/quotes/quote.types.ts`, `quote.mappers.ts`, `quote.demo.ts`
- Invoices: `src/features/invoices/invoice.types.ts`, `invoice.mappers.ts`, `invoice.demo.ts`
- Messages: `src/features/messages/message.types.ts`, `message.mappers.ts`, `message.demo.ts`
- Profile: `src/features/profile/profile.types.ts`, `profile.mappers.ts`
- Settings: `src/features/settings/settings.types.ts`, `settings.demo.ts`
- Notifications: `src/lib/notifications/types.ts`, `events.ts`

No real Supabase document, storage, quote, invoice, payment, message, profile-update, support, or notification queries were added. No mutations were added.

Live integration still requires confirmation of:

- Document metadata source and client scope
- Supabase Storage bucket names, signed URL behavior, file visibility, and RLS/storage policy behavior
- Quote and invoice table/API names, field mapping, document/PDF access, quote approval route, and payment policy
- Messaging thread/message table/API names, read scope, send workflow, and RLS behavior
- Profile safe update path, if any
- Support/contact API route, if any
- Push notification registration, token storage, event routing, and delivery backend

Step 4 did not add migrations, tables, views, storage buckets, storage policies, RLS policies, auth settings, Edge Functions, API routes, payment processing, service-role keys, production push notifications, or production data.

## Step 5 Hardening Confirmation

Current confirmed backend behavior:

- Supabase Auth is the real sign-in/session source.
- `portal_users` is the confirmed primary mobile role/profile source.
- Mobile uses only `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY`.

Current unconfirmed backend mapping:

- Exact `portal_users` role/status column names.
- Request and aircraft production table/API mapping.
- Document metadata and Supabase Storage bucket/policy mapping.
- Quote/invoice table/API mapping and PDF access.
- Messaging thread/message read and send model.
- Notification token storage and delivery model.

Screens currently using demo data:

- Home summaries
- Requests and request details
- Aircraft and aircraft details
- Documents and document details
- Quotes and quote details
- Invoices and invoice details
- Messages and message threads
- Settings notification preferences

Live mutations:

- Supabase Auth sign in, local sign out, session refresh, and password reset request.

Deferred mutations:

- Support request creation
- Document upload/open/download
- Quote approval
- Invoice payment
- Message sending
- Profile editing
- Support/contact submission
- Push token registration and notification delivery

No backend schema, RLS, storage policy, auth configuration, Edge Function, API route, migration, service-role key, or production data change was made from the mobile repo during MVP hardening.
