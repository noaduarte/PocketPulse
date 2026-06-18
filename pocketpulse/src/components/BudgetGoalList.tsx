import BudgetGoalItem from "./BudgetGoalItem"
import { useBudgetStore } from "../store/budgetStore"
import { useExpenseStore } from "../store/expenseStore"
import { getAllBudgetStatuses } from "../utils/budgetCalculations"

export default function BudgetGoalList() {
  const goals = useBudgetStore((state) => state.goals)
  const expenses = useExpenseStore((state) => state.expenses)

  if (goals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl bg-white py-20 px-8 text-center shadow-sm">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-violet-50">
          <span className="text-3xl font-bold text-violet-400">€</span>
        </div>
        <p className="text-xl font-medium text-slate-700 sm:text-2xl">
          No budget goals yet
        </p>
        <p className="mt-2 text-lg text-slate-500 sm:text-xl">
          Create a monthly limit above to start tracking.
        </p>
      </div>
    )
  }

  const statuses = getAllBudgetStatuses(expenses, goals)

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
      {statuses.map((status) => (
        <BudgetGoalItem
          key={status.goal.id}
          status={status}
        />
      ))}
    </div>
  )
}
