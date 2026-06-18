import type { InsightSeverity } from "../utils/insightRules"

export type InsightFilter = "all" | InsightSeverity

export const INSIGHT_FILTERS: {
  value: InsightFilter
  label: string
}[] = [
  { value: "all", label: "All" },
  { value: "info", label: "Info" },
  { value: "success", label: "Positive" },
  { value: "warning", label: "Watch" },
  { value: "alert", label: "Alert" },
]

interface InsightFilterBarProps {
  active: InsightFilter
  counts: Record<InsightFilter, number>
  onChange: (filter: InsightFilter) => void
}

export default function InsightFilterBar({
  active,
  counts,
  onChange,
}: InsightFilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {INSIGHT_FILTERS.map((filter) => {
        const isActive = active === filter.value
        const count = counts[filter.value]

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onChange(filter.value)}
            className={`rounded-xl px-4 py-2.5 text-base font-semibold transition-colors sm:px-5 sm:py-3 sm:text-lg ${
              isActive
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                : "bg-white text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-600 dark:hover:bg-slate-700"
            }`}
          >
            {filter.label}
            <span
              className={`ml-2 text-sm ${
                isActive ? "text-indigo-200" : "text-slate-400 dark:text-slate-500"
              }`}
            >
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
