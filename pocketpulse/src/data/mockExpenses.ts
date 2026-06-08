import type { ExpenseEntry } from "../types/ExpenseEntry"

export const mockExpenses: ExpenseEntry[] = [
  {
    id: "1",
    amount: 15,
    category: "Groceries",
    date: "2026-06-01",
    paymentMethod: "Debit Card",
    note: "Lunch",
    createdAt: "2026-06-01T13:00:00",
  },
  {
    id: "2",
    amount: 40,
    category: "Clothing",
    date: "2026-06-02",
    paymentMethod: "Credit Card",
    note: "T-shirt",
    createdAt: "2026-06-02T18:00:00",
  },
]