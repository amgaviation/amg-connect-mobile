import { Pressable, StyleSheet, Text } from "react-native";

import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";

type AmgButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: "primary" | "secondary";
};

export function AmgButton({ label, onPress, variant = "primary" }: AmgButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        isPrimary ? styles.primary : styles.secondary,
        pressed && styles.pressed,
      ]}
    >
      <Text selectable={false} style={[styles.label, isPrimary ? styles.primaryLabel : styles.secondaryLabel]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: 8,
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
