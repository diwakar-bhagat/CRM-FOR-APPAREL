import { createStore } from "zustand/vanilla";

import type { GlobalConfig } from "@/types/app";

/**
 * Global application settings store.
 *
 * Holds currency, location, and company metadata fetched from the
 * /api/settings endpoint. This store is hydrated once on mount and
 * updated whenever the user changes settings.
 */

const SETTINGS_DEFAULTS: GlobalConfig = {
  currency: "INR",
  currencySymbol: "₹",
  currencyLocale: "en-IN",
  location: "India",
  companyName: "CTA Apparels",
  timezone: "Asia/Kolkata",
};

export type SettingsState = GlobalConfig & {
  isLoaded: boolean;
  setSettings: (config: Partial<GlobalConfig>) => void;
  hydrate: (config: GlobalConfig) => void;
};

export const createSettingsStore = (init?: Partial<GlobalConfig>) =>
  createStore<SettingsState>()((set) => ({
    ...SETTINGS_DEFAULTS,
    ...init,
    isLoaded: false,
    setSettings: (config) => set((prev) => ({ ...prev, ...config })),
    hydrate: (config) => set({ ...config, isLoaded: true }),
  }));
