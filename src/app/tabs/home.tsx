import { router, type Href } from "expo-router";
import { FileText, Plane, Wrench } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

import { ActionCard } from "@/components/cards/ActionCard";
import { AircraftCard } from "@/components/cards/AircraftCard";
import { RequestCard } from "@/components/cards/RequestCard";
import { ActivityList } from "@/components/lists/ActivityList";
import { AppScreen } from "@/components/layout/app-screen";
import { AmgButton } from "@/components/ui/amg-button";
import { EmptyState } from "@/components/ui/empty-state";
import { InfoCard } from "@/components/ui/info-card";
import { demoAircraft } from "@/features/aircraft/aircraft.demo";
import type { RequestActivityItem } from "@/features/activity/activity.types";
import { useAuth } from "@/features/auth/useAuth";
import { demoRequests, getPrimaryDemoAircraft } from "@/features/requests/request.demo";
import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";

export default function HomeTab() {
  const auth = useAuth();
  const activeRequests = demoRequests.filter((request) => !["closed", "completed", "cancelled"].includes(request.status));
  const pendingReviewCount = demoRequests.filter((request) =>
    ["under_review", "awaiting_details", "quote_sent"].includes(request.status),
  ).length;
  const primaryAircraft = getPrimaryDemoAircraft();
  const displayName = auth.profile?.fullName ?? auth.user?.email ?? "AMG client";
  const recentActivity: RequestActivityItem[] = demoRequests.slice(0, 3).map((request) => ({
    body: `${request.displayId} · ${request.shortContext}`,
    createdAt: request.lastUpdatedAt,
    id: `${request.id}-home-activity`,
    title: request.pendingAction ?? request.supportType,
    tone: request.status === "closed" ? "closed" : "info",
  }));

  return (
    <AppScreen
      eyebrow="Home"
      title="AMG Connect"
      description="Aircraft support activity, requests, documents, and account access in one private mobile workspace."
    >
      <View style={styles.greeting}>
        <Text selectable style={styles.greetingLabel}>
          Signed in as
        </Text>
        <Text selectable style={styles.greetingName}>
          {displayName}
        </Text>
      </View>

      <View style={styles.metricsGrid}>
        <SummaryMetric icon={Wrench} label="Active Requests" value={String(activeRequests.length)} />
        <SummaryMetric icon={Plane} label="Aircraft" value={String(demoAircraft.length)} />
        <SummaryMetric icon={FileText} label="Pending Review" value={String(pendingReviewCount)} />
      </View>

      <ActionCard
        eyebrow="Client MVP demo"
        title="Request AMG support"
        body="Create a reviewed support request draft. Live submission is deferred until the AMG Connect backend mapping is confirmed."
        action={
          <View style={styles.actionRow}>
            <AmgButton label="Request Support" onPress={() => router.push("/requests/new" as Href)} />
            <AmgButton label="View Aircraft" variant="secondary" onPress={() => router.push("/tabs/aircraft")} />
          </View>
        }
      />

      {primaryAircraft ? (
        <View style={styles.section}>
          <SectionTitle title="Primary Aircraft" />
          <AircraftCard
            aircraft={primaryAircraft}
            onPress={() => router.push(`/aircraft/${primaryAircraft.id}` as Href)}
          />
        </View>
      ) : (
        <EmptyState
          title="No aircraft connected"
          message="No aircraft are currently connected to this account. Aircraft visibility will come from the shared AMG Supabase backend."
        />
      )}

      <View style={styles.section}>
        <SectionTitle title="Active Support" />
        {activeRequests.length ? (
          activeRequests
            .slice(0, 2)
            .map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                onPress={() => router.push(`/requests/${request.id}` as Href)}
              />
            ))
        ) : (
          <EmptyState
            title="No active support requests"
            message="When AMG support activity is created for your account, it will appear here."
          />
        )}
      </View>

      <InfoCard>
        <SectionTitle title="Recent Activity" />
        <ActivityList items={recentActivity} />
      </InfoCard>
    </AppScreen>
  );
}

type SummaryMetricProps = {
  icon: typeof Wrench;
  label: string;
  value: string;
};

function SummaryMetric({ icon: Icon, label, value }: SummaryMetricProps) {
  return (
    <InfoCard>
      <View style={styles.metricHeader}>
        <Icon color={colors.amg.accentBlue} size={20} />
        <Text selectable style={styles.metricValue}>
          {value}
        </Text>
      </View>
      <Text selectable style={styles.metricLabel}>
        {label}
      </Text>
    </InfoCard>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <Text selectable style={styles.sectionTitle}>
      {title}
    </Text>
  );
}

const styles = StyleSheet.create({
  actionRow: {
    gap: spacing[3],
  },
  greeting: {
    gap: spacing[1],
  },
  greetingLabel: {
    color: colors.dark.textMuted,
    fontSize: typography.sizes.sm,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  greetingName: {
    color: colors.dark.text,
    fontSize: typography.sizes.xl,
    fontWeight: "700",
  },
  metricHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metricLabel: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.sm,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  metricValue: {
    color: colors.dark.text,
    fontSize: typography.sizes.xxl,
    fontWeight: "700",
  },
  metricsGrid: {
    gap: spacing[3],
  },
  section: {
    gap: spacing[3],
  },
  sectionTitle: {
    color: colors.dark.text,
    fontSize: typography.sizes.lg,
    fontWeight: "700",
  },
});
