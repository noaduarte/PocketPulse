import ExpenseList from "../components/ExpenseList"
import { pageSubtitleClass, pageTitleClass } from "../components/formStyles"

export default function YourExpensesPage() {
  return (
    <div className="w-full space-y-6 sm:space-y-8">
      <div>
        <h2 className={pageTitleClass}>Your expenses</h2>
        <p className={pageSubtitleClass}>
          Browse and filter your transactions by date, category, or payment
          method.
        </p>
      </div>

      <ExpenseList />
    </div>
  )
}
