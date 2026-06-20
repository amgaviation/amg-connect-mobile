import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { InfoCard } from "@/components/ui/info-card";
import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";

type ActionCardProps = {
  action?: ReactNode;
  body: string;
  eyebrow?: string;
  title: string;
};

export function ActionCard({ action, body, eyebrow, title }: ActionCardProps) {
  return (
    <InfoCard>
      <View style={styles.header}>
        {eyebrow ? (
          <Text selectable style={styles.eyebrow}>
            {eyebrow}
          </Text>
        ) : null}
        <Text selectable style={styles.title}>
          {title}
        </Text>
        <Text selectable style={styles.body}>
          {body}
        </Text>
      </View>
      {action}
    </InfoCard>
  );
}

const styles = StyleSheet.create({
  body: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.md,
    lineHeight: 22,
  },
  eyebrow: {
    color: colors.amg.accentBlue,
    fontSize: typography.sizes.xs,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  header: {
    gap: spacing[2],
  },
  title: {
    color: colors.dark.text,
    fontSize: typography.sizes.lg,
    fontWeight: "700",
  },
});
