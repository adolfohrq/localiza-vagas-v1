"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, UserPlus, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

export function ActivityTimeline() {
  const activities = [
    {
      type: "new_application",
      user: "João Silva",
      position: "Desenvolvedor Frontend",
      time: "há 2 horas",
      avatar: "/placeholder.svg",
      icon: UserPlus,
      iconColor: "text-green-500",
      iconBg: "bg-green-100",
    },
    {
      type: "job_view",
      user: "Maria Santos",
      position: "UX Designer",
      time: "há 3 horas",
      avatar: "/placeholder.svg",
      icon: Eye,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-100",
    },
    {
      type: "job_posted",
      position: "Analista de Marketing",
      time: "há 5 horas",
      icon: FileText,
      iconColor: "text-purple-500",
      iconBg: "bg-purple-100",
    },
  ]

  return (
    <div className="space-y-8">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-start gap-3">
          <div className={cn("mt-0.5 rounded-full p-1 flex-shrink-0", activity.iconBg)}>
            <activity.icon className={cn("h-4 w-4", activity.iconColor)} />
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <p className="text-sm font-medium leading-none break-words">
              {activity.type === "new_application" && (
                <span className="break-words">
                  <span className="font-semibold">{activity.user}</span> se candidatou para{" "}
                  <span className="break-words">{activity.position}</span>
                </span>
              )}
              {activity.type === "job_view" && (
                <span>
                  <span className="font-semibold">{activity.user}</span> visualizou a vaga de {activity.position}
                </span>
              )}
              {activity.type === "job_posted" && (
                <span>
                  Nova vaga publicada: <span className="font-semibold">{activity.position}</span>
                </span>
              )}
            </p>
            <p className="text-sm text-muted-foreground">{activity.time}</p>
          </div>
          {activity.avatar && (
            <Avatar className="h-8 w-8">
              <AvatarImage src={activity.avatar} />
              <AvatarFallback>{activity.user?.[0]}</AvatarFallback>
            </Avatar>
          )}
        </div>
      ))}
    </div>
  )
}

