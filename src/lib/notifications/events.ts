import type { AmgNotificationEvent, AmgNotificationPayload } from "@/lib/notifications/types";

export const amgNotificationEvents: AmgNotificationEvent[] = [
  "request_updated",
  "details_requested",
  "quote_sent",
  "invoice_sent",
  "document_uploaded",
  "document_requested",
  "message_received",
  "crew_assignment_updated",
  "payment_marked_received",
  "request_completed",
];

export function createNotificationPayloadTemplate(event: AmgNotificationEvent): AmgNotificationPayload {
  return {
    event,
    title: "AMG Connect update",
    updatedAt: new Date(0).toISOString(),
  };
}
