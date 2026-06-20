# Build Process

## Local

```bash
npm install
npm run start
npm run ios
npm run android
npm run web
npm run typecheck
npm run lint
npm run doctor
npm run export:web
```

## Auth Setup

Create a local `.env` file from `.env.example`:

```env
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
EXPO_PUBLIC_APP_ENV=development
```

Restart the Expo dev server after changing `.env`. Never place a Supabase service-role or secret key in the mobile app.

## TypeScript

Run:

```bash
npx tsc --noEmit
```

## Validation

Safe validation commands:

```bash
npm run typecheck
npm run lint
npx expo config --json
npm run export:web
```

For Step 3 frontend export sanity checks, use:

```bash
npx expo export --platform web --output-dir /tmp/amg-connect-mobile-step3-export
```

For Step 4 frontend export sanity checks, use:

```bash
npx expo export --platform web --output-dir /tmp/amg-connect-mobile-step4-export
```

Do not run production EAS builds or store submissions as part of validation.

Use `npx expo-doctor` or `npm run doctor` for Expo dependency/configuration checks. If the command requires interactive login or proposes account actions, stop and document the blocker.

## Step 3 Notes

Client MVP screens currently use local demo data for requests and aircraft. The typed adapters are ready for real Supabase records, but request/aircraft table names, field mapping, RLS scope, and storage/document contracts must be confirmed before adding live queries or mutations.

New Support Request validates frontend fields only. The submit action remains disabled/deferred until AMG confirms whether request creation should use a table insert, RPC, Edge Function, or portal API route.

## Step 4 Notes

Documents, quotes, invoices, messages, profile, settings, legal, support, and notification-ready event types currently use local demo data or authenticated session display only. They do not add live Supabase queries or mutations.

Document open/download, quote approval, invoice payment, message send, profile edit, support submission, and push notification registration remain disabled/deferred until AMG confirms the safe backend, storage, payment, messaging, and notification contracts.

## EAS

`eas.json` includes:

- `development`
- `preview`
- `production`

Global `eas` was not installed in this environment. `npx eas-cli@latest --version` resolved to `eas-cli/20.3.0`.

Use this when account setup is approved:

```bash
npm install -g eas-cli
eas login
npx eas-cli@latest init
```

Do not submit to App Store or Google Play from this repo setup task.

## Internal Testing

Internal testing preparation lives in `docs/internal-testing-checklist.md`.

Future approved internal builds:

```bash
eas build --profile development --platform ios
eas build --profile preview --platform ios
eas build --profile preview --platform android
```

Future production commands must remain documentation-only until explicitly approved:

```bash
eas build --profile production --platform ios
eas build --profile production --platform android
eas submit --profile production --platform ios
eas submit --profile production --platform android
```
