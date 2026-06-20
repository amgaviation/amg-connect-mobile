import type { AmgApprovalStatus, AmgRole } from "@/lib/auth/roles";

export type ProfileSummary = {
  accountStatus: AmgApprovalStatus | null;
  company?: string;
  email: string | null;
  fullName: string | null;
  homeAirport?: string;
  phone?: string;
  preferredContact?: string;
  role: AmgRole | null;
};
