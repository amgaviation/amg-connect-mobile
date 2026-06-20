import { Redirect, useRouter } from "expo-router";

import { AppScreen } from "@/components/layout/app-screen";
import { AmgButton } from "@/components/ui/amg-button";
import { InfoCard } from "@/components/ui/info-card";
import { LoadingState } from "@/components/ui/loading-state";
import { useAuth } from "@/features/auth/useAuth";
import { getRouteForAuthState } from "@/lib/auth/route-guards";

export default function AccessDeniedScreen() {
  const auth = useAuth();
  const router = useRouter();

  if (auth.isLoading) return <LoadingState />;
  if (!auth.isAuthenticated) return <Redirect href="/auth/login" />;
  if (auth.isApproved) return <Redirect href={getRouteForAuthState(auth)} />;

  async function handleSignOut() {
    await auth.signOut();
    router.replace("/auth/login");
  }

  return (
    <AppScreen
      eyebrow="Access"
      title="Access not available"
      description="This account does not currently have mobile access permissions. Contact AMG Operations if you believe this is incorrect."
    >
      <InfoCard>
        <AmgButton label="Sign out" variant="secondary" onPress={handleSignOut} />
      </InfoCard>
    </AppScreen>
  );
}
