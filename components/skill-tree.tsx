"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  MessageSquare,
  Brain,
  Users,
  Target,
  Code,
  LineChart,
  Lightbulb,
  Award,
  Lock,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Skill {
  id: string
  name: string
  description: string
  category: string
  level: number
  maxLevel: number
  progress: number
  icon: any
  unlocked: boolean
  prerequisites: string[]
  benefits: string[]
  xpReward: number
  position: {
    row: number
    column: number
  }
}

const initialSkills: Skill[] = [
  {
    id: "soft_communication",
    name: "Comunicação Efetiva",
    description: "Habilidades de comunicação verbal e escrita",
    category: "Soft Skills",
    level: 2,
    maxLevel: 5,
    progress: 65,
    icon: MessageSquare,
    unlocked: true,
    prerequisites: [],
    position: { row: 0, column: 0 },
    benefits: ["Melhor expressão de ideias", "Comunicação clara em reuniões", "Habilidade de apresentação"],
    xpReward: 500,
  },
  {
    id: "soft_leadership",
    name: "Liderança",
    description: "Capacidade de liderar equipes",
    category: "Soft Skills",
    level: 1,
    maxLevel: 5,
    progress: 30,
    icon: Users,
    unlocked: false,
    prerequisites: ["soft_communication"],
    position: { row: 1, column: 0 },
    benefits: ["Gestão de equipes", "Tomada de decisão", "Motivação de equipe"],
    xpReward: 750,
  },
  {
    id: "soft_negotiation",
    name: "Negociação",
    description: "Habilidades de negociação e persuasão",
    category: "Soft Skills",
    level: 1,
    maxLevel: 5,
    progress: 45,
    icon: Target,
    unlocked: false,
    prerequisites: ["soft_communication"],
    position: { row: 1, column: 1 },
    benefits: ["Técnicas de persuasão", "Resolução de conflitos", "Negociação win-win"],
    xpReward: 600,
  },
  {
    id: "soft_strategy",
    name: "Pensamento Estratégico",
    description: "Pensamento e planejamento estratégico",
    category: "Soft Skills",
    level: 0,
    maxLevel: 5,
    progress: 0,
    icon: Brain,
    unlocked: false,
    prerequisites: ["soft_leadership", "soft_negotiation"],
    position: { row: 2, column: 0 },
    benefits: ["Visão de longo prazo", "Planejamento estratégico", "Análise de cenários"],
    xpReward: 1000,
  },
  {
    id: "tech_programming",
    name: "Programação",
    description: "Habilidades fundamentais de programação",
    category: "Technical Skills",
    level: 3,
    maxLevel: 5,
    progress: 80,
    icon: Code,
    unlocked: true,
    prerequisites: [],
    position: { row: 0, column: 0 },
    benefits: ["Lógica de programação", "Resolução de problemas", "Desenvolvimento de software"],
    xpReward: 800,
  },
  {
    id: "tech_data_analysis",
    name: "Análise de Dados",
    description: "Análise e interpretação de dados",
    category: "Technical Skills",
    level: 1,
    maxLevel: 5,
    progress: 25,
    icon: LineChart,
    unlocked: false,
    prerequisites: ["tech_programming"],
    position: { row: 1, column: 0 },
    benefits: ["Interpretação de dados", "Visualização de dados", "Tomada de decisão baseada em dados"],
    xpReward: 850,
  },
  {
    id: "tech_innovation",
    name: "Inovação Tecnológica",
    description: "Inovação e soluções tecnológicas",
    category: "Technical Skills",
    level: 0,
    maxLevel: 5,
    progress: 0,
    icon: Lightbulb,
    unlocked: false,
    prerequisites: ["tech_data_analysis"],
    position: { row: 2, column: 0 },
    benefits: ["Pensamento inovador", "Criação de soluções", "Transformação digital"],
    xpReward: 1200,
  },
]

export function SkillTree() {
  const [skills, setSkills] = useState<Skill[]>(initialSkills)
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setSelectedSkill(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const canUnlockSkill = (skill: Skill): boolean => {
    if (skill.unlocked) return false
    return skill.prerequisites.every((prereqId) => skills.find((s) => s.id === prereqId)?.unlocked)
  }

  const unlockSkill = (skillId: string) => {
    setSkills(skills.map((skill) => (skill.id === skillId ? { ...skill, unlocked: true } : skill)))
  }

  const upgradeSkill = (skillId: string) => {
    setSkills(
      skills.map((skill) =>
        skill.id === skillId && skill.level < skill.maxLevel
          ? { ...skill, level: skill.level + 1, progress: 0 }
          : skill,
      ),
    )
  }

  const renderSkillCard = (skill: Skill) => {
    const isHovered = hoveredSkill === skill.id
    const prerequisites = skill.prerequisites.map((prereqId) => skills.find((s) => s.id === prereqId))
    const canUnlock = canUnlockSkill(skill)

    return (
      <div
        key={skill.id}
        className="relative"
        onMouseEnter={() => setHoveredSkill(skill.id)}
        onMouseLeave={() => setHoveredSkill(null)}
      >
        <Card
          className={cn(
            "w-[300px] transition-all duration-200",
            skill.unlocked ? "border-green-500" : "",
            selectedSkill?.id === skill.id ? "ring-2 ring-primary" : "",
            isHovered ? "shadow-lg scale-105" : "",
            "cursor-pointer",
          )}
          onClick={() => setSelectedSkill(skill)}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className={cn("p-2 rounded-lg", skill.unlocked ? "bg-green-100" : "bg-gray-100")}>
                <skill.icon className={cn("w-5 h-5", skill.unlocked ? "text-green-600" : "text-gray-500")} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium flex items-center gap-2">
                  {skill.name}
                  {skill.unlocked && <CheckCircle className="w-4 h-4 text-green-500" />}
                </h3>
                <div className="flex items-center gap-2">
                  <Badge variant={skill.unlocked ? "default" : "secondary"}>
                    Nível {skill.level}/{skill.maxLevel}
                  </Badge>
                  {!skill.unlocked &&
                    (canUnlock ? (
                      <span className="text-xs text-green-600">Disponível para desbloquear</span>
                    ) : (
                      <span className="text-xs text-gray-500">Bloqueado</span>
                    ))}
                </div>
              </div>
            </div>

            <Progress value={skill.progress} className={cn("h-2 mb-2", skill.unlocked ? "" : "opacity-50")} />

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">{skill.progress}% completo</span>
              {!skill.unlocked && <Lock className="w-4 h-4 text-gray-400" />}
            </div>

            {isHovered && !skill.unlocked && prerequisites.length > 0 && (
              <div className="mt-2 text-sm">
                <p className="font-medium text-gray-600">Pré-requisitos:</p>
                <ul className="mt-1 space-y-1">
                  {prerequisites.map((prereq, index) => (
                    <li key={index} className="flex items-center gap-1">
                      {prereq?.unlocked ? (
                        <CheckCircle className="w-3 h-3 text-green-500" />
                      ) : (
                        <AlertCircle className="w-3 h-3 text-amber-500" />
                      )}
                      <span className={cn("text-xs", prereq?.unlocked ? "text-green-600" : "text-amber-600")}>
                        {prereq?.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderSkillDetails = (skill: Skill) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={cn("p-3 rounded-lg", skill.unlocked ? "bg-green-100" : "bg-gray-100")}>
                <skill.icon className={cn("w-6 h-6", skill.unlocked ? "text-green-600" : "text-gray-500")} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">{skill.name}</h2>
                <p className="text-gray-500">{skill.description}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedSkill(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Badge variant={skill.unlocked ? "default" : "secondary"} className="text-lg px-3 py-1">
                Nível {skill.level}/{skill.maxLevel}
              </Badge>
              {skill.unlocked && <CheckCircle className="w-6 h-6 text-green-500" />}
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Progresso para próximo nível</span>
                <span>{skill.progress}%</span>
              </div>
              <Progress value={skill.progress} className={cn("h-3", skill.unlocked ? "" : "opacity-50")} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-lg mb-3">Benefícios</h3>
                <ul className="space-y-2">
                  {skill.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {!skill.unlocked && skill.prerequisites.length > 0 && (
                <div>
                  <h3 className="font-medium text-lg mb-3">Pré-requisitos</h3>
                  <ul className="space-y-2">
                    {skill.prerequisites.map((prereqId) => {
                      const prereq = skills.find((s) => s.id === prereqId)
                      return (
                        <li key={prereqId} className="flex items-center gap-2">
                          {prereq?.unlocked ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-amber-500" />
                          )}
                          <span className={cn("text-base", prereq?.unlocked ? "text-green-600" : "text-amber-600")}>
                            {prereq?.name}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-2 text-gray-600">
                <Award className="w-6 h-6" />
                <span className="text-lg">{skill.xpReward} XP ao completar</span>
              </div>
              {skill.unlocked ? (
                <Button onClick={() => upgradeSkill(skill.id)} disabled={skill.level >= skill.maxLevel} size="lg">
                  {skill.level >= skill.maxLevel ? "Nível Máximo" : "Evoluir Habilidade"}
                </Button>
              ) : (
                <Button onClick={() => unlockSkill(skill.id)} disabled={!canUnlockSkill(skill)} size="lg">
                  {canUnlockSkill(skill) ? "Desbloquear Habilidade" : "Complete os pré-requisitos"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCategory = (category: string) => {
    const categorySkills = skills.filter((skill) => skill.category === category)
    const rows = Math.max(...categorySkills.map((skill) => skill.position.row)) + 1

    return (
      <div key={category} className="space-y-4">
        <h2 className="text-lg font-semibold">{category}</h2>
        <div className="space-y-8">
          {Array.from({ length: rows }).map((_, row) => (
            <div key={row} className="flex gap-6 justify-start">
              {categorySkills
                .filter((skill) => skill.position.row === row)
                .sort((a, b) => a.position.column - b.position.column)
                .map(renderSkillCard)}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="space-y-12">{["Soft Skills", "Technical Skills"].map(renderCategory)}</div>
      {selectedSkill && renderSkillDetails(selectedSkill)}
    </div>
  )
}

