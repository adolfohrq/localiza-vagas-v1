import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Milestone } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const milestones = [
  { id: 1, title: "Iniciante", description: "Alcance o nível 10", targetLevel: 10, currentLevel: 5 },
  { id: 2, title: "Intermediário", description: "Alcance o nível 25", targetLevel: 25, currentLevel: 5 },
  { id: 3, title: "Avançado", description: "Alcance o nível 50", targetLevel: 50, currentLevel: 5 },
  { id: 4, title: "Expert", description: "Alcance o nível 75", targetLevel: 75, currentLevel: 5 },
  { id: 5, title: "Mestre", description: "Alcance o nível 100", targetLevel: 100, currentLevel: 5 },
]

export function Milestones() {
  return (
    <div className="space-y-4">
      <p className="text-lg">Acompanhe seu progresso rumo a marcos importantes na sua jornada!</p>
      {milestones.map((milestone) => {
        const progress = (milestone.currentLevel / milestone.targetLevel) * 100
        return (
          <Card key={milestone.id}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Milestone className={`h-6 w-6 ${progress === 100 ? "text-green-500" : "text-blue-500"}`} />
                <CardTitle>{milestone.title}</CardTitle>
              </div>
              <CardDescription>{milestone.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Badge variant="outline">Nível Atual: {milestone.currentLevel}</Badge>
                  <Badge variant="outline">Objetivo: Nível {milestone.targetLevel}</Badge>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

