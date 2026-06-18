import { useSettingsStore } from "../../store/settingsStore"
import {
  formatChartAxisCurrency,
  getChartYAxisWidth,
} from "../../utils/formatCurrency"

export const chartMargin = {
  top: 12,
  right: 16,
  left: 0,
  bottom: 8,
}

export function useChartStyles() {
  const currency = useSettingsStore((state) => state.currency)
  const isDark =
    useSettingsStore((state) => state.themeMode) === "dark"

  const tickFill = isDark ? "#e2e8f0" : "#475569"
  const gridStroke = isDark ? "#334155" : "#e2e8f0"
  const axisStroke = isDark ? "#475569" : "#e2e8f0"

  return {
    tickStyle: {
      fontSize: 18,
      fill: tickFill,
      fontWeight: 500,
    },
    gridStroke,
    axisStroke,
    yAxisWidth: getChartYAxisWidth(currency),
    yAxisTickFormatter: (value: number) =>
      formatChartAxisCurrency(value, currency),
    tooltipStyle: {
      contentStyle: {
        borderRadius: "10px",
        border: "none",
        boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
        fontSize: "17px",
        padding: "10px 14px",
        backgroundColor: isDark ? "#1e293b" : "#ffffff",
        color: isDark ? "#f1f5f9" : "#1e293b",
      },
      labelStyle: {
        fontSize: "17px",
        fontWeight: 600,
        color: isDark ? "#f1f5f9" : "#1e293b",
        marginBottom: "4px",
      },
      itemStyle: {
        fontSize: "17px",
        color: isDark ? "#e2e8f0" : "#334155",
      },
    },
    legendStyle: {
      fontSize: "18px",
      fontWeight: 500,
      paddingTop: "16px",
      color: tickFill,
    },
  }
}
