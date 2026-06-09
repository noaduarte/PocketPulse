import type { ExpenseEntry } from "../../types/ExpenseEntry"

import CategoryPieChart from "./CategoryPieChart"
import SpendingLineChart from "./SpendingLineChart"
import WeeklyBarChart from "./WeeklyBarChart"

interface Props {
  expenses: ExpenseEntry[]
}

export default function ChartsSection({ expenses }: Props) {
  if (expenses.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center rounded-3xl bg-white py-20 px-8 text-center shadow-sm">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50">
          <span className="text-3xl font-bold text-indigo-400">—</span>
        </div>
        <p className="text-xl font-medium text-slate-700 sm:text-2xl">
          No chart data yet
        </p>
        <p className="mt-2 text-base text-slate-500 sm:text-lg">
          Add expenses from the Add Expense tab to unlock spending
          trends and category breakdowns.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full space-y-10 lg:space-y-12">
      <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-12">
        <div className="w-full min-w-0 lg:col-span-3">
          <WeeklyBarChart expenses={expenses} />
        </div>
        <div className="w-full min-w-0 lg:col-span-2">
          <CategoryPieChart expenses={expenses} />
        </div>
      </div>

      <SpendingLineChart expenses={expenses} />
    </div>
  )
}
