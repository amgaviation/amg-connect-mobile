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
        <Stack.Screen name="requests/new" />
        <Stack.Screen name="requests/[requestId]" />
        <Stack.Screen name="aircraft/[aircraftId]" />
        <Stack.Screen name="documents/[documentId]" />
        <Stack.Screen name="quotes/index" />
        <Stack.Screen name="quotes/[quoteId]" />
        <Stack.Screen name="invoices/index" />
        <Stack.Screen name="invoices/[invoiceId]" />
        <Stack.Screen name="messages/index" />
        <Stack.Screen name="messages/[threadId]" />
        <Stack.Screen name="profile/index" />
        <Stack.Screen name="settings/index" />
        <Stack.Screen name="legal/index" />
        <Stack.Screen name="support/index" />
      </Stack>
    </AuthProvider>
  );
}
