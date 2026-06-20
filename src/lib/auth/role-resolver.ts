import type { SupabaseClient, User } from "@supabase/supabase-js";

import {
  asRecord,
  getMetadataApproval,
  getMetadataRole,
  readApprovalFromRecord,
  readEmailFromRecord,
  readNameFromRecord,
  readRoleFromRecord,
} from "@/features/auth/auth.mappers";
import type {
  AmgApprovalSource,
  AmgAuthProfile,
  AmgRoleSource,
} from "@/features/auth/auth.types";

type QueryableSupabaseClient = Pick<SupabaseClient, "from">;

type ProfileSource = {
  approvalSource: AmgApprovalSource;
  matchColumns: string[];
  roleSource: AmgRoleSource;
  table: string;
};

type ProfileLookup = {
  approvalSource: AmgApprovalSource;
  record: Record<string, unknown>;
  roleSource: AmgRoleSource;
};

const profileSources: ProfileSource[] = [
  {
    approvalSource: "portal_users",
    matchColumns: ["user_id", "auth_user_id", "id"],
    roleSource: "portal_users",
    table: "portal_users",
  },
  {
    approvalSource: "profiles",
    matchColumns: ["id", "user_id", "auth_user_id"],
    roleSource: "profiles",
    table: "profiles",
  },
];

const ignorableProfileErrorCodes = new Set([
  "PGRST116",
  "PGRST205",
  "42P01",
  "42703",
  "42501",
]);

function isIgnorableProfileError(error: unknown) {
  const record = asRecord(error);
  const code = typeof record.code === "string" ? record.code : "";
  return ignorableProfileErrorCodes.has(code);
}

async function lookupProfileSource(
  client: QueryableSupabaseClient,
  user: User,
  source: ProfileSource,
): Promise<ProfileLookup | null> {
  for (const column of source.matchColumns) {
    const { data, error } = await client.from(source.table).select("*").eq(column, user.id).limit(1).maybeSingle();

    if (data) {
      return {
        approvalSource: source.approvalSource,
        record: asRecord(data),
        roleSource: source.roleSource,
      };
    }

    if (error && !isIgnorableProfileError(error)) {
      if (__DEV__) {
        console.warn(`[AMG Auth] Unable to resolve ${source.table}.${column}`, error);
      }
      break;
    }
  }

  return null;
}

async function lookupProfile(client: QueryableSupabaseClient, user: User) {
  for (const source of profileSources) {
    const profile = await lookupProfileSource(client, user, source);
    if (profile) return profile;
  }

  return null;
}

export async function resolveAuthProfile(
  client: QueryableSupabaseClient,
  user: User,
): Promise<AmgAuthProfile> {
  const profileLookup = await lookupProfile(client, user);
  const profileRecord = profileLookup?.record ?? {};
  const metadataRole = getMetadataRole(user);
  const metadataApproval = getMetadataApproval(user);

  const profileRole = readRoleFromRecord(profileRecord);
  const profileApproval = readApprovalFromRecord(profileRecord);
  const role = profileRole ?? metadataRole.role;
  const approvalStatus = profileApproval ?? metadataApproval.approvalStatus ?? (role ? "pending" : null);

  return {
    approvalSource: profileApproval
      ? profileLookup?.approvalSource ?? "unresolved"
      : metadataApproval.approvalStatus
        ? metadataApproval.source
        : role
          ? "default_pending"
          : "unresolved",
    approvalStatus,
    email: readEmailFromRecord(profileRecord, user),
    fullName: readNameFromRecord(profileRecord),
    role,
    roleSource: profileRole ? profileLookup?.roleSource ?? "unresolved" : metadataRole.source,
    userId: user.id,
  };
}
