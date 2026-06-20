import "react-native-url-polyfill/auto";
import "react-native-get-random-values";

import * as aesjs from "aes-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, processLock, type SupabaseClient } from "@supabase/supabase-js";
import { AppState, Platform } from "react-native";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";

import type { Database } from "@/lib/supabase/types";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL?.trim() ?? "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";

const isDevelopment = process.env.NODE_ENV !== "production";
const isWebServerRuntime = Platform.OS === "web" && typeof window === "undefined";

const webServerStorage = {
  async getItem() {
    return null;
  },
  async removeItem() {},
  async setItem() {},
};

const webBrowserStorage = {
  async getItem(key: string) {
    return window.localStorage.getItem(key);
  },
  async removeItem(key: string) {
    window.localStorage.removeItem(key);
  },
  async setItem(key: string, value: string) {
    window.localStorage.setItem(key, value);
  },
};

class LargeSecureStore {
  private async decrypt(key: string, value: string) {
    const encryptionKeyHex = await getItemAsync(key);
    if (!encryptionKeyHex) return null;

    const cipher = new aesjs.ModeOfOperation.ctr(
      aesjs.utils.hex.toBytes(encryptionKeyHex),
      new aesjs.Counter(1),
    );
    const decryptedBytes = cipher.decrypt(aesjs.utils.hex.toBytes(value));

    return aesjs.utils.utf8.fromBytes(decryptedBytes);
  }

  private async encrypt(key: string, value: string) {
    const encryptionKey = crypto.getRandomValues(new Uint8Array(256 / 8));
    const cipher = new aesjs.ModeOfOperation.ctr(encryptionKey, new aesjs.Counter(1));
    const encryptedBytes = cipher.encrypt(aesjs.utils.utf8.toBytes(value));

    await setItemAsync(key, aesjs.utils.hex.fromBytes(encryptionKey));

    return aesjs.utils.hex.fromBytes(encryptedBytes);
  }

  async getItem(key: string) {
    const encrypted = await AsyncStorage.getItem(key);
    if (!encrypted) return null;

    return this.decrypt(key, encrypted);
  }

  async removeItem(key: string) {
    await AsyncStorage.removeItem(key);
    await deleteItemAsync(key);
  }

  async setItem(key: string, value: string) {
    const encrypted = await this.encrypt(key, value);
    await AsyncStorage.setItem(key, encrypted);
  }
}

const supabaseStorage = {
  async getItem(key: string) {
    if (isWebServerRuntime) return webServerStorage.getItem();
    if (Platform.OS === "web") return webBrowserStorage.getItem(key);
    return new LargeSecureStore().getItem(key);
  },
  async setItem(key: string, value: string) {
    if (isWebServerRuntime) return webServerStorage.setItem();
    if (Platform.OS === "web") return webBrowserStorage.setItem(key, value);
    return new LargeSecureStore().setItem(key, value);
  },
  async removeItem(key: string) {
    if (isWebServerRuntime) return webServerStorage.removeItem();
    if (Platform.OS === "web") return webBrowserStorage.removeItem(key);
    return new LargeSecureStore().removeItem(key);
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
      persistSession: !isWebServerRuntime,
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
