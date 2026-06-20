import { ChevronRight } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { StatusBadge } from "@/components/status/StatusBadge";
import type { RequestSummary } from "@/features/requests/request.types";
import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";
import { formatRelativeDate, formatRoute } from "@/lib/utils/format";

type RequestCardProps = {
  onPress: () => void;
  request: RequestSummary;
};

export function RequestCard({ onPress, request }: RequestCardProps) {
  const routeLabel = formatRoute(request.route?.fromAirport, request.route?.toAirport, request.location);

  return (
    <Pressable
      accessibilityLabel={`Open request ${request.displayId}`}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.main}>
        <View style={styles.topRow}>
          <Text selectable style={styles.id}>
            {request.displayId}
          </Text>
          {request.isDemo ? <StatusBadge type="demo" label="Demo" /> : null}
        </View>
        <Text selectable style={styles.route}>
          {routeLabel}
        </Text>
        <Text selectable style={styles.context}>
          {request.supportType} · {request.shortContext}
        </Text>
        <View style={styles.bottomRow}>
          <StatusBadge type="request" status={request.status} />
          <Text selectable style={styles.updated}>
            {formatRelativeDate(request.lastUpdatedAt)}
          </Text>
        </View>
      </View>
      <ChevronRight color={colors.amg.slateGray} size={20} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bottomRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing[3],
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
  context: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.sm,
    lineHeight: 20,
  },
  id: {
    color: colors.dark.text,
    flex: 1,
    fontSize: typography.sizes.lg,
    fontWeight: "700",
  },
  main: {
    flex: 1,
    gap: spacing[2],
  },
  pressed: {
    opacity: 0.82,
  },
  route: {
    color: colors.amg.white,
    fontSize: typography.sizes.xl,
    fontWeight: "700",
  },
  topRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing[2],
  },
  updated: {
    color: colors.dark.textMuted,
    fontSize: typography.sizes.sm,
  },
});
