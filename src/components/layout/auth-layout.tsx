import type { PropsWithChildren } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";

import { AmgLogo } from "@/components/ui/amg-logo";
import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";

type AuthLayoutProps = PropsWithChildren<{
  footer?: string;
  subtitle: string;
  title: string;
}>;

export function AuthLayout({ children, footer, subtitle, title }: AuthLayoutProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: "padding", default: undefined })}
      style={styles.keyboard}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.logoWrap}>
          <AmgLogo />
        </View>

        <View style={styles.header}>
          <Text selectable style={styles.title}>
            {title}
          </Text>
          <Text selectable style={styles.subtitle}>
            {subtitle}
          </Text>
        </View>

        {children}

        {footer ? (
          <Text selectable style={styles.footer}>
            {footer}
          </Text>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
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
    justifyContent: "center",
    maxWidth: 560,
    minHeight: "100%",
    padding: spacing[5],
    width: "100%",
  },
  footer: {
    color: colors.dark.textMuted,
    fontSize: typography.sizes.sm,
    lineHeight: 20,
  },
  header: {
    gap: spacing[2],
  },
  keyboard: {
    backgroundColor: colors.amg.midnightNavy,
    flex: 1,
  },
  logoWrap: {
    alignItems: "center",
  },
  subtitle: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.md,
    lineHeight: 22,
    textAlign: "center",
  },
  title: {
    color: colors.dark.text,
    fontSize: typography.sizes.xxxl,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 42,
    textAlign: "center",
  },
});
