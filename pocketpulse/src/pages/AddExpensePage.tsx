import ExpenseForm from "../components/ExpenseForm"

export default function AddExpensePage() {
  return (
    <div className="w-full space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
          Record an expense
        </h2>
        <p className="mt-2 text-lg text-slate-500 sm:text-xl">
          Add a new transaction to track your spending.
        </p>
      </div>

      <ExpenseForm />
    </div>
  )
}
