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

## TypeScript

Run:

```bash
npx tsc --noEmit
```

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
