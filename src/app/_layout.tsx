import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";

import { AuthProvider } from "@/features/auth/AuthProvider";
import { colors } from "@/lib/theme/colors";

export default function RootLayout() {
  useEffect(() => {
    SystemUI.setBackgroundColorAsync(colors.amg.midnightNavy).catch(() => undefined);
  }, []);

  return (
    <AuthProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: colors.amg.midnightNavy },
          headerShown: false,
          headerStyle: { backgroundColor: colors.amg.midnightNavy },
          headerTintColor: colors.amg.white,
          headerShadowVisible: false,
          headerTitleStyle: {
            fontWeight: "600",
          },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="tabs" />
      </Stack>
    </AuthProvider>
  );
}
