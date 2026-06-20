import type { InvoiceDetail, InvoiceSummary } from "@/features/invoices/invoice.types";

export const demoInvoices: InvoiceSummary[] = [
  {
    amountLabel: "See AMG invoice",
    documentAvailable: false,
    dueAt: "2026-07-01T16:00:00.000Z",
    id: "demo-invoice-2264",
    isDemo: true,
    relatedRequestDisplayId: "DEMO-2264",
    relatedRequestId: "demo-request-2264",
    sentAt: "2026-06-12T16:30:00.000Z",
    status: "sent",
    title: "Aircraft support invoice",
    updatedAt: "2026-06-12T16:30:00.000Z",
  },
  {
    amountLabel: "Receipt pending",
    documentAvailable: false,
    id: "demo-invoice-receipt",
    isDemo: true,
    relatedRequestDisplayId: "DEMO-2287",
    relatedRequestId: "demo-request-2287",
    status: "draft",
    title: "Crew coordination invoice",
    updatedAt: "2026-06-19T18:24:00.000Z",
  },
];

export function getDemoInvoiceById(invoiceId: string): InvoiceDetail | null {
  const invoice = demoInvoices.find((item) => item.id === invoiceId);
  if (!invoice) return null;

  return {
    ...invoice,
    lineItems: [
      {
        amountLabel: invoice.amountLabel ?? "Pending",
        id: `${invoice.id}-line-support`,
        label: "AMG support activity",
      },
    ],
    paymentActionAvailable: false,
    paymentNote: "Payment details are managed through AMG-approved invoice instructions. Contact AMG Operations for payment questions.",
    pdfActionAvailable: false,
  };
}
