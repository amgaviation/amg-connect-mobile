export type AmgRole = "client" | "crew" | "admin" | "amg_operations" | "super_admin";

export type AmgApprovalStatus =
  | "pending"
  | "approved"
  | "denied"
  | "suspended"
  | "inactive"
  | "rejected"
  | "disabled";

export function isClientRole(role: string | null | undefined): role is "client" {
  return role === "client";
}

export function isCrewRole(role: string | null | undefined): role is "crew" {
  return role === "crew";
}

export function isAdminRole(role: string | null | undefined): role is "admin" {
  return role === "admin";
}

export function isOperationsRole(role: string | null | undefined): role is "amg_operations" {
  return role === "amg_operations";
}

export function isSuperAdminRole(role: string | null | undefined): role is "super_admin" {
  return role === "super_admin";
}

export function canAccessMobileApp(
  role: string | null | undefined,
  approvalStatus: AmgApprovalStatus | null | undefined,
) {
  const hasAllowedRole =
    isClientRole(role) ||
    isCrewRole(role) ||
    isAdminRole(role) ||
    isOperationsRole(role) ||
    isSuperAdminRole(role);

  return hasAllowedRole && approvalStatus === "approved";
}

export function isPendingApprovalStatus(status: AmgApprovalStatus | null | undefined) {
  return status === "pending";
}

export function isDeniedApprovalStatus(status: AmgApprovalStatus | null | undefined) {
  return (
    status === "denied" ||
    status === "suspended" ||
    status === "inactive" ||
    status === "rejected" ||
    status === "disabled"
  );
}

export function getDefaultRouteForRole(
  role: string | null | undefined,
  approvalStatus: AmgApprovalStatus | null | undefined,
) {
  if (isPendingApprovalStatus(approvalStatus)) return "/protected/pending-approval";
  if (isDeniedApprovalStatus(approvalStatus)) return "/protected/access-denied";
  if (canAccessMobileApp(role, approvalStatus)) return "/tabs/home";
  return "/protected/access-denied";
}

export const legacyAmg1RoleMap = {
  client_owner: "client",
  crew_pilot: "crew",
  amg_admin: "admin",
  maintenance_partner: "amg_operations",
  broker_partner: "amg_operations",
} as const;
