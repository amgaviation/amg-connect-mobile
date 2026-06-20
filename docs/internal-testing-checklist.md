# Internal Testing Checklist

## Local Simulator Testing

1. Install dependencies with `npm install`.
2. Create `.env` from `.env.example` using client-safe Supabase values.
3. Run `npm run start`.
4. Open iOS or Android from Expo CLI, or run `npm run ios` / `npm run android`.
5. Confirm app launch has no fatal Metro or route errors.

## Physical Device Testing

1. Start Expo with `npm run start`.
2. Scan the QR code in Expo Go for basic JavaScript/runtime validation.
3. Use an EAS development build for any native behavior not supported by Expo Go.
4. Do not submit to TestFlight or Google Play from this checklist.

## Expo Go Limitations

- Expo Go is suitable for route, UI, auth, and demo-data review.
- Production push notifications are not enabled.
- Store credentials, Apple entitlements, Google Play signing, and production submissions are out of scope.

## Development Build Notes

Future command when account access and credentials are approved:

```bash
eas build --profile development --platform ios
```

Preview/internal distribution commands for later:

```bash
eas build --profile preview --platform ios
eas build --profile preview --platform android
```

Do not run production builds or submits without explicit approval.

## Login Test Cases

- Missing env values show the login screen with a clear configuration message.
- Valid approved user can sign in and reach tabs.
- Invalid credentials show a safe error message.
- Password reset screen opens and validates email input.
- Sign out returns to login.

## Role Test Cases

- `client` with approved status reaches the tab shell.
- `crew` with approved status reaches the tab shell without crew assignment tools.
- `admin`, `amg_operations`, and `super_admin` see restrained operations notes only.
- Pending approval routes to Pending Approval.
- Denied, suspended, inactive, rejected, disabled, unknown, or missing role routes to Access Denied.
- Super Admin Website Editor remains desktop portal-first.

## Client Journey Test Cases

- Home renders summary cards and active support activity.
- Requests list filters/searches and opens request detail.
- New Support Request validates required frontend fields and keeps submission deferred.
- Aircraft list opens aircraft detail.
- Documents tab shows categories, search, and document detail.
- Quotes and invoices open read-only detail screens.
- Messages list opens read-only thread detail.
- More opens Profile, Messages, Quotes, Invoices, Settings, Support, Legal, and Sign Out.

## Known Backend And Demo Data Limitations

- Business records are demo data until AMG confirms Supabase table/API mappings.
- Document files do not open or download until storage bucket and signed URL rules are confirmed.
- Quote approval, invoice payment, and message sending are disabled.
- Notification preferences are placeholders only.
- Profile editing is not enabled.

## Known Deferred Features

- Live request submission
- Full document vault storage access
- Quote approval
- Payment processing
- Messaging send/reply
- Push notifications
- Crew/admin/operations mobile tools
- TestFlight/App Store/Google Play submission

## Bugs And Follow-Ups

- Confirm Apple/Google final bundle/package ownership.
- Replace temporary icon/splash usage with final approved AMG app assets.
- Confirm production Supabase table and field mapping for each data area.
- Confirm Supabase Storage bucket and policy model.
- Confirm push notification backend design before token registration.
