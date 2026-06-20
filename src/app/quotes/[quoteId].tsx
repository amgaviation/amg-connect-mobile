import { Redirect, router, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
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
import { getDemoQuoteById } from "@/features/quotes/quote.demo";
import { canEnterAppTabs, getRouteForAuthState } from "@/lib/auth/route-guards";
import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";
import { formatShortDateTime } from "@/lib/utils/format";

export default function QuoteDetailScreen() {
  const auth = useAuth();
  const params = useLocalSearchParams<{ quoteId?: string }>();
  const quoteId = Array.isArray(params.quoteId) ? params.quoteId[0] : params.quoteId;
  const quote = useMemo(() => (quoteId ? getDemoQuoteById(quoteId) : null), [quoteId]);

  if (auth.isLoading) return <LoadingState />;
  if (!canEnterAppTabs(auth)) return <Redirect href={getRouteForAuthState(auth)} />;

  if (!quote) {
    return (
      <AppScreen eyebrow="Quotes" title="Quote not found">
        <BackButton />
        <ErrorState
          title="Unable to open quote"
          message="This quote is not available in local demo data. Real quote access requires confirmed backend mapping and RLS scope."
        />
      </AppScreen>
    );
  }

  return (
    <AppScreen eyebrow="Quote Detail" title={quote.title} description={quote.contactNote}>
      <BackButton />

      <InfoCard>
        <View style={styles.headerRow}>
          <View style={styles.headerCopy}>
            <Text selectable style={styles.label}>
              Quote
            </Text>
            <Text selectable style={styles.title}>
              {quote.title}
            </Text>
          </View>
          <StatusBadge type="quote" status={quote.status} />
        </View>
      </InfoCard>

      <InfoCard>
        <SectionTitle title="Quote Summary" />
        <DetailGrid
          rows={[
            ["Related request", quote.relatedRequestDisplayId ?? "Request pending"],
            ["Amount", quote.amountLabel ?? "Amount pending"],
            ["Sent", quote.sentAt ? formatShortDateTime(quote.sentAt) : "Not sent"],
            ["Updated", formatShortDateTime(quote.updatedAt)],
          ]}
        />
      </InfoCard>

      <InfoCard>
        <SectionTitle title="Line Items" />
        <View style={styles.lineItems}>
          {quote.lineItems.map((lineItem) => (
            <View key={lineItem.id} style={styles.lineItem}>
              <Text selectable style={styles.lineLabel}>
                {lineItem.label}
              </Text>
              <Text selectable style={styles.lineAmount}>
                {lineItem.amountLabel}
              </Text>
            </View>
          ))}
        </View>
      </InfoCard>

      <InfoCard>
        <SectionTitle title="Actions" />
        <Text selectable style={styles.bodyCopy}>
          Quote approval and PDF access are deferred until AMG confirms the safe portal workflow.
        </Text>
        <View style={styles.actions}>
          <AmgButton disabled label="View PDF" />
          <AmgButton disabled label="Approve Quote" variant="secondary" />
        </View>
      </InfoCard>

      <QuietNotice message="This screen does not expose internal margin, cost, vendor, or crew payment details." />
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
  headerCopy: {
    flex: 1,
    gap: spacing[1],
  },
  headerRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing[3],
  },
  label: {
    color: colors.dark.textMuted,
    fontSize: typography.sizes.sm,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  lineAmount: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.md,
  },
  lineItem: {
    borderColor: colors.dark.border,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    gap: spacing[1],
    padding: spacing[3],
  },
  lineItems: {
    gap: spacing[3],
  },
  lineLabel: {
    color: colors.dark.text,
    fontSize: typography.sizes.md,
    fontWeight: "700",
  },
  sectionTitle: {
    color: colors.dark.text,
    fontSize: typography.sizes.lg,
    fontWeight: "700",
  },
  title: {
    color: colors.dark.text,
    fontSize: typography.sizes.xxl,
    fontWeight: "700",
    lineHeight: 34,
  },
});
