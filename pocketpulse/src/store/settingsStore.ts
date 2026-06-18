import { create } from "zustand"
import { persist } from "zustand/middleware"

import type { UserSettings, ThemeMode } from "../types/UserSettings"
import type { CurrencyCode } from "../data/currencies"

interface SettingsStore extends UserSettings {
  setCurrency: (currency: CurrencyCode) => void
  setThemeMode: (themeMode: ThemeMode) => void
  setNotificationsEnabled: (enabled: boolean) => void
  setInsightGenerationEnabled: (enabled: boolean) => void
}

const defaultSettings: UserSettings = {
  currency: "EUR",
  themeMode: "light",
  notificationsEnabled: true,
  insightGenerationEnabled: true,
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...defaultSettings,

      setCurrency: (currency) => set({ currency }),

      setThemeMode: (themeMode) => set({ themeMode }),

      setNotificationsEnabled: (notificationsEnabled) =>
        set({ notificationsEnabled }),

      setInsightGenerationEnabled: (insightGenerationEnabled) =>
        set({ insightGenerationEnabled }),
    }),
    {
      name: "pocketpulse-settings",
    }
  )
)
