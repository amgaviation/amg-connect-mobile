import { Redirect, router, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { SupportRequestForm } from "@/components/forms/SupportRequestForm";
import { AppScreen } from "@/components/layout/app-screen";
import { LoadingState } from "@/components/ui/loading-state";
import { demoAircraft } from "@/features/aircraft/aircraft.demo";
import { useAuth } from "@/features/auth/useAuth";
import { canEnterAppTabs, getRouteForAuthState } from "@/lib/auth/route-guards";
import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";

export default function NewRequestScreen() {
  const auth = useAuth();
  const params = useLocalSearchParams<{ aircraftId?: string }>();
  const initialAircraftId = Array.isArray(params.aircraftId) ? params.aircraftId[0] : params.aircraftId;

  if (auth.isLoading) return <LoadingState />;
  if (!canEnterAppTabs(auth)) return <Redirect href={getRouteForAuthState(auth)} />;

  return (
    <AppScreen
      eyebrow="Requests"
      title="New Support Request"
      description="Build a reviewed request draft. Live submission is deferred until AMG confirms the safe backend request mapping."
    >
      <Pressable accessibilityLabel="Go back" accessibilityRole="button" onPress={() => router.back()} style={styles.back}>
        <ArrowLeft color={colors.amg.lightGray} size={18} />
        <Text selectable={false} style={styles.backLabel}>
          Back
        </Text>
      </Pressable>

      <View style={styles.formWrap}>
        <SupportRequestForm aircraftOptions={demoAircraft} initialAircraftId={initialAircraftId} />
      </View>
    </AppScreen>
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
  formWrap: {
    gap: spacing[4],
  },
});
