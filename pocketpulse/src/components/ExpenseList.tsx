import ExpenseItem from "./ExpenseItem"
import { useExpenseStore } from "../store/expenseStore"

export default function ExpenseList() {
  const expenses = useExpenseStore(
    (state) => state.expenses
  )

  if (expenses.length === 0) {
    return (
        <div className="border rounded-lg p-6 text-center">
          No expenses recorded yet.
        </div>
      )
  }

  return (
    <div>
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
        />
      ))}
    </div>
  )
}