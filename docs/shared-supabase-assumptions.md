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
- Supabase client setup is scaffolded only.
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

## Do Not Change

Do not change the shared backend, RLS, storage, auth, or API behavior from the mobile repo without explicit approval and a reviewed backend migration plan.
