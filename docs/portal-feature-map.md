# Portal Feature Map

## Mobile MVP

- Home
- Requests
- Aircraft
- Documents
- More
- Profile/account status

## Step 3 Implemented Mobile Areas

- Home: client support summary, demo active requests, primary aircraft, recent activity, and support CTA.
- Requests: searchable/filterable client request list with request cards.
- Request Detail: overview, aircraft, timing, AMG review, documents preview, quote/invoice preview, updates, next action, and quiet operational context.
- New Support Request: validated frontend intake UI with disabled/deferred submission.
- Aircraft: searchable aircraft list with client-safe aircraft cards.
- Aircraft Detail: aircraft profile, base, documents preview, recent support activity, and aircraft-scoped support CTA.

All Step 3 records are local demo data. They do not expose portal production records and do not write to portal tables.

## Step 4 Implemented Mobile Areas

- Documents: categories, searchable document list, document detail, and disabled open/download actions.
- Quotes: read-only list/detail with disabled approval and PDF actions.
- Invoices: read-only list/detail with disabled payment and PDF actions.
- Messages: read-only message list/thread UI with disabled reply.
- More: secondary navigation hub with Profile, Messages, Quotes, Invoices, Settings, Support, Legal, and Sign Out.
- Profile: read-only role-aware account display.
- Settings: notification-ready preference placeholders, session/app info, and support/legal links.
- Legal: current website legal reference labels with URL mapping pending.
- Support: restrained AMG Operations context with in-app contact deferred.

All Step 4 records are local demo data. They do not expose portal production records, cross-client documents/messages, payment details, internal notes, storage URLs, or admin-only data.

## Step 5 Hardening Notes

The mobile MVP mirrors portal concepts for internal testing only. Desktop portal remains the source for heavy admin, operations, Website Editor, publishing, final quote/payment workflows, and production document storage behavior until AMG confirms safe mobile contracts.

## Portal Areas To Mirror Later

- Dashboard
- Requests
- Aircraft
- Documents
- Quotes/invoices
- Messages
- Settings

## Deferred

- Crew profile editing
- Operations dashboards
- Admin user approval
- Partner/vendor workflows
- Website editor tools
- Super admin tooling
- Analytics
- Maps/live tracking
- Payments

The live AMG Connect page describes role-based access to support requests, aircraft profiles, crew review, documents, quotes/invoices, and status updates. Mobile should start with client-safe visibility and expand only after the backend contract is verified.
