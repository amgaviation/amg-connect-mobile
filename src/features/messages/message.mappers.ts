import type { MessageThreadDetail, MessageThreadSummary } from "@/features/messages/message.types";

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function asNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

export function mapMessageThreadSummaryFromRecord(value: unknown): MessageThreadSummary {
  const record = asRecord(value);

  return {
    aircraftLabel: asString(record.aircraft_label),
    id: asString(record.id) ?? asString(record.thread_id) ?? "unknown",
    isDemo: false,
    lastMessageAt: asString(record.last_message_at) ?? new Date().toISOString(),
    lastMessagePreview: asString(record.last_message_preview) ?? "Message preview pending",
    relatedRequestDisplayId: asString(record.request_display_id),
    relatedRequestId: asString(record.request_id),
    senderContext: asString(record.sender_context) ?? "AMG Operations",
    title: asString(record.title) ?? "Message thread",
    unreadCount: asNumber(record.unread_count),
  };
}

export function mapMessageThreadDetailFromRecord(value: unknown): MessageThreadDetail {
  return {
    ...mapMessageThreadSummaryFromRecord(value),
    messages: [],
    replyAvailable: false,
  };
}
