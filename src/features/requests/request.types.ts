import type { RequestActivityItem } from "@/features/activity/activity.types";

export type RequestStatus =
  | "under_review"
  | "awaiting_details"
  | "quote_sent"
  | "approved_for_coordination"
  | "coordinating"
  | "completed"
  | "closed"
  | "cancelled"
  | "draft";

export type SupportType =
  | "Aircraft Support"
  | "Crew Coordination"
  | "Ferry / Repositioning"
  | "Maintenance Movement Support"
  | "Flight Operations Coordination"
  | "Plan Review";

export type RequestRoute = {
  fromAirport?: string;
  toAirport?: string;
};

export type RequestPreviewDocument = {
  id: string;
  label: string;
  status: "available" | "pending";
};

export type RequestSummary = {
  aircraftId?: string;
  aircraftLabel?: string;
  displayId: string;
  id: string;
  isDemo: boolean;
  lastUpdatedAt: string;
  location?: string;
  pendingAction?: string;
  requestedAt?: string;
  route?: RequestRoute;
  shortContext: string;
  status: RequestStatus;
  supportType: SupportType;
  tailNumber?: string;
};

export type RequestDetail = RequestSummary & {
  activity: RequestActivityItem[];
  contactPreference?: string;
  crewNeeds?: string;
  documents: RequestPreviewDocument[];
  notes?: string;
  quotePreview?: {
    label: string;
    state: "not_ready" | "pending" | "sent";
  };
  reviewContext: string;
  timingFlexibility?: string;
};

export type SupportRequestDraft = {
  aircraftId?: string;
  contactPreference: "Email" | "Phone" | "Portal message";
  crewNeeds?: string;
  fromAirport?: string;
  location?: string;
  maintenanceMovement: boolean;
  notes: string;
  requestedDate?: string;
  requestedTime?: string;
  supportType?: SupportType;
  tailNumber?: string;
  timingFlexibility?: string;
  toAirport?: string;
};

export type SupportRequestValidationErrors = Partial<Record<keyof SupportRequestDraft | "route", string>>;
