import { StyleSheet, Text, View } from "react-native";

import { AppScreen } from "@/components/layout/app-screen";
import { AmgLogo } from "@/components/ui/amg-logo";
import { InfoCard } from "@/components/ui/info-card";
import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";

type PlaceholderScreenProps = {
  description: string;
  eyebrow: string;
  notes?: string[];
  title: string;
};

export function PlaceholderScreen({ description, eyebrow, notes = [], title }: PlaceholderScreenProps) {
  return (
    <AppScreen eyebrow={eyebrow} title={title} description={description}>
      <View style={styles.logoWrap}>
        <AmgLogo compact />
      </View>

      {notes.length ? (
        <InfoCard>
          {notes.map((note) => (
            <View key={note} style={styles.noteRow}>
              <View style={styles.dot} />
              <Text selectable style={styles.note}>
                {note}
              </Text>
            </View>
          ))}
        </InfoCard>
      ) : null}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  logoWrap: {
    alignItems: "flex-start",
  },
  noteRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: spacing[3],
  },
  dot: {
    backgroundColor: colors.amg.accentBlue,
    borderRadius: 4,
    height: 8,
    marginTop: 6,
    width: 8,
  },
  note: {
    color: colors.dark.textSecondary,
    flex: 1,
    fontSize: typography.sizes.md,
    lineHeight: 22,
  },
});
