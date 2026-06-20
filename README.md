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

Common Expo commands:

```bash
npm run ios
npm run android
npm run web
npm run lint
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

`src/features/auth/AuthProvider.tsx` loads the stored session, verifies the current user with Supabase Auth, subscribes to auth changes, and exposes `useAuth()` for screens.

Role resolution is conservative because the final Supabase role source is not confirmed in this mobile repo. The resolver attempts current-user profile lookups under normal RLS using likely `profiles` and `portal_users` sources, then falls back to metadata. Supabase RLS remains the real data-access boundary; mobile route guards are a UX/access shell, not a backend authorization substitute.

## EAS Notes

`eas.json` includes `development`, `preview`, and `production` profiles. EAS login, project initialization, credentials, native builds, and store submission are intentionally not run in this setup task.

## Branch Workflow

Work in feature branches and open pull requests. This foundation was built on `setup/expo-mobile-foundation`.

## Relationship To AMG Website And Portal

The app uses `amg1` and `https://www.amgaviationgroup.com` as read-only references. The mobile app should mirror AMG Connect concepts such as requests, aircraft, documents, quotes/invoices, messages, account access, and role-scoped visibility without copying Wix/website components directly.

## Built In This Foundation

- Expo app initialized in the repo root
- `src/app` Expo Router structure
- Supabase login, reset password request, tab placeholders, pending approval, and access denied screens
- AMG theme tokens and role helpers
- Supabase client setup, AuthProvider, role resolver, route guards, and placeholder database types
- EAS config and env example
- Required product, backend, reference, and guardrail docs
- Approved public AMG white logo copied from the live website

## Intentionally Not Built Yet

- Full dashboard data flows
- Backend mutations
- Supabase schema, RLS, storage, or migration changes
- Live tracking
- Crew availability guarantees
- Quotes, invoices, messages, notifications, maps, payments, or analytics
- App Store, Play Store, or production EAS setup
