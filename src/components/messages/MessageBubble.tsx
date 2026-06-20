import { StyleSheet, Text, View } from "react-native";

import type { MessageItem } from "@/features/messages/message.types";
import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";
import { formatShortDateTime } from "@/lib/utils/format";

type MessageBubbleProps = {
  message: MessageItem;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const isClient = message.senderType === "client";

  return (
    <View style={[styles.wrap, isClient && styles.wrapClient]}>
      <View style={[styles.bubble, isClient && styles.clientBubble]}>
        <Text selectable style={styles.sender}>
          {message.senderLabel}
        </Text>
        <Text selectable style={styles.body}>
          {message.body}
        </Text>
        <Text selectable style={styles.time}>
          {formatShortDateTime(message.createdAt)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    color: colors.dark.text,
    fontSize: typography.sizes.md,
    lineHeight: 22,
  },
  bubble: {
    backgroundColor: colors.dark.surface,
    borderColor: colors.dark.border,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    gap: spacing[2],
    maxWidth: "92%",
    padding: spacing[4],
  },
  clientBubble: {
    backgroundColor: colors.amg.deepBlue,
    borderColor: colors.amg.accentBlue,
  },
  sender: {
    color: colors.dark.textMuted,
    fontSize: typography.sizes.xs,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  time: {
    color: colors.dark.textMuted,
    fontSize: typography.sizes.xs,
  },
  wrap: {
    alignItems: "flex-start",
  },
  wrapClient: {
    alignItems: "flex-end",
  },
});
