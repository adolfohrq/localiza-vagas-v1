import React from 'react'
import { ProfessionalCard } from "@/components/professional-card"

interface Professional {
  name: string
  title: string
  location: string
  experience: string
  education: string
  skills: string[]
  avatar: string
  lastActive: string
  age: number
  inscricaoData: string
}

interface ProfessionalsListProps {
  professionals: Professional[]
}

export function ProfessionalsList({ professionals }: ProfessionalsListProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {professionals.map((professional, index) => (
        <ProfessionalCard key={index} {...professional} id={`professional-${index}`} />
      ))}
    </div>
  )
} 