import type { Href } from "expo-router";

import type { AuthContextValue } from "@/features/auth/auth.types";
import { canAccessMobileApp, isDeniedApprovalStatus, isPendingApprovalStatus } from "@/lib/auth/roles";

export type AuthRoute =
  | "/auth/login"
  | "/protected/access-denied"
  | "/protected/pending-approval"
  | "/tabs/home";

type GuardState = Pick<
  AuthContextValue,
  "approvalStatus" | "isAuthenticated" | "isLoading" | "role"
>;

export function getRouteForAuthState(state: GuardState): Href {
  if (state.isLoading) return "/auth/login";
  if (!state.isAuthenticated) return "/auth/login";
  if (isPendingApprovalStatus(state.approvalStatus)) return "/protected/pending-approval";
  if (isDeniedApprovalStatus(state.approvalStatus)) return "/protected/access-denied";
  if (canAccessMobileApp(state.role, state.approvalStatus)) return "/tabs/home";
  return "/protected/access-denied";
}

export function canEnterAppTabs(state: GuardState) {
  return state.isAuthenticated && canAccessMobileApp(state.role, state.approvalStatus);
}
