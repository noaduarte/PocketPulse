import type { Category } from "../data/categories"
import type { PaymentMethod } from "../data/paymentMethods"

export type DateFilterMode = "all" | "day" | "month" | "range"

export interface ExpenseFiltersState {
  dateMode: DateFilterMode
  day: string
  month: string
  rangeStart: string
  rangeEnd: string
  category: Category | "all"
  paymentMethod: PaymentMethod | "all"
}
