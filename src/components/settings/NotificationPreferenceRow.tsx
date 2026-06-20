import { StyleSheet, Text, View } from "react-native";

import { SettingsRow } from "@/components/settings/SettingsRow";
import type { NotificationPreference } from "@/features/settings/settings.types";
import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";

type NotificationPreferenceRowProps = {
  preference: NotificationPreference;
};

export function NotificationPreferenceRow({ preference }: NotificationPreferenceRowProps) {
  return (
    <SettingsRow
      title={preference.label}
      description={preference.description}
      rightSlot={
        <View style={styles.statePill}>
          <Text selectable={false} style={styles.stateLabel}>
            {preference.locked ? "Pending" : preference.enabled ? "On" : "Off"}
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  stateLabel: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.xs,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  statePill: {
    borderColor: colors.dark.border,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
  },
});
