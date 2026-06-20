import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";

type AmgButtonProps = {
  accessibilityLabel?: string;
  disabled?: boolean;
  label: string;
  loading?: boolean;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "danger";
};

export function AmgButton({
  accessibilityLabel,
  disabled = false,
  label,
  loading = false,
  onPress,
  variant = "primary",
}: AmgButtonProps) {
  const isPrimary = variant === "primary";
  const isDanger = variant === "danger";
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ busy: loading, disabled: isDisabled }}
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={isDisabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.button,
        isPrimary && styles.primary,
        !isPrimary && !isDanger && styles.secondary,
        isDanger && styles.danger,
        pressed && styles.pressed,
        isDisabled && styles.disabled,
      ]}
    >
      {loading ? <ActivityIndicator color={isPrimary ? colors.amg.white : colors.amg.lightGray} /> : null}
      {!loading ? (
        <Text selectable={false} style={[styles.label, isPrimary ? styles.primaryLabel : styles.secondaryLabel]}>
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: 8,
    flexDirection: "row",
    gap: spacing[2],
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: spacing[4],
  },
  primary: {
    backgroundColor: colors.amg.accentBlue,
  },
  secondary: {
    backgroundColor: "transparent",
    borderColor: colors.dark.border,
    borderWidth: StyleSheet.hairlineWidth,
  },
  danger: {
    backgroundColor: "transparent",
    borderColor: colors.amg.slateGray,
    borderWidth: StyleSheet.hairlineWidth,
  },
  disabled: {
    opacity: 0.55,
  },
  pressed: {
    opacity: 0.82,
  },
  label: {
    fontSize: typography.sizes.md,
    fontWeight: "700",
    letterSpacing: 0,
  },
  primaryLabel: {
    color: colors.amg.white,
  },
  secondaryLabel: {
    color: colors.dark.text,
  },
});
