import { useRouter } from "expo-router";
import { Mail } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";

import { AuthLayout } from "@/components/layout/auth-layout";
import { AmgButton } from "@/components/ui/amg-button";
import { AmgTextInput } from "@/components/ui/amg-text-input";
import { ErrorState } from "@/components/ui/error-state";
import { InfoCard } from "@/components/ui/info-card";
import { useAuth } from "@/features/auth/useAuth";
import { colors } from "@/lib/theme/colors";
import { typography } from "@/lib/theme/typography";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleReset() {
    setError(null);

    if (!email.trim()) {
      setError("Enter your account email.");
      return;
    }

    setIsSubmitting(true);
    const result = await auth.sendPasswordReset(email);
    setIsSubmitting(false);

    if (!result.ok) {
      setError(result.error?.message ?? "Unable to send reset instructions.");
      return;
    }

    setIsSubmitted(true);
  }

  return (
    <AuthLayout title="Reset password" subtitle="Enter the email connected to your AMG Connect account.">
      <InfoCard>
        {error ? <ErrorState title="Reset unavailable" message={error} /> : null}
        {isSubmitted ? (
          <Text accessibilityLiveRegion="polite" selectable style={styles.success}>
            If an approved account exists for this email, password reset instructions will be sent.
          </Text>
        ) : null}

        <AmgTextInput
          autoCapitalize="none"
          autoComplete="email"
          editable={!isSubmitting}
          keyboardType="email-address"
          label="Account email"
          leftIcon={Mail}
          onChangeText={setEmail}
          placeholder="email@example.com"
          textContentType="emailAddress"
          value={email}
        />

        <AmgButton label="Send reset instructions" loading={isSubmitting} onPress={handleReset} />
        <AmgButton label="Back to sign in" variant="secondary" onPress={() => router.push("/auth/login")} />
      </InfoCard>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  success: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.md,
    lineHeight: 22,
  },
});
