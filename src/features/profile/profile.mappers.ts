import type { AuthContextValue } from "@/features/auth/auth.types";
import type { ProfileSummary } from "@/features/profile/profile.types";

export function mapProfileFromAuth(auth: AuthContextValue): ProfileSummary {
  return {
    accountStatus: auth.approvalStatus,
    company: undefined,
    email: auth.profile?.email ?? auth.user?.email ?? null,
    fullName: auth.profile?.fullName ?? null,
    homeAirport: undefined,
    phone: undefined,
    preferredContact: undefined,
    role: auth.role,
  };
}
