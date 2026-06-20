import { demoAircraft } from "@/features/aircraft/aircraft.demo";
import type { RequestDetail, RequestSummary } from "@/features/requests/request.types";

export const demoRequests: RequestSummary[] = [
  {
    aircraftId: "demo-aircraft-citation-m2",
    aircraftLabel: "Citation M2",
    displayId: "DEMO-2287",
    id: "demo-request-2287",
    isDemo: true,
    lastUpdatedAt: "2026-06-19T18:24:00.000Z",
    pendingAction: "AMG review",
    requestedAt: "2026-06-24T14:00:00.000Z",
    route: {
      fromAirport: "KTEB",
      toAirport: "KMIA",
    },
    shortContext: "Crew coordination and route support under review.",
    status: "under_review",
    supportType: "Crew Coordination",
    tailNumber: "N826AM",
  },
  {
    aircraftId: "demo-aircraft-phenom-300",
    aircraftLabel: "Phenom 300",
    displayId: "DEMO-2291",
    id: "demo-request-2291",
    isDemo: true,
    lastUpdatedAt: "2026-06-18T21:10:00.000Z",
    location: "KPMP",
    pendingAction: "Client details needed",
    requestedAt: "2026-06-26T16:30:00.000Z",
    shortContext: "Plan review awaiting timing and crew detail confirmation.",
    status: "awaiting_details",
    supportType: "Plan Review",
    tailNumber: "N410AG",
  },
  {
    aircraftId: "demo-aircraft-citation-m2",
    aircraftLabel: "Citation M2",
    displayId: "DEMO-2264",
    id: "demo-request-2264",
    isDemo: true,
    lastUpdatedAt: "2026-06-10T20:45:00.000Z",
    location: "KOPF",
    requestedAt: "2026-06-12T13:00:00.000Z",
    shortContext: "Aircraft support request closed after AMG review.",
    status: "closed",
    supportType: "Aircraft Support",
    tailNumber: "N826AM",
  },
];

export function getDemoRequestById(requestId: string): RequestDetail | null {
  const request = demoRequests.find((item) => item.id === requestId);
  if (!request) return null;

  return {
    ...request,
    activity: [
      {
        body: "AMG Operations is reviewing aircraft status, timing, and support scope before any coordination is treated as accepted.",
        createdAt: request.lastUpdatedAt,
        id: `${request.id}-activity-review`,
        title: "Review in progress",
        tone: "info",
      },
      {
        body: "Documents and quote details will appear after backend mapping confirms the portal data source.",
        createdAt: request.lastUpdatedAt,
        id: `${request.id}-activity-docs`,
        title: "Data mapping pending",
        tone: "closed",
      },
    ],
    contactPreference: "Portal message",
    crewNeeds:
      request.supportType === "Crew Coordination"
        ? "Crew coordination context requested. Assignment is not guaranteed."
        : undefined,
    documents: [
      {
        id: `${request.id}-doc-request`,
        label: "Request documents",
        status: "pending",
      },
    ],
    notes:
      "Demo request content only. Real request notes must come from the AMG Connect backend after table and field mapping is confirmed.",
    quotePreview: {
      label: "Quote / invoice preview will connect after backend mapping.",
      state: request.status === "quote_sent" ? "sent" : "not_ready",
    },
    reviewContext:
      "Requests remain subject to aircraft status, crew availability, owner/operator approval, route and airport constraints, weather, support-scope review, and final acceptance.",
    timingFlexibility: "Timing may shift after AMG review.",
  };
}

export function getDemoRequestsForAircraft(aircraftId: string) {
  return demoRequests.filter((request) => request.aircraftId === aircraftId);
}

export function getPrimaryDemoAircraft() {
  return demoAircraft[0] ?? null;
}
