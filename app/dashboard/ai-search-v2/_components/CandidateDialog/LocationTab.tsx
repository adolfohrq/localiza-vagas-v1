"use client"

import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Candidate } from "../../_data/candidates"
import { Job } from "../../_data/jobs"
import { MapPin, Globe } from "lucide-react"

interface LocationTabProps {
  candidate: Candidate
  job: Job
}

export function LocationTab({ candidate, job }: LocationTabProps) {
  // Determinar se o candidato está disponível para relocação ou trabalho remoto
  const isRemoteAvailable = candidate.location.toLowerCase().includes("remoto");
  const isRelocationAvailable = candidate.location.toLowerCase().includes("relocação");
  
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-4">Compatibilidade de Localização</h4>
        
        <div className="grid grid-cols-2 gap-4 bg-muted p-4 rounded-lg mb-4">
          <div className="space-y-2">
            <h5 className="text-xs text-muted-foreground">Localização da Vaga</h5>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <p className="font-medium">{job.location}</p>
            </div>
          </div>
          <div className="space-y-2">
            <h5 className="text-xs text-muted-foreground">Localização do Candidato</h5>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <p className="font-medium">{candidate.location}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm">Nível de Compatibilidade</span>
          <div className="flex items-center gap-2">
            <Progress
              value={candidate.matchDetails.location}
              className={cn(
                "h-2 w-[200px]",
                candidate.matchDetails.location >= 80 ? "bg-green-100" :
                candidate.matchDetails.location >= 60 ? "bg-blue-100" :
                "bg-amber-100"
              )}
            />
            <span className="text-sm font-medium">
              {candidate.matchDetails.location}%
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium">Detalhes de Disponibilidade</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="h-4 w-4 text-primary" />
              <h5 className="font-medium">Trabalho Remoto</h5>
            </div>
            <div className={cn(
              "text-sm px-2 py-1 rounded-full inline-block",
              isRemoteAvailable 
                ? "bg-green-100 text-green-800" 
                : "bg-red-100 text-red-800"
            )}>
              {isRemoteAvailable ? "Disponível" : "Não disponível"}
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-primary" />
              <h5 className="font-medium">Relocação</h5>
            </div>
            <div className={cn(
              "text-sm px-2 py-1 rounded-full inline-block",
              isRelocationAvailable 
                ? "bg-green-100 text-green-800" 
                : "bg-amber-100 text-amber-800"
            )}>
              {isRelocationAvailable ? "Disponível" : "Não especificado"}
            </div>
          </div>
        </div>
        
        {(job.location.toLowerCase() === "remoto" && isRemoteAvailable) || 
         (candidate.location.includes(job.location.split(",")[0])) ? (
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <p className="text-green-800 text-sm">
              <span className="font-medium">Compatibilidade confirmada:</span> O candidato está disponível para trabalhar na localização exigida pela vaga.
            </p>
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
            <p className="text-amber-800 text-sm">
              <span className="font-medium">Verificação necessária:</span> Recomendamos confirmar a disponibilidade do candidato para esta localização durante a entrevista.
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 