import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { AppScreen } from "@/components/layout/app-screen";
import { AmgButton } from "@/components/ui/amg-button";
import { InfoCard } from "@/components/ui/info-card";
import { useAuth } from "@/features/auth/useAuth";
import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";

export default function MoreTab() {
  const auth = useAuth();
  const router = useRouter();

  async function handleSignOut() {
    await auth.signOut();
    router.replace("/auth/login");
  }

  return (
    <AppScreen
      eyebrow="More"
      title="Account tools"
      description="Profile, messages, quotes, settings, and support tools."
    >
      <InfoCard>
        <View style={styles.row}>
          <Text selectable style={styles.label}>
            Account
          </Text>
          <Text selectable style={styles.value}>
            {auth.user?.email ?? "Signed in"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text selectable style={styles.label}>
            Role
          </Text>
          <Text selectable style={styles.value}>
            {auth.role ?? "Unresolved"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text selectable style={styles.label}>
            Status
          </Text>
          <Text selectable style={styles.value}>
            {auth.approvalStatus ?? "Unresolved"}
          </Text>
        </View>
        <Text selectable style={styles.note}>
          Messages, quotes, invoices, settings, heavy admin, and website-editor workflows remain deferred.
        </Text>
        <AmgButton label="Sign out" variant="secondary" onPress={handleSignOut} />
      </InfoCard>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.dark.textMuted,
    fontSize: typography.sizes.sm,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  note: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.sm,
    lineHeight: 20,
  },
  row: {
    gap: spacing[1],
  },
  value: {
    color: colors.dark.text,
    fontSize: typography.sizes.md,
    lineHeight: 22,
  },
});
