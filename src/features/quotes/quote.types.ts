export type QuoteStatus = "draft" | "sent" | "awaiting_review" | "approved" | "declined" | "expired" | "cancelled";

export type QuoteLineItem = {
  amountLabel: string;
  id: string;
  label: string;
};

export type QuoteSummary = {
  amountLabel?: string;
  documentAvailable: boolean;
  id: string;
  isDemo: boolean;
  relatedRequestDisplayId?: string;
  relatedRequestId?: string;
  sentAt?: string;
  status: QuoteStatus;
  title: string;
  updatedAt: string;
};

export type QuoteDetail = QuoteSummary & {
  contactNote: string;
  lineItems: QuoteLineItem[];
  pdfActionAvailable: boolean;
  quoteApprovalAvailable: boolean;
};
