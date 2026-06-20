# AMG Connect Mobile

AMG Connect Mobile is the Expo React Native foundation for AMG Aviation Group's future iOS and Android companion app. It is intended to align with the AMG public website and AMG Connect portal while staying mobile-native, minimal, premium, and operational.

## Tech Stack

- Expo React Native with TypeScript
- Expo Router under `src/app`
- Supabase client scaffold only
- Expo SecureStore and AsyncStorage-ready auth storage scaffold
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

## Supabase Plan

This repo only scaffolds the mobile Supabase client. Future work must connect to the existing approved AMG Supabase project, import generated TypeScript types, and map roles/storage/RLS to the web portal contract before adding real auth or data flows.

## EAS Notes

`eas.json` includes `development`, `preview`, and `production` profiles. EAS login, project initialization, credentials, native builds, and store submission are intentionally not run in this setup task.

## Branch Workflow

Work in feature branches and open pull requests. This foundation was built on `setup/expo-mobile-foundation`.

## Relationship To AMG Website And Portal

The app uses `amg1` and `https://www.amgaviationgroup.com` as read-only references. The mobile app should mirror AMG Connect concepts such as requests, aircraft, documents, quotes/invoices, messages, account access, and role-scoped visibility without copying Wix/website components directly.

## Built In This Foundation

- Expo app initialized in the repo root
- `src/app` Expo Router structure
- Login, reset password, tab placeholders, pending approval, and access denied screens
- AMG theme tokens and role helpers
- Supabase client scaffold and placeholder database types
- EAS config and env example
- Required product, backend, reference, and guardrail docs
- Approved public AMG white logo copied from the live website

## Intentionally Not Built Yet

- Real authentication
- Backend queries or mutations
- Supabase schema, RLS, storage, or migration changes
- Live tracking
- Crew availability guarantees
- Quotes, invoices, messages, notifications, maps, payments, or analytics
- App Store, Play Store, or production EAS setup
