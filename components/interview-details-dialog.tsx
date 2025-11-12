"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, MapPinIcon, UserIcon, ClockIcon, CheckCircleIcon, FileTextIcon } from "lucide-react"

interface Interview {
  company: string
  position: string
  date: Date
  interviewer: string
  location: string
  type: string
  description: string
  requirements: string[]
  agenda: string[]
  notes?: string
}

interface InterviewDetailsDialogProps {
  interview: Interview
  open: boolean
  onClose: () => void
}

export function InterviewDetailsDialog({ interview, open, onClose }: InterviewDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{interview.company}</DialogTitle>
          <DialogDescription className="text-lg font-medium text-primary">{interview.position}</DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Informações Básicas */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                <span>{format(new Date(interview.date), "PPpp", { locale: ptBR })}</span>
              </div>
              <div className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-muted-foreground" />
                <span>{interview.interviewer}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-5 w-5 text-muted-foreground" />
                <span>{interview.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileTextIcon className="h-5 w-5 text-muted-foreground" />
                <span>{interview.type}</span>
              </div>
            </div>

            <Separator />

            {/* Descrição */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Descrição da Entrevista</h3>
              <p className="text-muted-foreground">{interview.description}</p>
            </div>

            <Separator />

            {/* Requisitos */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Requisitos e Preparação</h3>
              <ul className="space-y-2">
                {interview.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircleIcon className="h-5 w-5 text-primary mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Agenda */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Agenda</h3>
              <ul className="space-y-2">
                {interview.agenda.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <ClockIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Notas Adicionais */}
            {interview.notes && (
              <>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Notas Adicionais</h3>
                  <p className="text-muted-foreground">{interview.notes}</p>
                </div>
              </>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

