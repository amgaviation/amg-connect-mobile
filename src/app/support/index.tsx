import { Redirect, router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, StyleSheet, Text } from "react-native";

import { AppScreen } from "@/components/layout/app-screen";
import { AmgButton } from "@/components/ui/amg-button";
import { InfoCard } from "@/components/ui/info-card";
import { LoadingState } from "@/components/ui/loading-state";
import { QuietNotice } from "@/components/ui/QuietNotice";
import { useAuth } from "@/features/auth/useAuth";
import { canEnterAppTabs, getRouteForAuthState } from "@/lib/auth/route-guards";
import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";

export default function SupportScreen() {
  const auth = useAuth();

  if (auth.isLoading) return <LoadingState />;
  if (!canEnterAppTabs(auth)) return <Redirect href={getRouteForAuthState(auth)} />;

  return (
    <AppScreen
      eyebrow="Support"
      title="Support / Contact AMG"
      description="Use approved AMG support channels for account, request, document, quote, invoice, and operational questions."
    >
      <BackButton />

      <InfoCard>
        <Text selectable style={styles.sectionTitle}>
          AMG Operations context
        </Text>
        <Text selectable style={styles.bodyCopy}>
          Support requests remain subject to aircraft status, crew availability, owner/operator approval, route and
          airport constraints, weather, support-scope review, and final AMG acceptance.
        </Text>
        <AmgButton disabled label="Contact from app" />
      </InfoCard>

      <QuietNotice message="In-app support submission is deferred until AMG confirms the support/contact backend route. This screen does not promise instant support or operational acceptance." />
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
  bodyCopy: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.md,
    lineHeight: 22,
  },
  sectionTitle: {
    color: colors.dark.text,
    fontSize: typography.sizes.lg,
    fontWeight: "700",
  },
});
