import type { ExpenseEntry } from "../../types/ExpenseEntry"

import CategoryPieChart from "./CategoryPieChart"
import SpendingLineChart from "./SpendingLineChart"
import WeeklyBarChart from "./WeeklyBarChart"

interface Props {
  expenses: ExpenseEntry[]
}

export default function ChartsSection({
  expenses,
}: Props) {
  if (expenses.length === 0) {
    return (
      <div className="border rounded-xl p-6 text-center text-gray-500">
        No chart data available yet.
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      <CategoryPieChart
        expenses={expenses}
      />

      <SpendingLineChart
        expenses={expenses}
      />

      <WeeklyBarChart
        expenses={expenses}
      />
    </div>
  )
}