import ExpenseList from "../components/ExpenseList"
import { useExpenseStore } from "../store/expenseStore"

export default function YourExpensesPage() {
  const expenses = useExpenseStore((state) => state.expenses)

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
          Your expenses
        </h2>
        <p className="mt-2 text-lg text-slate-500 sm:text-xl">
          {expenses.length === 0
            ? "No transactions yet."
            : `${expenses.length} transaction${expenses.length !== 1 ? "s" : ""} recorded`}
        </p>
      </div>

      <ExpenseList />
    </div>
  )
}
