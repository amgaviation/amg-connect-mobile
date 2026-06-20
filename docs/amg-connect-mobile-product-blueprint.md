# AMG Connect Mobile Product Blueprint

## MVP Direction

- iOS-first, Android-ready.
- Client MVP first.
- Crew and operations support later.
- Five tabs: Home, Requests, Aircraft, Documents, More.
- Shared Supabase backend with the AMG Connect portal.
- No fake live tracking.
- No guaranteed crew availability claims.
- No operational acceptance before review.

## MVP Feature Shape

Home should summarize account access and approved support context. Requests, Aircraft, and Documents should eventually show account-scoped records from Supabase. More should collect profile, messages, quotes, invoices, settings, and support tools after contracts are verified.

## Step 3 Client MVP Shape

The client MVP now includes production-quality frontend screens for Home, Requests, Request Detail, New Support Request, Aircraft, and Aircraft Detail.

- Home presents a calm operational summary, primary aircraft, active request cards, recent activity, and CTAs.
- Requests supports search, status filtering, empty/loading/error states, and request-detail navigation.
- Request Detail shows request overview, aircraft, timing, AMG review context, documents preview, quote/invoice preview, updates, next action, and quiet operational context.
- New Support Request validates required frontend fields but keeps live submission disabled until backend request mapping is confirmed.
- Aircraft supports search, aircraft cards, aircraft-detail navigation, documents preview, recent support activity, and support CTA.

Current request and aircraft data is local demo data only. The UI is ready for real Supabase adapters, but real queries must wait for confirmed portal table names, fields, RLS scope, and storage rules.

## Deferred Areas

Crew assignment workflows, operations dashboards, admin review tools, website editor tools, analytics, maps, payments, notifications, and store submission are out of scope for this setup.
