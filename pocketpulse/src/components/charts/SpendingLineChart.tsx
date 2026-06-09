import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import dayjs from "dayjs"

import type { ExpenseEntry } from "../../types/ExpenseEntry"
import ChartPanel from "./ChartPanel"
import { chartTickStyle, chartTooltipStyle } from "./chartStyles"

interface Props {
  expenses: ExpenseEntry[]
}

function getDailyData(expenses: ExpenseEntry[]) {
  const data: Record<string, number> = {}

  expenses.forEach((e) => {
    const day = dayjs(e.date).format("YYYY-MM-DD")
    data[day] = (data[day] || 0) + e.amount
  })

  return Object.entries(data)
    .map(([date, value]) => ({
      date,
      label: dayjs(date).format("MMM D"),
      value,
    }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

export default function SpendingLineChart({ expenses }: Props) {
  const data = getDailyData(expenses)

  return (
    <ChartPanel
      title="Daily Trend"
      description="Spending over time"
    >
      <div className="h-[300px] w-full min-w-0 sm:h-[360px] lg:h-[420px] xl:h-[480px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 12, right: 16, left: 4, bottom: 8 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              tick={chartTickStyle}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
              interval="preserveStartEnd"
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
              labelFormatter={(_, payload) =>
                payload?.[0]?.payload?.date
                  ? dayjs(payload[0].payload.date).format("MMM D, YYYY")
                  : ""
              }
              contentStyle={chartTooltipStyle.contentStyle}
              labelStyle={chartTooltipStyle.labelStyle}
              itemStyle={chartTooltipStyle.itemStyle}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#6366f1"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "#6366f1", strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "#6366f1" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartPanel>
  )
}
