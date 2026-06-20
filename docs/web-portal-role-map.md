# Web Portal Role Map

## Target Mobile Roles

- `client`
- `crew`
- `admin`
- `amg_operations`
- `super_admin`

## Verified amg1 Roles

- `client_owner`
- `crew_pilot`
- `amg_admin`
- `maintenance_partner`
- `broker_partner`

## Known Access Expectations

- Pending users route to pending approval.
- Denied, suspended, inactive, and unknown-role users route to access denied.
- `amg_admin` can review portal users, update roles, update approval status, and access admin lists.
- `client_owner` and `amg_admin` can load client dashboard/profile context.
- `crew_pilot` and `amg_admin` can load crew dashboard/profile context.

## Pending Confirmations

- Whether `amg_operations` replaces or supplements `amg_admin`.
- Whether `super_admin` exists in Supabase or remains portal-only.
- Whether partner roles should have any mobile access.
- Whether mobile admin access is allowed in MVP.
- Whether Supabase stores the final role in `profiles`, `portal_users`, `app_metadata`, or another portal-specific profile source.
- Whether Supabase stores approval state as `approval_status`, `status`, boolean approval fields, or app metadata.

## Mobile Step 2 Behavior

AMG Connect Mobile now recognizes the target roles directly and maps the Wix-era `amg1` roles for compatibility:

- `client_owner` -> `client`
- `crew_pilot` -> `crew`
- `amg_admin` -> `admin`
- `maintenance_partner` -> `amg_operations`
- `broker_partner` -> `amg_operations`

Heavy admin, operations, and Website Editor tools remain desktop portal-first. The mobile app only routes approved recognized users into the base tab shell.
