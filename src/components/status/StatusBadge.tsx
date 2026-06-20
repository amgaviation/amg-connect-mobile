import { StyleSheet, Text, View } from "react-native";

import type { AircraftStatus } from "@/features/aircraft/aircraft.types";
import type { RequestStatus } from "@/features/requests/request.types";
import { getAircraftStatusMeta, getRequestStatusMeta, type StatusMeta } from "@/lib/theme/status";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";

type StatusBadgeProps =
  | {
      label?: never;
      status: RequestStatus;
      type: "request";
    }
  | {
      label?: never;
      status: AircraftStatus;
      type: "aircraft";
    }
  | {
      label: string;
      status?: never;
      type: "demo";
    };

export function StatusBadge(props: StatusBadgeProps) {
  const meta = getMeta(props);

  return (
    <View
      accessibilityLabel={`Status: ${meta.label}`}
      style={[
        styles.badge,
        {
          backgroundColor: meta.backgroundColor,
          borderColor: meta.borderColor,
        },
      ]}
    >
      <Text selectable={false} style={[styles.label, { color: meta.textColor }]}>
        {meta.label}
      </Text>
    </View>
  );
}

function getMeta(props: StatusBadgeProps): StatusMeta {
  if (props.type === "request") return getRequestStatusMeta(props.status);
  if (props.type === "aircraft") return getAircraftStatusMeta(props.status);

  return {
    ...getRequestStatusMeta("draft"),
    label: props.label,
  };
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
  },
  label: {
    fontSize: typography.sizes.xs,
    fontWeight: "700",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
});
