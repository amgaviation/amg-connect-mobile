import { Redirect, router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, FileText } from "lucide-react-native";
import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppScreen } from "@/components/layout/app-screen";
import { StatusBadge } from "@/components/status/StatusBadge";
import { AmgButton } from "@/components/ui/amg-button";
import { ErrorState } from "@/components/ui/error-state";
import { InfoCard } from "@/components/ui/info-card";
import { LoadingState } from "@/components/ui/loading-state";
import { QuietNotice } from "@/components/ui/QuietNotice";
import { useAuth } from "@/features/auth/useAuth";
import { getDemoDocumentById } from "@/features/documents/document.demo";
import { canEnterAppTabs, getRouteForAuthState } from "@/lib/auth/route-guards";
import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";
import { formatShortDateTime } from "@/lib/utils/format";

export default function DocumentDetailScreen() {
  const auth = useAuth();
  const params = useLocalSearchParams<{ documentId?: string }>();
  const documentId = Array.isArray(params.documentId) ? params.documentId[0] : params.documentId;
  const document = useMemo(() => (documentId ? getDemoDocumentById(documentId) : null), [documentId]);

  if (auth.isLoading) return <LoadingState />;
  if (!canEnterAppTabs(auth)) return <Redirect href={getRouteForAuthState(auth)} />;

  if (!document) {
    return (
      <AppScreen eyebrow="Documents" title="Document not found">
        <BackButton />
        <ErrorState
          title="Unable to open document"
          message="This document is not available in local demo data. Real document access will rely on authenticated Supabase Storage policy and account scope."
        />
      </AppScreen>
    );
  }

  return (
    <AppScreen eyebrow="Document Detail" title={document.title} description={document.description}>
      <BackButton />

      <View style={styles.heroCard}>
        <View style={styles.heroTop}>
          <View style={styles.iconWrap}>
            <FileText color={colors.amg.accentBlue} size={22} />
          </View>
          <View style={styles.heroCopy}>
            <Text selectable style={styles.category}>
              {document.category} · {document.fileType}
            </Text>
            <Text selectable style={styles.heroTitle}>
              {document.title}
            </Text>
          </View>
          <StatusBadge type="document" status={document.status} />
        </View>
      </View>

      <InfoCard>
        <SectionTitle title="Document Context" />
        <DetailGrid
          rows={[
            ["Updated", formatShortDateTime(document.updatedAt)],
            ["Related aircraft", document.relatedAircraftLabel ?? "Not linked"],
            ["Related request", document.relatedRequestDisplayId ?? "Not linked"],
            ["Visibility", document.visibilityLabel],
          ]}
        />
      </InfoCard>

      <InfoCard>
        <SectionTitle title="File Access" />
        <Text selectable style={styles.bodyCopy}>
          Open and download actions are deferred until AMG confirms the storage bucket, signed URL behavior, and client
          access rules.
        </Text>
        <View style={styles.actions}>
          <AmgButton disabled label="Open Document" />
          <AmgButton disabled label="Download" variant="secondary" />
        </View>
      </InfoCard>

      <QuietNotice message="Document access is limited to approved account permissions and AMG review context. This screen does not display internal storage URLs or private file paths." />
    </AppScreen>
  );
}

function BackButton() {
  return (
    <Pressable accessibilityLabel="Go back" accessibilityRole="button" onPress={() => router.back()} style={styles.back}>
      <ArrowLeft color={colors.amg.lightGray} size={18} />
      <Text selectable={false} style={styles.backLabel}>
        Back
      </Text>
    </Pressable>
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

const styles = StyleSheet.create({
  actions: {
    gap: spacing[3],
  },
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
  category: {
    color: colors.dark.textMuted,
    fontSize: typography.sizes.sm,
    fontWeight: "700",
    textTransform: "uppercase",
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
  heroCard: {
    backgroundColor: colors.dark.surface,
    borderColor: colors.dark.border,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    padding: spacing[5],
  },
  heroCopy: {
    flex: 1,
    gap: spacing[1],
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
  iconWrap: {
    alignItems: "center",
    backgroundColor: colors.amg.deepBlue,
    borderColor: colors.dark.border,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  sectionTitle: {
    color: colors.dark.text,
    fontSize: typography.sizes.lg,
    fontWeight: "700",
  },
});
