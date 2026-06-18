import { useMemo } from "react"
import { NavLink, Outlet } from "react-router-dom"

import BudgetAlertsPanel from "./BudgetAlertsPanel"
import { useBudgetStore } from "../store/budgetStore"
import { useExpenseStore } from "../store/expenseStore"
import { useSettingsStore } from "../store/settingsStore"
import { generateBudgetAlerts } from "../utils/budgetAlerts"

const tabs = [
  { to: "/", label: "Home", end: true },
  { to: "/expenses", label: "Add Expense", end: false },
  { to: "/your-expenses", label: "Your Expenses", end: false },
  { to: "/budget", label: "Budget", end: false },
  { to: "/insights", label: "Insights", end: false },
  { to: "/settings", label: "Settings", end: false },
] as const

export default function Layout() {
  const expenses = useExpenseStore((state) => state.expenses)
  const goals = useBudgetStore((state) => state.goals)
  const notificationsEnabled = useSettingsStore(
    (state) => state.notificationsEnabled
  )

  const budgetAlerts = useMemo(
    () =>
      notificationsEnabled
        ? generateBudgetAlerts(expenses, goals)
        : [],
    [expenses, goals, notificationsEnabled]
  )

  return (
    <div className="min-h-screen w-full px-5 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12 xl:px-20">
      <header className="mb-10 sm:mb-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          <h1 className="shrink-0 text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl lg:text-7xl xl:text-8xl">
            PocketPulse
          </h1>

          {notificationsEnabled && budgetAlerts.length > 0 && (
            <div className="w-full shrink-0 lg:max-w-sm xl:max-w-md">
              <BudgetAlertsPanel
                alerts={budgetAlerts}
                variant="header"
              />
            </div>
          )}
        </div>

        <nav className="mt-8 flex gap-3 overflow-x-auto pb-2 sm:flex-wrap sm:gap-4">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `shrink-0 rounded-xl px-5 py-3 text-base font-semibold transition-colors sm:px-8 sm:py-4 sm:text-xl lg:text-2xl ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                    : "bg-white text-slate-600 shadow-sm hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100"
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="w-full min-w-0">
        <Outlet />
      </main>
    </div>
  )
}
