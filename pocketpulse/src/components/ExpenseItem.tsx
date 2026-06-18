import dayjs from "dayjs"

import type { ExpenseEntry } from "../types/ExpenseEntry"
import { useExpenseStore } from "../store/expenseStore"
import { cardClass, dangerButtonClass } from "./formStyles"
import { useFormatCurrency } from "../utils/formatCurrency"

interface ExpenseItemProps {
  expense: ExpenseEntry
}

export default function ExpenseItem({ expense }: ExpenseItemProps) {
  const deleteExpense = useExpenseStore(
    (state) => state.deleteExpense
  )
  const formatMoney = useFormatCurrency()

  return (
    <div className={`flex min-w-0 flex-col justify-between ${cardClass}`}>
      <div className="min-w-0">
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <p className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            {formatMoney(expense.amount)}
          </p>

          <span className="w-fit max-w-full break-words rounded-xl bg-indigo-50 px-3 py-1.5 text-base font-semibold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-200 sm:px-4 sm:py-2 sm:text-lg">
            {expense.category}
          </span>
        </div>

        <p className="mt-3 break-words text-lg text-slate-500 dark:text-slate-300 sm:text-xl">
          {dayjs(expense.date).format("MMMM D, YYYY")}
        </p>

        <p className="mt-1 break-words text-lg text-slate-500 dark:text-slate-300 sm:text-xl">
          {expense.paymentMethod}
        </p>

        {expense.note && (
          <p className="mt-2 break-words text-lg text-slate-600 dark:text-slate-300 sm:text-xl">
            {expense.note}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => deleteExpense(expense.id)}
        className={`mt-6 w-full ${dangerButtonClass}`}
      >
        Delete
      </button>
    </div>
  )
}
