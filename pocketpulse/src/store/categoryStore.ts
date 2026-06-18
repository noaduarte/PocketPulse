import { create } from "zustand"
import { persist } from "zustand/middleware"

import {
  DEFAULT_CATEGORIES,
  isProtectedCategory,
  OTHER_CATEGORY,
  sortCategoriesWithOtherLast,
} from "../data/categories"
import { useBudgetStore } from "./budgetStore"
import { useExpenseStore } from "./expenseStore"

interface CategoryStore {
  categories: string[]

  addCategory: (name: string) => boolean
  deleteCategory: (name: string) => boolean
}

export const useCategoryStore = create<CategoryStore>()(
  persist(
    (set, get) => ({
      categories: [...DEFAULT_CATEGORIES],

      addCategory: (name) => {
        const trimmed = name.trim()

        if (!trimmed || isProtectedCategory(trimmed)) {
          return false
        }

        const { categories } = get()

        if (
          categories.some(
            (category) =>
              category.toLowerCase() === trimmed.toLowerCase()
          )
        ) {
          return false
        }

        set({
          categories: sortCategoriesWithOtherLast([
            ...categories,
            trimmed,
          ]),
        })

        return true
      },

      deleteCategory: (name) => {
        if (isProtectedCategory(name)) {
          return false
        }

        const { categories } = get()

        if (!categories.includes(name)) {
          return false
        }

        useExpenseStore
          .getState()
          .reassignCategory(name, OTHER_CATEGORY)
        useBudgetStore.getState().deleteGoalsByCategory(name)

        set({
          categories: categories.filter(
            (category) => category !== name
          ),
        })

        return true
      },
    }),
    {
      name: "pocketpulse-categories",
    }
  )
)
