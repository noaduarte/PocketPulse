import DashboardCard from "./DashboardCard"
import { useExpenseStore } from "../store/expenseStore"

import {
  getAverageExpense,
  getMonthlySpending,
  getTopCategory,
  getTotalSpending,
  getTransactionCount,
  getWeeklySpending,
} from "../utils/dashboardCalculations"
import { useFormatCurrency } from "../utils/formatCurrency"

import ChartsSection from "./charts/ChartsSection"

export default function Dashboard() {
  const expenses = useExpenseStore((state) => state.expenses)
  const formatMoney = useFormatCurrency()

  const total = getTotalSpending(expenses)
  const transactions = getTransactionCount(expenses)
  const average = getAverageExpense(expenses)
  const topCategory = getTopCategory(expenses)
  const monthly = getMonthlySpending(expenses)
  const weekly = getWeeklySpending(expenses)

  const hasData = expenses.length > 0

  return (
    <div className="w-full space-y-8 lg:space-y-12">
      <section className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="flex lg:col-span-6">
          <DashboardCard
            variant="hero"
            title="Total Spending"
            value={formatMoney(total)}
            subtitle={
              hasData
                ? `${transactions} transaction${transactions !== 1 ? "s" : ""} recorded`
                : "Start adding expenses to see your summary"
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4 lg:col-span-6 lg:grid-cols-2 lg:gap-6 lg:content-stretch">
          <DashboardCard
            title="This Month"
            value={formatMoney(monthly)}
            accent="violet"
          />
          <DashboardCard
            title="Last 7 Days"
            value={formatMoney(weekly)}
            accent="green"
          />
          <DashboardCard
            title="Average Expense"
            value={formatMoney(average)}
            accent="amber"
          />
          <DashboardCard
            title="Top Category"
            value={topCategory}
            accent="rose"
          />
        </div>
      </section>

      <section className="w-full">
        <ChartsSection expenses={expenses} />
      </section>
    </div>
  )
}
