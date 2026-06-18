import dayjs from "dayjs"

import type { ExpenseEntry } from "../types/ExpenseEntry"
import type { ExpenseFiltersState } from "../types/ExpenseFilters"

export function getDefaultExpenseFilters(): ExpenseFiltersState {
  const now = dayjs()

  return {
    dateMode: "all",
    day: now.format("YYYY-MM-DD"),
    month: now.format("YYYY-MM"),
    rangeStart: now.startOf("month").format("YYYY-MM-DD"),
    rangeEnd: now.format("YYYY-MM-DD"),
    category: "all",
    paymentMethod: "all",
  }
}

export function hasActiveExpenseFilters(
  filters: ExpenseFiltersState
): boolean {
  return (
    filters.dateMode !== "all" ||
    filters.category !== "all" ||
    filters.paymentMethod !== "all"
  )
}

function matchesDateFilter(
  expense: ExpenseEntry,
  filters: ExpenseFiltersState
): boolean {
  const date = dayjs(expense.date)

  switch (filters.dateMode) {
    case "all":
      return true
    case "day":
      return date.format("YYYY-MM-DD") === filters.day
    case "month":
      return date.format("YYYY-MM") === filters.month
    case "range": {
      const start = dayjs(filters.rangeStart)
      const end = dayjs(filters.rangeEnd)

      if (!start.isValid() || !end.isValid()) {
        return true
      }

      const from = start.isBefore(end) ? start : end
      const to = start.isBefore(end) ? end : start

      return (
        (date.isAfter(from, "day") || date.isSame(from, "day")) &&
        (date.isBefore(to, "day") || date.isSame(to, "day"))
      )
    }
    default:
      return true
  }
}

export function filterExpenses(
  expenses: ExpenseEntry[],
  filters: ExpenseFiltersState
): ExpenseEntry[] {
  return expenses.filter((expense) => {
    if (
      filters.category !== "all" &&
      expense.category !== filters.category
    ) {
      return false
    }

    if (
      filters.paymentMethod !== "all" &&
      expense.paymentMethod !== filters.paymentMethod
    ) {
      return false
    }

    return matchesDateFilter(expense, filters)
  })
}

export const DATE_FILTER_MODES = [
  { value: "all", label: "All" },
  { value: "day", label: "Day" },
  { value: "month", label: "Month" },
  { value: "range", label: "Range" },
] as const
