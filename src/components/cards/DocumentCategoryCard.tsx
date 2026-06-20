import { FolderOpen } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { DocumentCategory } from "@/features/documents/document.types";
import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";

type DocumentCategoryCardProps = {
  category: DocumentCategory;
  count: number;
  label?: string;
  onPress: () => void;
  selected?: boolean;
};

export function DocumentCategoryCard({
  category,
  count,
  label,
  onPress,
  selected = false,
}: DocumentCategoryCardProps) {
  return (
    <Pressable
      accessibilityLabel={`Filter documents by ${category}`}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [styles.card, selected && styles.selected, pressed && styles.pressed]}
    >
      <View style={styles.iconWrap}>
        <FolderOpen color={colors.amg.accentBlue} size={18} />
      </View>
      <Text selectable={false} style={styles.title}>
        {label ?? category}
      </Text>
      <Text selectable={false} style={styles.count}>
        {count} document{count === 1 ? "" : "s"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.dark.surface,
    borderColor: colors.dark.border,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    gap: spacing[2],
    minWidth: 164,
    padding: spacing[4],
  },
  count: {
    color: colors.dark.textMuted,
    fontSize: typography.sizes.sm,
  },
  iconWrap: {
    alignItems: "center",
    backgroundColor: colors.amg.deepBlue,
    borderColor: colors.dark.border,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  pressed: {
    opacity: 0.82,
  },
  selected: {
    borderColor: colors.amg.accentBlue,
  },
  title: {
    color: colors.dark.text,
    fontSize: typography.sizes.md,
    fontWeight: "700",
    lineHeight: 22,
  },
});
