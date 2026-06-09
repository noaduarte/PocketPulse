import dayjs from "dayjs"

import type { ExpenseEntry } from "../types/ExpenseEntry"
import { useExpenseStore } from "../store/expenseStore"

interface ExpenseItemProps {
  expense: ExpenseEntry
}

export default function ExpenseItem({ expense }: ExpenseItemProps) {
  const deleteExpense = useExpenseStore(
    (state) => state.deleteExpense
  )

  return (
    <div className="flex flex-col justify-between rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8">
      <div>
        <div className="flex items-start justify-between gap-4">
          <p className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            €{expense.amount.toFixed(2)}
          </p>
          <span className="shrink-0 rounded-xl bg-indigo-50 px-3 py-1.5 text-base font-semibold text-indigo-700 sm:px-4 sm:py-2 sm:text-lg">
            {expense.category}
          </span>
        </div>

        <p className="mt-3 text-lg text-slate-500 sm:text-xl">
          {dayjs(expense.date).format("MMMM D, YYYY")}
        </p>

        {expense.note && (
          <p className="mt-2 text-lg text-slate-600 sm:text-xl">
            {expense.note}
          </p>
        )}
      </div>

      <button
        onClick={() => deleteExpense(expense.id)}
        className="mt-6 w-full rounded-2xl bg-rose-50 px-5 py-3 text-lg font-semibold text-rose-600 transition-colors hover:bg-rose-100 sm:py-4 sm:text-xl"
      >
        Delete
      </button>
    </div>
  )
}
