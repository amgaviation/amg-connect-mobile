import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";

type QuietNoticeProps = {
  message: string;
};

export function QuietNotice({ message }: QuietNoticeProps) {
  return (
    <View style={styles.notice}>
      <Text selectable style={styles.message}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    color: colors.dark.textMuted,
    fontSize: typography.sizes.sm,
    lineHeight: 20,
  },
  notice: {
    borderColor: colors.dark.border,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    padding: spacing[3],
  },
});
