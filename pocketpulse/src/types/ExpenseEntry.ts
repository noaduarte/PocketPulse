import type { Category } from "./Category"
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