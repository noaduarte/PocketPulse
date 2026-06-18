import { useEffect, useMemo, useRef, useState } from "react"

import dayjs from "dayjs"



import ExpenseFilters from "./ExpenseFilters"

import ExpenseItem from "./ExpenseItem"

import { cardClass } from "./formStyles"

import { useExpenseStore } from "../store/expenseStore"

import type { ExpenseFiltersState } from "../types/ExpenseFilters"

import {

  filterExpenses,

  getDefaultExpenseFilters,

  hasActiveExpenseFilters,

} from "../utils/expenseFilters"



const PAGE_SIZE = 6



export default function ExpenseList() {

  const expenses = useExpenseStore((state) => state.expenses)

  const [page, setPage] = useState(0)

  const [filters, setFilters] = useState<ExpenseFiltersState>(

    getDefaultExpenseFilters

  )



  const filtered = useMemo(

    () => filterExpenses(expenses, filters),

    [expenses, filters]

  )



  const sorted = useMemo(

    () =>

      [...filtered].sort((a, b) => {

        const dateDiff =

          dayjs(b.date).valueOf() - dayjs(a.date).valueOf()

        if (dateDiff !== 0) return dateDiff

        return dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()

      }),

    [filtered]

  )



  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))

  const safePage = Math.min(page, totalPages - 1)



  const prevFilteredLengthRef = useRef(filtered.length)



  useEffect(() => {

    if (filtered.length > prevFilteredLengthRef.current) {

      setPage(0)

    } else if (filtered.length < prevFilteredLengthRef.current) {

      setPage((p) => Math.min(p, Math.max(0, totalPages - 1)))

    }

    prevFilteredLengthRef.current = filtered.length

  }, [filtered.length, totalPages])



  const handleFiltersChange = (next: ExpenseFiltersState) => {

    setFilters(next)

    setPage(0)

  }



  if (expenses.length === 0) {

    return (

      <div className="flex flex-col items-center justify-center rounded-3xl bg-white py-20 px-8 text-center shadow-sm dark:bg-slate-800">

        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-900/40">

          <span className="text-3xl font-bold text-indigo-400">€</span>

        </div>

        <p className="text-xl font-medium text-slate-700 dark:text-slate-200 sm:text-2xl">

          No expenses recorded yet

        </p>

        <p className="mt-2 text-lg text-slate-500 dark:text-slate-400 sm:text-xl">

          Go to Add Expense to record your first transaction.

        </p>

      </div>

    )

  }



  const start = safePage * PAGE_SIZE

  const visible = sorted.slice(start, start + PAGE_SIZE)

  const canGoBack = safePage > 0

  const canGoForward = safePage < totalPages - 1

  const filtersActive = hasActiveExpenseFilters(filters)



  return (

    <div className="space-y-6 sm:space-y-8">

      <ExpenseFilters

        filters={filters}

        onChange={handleFiltersChange}

      />



      {sorted.length === 0 ? (

        <div

          className={`flex flex-col items-center justify-center py-16 px-8 text-center ${cardClass}`}

        >

          <p className="text-xl font-medium text-slate-700 dark:text-slate-200 sm:text-2xl">

            No transactions match your filters

          </p>

          <p className="mt-2 text-lg text-slate-500 dark:text-slate-400">

            Try adjusting the date, category, or payment method.

          </p>

        </div>

      ) : (

        <>

          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">

            <p className="text-lg text-slate-500 dark:text-slate-400 sm:text-xl">

              Showing {start + 1}–{Math.min(start + PAGE_SIZE, sorted.length)} of{" "}

              {sorted.length}

              {filtersActive && (

                <span className="text-slate-400 dark:text-slate-500">

                  {" "}

                  (filtered from {expenses.length})

                </span>

              )}

            </p>



            <div className="flex items-center gap-3">

              <button

                type="button"

                onClick={() => setPage((p) => Math.max(0, p - 1))}

                disabled={!canGoBack}

                aria-label="Previous expenses"

                className="rounded-2xl bg-white px-5 py-3 text-xl font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-600 dark:hover:bg-slate-700 sm:px-6 sm:py-4 sm:text-2xl"

              >

                ←

              </button>



              <span className="min-w-[5rem] text-center text-lg font-semibold text-slate-600 dark:text-slate-300 sm:text-xl">

                {safePage + 1} / {totalPages}

              </span>



              <button

                type="button"

                onClick={() =>

                  setPage((p) => Math.min(totalPages - 1, p + 1))

                }

                disabled={!canGoForward}

                aria-label="Next expenses"

                className="rounded-2xl bg-white px-5 py-3 text-xl font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-600 dark:hover:bg-slate-700 sm:px-6 sm:py-4 sm:text-2xl"

              >

                →

              </button>

            </div>

          </div>



          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">

            {visible.map((expense) => (

              <ExpenseItem key={expense.id} expense={expense} />

            ))}

          </div>

        </>

      )}

    </div>

  )

}


