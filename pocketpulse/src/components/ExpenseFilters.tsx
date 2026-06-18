import type { Category } from "../data/categories"
import { paymentMethods } from "../data/paymentMethods"
import type { PaymentMethod } from "../data/paymentMethods"
import type { ExpenseFiltersState } from "../types/ExpenseFilters"
import { useCategoryStore } from "../store/categoryStore"
import {
  getDefaultExpenseFilters,
  hasActiveExpenseFilters,
} from "../utils/expenseFilters"

import ExpenseDatePicker from "./ExpenseDatePicker"
import { cardClass, filterSelectClass, labelClass } from "./formStyles"

interface ExpenseFiltersProps {
  filters: ExpenseFiltersState
  onChange: (filters: ExpenseFiltersState) => void
}

export default function ExpenseFilters({
  filters,
  onChange,
}: ExpenseFiltersProps) {
  const categories = useCategoryStore((state) => state.categories)

  const update = (patch: Partial<ExpenseFiltersState>) => {
    onChange({ ...filters, ...patch })
  }

  const active = hasActiveExpenseFilters(filters)

  return (
    <div className={cardClass}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 sm:text-2xl">
          Filters
        </h3>

        {active && (
          <button
            type="button"
            onClick={() => onChange(getDefaultExpenseFilters())}
            className="rounded-xl bg-slate-100 px-4 py-2 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 sm:text-lg"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        <div>
          <label htmlFor="filter-category" className={labelClass}>
            Category
          </label>
          <select
            id="filter-category"
            value={filters.category}
            onChange={(e) =>
              update({
                category: e.target.value as Category | "all",
              })
            }
            className={filterSelectClass}
          >
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-payment" className={labelClass}>
            Payment method
          </label>
          <select
            id="filter-payment"
            value={filters.paymentMethod}
            onChange={(e) =>
              update({
                paymentMethod: e.target.value as
                  | PaymentMethod
                  | "all",
              })
            }
            className={filterSelectClass}
          >
            <option value="all">All methods</option>
            {paymentMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2 xl:col-span-1">
          <p className={labelClass}>Date</p>
          <ExpenseDatePicker filters={filters} onChange={update} />
        </div>
      </div>
    </div>
  )
}
