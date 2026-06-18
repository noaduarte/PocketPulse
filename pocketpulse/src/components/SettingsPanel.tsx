import type { ReactNode } from "react"

import {
  cardClass,
  panelClass,
  selectClass,
} from "./formStyles"
import { currencies } from "../data/currencies"
import type { CurrencyCode } from "../data/currencies"
import { useSettingsStore } from "../store/settingsStore"
import type { ThemeMode } from "../types/UserSettings"
import { formatCurrency } from "../utils/formatCurrency"

import CategorySettings from "./CategorySettings"

function SettingRow({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <div
      className={`flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${cardClass}`}
    >
      <div className="min-w-0 flex-1">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 sm:text-2xl">
          {title}
        </h3>
        <p className="mt-1 text-base text-slate-500 dark:text-slate-400 sm:text-lg">
          {description}
        </p>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-9 w-16 rounded-full transition-colors sm:h-10 sm:w-[4.5rem] ${
        checked ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-600"
      }`}
    >
      <span
        className={`absolute top-1 left-1 h-7 w-7 rounded-full bg-white shadow transition-transform sm:h-8 sm:w-8 ${
          checked ? "translate-x-7 sm:translate-x-[2.125rem]" : ""
        }`}
      />
    </button>
  )
}

export default function SettingsPanel() {
  const currency = useSettingsStore((state) => state.currency)
  const themeMode = useSettingsStore((state) => state.themeMode)
  const notificationsEnabled = useSettingsStore(
    (state) => state.notificationsEnabled
  )
  const insightGenerationEnabled = useSettingsStore(
    (state) => state.insightGenerationEnabled
  )
  const setCurrency = useSettingsStore((state) => state.setCurrency)
  const setThemeMode = useSettingsStore((state) => state.setThemeMode)
  const setNotificationsEnabled = useSettingsStore(
    (state) => state.setNotificationsEnabled
  )
  const setInsightGenerationEnabled = useSettingsStore(
    (state) => state.setInsightGenerationEnabled
  )

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className={panelClass}>
        <p className="text-lg text-slate-600 dark:text-slate-300 sm:text-xl">
          Preview:{" "}
          <span className="font-bold text-slate-900 dark:text-slate-100">
            {formatCurrency(1234.56, currency)}
          </span>
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <SettingRow
          title="Theme"
          description="Switch between light and dark appearance."
        >
          <div className="min-w-[12rem]">
            <label htmlFor="theme" className="sr-only">
              Theme
            </label>
            <select
              id="theme"
              value={themeMode}
              onChange={(e) =>
                setThemeMode(e.target.value as ThemeMode)
              }
              className={selectClass}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </SettingRow>

        <SettingRow
          title="Currency"
          description="Choose how amounts are displayed across the app."
        >
          <div className="min-w-[12rem]">
            <label htmlFor="currency" className="sr-only">
              Currency
            </label>
            <select
              id="currency"
              value={currency}
              onChange={(e) =>
                setCurrency(e.target.value as CurrencyCode)
              }
              className={selectClass}
            >
              {currencies.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </SettingRow>

        <SettingRow
          title="Budget notifications"
          description="Get alerted when you approach or exceed a budget. UI only for now — alerts coming soon."
        >
          <Toggle
            label="Budget notifications"
            checked={notificationsEnabled}
            onChange={setNotificationsEnabled}
          />
        </SettingRow>

        <SettingRow
          title="Insight generation"
          description="Show rule-based spending insights on the Insights tab."
        >
          <Toggle
            label="Insight generation"
            checked={insightGenerationEnabled}
            onChange={setInsightGenerationEnabled}
          />
        </SettingRow>
      </div>

      <CategorySettings />
    </div>
  )
}
