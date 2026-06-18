import { useState } from "react"

import type { Category } from "../data/categories"
import { getCurrencySymbol } from "../data/currencies"
import {
  inputClass,
  labelClass,
  panelClass,
  primaryButtonClass,
  selectClass,
} from "./formStyles"
import { useBudgetStore } from "../store/budgetStore"
import { useCategoryStore } from "../store/categoryStore"
import { useSettingsStore } from "../store/settingsStore"
import { generateId } from "../utils/generateId"

const DEFAULT_CATEGORY: Category = "Groceries"

export default function BudgetGoalForm() {
  const addGoal = useBudgetStore((state) => state.addGoal)
  const goals = useBudgetStore((state) => state.goals)
  const categories = useCategoryStore((state) => state.categories)
  const currency = useSettingsStore((state) => state.currency)
  const currencySymbol = getCurrencySymbol(currency)

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
    <form onSubmit={handleSubmit} className={panelClass}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        <div className="min-w-0">
          <label htmlFor="budget-category" className={labelClass}>
            Category
          </label>
          <select
            id="budget-category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as Category)
            }
            className={selectClass}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-0">
          <label htmlFor="budget-limit" className={labelClass}>
            Monthly limit ({currencySymbol.trim() || currency})
          </label>
          <input
            id="budget-limit"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={monthlyLimit}
            onChange={(e) => setMonthlyLimit(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <button
        type="submit"
        className={`mt-8 w-full sm:w-auto sm:min-w-[240px] ${primaryButtonClass}`}
      >
        {isUpdating ? "Update Budget" : "Create Budget"}
      </button>
    </form>
  )
}
