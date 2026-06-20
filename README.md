# AMG Connect Mobile

AMG Connect Mobile is the Expo React Native foundation for AMG Aviation Group's future iOS and Android companion app. It is intended to align with the AMG public website and AMG Connect portal while staying mobile-native, minimal, premium, and operational.

## Tech Stack

- Expo React Native with TypeScript
- Expo Router under `src/app`
- Supabase Auth client for mobile sign-in/session handling
- Expo SecureStore-backed encrypted Supabase session persistence
- AMG theme tokens in TypeScript
- lucide-react-native icons
- EAS-compatible `eas.json`

NativeWind is not installed in this foundation. The app uses React Native styles and AMG theme tokens to avoid introducing styling runtime/config risk before the native UI system is finalized.

## Local Setup

```bash
npm install
npm run start
```

`npm run start` is configured for Expo Go. Because the repo also includes `expo-dev-client` for EAS development builds, use the explicit dev-client scripts when testing an installed development build.

Common Expo commands:

```bash
npm run start:go
npm run start:dev-client
npm run ios
npm run ios:dev-client
npm run android
npm run android:dev-client
npm run web
npm run typecheck
npm run lint
npm run doctor
npm run export:web
```

## Environment

Create `.env` from `.env.example`:

```env
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
EXPO_PUBLIC_APP_ENV=development
```

Do not commit `.env` or production secrets. Do not use Supabase service-role or secret keys in this mobile app.

## Auth And Supabase

The app reads only these client-safe environment variables:

```env
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```

`src/lib/supabase/client.ts` creates the Supabase client with `persistSession`, `autoRefreshToken`, `detectSessionInUrl: false`, and `processLock`. On native platforms the Supabase session payload is encrypted into AsyncStorage with an AES key stored in Expo SecureStore, matching the current Supabase React Native guidance for session values that can exceed SecureStore's direct storage guidance.

Mobile uses the same Supabase Auth project, client credential model, role source, and future storage policy model as the AMG Connect portal. Do not create a separate mobile auth system, role store, credential set, or storage policy layer.

`src/features/auth/AuthProvider.tsx` loads the stored session, verifies the current user with Supabase Auth, subscribes to auth changes, and exposes `useAuth()` for screens.

Role resolution uses `portal_users` as the confirmed primary source. The resolver queries only the current user's row under normal RLS, then falls back to `profiles` and metadata compatibility sources while exact field names are finalized. Supabase RLS remains the real data-access boundary; mobile route guards are a UX/access shell, not a backend authorization substitute.

## EAS Notes

The repo is linked to Expo project `@amgaviation/amgmobile` with EAS project ID `904a6d9f-40ad-48fe-b6a2-f92cc53abd74`. `app.json` must keep `owner`, `slug`, and `extra.eas.projectId` aligned with that project so GitHub-triggered EAS builds do not fail with a project ID mismatch.

`eas.json` includes `development`, `preview`, and `production` profiles. The configured bundle/package identifiers are placeholders until Apple/Google ownership is confirmed:

- iOS: `com.amgaviationgroup.connect`
- Android: `com.amgaviationgroup.connect`

EAS login, credentials, native builds, production builds, TestFlight submission, Google Play submission, and `eas submit` are intentionally not run from the MVP hardening branch.

Future internal testing commands after account access is approved:

```bash
eas build --profile development --platform ios
eas build --profile development --platform android
eas build --profile preview --platform ios
eas build --profile preview --platform android
```

## Branch Workflow

Work in feature branches and open pull requests. This foundation was built on `setup/expo-mobile-foundation`.

## Relationship To AMG Website And Portal

The app uses `amg1` and `https://www.amgaviationgroup.com` as read-only references. The mobile app should mirror AMG Connect concepts such as requests, aircraft, documents, quotes/invoices, messages, account access, and role-scoped visibility without copying Wix/website components directly.

## Brand Assets

The app keeps `assets/logo/amg-logo-white.png`, the approved public AMG white logo. The current Expo icon configuration uses `assets/icons/amg-icon-placeholder.png`, a square padded placeholder generated from that approved logo on AMG Midnight Navy so Expo validation can pass. Splash configuration still uses the approved white logo. Final app icon and splash artwork still require AMG approval before App Store or Google Play submission.

## Built In This Foundation

- Expo app initialized in the repo root
- `src/app` Expo Router structure
- Supabase login, reset password request, tab placeholders, pending approval, and access denied screens
- AMG theme tokens and role helpers
- Supabase client setup, AuthProvider, role resolver, route guards, and placeholder database types
- EAS config and env example
- Required product, backend, reference, and guardrail docs
- Approved public AMG white logo copied from the live website

## Client MVP Screens

Step 3 adds the first client-facing MVP experience:

- Home dashboard with support activity summary, primary aircraft, recent activity, and request CTA
- Requests list with search, status filters, demo request cards, loading/error/empty states, and request-detail navigation
- Request detail with overview, aircraft, timing, AMG review context, documents preview, quote/invoice preview, updates, next action, and operational context
- New Support Request UI with frontend validation and a disabled/deferred submit path
- Aircraft list with search, demo aircraft cards, loading/error/empty states, and aircraft-detail navigation
- Aircraft detail with profile, base, documents preview, recent support activity, and aircraft-scoped request CTA

These screens use local demo data in `src/features/requests/request.demo.ts` and `src/features/aircraft/aircraft.demo.ts`. No real request, aircraft, document, quote, invoice, or storage records are queried or written yet because the AMG Connect backend table/field mapping is not confirmed.

## Remaining Client MVP Areas

Step 4 adds the remaining client-facing MVP surfaces:

- Documents tab, document categories, document list, and document detail
- Quotes list/detail and invoices list/detail inside the More flow
- Messages list and read-only message thread detail
- More tab navigation hub
- Profile, Settings, Legal, and Support screens
- Notification-ready event types in `src/lib/notifications/`

These areas use local demo data in `src/features/documents`, `src/features/quotes`, `src/features/invoices`, `src/features/messages`, and `src/features/settings`. Document open/download, quote approval, invoice payment, message send, support submission, profile editing, and mobile notification registration are deferred until AMG confirms the backend, storage, payment, messaging, and notification contracts.

## MVP Hardening

Step 5 prepares the MVP for internal review:

- Validation scripts: `typecheck`, `lint`, `doctor`, `export:web`
- EAS push-notification setup prompt disabled while notifications are deferred
- Internal testing checklist in `docs/internal-testing-checklist.md`
- Hardening audit in `docs/mobile-mvp-hardening-audit.md`
- Demo tail numbers changed to obvious non-production values
- No production EAS builds, store submission, backend changes, or secrets

## Intentionally Not Built Yet

- Real dashboard data flows
- Backend mutations or live support request submission
- Supabase schema, RLS, storage, or migration changes
- Live tracking
- Crew availability guarantees
- Live document downloads, quote approvals, invoice payments, message sending, push notifications, maps, payments, or analytics
- App Store, Play Store, or production EAS setup
