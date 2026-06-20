import { ChevronRight, FileText } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { StatusBadge } from "@/components/status/StatusBadge";
import type { DocumentSummary } from "@/features/documents/document.types";
import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";
import { formatRelativeDate } from "@/lib/utils/format";

type DocumentCardProps = {
  document: DocumentSummary;
  onPress: () => void;
};

export function DocumentCard({ document, onPress }: DocumentCardProps) {
  const related = [document.relatedAircraftLabel, document.relatedRequestDisplayId].filter(Boolean).join(" · ");

  return (
    <Pressable
      accessibilityLabel={`Open document ${document.title}`}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.iconWrap}>
        <FileText color={colors.amg.accentBlue} size={20} />
      </View>
      <View style={styles.main}>
        <View style={styles.topRow}>
          <Text selectable style={styles.title}>
            {document.title}
          </Text>
          {document.isDemo ? <StatusBadge type="demo" label="Demo" /> : null}
        </View>
        <Text selectable style={styles.meta}>
          {document.category} · {document.fileType}
        </Text>
        {related ? (
          <Text selectable style={styles.meta}>
            {related}
          </Text>
        ) : null}
        <View style={styles.bottomRow}>
          <StatusBadge type="document" status={document.status} />
          <Text selectable style={styles.updated}>
            {formatRelativeDate(document.updatedAt)}
          </Text>
        </View>
        <Text selectable style={styles.visibility}>
          {document.visibilityLabel}
        </Text>
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
    flex: 1,
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
  visibility: {
    color: colors.dark.textMuted,
    fontSize: typography.sizes.xs,
    lineHeight: 16,
  },
});
