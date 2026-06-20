import type { MessageThreadDetail, MessageThreadSummary } from "@/features/messages/message.types";

export const demoMessageThreads: MessageThreadSummary[] = [
  {
    aircraftLabel: "Citation M2",
    id: "demo-thread-2287",
    isDemo: true,
    lastMessageAt: "2026-06-19T18:38:00.000Z",
    lastMessagePreview: "AMG Operations is reviewing crew coordination context before any assignment is confirmed.",
    relatedRequestDisplayId: "DEMO-2287",
    relatedRequestId: "demo-request-2287",
    senderContext: "AMG Operations",
    title: "Crew coordination review",
    unreadCount: 1,
  },
  {
    aircraftLabel: "Phenom 300",
    id: "demo-thread-2291",
    isDemo: true,
    lastMessageAt: "2026-06-18T21:20:00.000Z",
    lastMessagePreview: "Additional timing details will be needed before the plan review can move forward.",
    relatedRequestDisplayId: "DEMO-2291",
    relatedRequestId: "demo-request-2291",
    senderContext: "AMG Operations",
    title: "Plan review details",
    unreadCount: 0,
  },
];

export function getDemoMessageThreadById(threadId: string): MessageThreadDetail | null {
  const thread = demoMessageThreads.find((item) => item.id === threadId);
  if (!thread) return null;

  return {
    ...thread,
    messages: [
      {
        body: thread.lastMessagePreview,
        createdAt: thread.lastMessageAt,
        id: `${thread.id}-message-1`,
        senderLabel: "AMG Operations",
        senderType: "amg_operations",
      },
      {
        body: "Demo thread only. Real messages require confirmed portal messaging tables, RLS, and send workflow.",
        createdAt: thread.lastMessageAt,
        id: `${thread.id}-message-2`,
        senderLabel: "AMG Connect",
        senderType: "system",
      },
    ],
    replyAvailable: false,
  };
}
