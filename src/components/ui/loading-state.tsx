import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";

type LoadingStateProps = {
  message?: string;
};

export function LoadingState({ message = "Checking AMG Connect access..." }: LoadingStateProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.amg.accentBlue} />
      <Text selectable style={styles.message}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.amg.midnightNavy,
    flex: 1,
    gap: spacing[3],
    justifyContent: "center",
    padding: spacing[5],
  },
  message: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.md,
    textAlign: "center",
  },
});
