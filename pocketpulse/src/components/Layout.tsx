import { NavLink, Outlet } from "react-router-dom"

const tabs = [
  { to: "/", label: "Home", end: true },
  { to: "/expenses", label: "Add Expense", end: false },
  { to: "/budget", label: "Budget", end: false },
  { to: "/insights", label: "Insights", end: false },
] as const

export default function Layout() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">PocketPulse</h1>

      <nav className="flex border-b mb-8">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) =>
              `px-4 py-2 -mb-px border-b-2 font-medium transition-colors ${
                isActive
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>

      <Outlet />
    </div>
  )
}
