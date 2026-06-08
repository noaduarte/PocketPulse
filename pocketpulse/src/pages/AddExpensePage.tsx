import ExpenseForm from "../components/ExpenseForm"
import ExpenseList from "../components/ExpenseList"

export default function AddExpensePage() {
  return (
    <div className="grid gap-8">
      <ExpenseForm />
      <ExpenseList />
    </div>
  )
}
