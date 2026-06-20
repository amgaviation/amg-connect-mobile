import { Redirect, router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, StyleSheet, Text } from "react-native";

import { AppScreen } from "@/components/layout/app-screen";
import { ProfileField } from "@/components/profile/ProfileField";
import { AmgButton } from "@/components/ui/amg-button";
import { InfoCard } from "@/components/ui/info-card";
import { LoadingState } from "@/components/ui/loading-state";
import { QuietNotice } from "@/components/ui/QuietNotice";
import { useAuth } from "@/features/auth/useAuth";
import { mapProfileFromAuth } from "@/features/profile/profile.mappers";
import { canEnterAppTabs, getRouteForAuthState } from "@/lib/auth/route-guards";
import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";

export default function ProfileScreen() {
  const auth = useAuth();

  if (auth.isLoading) return <LoadingState />;
  if (!canEnterAppTabs(auth)) return <Redirect href={getRouteForAuthState(auth)} />;

  const profile = mapProfileFromAuth(auth);

  async function handleSignOut() {
    await auth.signOut();
    router.replace("/auth/login");
  }

  return (
    <AppScreen
      eyebrow="Profile"
      title="Profile"
      description="Read-only account details from the authenticated AMG Connect session."
    >
      <BackButton />

      <InfoCard>
        <ProfileField label="Name" value={profile.fullName} />
        <ProfileField label="Email" value={profile.email} />
        <ProfileField label="Phone" value={profile.phone} />
        <ProfileField label="Company" value={profile.company} />
        <ProfileField label="Role" value={profile.role} />
        <ProfileField label="Account status" value={profile.accountStatus} />
        <ProfileField label="Home airport" value={profile.homeAirport} />
        <ProfileField label="Preferred contact" value={profile.preferredContact} />
      </InfoCard>

      <QuietNotice message="Profile editing, role changes, and approval status changes are not available in mobile. Contact AMG Operations to update account details." />
      <AmgButton label="Sign out" variant="secondary" onPress={handleSignOut} />
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
});
