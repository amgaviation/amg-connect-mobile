import type { AuthDisplayError, AuthErrorCode } from "@/features/auth/auth.types";

const publicMessages: Record<AuthErrorCode, string> = {
  access_denied: "This account does not currently have mobile access permissions.",
  access_pending: "Your AMG Connect access is still under review.",
  client_unavailable: "AMG Connect authentication is not available in this build.",
  expired_session: "Your session expired. Sign in again to continue.",
  invalid_credentials: "Email or password was not accepted.",
  missing_role: "This account is missing a recognized AMG Connect role.",
  missing_supabase_config: "AMG Connect is missing Supabase configuration for this build.",
  network_error: "Unable to reach AMG Connect. Check your connection and try again.",
  unknown: "Unable to complete the request. Try again.",
};

export function createAuthError(
  code: AuthErrorCode,
  developerMessage?: string,
  message = publicMessages[code],
): AuthDisplayError {
  if (__DEV__ && developerMessage) {
    console.warn(`[AMG Auth] ${code}: ${developerMessage}`);
  }

  return {
    code,
    developerMessage,
    message,
  };
}

export function mapSupabaseAuthError(error: unknown): AuthDisplayError {
  const message =
    typeof error === "object" && error && "message" in error
      ? String((error as { message?: unknown }).message ?? "")
      : String(error ?? "");

  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("invalid login") || lowerMessage.includes("invalid credentials")) {
    return createAuthError("invalid_credentials", message);
  }

  if (
    lowerMessage.includes("network") ||
    lowerMessage.includes("fetch") ||
    lowerMessage.includes("failed to fetch")
  ) {
    return createAuthError("network_error", message);
  }

  if (lowerMessage.includes("expired") || lowerMessage.includes("refresh token")) {
    return createAuthError("expired_session", message);
  }

  return createAuthError("unknown", message || undefined);
}
