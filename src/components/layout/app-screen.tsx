import type { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";

type AppScreenProps = PropsWithChildren<{
  title?: string;
  description?: string;
  eyebrow?: string;
}>;

export function AppScreen({ children, description, eyebrow, title }: AppScreenProps) {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {(eyebrow || title || description) && (
        <View style={styles.header}>
          {eyebrow ? (
            <Text selectable style={styles.eyebrow}>
              {eyebrow}
            </Text>
          ) : null}
          {title ? (
            <Text selectable style={styles.title}>
              {title}
            </Text>
          ) : null}
          {description ? (
            <Text selectable style={styles.description}>
              {description}
            </Text>
          ) : null}
        </View>
      )}
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.amg.midnightNavy,
    flex: 1,
  },
  content: {
    alignSelf: "center",
    gap: spacing[5],
    maxWidth: 720,
    padding: spacing[5],
    paddingBottom: spacing[10],
    width: "100%",
  },
  header: {
    gap: spacing[2],
  },
  eyebrow: {
    color: colors.amg.accentBlue,
    fontSize: typography.sizes.sm,
    fontWeight: "700",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  title: {
    color: colors.dark.text,
    fontSize: typography.sizes.xxxl,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 42,
  },
  description: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.md,
    lineHeight: 22,
  },
});
