import { Redirect, router, type Href, useLocalSearchParams } from "expo-router";
import { ArrowLeft, FileText, MapPin, Plane } from "lucide-react-native";
import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { ActionCard } from "@/components/cards/ActionCard";
import { RequestCard } from "@/components/cards/RequestCard";
import { AppScreen } from "@/components/layout/app-screen";
import { StatusBadge } from "@/components/status/StatusBadge";
import { AmgButton } from "@/components/ui/amg-button";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { InfoCard } from "@/components/ui/info-card";
import { LoadingState } from "@/components/ui/loading-state";
import { getDemoAircraftById } from "@/features/aircraft/aircraft.demo";
import { useAuth } from "@/features/auth/useAuth";
import { getDemoRequestsForAircraft } from "@/features/requests/request.demo";
import { canEnterAppTabs, getRouteForAuthState } from "@/lib/auth/route-guards";
import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";

export default function AircraftDetailScreen() {
  const auth = useAuth();
  const params = useLocalSearchParams<{ aircraftId?: string }>();
  const aircraftId = Array.isArray(params.aircraftId) ? params.aircraftId[0] : params.aircraftId;
  const aircraft = useMemo(() => (aircraftId ? getDemoAircraftById(aircraftId) : null), [aircraftId]);
  const recentRequests = useMemo(() => (aircraftId ? getDemoRequestsForAircraft(aircraftId) : []), [aircraftId]);

  if (auth.isLoading) return <LoadingState />;
  if (!canEnterAppTabs(auth)) return <Redirect href={getRouteForAuthState(auth)} />;

  if (!aircraft) {
    return (
      <AppScreen eyebrow="Aircraft" title="Aircraft not found">
        <Pressable accessibilityLabel="Go back" accessibilityRole="button" onPress={() => router.back()} style={styles.back}>
          <ArrowLeft color={colors.amg.lightGray} size={18} />
          <Text selectable={false} style={styles.backLabel}>
            Back
          </Text>
        </Pressable>
        <ErrorState
          title="Unable to open aircraft"
          message="This aircraft is not available in the local demo data. Real aircraft access will rely on the authenticated AMG Supabase session and RLS-backed client scope."
        />
      </AppScreen>
    );
  }

  return (
    <AppScreen eyebrow="Aircraft Detail" title={aircraft.makeModel} description={aircraft.supportContext}>
      <Pressable accessibilityLabel="Go back" accessibilityRole="button" onPress={() => router.back()} style={styles.back}>
        <ArrowLeft color={colors.amg.lightGray} size={18} />
        <Text selectable={false} style={styles.backLabel}>
          Back
        </Text>
      </Pressable>

      <View style={styles.heroCard}>
        <View style={styles.heroTop}>
          <View style={styles.heroIcon}>
            <Plane color={colors.amg.accentBlue} size={24} />
          </View>
          <View style={styles.heroCopy}>
            <Text selectable style={styles.heroTitle}>
              {aircraft.makeModel}
            </Text>
            <Text selectable style={styles.heroMeta}>
              {[aircraft.tailNumber, aircraft.category].filter(Boolean).join(" · ")}
            </Text>
          </View>
          <StatusBadge type="aircraft" status={aircraft.status} />
        </View>
        {aircraft.isDemo ? (
          <Text selectable style={styles.demoNotice}>
            Demo aircraft data only. No production aircraft records are hardcoded in the mobile app.
          </Text>
        ) : null}
      </View>

      <InfoCard>
        <SectionTitle title="Aircraft Profile" />
        <DetailGrid
          rows={[
            ["Make / model", aircraft.makeModel],
            ["Tail number", aircraft.tailNumber ?? "Tail pending"],
            ["Category", aircraft.category],
            ["Status", aircraft.status],
          ]}
        />
      </InfoCard>

      <InfoCard>
        <SectionTitle title="Base" />
        <View style={styles.baseRow}>
          <MapPin color={colors.amg.accentBlue} size={20} />
          <Text selectable style={styles.baseText}>
            {aircraft.baseAirport ?? "Base airport pending"}
          </Text>
        </View>
      </InfoCard>

      <InfoCard>
        <SectionTitle title="Documents" />
        {aircraft.documents.length ? (
          <View style={styles.previewList}>
            {aircraft.documents.map((document) => (
              <PreviewRow
                key={document.id}
                label={document.label}
                state={document.status === "available" ? "Available" : "Pending backend mapping"}
              />
            ))}
          </View>
        ) : (
          <EmptyState
            title="No aircraft documents"
            message="Documents connected to this aircraft will appear here when available."
          />
        )}
      </InfoCard>

      <View style={styles.section}>
        <SectionTitle title="Recent Support Activity" />
        {recentRequests.length ? (
          recentRequests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onPress={() => router.push(`/requests/${request.id}` as Href)}
            />
          ))
        ) : (
          <EmptyState
            title="No recent support activity"
            message="Recent support requests involving this aircraft will appear here when available."
          />
        )}
      </View>

      <ActionCard
        eyebrow="Request Support"
        title="Start an aircraft support request"
        body="Use this aircraft as the starting context. Submission remains deferred until backend request mapping is confirmed."
        action={
          <AmgButton
            label="Request Support"
            onPress={() =>
              router.push(`/requests/new?aircraftId=${encodeURIComponent(aircraft.id)}` as Href)
            }
          />
        }
      />
    </AppScreen>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <Text selectable style={styles.sectionTitle}>
      {title}
    </Text>
  );
}

function DetailGrid({ rows }: { rows: [string, string][] }) {
  return (
    <View style={styles.detailGrid}>
      {rows.map(([label, value]) => (
        <View key={label} style={styles.detailRow}>
          <Text selectable style={styles.detailLabel}>
            {label}
          </Text>
          <Text selectable style={styles.detailValue}>
            {value}
          </Text>
        </View>
      ))}
    </View>
  );
}

function PreviewRow({ label, state }: { label: string; state: string }) {
  return (
    <View style={styles.previewRow}>
      <FileText color={colors.amg.accentBlue} size={18} />
      <View style={styles.previewCopy}>
        <Text selectable style={styles.previewLabel}>
          {label}
        </Text>
        <Text selectable style={styles.previewState}>
          {state}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  back: {
    alignItems: "center",
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: spacing[2],
    minHeight: 44,
  },
  backLabel: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.md,
    fontWeight: "700",
  },
  baseRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing[3],
  },
  baseText: {
    color: colors.dark.text,
    fontSize: typography.sizes.lg,
    fontWeight: "700",
  },
  demoNotice: {
    color: colors.dark.textMuted,
    fontSize: typography.sizes.sm,
    lineHeight: 20,
  },
  detailGrid: {
    gap: spacing[3],
  },
  detailLabel: {
    color: colors.dark.textMuted,
    fontSize: typography.sizes.sm,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  detailRow: {
    gap: spacing[1],
  },
  detailValue: {
    color: colors.dark.text,
    fontSize: typography.sizes.md,
    lineHeight: 22,
    textTransform: "capitalize",
  },
  heroCard: {
    backgroundColor: colors.dark.surface,
    borderColor: colors.dark.border,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    gap: spacing[3],
    padding: spacing[5],
  },
  heroCopy: {
    flex: 1,
    gap: spacing[1],
  },
  heroIcon: {
    alignItems: "center",
    backgroundColor: colors.amg.deepBlue,
    borderColor: colors.dark.border,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  heroMeta: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.md,
  },
  heroTitle: {
    color: colors.dark.text,
    fontSize: typography.sizes.xxl,
    fontWeight: "700",
    lineHeight: 34,
  },
  heroTop: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing[3],
  },
  previewCopy: {
    flex: 1,
    gap: spacing[1],
  },
  previewLabel: {
    color: colors.dark.text,
    fontSize: typography.sizes.md,
    fontWeight: "700",
  },
  previewList: {
    gap: spacing[3],
  },
  previewRow: {
    alignItems: "center",
    borderColor: colors.dark.border,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    gap: spacing[3],
    padding: spacing[3],
  },
  previewState: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.sm,
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
