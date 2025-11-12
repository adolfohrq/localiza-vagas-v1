"use client"

import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Candidate } from "../../_data/candidates"
import { Job } from "../../_data/jobs"
import { MapPin, Timer, Calendar } from "lucide-react"

interface ExperienceTabProps {
  candidate: Candidate
  job: Job
}

export function ExperienceTab({ candidate, job }: ExperienceTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-4">Compatibilidade de Experiência</h4>
        
        <div className="grid grid-cols-2 gap-4 bg-muted p-4 rounded-lg mb-4">
          <div className="space-y-2">
            <h5 className="text-xs text-muted-foreground">Experiência Desejada</h5>
            <p className="font-medium">{job.desiredExperience} anos</p>
          </div>
          <div className="space-y-2">
            <h5 className="text-xs text-muted-foreground">Experiência do Candidato</h5>
            <p className="font-medium">{candidate.yearsOfExperience} anos</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm">Nível de Compatibilidade</span>
          <div className="flex items-center gap-2">
            <Progress
              value={candidate.matchDetails.experience}
              className={cn(
                "h-2 w-[200px]",
                candidate.matchDetails.experience >= 80 ? "bg-green-100" :
                candidate.matchDetails.experience >= 60 ? "bg-blue-100" :
                "bg-amber-100"
              )}
            />
            <span className="text-sm font-medium">
              {candidate.matchDetails.experience}%
            </span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-4">Experiências Profissionais</h4>
        
        <div className="space-y-4">
          {candidate.experiences.map((exp, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-medium">{exp.title}</h5>
                  <div className="text-sm text-muted-foreground">{exp.company}</div>
                </div>
                <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                  {exp.current ? "Atual" : "Anterior"}
                </div>
              </div>
              
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{exp.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Timer className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{exp.duration} {exp.duration === 1 ? "ano" : "anos"}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{exp.period}</span>
                </div>
              </div>
              
              <p className="mt-3 text-sm">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 