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
import { formatCurrency } from "../../utils/formatCurrency"
import ChartPanel from "./ChartPanel"
import { chartMargin, useChartStyles } from "./useChartStyles"

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
      title="By Day of Week"
      description="When you spend the most"
    >
      <div className="h-[280px] w-full min-w-0 sm:h-[340px] lg:h-[400px] xl:h-[440px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={chartMargin}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={gridStroke}
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={tickStyle}
              tickLine={false}
              axisLine={{ stroke: axisStroke }}
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
              contentStyle={tooltipStyle.contentStyle}
              labelStyle={tooltipStyle.labelStyle}
              itemStyle={tooltipStyle.itemStyle}
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
