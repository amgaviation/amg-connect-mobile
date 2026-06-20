import { ChevronRight, MessageSquare } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { StatusBadge } from "@/components/status/StatusBadge";
import type { MessageThreadSummary } from "@/features/messages/message.types";
import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";
import { formatRelativeDate } from "@/lib/utils/format";

type MessageThreadItemProps = {
  onPress: () => void;
  thread: MessageThreadSummary;
};

export function MessageThreadItem({ onPress, thread }: MessageThreadItemProps) {
  return (
    <Pressable
      accessibilityLabel={`Open message thread ${thread.title}`}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={styles.iconWrap}>
        <MessageSquare color={colors.amg.accentBlue} size={20} />
      </View>
      <View style={styles.main}>
        <View style={styles.topRow}>
          <Text selectable style={styles.title}>
            {thread.title}
          </Text>
          {thread.unreadCount > 0 ? <StatusBadge type="demo" label={`${thread.unreadCount} new`} /> : null}
        </View>
        <Text selectable style={styles.preview}>
          {thread.lastMessagePreview}
        </Text>
        <Text selectable style={styles.meta}>
          {thread.senderContext} · {thread.relatedRequestDisplayId ?? thread.aircraftLabel ?? "Account"} ·{" "}
          {formatRelativeDate(thread.lastMessageAt)}
        </Text>
      </View>
      <ChevronRight color={colors.amg.slateGray} size={20} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    alignItems: "center",
    backgroundColor: colors.amg.deepBlue,
    borderColor: colors.dark.border,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  main: {
    flex: 1,
    gap: spacing[2],
  },
  meta: {
    color: colors.dark.textMuted,
    fontSize: typography.sizes.xs,
    lineHeight: 16,
  },
  pressed: {
    opacity: 0.82,
  },
  preview: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.sm,
    lineHeight: 20,
  },
  row: {
    alignItems: "flex-start",
    backgroundColor: colors.dark.surface,
    borderColor: colors.dark.border,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    gap: spacing[3],
    padding: spacing[4],
  },
  title: {
    color: colors.dark.text,
    flex: 1,
    fontSize: typography.sizes.lg,
    fontWeight: "700",
    lineHeight: 24,
  },
  topRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing[2],
  },
});
