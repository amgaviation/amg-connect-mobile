import type { AmgApprovalStatus, AmgRole } from "@/lib/auth/roles";

export type AmgSessionProfile = {
  approvalStatus: AmgApprovalStatus;
  email: string;
  fullName: string;
  role: AmgRole;
  userId: string;
};

export async function getCurrentSessionProfile(): Promise<AmgSessionProfile | null> {
  return null;
}

export async function refreshCurrentSessionProfile(): Promise<AmgSessionProfile | null> {
  return null;
}
