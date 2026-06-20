export type NotificationPreferenceKey =
  | "request_updates"
  | "quotes_invoices"
  | "documents"
  | "messages"
  | "operations_alerts";

export type NotificationPreference = {
  description: string;
  enabled: boolean;
  key: NotificationPreferenceKey;
  label: string;
  locked: boolean;
};

export type SettingsSummary = {
  appVersion: string;
  appearance: "system";
  notificationsAvailable: boolean;
  preferences: NotificationPreference[];
};
