import { useState } from "react"

import { generateId } from "../utils/generateId"

import { useExpenseStore } from "../store/expenseStore"

import { categories } from "../data/categories"
import type { Category } from "../data/categories"

const DEFAULT_CATEGORY: Category =
  "Groceries"

export default function ExpenseForm() {
  const addExpense = useExpenseStore(
    (state) => state.addExpense
  )

  const [amount, setAmount] =
    useState("")

  const [category, setCategory] =
    useState<Category>(
      DEFAULT_CATEGORY
    )

  const [note, setNote] =
    useState("")

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    if (!amount || Number(amount) <= 0) {
      return
    }

    addExpense({
      id: generateId(),
      amount: Number(amount),
      category,
      date: new Date()
        .toISOString()
        .split("T")[0],
      paymentMethod: "Debit Card",
      note,
      createdAt:
        new Date().toISOString(),
    })

    setAmount("")
    setNote("")
    setCategory(DEFAULT_CATEGORY)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) =>
          setAmount(
            e.target.value
          )
        }
        className="border p-2 w-full rounded"
      />

      <select
        value={category}
        onChange={(e) =>
          setCategory(
            e.target
              .value as Category
          )
        }
        className="border p-2 w-full rounded"
      >
        {categories.map((cat) => (
          <option
            key={cat}
            value={cat}
          >
            {cat}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Note"
        value={note}
        onChange={(e) =>
          setNote(
            e.target.value
          )
        }
        className="border p-2 w-full rounded"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Expense
      </button>
    </form>
  )
}