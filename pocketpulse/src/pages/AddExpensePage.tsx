import ExpenseForm from "../components/ExpenseForm"
import { pageSubtitleClass, pageTitleClass } from "../components/formStyles"

export default function AddExpensePage() {
  return (
    <div className="w-full space-y-6 sm:space-y-8">
      <div>
        <h2 className={pageTitleClass}>Record an expense</h2>
        <p className={pageSubtitleClass}>
          Add a new transaction to track your spending.
        </p>
      </div>

      <ExpenseForm />
    </div>
  )
}
