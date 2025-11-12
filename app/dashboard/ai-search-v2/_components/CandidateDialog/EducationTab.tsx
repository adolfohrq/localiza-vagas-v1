"use client"

import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Candidate } from "../../_data/candidates"
import { Job } from "../../_data/jobs"

interface EducationTabProps {
  candidate: Candidate
  job: Job
}

export function EducationTab({ candidate, job }: EducationTabProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium">Compatibilidade de Formação Acadêmica</h4>
      
      <div className="grid grid-cols-2 gap-4 bg-muted p-4 rounded-lg">
        <div className="space-y-2">
          <h5 className="text-xs text-muted-foreground">Requisito da Vaga</h5>
          <p className="font-medium">{job.desiredEducation || "Não especificado"}</p>
        </div>
        <div className="space-y-2">
          <h5 className="text-xs text-muted-foreground">Formação do Candidato</h5>
          <p className="font-medium">{candidate.education}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-sm">Nível de Compatibilidade</span>
        <div className="flex items-center gap-2">
          <Progress
            value={candidate.matchDetails.education}
            className={cn(
              "h-2 w-[200px]",
              candidate.matchDetails.education >= 80 ? "bg-green-100" :
              candidate.matchDetails.education >= 60 ? "bg-blue-100" :
              "bg-amber-100"
            )}
          />
          <span className="text-sm font-medium">
            {candidate.matchDetails.education}%
          </span>
        </div>
      </div>
    </div>
  )
} 