export type DocumentCategory =
  | "Aircraft Documents"
  | "Insurance"
  | "Agreements"
  | "Maintenance Context"
  | "Crew Credentials"
  | "Invoices & Receipts"
  | "Support Documents"
  | "Other";

export type DocumentStatus = "available" | "pending_review" | "missing" | "expired" | "updated" | "archived";

export type DocumentSummary = {
  category: DocumentCategory;
  fileType: string;
  id: string;
  isDemo: boolean;
  relatedAircraftId?: string;
  relatedAircraftLabel?: string;
  relatedRequestDisplayId?: string;
  relatedRequestId?: string;
  status: DocumentStatus;
  title: string;
  updatedAt: string;
  visibilityLabel: string;
};

export type DocumentDetail = DocumentSummary & {
  description: string;
  downloadActionAvailable: boolean;
  openActionAvailable: boolean;
};
