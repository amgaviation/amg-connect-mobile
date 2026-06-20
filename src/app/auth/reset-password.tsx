import { useRouter } from "expo-router";
import { Mail } from "lucide-react-native";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { AppScreen } from "@/components/layout/app-screen";
import { AmgButton } from "@/components/ui/amg-button";
import { InfoCard } from "@/components/ui/info-card";
import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";

export default function ResetPasswordScreen() {
  const router = useRouter();

  return (
    <AppScreen title="Reset Password" description="Password recovery will be connected after the AMG Supabase auth contract is verified.">
      <InfoCard>
        <View style={styles.field}>
          <Text selectable style={styles.label}>
            Account email
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

        <AmgButton label="Return to login" onPress={() => router.push("/auth/login")} />
      </InfoCard>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
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
});
