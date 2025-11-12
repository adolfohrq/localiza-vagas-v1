import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy } from "lucide-react"

const achievements = [
  { id: 1, title: "Primeiro Passo", description: "Complete seu perfil", completed: true },
  { id: 2, title: "Rede em Crescimento", description: "Faça 50 conexões", completed: true },
  { id: 3, title: "Aprendiz Dedicado", description: "Complete 10 cursos", completed: false },
  { id: 4, title: "Mentor Iniciante", description: "Ajude 5 outros usuários", completed: false },
  { id: 5, title: "Especialista Reconhecido", description: "Receba 100 recomendações", completed: false },
]

export function Achievements() {
  return (
    <div className="space-y-4">
      <p className="text-lg">Desbloqueie conquistas para mostrar seu progresso e dedicação!</p>
      {achievements.map((achievement) => (
        <Card key={achievement.id} className={achievement.completed ? "bg-green-50" : ""}>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Trophy className={`h-6 w-6 ${achievement.completed ? "text-yellow-500" : "text-gray-400"}`} />
              <CardTitle>{achievement.title}</CardTitle>
            </div>
            <CardDescription>{achievement.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant={achievement.completed ? "default" : "outline"}>
              {achievement.completed ? "Concluído" : "Em Progresso"}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

