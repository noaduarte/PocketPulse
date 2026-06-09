import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

import type { ExpenseEntry } from "../../types/ExpenseEntry"
import ChartPanel from "./ChartPanel"
import { chartLegendStyle, chartTooltipStyle } from "./chartStyles"

interface Props {
  expenses: ExpenseEntry[]
}

const COLORS = [
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
  "#84cc16",
]

function getCategoryData(expenses: ExpenseEntry[]) {
  const data: Record<string, number> = {}

  expenses.forEach((e) => {
    data[e.category] = (data[e.category] || 0) + e.amount
  })

  return Object.entries(data)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
}

export default function CategoryPieChart({ expenses }: Props) {
  const data = getCategoryData(expenses)

  return (
    <ChartPanel
      title="By Category"
      description="Where your money goes"
    >
      <div className="h-[300px] w-full min-w-0 sm:h-[360px] lg:h-[420px] xl:h-[480px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              innerRadius="45%"
              outerRadius="70%"
              paddingAngle={2}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) =>
                typeof value === "number"
                  ? `€${value.toFixed(2)}`
                  : value
              }
              contentStyle={chartTooltipStyle.contentStyle}
              labelStyle={chartTooltipStyle.labelStyle}
              itemStyle={chartTooltipStyle.itemStyle}
            />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              iconSize={16}
              wrapperStyle={chartLegendStyle}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartPanel>
  )
}
