import type { Category } from "../data/categories"
import type { PaymentMethod } from "./PaymentMethod"

export interface ExpenseEntry {
    id: string
    amount: number
    category: Category
    date: string
    paymentMethod: PaymentMethod
    note?: string
    createdAt: string
  }