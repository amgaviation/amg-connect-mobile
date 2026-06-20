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
