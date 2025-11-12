import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Tipos para melhor type safety
type ApplicationStatus = "new" | "reviewing" | "interviewed"

interface Application {
  name: string
  position: string
  status: ApplicationStatus
  date: string
  avatar: string
}

const statusStyles: Record<ApplicationStatus, { label: string; variant: "default" | "secondary" | "success" }> = {
  new: { label: "Novo", variant: "default" },
  reviewing: { label: "Em Análise", variant: "secondary" },
  interviewed: { label: "Entrevistado", variant: "success" },
}

// Mock data - em produção isso viria de uma API ou banco de dados
const applications: Application[] = [
  {
    name: "João Silva",
    position: "Desenvolvedor Full Stack",
    status: "new",
    date: "há 2 horas",
    avatar: "/placeholder.svg",
  },
  {
    name: "Maria Santos",
    position: "UX Designer",
    status: "reviewing",
    date: "há 5 horas",
    avatar: "/placeholder.svg",
  },
  {
    name: "Pedro Costa",
    position: "Analista de Marketing",
    status: "interviewed",
    date: "há 1 dia",
    avatar: "/placeholder.svg",
  },
]

export function RecentApplications() {
  return (
    <div className="space-y-6">
      <div className="divide-y divide-border rounded-md border">
        {applications.map((application, index) => (
          <div key={index} className="flex items-center justify-between p-4 transition-colors hover:bg-muted/50">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={application.avatar} alt={`Avatar de ${application.name}`} />
                <AvatarFallback>{application.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{application.name}</p>
                <p className="text-sm text-muted-foreground">{application.position}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant={statusStyles[application.status].variant}>{statusStyles[application.status].label}</Badge>
              <span className="text-sm text-muted-foreground">{application.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

