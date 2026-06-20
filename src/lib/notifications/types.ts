export type AmgNotificationEvent =
  | "request_updated"
  | "details_requested"
  | "quote_sent"
  | "invoice_sent"
  | "document_uploaded"
  | "document_requested"
  | "message_received"
  | "crew_assignment_updated"
  | "payment_marked_received"
  | "request_completed";

export type AmgNotificationPayload = {
  accountId?: string;
  aircraftId?: string;
  documentId?: string;
  event: AmgNotificationEvent;
  invoiceId?: string;
  messageThreadId?: string;
  quoteId?: string;
  requestId?: string;
  title: string;
  updatedAt: string;
};
