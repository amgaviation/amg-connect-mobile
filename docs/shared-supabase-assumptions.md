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
- The Step 2 implementation does not use service-role keys.
- The Step 2 implementation does not change backend schema, RLS, storage policies, auth settings, or API behavior.
- `amg1` did not expose Supabase generated types or schema files.

## Unverified

- Table names
- Role storage location
- RLS policy shape
- Storage bucket names
- Document access rules
- Request status values
- Quote/invoice model
- Message model
- Notification model

## Step 2 Role Source Assumption

Until AMG confirms the final Supabase source, mobile auth supports likely role/status sources in this order:

1. Current-user `profiles` row under RLS.
2. Current-user `portal_users` row under RLS.
3. `user.app_metadata`.
4. `user.user_metadata` as a compatibility fallback only.

Final data screens must verify the true role/profile source before adding real account data queries.

## Do Not Change

Do not change the shared backend, RLS, storage, auth, or API behavior from the mobile repo without explicit approval and a reviewed backend migration plan.
