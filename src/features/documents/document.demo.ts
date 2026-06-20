import type { DocumentCategory, DocumentDetail, DocumentSummary } from "@/features/documents/document.types";

export const demoDocuments: DocumentSummary[] = [
  {
    category: "Aircraft Documents",
    fileType: "PDF",
    id: "demo-doc-aircraft-profile",
    isDemo: true,
    relatedAircraftId: "demo-aircraft-citation-m2",
    relatedAircraftLabel: "Citation M2",
    status: "available",
    title: "Aircraft profile packet",
    updatedAt: "2026-06-18T17:30:00.000Z",
    visibilityLabel: "Client account document",
  },
  {
    category: "Support Documents",
    fileType: "PDF",
    id: "demo-doc-request-review",
    isDemo: true,
    relatedRequestDisplayId: "DEMO-2287",
    relatedRequestId: "demo-request-2287",
    status: "pending_review",
    title: "Crew coordination review packet",
    updatedAt: "2026-06-19T18:24:00.000Z",
    visibilityLabel: "Request-linked document",
  },
  {
    category: "Insurance",
    fileType: "PDF",
    id: "demo-doc-insurance",
    isDemo: true,
    relatedAircraftId: "demo-aircraft-phenom-300",
    relatedAircraftLabel: "Phenom 300",
    status: "updated",
    title: "Insurance certificate",
    updatedAt: "2026-06-14T15:20:00.000Z",
    visibilityLabel: "Client account document",
  },
  {
    category: "Invoices & Receipts",
    fileType: "PDF",
    id: "demo-doc-invoice-placeholder",
    isDemo: true,
    relatedRequestDisplayId: "DEMO-2264",
    relatedRequestId: "demo-request-2264",
    status: "archived",
    title: "Support invoice receipt",
    updatedAt: "2026-06-10T20:45:00.000Z",
    visibilityLabel: "Finance document",
  },
];

export const documentCategories: DocumentCategory[] = [
  "Aircraft Documents",
  "Insurance",
  "Agreements",
  "Maintenance Context",
  "Crew Credentials",
  "Invoices & Receipts",
  "Support Documents",
  "Other",
];

export function getDemoDocumentById(documentId: string): DocumentDetail | null {
  const document = demoDocuments.find((item) => item.id === documentId);
  if (!document) return null;

  return {
    ...document,
    description:
      "Demo document metadata only. Real document access must use confirmed AMG Supabase Storage policies and signed-access behavior before opening or downloading files.",
    downloadActionAvailable: false,
    openActionAvailable: false,
  };
}

export function getDocumentsForCategory(category: DocumentCategory) {
  return demoDocuments.filter((document) => document.category === category);
}
