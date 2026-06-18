import dayjs from "dayjs"

import type {
  DateFilterMode,
  ExpenseFiltersState,
} from "../types/ExpenseFilters"
import { DATE_FILTER_MODES } from "../utils/expenseFilters"

const filterInputClass =
  "w-full min-w-0 rounded-xl border-0 bg-white px-3 py-2.5 text-base text-slate-900 shadow-sm ring-1 ring-slate-200 transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-600 sm:text-lg"

interface ExpenseDatePickerProps {
  filters: Pick<
    ExpenseFiltersState,
    "dateMode" | "day" | "month" | "rangeStart" | "rangeEnd"
  >
  onChange: (patch: Partial<ExpenseFiltersState>) => void
}

export default function ExpenseDatePicker({
  filters,
  onChange,
}: ExpenseDatePickerProps) {
  const setMode = (dateMode: DateFilterMode) => {
    const now = dayjs()

    if (dateMode === "all") {
      onChange({ dateMode })
      return
    }

    if (dateMode === "day") {
      onChange({
        dateMode,
        day: filters.day || now.format("YYYY-MM-DD"),
      })
      return
    }

    if (dateMode === "month") {
      onChange({
        dateMode,
        month: filters.month || now.format("YYYY-MM"),
      })
      return
    }

    onChange({
      dateMode,
      rangeStart:
        filters.rangeStart ||
        now.startOf("month").format("YYYY-MM-DD"),
      rangeEnd: filters.rangeEnd || now.format("YYYY-MM-DD"),
    })
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {DATE_FILTER_MODES.map((mode) => {
          const isActive = filters.dateMode === mode.value

          return (
            <button
              key={mode.value}
              type="button"
              onClick={() => setMode(mode.value)}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors sm:text-base ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-600 dark:hover:bg-slate-700"
              }`}
            >
              {mode.label}
            </button>
          )
        })}
      </div>

      <div className="min-h-[2.75rem]">
        {filters.dateMode === "day" && (
          <input
            type="date"
            value={filters.day}
            onChange={(e) =>
              onChange({ dateMode: "day", day: e.target.value })
            }
            className={filterInputClass}
            aria-label="Filter by day"
          />
        )}

        {filters.dateMode === "month" && (
          <input
            type="month"
            value={filters.month}
            onChange={(e) =>
              onChange({ dateMode: "month", month: e.target.value })
            }
            className={filterInputClass}
            aria-label="Filter by month"
          />
        )}

        {filters.dateMode === "range" && (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <input
              type="date"
              value={filters.rangeStart}
              onChange={(e) =>
                onChange({
                  dateMode: "range",
                  rangeStart: e.target.value,
                })
              }
              className={filterInputClass}
              aria-label="Range start"
            />
            <input
              type="date"
              value={filters.rangeEnd}
              onChange={(e) =>
                onChange({
                  dateMode: "range",
                  rangeEnd: e.target.value,
                })
              }
              className={filterInputClass}
              aria-label="Range end"
            />
          </div>
        )}
      </div>
    </div>
  )
}
