import { useState } from "react"

import { categories } from "../data/categories"
import type { Category } from "../data/categories"
import { useExpenseStore } from "../store/expenseStore"
import { generateId } from "../utils/generateId"

const DEFAULT_CATEGORY: Category = "Groceries"

const inputClass =
  "w-full rounded-2xl border-0 bg-white px-5 py-4 text-xl text-slate-900 shadow-sm ring-1 ring-slate-200 transition-shadow placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:px-6 sm:py-5 sm:text-2xl"

const labelClass =
  "mb-2 block text-lg font-semibold text-slate-700 sm:text-xl"

export default function ExpenseForm() {
  const addExpense = useExpenseStore((state) => state.addExpense)

  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState<Category>(DEFAULT_CATEGORY)
  const [note, setNote] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount || Number(amount) <= 0) {
      return
    }

    addExpense({
      id: generateId(),
      amount: Number(amount),
      category,
      date: new Date().toISOString().split("T")[0],
      paymentMethod: "Debit Card",
      note,
      createdAt: new Date().toISOString(),
    })

    setAmount("")
    setNote("")
    setCategory(DEFAULT_CATEGORY)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-gradient-to-br from-indigo-500/10 to-violet-500/5 p-6 sm:p-8 lg:p-10"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        <div>
          <label htmlFor="amount" className={labelClass}>
            Amount (€)
          </label>
          <input
            id="amount"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="category" className={labelClass}>
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as Category)
            }
            className={inputClass}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="note" className={labelClass}>
            Note <span className="font-normal text-slate-400">(optional)</span>
          </label>
          <input
            id="note"
            type="text"
            placeholder="What was this for?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 w-full rounded-2xl bg-indigo-600 px-8 py-5 text-xl font-semibold text-white shadow-md shadow-indigo-500/25 transition-colors hover:bg-indigo-700 sm:text-2xl lg:w-auto lg:min-w-[240px]"
      >
        Add Expense
      </button>
    </form>
  )
}
