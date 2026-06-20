import { colors } from "@/lib/theme/colors";

import type { AircraftStatus } from "@/features/aircraft/aircraft.types";
import type { RequestStatus } from "@/features/requests/request.types";

export type StatusTone = "info" | "attention" | "success" | "closed" | "danger";

export type StatusMeta = {
  backgroundColor: string;
  borderColor: string;
  label: string;
  textColor: string;
  tone: StatusTone;
};

const toneStyles: Record<StatusTone, Omit<StatusMeta, "label" | "tone">> = {
  attention: {
    backgroundColor: colors.amg.deepBlue,
    borderColor: colors.amg.lightGray,
    textColor: colors.amg.white,
  },
  closed: {
    backgroundColor: colors.amg.midnightNavy,
    borderColor: colors.amg.slateGray,
    textColor: colors.amg.lightGray,
  },
  danger: {
    backgroundColor: colors.amg.midnightNavy,
    borderColor: colors.amg.lightGray,
    textColor: colors.amg.lightGray,
  },
  info: {
    backgroundColor: colors.amg.deepBlue,
    borderColor: colors.amg.accentBlue,
    textColor: colors.amg.white,
  },
  success: {
    backgroundColor: colors.amg.deepBlue,
    borderColor: colors.amg.accentBlue,
    textColor: colors.amg.white,
  },
};

const requestStatusLabels: Record<RequestStatus, { label: string; tone: StatusTone }> = {
  approved_for_coordination: { label: "Approved for Coordination", tone: "success" },
  awaiting_details: { label: "Awaiting Details", tone: "attention" },
  cancelled: { label: "Cancelled", tone: "danger" },
  closed: { label: "Closed", tone: "closed" },
  completed: { label: "Completed", tone: "success" },
  coordinating: { label: "Coordinating", tone: "info" },
  draft: { label: "Draft", tone: "closed" },
  quote_sent: { label: "Quote Sent", tone: "attention" },
  under_review: { label: "Under Review", tone: "info" },
};

const aircraftStatusLabels: Record<AircraftStatus, { label: string; tone: StatusTone }> = {
  active: { label: "Active", tone: "success" },
  inactive: { label: "Inactive", tone: "closed" },
  review: { label: "Under Review", tone: "attention" },
  unavailable: { label: "Unavailable", tone: "closed" },
};

function toMeta(label: string, tone: StatusTone): StatusMeta {
  return {
    ...toneStyles[tone],
    label,
    tone,
  };
}

export function getRequestStatusMeta(status: RequestStatus) {
  const meta = requestStatusLabels[status];
  return toMeta(meta.label, meta.tone);
}

export function getAircraftStatusMeta(status: AircraftStatus) {
  const meta = aircraftStatusLabels[status];
  return toMeta(meta.label, meta.tone);
}
