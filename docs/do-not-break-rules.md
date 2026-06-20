# Do Not Break Rules

- Do not work on `main` for feature setup.
- Do not commit secrets.
- Do not use service-role Supabase keys in mobile code.
- Do not modify `amg1`.
- Do not modify the live website.
- Do not change Supabase schema, auth, RLS, storage policies, or APIs from this repo.
- Do not create Apple, Google, Expo, GitHub, or Supabase credentials without approval.
- Do not run production EAS builds or store submissions without approval.
- Do not invent AMG branding, app icons, logos, backend tables, or role names.
- Do not present a request, mission, crew assignment, or support path as accepted before AMG review.
- Do not treat mobile route guards as a replacement for Supabase RLS.
- Do not use user-editable metadata as the final authorization source without AMG backend confirmation.
- Do not create separate mobile auth, credentials, roles, storage buckets, or storage policies when the portal already defines the shared source.
- Do not hardcode production request, aircraft, document, quote, invoice, message, or user records in the mobile app.
- Do not make New Support Request appear submitted to AMG until a confirmed backend mutation or API route is implemented.
- Do not add request/aircraft queries that fetch broad or global data without confirmed role scope and RLS behavior.
- Do not expose Supabase Storage paths, public file URLs, cross-client documents, internal-only files, or crew credentials unless the portal contract explicitly permits it.
- Do not add quote approval, invoice payment, card collection, message sending, profile editing, support submission, or push notification delivery without a confirmed safe backend path.
