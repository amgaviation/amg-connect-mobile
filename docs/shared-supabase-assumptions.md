# Shared Supabase Assumptions

## Expected Data Areas

- Account profile
- Role and approval status
- Support requests
- Aircraft records
- Document records and storage paths
- Quotes and invoices
- Messages
- Notifications

## Verified

- The mobile repo has no Supabase credentials.
- The mobile repo has no migrations or schema changes.
- Supabase client setup now supports auth/session persistence using client-safe env vars only.
- The primary mobile role/profile source is confirmed as `portal_users`.
- Mobile auth, credentials, roles, and future storage access must match the existing AMG portal Supabase setup.
- The Step 2 implementation does not use service-role keys.
- The Step 2 implementation does not change backend schema, RLS, storage policies, auth settings, or API behavior.
- `amg1` did not expose Supabase generated types or schema files.

## Unverified

- Exact `portal_users` role/status field names
- RLS policy shape
- Storage bucket names
- Document access rules
- Request status values
- Quote/invoice model
- Message model
- Notification model

## Step 2 Role Source

AMG confirmed `portal_users` as the mobile role/profile source. Mobile auth supports role/status sources in this order:

1. Current-user `portal_users` row under RLS.
2. Current-user `profiles` row under RLS as a compatibility fallback.
3. `user.app_metadata`.
4. `user.user_metadata` as a compatibility fallback only.

Final data screens must verify the exact `portal_users` column names and RLS behavior before adding real account data queries.

Future document/storage work must use the same Supabase Storage buckets and policies as the portal. Do not create mobile-only buckets or bypass portal storage rules.

## Do Not Change

Do not change the shared backend, RLS, storage, auth, or API behavior from the mobile repo without explicit approval and a reviewed backend migration plan.
