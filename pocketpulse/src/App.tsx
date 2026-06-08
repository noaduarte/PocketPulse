import ExpenseForm from "./components/ExpenseForm"
import ExpenseList from "./components/ExpenseList"
import Dashboard from "./components/Dashboard"

export default function App() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        PocketPulse
      </h1>
      
      <Dashboard />
      <div className="grid gap-8">
        <ExpenseForm />

        <ExpenseList />
      </div>
    </div>
  )
}