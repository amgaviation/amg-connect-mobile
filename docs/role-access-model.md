# Role Access Model

## Mobile Target Roles

- `client`
- `crew`
- `admin`
- `amg_operations`
- `super_admin`

Pending, denied, suspended, and inactive users must not access protected mobile screens.

## Current Helper Behavior

`src/lib/auth/roles.ts` defines role predicates, `canAccessMobileApp`, and `getDefaultRouteForRole`. These helpers do not fetch roles yet.

## amg1 Legacy Mapping

The read-only `amg1` Wix portal currently uses:

- `client_owner` -> target `client`
- `crew_pilot` -> target `crew`
- `amg_admin` -> target `admin`
- `maintenance_partner` and `broker_partner` -> target `amg_operations`, pending confirmation

The mobile backend role source must be verified against the final Supabase model before auth enforcement is implemented.
