import { PlaceholderScreen } from "@/components/layout/placeholder-screen";
import { useAuth } from "@/features/auth/useAuth";

export default function HomeTab() {
  const auth = useAuth();
  const roleLabel = auth.role ? auth.role.replace("_", " ") : "approved";

  return (
    <PlaceholderScreen
      eyebrow="Home"
      title="AMG Connect Mobile"
      description={`Private ${roleLabel} access is active. Full dashboard data remains deferred until the Supabase data contract is confirmed.`}
      notes={[
        "Client MVP first, with crew and operations support added after backend role mapping is verified.",
        "No support request is treated as accepted until AMG review is complete.",
      ]}
    />
  );
}
