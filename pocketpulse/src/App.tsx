import { useEffect } from "react"

import { mockExpenses } from "./data/mockExpenses"
import { useExpenseStore } from "./store/expenseStore"
import {getTotalSpending, getTransactionCount} from "./utils/expenseCalculations"

function App() {

  console.log(mockExpenses)
  
  const expenses = useExpenseStore(
    (state) => state.expenses
  )
  
  const addExpense = useExpenseStore(
    (state) => state.addExpense
  )

  useEffect(() => {
    if (expenses.length === 0) {
      mockExpenses.forEach(addExpense)
    }
  }, [])
  
  const totalSpending = getTotalSpending(expenses)
  
  const transactionCount = getTransactionCount(expenses)

  return (
    <div>
      <h1>PocketPulse</h1>

      <h2>Total Spending</h2>
      <p>€{totalSpending}</p>

      <h2>Transaction Count</h2>
      <p>{transactionCount}</p>
    </div>
  )
}

export default App