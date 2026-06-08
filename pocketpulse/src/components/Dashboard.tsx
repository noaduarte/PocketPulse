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

export default function Dashboard() {
  const expenses = useExpenseStore(
    (state) => state.expenses
  )

  const total = getTotalSpending(expenses)

  const transactions =
    getTransactionCount(expenses)

  const average =
    getAverageExpense(expenses)

  const topCategory =
    getTopCategory(expenses)

  const monthly =
    getMonthlySpending(expenses)
  
  const weekly =
    getWeeklySpending(expenses)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <DashboardCard
        title="Total Spending"
        value={`€${total.toFixed(2)}`}
      />

      <DashboardCard
        title="Transactions"
        value={transactions}
      />

      <DashboardCard
        title="Average Expense"
        value={`€${average.toFixed(2)}`}
      />

      <DashboardCard
        title="Top Category"
        value={topCategory}
      />

      <DashboardCard
        title="Monthly Spending"
        value={`€${monthly.toFixed(2)}`}
      />

      <DashboardCard
        title="Weekly Spending"
        value={`€${weekly.toFixed(2)}`}
      />
    </div>
  )
}