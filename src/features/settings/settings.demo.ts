import type { SettingsSummary } from "@/features/settings/settings.types";

export const demoSettings: SettingsSummary = {
  appVersion: "1.0.0",
  appearance: "system",
  notificationsAvailable: false,
  preferences: [
    {
      description: "Updates when support request status changes.",
      enabled: false,
      key: "request_updates",
      label: "Request updates",
      locked: true,
    },
    {
      description: "Quote and invoice availability notices.",
      enabled: false,
      key: "quotes_invoices",
      label: "Quotes and invoices",
      locked: true,
    },
    {
      description: "Document request and document availability notices.",
      enabled: false,
      key: "documents",
      label: "Documents",
      locked: true,
    },
    {
      description: "AMG Operations message notices.",
      enabled: false,
      key: "messages",
      label: "Messages",
      locked: true,
    },
  ],
};
