import {LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, } from "recharts"
import type { ExpenseEntry } from "../../types/ExpenseEntry"
import dayjs from "dayjs"
  
interface Props {
    expenses: ExpenseEntry[]
}

function getDailyData(expenses: ExpenseEntry[]) {
    const data: Record<string, number> = {}
  
    expenses.forEach((e) => {
      const day = dayjs(e.date).format("YYYY-MM-DD")
  
      data[day] =
        (data[day] || 0) + e.amount
    })
  
    return Object.entries(data).map(
      ([date, value]) => ({
        date,
        value,
      })
    )
  }

export default function SpendingLineChart({
    expenses,
    }: Props) {
    const data = getDailyData(expenses)

    return (
        <div className="border rounded-xl p-4">
        <h2 className="font-bold mb-4">
            Daily Spending Trend
        </h2>

        <LineChart
            width={500}
            height={300}
            data={data}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />

            <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            />
        </LineChart>
        </div>
    )
}

