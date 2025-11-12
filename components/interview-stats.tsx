import { Card } from "@/components/ui/card"
import { Calendar, Clock, CheckCircle, XCircle } from "lucide-react"

export function InterviewStats() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <Calendar className="h-8 w-8 text-blue-500" />
          <div>
            <p className="text-sm text-muted-foreground">Total de Entrevistas</p>
            <h3 className="text-2xl font-bold">12</h3>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-4">
          <Clock className="h-8 w-8 text-yellow-500" />
          <div>
            <p className="text-sm text-muted-foreground">Agendadas</p>
            <h3 className="text-2xl font-bold">4</h3>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-4">
          <CheckCircle className="h-8 w-8 text-green-500" />
          <div>
            <p className="text-sm text-muted-foreground">Realizadas</p>
            <h3 className="text-2xl font-bold">6</h3>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-4">
          <XCircle className="h-8 w-8 text-red-500" />
          <div>
            <p className="text-sm text-muted-foreground">Canceladas</p>
            <h3 className="text-2xl font-bold">2</h3>
          </div>
        </div>
      </Card>
    </div>
  )
}

