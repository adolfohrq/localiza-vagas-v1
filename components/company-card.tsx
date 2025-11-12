"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Users, Calendar, ExternalLink, UserPlus, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"

interface CompanyCardProps {
  id: string
  name: string
  logo: string
  industry: string
  location: string
  employeeCount: string
  foundedYear: number
  openPositions: number
  description: string
  inscricaoData: string
}

export function CompanyCard({
  id,
  name,
  logo,
  industry,
  location,
  employeeCount,
  foundedYear,
  openPositions,
  description,
  inscricaoData,
}: CompanyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div>
      <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-md">
        <div className="flex flex-col sm:flex-row gap-6 p-6 transition-colors">
          {/* Logo Section */}
          <div className="relative h-20 w-20 flex-shrink-0 mx-auto sm:mx-0">
            <div className="absolute inset-0 rounded-lg border bg-white p-2 shadow-sm">
              <img src={logo || "/placeholder.svg"} alt={`${name} logo`} className="h-full w-full object-contain" />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-1 flex-col gap-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h2 className="text-xl font-semibold tracking-tight transition-colors">{name}</h2>
                <h3 className="text-base text-muted-foreground">{industry}</h3>
              </div>
              <Badge variant="secondary" className="bg-blue-50 text-primary">
                {openPositions} {openPositions === 1 ? "vaga aberta" : "vagas abertas"}
              </Badge>
            </div>

            {/* Mobile: Collapsed View */}
            <div className="sm:hidden">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>{location}</span>
              </div>
            </div>

            {/* Desktop: Full View */}
            <div className="hidden sm:grid grid-cols-2 gap-4 text-sm text-muted-foreground md:grid-cols-4">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-gray-400" />
                <span>{employeeCount} funcionários</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>Fundada em {foundedYear}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <UserPlus className="h-4 w-4 text-gray-400" />
                <span>Inscrito em: {inscricaoData}</span>
              </div>
            </div>

            {/* Mobile: Expanded View */}
            {isExpanded && (
              <div className="sm:hidden space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span>{employeeCount} funcionários</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>Fundada em {foundedYear}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <UserPlus className="h-4 w-4 text-gray-400" />
                  <span>Inscrito em: {inscricaoData}</span>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between border-t pt-4 gap-4 sm:gap-0">
              <p className="text-sm text-muted-foreground line-clamp-2 flex-1 pr-4 text-center sm:text-left">
                {description}
              </p>
              <Link href={`/empresas/${id}`} passHref className="w-full sm:w-auto">
                <Button className="gap-2 w-full sm:w-auto">
                  Ver Perfil
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Mobile: Expand/Collapse Button */}
            <div className="sm:hidden">
              <Button variant="ghost" className="w-full mt-2" onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-2" />
                    Menos detalhes
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-2" />
                    Mais detalhes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

