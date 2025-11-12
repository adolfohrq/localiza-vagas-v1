"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const initialQuests = [
  {
    id: 1,
    title: "Atualizar Perfil",
    description: "Adicione uma nova habilidade ao seu perfil",
    xpReward: 50,
    completed: false,
  },
  {
    id: 2,
    title: "Networking Diário",
    description: "Conecte-se com um novo profissional na plataforma",
    xpReward: 30,
    completed: false,
  },
  {
    id: 3,
    title: "Aprendizado Contínuo",
    description: "Assista a um vídeo educativo na plataforma",
    xpReward: 40,
    completed: false,
  },
]

export function DailyQuests() {
  const [quests, setQuests] = useState(initialQuests)

  const completeQuest = (id: number) => {
    setQuests(quests.map((quest) => (quest.id === id ? { ...quest, completed: true } : quest)))
  }

  const completedQuests = quests.filter((quest) => quest.completed).length
  const totalQuests = quests.length
  const progress = (completedQuests / totalQuests) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Missões Diárias</CardTitle>
        <CardDescription>Complete missões diárias para ganhar XP extra!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {quests.map((quest) => (
            <Card key={quest.id}>
              <CardHeader>
                <CardTitle className="text-lg">{quest.title}</CardTitle>
                <CardDescription>{quest.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">Recompensa: {quest.xpReward} XP</Badge>
              </CardContent>
              <CardFooter>
                <Button onClick={() => completeQuest(quest.id)} disabled={quest.completed}>
                  {quest.completed ? "Concluído" : "Completar Missão"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full">
          <div className="flex justify-between mb-2">
            <span>Progresso Diário</span>
            <span>
              {completedQuests}/{totalQuests}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      </CardFooter>
    </Card>
  )
}

