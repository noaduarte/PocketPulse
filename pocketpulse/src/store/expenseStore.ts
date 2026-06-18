import { create } from "zustand"
import { persist } from "zustand/middleware"

import type { ExpenseEntry } from "../types/ExpenseEntry"

interface ExpenseStore {
  expenses: ExpenseEntry[]

  addExpense: (expense: ExpenseEntry) => void

  deleteExpense: (id: string) => void

  updateExpense: (
    id: string,
    updatedExpense: ExpenseEntry
  ) => void

  reassignCategory: (fromCategory: string, toCategory: string) => void
}

export const useExpenseStore = create<ExpenseStore>()(
    persist(
      (set) => ({
        expenses: [],
  
        addExpense: (expense) =>
          set((state) => ({
            expenses: [...state.expenses, expense],
          })),
  
        deleteExpense: (id) =>
          set((state) => ({
            expenses: state.expenses.filter(
              (expense) => expense.id !== id
            ),
          })),
  
        updateExpense: (id, updatedExpense) =>
          set((state) => ({
            expenses: state.expenses.map((expense) =>
              expense.id === id
                ? updatedExpense
                : expense
            ),
          })),

        reassignCategory: (fromCategory, toCategory) =>
          set((state) => ({
            expenses: state.expenses.map((expense) =>
              expense.category === fromCategory
                ? { ...expense, category: toCategory }
                : expense
            ),
          })),
      }),
      {
        name: "pocketpulse-expenses",
      }
    )
  )