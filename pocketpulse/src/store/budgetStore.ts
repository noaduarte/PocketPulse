import { create } from "zustand"
import { persist } from "zustand/middleware"

import type { BudgetGoal } from "../types/BudgetGoal"

interface BudgetStore {
  goals: BudgetGoal[]

  addGoal: (goal: BudgetGoal) => void
  deleteGoal: (id: string) => void
  deleteGoalsByCategory: (category: string) => void
}

export const useBudgetStore = create<BudgetStore>()(
  persist(
    (set) => ({
      goals: [],

      addGoal: (goal) =>
        set((state) => {
          const existingIndex = state.goals.findIndex(
            (g) => g.category === goal.category
          )

          if (existingIndex >= 0) {
            const updated = [...state.goals]
            updated[existingIndex] = goal
            return { goals: updated }
          }

          return { goals: [...state.goals, goal] }
        }),

      deleteGoal: (id) =>
        set((state) => ({
          goals: state.goals.filter((goal) => goal.id !== id),
        })),

      deleteGoalsByCategory: (category) =>
        set((state) => ({
          goals: state.goals.filter(
            (goal) => goal.category !== category
          ),
        })),
    }),
    {
      name: "pocketpulse-budgets",
    }
  )
)
