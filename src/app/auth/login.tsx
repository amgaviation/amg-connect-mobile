import { useRouter } from "expo-router";
import { LockKeyhole, Mail } from "lucide-react-native";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { AppScreen } from "@/components/layout/app-screen";
import { AmgLogo } from "@/components/ui/amg-logo";
import { AmgButton } from "@/components/ui/amg-button";
import { InfoCard } from "@/components/ui/info-card";
import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <AppScreen>
      <View style={styles.logoWrap}>
        <AmgLogo />
      </View>

      <View style={styles.header}>
        <Text selectable style={styles.eyebrow}>
          AMG Connect
        </Text>
        <Text selectable style={styles.title}>
          Private account access
        </Text>
        <Text selectable style={styles.copy}>
          Sign-in will connect to the approved AMG Supabase project in a later phase.
        </Text>
      </View>

      <InfoCard>
        <View style={styles.field}>
          <Text selectable style={styles.label}>
            Email
          </Text>
          <View style={styles.inputWrap}>
            <Mail size={18} color={colors.amg.slateGray} />
            <TextInput
              autoCapitalize="none"
              editable={false}
              keyboardType="email-address"
              placeholder="email@example.com"
              placeholderTextColor={colors.dark.textMuted}
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.field}>
          <Text selectable style={styles.label}>
            Password
          </Text>
          <View style={styles.inputWrap}>
            <LockKeyhole size={18} color={colors.amg.slateGray} />
            <TextInput
              editable={false}
              placeholder="Password"
              placeholderTextColor={colors.dark.textMuted}
              secureTextEntry
              style={styles.input}
            />
          </View>
        </View>

        <AmgButton label="Preview mobile workspace" onPress={() => router.push("/tabs/home")} />
        <AmgButton
          label="Reset password"
          variant="secondary"
          onPress={() => router.push("/auth/reset-password")}
        />
      </InfoCard>

      <Text selectable style={styles.notice}>
        Portal access remains subject to account approval, role scope, aircraft status, support review,
        and final acceptance.
      </Text>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  logoWrap: {
    alignItems: "center",
    paddingTop: spacing[4],
  },
  header: {
    gap: spacing[2],
  },
  eyebrow: {
    color: colors.amg.accentBlue,
    fontSize: typography.sizes.sm,
    fontWeight: "700",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  title: {
    color: colors.dark.text,
    fontSize: typography.sizes.xxxl,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 42,
  },
  copy: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.md,
    lineHeight: 22,
  },
  field: {
    gap: spacing[2],
  },
  label: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.sm,
    fontWeight: "600",
  },
  inputWrap: {
    alignItems: "center",
    backgroundColor: colors.dark.input,
    borderColor: colors.dark.border,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    gap: spacing[2],
    minHeight: 52,
    paddingHorizontal: spacing[3],
  },
  input: {
    color: colors.dark.text,
    flex: 1,
    fontSize: typography.sizes.md,
  },
  notice: {
    color: colors.dark.textMuted,
    fontSize: typography.sizes.sm,
    lineHeight: 20,
  },
});
