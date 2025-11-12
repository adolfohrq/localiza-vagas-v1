import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Trophy, Star, Target, Award, Crown } from "lucide-react"

const rewards = [
  {
    id: 1,
    title: "Curso Premium",
    description: "Acesso gratuito a um curso premium na plataforma",
    cost: 500,
    available: true,
    icon: BookOpen,
    category: "Educação",
  },
  {
    id: 2,
    title: "Mentoria Exclusiva",
    description: "Uma sessão de mentoria com um profissional experiente",
    cost: 1000,
    available: true,
    icon: Trophy,
    category: "Desenvolvimento",
  },
  {
    id: 3,
    title: "Destaque no Perfil",
    description: "Seu perfil será destacado para recrutadores por 1 semana",
    cost: 750,
    available: true,
    icon: Star,
    category: "Visibilidade",
  },
  {
    id: 4,
    title: "Certificação Profissional",
    description: "Voucher para uma certificação profissional reconhecida",
    cost: 1500,
    available: false,
    icon: Award,
    category: "Certificação",
  },
  {
    id: 5,
    title: "Evento VIP",
    description: "Acesso exclusivo a um evento de networking premium",
    cost: 1200,
    available: true,
    icon: Crown,
    category: "Networking",
  },
  {
    id: 6,
    title: "Programa de Aceleração",
    description: "Participação em um programa de aceleração de carreira",
    cost: 2000,
    available: false,
    icon: Target,
    category: "Carreira",
  },
]

export function Rewards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {rewards.map((reward) => {
        const Icon = reward.icon
        return (
          <Card key={reward.id} className={!reward.available ? "bg-muted" : ""}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Icon className="w-5 h-5" />
                <CardTitle>{reward.title}</CardTitle>
              </div>
              <CardDescription>{reward.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <Badge variant="secondary">Custo: {reward.cost} XP</Badge>
                <Badge variant="outline">{reward.category}</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={!reward.available} className="w-full">
                {reward.available ? "Resgatar Recompensa" : "Indisponível"}
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}

