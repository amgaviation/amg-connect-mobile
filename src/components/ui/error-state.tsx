import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";

type ErrorStateProps = {
  message: string;
  title?: string;
};

export function ErrorState({ message, title = "Unable to continue" }: ErrorStateProps) {
  return (
    <View accessibilityLiveRegion="polite" style={styles.container}>
      <Text selectable style={styles.title}>
        {title}
      </Text>
      <Text selectable style={styles.message}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark.surface,
    borderColor: colors.dark.border,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    gap: spacing[2],
    padding: spacing[4],
  },
  message: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.sm,
    lineHeight: 20,
  },
  title: {
    color: colors.dark.text,
    fontSize: typography.sizes.md,
    fontWeight: "700",
  },
});
