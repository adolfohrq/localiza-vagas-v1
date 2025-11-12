"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const skillCategories = [
  { id: 1, name: "Habilidades Técnicas", progress: 0 },
  { id: 2, name: "Soft Skills", progress: 0 },
  { id: 3, name: "Liderança", progress: 0 },
  { id: 4, name: "Gestão de Projetos", progress: 0 },
]

export function SkillAssessment() {
  const [categories, setCategories] = useState(skillCategories)

  const startAssessment = (id: number) => {
    // Simulating an assessment. In a real app, this would lead to a series of questions or tasks.
    const newProgress = Math.floor(Math.random() * 100) + 1
    setCategories(
      categories.map((category) => (category.id === id ? { ...category, progress: newProgress } : category)),
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-lg">
        Avalie suas habilidades para receber recomendações personalizadas e identificar áreas de melhoria.
      </p>
      {categories.map((category) => (
        <Card key={category.id}>
          <CardHeader>
            <CardTitle>{category.name}</CardTitle>
            <CardDescription>Avalie suas habilidades em {category.name.toLowerCase()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Progress value={category.progress} className="w-full" />
              <Badge variant="secondary">{category.progress}%</Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => startAssessment(category.id)}>
              {category.progress > 0 ? "Refazer Avaliação" : "Iniciar Avaliação"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

