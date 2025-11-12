"use client"

import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase } from "lucide-react"
import { availableJobs } from "../../_data/jobs"

interface JobSelectionProps {
  selectedJob: string
  setSelectedJob: (value: string) => void
  selectedJobData: any
}

export function JobSelection({ selectedJob, setSelectedJob, selectedJobData }: JobSelectionProps) {
  return (
    <div className="space-y-5">
      {/* Seleção de Vaga */}
      <div className="space-y-2.5">
        <Label htmlFor="job-selection" className="text-sm font-medium flex items-center gap-1.5">
          <Briefcase className="h-4 w-4 text-muted-foreground" />
          Vaga para Busca
        </Label>
        <Select value={selectedJob} onValueChange={setSelectedJob}>
          <SelectTrigger id="job-selection">
            <SelectValue placeholder="Selecione uma vaga" />
          </SelectTrigger>
          <SelectContent>
            {availableJobs.map((job) => (
              <SelectItem key={job.id} value={job.id}>
                {job.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedJobData && (
        <div className="rounded-md border bg-muted/40 p-3 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-sm">{selectedJobData.title}</h3>
              <p className="text-xs text-muted-foreground">
                {selectedJobData.department} • {selectedJobData.location}
              </p>
            </div>
            <Badge variant="outline" className="text-xs">
              {selectedJobData.applications} candidatos
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex gap-1.5 flex-wrap">
              {selectedJobData.requiredSkills.slice(0, 3).map((skill: string) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {selectedJobData.requiredSkills.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{selectedJobData.requiredSkills.length - 3}
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {selectedJobData.experienceLevel} • Publicada {selectedJobData.postedDate}
            </p>
          </div>
        </div>
      )}
    </div>
  )
} 