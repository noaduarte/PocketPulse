interface DashboardCardProps {
    title: string
    value: string | number
  }
  
  export default function DashboardCard({
    title,
    value,
  }: DashboardCardProps) {
    return (
      <div className="border rounded-xl p-6 shadow-sm">
        <h3 className="text-sm text-gray-500">
          {title}
        </h3>
  
        <p className="text-3xl font-bold">
          {value}
        </p>
      </div>
    )
  }