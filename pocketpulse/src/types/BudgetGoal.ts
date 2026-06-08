import type { Category } from "../data/categories"

export interface BudgetGoal {
  id: string
  category: Category
  monthlyLimit: number
}
