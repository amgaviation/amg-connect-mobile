import { Redirect } from "expo-router";

import { LoadingState } from "@/components/ui/loading-state";
import { useAuth } from "@/features/auth/useAuth";
import { getRouteForAuthState } from "@/lib/auth/route-guards";

export default function HomeScreen() {
  const auth = useAuth();

  if (auth.isLoading) return <LoadingState />;

  return <Redirect href={getRouteForAuthState(auth)} />;
}
