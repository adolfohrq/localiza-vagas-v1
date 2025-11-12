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

export function CancelDialog() {
  return (
    <Dialog>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cancelar Entrevista</DialogTitle>
          <DialogDescription>Por favor, forneça o motivo do cancelamento da entrevista.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cancel-reason" className="text-right">
              Motivo
            </Label>
            <Textarea id="cancel-reason" className="col-span-3" placeholder="Explique o motivo do cancelamento" />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => window.cancelInterview.close()}>
            Voltar
          </Button>
          <Button type="submit" variant="destructive">
            Confirmar Cancelamento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

