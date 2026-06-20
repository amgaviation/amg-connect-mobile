import { Redirect, useRouter } from "expo-router";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import { AuthLayout } from "@/components/layout/auth-layout";
import { AmgButton } from "@/components/ui/amg-button";
import { AmgTextInput } from "@/components/ui/amg-text-input";
import { ErrorState } from "@/components/ui/error-state";
import { InfoCard } from "@/components/ui/info-card";
import { useAuth } from "@/features/auth/useAuth";
import { getRouteForAuthState } from "@/lib/auth/route-guards";
import { colors } from "@/lib/theme/colors";
import { typography } from "@/lib/theme/typography";

export default function LoginScreen() {
  const router = useRouter();
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  if (!auth.isLoading && auth.isAuthenticated) {
    return <Redirect href={getRouteForAuthState(auth)} />;
  }

  async function handleSignIn() {
    setFormError(null);

    if (!email.trim() || !password) {
      setFormError("Enter your email and password.");
      return;
    }

    const result = await auth.signInWithPassword({ email, password });
    if (!result.ok) {
      setFormError(result.error?.message ?? "Unable to sign in.");
      return;
    }

    router.replace("/");
  }

  return (
    <AuthLayout
      title="AMG Connect"
      subtitle="Private access for approved AMG Aviation Group clients, crew, and operations users."
      footer="Access is limited to approved accounts. Requests and support activity remain subject to AMG review and final acceptance."
    >
      <InfoCard>
        {auth.error?.code === "missing_supabase_config" ? <ErrorState message={auth.error.message} /> : null}
        {formError ? <ErrorState title="Sign in failed" message={formError} /> : null}

        <AmgTextInput
          autoCapitalize="none"
          autoComplete="email"
          editable={!auth.isLoading}
          keyboardType="email-address"
          label="Email"
          leftIcon={Mail}
          onChangeText={setEmail}
          placeholder="email@example.com"
          textContentType="emailAddress"
          value={email}
        />

        <AmgTextInput
          autoComplete="password"
          editable={!auth.isLoading}
          label="Password"
          leftIcon={LockKeyhole}
          onChangeText={setPassword}
          placeholder="Password"
          rightSlot={
            <Pressable
              accessibilityLabel={showPassword ? "Hide password" : "Show password"}
              accessibilityRole="button"
              hitSlop={8}
              onPress={() => setShowPassword((current) => !current)}
            >
              {showPassword ? (
                <EyeOff color={colors.amg.slateGray} size={18} />
              ) : (
                <Eye color={colors.amg.slateGray} size={18} />
              )}
            </Pressable>
          }
          secureTextEntry={!showPassword}
          textContentType="password"
          value={password}
        />

        <AmgButton
          disabled={!auth.supabaseConfigured}
          label="Sign In"
          loading={auth.isLoading}
          onPress={handleSignIn}
        />
        <AmgButton
          label="Reset password"
          variant="secondary"
          onPress={() => router.push("/auth/reset-password")}
        />
      </InfoCard>

      <Text selectable style={styles.notice}>
        Use the same account approved for AMG Connect portal access.
      </Text>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  notice: {
    color: colors.dark.textMuted,
    fontSize: typography.sizes.sm,
    lineHeight: 20,
    textAlign: "center",
  },
});
