import type { QuoteDetail, QuoteSummary } from "@/features/quotes/quote.types";

export const demoQuotes: QuoteSummary[] = [
  {
    amountLabel: "Amount pending",
    documentAvailable: false,
    id: "demo-quote-2287",
    isDemo: true,
    relatedRequestDisplayId: "DEMO-2287",
    relatedRequestId: "demo-request-2287",
    sentAt: "2026-06-19T19:10:00.000Z",
    status: "sent",
    title: "Crew coordination quote",
    updatedAt: "2026-06-19T19:10:00.000Z",
  },
  {
    amountLabel: "Scope under review",
    documentAvailable: false,
    id: "demo-quote-2291",
    isDemo: true,
    relatedRequestDisplayId: "DEMO-2291",
    relatedRequestId: "demo-request-2291",
    status: "awaiting_review",
    title: "Plan review support estimate",
    updatedAt: "2026-06-18T21:10:00.000Z",
  },
];

export function getDemoQuoteById(quoteId: string): QuoteDetail | null {
  const quote = demoQuotes.find((item) => item.id === quoteId);
  if (!quote) return null;

  return {
    ...quote,
    contactNote:
      "Quote approval and PDF access are deferred until AMG confirms the portal quote workflow and client-safe document access path.",
    lineItems: [
      {
        amountLabel: quote.amountLabel ?? "Pending",
        id: `${quote.id}-line-review`,
        label: "AMG support scope review",
      },
    ],
    pdfActionAvailable: false,
    quoteApprovalAvailable: false,
  };
}
