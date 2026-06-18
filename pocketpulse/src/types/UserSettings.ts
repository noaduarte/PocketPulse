import type { CurrencyCode } from "../data/currencies"

export type ThemeMode = "light" | "dark"
export interface UserSettings {
  currency: CurrencyCode
  themeMode: ThemeMode
  notificationsEnabled: boolean
  insightGenerationEnabled: boolean
}
