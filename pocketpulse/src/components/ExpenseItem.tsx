import type { ExpenseEntry } from "../types/ExpenseEntry"
import { useExpenseStore } from "../store/expenseStore"

interface ExpenseItemProps {
  expense: ExpenseEntry
}

export default function ExpenseItem({
  expense,
}: ExpenseItemProps) {
  const deleteExpense = useExpenseStore(
    (state) => state.deleteExpense
  )

  return (
    <div className="border rounded-lg p-4 mb-2">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold">
            €{expense.amount}
          </h3>

          <p>{expense.category}</p>

          <p className="text-sm text-gray-500">
            {expense.note}
          </p>
        </div>

        <button
          onClick={() =>
            deleteExpense(expense.id)
          }
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  )
}