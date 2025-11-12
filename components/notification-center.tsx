"use client"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

export function NotificationCenter() {
  const notifications = [
    {
      title: "Nova candidatura recebida",
      description: "João Silva se candidatou para Desenvolvedor Full Stack",
      time: "há 2h",
      type: "new",
    },
    {
      title: "Lembrete de entrevista",
      description: "Entrevista agendada com Maria Santos às 14h",
      time: "há 5h",
      type: "reminder",
    },
    {
      title: "Vaga próxima do encerramento",
      description: "A vaga de UX Designer encerra em 2 dias",
      time: "há 1d",
      type: "warning",
    },
    {
      title: "Novo candidato recomendado",
      description: "Carlos Oliveira corresponde ao perfil de Analista de Dados",
      time: "há 3h",
      type: "new",
    },
    {
      title: "Feedback pendente",
      description: "Avalie a entrevista com Ana Rodrigues",
      time: "há 1d",
      type: "reminder",
    },
  ]

  return (
    <ScrollArea className="h-[300px] w-full pr-4">
      <div className="space-y-2">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="flex items-start gap-2 rounded-md border p-2 text-sm transition-shadow hover:shadow-sm"
          >
            <Badge
              variant={
                notification.type === "new" ? "default" : notification.type === "warning" ? "destructive" : "secondary"
              }
              className="mt-0.5 h-5 w-5 rounded-full p-0"
            />
            <div className="flex-1 space-y-1">
              <p className="font-medium leading-none">{notification.title}</p>
              <p className="text-xs text-muted-foreground">{notification.description}</p>
              <p className="text-xs text-muted-foreground">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

