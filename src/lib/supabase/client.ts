import "react-native-url-polyfill/auto";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, processLock, type SupabaseClient } from "@supabase/supabase-js";
import { AppState, Platform } from "react-native";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";

import type { Database } from "@/lib/supabase/types";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL?.trim() ?? "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";

const isDevelopment = process.env.NODE_ENV !== "production";

const supabaseStorage = {
  async getItem(key: string) {
    if (Platform.OS === "web") return AsyncStorage.getItem(key);
    return getItemAsync(key);
  },
  async setItem(key: string, value: string) {
    if (Platform.OS === "web") return AsyncStorage.setItem(key, value);

    if (value.length > 2048 && isDevelopment) {
      console.warn(
        "Supabase session value is larger than Expo SecureStore's documented 2048 byte guidance. Validate auth storage before production auth rollout.",
      );
    }

    return setItemAsync(key, value);
  },
  async removeItem(key: string) {
    if (Platform.OS === "web") return AsyncStorage.removeItem(key);
    return deleteItemAsync(key);
  },
};

export const supabaseConfig = {
  hasUrl: Boolean(supabaseUrl),
  hasAnonKey: Boolean(supabaseAnonKey),
  isConfigured: Boolean(supabaseUrl && supabaseAnonKey),
};

function createAmgSupabaseClient(): SupabaseClient<Database> | null {
  if (!supabaseConfig.isConfigured) {
    if (isDevelopment) {
      console.warn(
        "Supabase is not configured. Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY in .env to enable AMG Connect Mobile backend access.",
      );
    }

    return null;
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      detectSessionInUrl: false,
      lock: processLock,
      persistSession: true,
      storage: supabaseStorage,
    },
  });
}

export const supabase = createAmgSupabaseClient();

if (Platform.OS !== "web" && supabase) {
  AppState.addEventListener("change", (state) => {
    if (state === "active") {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });
}

export function getSupabaseClient() {
  return supabase;
}
