export const currencies = [
  { code: "EUR", symbol: "€", label: "Euro (€)" },
  { code: "USD", symbol: "$", label: "US Dollar ($)" },
  { code: "GBP", symbol: "£", label: "British Pound (£)" },
  { code: "CHF", symbol: "CHF", label: "Swiss Franc (CHF)" },
  { code: "JPY", symbol: "¥", label: "Japanese Yen (¥)" },
  { code: "CNY", symbol: "¥", label: "Chinese Yuan (¥)" },
  { code: "KRW", symbol: "₩", label: "South Korean Won (₩)" },
  { code: "THB", symbol: "฿", label: "Thai Baht (฿)" },
  { code: "INR", symbol: "₹", label: "Indian Rupee (₹)" },
  { code: "SGD", symbol: "S$", label: "Singapore Dollar (S$)" },
  { code: "MYR", symbol: "RM", label: "Malaysian Ringgit (RM)" },
  { code: "VND", symbol: "₫", label: "Vietnamese Dong (₫)" },
  { code: "PHP", symbol: "₱", label: "Philippine Peso (₱)" },
  { code: "IDR", symbol: "Rp", label: "Indonesian Rupiah (Rp)" },
  { code: "TWD", symbol: "NT$", label: "Taiwan Dollar (NT$)" },
  { code: "HKD", symbol: "HK$", label: "Hong Kong Dollar (HK$)" },
] as const

export type CurrencyCode = (typeof currencies)[number]["code"]

export function getCurrencySymbol(code: string) {
  return currencies.find((c) => c.code === code)?.symbol ?? code
}
