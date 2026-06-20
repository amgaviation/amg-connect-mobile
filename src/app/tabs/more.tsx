import { PlaceholderScreen } from "@/components/layout/placeholder-screen";

export default function MoreTab() {
  return (
    <PlaceholderScreen
      eyebrow="More"
      title="Account tools"
      description="Profile, messages, quotes, settings, and support tools."
      notes={[
        "Messages, quotes, invoices, and settings are intentionally scaffolded only.",
        "Heavy admin and website-editor workflows remain portal-first unless AMG explicitly moves them to mobile.",
      ]}
    />
  );
}
