import type { BudgetGoal } from "../types/BudgetGoal"
import type { ExpenseEntry } from "../types/ExpenseEntry"
import { formatCurrency } from "./formatCurrency"
import { getAllBudgetStatuses } from "./budgetCalculations"

export type BudgetAlertSeverity = "alert" | "warning" | "success" | "info"

export interface BudgetAlert {
  id: string
  severity: BudgetAlertSeverity
  message: string
}

export function isBudgetInsight(insight: { id: string; type: string }) {
  const budgetTypes = [
    "budget-",
    "no-budget-top-category",
    "ahead-of-pace",
    "on-track-pace",
    "unused-budget-",
  ]

  return budgetTypes.some(
    (prefix) =>
      insight.type.startsWith(prefix) || insight.id.startsWith(prefix)
  )
}

export function generateBudgetAlerts(
  expenses: ExpenseEntry[],
  goals: BudgetGoal[]
): BudgetAlert[] {
  if (goals.length === 0) {
    return []
  }

  const alerts: BudgetAlert[] = []
  const statuses = getAllBudgetStatuses(expenses, goals)

  statuses.forEach((status) => {
    const { goal, remaining, percentUsed, isOverBudget } = status

    if (isOverBudget) {
      alerts.push({
        id: `over-${goal.category}`,
        severity: "alert",
        message: `${goal.category}: over budget by ${formatCurrency(Math.abs(remaining))}`,
      })
    } else if (percentUsed >= 80) {
      alerts.push({
        id: `close-${goal.category}`,
        severity: "warning",
        message: `${goal.category}: ${percentUsed.toFixed(0)}% used — ${formatCurrency(remaining)} left`,
      })
    } else if (percentUsed >= 50) {
      alerts.push({
        id: `half-${goal.category}`,
        severity: "info",
        message: `${goal.category}: ${percentUsed.toFixed(0)}% of monthly budget used`,
      })
    }
  })

  const overCount = statuses.filter((s) => s.isOverBudget).length
  const closeCount = statuses.filter(
    (s) => !s.isOverBudget && s.percentUsed >= 80
  ).length

  if (overCount > 0) {
    alerts.unshift({
      id: "summary-over",
      severity: "alert",
      message: `${overCount} budget${overCount !== 1 ? "s" : ""} exceeded this month`,
    })
  } else if (closeCount > 0) {
    alerts.unshift({
      id: "summary-close",
      severity: "warning",
      message: `${closeCount} budget${closeCount !== 1 ? "s" : ""} near the limit`,
    })
  } else if (statuses.every((s) => s.percentUsed < 50 && s.spent > 0)) {
    alerts.push({
      id: "summary-on-track",
      severity: "success",
      message: "All budgets on track this month",
    })
  }

  const severityOrder: Record<BudgetAlertSeverity, number> = {
    alert: 0,
    warning: 1,
    info: 2,
    success: 3,
  }

  return alerts.sort(
    (a, b) => severityOrder[a.severity] - severityOrder[b.severity]
  )
}
