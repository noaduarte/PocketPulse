import dayjs from "dayjs"

import type { Category } from "../data/categories"
import type { BudgetGoal } from "../types/BudgetGoal"
import type { ExpenseEntry } from "../types/ExpenseEntry"
import { getAllBudgetStatuses } from "./budgetCalculations"
import { formatCurrency } from "./formatCurrency"

export type InsightSeverity = "info" | "warning" | "success" | "alert"

export interface Insight {
  id: string
  type: string
  message: string
  severity: InsightSeverity
}

const FOOD_CATEGORIES: Category[] = [
  "Groceries",
  "Dining & Treats",
]

function inDateRange(
  expense: ExpenseEntry,
  start: dayjs.Dayjs,
  end: dayjs.Dayjs
) {
  const date = dayjs(expense.date)
  return (
    !date.isBefore(start, "day") &&
    !date.isAfter(end, "day")
  )
}

function sumExpenses(
  expenses: ExpenseEntry[],
  options?: {
    start?: dayjs.Dayjs
    end?: dayjs.Dayjs
    categories?: Category[]
  }
) {
  return expenses
    .filter((expense) => {
      if (
        options?.start &&
        options?.end &&
        !inDateRange(expense, options.start, options.end)
      ) {
        return false
      }

      if (
        options?.categories &&
        !options.categories.includes(expense.category)
      ) {
        return false
      }

      return true
    })
    .reduce((sum, expense) => sum + expense.amount, 0)
}

function countExpenses(
  expenses: ExpenseEntry[],
  options?: {
    start?: dayjs.Dayjs
    end?: dayjs.Dayjs
    weekendOnly?: boolean
    weekdayOnly?: boolean
  }
) {
  return expenses.filter((expense) => {
    if (
      options?.start &&
      options?.end &&
      !inDateRange(expense, options.start, options.end)
    ) {
      return false
    }

    const day = dayjs(expense.date).day()
    const isWeekend = day === 0 || day === 6

    if (options?.weekendOnly && !isWeekend) return false
    if (options?.weekdayOnly && isWeekend) return false

    return true
  }).length
}

function getCategoryTotals(expenses: ExpenseEntry[]) {
  const totals: Partial<Record<Category, number>> = {}

  expenses.forEach((expense) => {
    totals[expense.category] =
      (totals[expense.category] ?? 0) + expense.amount
  })

  return totals
}

function getTopCategoryEntry(expenses: ExpenseEntry[]) {
  const totals = getCategoryTotals(expenses)
  const entries = Object.entries(totals) as [Category, number][]

  if (entries.length === 0) return null

  return entries.sort((a, b) => b[1] - a[1])[0]
}

function formatEuro(amount: number) {
  return formatCurrency(amount)
}

function pushInsight(
  insights: Insight[],
  type: string,
  message: string,
  severity: InsightSeverity
) {
  insights.push({
    id: type,
    type,
    message,
    severity,
  })
}

export function generateInsights(
  expenses: ExpenseEntry[],
  goals: BudgetGoal[]
): Insight[] {
  if (expenses.length === 0) {
    return [
      {
        id: "no-data",
        type: "no-data",
        message:
          "Add some expenses to unlock personalized spending insights.",
        severity: "info",
      },
    ]
  }

  const insights: Insight[] = []
  const now = dayjs()

  const thisWeekStart = now.startOf("week")
  const thisWeekEnd = now.endOf("week")
  const lastWeekStart = thisWeekStart.subtract(1, "week")
  const lastWeekEnd = thisWeekStart.subtract(1, "day")

  const thisMonthStart = now.startOf("month")
  const thisMonthEnd = now.endOf("month")
  const lastMonthStart = now.subtract(1, "month").startOf("month")
  const lastMonthEnd = now.subtract(1, "month").endOf("month")

  const last7DaysStart = now.subtract(6, "day")
  const previous7DaysStart = now.subtract(13, "day")
  const previous7DaysEnd = now.subtract(7, "day")

  // Food week-over-week
  const foodThisWeek = sumExpenses(expenses, {
    start: thisWeekStart,
    end: thisWeekEnd,
    categories: FOOD_CATEGORIES,
  })
  const foodLastWeek = sumExpenses(expenses, {
    start: lastWeekStart,
    end: lastWeekEnd,
    categories: FOOD_CATEGORIES,
  })

  if (foodThisWeek > foodLastWeek && foodLastWeek > 0) {
    pushInsight(
      insights,
      "food-week-up",
      `Food spending increased compared to last week (${formatEuro(foodLastWeek)} → ${formatEuro(foodThisWeek)}).`,
      "warning"
    )
  } else if (
    foodThisWeek < foodLastWeek &&
    foodThisWeek > 0 &&
    foodLastWeek > 0
  ) {
    pushInsight(
      insights,
      "food-week-down",
      `Food spending decreased compared to last week. You saved ${formatEuro(foodLastWeek - foodThisWeek)}.`,
      "success"
    )
  } else if (foodThisWeek > 0 && foodLastWeek === 0) {
    pushInsight(
      insights,
      "food-week-new",
      `You spent ${formatEuro(foodThisWeek)} on food this week with no food spending last week.`,
      "info"
    )
  }

  // Weekend vs weekday
  const weekendCount = countExpenses(expenses, { weekendOnly: true })
  const weekdayCount = countExpenses(expenses, { weekdayOnly: true })

  if (weekendCount > weekdayCount && weekendCount > 0) {
    pushInsight(
      insights,
      "weekend-purchases",
      "Most purchases occur on weekends.",
      "info"
    )
  } else if (weekdayCount > weekendCount * 1.5 && weekdayCount > 2) {
    pushInsight(
      insights,
      "weekday-purchases",
      "You make most of your purchases on weekdays.",
      "info"
    )
  }

  const weekendSpending = sumExpenses(expenses, {
    start: thisMonthStart,
    end: thisMonthEnd,
  })
  const weekendMonthSpending = expenses
    .filter((expense) => {
      const day = dayjs(expense.date).day()
      return (
        (day === 0 || day === 6) &&
        inDateRange(expense, thisMonthStart, thisMonthEnd)
      )
    })
    .reduce((sum, e) => sum + e.amount, 0)

  const weekdayMonthSpending = weekendSpending - weekendMonthSpending

  if (
    weekendMonthSpending > weekdayMonthSpending / 2 &&
    weekendMonthSpending > 0
  ) {
    pushInsight(
      insights,
      "weekend-spending-heavy",
      `Weekend spending accounts for ${formatEuro(weekendMonthSpending)} this month — watch for leisure-driven splurges.`,
      "warning"
    )
  }

  // Top category
  const topCategory = getTopCategoryEntry(expenses)
  if (topCategory) {
    const [category, amount] = topCategory
    const total = sumExpenses(expenses)
    const share = total > 0 ? (amount / total) * 100 : 0

    pushInsight(
      insights,
      "top-category",
      `${category} is your largest spending category (${formatEuro(amount)}, ${share.toFixed(0)}% of total).`,
      "info"
    )

    if (share > 50) {
      pushInsight(
        insights,
        "category-concentration",
        `Over half of your spending (${share.toFixed(0)}%) goes to ${category}. Consider diversifying.`,
        "warning"
      )
    }
  }

  // Budget insights
  const budgetStatuses = getAllBudgetStatuses(expenses, goals)

  budgetStatuses.forEach((status) => {
    const { goal, spent, remaining, percentUsed, isOverBudget } =
      status

    if (isOverBudget) {
      pushInsight(
        insights,
        `budget-over-${goal.category}`,
        `You have exceeded your ${goal.category} budget by ${formatEuro(Math.abs(remaining))}.`,
        "alert"
      )
    } else if (percentUsed >= 80) {
      pushInsight(
        insights,
        `budget-close-${goal.category}`,
        `You are close to exceeding your ${goal.category} budget (${percentUsed.toFixed(0)}% used, ${formatEuro(remaining)} left).`,
        "warning"
      )
    } else if (percentUsed >= 50 && percentUsed < 80) {
      pushInsight(
        insights,
        `budget-half-${goal.category}`,
        `You've used ${percentUsed.toFixed(0)}% of your ${goal.category} budget this month.`,
        "info"
      )
    } else if (percentUsed < 30 && spent > 0) {
      pushInsight(
        insights,
        `budget-room-${goal.category}`,
        `You're well within your ${goal.category} budget — ${formatEuro(remaining)} still available.`,
        "success"
      )
    }
  })

  if (topCategory && goals.length > 0) {
    const hasBudgetForTop = goals.some(
      (g) => g.category === topCategory[0]
    )
    if (!hasBudgetForTop) {
      pushInsight(
        insights,
        "no-budget-top-category",
        `Your top category (${topCategory[0]}) has no budget goal set.`,
        "info"
      )
    }
  }

  // Month over month
  const thisMonthTotal = sumExpenses(expenses, {
    start: thisMonthStart,
    end: thisMonthEnd,
  })
  const lastMonthTotal = sumExpenses(expenses, {
    start: lastMonthStart,
    end: lastMonthEnd,
  })

  if (thisMonthTotal > lastMonthTotal && lastMonthTotal > 0) {
    pushInsight(
      insights,
      "month-up",
      `Monthly spending is up ${formatEuro(thisMonthTotal - lastMonthTotal)} compared to last month.`,
      "warning"
    )
  } else if (
    thisMonthTotal < lastMonthTotal &&
    thisMonthTotal > 0
  ) {
    pushInsight(
      insights,
      "month-down",
      `Monthly spending dropped by ${formatEuro(lastMonthTotal - thisMonthTotal)} compared to last month.`,
      "success"
    )
  }

  // Rolling 7-day comparison
  const last7Total = sumExpenses(expenses, {
    start: last7DaysStart,
    end: now,
  })
  const prev7Total = sumExpenses(expenses, {
    start: previous7DaysStart,
    end: previous7DaysEnd,
  })

  if (last7Total > prev7Total * 1.25 && prev7Total > 0) {
    pushInsight(
      insights,
      "week-spike",
      `Spending jumped ${(((last7Total - prev7Total) / prev7Total) * 100).toFixed(0)}% in the last 7 days.`,
      "warning"
    )
  } else if (last7Total < prev7Total * 0.75 && last7Total > 0) {
    pushInsight(
      insights,
      "week-drop",
      `You spent ${formatEuro(prev7Total - last7Total)} less in the last 7 days than the week before.`,
      "success"
    )
  }

  // Average transaction
  const average =
    expenses.reduce((s, e) => s + e.amount, 0) / expenses.length
  const largePurchases = expenses.filter(
    (e) => e.amount > average * 2
  )

  if (average > 50) {
    pushInsight(
      insights,
      "high-average",
      `Your average expense is ${formatEuro(average)} — higher than typical daily purchases.`,
      "info"
    )
  }

  if (largePurchases.length > 0) {
    const biggest = [...largePurchases].sort(
      (a, b) => b.amount - a.amount
    )[0]
    pushInsight(
      insights,
      "large-purchase",
      `Your largest purchase was ${formatEuro(biggest.amount)} on ${biggest.category} (${dayjs(biggest.date).format("MMM D")}).`,
      "info"
    )
  }

  // Frequent small purchases
  const smallPurchases = expenses.filter((e) => e.amount < 15)
  if (smallPurchases.length >= 5) {
    pushInsight(
      insights,
      "small-frequent",
      `${smallPurchases.length} small purchases under €15 detected — they add up to ${formatEuro(sumExpenses(smallPurchases))}.`,
      "warning"
    )
  }

  // Busiest day of week
  const dayTotals = [0, 0, 0, 0, 0, 0, 0]
  const dayCounts = [0, 0, 0, 0, 0, 0, 0]

  expenses.forEach((expense) => {
    const day = dayjs(expense.date).day()
    dayTotals[day] += expense.amount
    dayCounts[day] += 1
  })

  const busiestDayIndex = dayCounts.indexOf(
    Math.max(...dayCounts)
  )
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]

  if (dayCounts[busiestDayIndex] >= 2) {
    pushInsight(
      insights,
      "busiest-day",
      `Most purchases happen on ${dayNames[busiestDayIndex]}s (${dayCounts[busiestDayIndex]} transactions).`,
      "info"
    )
  }

  const highestSpendDayIndex = dayTotals.indexOf(
    Math.max(...dayTotals)
  )
  if (
    dayTotals[highestSpendDayIndex] > 0 &&
    highestSpendDayIndex !== busiestDayIndex
  ) {
    pushInsight(
      insights,
      "highest-spend-day",
      `${dayNames[highestSpendDayIndex]} is when you spend the most money (${formatEuro(dayTotals[highestSpendDayIndex])}).`,
      "info"
    )
  }

  // Category-specific week comparisons
  const watchList: Category[] = [
    "Entertainment",
    "Transportation",
    "Dining & Treats",
    "Clothing",
    "Groceries",
  ]

  watchList.forEach((category) => {
    const thisWeek = sumExpenses(expenses, {
      start: thisWeekStart,
      end: thisWeekEnd,
      categories: [category],
    })
    const lastWeek = sumExpenses(expenses, {
      start: lastWeekStart,
      end: lastWeekEnd,
      categories: [category],
    })

    if (thisWeek > lastWeek * 1.5 && thisWeek > 20 && lastWeek > 0) {
      pushInsight(
        insights,
        `${category}-spike`,
        `${category} spending surged this week (${formatEuro(lastWeek)} → ${formatEuro(thisWeek)}).`,
        "warning"
      )
    }
  })

  // Dining vs groceries balance
  const diningTotal = sumExpenses(expenses, {
    categories: ["Dining & Treats"],
  })
  const groceriesTotal = sumExpenses(expenses, {
    categories: ["Groceries"],
  })

  if (diningTotal > groceriesTotal && diningTotal > 0) {
    pushInsight(
      insights,
      "dining-over-groceries",
      `You spend more on dining out (${formatEuro(diningTotal)}) than groceries (${formatEuro(groceriesTotal)}).`,
      "warning"
    )
  } else if (
    groceriesTotal > diningTotal * 2 &&
    groceriesTotal > 0
  ) {
    pushInsight(
      insights,
      "groceries-focused",
      "You prioritize groceries over dining out — a budget-friendly habit.",
      "success"
    )
  }

  // Transaction frequency this week
  const thisWeekCount = countExpenses(expenses, {
    start: thisWeekStart,
    end: thisWeekEnd,
  })

  if (thisWeekCount >= 7) {
    pushInsight(
      insights,
      "high-frequency",
      `${thisWeekCount} transactions this week — frequent spending can erode your budget quickly.`,
      "warning"
    )
  } else if (thisWeekCount === 0) {
    pushInsight(
      insights,
      "no-spending-week",
      "No expenses recorded this week yet.",
      "info"
    )
  }

  // Month pacing
  const daysInMonth = now.daysInMonth()
  const dayOfMonth = now.date()
  const expectedPace =
    (dayOfMonth / daysInMonth) * 100
  const monthBudgetTotal = goals.reduce(
    (s, g) => s + g.monthlyLimit,
    0
  )
  const monthSpentOnBudgeted = budgetStatuses.reduce(
    (s, b) => s + b.spent,
    0
  )

  if (monthBudgetTotal > 0) {
    const budgetPercentUsed =
      (monthSpentOnBudgeted / monthBudgetTotal) * 100

    if (budgetPercentUsed > expectedPace + 15) {
      pushInsight(
        insights,
        "ahead-of-pace",
        `You're spending ahead of schedule — ${budgetPercentUsed.toFixed(0)}% of combined budgets used with ${daysInMonth - dayOfMonth} days left.`,
        "warning"
      )
    } else if (
      budgetPercentUsed < expectedPace - 15 &&
      monthSpentOnBudgeted > 0
    ) {
      pushInsight(
        insights,
        "on-track-pace",
        "Your spending pace is on track for your monthly budgets.",
        "success"
      )
    }
  }

  // Unused categories
  const usedCategories = new Set(
    expenses.map((e) => e.category)
  )
  if (usedCategories.size === 1) {
    pushInsight(
      insights,
      "single-category",
      "All your expenses are in one category — try tracking more areas for better insights.",
      "info"
    )
  }

  // Recent inactivity
  const sortedByDate = [...expenses].sort(
    (a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf()
  )
  const daysSinceLast = now.diff(
    dayjs(sortedByDate[0].date),
    "day"
  )

  if (daysSinceLast >= 7) {
    pushInsight(
      insights,
      "inactive",
      `No new expenses in ${daysSinceLast} days — your last purchase was on ${dayjs(sortedByDate[0].date).format("MMM D")}.`,
      "info"
    )
  }

  // Payment method diversity
  const paymentMethods = new Set(
    expenses.map((e) => e.paymentMethod)
  )
  if (paymentMethods.size === 1) {
    pushInsight(
      insights,
      "single-payment",
      `All expenses use ${expenses[0].paymentMethod}.`,
      "info"
    )
  }

  // Goals without spending
  goals.forEach((goal) => {
    const spent = sumExpenses(expenses, {
      start: thisMonthStart,
      end: thisMonthEnd,
      categories: [goal.category],
    })

    if (spent === 0) {
      pushInsight(
        insights,
        `unused-budget-${goal.category}`,
        `You have a ${goal.category} budget of ${formatEuro(goal.monthlyLimit)} but no spending in that category this month.`,
        "success"
      )
    }
  })

  return insights
}
