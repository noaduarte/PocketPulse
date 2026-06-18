import { useMemo, useState } from "react"

import InsightFilterBar, {
  type InsightFilter,
} from "../components/InsightFilterBar"
import InsightList from "../components/InsightList"
import {
  pageSubtitleClass,
  pageTitleClass,
  cardClass,
} from "../components/formStyles"
import { useBudgetStore } from "../store/budgetStore"
import { useExpenseStore } from "../store/expenseStore"
import { useSettingsStore } from "../store/settingsStore"
import { isBudgetInsight } from "../utils/budgetAlerts"
import {
  generateInsights,
  type InsightSeverity,
} from "../utils/insightRules"

function buildCounts(insights: { severity: InsightSeverity }[]) {
  const counts: Record<InsightFilter, number> = {
    all: insights.length,
    info: 0,
    success: 0,
    warning: 0,
    alert: 0,
  }

  insights.forEach((insight) => {
    counts[insight.severity] += 1
  })

  return counts
}

export default function InsightsPage() {
  const expenses = useExpenseStore((state) => state.expenses)
  const goals = useBudgetStore((state) => state.goals)
  const insightGenerationEnabled = useSettingsStore(
    (state) => state.insightGenerationEnabled
  )
  const notificationsEnabled = useSettingsStore(
    (state) => state.notificationsEnabled
  )

  const [activeFilter, setActiveFilter] =
    useState<InsightFilter>("all")

  const insights = useMemo(() => {
    const all = generateInsights(expenses, goals)

    if (!notificationsEnabled) {
      return all.filter((insight) => !isBudgetInsight(insight))
    }

    return all
  }, [expenses, goals, notificationsEnabled])

  const counts = useMemo(
    () => buildCounts(insights),
    [insights]
  )

  const filteredInsights = useMemo(() => {
    if (activeFilter === "all") {
      return insights
    }

    return insights.filter(
      (insight) => insight.severity === activeFilter
    )
  }, [insights, activeFilter])

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      <div>
        <h2 className={pageTitleClass}>Insights</h2>
        <p className={pageSubtitleClass}>
          Smart observations based on your spending patterns.
          {!notificationsEnabled && (
            <span className="block mt-1 text-base">
              Enable budget notifications in Settings to see budget alerts here.
            </span>
          )}
        </p>
      </div>

      {!insightGenerationEnabled ? (
        <div
          className={`flex flex-col items-center justify-center py-20 px-8 text-center ${cardClass}`}
        >
          <p className="text-xl font-medium text-slate-700 dark:text-slate-200 sm:text-2xl">
            Insight generation is turned off
          </p>
          <p className="mt-2 text-lg text-slate-500 dark:text-slate-400 sm:text-xl">
            Enable it in Settings to see spending observations here.
          </p>
        </div>
      ) : (
        <>
          <InsightFilterBar
            active={activeFilter}
            counts={counts}
            onChange={setActiveFilter}
          />

          {filteredInsights.length === 0 ? (
            <div
              className={`flex flex-col items-center justify-center py-16 px-8 text-center ${cardClass}`}
            >
              <p className="text-xl font-medium text-slate-700 dark:text-slate-200 sm:text-2xl">
                No insights in this category
              </p>
              <p className="mt-2 text-lg text-slate-500 dark:text-slate-400">
                Try another filter or add more expenses.
              </p>
            </div>
          ) : (
            <InsightList
              key={activeFilter}
              insights={filteredInsights}
            />
          )}
        </>
      )}
    </div>
  )
}
