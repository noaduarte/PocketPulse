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
import { formatCurrency } from "../../utils/formatCurrency"
import ChartPanel from "./ChartPanel"
import { chartMargin, useChartStyles } from "./useChartStyles"

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
  const {
    tickStyle,
    gridStroke,
    axisStroke,
    tooltipStyle,
    yAxisWidth,
    yAxisTickFormatter,
  } = useChartStyles()

  return (
    <ChartPanel
      title="Daily Trend"
      description="Spending over time"
    >
      <div className="h-[300px] w-full min-w-0 sm:h-[360px] lg:h-[420px] xl:h-[480px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={chartMargin}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={gridStroke}
              vertical={false}
            />
            <XAxis
              dataKey="label"
              tick={tickStyle}
              tickLine={false}
              axisLine={{ stroke: axisStroke }}
              interval="preserveStartEnd"
              dy={8}
            />
            <YAxis
              tick={tickStyle}
              tickLine={false}
              axisLine={false}
              tickFormatter={yAxisTickFormatter}
              width={yAxisWidth}
              tickMargin={4}
            />
            <Tooltip
              formatter={(value) =>
                typeof value === "number"
                  ? [formatCurrency(value), "Spent"]
                  : [value, "Spent"]
              }
              labelFormatter={(_, payload) =>
                payload?.[0]?.payload?.date
                  ? dayjs(payload[0].payload.date).format("MMM D, YYYY")
                  : ""
              }
              contentStyle={tooltipStyle.contentStyle}
              labelStyle={tooltipStyle.labelStyle}
              itemStyle={tooltipStyle.itemStyle}
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
