import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";

type EmptyStateProps = {
  action?: ReactNode;
  message: string;
  title: string;
};

export function EmptyState({ action, message, title }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.marker} />
      <Text selectable style={styles.title}>
        {title}
      </Text>
      <Text selectable style={styles.message}>
        {message}
      </Text>
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark.surface,
    borderColor: colors.dark.border,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    gap: spacing[3],
    padding: spacing[5],
  },
  marker: {
    backgroundColor: colors.amg.accentBlue,
    height: 2,
    width: 48,
  },
  message: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.md,
    lineHeight: 22,
  },
  title: {
    color: colors.dark.text,
    fontSize: typography.sizes.lg,
    fontWeight: "700",
  },
});
