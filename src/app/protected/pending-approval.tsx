import { PlaceholderScreen } from "@/components/layout/placeholder-screen";

export default function PendingApprovalScreen() {
  return (
    <PlaceholderScreen
      eyebrow="Pending Approval"
      title="AMG review required"
      description="Your AMG Connect profile is pending review. Mobile access will be available after the account role and approval status are confirmed."
      notes={["This screen mirrors the existing portal pending-approval behavior and does not grant access by itself."]}
    />
  );
}
