# Mobile MVP Hardening Audit

## Repository Snapshot

- Branch: `release/mobile-mvp-hardening`
- Package manager: npm, using `package-lock.json`
- Expo: `~54.0.35`
- React Native: `0.81.5`
- Expo Router entry: `expo-router/entry`
- Router root: `src/app`
- Primary tabs: Home, Requests, Aircraft, Documents, More
- Protected dynamic routes: requests, aircraft, documents, quotes, invoices, messages, profile, settings, legal, support

## Configuration

- App config: `app.json`
- EAS config: `eas.json`
- TypeScript config: `tsconfig.json`
- App name: `AMG Connect`
- Slug: `amgmobile`
- Expo project: `@amgaviation/amgmobile`
- EAS project ID: `904a6d9f-40ad-48fe-b6a2-f92cc53abd74`
- iOS bundle identifier placeholder: `com.amgaviationgroup.connect`
- Android package placeholder: `com.amgaviationgroup.connect`
- EAS profiles: `development`, `preview`, `production`
- EAS submit profile exists for future production use only
- EAS push-notification setup prompt is disabled while push is deferred

## Environment

- Required local env example: `.env.example`
- Required variables:
  - `EXPO_PUBLIC_SUPABASE_URL`
  - `EXPO_PUBLIC_SUPABASE_ANON_KEY`
  - `EXPO_PUBLIC_APP_ENV`
- Ignored local env files:
  - `.env`
  - `.env.local`
  - `.env.*.local`
  - `.env*.local`
- No `.env` file is committed.

## Auth And Supabase

- Supabase client: `src/lib/supabase/client.ts`
- Auth provider: `src/features/auth/AuthProvider.tsx`
- Session storage: Supabase session persistence with native encrypted AsyncStorage/SecureStore wrapper
- Role resolver: `src/lib/auth/role-resolver.ts`
- Confirmed primary role source: `portal_users`
- Fallback sources: `profiles`, `app_metadata`, `user_metadata` compatibility only
- Client route guards are UX protection only; Supabase RLS remains the backend source of truth.

## Assets

- Approved logo in use: `assets/logo/amg-logo-white.png`
- Current app icon config uses `assets/icons/amg-icon-placeholder.png`, a square padded placeholder generated from the approved white logo on AMG Midnight Navy.
- Current splash config uses the approved white logo on AMG Midnight Navy as a temporary placeholder.
- Final app icon and splash artwork still require AMG approval before store submission.

## Demo Data Audit

Demo records live in obvious `*.demo.ts` files:

- `src/features/aircraft/aircraft.demo.ts`
- `src/features/requests/request.demo.ts`
- `src/features/documents/document.demo.ts`
- `src/features/quotes/quote.demo.ts`
- `src/features/invoices/invoice.demo.ts`
- `src/features/messages/message.demo.ts`
- `src/features/settings/settings.demo.ts`

Tail numbers were hardened to obvious demo values: `N-DEMO1` and `N-DEMO2`.

## Deferred Production Behavior

- Request submission
- Document open/download
- Quote approval
- Invoice payment
- Message sending
- Profile editing
- Support/contact submission
- Push notification token registration and delivery
- Admin, operations, Super Admin, and Website Editor mobile tools

## Validation Commands

Use:

```bash
npm run typecheck
npm run lint
npx expo config --json
npm run export:web
npm run doctor
```

Do not run production EAS builds, `eas submit`, store submission, Supabase migrations, or backend mutation commands as part of MVP hardening.
