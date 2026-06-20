import type { AircraftDetail, AircraftSummary } from "@/features/aircraft/aircraft.types";

export const demoAircraft: AircraftSummary[] = [
  {
    baseAirport: "KPMP",
    category: "Light Jet",
    id: "demo-aircraft-citation-m2",
    isDemo: true,
    latestActivity: "Support request under review",
    makeModel: "Citation M2",
    status: "active",
    tailNumber: "N826AM",
  },
  {
    baseAirport: "KTEB",
    category: "Midsize Jet",
    id: "demo-aircraft-phenom-300",
    isDemo: true,
    latestActivity: "Plan review awaiting details",
    makeModel: "Phenom 300",
    status: "review",
    tailNumber: "N410AG",
  },
];

export function getDemoAircraftById(aircraftId: string): AircraftDetail | null {
  const aircraft = demoAircraft.find((item) => item.id === aircraftId);
  if (!aircraft) return null;

  return {
    ...aircraft,
    documents: [
      {
        id: `${aircraft.id}-doc-profile`,
        label: "Aircraft profile",
        status: "pending",
      },
      {
        id: `${aircraft.id}-doc-support`,
        label: "Support documents",
        status: "pending",
      },
    ],
    recentRequests: [],
    supportContext:
      "Aircraft details are demo-only until AMG confirms the portal aircraft table, fields, and RLS-backed client scope.",
  };
}
