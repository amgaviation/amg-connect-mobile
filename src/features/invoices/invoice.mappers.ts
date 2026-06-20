import type { InvoiceDetail, InvoiceStatus, InvoiceSummary } from "@/features/invoices/invoice.types";

const invoiceStatuses: readonly InvoiceStatus[] = ["draft", "sent", "due", "paid", "overdue", "void", "cancelled"];

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function asBoolean(value: unknown) {
  return typeof value === "boolean" ? value : false;
}

function asStatus(value: unknown): InvoiceStatus {
  return invoiceStatuses.includes(value as InvoiceStatus) ? (value as InvoiceStatus) : "sent";
}

export function mapInvoiceSummaryFromRecord(value: unknown): InvoiceSummary {
  const record = asRecord(value);

  return {
    amountLabel: asString(record.amount_label),
    documentAvailable: asBoolean(record.document_available),
    dueAt: asString(record.due_at),
    id: asString(record.id) ?? asString(record.invoice_id) ?? "unknown",
    isDemo: false,
    relatedRequestDisplayId: asString(record.request_display_id),
    relatedRequestId: asString(record.request_id),
    sentAt: asString(record.sent_at),
    status: asStatus(record.status),
    title: asString(record.title) ?? "Invoice",
    updatedAt: asString(record.updated_at) ?? new Date().toISOString(),
  };
}

export function mapInvoiceDetailFromRecord(value: unknown): InvoiceDetail {
  return {
    ...mapInvoiceSummaryFromRecord(value),
    lineItems: [],
    paymentActionAvailable: false,
    paymentNote: "Payment details are managed through AMG-approved invoice instructions.",
    pdfActionAvailable: false,
  };
}
