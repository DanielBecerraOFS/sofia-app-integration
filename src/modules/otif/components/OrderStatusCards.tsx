
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/index"

export function OrderStatusCards() {
  const statuses = [
    { title: "Open Orders", value: "498", color: "text-yellow-500" },
    { title: "Overdue Orders", value: "169", color: "text-red-500" },
    { title: "Blocked Orders", value: "7", color: "text-orange-500" },
    { title: "Incomplete Orders", value: "63", color: "text-blue-500" },
    { title: "Orders With Tasks", value: "224", color: "text-green-500" },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-5">
      {statuses.map((status) => (
        <Card key={status.title} className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{status.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${status.color}`}>{status.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
