import { BarChart, Bar, XAxis, YAxis, Tooltip, } from "recharts"
import type { ExpenseEntry } from "../../types/ExpenseEntry"
import dayjs from "dayjs"
  
interface Props {
    expenses: ExpenseEntry[]
}

function getWeeklyData(expenses: ExpenseEntry[]) {
    const days: Record<string, number> = {}
  
    expenses.forEach((e) => {
      const day = dayjs(e.date).format("ddd")
  
      days[day] =
        (days[day] || 0) + e.amount
    })
  
    return Object.entries(days).map(
      ([day, value]) => ({
        day,
        value,
      })
    )
  }

export default function WeeklyBarChart({
    expenses,
    }: Props) {
    const data = getWeeklyData(expenses)

    return (
        <div className="border rounded-xl p-4">
        <h2 className="font-bold mb-4">
            Weekly Spending
        </h2>

        <BarChart
            width={500}
            height={300}
            data={data}
        >
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="value" fill="#10b981" />
        </BarChart>
        </div>
    )
    }