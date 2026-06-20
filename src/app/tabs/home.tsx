import { PlaceholderScreen } from "@/components/layout/placeholder-screen";

export default function HomeTab() {
  return (
    <PlaceholderScreen
      eyebrow="Home"
      title="AMG Connect Mobile"
      description="A private mobile workspace for aircraft support activity, requests, documents, and account access."
      notes={[
        "Client MVP first, with crew and operations support added after backend role mapping is verified.",
        "No support request is treated as accepted until AMG review is complete.",
      ]}
    />
  );
}
