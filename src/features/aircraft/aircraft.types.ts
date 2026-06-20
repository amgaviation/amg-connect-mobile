import type { RequestSummary } from "@/features/requests/request.types";

export type AircraftStatus = "active" | "review" | "inactive" | "unavailable";

export type AircraftDocumentPreview = {
  id: string;
  label: string;
  status: "available" | "pending";
};

export type AircraftSummary = {
  baseAirport?: string;
  category: string;
  id: string;
  isDemo: boolean;
  latestActivity?: string;
  makeModel: string;
  status: AircraftStatus;
  tailNumber?: string;
};

export type AircraftDetail = AircraftSummary & {
  documents: AircraftDocumentPreview[];
  recentRequests: RequestSummary[];
  supportContext: string;
};
