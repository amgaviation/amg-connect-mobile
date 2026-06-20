import type { ComponentType, ReactNode } from "react";
import type { TextInputProps } from "react-native";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";

type IconProps = {
  color: string;
  size: number;
};

type AmgTextInputProps = TextInputProps & {
  error?: string | null;
  label: string;
  leftIcon?: ComponentType<IconProps>;
  rightSlot?: ReactNode;
};

export function AmgTextInput({
  accessibilityLabel,
  error,
  label,
  leftIcon: LeftIcon,
  rightSlot,
  style,
  ...inputProps
}: AmgTextInputProps) {
  return (
    <View style={styles.field}>
      <Text selectable style={styles.label}>
        {label}
      </Text>
      <View style={[styles.inputWrap, error && styles.inputWrapError]}>
        {LeftIcon ? <LeftIcon color={colors.amg.slateGray} size={18} /> : null}
        <TextInput
          accessibilityLabel={accessibilityLabel ?? label}
          placeholderTextColor={colors.dark.textMuted}
          style={[styles.input, style]}
          {...inputProps}
        />
        {rightSlot}
      </View>
      {error ? (
        <Text accessibilityLiveRegion="polite" selectable style={styles.error}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: colors.amg.lightGray,
    fontSize: typography.sizes.sm,
    lineHeight: 18,
  },
  field: {
    gap: spacing[2],
  },
  input: {
    color: colors.dark.text,
    flex: 1,
    fontSize: typography.sizes.md,
    minHeight: 48,
  },
  inputWrap: {
    alignItems: "center",
    backgroundColor: colors.dark.input,
    borderColor: colors.dark.border,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    gap: spacing[2],
    minHeight: 52,
    paddingHorizontal: spacing[3],
  },
  inputWrapError: {
    borderColor: colors.amg.lightGray,
  },
  label: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.sm,
    fontWeight: "600",
  },
});
