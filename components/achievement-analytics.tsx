import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const skillCategories = [
  { name: "Soft Skills", progress: 75 },
  { name: "Technical Skills", progress: 60 },
  { name: "Leadership Skills", progress: 40 },
  { name: "Industry Knowledge", progress: 80 },
]

export function AchievementAnalytics() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Progresso por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          {skillCategories.map((category, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{category.name}</span>
                <span className="text-sm font-medium">{category.progress}%</span>
              </div>
              <Progress value={category.progress} className="w-full" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Estatísticas Gerais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Total de Selos</p>
              <p className="text-2xl font-bold">15</p>
            </div>
            <div>
              <p className="text-sm font-medium">Selos Conquistados</p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <div>
              <p className="text-sm font-medium">Nível Atual</p>
              <p className="text-2xl font-bold">5</p>
            </div>
            <div>
              <p className="text-sm font-medium">Posição no Ranking</p>
              <p className="text-2xl font-bold">#42</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

