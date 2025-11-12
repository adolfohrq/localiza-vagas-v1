import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function RecentActivities() {
  const activities = [
    {
      user: "João Silva",
      action: "se cadastrou na plataforma",
      time: "há 5 minutos",
      type: "new_user",
    },
    {
      user: "Tech Solutions",
      action: "publicou uma nova vaga",
      time: "há 15 minutos",
      type: "new_job",
    },
    {
      user: "Maria Santos",
      action: "atualizou seu perfil",
      time: "há 30 minutos",
      type: "profile_update",
    },
    {
      user: "Inovação Ltda.",
      action: "foi aprovada como empresa",
      time: "há 1 hora",
      type: "company_approved",
    },
    {
      user: "Carlos Ferreira",
      action: "se candidatou a uma vaga",
      time: "há 2 horas",
      type: "job_application",
    },
  ]

  return (
    <div className="space-y-8">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/avatars/${index + 1}.png`} alt={activity.user} />
            <AvatarFallback>{activity.user[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {activity.user} <span className="text-muted-foreground">{activity.action}</span>
            </p>
            <p className="text-sm text-muted-foreground">{activity.time}</p>
          </div>
          <Badge
            variant={
              activity.type === "new_user" || activity.type === "new_job"
                ? "default"
                : activity.type === "profile_update"
                  ? "secondary"
                  : activity.type === "company_approved"
                    ? "success"
                    : "outline"
            }
            className="ml-auto"
          >
            {activity.type.replace("_", " ")}
          </Badge>
        </div>
      ))}
    </div>
  )
}

