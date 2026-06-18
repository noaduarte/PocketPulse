import type { ReactNode } from "react"

interface ChartPanelProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export default function ChartPanel({
  title,
  description,
  children,
  className = "",
}: ChartPanelProps) {
  return (
    <div className={`flex h-full w-full flex-col ${className}`}>
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 sm:text-2xl lg:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-300 sm:text-base lg:text-lg">
            {description}
          </p>
        )}
      </div>
      <div className="min-h-0 w-full flex-1">{children}</div>
    </div>
  )
}
