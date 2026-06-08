import type { ExpenseEntry } from "../types/ExpenseEntry"

export function getTotalSpending(
  expenses: ExpenseEntry[]
) {
  return expenses.reduce((total, expense) => total + expense.amount, 0)
}

export function getTransactionCount(
    expenses: ExpenseEntry[]
  ) {
    return expenses.length
  }