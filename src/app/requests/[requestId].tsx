import { Redirect, router, type Href, useLocalSearchParams } from "expo-router";
import { ArrowLeft, FileText } from "lucide-react-native";
import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { ActionCard } from "@/components/cards/ActionCard";
import { ActivityList } from "@/components/lists/ActivityList";
import { AppScreen } from "@/components/layout/app-screen";
import { StatusBadge } from "@/components/status/StatusBadge";
import { AmgButton } from "@/components/ui/amg-button";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { InfoCard } from "@/components/ui/info-card";
import { LoadingState } from "@/components/ui/loading-state";
import { useAuth } from "@/features/auth/useAuth";
import { getDemoRequestById } from "@/features/requests/request.demo";
import type { RequestDetail } from "@/features/requests/request.types";
import { canEnterAppTabs, getRouteForAuthState } from "@/lib/auth/route-guards";
import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";
import { formatRoute, formatShortDateTime } from "@/lib/utils/format";

export default function RequestDetailScreen() {
  const auth = useAuth();
  const params = useLocalSearchParams<{ requestId?: string }>();
  const requestId = Array.isArray(params.requestId) ? params.requestId[0] : params.requestId;
  const request = useMemo(() => (requestId ? getDemoRequestById(requestId) : null), [requestId]);

  if (auth.isLoading) return <LoadingState />;
  if (!canEnterAppTabs(auth)) return <Redirect href={getRouteForAuthState(auth)} />;

  if (!request) {
    return (
      <AppScreen eyebrow="Requests" title="Request not found">
        <Pressable accessibilityLabel="Go back" accessibilityRole="button" onPress={() => router.back()} style={styles.back}>
          <ArrowLeft color={colors.amg.lightGray} size={18} />
          <Text selectable={false} style={styles.backLabel}>
            Back
          </Text>
        </Pressable>
        <ErrorState
          title="Unable to open request"
          message="This request is not available in the local demo data. Real request access will rely on the authenticated AMG Supabase session and RLS-backed account scope."
        />
      </AppScreen>
    );
  }

  return (
    <AppScreen eyebrow="Request Detail" title={request.displayId} description={request.shortContext}>
      <Pressable accessibilityLabel="Go back" accessibilityRole="button" onPress={() => router.back()} style={styles.back}>
        <ArrowLeft color={colors.amg.lightGray} size={18} />
        <Text selectable={false} style={styles.backLabel}>
          Back
        </Text>
      </Pressable>

      <View style={styles.heroCard}>
        <View style={styles.heroTop}>
          <View style={styles.heroCopy}>
            <Text selectable style={styles.heroId}>
              {request.displayId}
            </Text>
            <Text selectable style={styles.heroRoute}>
              {formatRoute(request.route?.fromAirport, request.route?.toAirport, request.location)}
            </Text>
          </View>
          <StatusBadge type="request" status={request.status} />
        </View>
        {request.isDemo ? (
          <Text selectable style={styles.demoNotice}>
            Demo request data only. No production request records are hardcoded in the mobile app.
          </Text>
        ) : null}
      </View>

      <InfoCard>
        <SectionTitle title="Request Overview" />
        <DetailGrid
          rows={[
            ["Support type", request.supportType],
            ["Aircraft", formatAircraft(request)],
            ["Route / location", formatRoute(request.route?.fromAirport, request.route?.toAirport, request.location)],
            ["Last updated", formatShortDateTime(request.lastUpdatedAt)],
          ]}
        />
      </InfoCard>

      <InfoCard>
        <SectionTitle title="Aircraft" />
        <DetailGrid
          rows={[
            ["Aircraft", request.aircraftLabel ?? "Aircraft pending"],
            ["Tail number", request.tailNumber ?? "Tail pending"],
          ]}
        />
      </InfoCard>

      <InfoCard>
        <SectionTitle title="Timing" />
        <DetailGrid
          rows={[
            ["Requested timing", formatShortDateTime(request.requestedAt)],
            ["Flexibility", request.timingFlexibility ?? "Timing flexibility pending"],
            ["Contact preference", request.contactPreference ?? "Portal message"],
          ]}
        />
      </InfoCard>

      <InfoCard>
        <SectionTitle title="AMG Review" />
        <Text selectable style={styles.bodyCopy}>
          {request.reviewContext}
        </Text>
        {request.crewNeeds ? (
          <Text selectable style={styles.bodyCopy}>
            Crew needs: {request.crewNeeds}
          </Text>
        ) : null}
        {request.notes ? (
          <Text selectable style={styles.mutedCopy}>
            {request.notes}
          </Text>
        ) : null}
      </InfoCard>

      <InfoCard>
        <SectionTitle title="Documents" />
        {request.documents.length ? (
          <View style={styles.previewList}>
            {request.documents.map((document) => (
              <PreviewRow
                key={document.id}
                label={document.label}
                state={document.status === "available" ? "Available" : "Pending backend mapping"}
              />
            ))}
          </View>
        ) : (
          <EmptyState
            title="No documents yet"
            message="Documents connected to this request will appear here when available."
          />
        )}
      </InfoCard>

      <InfoCard>
        <SectionTitle title="Quote / Invoice" />
        <PreviewRow
          label={request.quotePreview?.label ?? "Quote / invoice details will appear when available."}
          state={request.quotePreview?.state === "sent" ? "Sent" : "Not ready"}
        />
      </InfoCard>

      <InfoCard>
        <SectionTitle title="Updates" />
        <ActivityList items={request.activity} />
      </InfoCard>

      <ActionCard
        eyebrow="Next Action"
        title={request.pendingAction ?? "Await AMG update"}
        body="AMG updates, document previews, and quote status will connect after the request backend contract is confirmed."
        action={
          <AmgButton
            label="Create Related Request"
            variant="secondary"
            onPress={() => router.push("/requests/new" as Href)}
          />
        }
      />

      <Text selectable style={styles.disclaimer}>
        Requests remain subject to aircraft status, crew availability, owner/operator approval, route and airport
        constraints, weather, support-scope review, and final acceptance.
      </Text>
    </AppScreen>
  );
}

function formatAircraft(request: RequestDetail) {
  return [request.aircraftLabel, request.tailNumber].filter(Boolean).join(" · ") || "Aircraft pending";
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
  bodyCopy: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.md,
    lineHeight: 22,
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
  },
  disclaimer: {
    color: colors.dark.textMuted,
    fontSize: typography.sizes.sm,
    lineHeight: 20,
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
  heroId: {
    color: colors.dark.textMuted,
    fontSize: typography.sizes.sm,
    fontWeight: "700",
  },
  heroRoute: {
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
    justifyContent: "space-between",
  },
  mutedCopy: {
    color: colors.dark.textMuted,
    fontSize: typography.sizes.sm,
    lineHeight: 20,
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
  sectionTitle: {
    color: colors.dark.text,
    fontSize: typography.sizes.lg,
    fontWeight: "700",
  },
});
