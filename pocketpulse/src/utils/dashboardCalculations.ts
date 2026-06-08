import type { ExpenseEntry } from "../types/ExpenseEntry"
import dayjs from "dayjs"

export function getTotalSpending(
    expenses: ExpenseEntry[]
  ) {
    return expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    )
  }


export function getTransactionCount(
    expenses: ExpenseEntry[]
  ) {
    return expenses.length
  }

export function getAverageExpense(
    expenses: ExpenseEntry[]
  ) {
    if (expenses.length === 0) {
      return 0
    }
  
    return (
      getTotalSpending(expenses) /
      expenses.length
    )
  }

export function getTopCategory(
    expenses: ExpenseEntry[]
  ) {
    if (expenses.length === 0) {
      return "N/A"
    }

    const categoryTotals: Record<
      string,
      number
    > = {}
  
    expenses.forEach((expense) => {
      categoryTotals[
        expense.category
      ] =
        (categoryTotals[
          expense.category
        ] || 0) + expense.amount
    })
  
  return Object.entries(
      categoryTotals
    ).sort((a, b) => b[1] - a[1])[0][0]
  }

export function getMonthlySpending(
    expenses: ExpenseEntry[]
  ) {
    const currentMonth =
      dayjs().month()

    const currentYear =
      dayjs().year()

    return expenses
      .filter((expense) => {
        const date = dayjs(
          expense.date
        )

        return (
          date.month() ===
            currentMonth &&
          date.year() === currentYear
        )
      })
      .reduce(
        (sum, expense) =>
          sum + expense.amount,
        0
      )
  }

export function getWeeklySpending(
    expenses: ExpenseEntry[]
  ) {
    const weekAgo =
      dayjs().subtract(7, "day")

    return expenses
      .filter((expense) =>
        dayjs(expense.date).isAfter(
          weekAgo
        )
      )
      .reduce(
        (sum, expense) =>
          sum + expense.amount,
        0
      )
  }

