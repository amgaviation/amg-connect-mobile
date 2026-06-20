import type { User } from "@supabase/supabase-js";

import type { AmgApprovalSource, AmgRoleSource } from "@/features/auth/auth.types";
import type { AmgApprovalStatus, AmgRole } from "@/lib/auth/roles";
import { legacyAmg1RoleMap } from "@/lib/auth/roles";

type UnknownRecord = Record<string, unknown>;

const amgRoles: readonly AmgRole[] = [
  "client",
  "crew",
  "admin",
  "amg_operations",
  "super_admin",
];

const roleAliases: Record<string, AmgRole> = {
  ...legacyAmg1RoleMap,
  operations: "amg_operations",
  operation: "amg_operations",
  superadmin: "super_admin",
  super_admin: "super_admin",
};

const approvalAliases: Record<string, AmgApprovalStatus> = {
  active: "approved",
  approved: "approved",
  disabled: "disabled",
  inactive: "inactive",
  pending: "pending",
  rejected: "rejected",
  denied: "denied",
  suspended: "suspended",
};

export function normalizeRole(value: unknown): AmgRole | null {
  if (typeof value !== "string") return null;

  const normalized = value.trim().toLowerCase();
  if (!normalized) return null;
  if (amgRoles.includes(normalized as AmgRole)) return normalized as AmgRole;

  return roleAliases[normalized] ?? null;
}

export function normalizeApprovalStatus(value: unknown): AmgApprovalStatus | null {
  if (typeof value === "boolean") return value ? "approved" : "pending";
  if (typeof value !== "string") return null;

  const normalized = value.trim().toLowerCase();
  if (!normalized) return null;

  return approvalAliases[normalized] ?? null;
}

export function asRecord(value: unknown): UnknownRecord {
  return typeof value === "object" && value !== null ? (value as UnknownRecord) : {};
}

export function readRoleFromRecord(record: UnknownRecord): AmgRole | null {
  return (
    normalizeRole(record.role) ??
    normalizeRole(record.user_role) ??
    normalizeRole(record.portal_role) ??
    normalizeRole(record.account_role) ??
    normalizeRole(record.amg_role)
  );
}

export function readApprovalFromRecord(record: UnknownRecord): AmgApprovalStatus | null {
  return (
    normalizeApprovalStatus(record.approval_status) ??
    normalizeApprovalStatus(record.approvalStatus) ??
    normalizeApprovalStatus(record.status) ??
    normalizeApprovalStatus(record.account_status) ??
    normalizeApprovalStatus(record.mobile_access_status) ??
    normalizeApprovalStatus(record.is_approved) ??
    normalizeApprovalStatus(record.approved) ??
    (record.disabled === true ? "disabled" : null)
  );
}

export function readNameFromRecord(record: UnknownRecord): string | null {
  const value = record.full_name ?? record.fullName ?? record.name ?? record.display_name;
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export function readEmailFromRecord(record: UnknownRecord, user: User): string | null {
  const value = record.email;
  if (typeof value === "string" && value.trim()) return value.trim();
  return user.email ?? null;
}

export function buildProfileFieldSource<T extends string>(
  value: unknown,
  source: T,
  fallback: T,
): T {
  return value ? source : fallback;
}

export function getMetadataRole(user: User): {
  role: AmgRole | null;
  source: AmgRoleSource;
} {
  const appMetadata = asRecord(user.app_metadata);
  const userMetadata = asRecord(user.user_metadata);
  const appRole = readRoleFromRecord(appMetadata);
  if (appRole) return { role: appRole, source: "app_metadata" };

  const userRole = readRoleFromRecord(userMetadata);
  if (userRole) return { role: userRole, source: "user_metadata" };

  return { role: null, source: "unresolved" };
}

export function getMetadataApproval(user: User): {
  approvalStatus: AmgApprovalStatus | null;
  source: AmgApprovalSource;
} {
  const appMetadata = asRecord(user.app_metadata);
  const userMetadata = asRecord(user.user_metadata);
  const appApproval = readApprovalFromRecord(appMetadata);
  if (appApproval) return { approvalStatus: appApproval, source: "app_metadata" };

  const userApproval = readApprovalFromRecord(userMetadata);
  if (userApproval) return { approvalStatus: userApproval, source: "user_metadata" };

  return { approvalStatus: null, source: "unresolved" };
}
