import { StyleSheet, Text, View } from "react-native";

import type { RequestActivityItem } from "@/features/activity/activity.types";
import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";
import { formatShortDateTime } from "@/lib/utils/format";

type ActivityListProps = {
  items: RequestActivityItem[];
};

export function ActivityList({ items }: ActivityListProps) {
  if (!items.length) {
    return (
      <Text selectable style={styles.empty}>
        Updates connected to this request will appear here when available.
      </Text>
    );
  }

  return (
    <View style={styles.list}>
      {items.map((item) => (
        <View key={item.id} style={styles.item}>
          <View style={styles.marker} />
          <View style={styles.copy}>
            <Text selectable style={styles.title}>
              {item.title}
            </Text>
            <Text selectable style={styles.body}>
              {item.body}
            </Text>
            <Text selectable style={styles.time}>
              {formatShortDateTime(item.createdAt)}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.sm,
    lineHeight: 20,
  },
  copy: {
    flex: 1,
    gap: spacing[1],
  },
  empty: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.md,
    lineHeight: 22,
  },
  item: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: spacing[3],
  },
  list: {
    gap: spacing[4],
  },
  marker: {
    backgroundColor: colors.amg.accentBlue,
    borderRadius: 4,
    height: 8,
    marginTop: 6,
    width: 8,
  },
  time: {
    color: colors.dark.textMuted,
    fontSize: typography.sizes.xs,
  },
  title: {
    color: colors.dark.text,
    fontSize: typography.sizes.md,
    fontWeight: "700",
  },
});
