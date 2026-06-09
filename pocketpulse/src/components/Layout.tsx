import { NavLink, Outlet } from "react-router-dom"

const tabs = [
  { to: "/", label: "Home", end: true },
  { to: "/expenses", label: "Add Expense", end: false },
  { to: "/your-expenses", label: "Your Expenses", end: false },
  { to: "/budget", label: "Budget", end: false },
  { to: "/insights", label: "Insights", end: false },
] as const

export default function Layout() {
  return (
    <div className="min-h-screen w-full px-5 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12 xl:px-20">
      <header className="mb-10 sm:mb-12">
        <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl xl:text-8xl">
          PocketPulse
        </h1>

        <nav className="mt-8 flex flex-wrap gap-3 sm:gap-4">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `rounded-xl px-6 py-3 text-lg font-semibold transition-colors sm:px-8 sm:py-4 sm:text-xl lg:text-2xl ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                    : "bg-white text-slate-600 shadow-sm hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="w-full">
        <Outlet />
      </main>
    </div>
  )
}
