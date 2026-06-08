import BudgetGoalItem from "./BudgetGoalItem"
import { useBudgetStore } from "../store/budgetStore"
import { useExpenseStore } from "../store/expenseStore"
import { getAllBudgetStatuses } from "../utils/budgetCalculations"

export default function BudgetGoalList() {
  const goals = useBudgetStore((state) => state.goals)
  const expenses = useExpenseStore((state) => state.expenses)

  if (goals.length === 0) {
    return (
      <div className="border rounded-lg p-6 text-center">
        No budget goals yet. Create one above.
      </div>
    )
  }

  const statuses = getAllBudgetStatuses(expenses, goals)

  return (
    <div>
      {statuses.map((status) => (
        <BudgetGoalItem
          key={status.goal.id}
          status={status}
        />
      ))}
    </div>
  )
}
