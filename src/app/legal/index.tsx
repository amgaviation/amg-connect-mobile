import { Redirect, router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppScreen } from "@/components/layout/app-screen";
import { InfoCard } from "@/components/ui/info-card";
import { LoadingState } from "@/components/ui/loading-state";
import { QuietNotice } from "@/components/ui/QuietNotice";
import { useAuth } from "@/features/auth/useAuth";
import { canEnterAppTabs, getRouteForAuthState } from "@/lib/auth/route-guards";
import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";

const legalReferences = [
  "Privacy Policy",
  "Privacy Choices",
  "Cookie Policy",
  "Terms & Conditions",
  "Mission Acceptance Policy",
  "Credential Submission Notice",
  "Accessibility",
  "All Legal Notices",
];

export default function LegalScreen() {
  const auth = useAuth();

  if (auth.isLoading) return <LoadingState />;
  if (!canEnterAppTabs(auth)) return <Redirect href={getRouteForAuthState(auth)} />;

  return (
    <AppScreen
      eyebrow="Legal"
      title="Legal References"
      description="Mobile legal links will map to approved AMG website policy URLs after URL mapping is confirmed."
    >
      <BackButton />
      <InfoCard>
        <Text selectable style={styles.sectionTitle}>
          Website legal references
        </Text>
        <View style={styles.list}>
          {legalReferences.map((reference) => (
            <View key={reference} style={styles.row}>
              <Text selectable style={styles.reference}>
                {reference}
              </Text>
              <Text selectable style={styles.pending}>
                URL mapping pending
              </Text>
            </View>
          ))}
        </View>
      </InfoCard>
      <QuietNotice message="This screen does not rewrite or replace AMG legal policies. It documents the current website legal reference set for future mobile link mapping." />
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
  list: {
    gap: spacing[3],
  },
  pending: {
    color: colors.dark.textMuted,
    fontSize: typography.sizes.sm,
  },
  reference: {
    color: colors.dark.text,
    flex: 1,
    fontSize: typography.sizes.md,
    fontWeight: "700",
  },
  row: {
    alignItems: "center",
    borderColor: colors.dark.border,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    gap: spacing[3],
    padding: spacing[3],
  },
  sectionTitle: {
    color: colors.dark.text,
    fontSize: typography.sizes.lg,
    fontWeight: "700",
  },
});
