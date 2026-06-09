import { Route, Routes } from "react-router-dom"

import Layout from "./components/Layout"
import AddExpensePage from "./pages/AddExpensePage"
import BudgetPage from "./pages/BudgetPage"
import HomePage from "./pages/HomePage"
import InsightsPage from "./pages/InsightsPage"
import YourExpensesPage from "./pages/YourExpensesPage"

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="expenses" element={<AddExpensePage />} />
        <Route path="your-expenses" element={<YourExpensesPage />} />
        <Route path="budget" element={<BudgetPage />} />
        <Route path="insights" element={<InsightsPage />} />
      </Route>
    </Routes>
  )
}
