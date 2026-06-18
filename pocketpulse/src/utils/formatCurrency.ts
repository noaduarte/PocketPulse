import { getCurrencySymbol } from "../data/currencies"
import { useSettingsStore } from "../store/settingsStore"

export function formatCurrency(
  amount: number,
  currency?: string
) {
  const code =
    currency ?? useSettingsStore.getState().currency
  const symbol = getCurrencySymbol(code)

  if (symbol.trim() === code) {
    return `${code} ${amount.toFixed(2)}`
  }

  return `${symbol}${amount.toFixed(2)}`
}

/** Compact labels for chart Y-axis so currency symbols are not clipped. */
export function formatChartAxisCurrency(
  amount: number,
  currency?: string
) {
  const code =
    currency ?? useSettingsStore.getState().currency
  const symbol = getCurrencySymbol(code).trim()
  const abs = Math.abs(amount)

  let num: string
  if (abs >= 1_000_000) {
    num = `${(amount / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`
  } else if (abs >= 10_000) {
    num = `${Math.round(amount / 1000)}k`
  } else if (abs >= 1000) {
    num = `${(amount / 1000).toFixed(1).replace(/\.0$/, "")}k`
  } else {
    num = String(Math.round(amount))
  }

  if (symbol === code) {
    return `${code} ${num}`
  }

  return `${symbol}${num}`
}

export function getChartYAxisWidth(currency: string) {
  const symbol = getCurrencySymbol(currency).trim()

  if (symbol === currency || symbol.length >= 3) {
    return 72
  }

  if (symbol.length === 2) {
    return 64
  }

  return 56
}

export function useFormatCurrency() {
  const currency = useSettingsStore((state) => state.currency)

  return (amount: number) => formatCurrency(amount, currency)
}
