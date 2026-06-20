import type { DocumentCategory, DocumentDetail, DocumentStatus, DocumentSummary } from "@/features/documents/document.types";

const documentCategories: readonly DocumentCategory[] = [
  "Aircraft Documents",
  "Insurance",
  "Agreements",
  "Maintenance Context",
  "Crew Credentials",
  "Invoices & Receipts",
  "Support Documents",
  "Other",
];

const documentStatuses: readonly DocumentStatus[] = [
  "available",
  "pending_review",
  "missing",
  "expired",
  "updated",
  "archived",
];

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function asCategory(value: unknown): DocumentCategory {
  return documentCategories.includes(value as DocumentCategory) ? (value as DocumentCategory) : "Other";
}

function asStatus(value: unknown): DocumentStatus {
  return documentStatuses.includes(value as DocumentStatus) ? (value as DocumentStatus) : "pending_review";
}

export function mapDocumentSummaryFromRecord(value: unknown): DocumentSummary {
  const record = asRecord(value);

  return {
    category: asCategory(record.category),
    fileType: asString(record.file_type) ?? "Document",
    id: asString(record.id) ?? asString(record.document_id) ?? "unknown",
    isDemo: false,
    relatedAircraftId: asString(record.aircraft_id),
    relatedAircraftLabel: asString(record.aircraft_label),
    relatedRequestDisplayId: asString(record.request_display_id),
    relatedRequestId: asString(record.request_id),
    status: asStatus(record.status),
    title: asString(record.title) ?? "Document",
    updatedAt: asString(record.updated_at) ?? new Date().toISOString(),
    visibilityLabel: asString(record.visibility_label) ?? "Approved account access",
  };
}

export function mapDocumentDetailFromRecord(value: unknown): DocumentDetail {
  const record = asRecord(value);

  return {
    ...mapDocumentSummaryFromRecord(value),
    description: asString(record.description) ?? "Document details will appear after backend mapping is confirmed.",
    downloadActionAvailable: false,
    openActionAvailable: false,
  };
}
