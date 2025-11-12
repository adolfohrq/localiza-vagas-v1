"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  MapPin,
  Building2,
  DollarSign,
  Clock,
  ExternalLink,
  Users,
  GraduationCap,
  Briefcase,
  ChevronUp,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface JobCardProps {
  id: string
  company: string
  title: string
  location: string
  area: string
  salary: string
  logo: string
  postedAt: string
  isNew?: boolean
  isUrgent?: boolean
  type: string
  expirationDate?: Date
  numberOfVacancies: number
  skills?: string[]
}

export function JobCard({
  id,
  company,
  title,
  location,
  area,
  salary,
  logo,
  postedAt,
  isNew = false,
  isUrgent = false,
  type,
  expirationDate,
  numberOfVacancies,
  skills,
}: JobCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const visibleSkills = 3
  const remainingSkills = skills ? skills.length - visibleSkills : 0

  return (
    <div>
      <Card className="group overflow-hidden transition-shadow duration-300 hover:shadow-md">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6">
          {/* Logo Section */}
          <div className="relative h-16 w-16 flex-shrink-0 self-center sm:self-start mb-2 sm:mb-0">
            <div className="absolute inset-0 rounded-lg border bg-white p-2 shadow-sm">
              <img src={logo || "/placeholder.svg"} alt={`${company} logo`} className="h-full w-full object-contain" />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-1 flex-col gap-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      {company}
                    </span>
                  </h3>
                  <div className="flex gap-2">
                    {isNew && (
                      <Badge variant="secondary" className="bg-green-50 text-green-600">
                        Nova
                      </Badge>
                    )}
                    {isUrgent && (
                      <Badge variant="secondary" className="bg-red-50 text-red-600">
                        Urgente
                      </Badge>
                    )}
                  </div>
                </div>
                <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
                {(() => {
                  if (!(expirationDate instanceof Date) || isNaN(expirationDate.getTime())) {
                    return null
                  }
                  const daysLeft = Math.ceil((expirationDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24))
                  return (
                    <span className="text-sm font-medium text-green-500">
                      Expira em {daysLeft} {daysLeft === 1 ? "dia" : "dias"}
                    </span>
                  )
                })()}
              </div>
            </div>

            {/* Mobile: Information List */}
            <div className="sm:hidden space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span>{area}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span>{salary}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span>{numberOfVacancies} vagas</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span>{type}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span>Publicada {postedAt}</span>
              </div>
            </div>

            {/* Desktop: Information Grid */}
            <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase className="h-4 w-4 text-gray-400" />
                <span>{area}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <DollarSign className="h-4 w-4 text-gray-400" />
                <span>{salary}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-gray-400" />
                <span>
                  {numberOfVacancies} {numberOfVacancies === 1 ? "vaga" : "vagas"}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4 text-gray-400" />
                <span>{type}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>Publicada {postedAt}</span>
              </div>
            </div>

            {/* Skills Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t pt-4">
              {/* Mobile Skills */}
              <div className="sm:hidden">
                <div className="flex flex-wrap gap-2">
                  {skills &&
                    skills.slice(0, isExpanded ? undefined : visibleSkills).map((skill, index) => (
                      <span key={index} className="text-primary hover:text-primary/80 cursor-pointer text-sm">
                        {skill}
                      </span>
                    ))}
                  {!isExpanded && remainingSkills > 0 && (
                    <button
                      onClick={() => setIsExpanded(true)}
                      className="text-primary hover:text-primary/80 text-sm flex items-center gap-1"
                    >
                      +{remainingSkills} mais
                    </button>
                  )}
                </div>
                {isExpanded && (
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="text-primary hover:text-primary/80 text-sm flex items-center gap-1 mt-2"
                  >
                    Menos detalhes
                    <ChevronUp className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Desktop Skills */}
              <div className="hidden sm:flex items-center gap-2 flex-wrap">
                {skills && skills.length > 0 ? (
                  skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-50 text-primary">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">Nenhuma habilidade listada</span>
                )}
              </div>

              {/* Apply Button */}
              <Link href={`/vagas/${id}`} className="w-full sm:w-auto">
                <Button className="gap-2 w-full sm:w-auto bg-primary hover:bg-primary/90">
                  Candidatar-se
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

