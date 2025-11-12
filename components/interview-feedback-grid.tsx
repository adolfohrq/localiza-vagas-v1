import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Star, MessageSquare } from "lucide-react"

const mockFeedbacks = [
  {
    company: "TechCorp",
    position: "Desenvolvedor Full Stack Senior",
    date: "28/02/2024",
    type: "Entrevista Técnica",
    rating: 4,
    technicalKnowledge: 85,
    communication: 90,
    problemSolving: 80,
    feedback:
      "Excelente conhecimento técnico e boa comunicação. Demonstrou forte capacidade de resolução de problemas.",
  },
  {
    company: "InnovaSoft",
    position: "Tech Lead",
    date: "15/03/2024",
    type: "Entrevista Comportamental",
    rating: 5,
    technicalKnowledge: 95,
    communication: 95,
    problemSolving: 90,
    feedback:
      "Impressionante experiência em liderança e excelentes habilidades de comunicação. Demonstrou pensamento estratégico.",
  },
  {
    company: "DataDynamics",
    position: "Engenheiro de Dados Senior",
    date: "10/04/2024",
    type: "Entrevista Técnica",
    rating: 4,
    technicalKnowledge: 90,
    communication: 85,
    problemSolving: 88,
    feedback:
      "Forte conhecimento em engenharia de dados e boas habilidades analíticas. Comunicação pode ser melhorada em alguns aspectos técnicos.",
  },
]

export function InterviewFeedbackGrid() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Feedback das Entrevistas</h3>
        <Button variant="outline" size="sm" onClick={() => window.allFeedbacks.showModal()}>
          Ver Todos os Feedbacks
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockFeedbacks.map((feedback, index) => (
          <Card key={index} className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{feedback.company}</h4>
                  <p className="text-sm text-muted-foreground">{feedback.position}</p>
                  <p className="text-xs text-muted-foreground">
                    {feedback.type} - {feedback.date}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${star <= feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Conhecimento Técnico</span>
                  <span className="text-muted-foreground">{feedback.technicalKnowledge}%</span>
                </div>
                <Progress value={feedback.technicalKnowledge} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Comunicação</span>
                  <span className="text-muted-foreground">{feedback.communication}%</span>
                </div>
                <Progress value={feedback.communication} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Resolução de Problemas</span>
                  <span className="text-muted-foreground">{feedback.problemSolving}%</span>
                </div>
                <Progress value={feedback.problemSolving} className="h-2" />
              </div>

              <div className="flex items-start gap-4 pt-4 border-t">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{feedback.feedback}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

