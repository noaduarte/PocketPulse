import { useBudgetStore } from "../store/budgetStore"
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

  const { goal, spent, remaining, percentUsed, isOverBudget } =
    status

  const progressWidth = Math.min(percentUsed, 100)

  return (
    <div className="border rounded-lg p-4 mb-2">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-bold text-lg">
            {goal.category} Budget
          </h3>

          <p className="text-2xl font-bold mb-3">
            €{goal.monthlyLimit.toFixed(2)}
          </p>

          <div className="space-y-1 text-sm">
            <p>
              <span className="text-gray-500">Spent:</span>{" "}
              <span className="font-semibold">
                €{spent.toFixed(2)}
              </span>
            </p>

            <p>
              <span className="text-gray-500">Remaining:</span>{" "}
              <span
                className={`font-semibold ${
                  isOverBudget ? "text-red-500" : "text-green-600"
                }`}
              >
                €{remaining.toFixed(2)}
              </span>
            </p>
          </div>

          <div className="mt-3 h-2 w-full rounded-full bg-gray-200">
            <div
              className={`h-2 rounded-full transition-all ${
                isOverBudget ? "bg-red-500" : "bg-blue-500"
              }`}
              style={{ width: `${progressWidth}%` }}
            />
          </div>
        </div>

        <button
          onClick={() => deleteGoal(goal.id)}
          className="bg-red-500 text-white px-3 py-1 rounded ml-4"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
