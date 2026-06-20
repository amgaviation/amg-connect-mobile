export type MessageSenderType = "client" | "amg_operations" | "system";

export type MessageItem = {
  body: string;
  createdAt: string;
  id: string;
  senderLabel: string;
  senderType: MessageSenderType;
};

export type MessageThreadSummary = {
  aircraftLabel?: string;
  id: string;
  isDemo: boolean;
  lastMessageAt: string;
  lastMessagePreview: string;
  relatedRequestDisplayId?: string;
  relatedRequestId?: string;
  senderContext: string;
  title: string;
  unreadCount: number;
};

export type MessageThreadDetail = MessageThreadSummary & {
  messages: MessageItem[];
  replyAvailable: boolean;
};
