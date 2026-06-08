import { useState } from "react"

import { categories } from "../data/categories"
import type { Category } from "../data/categories"
import { useBudgetStore } from "../store/budgetStore"
import { generateId } from "../utils/generateId"

const DEFAULT_CATEGORY: Category = "Groceries"

export default function BudgetGoalForm() {
  const addGoal = useBudgetStore((state) => state.addGoal)
  const goals = useBudgetStore((state) => state.goals)

  const [category, setCategory] = useState<Category>(DEFAULT_CATEGORY)
  const [monthlyLimit, setMonthlyLimit] = useState("")

  const isUpdating = goals.some(
    (goal) => goal.category === category
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!monthlyLimit || Number(monthlyLimit) <= 0) {
      return
    }

    const existingGoal = goals.find(
      (goal) => goal.category === category
    )

    addGoal({
      id: existingGoal?.id ?? generateId(),
      category,
      monthlyLimit: Number(monthlyLimit),
    })

    setMonthlyLimit("")
    setCategory(DEFAULT_CATEGORY)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value as Category)
        }
        className="border p-2 w-full rounded"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Monthly limit (€)"
        value={monthlyLimit}
        onChange={(e) => setMonthlyLimit(e.target.value)}
        className="border p-2 w-full rounded"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isUpdating ? "Update Budget" : "Create Budget"}
      </button>
    </form>
  )
}
