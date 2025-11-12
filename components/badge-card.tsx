"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Lock } from "lucide-react"
import { useState } from "react"

interface BadgeProps {
  name: string
  description: string
  icon: string
  category: string
  isAchieved: boolean
}

export function BadgeCard({ name, description, icon, category, isAchieved }: BadgeProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className={`transition-all duration-300 ${isHovered ? "shadow-lg transform -translate-y-1" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl ${
              isAchieved ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"
            }`}
          >
            {icon}
          </div>
          <div className="flex-grow">
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-gray-600">{description}</p>
            <Badge variant="secondary" className="mt-2">
              {category}
            </Badge>
          </div>
          {isAchieved ? (
            <Badge variant="secondary" className="ml-auto">
              <Award className="mr-1 h-3 w-3" />
              Conquistado
            </Badge>
          ) : (
            <Button variant="outline" size="sm" className="ml-auto">
              <Lock className="mr-1 h-3 w-3" />
              Iniciar Desafio
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

