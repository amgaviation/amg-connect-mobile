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
import { getDemoInvoiceById } from "@/features/invoices/invoice.demo";
import { canEnterAppTabs, getRouteForAuthState } from "@/lib/auth/route-guards";
import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";
import { formatShortDateTime } from "@/lib/utils/format";

export default function InvoiceDetailScreen() {
  const auth = useAuth();
  const params = useLocalSearchParams<{ invoiceId?: string }>();
  const invoiceId = Array.isArray(params.invoiceId) ? params.invoiceId[0] : params.invoiceId;
  const invoice = useMemo(() => (invoiceId ? getDemoInvoiceById(invoiceId) : null), [invoiceId]);

  if (auth.isLoading) return <LoadingState />;
  if (!canEnterAppTabs(auth)) return <Redirect href={getRouteForAuthState(auth)} />;

  if (!invoice) {
    return (
      <AppScreen eyebrow="Invoices" title="Invoice not found">
        <BackButton />
        <ErrorState
          title="Unable to open invoice"
          message="This invoice is not available in local demo data. Real invoice access requires confirmed backend mapping and RLS scope."
        />
      </AppScreen>
    );
  }

  return (
    <AppScreen eyebrow="Invoice Detail" title={invoice.title} description={invoice.paymentNote}>
      <BackButton />

      <InfoCard>
        <View style={styles.headerRow}>
          <View style={styles.headerCopy}>
            <Text selectable style={styles.label}>
              Invoice
            </Text>
            <Text selectable style={styles.title}>
              {invoice.title}
            </Text>
          </View>
          <StatusBadge type="invoice" status={invoice.status} />
        </View>
      </InfoCard>

      <InfoCard>
        <SectionTitle title="Invoice Summary" />
        <DetailGrid
          rows={[
            ["Related request", invoice.relatedRequestDisplayId ?? "Request pending"],
            ["Amount", invoice.amountLabel ?? "Amount pending"],
            ["Sent", invoice.sentAt ? formatShortDateTime(invoice.sentAt) : "Not sent"],
            ["Due", invoice.dueAt ? formatShortDateTime(invoice.dueAt) : "Not available"],
          ]}
        />
      </InfoCard>

      <InfoCard>
        <SectionTitle title="Payment" />
        <Text selectable style={styles.bodyCopy}>
          {invoice.paymentNote}
        </Text>
        <View style={styles.actions}>
          <AmgButton disabled label="View PDF" />
          <AmgButton disabled label="Pay Invoice" variant="secondary" />
        </View>
      </InfoCard>

      <QuietNotice message="This screen does not collect credit card data, mark invoices paid, or expose internal vendor/crew payment details." />
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
