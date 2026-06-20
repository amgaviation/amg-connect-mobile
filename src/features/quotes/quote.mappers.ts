import type { QuoteDetail, QuoteStatus, QuoteSummary } from "@/features/quotes/quote.types";

const quoteStatuses: readonly QuoteStatus[] = [
  "draft",
  "sent",
  "awaiting_review",
  "approved",
  "declined",
  "expired",
  "cancelled",
];

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function asBoolean(value: unknown) {
  return typeof value === "boolean" ? value : false;
}

function asStatus(value: unknown): QuoteStatus {
  return quoteStatuses.includes(value as QuoteStatus) ? (value as QuoteStatus) : "awaiting_review";
}

export function mapQuoteSummaryFromRecord(value: unknown): QuoteSummary {
  const record = asRecord(value);

  return {
    amountLabel: asString(record.amount_label),
    documentAvailable: asBoolean(record.document_available),
    id: asString(record.id) ?? asString(record.quote_id) ?? "unknown",
    isDemo: false,
    relatedRequestDisplayId: asString(record.request_display_id),
    relatedRequestId: asString(record.request_id),
    sentAt: asString(record.sent_at),
    status: asStatus(record.status),
    title: asString(record.title) ?? "Quote",
    updatedAt: asString(record.updated_at) ?? new Date().toISOString(),
  };
}

export function mapQuoteDetailFromRecord(value: unknown): QuoteDetail {
  return {
    ...mapQuoteSummaryFromRecord(value),
    contactNote: "Quote actions will appear after backend mapping is confirmed.",
    lineItems: [],
    pdfActionAvailable: false,
    quoteApprovalAvailable: false,
  };
}
