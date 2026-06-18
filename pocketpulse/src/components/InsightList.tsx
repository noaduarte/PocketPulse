import { useEffect, useRef, useState } from "react"

import type { Insight, InsightSeverity } from "../utils/insightRules"

const PAGE_SIZE = 8

interface InsightListProps {
  insights: Insight[]
}

const severityStyles: Record<
  InsightSeverity,
  { ring: string; bg: string; label: string; labelColor: string }
> = {
  info: {
    ring: "ring-indigo-200 dark:ring-indigo-300",
    bg: "bg-indigo-50/90 dark:bg-indigo-100/90",
    label: "Info",
    labelColor: "text-indigo-800",
  },
  success: {
    ring: "ring-emerald-200 dark:ring-emerald-300",
    bg: "bg-emerald-50/90 dark:bg-emerald-100/90",
    label: "Positive",
    labelColor: "text-emerald-800",
  },
  warning: {
    ring: "ring-amber-200 dark:ring-amber-300",
    bg: "bg-amber-50/90 dark:bg-amber-100/90",
    label: "Watch",
    labelColor: "text-amber-900",
  },
  alert: {
    ring: "ring-rose-200 dark:ring-rose-300",
    bg: "bg-rose-50/90 dark:bg-rose-100/90",
    label: "Alert",
    labelColor: "text-rose-800",
  },
}

export default function InsightList({
  insights,
}: InsightListProps) {
  const [page, setPage] = useState(0)

  const totalPages = Math.max(1, Math.ceil(insights.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages - 1)

  const prevLengthRef = useRef(insights.length)

  useEffect(() => {
    if (insights.length > prevLengthRef.current) {
      setPage(0)
    } else if (insights.length < prevLengthRef.current) {
      setPage((p) => Math.min(p, Math.max(0, totalPages - 1)))
    }
    prevLengthRef.current = insights.length
  }, [insights.length, totalPages])

  const start = safePage * PAGE_SIZE
  const visible = insights.slice(start, start + PAGE_SIZE)
  const canGoBack = safePage > 0
  const canGoForward = safePage < totalPages - 1

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <p className="text-lg text-slate-500 dark:text-slate-400 sm:text-xl">
          Showing {start + 1}–{Math.min(start + PAGE_SIZE, insights.length)} of{" "}
          {insights.length}
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={!canGoBack}
            aria-label="Previous insights"
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
            aria-label="Next insights"
            className="rounded-2xl bg-white px-5 py-3 text-xl font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-600 dark:hover:bg-slate-700 sm:px-6 sm:py-4 sm:text-2xl"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        {visible.map((insight) => {
          const style = severityStyles[insight.severity]

          return (
            <div
              key={insight.id}
              className={`min-w-0 rounded-3xl p-6 shadow-sm ring-1 sm:p-8 ${style.bg} ${style.ring}`}
            >
              <span
                className={`text-sm font-bold uppercase tracking-wide sm:text-base ${style.labelColor}`}
              >
                {style.label}
              </span>
              <p className="mt-3 break-words text-lg font-medium leading-relaxed text-slate-900 sm:text-xl">
                {insight.message}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
