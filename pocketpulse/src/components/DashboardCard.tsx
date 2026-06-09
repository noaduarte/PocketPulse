interface DashboardCardProps {
  title: string
  value: string | number
  subtitle?: string
  variant?: "default" | "hero" | "compact"
  accent?: "blue" | "green" | "amber" | "violet" | "rose" | "slate"
}

const accentStyles = {
  blue: "from-blue-500/10 to-blue-600/5 text-blue-600",
  green: "from-emerald-500/10 to-emerald-600/5 text-emerald-600",
  amber: "from-amber-500/10 to-amber-600/5 text-amber-600",
  violet: "from-violet-500/10 to-violet-600/5 text-violet-600",
  rose: "from-rose-500/10 to-rose-600/5 text-rose-600",
  slate: "from-slate-500/10 to-slate-600/5 text-slate-600",
}

export default function DashboardCard({
  title,
  value,
  subtitle,
  variant = "default",
  accent = "blue",
}: DashboardCardProps) {
  if (variant === "hero") {
    return (
      <div className="relative flex h-full w-full flex-col justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 px-6 py-8 text-white shadow-lg shadow-indigo-500/20 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-white/5 blur-xl" />

        <p className="text-xl font-semibold text-indigo-100 sm:text-2xl lg:text-3xl">
          {title}
        </p>
        <p className="mt-4 text-6xl font-bold leading-none tracking-tight sm:mt-5 sm:text-7xl lg:mt-6 lg:text-8xl xl:text-9xl">
          {value}
        </p>
        {subtitle && (
          <p className="mt-4 text-lg text-indigo-200 sm:mt-5 sm:text-xl lg:text-2xl">
            {subtitle}
          </p>
        )}
      </div>
    )
  }

  if (variant === "compact") {
    return (
      <div
        className={`rounded-xl bg-gradient-to-br px-4 py-3 ${accentStyles[accent]}`}
      >
        <p className="text-xs font-medium uppercase tracking-wide opacity-70">
          {title}
        </p>
        <p className="mt-0.5 text-lg font-bold text-slate-900">{value}</p>
      </div>
    )
  }

  return (
    <div
      className={`flex h-full min-h-[120px] flex-col justify-center rounded-3xl bg-gradient-to-br p-6 sm:min-h-[140px] sm:p-8 lg:min-h-[150px] ${accentStyles[accent]}`}
    >
      <p className="text-base font-medium opacity-80 sm:text-lg">
        {title}
      </p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
        {value}
      </p>
      {subtitle && (
        <p className="mt-1 text-sm opacity-60">{subtitle}</p>
      )}
    </div>
  )
}
