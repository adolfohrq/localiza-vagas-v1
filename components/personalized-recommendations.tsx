import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Code, Users, Presentation, TrendingUp, Brain } from "lucide-react"

const recommendations = [
  {
    id: 1,
    title: "Curso de Liderança",
    description: "Aprimore suas habilidades de liderança com este curso online",
    type: "course",
    difficulty: "Intermediário",
    icon: Users,
    match: "95% de compatibilidade",
  },
  {
    id: 2,
    title: "Desafio de Programação",
    description: "Participe de um hackathon online para testar suas habilidades técnicas",
    type: "challenge",
    difficulty: "Avançado",
    icon: Code,
    match: "90% de compatibilidade",
  },
  {
    id: 3,
    title: "Webinar sobre Tendências de Mercado",
    description: "Assista a um webinar sobre as últimas tendências em sua área",
    type: "event",
    difficulty: "Iniciante",
    icon: Presentation,
    match: "88% de compatibilidade",
  },
  {
    id: 4,
    title: "Curso de Análise de Dados",
    description: "Aprenda a tomar decisões baseadas em dados",
    type: "course",
    difficulty: "Intermediário",
    icon: TrendingUp,
    match: "85% de compatibilidade",
  },
  {
    id: 5,
    title: "Workshop de Inovação",
    description: "Participe de um workshop sobre pensamento inovador",
    type: "event",
    difficulty: "Intermediário",
    icon: Brain,
    match: "82% de compatibilidade",
  },
  {
    id: 6,
    title: "Curso de Gestão de Projetos",
    description: "Aprenda metodologias ágeis e gestão de projetos",
    type: "course",
    difficulty: "Avançado",
    icon: BookOpen,
    match: "80% de compatibilidade",
  },
]

export function PersonalizedRecommendations() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {recommendations.map((recommendation) => {
        const Icon = recommendation.icon
        return (
          <Card key={recommendation.id}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Icon className="w-5 h-5" />
                <CardTitle>{recommendation.title}</CardTitle>
              </div>
              <CardDescription>{recommendation.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <Badge variant="secondary">{recommendation.type}</Badge>
                <Badge variant="outline">{recommendation.difficulty}</Badge>
                <Badge variant="default" className="bg-green-500">
                  {recommendation.match}
                </Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Iniciar</Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}

