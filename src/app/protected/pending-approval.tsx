import { Redirect, useRouter } from "expo-router";

import { AppScreen } from "@/components/layout/app-screen";
import { AmgButton } from "@/components/ui/amg-button";
import { InfoCard } from "@/components/ui/info-card";
import { LoadingState } from "@/components/ui/loading-state";
import { useAuth } from "@/features/auth/useAuth";
import { getRouteForAuthState } from "@/lib/auth/route-guards";

export default function PendingApprovalScreen() {
  const auth = useAuth();
  const router = useRouter();

  if (auth.isLoading) return <LoadingState />;
  if (!auth.isAuthenticated) return <Redirect href="/auth/login" />;
  if (!auth.isPending) return <Redirect href={getRouteForAuthState(auth)} />;

  async function handleSignOut() {
    await auth.signOut();
    router.replace("/auth/login");
  }

  return (
    <AppScreen
      eyebrow="Account Review"
      title="Account pending approval"
      description="Your AMG Connect access is under review. Once approved, your mobile workspace will become available."
    >
      <InfoCard>
        <AmgButton label="Sign out" variant="secondary" onPress={handleSignOut} />
      </InfoCard>
    </AppScreen>
  );
}
