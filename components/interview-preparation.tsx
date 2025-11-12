import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Book, FileText, Video } from "lucide-react"
import Link from "next/link"

export function InterviewPreparation() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Preparação para Entrevista</h3>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <div className="flex items-start gap-4">
            <Book className="h-6 w-6 text-blue-500" />
            <div>
              <h4 className="font-medium">Material de Estudo</h4>
              <p className="text-sm text-muted-foreground">Acesse materiais recomendados para sua próxima entrevista</p>
              <Button variant="ghost" className="px-0 text-blue-500 hover:text-blue-700">
                Ver Materiais
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-start gap-4">
            <FileText className="h-6 w-6 text-green-500" />
            <div>
              <h4 className="font-medium">Dicas e Perguntas Comuns</h4>
              <p className="text-sm text-muted-foreground">Prepare-se com perguntas frequentes e dicas úteis</p>
              <Link href="/candidate-dashboard/entrevistas-v2/dicas-perguntas">
                <Button variant="ghost" className="px-0 text-green-500 hover:text-green-700">
                  Ver Dicas
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-start gap-4">
            <Video className="h-6 w-6 text-purple-500" />
            <div>
              <h4 className="font-medium">Simulação de Entrevista</h4>
              <p className="text-sm text-muted-foreground">Pratique com nossa ferramenta de simulação</p>
              <Button variant="ghost" className="px-0 text-purple-500 hover:text-purple-700">
                Iniciar Simulação
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-start gap-4">
            <CheckCircle className="h-6 w-6 text-yellow-500" />
            <div>
              <h4 className="font-medium">Checklist de Preparação</h4>
              <p className="text-sm text-muted-foreground">Verifique todos os itens necessários</p>
              <Button variant="ghost" className="px-0 text-yellow-500 hover:text-yellow-700">
                Ver Checklist
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

