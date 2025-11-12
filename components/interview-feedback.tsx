import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Star, MessageSquare } from "lucide-react"

export function InterviewFeedback() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Feedback das Entrevistas</h3>

      <div className="space-y-6">
        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">TechCorp - Desenvolvedor Full Stack Senior</h4>
                <p className="text-sm text-muted-foreground">Entrevista Técnica - 28/02/2024</p>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <Star className="h-4 w-4 text-yellow-400" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Conhecimento Técnico</span>
                <span className="text-muted-foreground">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Comunicação</span>
                <span className="text-muted-foreground">90%</span>
              </div>
              <Progress value={90} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Resolução de Problemas</span>
                <span className="text-muted-foreground">80%</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>

            <div className="flex items-start gap-4 pt-4 border-t">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                "Excelente conhecimento técnico e boa comunicação. Demonstrou forte capacidade de resolução de
                problemas."
              </p>
            </div>
          </div>
        </Card>

        <div className="flex justify-center">
          <Button variant="outline">Ver Todos os Feedbacks</Button>
        </div>
      </div>
    </div>
  )
}

