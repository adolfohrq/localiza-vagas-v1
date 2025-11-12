import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Trophy, Target, ArrowUp, Clock, Zap } from "lucide-react"

interface AchievementOverviewProps {
  level: number
  xp: number
  maxXp: number
}

export function AchievementOverview({ level, xp, maxXp }: AchievementOverviewProps) {
  const recentAchievements = [
    {
      title: "Comunicador Eficaz",
      date: "Hoje",
      xp: 100,
      type: "badge",
    },
    {
      title: "Completou 5 cursos",
      date: "Ontem",
      xp: 250,
      type: "milestone",
    },
    {
      title: "Primeira Mentoria",
      date: "3 dias atrás",
      xp: 150,
      type: "achievement",
    },
  ]

  const nextGoals = [
    {
      title: "Especialista em Liderança",
      progress: 75,
      remaining: "2 desafios restantes",
    },
    {
      title: "Mestre em Comunicação",
      progress: 60,
      remaining: "1 curso restante",
    },
    {
      title: "Networking Pro",
      progress: 40,
      remaining: "3 conexões restantes",
    },
  ]

  const skillHighlights = [
    { name: "Comunicação", level: "Avançado", strength: 85 },
    { name: "Liderança", level: "Intermediário", strength: 65 },
    { name: "Trabalho em Equipe", level: "Expert", strength: 90 },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Resumo da Jornada
          </CardTitle>
          <CardDescription>Você está entre os 20% melhores em progresso esta semana!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">30 dias de atividade</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">15 conquistas</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">7 metas alcançadas</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Nível 5 alcançado</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Conquistas Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAchievements.map((achievement, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{achievement.title}</p>
                  <p className="text-sm text-muted-foreground">{achievement.date}</p>
                </div>
                <Badge variant="secondary">+{achievement.xp} XP</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Próximas Metas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {nextGoals.map((goal, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{goal.title}</span>
                  <span className="text-sm text-muted-foreground">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">{goal.remaining}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Destaques de Habilidades
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {skillHighlights.map((skill, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-medium">{skill.name}</h4>
                <Progress value={skill.strength} className="h-2" />
                <p className="text-sm text-muted-foreground">Nível: {skill.level}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

