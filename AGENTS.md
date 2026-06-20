# AMG Connect Mobile Agent Rules

This is AMG Connect Mobile.

Use Expo React Native, TypeScript, Expo Router, and Supabase client scaffolding.

Follow the AMG Global Interface Standard in `docs/amg-global-interface-standard.md`.

Use official AMG colors only:

- AMG Midnight Navy `#050B14`
- AMG Deep Blue `#07111F`
- AMG Accent Blue `#3B82F6`
- AMG Slate Gray `#9CA3AF`
- AMG Light Gray `#C0C7D1`
- AMG White `#FFFFFF`

Do not use yellow or gold.

Use only the real approved AMG logo. Do not invent, redraw, distort, recolor, or generate logos.

Do not invent backend schema.

Do not change the Supabase backend from this repo.

Do not weaken auth, RLS, storage policies, role checks, or account approval rules.

Do not fabricate live tracking, instant crew availability, operational acceptance, or guaranteed support.

Roles must match the portal/Supabase role model: `client`, `crew`, `admin`, `amg_operations`, `super_admin`.

Heavy Super Admin and Website Editor tools remain desktop portal-first unless explicitly requested.

Use `amg1` and the live AMG website as read-only references when accessible.

Make code changes only in `amg-connect-mobile`.

Work in branches and open PRs.

Do not commit secrets.

For release hardening, internal testing, or EAS readiness work:

- Do not run production EAS builds, `eas submit`, TestFlight submission, or Google Play submission without explicit approval.
- Treat `com.amgaviationgroup.connect` as a configured placeholder until Apple/Google account ownership is confirmed.
- Keep push notification registration and token storage deferred until the backend notification plan is approved.
- Keep demo data clearly marked and avoid real client, crew, tail, invoice, quote, document, phone, or email data.

## Codex Cloud Workflow

- GitHub repository `amgaviation/amg-connect-mobile` is the source of truth.
- Codex must not rely on local MacBook files.
- npm is the package manager because `package-lock.json` is present.
- Use `npm ci` for clean validation.
- Every coding task should use a separate branch or Codex PR workflow.
- Required checks before completion are:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run export:web`
- Do not commit `.env` files, credentials, generated native folders, `node_modules`, Expo output, or build artifacts.
- Do not run production EAS builds or submissions without explicit approval.
- Preserve existing app behavior unless the task explicitly authorizes changes.
- Save completed work through Codex’s PR workflow before usage runs out.
