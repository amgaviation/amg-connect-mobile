# Notification Plan

AMG Connect Mobile now includes notification-ready event types only. It does not register Expo push tokens, store push tokens, send push notifications, create webhooks, or change backend infrastructure.

## Planned Events

- `request_updated`
- `details_requested`
- `quote_sent`
- `invoice_sent`
- `document_uploaded`
- `document_requested`
- `message_received`
- `crew_assignment_updated`
- `payment_marked_received`
- `request_completed`

Type definitions live in:

- `src/lib/notifications/types.ts`
- `src/lib/notifications/events.ts`

## Future Backend Requirements

Before production notifications are enabled, AMG needs a reviewed backend design for:

- Device token registration and revocation
- User/account/device association under RLS
- Notification event source of truth
- Delivery provider and retry behavior
- Opt-in/opt-out preference storage
- Message/document/quote/invoice visibility checks before dispatch
- Audit logging and privacy handling

Do not add token registration, push delivery, notification tables, webhooks, Edge Functions, or production notification tests from the mobile repo until this design is approved.
