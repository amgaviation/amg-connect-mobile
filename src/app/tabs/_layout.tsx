import { Redirect, Tabs } from "expo-router";
import { FileText, FolderOpen, Home, Plane, Wrench } from "lucide-react-native";

import { LoadingState } from "@/components/ui/loading-state";
import { useAuth } from "@/features/auth/useAuth";
import { canEnterAppTabs, getRouteForAuthState } from "@/lib/auth/route-guards";
import { colors } from "@/lib/theme/colors";

export default function TabsLayout() {
  const auth = useAuth();

  if (auth.isLoading) return <LoadingState />;
  if (!canEnterAppTabs(auth)) return <Redirect href={getRouteForAuthState(auth)} />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.amg.accentBlue,
        tabBarInactiveTintColor: colors.amg.slateGray,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
        tabBarStyle: {
          backgroundColor: colors.amg.midnightNavy,
          borderTopColor: colors.dark.border,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="requests"
        options={{
          title: "Requests",
          tabBarIcon: ({ color, size }) => <Wrench color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="aircraft"
        options={{
          title: "Aircraft",
          tabBarIcon: ({ color, size }) => <Plane color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="documents"
        options={{
          title: "Documents",
          tabBarIcon: ({ color, size }) => <FileText color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ color, size }) => <FolderOpen color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
