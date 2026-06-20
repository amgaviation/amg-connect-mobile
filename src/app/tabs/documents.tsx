import { PlaceholderScreen } from "@/components/layout/placeholder-screen";

export default function DocumentsTab() {
  return (
    <PlaceholderScreen
      eyebrow="Documents"
      title="Approved documents"
      description="Approved documents and support records will appear here."
      notes={["Document access must respect Supabase Storage policies, RLS, and portal authorization rules."]}
    />
  );
}
