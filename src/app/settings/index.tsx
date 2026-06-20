import { Redirect, router, type Href } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppScreen } from "@/components/layout/app-screen";
import { NotificationPreferenceRow } from "@/components/settings/NotificationPreferenceRow";
import { SettingsRow } from "@/components/settings/SettingsRow";
import { AmgButton } from "@/components/ui/amg-button";
import { InfoCard } from "@/components/ui/info-card";
import { LoadingState } from "@/components/ui/loading-state";
import { QuietNotice } from "@/components/ui/QuietNotice";
import { useAuth } from "@/features/auth/useAuth";
import { demoSettings } from "@/features/settings/settings.demo";
import { canEnterAppTabs, getRouteForAuthState } from "@/lib/auth/route-guards";
import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";

export default function SettingsScreen() {
  const auth = useAuth();

  if (auth.isLoading) return <LoadingState />;
  if (!canEnterAppTabs(auth)) return <Redirect href={getRouteForAuthState(auth)} />;

  async function handleSignOut() {
    await auth.signOut();
    router.replace("/auth/login");
  }

  return (
    <AppScreen
      eyebrow="Settings"
      title="Settings"
      description="App preferences and notification readiness. Mobile notification delivery is not enabled in this MVP."
    >
      <BackButton />

      <InfoCard>
        <SectionTitle title="App" />
        <SettingsRow title="Appearance" description="Uses the system appearance setting." rightSlot={<Pill label="System" />} />
        <SettingsRow title="App version" description={`AMG Connect Mobile ${demoSettings.appVersion}`} />
        <SettingsRow title="Session" description={auth.user?.email ?? "Authenticated session"} />
      </InfoCard>

      <InfoCard>
        <SectionTitle title="Notifications" />
        <QuietNotice message="Notification preferences will be available once mobile notifications are enabled for your account." />
        <View style={styles.rows}>
          {demoSettings.preferences.map((preference) => (
            <NotificationPreferenceRow key={preference.key} preference={preference} />
          ))}
        </View>
      </InfoCard>

      <InfoCard>
        <SectionTitle title="Links" />
        <View style={styles.rows}>
          <SettingsRow title="Support" description="Contact and operational support context." rightSlot={<AmgButton label="Open" variant="secondary" onPress={() => router.push("/support" as Href)} />} />
          <SettingsRow title="Legal" description="Current website legal reference mapping." rightSlot={<AmgButton label="Open" variant="secondary" onPress={() => router.push("/legal" as Href)} />} />
        </View>
      </InfoCard>

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

function SectionTitle({ title }: { title: string }) {
  return (
    <Text selectable style={styles.sectionTitle}>
      {title}
    </Text>
  );
}

function Pill({ label }: { label: string }) {
  return (
    <View style={styles.pill}>
      <Text selectable={false} style={styles.pillLabel}>
        {label}
      </Text>
    </View>
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
  pill: {
    borderColor: colors.dark.border,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
  },
  pillLabel: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.xs,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  rows: {
    gap: spacing[3],
  },
  sectionTitle: {
    color: colors.dark.text,
    fontSize: typography.sizes.lg,
    fontWeight: "700",
  },
});
