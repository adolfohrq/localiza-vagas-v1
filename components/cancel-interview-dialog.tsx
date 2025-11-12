"use client"

import { useState } from "react"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

interface CancelInterviewDialogProps {
  interview: {
    id: number
    company: string
    position: string
    date?: string
    time?: string
  }
  open: boolean
  onClose: () => void
}

export function CancelInterviewDialog({ interview, open, onClose }: CancelInterviewDialogProps) {
  const [reason, setReason] = useState("")
  const { toast } = useToast()

  const handleCancel = async () => {
    if (!reason.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, forneça um motivo para o cancelamento.",
        variant: "destructive",
      })
      return
    }

    try {
      // Simulating an API call to cancel the interview
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Entrevista cancelada",
        description: "A entrevista foi cancelada com sucesso.",
      })
      onClose()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao cancelar a entrevista. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0">
        <div className="border-b border-border p-6">
          <DialogHeader className="gap-2">
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              <DialogTitle>Cancelar Entrevista</DialogTitle>
            </div>
            <DialogDescription className="text-base">
              Você está cancelando a entrevista para a vaga de{" "}
              <span className="font-medium text-foreground">{interview.position}</span> na empresa{" "}
              <span className="font-medium text-foreground">{interview.company}</span>
              {interview.date && interview.time && (
                <>
                  {" "}
                  agendada para{" "}
                  <span className="font-medium text-foreground">
                    {interview.date} às {interview.time}
                  </span>
                </>
              )}
              .
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-sm font-medium">
              Motivo do cancelamento
            </Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className={cn("resize-none h-32", !reason.trim() && "border-destructive focus-visible:ring-destructive")}
              placeholder="Por favor, explique o motivo do cancelamento desta entrevista..."
            />
            {!reason.trim() && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                Este campo é obrigatório
              </p>
            )}
          </div>

          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-1">Importante:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>O cancelamento não pode ser desfeito</li>
              <li>A empresa será notificada do cancelamento</li>
              <li>Isso pode afetar futuras oportunidades com esta empresa</li>
            </ul>
          </div>
        </div>

        <DialogFooter className="p-6 pt-0 gap-2 sm:gap-2">
          <Button type="button" variant="ghost" onClick={onClose} className="w-full sm:w-auto">
            Voltar
          </Button>
          <Button
            type="submit"
            variant="destructive"
            onClick={handleCancel}
            className="w-full sm:w-auto gap-2"
            disabled={!reason.trim()}
          >
            <AlertTriangle className="h-4 w-4" />
            Confirmar Cancelamento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

