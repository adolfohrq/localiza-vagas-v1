"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Target, Code, Book, Users, Brain } from "lucide-react"

const initialChallenges = [
  {
    id: 1,
    title: "Comunicação Efetiva",
    description: "Complete um curso online sobre comunicação empresarial",
    xpReward: 100,
    completed: false,
    icon: Users,
    deadline: "3 dias restantes",
  },
  {
    id: 2,
    title: "Networking Profissional",
    description: "Participe de um evento de networking e faça 3 novas conexões",
    xpReward: 150,
    completed: false,
    icon: Target,
    deadline: "5 dias restantes",
  },
  {
    id: 3,
    title: "Habilidades Técnicas",
    description: "Aprenda uma nova linguagem de programação e crie um projeto",
    xpReward: 200,
    completed: false,
    icon: Code,
    deadline: "7 dias restantes",
  },
  {
    id: 4,
    title: "Liderança",
    description: "Complete o curso de liderança e gestão de equipes",
    xpReward: 250,
    completed: false,
    icon: Trophy,
    deadline: "10 dias restantes",
  },
  {
    id: 5,
    title: "Desenvolvimento Pessoal",
    description: "Leia um livro recomendado e compartilhe seus insights",
    xpReward: 120,
    completed: false,
    icon: Book,
    deadline: "14 dias restantes",
  },
  {
    id: 6,
    title: "Inovação",
    description: "Proponha uma solução inovadora para um problema do seu setor",
    xpReward: 180,
    completed: false,
    icon: Brain,
    deadline: "20 dias restantes",
  },
]

export function Challenges() {
  const [challenges, setChallenges] = useState(initialChallenges)

  const completeChallenge = (id: number) => {
    setChallenges(challenges.map((challenge) => (challenge.id === id ? { ...challenge, completed: true } : challenge)))
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {challenges.map((challenge) => {
        const Icon = challenge.icon
        return (
          <Card key={challenge.id} className={challenge.completed ? "bg-muted" : ""}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Icon className="w-5 h-5" />
                <CardTitle>{challenge.title}</CardTitle>
              </div>
              <CardDescription>{challenge.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <Badge variant="secondary">Recompensa: {challenge.xpReward} XP</Badge>
                <Badge variant="outline">{challenge.deadline}</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => completeChallenge(challenge.id)} disabled={challenge.completed} className="w-full">
                {challenge.completed ? "Concluído" : "Completar Desafio"}
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}

