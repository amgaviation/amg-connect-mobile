import type { PropsWithChildren } from "react";
import { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Session } from "@supabase/supabase-js";

import { createAuthError, mapSupabaseAuthError } from "@/features/auth/auth.errors";
import type {
  AuthActionResult,
  AuthContextValue,
  AuthDisplayError,
  AuthProviderState,
  SignInCredentials,
} from "@/features/auth/auth.types";
import {
  canAccessMobileApp,
  isAdminRole,
  isClientRole,
  isCrewRole,
  isOperationsRole,
  isPendingApprovalStatus,
  isSuperAdminRole,
} from "@/lib/auth/roles";
import { resolveAuthProfile } from "@/lib/auth/role-resolver";
import { getSupabaseClient, supabaseConfig } from "@/lib/supabase/client";

export const AuthContext = createContext<AuthContextValue | null>(null);

const authTimeoutMs = 15000;

const initialState: AuthProviderState = {
  error: null,
  isLoading: true,
  profile: null,
  session: null,
  user: null,
};

function withTimeout<T>(promise: Promise<T>, developerMessage: string) {
  return Promise.race<T>([
    promise,
    new Promise<T>((_, reject) => {
      setTimeout(() => reject(createAuthError("network_error", developerMessage)), authTimeoutMs);
    }),
  ]);
}

function isAuthDisplayError(error: unknown): error is AuthDisplayError {
  return typeof error === "object" && error !== null && "code" in error && "message" in error;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const supabase = getSupabaseClient();
  const loadSequence = useRef(0);
  const [state, setState] = useState<AuthProviderState>(() =>
    supabaseConfig.isConfigured
      ? initialState
      : {
          error: createAuthError("missing_supabase_config"),
          isLoading: false,
          profile: null,
          session: null,
          user: null,
        },
  );

  const clearAuthState = useCallback((error: AuthDisplayError | null = null) => {
    setState({
      error,
      isLoading: false,
      profile: null,
      session: null,
      user: null,
    });
  }, []);

  const loadFromSession = useCallback(
    async (nextSession: Session | null, showLoading = false): Promise<AuthActionResult> => {
      const sequence = loadSequence.current + 1;
      loadSequence.current = sequence;

      if (!supabase) {
        const error = createAuthError("missing_supabase_config");
        clearAuthState(error);
        return { error, ok: false };
      }

      if (showLoading) {
        setState((current) => ({ ...current, error: null, isLoading: true }));
      }

      if (!nextSession) {
        clearAuthState();
        return { ok: true };
      }

      try {
        const {
          data: { user },
          error: userError,
        } = await withTimeout(supabase.auth.getUser(), "Timed out while loading the current Supabase user.");

        if (sequence !== loadSequence.current) return { ok: true };

        if (userError || !user) {
          const error = userError ? mapSupabaseAuthError(userError) : createAuthError("expired_session");
          clearAuthState(error);
          return { error, ok: false };
        }

        const profile = await withTimeout(
          resolveAuthProfile(supabase, user),
          "Timed out while resolving the current AMG role.",
        );

        if (sequence !== loadSequence.current) return { ok: true };

        const missingRoleError = profile.role ? null : createAuthError("missing_role");

        setState({
          error: missingRoleError,
          isLoading: false,
          profile,
          session: nextSession,
          user,
        });

        return missingRoleError ? { error: missingRoleError, ok: false } : { ok: true };
      } catch (error) {
        const authError = isAuthDisplayError(error) ? error : mapSupabaseAuthError(error);
        clearAuthState(authError);
        return { error: authError, ok: false };
      }
    },
    [clearAuthState, supabase],
  );

  const refreshSession = useCallback(async (): Promise<AuthActionResult> => {
    if (!supabase) {
      const error = createAuthError("missing_supabase_config");
      clearAuthState(error);
      return { error, ok: false };
    }

    setState((current) => ({ ...current, error: null, isLoading: true }));

    try {
      const {
        data: { session },
        error,
      } = await withTimeout(supabase.auth.refreshSession(), "Timed out while refreshing the Supabase session.");

      if (error) {
        const authError = mapSupabaseAuthError(error);
        clearAuthState(authError);
        return { error: authError, ok: false };
      }

      return loadFromSession(session, false);
    } catch (error) {
      const authError = isAuthDisplayError(error) ? error : mapSupabaseAuthError(error);
      clearAuthState(authError);
      return { error: authError, ok: false };
    }
  }, [clearAuthState, loadFromSession, supabase]);

  const signInWithPassword = useCallback(
    async ({ email, password }: SignInCredentials): Promise<AuthActionResult> => {
      if (!supabase) {
        const error = createAuthError("missing_supabase_config");
        clearAuthState(error);
        return { error, ok: false };
      }

      if (!email.trim() || !password) {
        return { error: createAuthError("invalid_credentials"), ok: false };
      }

      setState((current) => ({ ...current, error: null, isLoading: true }));

      try {
        const {
          data: { session },
          error,
        } = await withTimeout(
          supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
          }),
          "Timed out while signing in with Supabase.",
        );

        if (error) {
          const authError = mapSupabaseAuthError(error);
          setState((current) => ({ ...current, error: authError, isLoading: false }));
          return { error: authError, ok: false };
        }

        return loadFromSession(session, false);
      } catch (error) {
        const authError = isAuthDisplayError(error) ? error : mapSupabaseAuthError(error);
        setState((current) => ({ ...current, error: authError, isLoading: false }));
        return { error: authError, ok: false };
      }
    },
    [clearAuthState, loadFromSession, supabase],
  );

  const signOut = useCallback(async (): Promise<AuthActionResult> => {
    if (!supabase) {
      clearAuthState();
      return { ok: true };
    }

    const { error } = await supabase.auth.signOut({ scope: "local" });
    clearAuthState(error ? mapSupabaseAuthError(error) : null);

    return error ? { error: mapSupabaseAuthError(error), ok: false } : { ok: true };
  }, [clearAuthState, supabase]);

  const sendPasswordReset = useCallback(
    async (email: string): Promise<AuthActionResult> => {
      if (!supabase) {
        const error = createAuthError("missing_supabase_config");
        return { error, ok: false };
      }

      if (!email.trim()) {
        return { error: createAuthError("invalid_credentials", "Password reset email was empty."), ok: false };
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: "amgconnect://auth/reset-password",
      });

      if (error) {
        const authError = mapSupabaseAuthError(error);
        setState((current) => ({ ...current, error: authError }));
        return { error: authError, ok: false };
      }

      return { ok: true };
    },
    [supabase],
  );

  useEffect(() => {
    if (!supabase) {
      return undefined;
    }

    let isMounted = true;

    withTimeout(supabase.auth.getSession(), "Timed out while loading the stored Supabase session.")
      .then(({ data: { session }, error }) => {
        if (!isMounted) return;
        if (error) {
          clearAuthState(mapSupabaseAuthError(error));
          return;
        }
        void loadFromSession(session, false);
      })
      .catch((error) => {
        if (!isMounted) return;
        clearAuthState(isAuthDisplayError(error) ? error : mapSupabaseAuthError(error));
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      void loadFromSession(session, false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [clearAuthState, loadFromSession, supabase]);

  const role = state.profile?.role ?? null;
  const approvalStatus = state.profile?.approvalStatus ?? null;

  const value = useMemo<AuthContextValue>(
    () => ({
      approvalStatus,
      error: state.error,
      isAdmin: isAdminRole(role),
      isApproved: canAccessMobileApp(role, approvalStatus),
      isAuthenticated: Boolean(state.session && state.user),
      isClient: isClientRole(role),
      isCrew: isCrewRole(role),
      isLoading: state.isLoading,
      isOperations: isOperationsRole(role),
      isPending: isPendingApprovalStatus(approvalStatus),
      isSuperAdmin: isSuperAdminRole(role),
      profile: state.profile,
      refreshSession,
      role,
      sendPasswordReset,
      session: state.session,
      signInWithPassword,
      signOut,
      supabaseConfigured: supabaseConfig.isConfigured,
      user: state.user,
    }),
    [
      approvalStatus,
      refreshSession,
      role,
      sendPasswordReset,
      signInWithPassword,
      signOut,
      state.error,
      state.isLoading,
      state.profile,
      state.session,
      state.user,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
