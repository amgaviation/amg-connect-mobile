# Role Access Model

## Mobile Target Roles

- `client`
- `crew`
- `admin`
- `amg_operations`
- `super_admin`

Pending, denied, suspended, inactive, rejected, disabled, missing-role, and unknown-role users must not access protected mobile screens.

## Current Helper Behavior

`src/lib/auth/roles.ts` defines role predicates, approval-status predicates, `canAccessMobileApp`, and `getDefaultRouteForRole`.

`src/lib/auth/route-guards.ts` maps auth state to:

- unauthenticated -> `/auth/login`
- pending/unapproved -> `/protected/pending-approval`
- approved recognized role -> `/tabs/home`
- missing, denied, rejected, disabled, inactive, suspended, or unknown role -> `/protected/access-denied`

## Mobile Role Resolver

`src/lib/auth/role-resolver.ts` uses `portal_users` as the confirmed primary Supabase role/profile source, matching the portal access model.

Resolution order:

1. Verify the authenticated Supabase user with `auth.getUser()`.
2. Attempt current-user `portal_users` lookup under normal client/RLS access, matched by `user_id`, `auth_user_id`, or `id`.
3. Fall back to current-user `profiles` lookup under normal client/RLS access, matched by `id`, `user_id`, or `auth_user_id`.
4. Resolve role/status fields from the matched current-user row if present.
5. Fall back to `user.app_metadata` role/status.
6. Fall back to `user.user_metadata` role/status only as compatibility scaffolding.
7. Default recognized-role users without a confirmed approval status to `pending`.

The resolver never uses a service-role key, never queries all users, and never changes backend schema/RLS. Client route guards are not a substitute for Supabase RLS.

## amg1 Legacy Mapping

The read-only `amg1` Wix portal currently uses:

- `client_owner` -> target `client`
- `crew_pilot` -> target `crew`
- `amg_admin` -> target `admin`
- `maintenance_partner` and `broker_partner` -> target `amg_operations`, pending confirmation

The mobile backend role source is now confirmed as `portal_users`. Exact role/status column names still need verification before real account data screens are built.
