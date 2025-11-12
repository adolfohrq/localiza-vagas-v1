"use client"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, X } from "lucide-react"
import { Candidate } from "../../_data/candidates"
import { Job } from "../../_data/jobs"

interface SkillsTabProps {
  candidate: Candidate
  job: Job
}

export function SkillsTab({ candidate, job }: SkillsTabProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium">Compatibilidade de Habilidades</h4>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Requisito da Vaga</TableHead>
            <TableHead>Candidato Possui</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {job.requiredSkills.map((skill) => (
            <TableRow key={skill}>
              <TableCell>{skill}</TableCell>
              <TableCell>
                {candidate.skills.includes(skill) ? (
                  <span className="text-green-600 flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4" />
                    Sim
                  </span>
                ) : (
                  <span className="text-red-500 flex items-center gap-1.5">
                    <X className="h-4 w-4" />
                    Não
                  </span>
                )}
              </TableCell>
              <TableCell>
                {candidate.skills.includes(skill) ? (
                  <Badge className="bg-green-50 text-green-700 border-green-200">
                    Compatível
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-red-500 border-red-200">
                    Incompatível
                  </Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="pt-2 space-y-2">
        <h5 className="text-sm font-medium">Habilidades Adicionais do Candidato</h5>
        <div className="flex flex-wrap gap-1.5">
          {candidate.skills
            .filter(skill => !job.requiredSkills.includes(skill))
            .map(skill => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
        </div>
      </div>
    </div>
  )
} 