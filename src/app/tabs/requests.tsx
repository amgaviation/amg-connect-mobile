import { router, type Href } from "expo-router";
import { SlidersHorizontal } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { RequestCard } from "@/components/cards/RequestCard";
import { AppScreen } from "@/components/layout/app-screen";
import { AmgButton } from "@/components/ui/amg-button";
import { AmgTextInput } from "@/components/ui/amg-text-input";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { demoRequests } from "@/features/requests/request.demo";
import type { RequestStatus } from "@/features/requests/request.types";
import { colors } from "@/lib/theme/colors";
import { getRequestStatusMeta } from "@/lib/theme/status";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";
import { formatRoute } from "@/lib/utils/format";

type RequestFilter = "all" | RequestStatus;

const filters: { label: string; value: RequestFilter }[] = [
  { label: "All", value: "all" },
  { label: "Under Review", value: "under_review" },
  { label: "Awaiting Details", value: "awaiting_details" },
  { label: "Closed", value: "closed" },
];

export default function RequestsTab() {
  const [query, setQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<RequestFilter>("all");
  const [isLoading] = useState(false);
  const [errorMessage] = useState<string | null>(null);

  const filteredRequests = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return demoRequests.filter((request) => {
      const routeLabel = formatRoute(request.route?.fromAirport, request.route?.toAirport, request.location);
      const matchesFilter = selectedFilter === "all" || request.status === selectedFilter;
      const matchesQuery =
        !normalizedQuery ||
        [
          request.displayId,
          request.aircraftLabel,
          request.tailNumber,
          request.supportType,
          request.shortContext,
          routeLabel,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesFilter && matchesQuery;
    });
  }, [query, selectedFilter]);

  if (isLoading) return <LoadingState message="Loading support requests..." />;

  return (
    <AppScreen
      eyebrow="Requests"
      title="Support Requests"
      description="Review AMG support activity connected to this account. Demo records are used until the backend request mapping is confirmed."
    >
      {errorMessage ? (
        <ErrorState title="Unable to load requests" message={errorMessage} />
      ) : (
        <>
          <View style={styles.toolbar}>
            <AmgTextInput
              label="Search requests"
              leftIcon={SlidersHorizontal}
              onChangeText={setQuery}
              placeholder="Request ID, route, aircraft, or support type"
              value={query}
            />
            <View style={styles.filterRow}>
              {filters.map((filter) => (
                <FilterChip
                  key={filter.value}
                  label={filter.label}
                  selected={selectedFilter === filter.value}
                  onPress={() => setSelectedFilter(filter.value)}
                />
              ))}
            </View>
          </View>

          <AmgButton label="New Support Request" onPress={() => router.push("/requests/new" as Href)} />

          <View style={styles.list}>
            {filteredRequests.length ? (
              filteredRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  onPress={() => router.push(`/requests/${request.id}` as Href)}
                />
              ))
            ) : (
              <EmptyState
                title="No matching requests"
                message="No support requests match the current search or filter. When AMG support activity is created for your account, it will appear here."
                action={<AmgButton label="Clear Filters" variant="secondary" onPress={() => setSelectedFilter("all")} />}
              />
            )}
          </View>
        </>
      )}
    </AppScreen>
  );
}

type FilterChipProps = {
  label: string;
  onPress: () => void;
  selected: boolean;
};

function FilterChip({ label, onPress, selected }: FilterChipProps) {
  return (
    <Pressable
      accessibilityLabel={`Filter ${label}`}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [styles.filterChip, selected && styles.filterChipSelected, pressed && styles.pressed]}
    >
      <Text selectable={false} style={[styles.filterLabel, selected && styles.filterLabelSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  filterChip: {
    borderColor: colors.dark.border,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
  },
  filterChipSelected: {
    backgroundColor: colors.amg.deepBlue,
    borderColor: colors.amg.accentBlue,
  },
  filterLabel: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.sm,
    fontWeight: "700",
  },
  filterLabelSelected: {
    color: getRequestStatusMeta("under_review").textColor,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing[2],
  },
  list: {
    gap: spacing[3],
  },
  pressed: {
    opacity: 0.82,
  },
  toolbar: {
    gap: spacing[3],
  },
});
