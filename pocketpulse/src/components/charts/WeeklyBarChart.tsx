import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import dayjs from "dayjs"

import type { ExpenseEntry } from "../../types/ExpenseEntry"
import ChartPanel from "./ChartPanel"
import { chartTickStyle, chartTooltipStyle } from "./chartStyles"

interface Props {
  expenses: ExpenseEntry[]
}

const DAY_ORDER = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

function getWeeklyData(expenses: ExpenseEntry[]) {
  const days: Record<string, number> = {}

  expenses.forEach((e) => {
    const day = dayjs(e.date).format("ddd")
    days[day] = (days[day] || 0) + e.amount
  })

  return DAY_ORDER.map((day) => ({
    day,
    value: days[day] ?? 0,
  }))
}

export default function WeeklyBarChart({ expenses }: Props) {
  const data = getWeeklyData(expenses)

  return (
    <ChartPanel
      title="By Day of Week"
      description="When you spend the most"
    >
      <div className="h-[280px] w-full min-w-0 sm:h-[340px] lg:h-[400px] xl:h-[440px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 12, right: 16, left: 4, bottom: 8 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={chartTickStyle}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
              dy={8}
            />
            <YAxis
              tick={chartTickStyle}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `€${v}`}
              width={72}
            />
            <Tooltip
              formatter={(value) =>
                typeof value === "number"
                  ? [`€${value.toFixed(2)}`, "Spent"]
                  : [value, "Spent"]
              }
              contentStyle={chartTooltipStyle.contentStyle}
              labelStyle={chartTooltipStyle.labelStyle}
              itemStyle={chartTooltipStyle.itemStyle}
            />
            <Bar
              dataKey="value"
              fill="#10b981"
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartPanel>
  )
}
