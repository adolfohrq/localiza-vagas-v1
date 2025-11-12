"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Briefcase, GraduationCap, Clock, ExternalLink, Calendar, UserPlus } from "lucide-react"
import Link from "next/link"

interface ProfessionalCardProps {
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
  id: string
}

export function ProfessionalCard({
  name,
  title,
  location,
  experience,
  education,
  skills,
  avatar,
  lastActive,
  age,
  inscricaoData,
  id,
}: ProfessionalCardProps) {
  return (
    <div>
      <Card className="group overflow-hidden transition-shadow duration-300 hover:shadow-md">
        <div className="flex gap-6 p-6 transition-colors sm:flex-row flex-col">
          {/* Avatar Section */}
          <div className="relative h-20 w-20 flex-shrink-0 sm:mb-0 mb-4">
            <div className="absolute inset-0 rounded-full border bg-white p-1 shadow-sm">
              <img
                src={avatar || "/placeholder.svg"}
                alt={`${name}'s avatar`}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-1 flex-col gap-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 sm:flex-row flex-col">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold tracking-tight">{name}</h2>
                <h3 className="text-base text-muted-foreground">{title}</h3>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid gap-4 text-sm text-muted-foreground sm:grid-cols-3 grid-cols-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase className="h-4 w-4 text-gray-400" />
                <span>{experience} de experiência</span>
              </div>
              <div className="flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4 text-gray-400" />
                <span>{education}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <UserPlus className="h-4 w-4 text-gray-400" />
                <span>Inscrito em: {inscricaoData}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>Ativo {lastActive}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>{age} anos</span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t pt-4 sm:flex-row flex-col">
              <div className="flex items-center gap-2 flex-wrap sm:mb-0 mb-4">
                {skills.slice(0, 5).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-50 text-primary">
                    {skill}
                  </Badge>
                ))}
                {skills.length > 5 && <span className="text-sm text-muted-foreground">+{skills.length - 5} mais</span>}
              </div>
              <Link href={`/profissionais/${id}`}>
                <Button className="gap-2 sm:w-auto w-full">
                  Ver Perfil
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

