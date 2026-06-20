import { ChevronRight } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { StatusBadge } from "@/components/status/StatusBadge";
import type { AircraftSummary } from "@/features/aircraft/aircraft.types";
import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";

type AircraftCardProps = {
  aircraft: AircraftSummary;
  onPress: () => void;
};

export function AircraftCard({ aircraft, onPress }: AircraftCardProps) {
  const identity = [aircraft.tailNumber, aircraft.baseAirport].filter(Boolean).join(" · ");

  return (
    <Pressable
      accessibilityLabel={`Open aircraft ${aircraft.makeModel}`}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.main}>
        <View style={styles.topRow}>
          <Text selectable style={styles.title}>
            {aircraft.makeModel}
          </Text>
          {aircraft.isDemo ? <StatusBadge type="demo" label="Demo" /> : null}
        </View>
        <Text selectable style={styles.identity}>
          {identity || "Aircraft identity pending"}
        </Text>
        <View style={styles.metaRow}>
          <Text selectable style={styles.meta}>
            {aircraft.category}
          </Text>
          <StatusBadge type="aircraft" status={aircraft.status} />
        </View>
        {aircraft.latestActivity ? (
          <Text selectable style={styles.activity}>
            Latest activity: {aircraft.latestActivity}
          </Text>
        ) : null}
      </View>
      <ChevronRight color={colors.amg.slateGray} size={20} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  activity: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.sm,
    lineHeight: 20,
  },
  card: {
    alignItems: "center",
    backgroundColor: colors.dark.surface,
    borderColor: colors.dark.border,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    gap: spacing[3],
    minHeight: 132,
    padding: spacing[4],
  },
  identity: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.md,
  },
  main: {
    flex: 1,
    gap: spacing[2],
  },
  meta: {
    color: colors.dark.textMuted,
    fontSize: typography.sizes.sm,
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing[3],
  },
  pressed: {
    opacity: 0.82,
  },
  title: {
    color: colors.dark.text,
    flex: 1,
    fontSize: typography.sizes.xl,
    fontWeight: "700",
  },
  topRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing[2],
  },
});
