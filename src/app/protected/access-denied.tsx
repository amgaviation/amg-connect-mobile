import { PlaceholderScreen } from "@/components/layout/placeholder-screen";

export default function AccessDeniedScreen() {
  return (
    <PlaceholderScreen
      eyebrow="Access Denied"
      title="Mobile access unavailable"
      description="This account is not currently approved for AMG Connect Mobile."
      notes={["Access decisions must come from the shared portal role model and Supabase authorization rules."]}
    />
  );
}
