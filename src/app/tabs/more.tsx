import { router, type Href } from "expo-router";
import { FileText, HelpCircle, MessageSquare, ReceiptText, Settings, Shield, User } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

import { MoreMenuItem } from "@/components/lists/MoreMenuItem";
import { AppScreen } from "@/components/layout/app-screen";
import { AmgButton } from "@/components/ui/amg-button";
import { InfoCard } from "@/components/ui/info-card";
import { QuietNotice } from "@/components/ui/QuietNotice";
import { useAuth } from "@/features/auth/useAuth";
import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";

export default function MoreTab() {
  const auth = useAuth();
  const hasOperationsAccess = auth.isAdmin || auth.isOperations || auth.isSuperAdmin;

  async function handleSignOut() {
    await auth.signOut();
    router.replace("/auth/login");
  }

  return (
    <AppScreen
      eyebrow="More"
      title="Account Tools"
      description="Profile, messages, quotes, invoices, settings, support, and legal references."
    >
      <InfoCard>
        <View style={styles.accountHeader}>
          <Text selectable style={styles.accountLabel}>
            Signed in
          </Text>
          <Text selectable style={styles.accountValue}>
            {auth.profile?.fullName ?? auth.user?.email ?? "AMG Connect account"}
          </Text>
          <Text selectable style={styles.accountMeta}>
            {auth.role ?? "Role unresolved"} · {auth.approvalStatus ?? "Status unresolved"}
          </Text>
        </View>
      </InfoCard>

      <InfoCard>
        <MoreMenuItem
          title="Profile"
          description="Account identity, role, and approval status."
          icon={<User color={colors.amg.accentBlue} size={20} />}
          onPress={() => router.push("/profile" as Href)}
        />
        <MoreMenuItem
          title="Messages"
          description="Read-only AMG Operations updates."
          icon={<MessageSquare color={colors.amg.accentBlue} size={20} />}
          onPress={() => router.push("/messages" as Href)}
        />
        <MoreMenuItem
          title="Quotes"
          description="Read-only support quotes."
          icon={<ReceiptText color={colors.amg.accentBlue} size={20} />}
          onPress={() => router.push("/quotes" as Href)}
        />
        <MoreMenuItem
          title="Invoices"
          description="Invoices and receipts, without in-app payment processing."
          icon={<FileText color={colors.amg.accentBlue} size={20} />}
          onPress={() => router.push("/invoices" as Href)}
        />
        <MoreMenuItem
          title="Settings"
          description="App preferences, notification readiness, and session info."
          icon={<Settings color={colors.amg.accentBlue} size={20} />}
          onPress={() => router.push("/settings" as Href)}
        />
        <MoreMenuItem
          title="Support / Contact AMG"
          description="Operational support context and contact guidance."
          icon={<HelpCircle color={colors.amg.accentBlue} size={20} />}
          onPress={() => router.push("/support" as Href)}
        />
        <MoreMenuItem
          title="Legal"
          description="Website legal reference mapping for future mobile links."
          icon={<Shield color={colors.amg.accentBlue} size={20} />}
          onPress={() => router.push("/legal" as Href)}
        />
      </InfoCard>

      {hasOperationsAccess ? (
        <InfoCard>
          <Text selectable style={styles.sectionTitle}>
            Operations Access
          </Text>
          <QuietNotice
            message={
              auth.isSuperAdmin
                ? "Operations mobile tools are planned for a later release. Website Editor and publishing tools remain available in the desktop portal."
                : "Operations mobile tools are planned for a later release. Use the desktop portal for full admin access."
            }
          />
        </InfoCard>
      ) : null}

      <AmgButton label="Sign out" variant="secondary" onPress={handleSignOut} />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  accountHeader: {
    gap: spacing[1],
  },
  accountLabel: {
    color: colors.dark.textMuted,
    fontSize: typography.sizes.sm,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  accountMeta: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.sm,
    lineHeight: 20,
  },
  accountValue: {
    color: colors.dark.text,
    fontSize: typography.sizes.xl,
    fontWeight: "700",
  },
  sectionTitle: {
    color: colors.dark.text,
    fontSize: typography.sizes.lg,
    fontWeight: "700",
  },
});
