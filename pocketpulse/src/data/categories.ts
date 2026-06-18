export const OTHER_CATEGORY = "Other" as const

export const DEFAULT_CATEGORIES = [
  "Clothing",
  "Dining & Treats",
  "Education",
  "Entertainment",
  "Family",
  "Financial",
  "Gifts & Donations",
  "Groceries",
  "Healthcare",
  "Housing",
  "Insurance",
  "Personal Care",
  "Pets",
  "Transportation",
  "Travel",
  "Utilities",
  "Work",
  OTHER_CATEGORY,
] as const

/** User-defined or default spending category name. */
export type Category = string

export function isProtectedCategory(category: string) {
  return category === OTHER_CATEGORY
}

export function sortCategoriesWithOtherLast(names: string[]) {
  const unique = [...new Set(names.map((name) => name.trim()).filter(Boolean))]

  return [
    ...unique.filter((name) => name !== OTHER_CATEGORY),
    ...(unique.includes(OTHER_CATEGORY) ? [OTHER_CATEGORY] : []),
  ]
}
