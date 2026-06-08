import { PieChart, Pie, Cell, Tooltip } from "recharts"
import type { ExpenseEntry } from "../../types/ExpenseEntry"

interface Props {
  expenses: ExpenseEntry[]
}

function getCategoryData(expenses: ExpenseEntry[]) {
    const data: Record<string, number> = {}
  
    expenses.forEach((e) => {
      data[e.category] =
        (data[e.category] || 0) + e.amount
    })
  
    return Object.entries(data).map(
      ([name, value]) => ({
        name,
        value,
      })
    )
  }

export default function CategoryPieChart({
    expenses,
    }: Props) {
    const data = getCategoryData(expenses)

    const COLORS = [
        "#3b82f6",
        "#10b981",
        "#f59e0b",
        "#ef4444",
        "#8b5cf6",
    ]

    return (
        <div className="border rounded-xl p-4">
        <h2 className="font-bold mb-4">
            Spending by Category
        </h2>

        <PieChart width={300} height={300}>
            <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            >
            {data.map((_, index) => (
                <Cell
                key={index}
                fill={
                    COLORS[
                    index % COLORS.length
                    ]
                }
                />
            ))}
            </Pie>

            <Tooltip />
        </PieChart>
        </div>
    )
    }