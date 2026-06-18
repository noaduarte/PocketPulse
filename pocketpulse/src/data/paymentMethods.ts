export const paymentMethods = [
  "Cash",
  "Credit Card",
  "Debit Card",
  "Bank Transfer",
  "Mobile Payment",
] as const

export type PaymentMethod = (typeof paymentMethods)[number]
