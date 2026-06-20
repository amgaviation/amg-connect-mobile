import { ChevronRight, ReceiptText } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { StatusBadge } from "@/components/status/StatusBadge";
import type { InvoiceSummary } from "@/features/invoices/invoice.types";
import type { QuoteSummary } from "@/features/quotes/quote.types";
import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";
import { formatShortDateTime } from "@/lib/utils/format";

type QuoteInvoiceCardProps =
  | {
      item: QuoteSummary;
      kind: "quote";
      onPress: () => void;
    }
  | {
      item: InvoiceSummary;
      kind: "invoice";
      onPress: () => void;
    };

export function QuoteInvoiceCard({ item, kind, onPress }: QuoteInvoiceCardProps) {
  return (
    <Pressable
      accessibilityLabel={`Open ${kind} ${item.title}`}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.iconWrap}>
        <ReceiptText color={colors.amg.accentBlue} size={20} />
      </View>
      <View style={styles.main}>
        <View style={styles.topRow}>
          <Text selectable style={styles.kind}>
            {kind === "quote" ? "Quote" : "Invoice"}
          </Text>
          {item.isDemo ? <StatusBadge type="demo" label="Demo" /> : null}
        </View>
        <Text selectable style={styles.title}>
          {item.title}
        </Text>
        <Text selectable style={styles.meta}>
          {item.relatedRequestDisplayId ?? "Request pending"} · {item.amountLabel ?? "Amount pending"}
        </Text>
        <View style={styles.bottomRow}>
          {kind === "quote" ? (
            <StatusBadge type="quote" status={item.status} />
          ) : (
            <StatusBadge type="invoice" status={item.status} />
          )}
          <Text selectable style={styles.updated}>
            Updated {formatShortDateTime(item.updatedAt)}
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
    alignItems: "flex-start",
    backgroundColor: colors.dark.surface,
    borderColor: colors.dark.border,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    gap: spacing[3],
    padding: spacing[4],
  },
  iconWrap: {
    alignItems: "center",
    backgroundColor: colors.amg.deepBlue,
    borderColor: colors.dark.border,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  kind: {
    color: colors.dark.textMuted,
    flex: 1,
    fontSize: typography.sizes.xs,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  main: {
    flex: 1,
    gap: spacing[2],
  },
  meta: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.sm,
    lineHeight: 20,
  },
  pressed: {
    opacity: 0.82,
  },
  title: {
    color: colors.dark.text,
    fontSize: typography.sizes.lg,
    fontWeight: "700",
    lineHeight: 24,
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
