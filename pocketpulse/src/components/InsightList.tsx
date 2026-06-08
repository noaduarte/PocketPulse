import type { Insight, InsightSeverity } from "../utils/insightRules"

interface InsightListProps {
  insights: Insight[]
}

const severityStyles: Record<
  InsightSeverity,
  { border: string; bg: string; label: string }
> = {
  info: {
    border: "border-blue-200",
    bg: "bg-blue-50",
    label: "Info",
  },
  success: {
    border: "border-green-200",
    bg: "bg-green-50",
    label: "Positive",
  },
  warning: {
    border: "border-amber-200",
    bg: "bg-amber-50",
    label: "Watch",
  },
  alert: {
    border: "border-red-200",
    bg: "bg-red-50",
    label: "Alert",
  },
}

export default function InsightList({
  insights,
}: InsightListProps) {
  return (
    <div className="space-y-3">
      {insights.map((insight) => {
        const style = severityStyles[insight.severity]

        return (
          <div
            key={insight.id}
            className={`border rounded-lg p-4 ${style.border} ${style.bg}`}
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              {style.label}
            </span>
            <p className="mt-1 font-medium">{insight.message}</p>
          </div>
        )
      })}
    </div>
  )
}
