import { Users, FileText, Eye, UserCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardStats() {
  const stats = [
    {
      title: "Total de Vagas",
      value: "12",
      change: "+2",
      icon: FileText,
      trend: "up",
    },
    {
      title: "Candidaturas",
      value: "48",
      change: "+12",
      icon: Users,
      trend: "up",
    },
    {
      title: "Visualizações",
      value: "1,429",
      change: "+24%",
      icon: Eye,
      trend: "up",
    },
    {
      title: "Contratações",
      value: "8",
      change: "+1",
      icon: UserCheck,
      trend: "up",
    },
  ]

  return (
    <>
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>{stat.change}</span> desde o
                último mês
              </p>
            </CardContent>
          </Card>
        )
      })}
    </>
  )
}

