import type {
  RequestDetail,
  RequestStatus,
  RequestSummary,
  SupportRequestDraft,
  SupportRequestValidationErrors,
  SupportType,
} from "@/features/requests/request.types";

const supportTypes: readonly SupportType[] = [
  "Aircraft Support",
  "Crew Coordination",
  "Ferry / Repositioning",
  "Maintenance Movement Support",
  "Flight Operations Coordination",
  "Plan Review",
];

const requestStatuses: readonly RequestStatus[] = [
  "under_review",
  "awaiting_details",
  "quote_sent",
  "approved_for_coordination",
  "coordinating",
  "completed",
  "closed",
  "cancelled",
  "draft",
];

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function asSupportType(value: unknown): SupportType | undefined {
  return supportTypes.includes(value as SupportType) ? (value as SupportType) : undefined;
}

function asRequestStatus(value: unknown): RequestStatus {
  return requestStatuses.includes(value as RequestStatus) ? (value as RequestStatus) : "under_review";
}

export function mapRequestSummaryFromRecord(recordValue: unknown): RequestSummary {
  const record = asRecord(recordValue);

  return {
    aircraftId: asString(record.aircraft_id),
    aircraftLabel: asString(record.aircraft_label) ?? asString(record.aircraft_name),
    displayId: asString(record.display_id) ?? asString(record.request_number) ?? "Pending",
    id: asString(record.id) ?? asString(record.request_id) ?? "unknown",
    isDemo: false,
    lastUpdatedAt: asString(record.updated_at) ?? asString(record.last_updated_at) ?? new Date().toISOString(),
    location: asString(record.location),
    pendingAction: asString(record.pending_action),
    requestedAt: asString(record.requested_at),
    route: {
      fromAirport: asString(record.from_airport),
      toAirport: asString(record.to_airport),
    },
    shortContext: asString(record.short_context) ?? "Support request",
    status: asRequestStatus(record.status),
    supportType: asSupportType(record.support_type) ?? "Aircraft Support",
    tailNumber: asString(record.tail_number),
  };
}

export function mapRequestDetailFromRecord(recordValue: unknown): RequestDetail {
  const summary = mapRequestSummaryFromRecord(recordValue);
  const record = asRecord(recordValue);

  return {
    ...summary,
    activity: [],
    contactPreference: asString(record.contact_preference),
    crewNeeds: asString(record.crew_needs),
    documents: [],
    notes: asString(record.notes),
    quotePreview: {
      label: "Quote / invoice details will appear when available.",
      state: "not_ready",
    },
    reviewContext: asString(record.review_context) ?? "AMG Operations review is required before coordination.",
    timingFlexibility: asString(record.timing_flexibility),
  };
}

export function normalizeAirportCode(value: string) {
  return value.trim().toUpperCase();
}

export function validateSupportRequestDraft(draft: SupportRequestDraft): SupportRequestValidationErrors {
  const errors: SupportRequestValidationErrors = {};
  const supportType = draft.supportType;
  const hasAircraft = Boolean(draft.aircraftId || draft.tailNumber?.trim());
  const hasTiming = Boolean(draft.requestedDate?.trim() || draft.timingFlexibility?.trim());
  const isRouteBased =
    supportType === "Crew Coordination" ||
    supportType === "Ferry / Repositioning" ||
    supportType === "Flight Operations Coordination";
  const hasRoute = Boolean(draft.fromAirport?.trim() && draft.toAirport?.trim());
  const hasLocation = Boolean(draft.location?.trim());

  if (!supportType) errors.supportType = "Select the type of AMG support needed.";
  if (!hasAircraft) errors.tailNumber = "Select an aircraft or enter a tail number.";
  if (!hasTiming) errors.requestedDate = "Add requested timing or a timing note.";
  if (isRouteBased && !hasRoute) errors.route = "Add both departure and arrival airports.";
  if (!isRouteBased && !hasLocation && !hasRoute) errors.location = "Add a location or route context.";
  if (draft.notes.length > 800) errors.notes = "Keep notes under 800 characters.";

  return errors;
}

export function hasValidationErrors(errors: SupportRequestValidationErrors) {
  return Object.keys(errors).length > 0;
}
