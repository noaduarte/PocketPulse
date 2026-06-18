import { useBudgetStore } from "../store/budgetStore"
import { cardClass, dangerButtonClass } from "./formStyles"
import { useFormatCurrency } from "../utils/formatCurrency"
import type { BudgetStatus } from "../utils/budgetCalculations"

interface BudgetGoalItemProps {
  status: BudgetStatus
}

export default function BudgetGoalItem({
  status,
}: BudgetGoalItemProps) {
  const deleteGoal = useBudgetStore(
    (state) => state.deleteGoal
  )
  const formatMoney = useFormatCurrency()

  const { goal, spent, remaining, percentUsed, isOverBudget } =
    status

  const progressWidth = Math.min(percentUsed, 100)

  return (
    <div className={`flex min-w-0 flex-col justify-between ${cardClass}`}>
      <div className="min-w-0">
        <div className="flex min-w-0 flex-col-reverse gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <p className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            {formatMoney(goal.monthlyLimit)}
          </p>

          <span className="w-fit max-w-full break-words rounded-xl bg-violet-50 px-3 py-1.5 text-base font-semibold text-violet-700 dark:bg-violet-900/50 dark:text-violet-200 sm:px-4 sm:py-2 sm:text-lg">
            {goal.category} Budget
          </span>
        </div>

        <div className="mt-4 space-y-2 text-lg text-slate-600 dark:text-slate-300 sm:text-xl">
          <p>
            <span className="text-slate-500 dark:text-slate-400">Spent:</span>{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              {formatMoney(spent)}
            </span>
          </p>

          <p>
            <span className="text-slate-500 dark:text-slate-400">Remaining:</span>{" "}
            <span
              className={`font-semibold ${
                isOverBudget
                  ? "text-rose-600 dark:text-rose-400"
                  : "text-emerald-600 dark:text-emerald-400"
              }`}
            >
              {formatMoney(remaining)}
            </span>
          </p>
        </div>

        <div className="mt-5 h-3 w-full rounded-full bg-slate-100 dark:bg-slate-700">
          <div
            className={`h-3 rounded-full transition-all ${
              isOverBudget ? "bg-rose-500" : "bg-indigo-500"
            }`}
            style={{ width: `${progressWidth}%` }}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => deleteGoal(goal.id)}
        className={`mt-6 w-full ${dangerButtonClass}`}
      >
        Delete
      </button>
    </div>
  )
}
