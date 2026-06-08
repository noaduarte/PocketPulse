import { useMemo } from "react"

import InsightList from "../components/InsightList"
import { useBudgetStore } from "../store/budgetStore"
import { useExpenseStore } from "../store/expenseStore"
import { generateInsights } from "../utils/insightRules"

export default function InsightsPage() {
  const expenses = useExpenseStore((state) => state.expenses)
  const goals = useBudgetStore((state) => state.goals)

  const insights = useMemo(
    () => generateInsights(expenses, goals),
    [expenses, goals]
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Insights</h2>
        <p className="text-gray-500 mt-1">
          Smart observations based on your spending patterns.
        </p>
      </div>

      <InsightList insights={insights} />
    </div>
  )
}
