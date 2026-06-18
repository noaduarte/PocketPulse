import type { BudgetAlert, BudgetAlertSeverity } from "../utils/budgetAlerts"

interface BudgetAlertsPanelProps {
  alerts: BudgetAlert[]
  variant?: "header" | "card"
}

const severityStyles: Record<
  BudgetAlertSeverity,
  { dot: string; text: string; bg: string }
> = {
  alert: {
    dot: "bg-rose-500",
    text: "text-rose-800 dark:text-rose-300",
    bg: "bg-white/95 dark:bg-slate-900/95",
  },
  warning: {
    dot: "bg-amber-500",
    text: "text-amber-900 dark:text-amber-300",
    bg: "bg-white/95 dark:bg-slate-900/95",
  },
  info: {
    dot: "bg-indigo-500",
    text: "text-indigo-900 dark:text-indigo-300",
    bg: "bg-white/95 dark:bg-slate-900/95",
  },
  success: {
    dot: "bg-emerald-500",
    text: "text-emerald-800 dark:text-emerald-300",
    bg: "bg-white/95 dark:bg-slate-900/95",
  },
}

export default function BudgetAlertsPanel({
  alerts,
  variant = "header",
}: BudgetAlertsPanelProps) {
  if (alerts.length === 0) {
    return null
  }

  const containerClass =
    variant === "header"
      ? "w-full space-y-2 text-right lg:text-right"
      : "w-full space-y-2"

  return (
    <div className={containerClass}>
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 sm:text-sm">
        Budget alerts
      </p>

      {alerts.slice(0, 3).map((alert) => {
        const style = severityStyles[alert.severity]

        return (
          <div
            key={alert.id}
            className={`flex gap-2 rounded-xl px-3 py-2.5 text-left shadow-sm ring-1 ring-slate-200 sm:px-4 sm:py-3 dark:ring-slate-600 ${style.bg}`}
          >
            <span
              className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${style.dot}`}
            />
            <p
              className={`text-sm font-medium leading-snug sm:text-base ${style.text}`}
            >
              {alert.message}
            </p>
          </div>
        )
      })}

      {alerts.length > 3 && (
        <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
          +{alerts.length - 3} more in Insights
        </p>
      )}
    </div>
  )
}
