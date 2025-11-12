"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { format, addDays } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useToast } from "@/components/ui/use-toast"

interface Interview {
  id: string
  company: string
  date: string
  position: string
}

interface RescheduleDialogProps {
  interview: Interview
  open: boolean
  onClose: () => void
}

export function RescheduleDialog({ interview, open, onClose }: RescheduleDialogProps) {
  const [justification, setJustification] = useState("")
  const [newDate, setNewDate] = useState("")
  const [newTime, setNewTime] = useState("")
  const { toast } = useToast()

  const handleReschedule = async () => {
    if (!justification.trim() || !newDate || !newTime) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      })
      return
    }

    try {
      // Here you would implement the API call to reschedule the interview
      // For now, we'll simulate an API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Solicitação enviada",
        description: "Sua solicitação de reagendamento foi enviada com sucesso.",
      })
      onClose()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao enviar a solicitação. Por favor, tente novamente.",
        variant: "destructive",
      })
    }
  }

  const minDate = format(addDays(new Date(), 1), "yyyy-MM-dd")

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Remarcar Entrevista</DialogTitle>
          <DialogDescription>
            Solicite o reagendamento da entrevista com {interview.company} para a vaga de {interview.position},
            originalmente agendada para {format(new Date(interview.date), "PPpp", { locale: ptBR })}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-date" className="text-right">
              Nova Data
            </Label>
            <Input
              id="new-date"
              type="date"
              className="col-span-3"
              min={minDate}
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-time" className="text-right">
              Novo Horário
            </Label>
            <Input
              id="new-time"
              type="time"
              className="col-span-3"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="justification" className="text-right">
              Justificativa
            </Label>
            <Textarea
              id="justification"
              placeholder="Digite sua justificativa aqui..."
              className="col-span-3"
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="button" onClick={handleReschedule} disabled={!justification.trim() || !newDate || !newTime}>
            Solicitar Reagendamento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

