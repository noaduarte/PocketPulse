import BudgetGoalForm from "../components/BudgetGoalForm"
import BudgetGoalList from "../components/BudgetGoalList"

export default function BudgetPage() {
  return (
    <div className="grid gap-8">
      <BudgetGoalForm />
      <BudgetGoalList />
    </div>
  )
}
