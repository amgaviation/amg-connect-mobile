import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";

type ProfileFieldProps = {
  label: string;
  value?: string | null;
};

export function ProfileField({ label, value }: ProfileFieldProps) {
  return (
    <View style={styles.field}>
      <Text selectable style={styles.label}>
        {label}
      </Text>
      <Text selectable style={styles.value}>
        {value || "Not available"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: spacing[1],
  },
  label: {
    color: colors.dark.textMuted,
    fontSize: typography.sizes.sm,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  value: {
    color: colors.dark.text,
    fontSize: typography.sizes.md,
    lineHeight: 22,
  },
});
