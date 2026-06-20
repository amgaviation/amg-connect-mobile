import type { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";

export function InfoCard({ children }: PropsWithChildren) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.dark.surface,
    borderColor: colors.dark.border,
    borderCurve: "continuous",
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    gap: spacing[4],
    padding: spacing[4],
  },
});
