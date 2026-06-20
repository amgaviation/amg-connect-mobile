import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";

type SettingsRowProps = {
  description?: string;
  rightSlot?: ReactNode;
  title: string;
};

export function SettingsRow({ description, rightSlot, title }: SettingsRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.copy}>
        <Text selectable style={styles.title}>
          {title}
        </Text>
        {description ? (
          <Text selectable style={styles.description}>
            {description}
          </Text>
        ) : null}
      </View>
      {rightSlot}
    </View>
  );
}

const styles = StyleSheet.create({
  copy: {
    flex: 1,
    gap: spacing[1],
  },
  description: {
    color: colors.dark.textMuted,
    fontSize: typography.sizes.sm,
    lineHeight: 20,
  },
  row: {
    alignItems: "center",
    borderColor: colors.dark.border,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    gap: spacing[3],
    minHeight: 64,
    padding: spacing[3],
  },
  title: {
    color: colors.dark.text,
    fontSize: typography.sizes.md,
    fontWeight: "700",
  },
});
