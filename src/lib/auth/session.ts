import { getSupabaseClient } from "@/lib/supabase/client";
import { resolveAuthProfile } from "@/lib/auth/role-resolver";

import type { AmgAuthProfile } from "@/features/auth/auth.types";
import type { AmgApprovalStatus, AmgRole } from "@/lib/auth/roles";

export type AmgSessionProfile = {
  approvalStatus: AmgApprovalStatus;
  email: string;
  fullName: string;
  role: AmgRole;
  userId: string;
};

export async function getCurrentSessionProfile(): Promise<AmgAuthProfile | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;

  return resolveAuthProfile(supabase, user);
}

export async function refreshCurrentSessionProfile(): Promise<AmgAuthProfile | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { error } = await supabase.auth.refreshSession();
  if (error) return null;

  return getCurrentSessionProfile();
}
