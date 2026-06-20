# Build Process

## Local

```bash
npm install
npm run start
npm run ios
npm run android
npm run web
npm run lint
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

Safe Step 2 validation commands:

```bash
npx tsc --noEmit
npm run lint
npx expo config --json
```

Do not run production EAS builds or store submissions as part of auth validation.

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
