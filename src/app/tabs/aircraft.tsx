import { PlaceholderScreen } from "@/components/layout/placeholder-screen";

export default function AircraftTab() {
  return (
    <PlaceholderScreen
      eyebrow="Aircraft"
      title="Aircraft records"
      description="Aircraft records connected to your account will appear here."
      notes={["Aircraft visibility must come from the shared AMG Supabase backend and approved account scope."]}
    />
  );
}
