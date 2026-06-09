import { useEffect, useMemo, useRef, useState } from "react"
import dayjs from "dayjs"

import ExpenseItem from "./ExpenseItem"
import { useExpenseStore } from "../store/expenseStore"

const PAGE_SIZE = 6

export default function ExpenseList() {
  const expenses = useExpenseStore((state) => state.expenses)
  const [page, setPage] = useState(0)

  const sorted = useMemo(
    () =>
      [...expenses].sort(
        (a, b) =>
          dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
      ),
    [expenses]
  )

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages - 1)

  const prevLengthRef = useRef(expenses.length)

  useEffect(() => {
    if (expenses.length > prevLengthRef.current) {
      setPage(0)
    } else if (expenses.length < prevLengthRef.current) {
      setPage((p) => Math.min(p, Math.max(0, totalPages - 1)))
    }
    prevLengthRef.current = expenses.length
  }, [expenses.length, totalPages])

  if (expenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl bg-white py-20 px-8 text-center shadow-sm">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50">
          <span className="text-3xl font-bold text-indigo-400">€</span>
        </div>
        <p className="text-xl font-medium text-slate-700 sm:text-2xl">
          No expenses recorded yet
        </p>
        <p className="mt-2 text-lg text-slate-500 sm:text-xl">
          Go to Add Expense to record your first transaction.
        </p>
      </div>
    )
  }

  const start = safePage * PAGE_SIZE
  const visible = sorted.slice(start, start + PAGE_SIZE)
  const canGoBack = safePage > 0
  const canGoForward = safePage < totalPages - 1

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-lg text-slate-500 sm:text-xl">
          Showing {start + 1}–{Math.min(start + PAGE_SIZE, sorted.length)} of{" "}
          {sorted.length}
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={!canGoBack}
            aria-label="Previous expenses"
            className="rounded-2xl bg-white px-5 py-3 text-xl font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 sm:px-6 sm:py-4 sm:text-2xl"
          >
            ←
          </button>

          <span className="min-w-[5rem] text-center text-lg font-semibold text-slate-600 sm:text-xl">
            {safePage + 1} / {totalPages}
          </span>

          <button
            type="button"
            onClick={() =>
              setPage((p) => Math.min(totalPages - 1, p + 1))
            }
            disabled={!canGoForward}
            aria-label="Next expenses"
            className="rounded-2xl bg-white px-5 py-3 text-xl font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 sm:px-6 sm:py-4 sm:text-2xl"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
        {visible.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))}
      </div>
    </div>
  )
}
