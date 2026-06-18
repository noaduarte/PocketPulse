import { useState } from "react"

import type { Category } from "../data/categories"
import { paymentMethods } from "../data/paymentMethods"
import type { PaymentMethod } from "../data/paymentMethods"
import { getCurrencySymbol } from "../data/currencies"
import { useCategoryStore } from "../store/categoryStore"
import { useSettingsStore } from "../store/settingsStore"
import { useExpenseStore } from "../store/expenseStore"
import { generateId } from "../utils/generateId"

import {
  inputClass,
  labelClass,
  panelClass,
  primaryButtonClass,
  selectClass,
} from "./formStyles"

const DEFAULT_CATEGORY: Category = "Groceries"
const DEFAULT_PAYMENT_METHOD: PaymentMethod = "Debit Card"

function getTodayDate() {
  return new Date().toISOString().split("T")[0]
}

export default function ExpenseForm() {
  const addExpense = useExpenseStore((state) => state.addExpense)
  const categories = useCategoryStore((state) => state.categories)
  const currency = useSettingsStore((state) => state.currency)
  const currencySymbol = getCurrencySymbol(currency)

  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState<Category>(DEFAULT_CATEGORY)
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>(DEFAULT_PAYMENT_METHOD)
  const [date, setDate] = useState(getTodayDate)
  const [note, setNote] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount || Number(amount) <= 0) {
      return
    }

    addExpense({
      id: generateId(),
      amount: Number(amount),
      category,
      date,
      paymentMethod,
      note,
      createdAt: new Date().toISOString(),
    })

    setAmount("")
    setNote("")
    setCategory(DEFAULT_CATEGORY)
    setPaymentMethod(DEFAULT_PAYMENT_METHOD)
    setDate(getTodayDate())
  }

  return (
    <form onSubmit={handleSubmit} className={panelClass}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        <div className="min-w-0">
          <label htmlFor="amount" className={labelClass}>
            Amount ({currencySymbol.trim() || currency})
          </label>
          <input
            id="amount"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="min-w-0">
          <label htmlFor="date" className={labelClass}>
            Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            max={getTodayDate()}
            onChange={(e) => setDate(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="min-w-0">
          <label htmlFor="category" className={labelClass}>
            Category
          </label>
          <select
            id="category"
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
          <label htmlFor="paymentMethod" className={labelClass}>
            Payment method
          </label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) =>
              setPaymentMethod(e.target.value as PaymentMethod)
            }
            className={selectClass}
          >
            {paymentMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-0 sm:col-span-2">
          <label htmlFor="note" className={labelClass}>
            Note <span className="font-normal text-slate-400">(optional)</span>
          </label>
          <input
            id="note"
            type="text"
            placeholder="What was this for?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <button
        type="submit"
        className={`mt-8 w-full lg:w-auto lg:min-w-[240px] ${primaryButtonClass}`}
      >
        Add Expense
      </button>
    </form>
  )
}
