import dayjs from "dayjs"

import type { Category } from "../data/categories"
import type { BudgetGoal } from "../types/BudgetGoal"
import type { ExpenseEntry } from "../types/ExpenseEntry"

export interface BudgetStatus {
  goal: BudgetGoal
  spent: number
  remaining: number
  percentUsed: number
  isOverBudget: boolean
}

export function getMonthlySpendingByCategory(
  expenses: ExpenseEntry[],
  category: Category
) {
  const currentMonth = dayjs().month()
  const currentYear = dayjs().year()

  return expenses
    .filter((expense) => {
      const date = dayjs(expense.date)

      return (
        expense.category === category &&
        date.month() === currentMonth &&
        date.year() === currentYear
      )
    })
    .reduce((sum, expense) => sum + expense.amount, 0)
}

export function getBudgetStatus(
  expenses: ExpenseEntry[],
  goal: BudgetGoal
): BudgetStatus {
  const spent = getMonthlySpendingByCategory(
    expenses,
    goal.category
  )
  const remaining = goal.monthlyLimit - spent
  const percentUsed =
    goal.monthlyLimit > 0
      ? (spent / goal.monthlyLimit) * 100
      : 0

  return {
    goal,
    spent,
    remaining,
    percentUsed,
    isOverBudget: remaining < 0,
  }
}

export function getAllBudgetStatuses(
  expenses: ExpenseEntry[],
  goals: BudgetGoal[]
) {
  return goals.map((goal) =>
    getBudgetStatus(expenses, goal)
  )
}
