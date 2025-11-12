"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Candidate } from "../../_data/candidates"
import { Job } from "../../_data/jobs"
import { SkillsTab } from "./SkillsTab"
import { ExperienceTab } from "./ExperienceTab"
import { EducationTab } from "./EducationTab"
import { LocationTab } from "./LocationTab"
import { Mail, MapPin, X, Download, UserPlus } from "lucide-react"

interface CandidateDialogProps {
  isOpen: boolean
  onClose: () => void
  candidate: Candidate | null
  job: Job | null
}

export function CandidateDialog({ isOpen, onClose, candidate, job }: CandidateDialogProps) {
  const [activeTab, setActiveTab] = useState("skills")

  if (!candidate || !job) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-start justify-between">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <img src={candidate.avatar} alt={candidate.name} />
            </Avatar>
            <div>
              <DialogTitle className="text-xl">{candidate.name}</DialogTitle>
              <div className="text-muted-foreground mt-1">{candidate.title}</div>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{candidate.location}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />
                  <span>{candidate.name.toLowerCase().replace(" ", ".") + "@email.com"}</span>
                </div>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="flex items-center justify-between mt-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium">Compatibilidade com a vaga:</div>
            <div className="text-lg font-bold">{candidate.matchScore}%</div>
            <div 
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                candidate.matchScore >= 90 ? "bg-green-100 text-green-800" :
                candidate.matchScore >= 80 ? "bg-blue-100 text-blue-800" :
                candidate.matchScore >= 70 ? "bg-indigo-100 text-indigo-800" :
                candidate.matchScore >= 60 ? "bg-amber-100 text-amber-800" :
                "bg-red-100 text-red-800"
              }`}
            >
              {candidate.matchScore >= 90 ? "Excelente" :
               candidate.matchScore >= 80 ? "Ótimo" :
               candidate.matchScore >= 70 ? "Bom" :
               candidate.matchScore >= 60 ? "Regular" :
               "Baixo"}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              <span>Currículo</span>
            </Button>
            <Button size="sm" className="gap-1">
              <UserPlus className="h-4 w-4" />
              <span>Convidar</span>
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="skills">Habilidades</TabsTrigger>
            <TabsTrigger value="experience">Experiência</TabsTrigger>
            <TabsTrigger value="education">Formação</TabsTrigger>
            <TabsTrigger value="location">Localização</TabsTrigger>
          </TabsList>
          <TabsContent value="skills">
            <SkillsTab candidate={candidate} job={job} />
          </TabsContent>
          <TabsContent value="experience">
            <ExperienceTab candidate={candidate} job={job} />
          </TabsContent>
          <TabsContent value="education">
            <EducationTab candidate={candidate} job={job} />
          </TabsContent>
          <TabsContent value="location">
            <LocationTab candidate={candidate} job={job} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
} 