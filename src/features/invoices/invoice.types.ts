export type InvoiceStatus = "draft" | "sent" | "due" | "paid" | "overdue" | "void" | "cancelled";

export type InvoiceLineItem = {
  amountLabel: string;
  id: string;
  label: string;
};

export type InvoiceSummary = {
  amountLabel?: string;
  documentAvailable: boolean;
  dueAt?: string;
  id: string;
  isDemo: boolean;
  relatedRequestDisplayId?: string;
  relatedRequestId?: string;
  sentAt?: string;
  status: InvoiceStatus;
  title: string;
  updatedAt: string;
};

export type InvoiceDetail = InvoiceSummary & {
  lineItems: InvoiceLineItem[];
  paymentActionAvailable: boolean;
  paymentNote: string;
  pdfActionAvailable: boolean;
};
