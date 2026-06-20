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

## Step 4 Client MVP Shape

The remaining client-facing MVP surfaces now include Documents, Quotes, Invoices, Messages, More, Profile, Settings, Legal, Support, and notification-ready event definitions.

- Documents provides category cards, search, document rows, and document detail metadata.
- Quotes and Invoices are read-only financial views with disabled PDF, approval, and payment actions.
- Messages provides a read-only message center and thread view.
- More is the secondary navigation hub for Profile, Messages, Quotes, Invoices, Settings, Support, Legal, and Sign Out.
- Profile is read-only and does not allow role, approval status, or profile edits.
- Settings shows system appearance, session/app info, legal/support links, and disabled notification preference placeholders.
- Legal documents the website legal reference set without rewriting or replacing legal policy.
- Support provides restrained operational support context without promising instant support.

All Step 4 business data is local demo data until AMG confirms portal table/API mapping, Supabase Storage behavior, messaging send workflow, quote/invoice actions, payment handling, and notification infrastructure.

## Step 5 Hardening Shape

The MVP is prepared for internal review, not store submission:

- Expo/EAS configuration audited.
- App identifiers documented as placeholders until Apple/Google ownership is confirmed.
- Icon and splash usage documented as temporary approved-logo placeholders.
- Demo data audited and marked as non-production.
- Internal testing checklist added.
- Validation scripts added for typecheck, lint, Expo Doctor, and web export.
- Production EAS builds, TestFlight, Google Play submission, backend mutations, and push notifications remain deferred.

## Deferred Areas

Crew assignment workflows, operations dashboards, admin review tools, website editor tools, analytics, maps, payments, notifications, and store submission are out of scope for this setup.
