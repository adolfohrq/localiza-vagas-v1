"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Clock, Search, Zap } from "lucide-react"
import { Candidate } from "../../_data/candidates"
import { cn } from "@/lib/utils"

interface CandidateCardProps {
  candidate: Candidate
  onViewDetails: (candidate: Candidate) => void
}

export function CandidateCard({ candidate, onViewDetails }: CandidateCardProps) {
  const matchScoreColorClass = 
    candidate.matchScore >= 90 ? 'rgb(34,197,94)' : 
    candidate.matchScore >= 80 ? 'rgb(16,185,129)' : 
    candidate.matchScore >= 70 ? 'rgb(59,130,246)' : 
    candidate.matchScore >= 60 ? 'rgb(245,158,11)' : 
    'rgb(107,114,128)'

  return (
    <div className="group relative rounded-lg border bg-card overflow-hidden hover:shadow-md transition-all duration-200">
      <div 
        className="absolute top-0 left-0 w-1.5 h-full" 
        style={{ backgroundColor: matchScoreColorClass }}
      />

      <div className="flex p-4 pl-5">
        {/* Foto e Nome do Candidato */}
        <div className="flex-shrink-0 mr-4">
          <div className="relative">
            <Avatar className="h-16 w-16 border-2 border-background">
              <AvatarImage src={candidate.avatar} alt={candidate.name} />
              <AvatarFallback className="text-lg font-medium bg-primary/10">{candidate.name.slice(0, 2)}</AvatarFallback>
            </Avatar>

            <div className={cn(
              "absolute -bottom-2 -right-2 h-8 w-8 flex items-center justify-center rounded-full border-2 border-background text-white font-semibold text-xs",
              candidate.matchScore >= 90 ? "bg-green-500" :
              candidate.matchScore >= 80 ? "bg-emerald-500" :
              candidate.matchScore >= 70 ? "bg-blue-500" :
              candidate.matchScore >= 60 ? "bg-amber-500" :
              "bg-gray-500"
            )}>
              {candidate.matchScore}
            </div>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1 min-w-0">
          {/* Cabeçalho */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base font-semibold truncate group-hover:text-primary transition-colors">{candidate.name}</h3>
              <p className="text-sm text-muted-foreground truncate">{candidate.title}</p>
            </div>
            
            <div className="flex mt-0.5">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full"
                onClick={() => onViewDetails(candidate)}
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Ver detalhes</span>
              </Button>
              
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Zap className="h-4 w-4" />
                <span className="sr-only">Convidar</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé com ações */}
      <div className="border-t px-4 py-2 bg-muted/30 flex items-center justify-between">
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1 text-muted-foreground/70" />
          <span>Atualizado há {Math.floor(Math.random() * 24)} horas</span>
        </div>
        
        <div className="flex items-center gap-1.5">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 text-xs px-2.5"
            onClick={() => onViewDetails(candidate)}
          >
            <Search className="h-3 w-3 mr-1.5" />
            Ver Detalhes
          </Button>
          
          <Button size="sm" className="h-7 text-xs px-2.5">
            <Zap className="h-3 w-3 mr-1.5" />
            Convidar
          </Button>
        </div>
      </div>
    </div>
  )
} 