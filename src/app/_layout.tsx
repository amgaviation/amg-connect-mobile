import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";

import { colors } from "@/lib/theme/colors";

export default function RootLayout() {
  useEffect(() => {
    SystemUI.setBackgroundColorAsync(colors.amg.midnightNavy).catch(() => undefined);
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: colors.amg.midnightNavy },
          headerStyle: { backgroundColor: colors.amg.midnightNavy },
          headerTintColor: colors.amg.white,
          headerShadowVisible: false,
          headerTitleStyle: {
            fontWeight: "600",
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
        <Stack.Screen name="protected" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
