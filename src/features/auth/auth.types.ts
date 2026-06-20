import type { Session, User } from "@supabase/supabase-js";

import type { AmgApprovalStatus, AmgRole } from "@/lib/auth/roles";

export type AmgRoleSource =
  | "profiles"
  | "portal_users"
  | "app_metadata"
  | "user_metadata"
  | "unresolved";

export type AmgApprovalSource =
  | "profiles"
  | "portal_users"
  | "app_metadata"
  | "user_metadata"
  | "default_pending"
  | "unresolved";

export type AmgAuthProfile = {
  approvalSource: AmgApprovalSource;
  approvalStatus: AmgApprovalStatus | null;
  email: string | null;
  fullName: string | null;
  role: AmgRole | null;
  roleSource: AmgRoleSource;
  userId: string;
};

export type AuthErrorCode =
  | "missing_supabase_config"
  | "invalid_credentials"
  | "network_error"
  | "expired_session"
  | "missing_role"
  | "access_pending"
  | "access_denied"
  | "client_unavailable"
  | "unknown";

export type AuthDisplayError = {
  code: AuthErrorCode;
  developerMessage?: string;
  message: string;
};

export type AuthActionResult = {
  error?: AuthDisplayError;
  ok: boolean;
};

export type SignInCredentials = {
  email: string;
  password: string;
};

export type AuthContextValue = {
  approvalStatus: AmgApprovalStatus | null;
  error: AuthDisplayError | null;
  isAdmin: boolean;
  isApproved: boolean;
  isAuthenticated: boolean;
  isClient: boolean;
  isCrew: boolean;
  isLoading: boolean;
  isOperations: boolean;
  isPending: boolean;
  isSuperAdmin: boolean;
  profile: AmgAuthProfile | null;
  refreshSession: () => Promise<AuthActionResult>;
  role: AmgRole | null;
  sendPasswordReset: (email: string) => Promise<AuthActionResult>;
  session: Session | null;
  signInWithPassword: (credentials: SignInCredentials) => Promise<AuthActionResult>;
  signOut: () => Promise<AuthActionResult>;
  supabaseConfigured: boolean;
  user: User | null;
};

export type AuthProviderState = {
  error: AuthDisplayError | null;
  isLoading: boolean;
  profile: AmgAuthProfile | null;
  session: Session | null;
  user: User | null;
};
