import type { AircraftDetail, AircraftStatus, AircraftSummary } from "@/features/aircraft/aircraft.types";

const aircraftStatuses: readonly AircraftStatus[] = ["active", "review", "inactive", "unavailable"];

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function asAircraftStatus(value: unknown): AircraftStatus {
  return aircraftStatuses.includes(value as AircraftStatus) ? (value as AircraftStatus) : "review";
}

export function mapAircraftSummaryFromRecord(value: unknown): AircraftSummary {
  const record = asRecord(value);

  return {
    baseAirport: asString(record.base_airport),
    category: asString(record.category) ?? asString(record.aircraft_class) ?? "Aircraft",
    id: asString(record.id) ?? asString(record.aircraft_id) ?? "unknown",
    isDemo: false,
    latestActivity: asString(record.latest_activity),
    makeModel: asString(record.make_model) ?? asString(record.model) ?? "Aircraft",
    status: asAircraftStatus(record.status),
    tailNumber: asString(record.tail_number),
  };
}

export function mapAircraftDetailFromRecord(value: unknown): AircraftDetail {
  return {
    ...mapAircraftSummaryFromRecord(value),
    documents: [],
    recentRequests: [],
    supportContext: "Aircraft support details will appear after backend mapping is confirmed.",
  };
}
