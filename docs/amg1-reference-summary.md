# amg1 Reference Summary

## Sources Inspected

- `/Users/tonygonzalez/Documents/amg1`
- `https://www.amgaviationgroup.com`
- Supabase changelog and current Supabase Expo React Native docs

`amg1` was accessible and used read-only. It was not modified.

## Repository Shape

`amg1` is a Wix/Velo Git integration repo, not a Next.js app. It contains `src/pages`, `src/backend`, `src/public`, `src/styles/global.css`, Wix config/lock files, and CMS CSV imports.

Package conventions are Wix-specific: `@wix/cli`, `@wix/eslint-plugin-cli`, ESLint 8, and React 16.14. These are not reusable mobile conventions.

## Logo

No source logo asset was found in the `amg1` Git export. The live website exposes the approved white AMG logo at:

`https://www.amgaviationgroup.com/images/logo-white.png`

That public asset was copied into this mobile repo as `assets/logo/amg-logo-white.png`.

Logo usage on the live site appears in the header and footer as the AMG Aviation Group logo.

## Brand Color Implementation

`amg1/src/styles/global.css` sets the body background to `#050b14`. The mobile app also follows the official provided AMG palette.

No Tailwind config, shared design token file, or reusable component design system was found in `amg1`.

## Portal Routes And Role Conventions

`src/backend/portalAuth.jsw` defines:

- `/login`
- `/pending-approval`
- `/access-denied`
- `/admin-dashboard`
- `/crew-dashboard`
- `/client-dashboard`
- `/partner-dashboard`

Legacy roles include `amg_admin`, `crew_pilot`, `client_owner`, `maintenance_partner`, and `broker_partner`.

Approval statuses include `pending`, `approved`, `denied`, and `suspended`.

## Portal Concepts Found

- Portal user routing
- Admin user approval and role assignment
- Crew profiles
- Client profiles
- Audit logs
- Pending approval and access denied pages

Admin dashboard code lists portal users, counts statuses/roles, and allows role/status updates. Crew dashboard code loads and saves crew profile fields. Client dashboard page code is still a template stub, while client profile backend functions exist.

The live AMG Connect page references support requests, aircraft profiles, crew review, documents, quotes/invoices, status updates, AMG messages, settings-like operational tools, and partner/vendor tasks. These are product concepts only, not copied backend schemas.

Public website content rules emphasize review before acceptance, no crew availability guarantee, owner/operator approval, aircraft status, operating conditions, and final acceptance.

Mobile-responsive source patterns found in `amg1` are limited to global overflow control and HTML embed resize handling.

## Supabase

No Supabase client, generated Supabase TypeScript types, migrations, RLS policy files, or Supabase schema source were found in `amg1`.

No current Supabase auth/session utility was found in `amg1`; the Wix portal uses `wix-members-backend` and Wix Data collections.

No generated Supabase TypeScript types were found.

## Assumptions Pending

- Final Supabase table names and generated types
- Final role mapping from Wix-era roles to Supabase roles
- Final storage buckets and document access policy
- Final mobile app icon and splash assets
- Whether partner roles are mobile users or portal-only users
