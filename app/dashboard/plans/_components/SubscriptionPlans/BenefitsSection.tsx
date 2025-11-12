import { CheckCircle2 } from "lucide-react"

export function BenefitsSection() {
  return (
    <div className="w-full overflow-hidden mb-8 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-3 text-indigo-700">Por que escolher um plano mensal?</h3>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-indigo-100">
          <div className="flex items-start mb-2">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <CheckCircle2 className="h-5 w-5 text-blue-600" />
            </div>
            <span className="font-medium">Economia</span>
          </div>
          <p className="text-sm text-muted-foreground">Custo reduzido por vaga comparado a anúncios individuais</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-indigo-100">
          <div className="flex items-start mb-2">
            <div className="bg-purple-100 p-2 rounded-full mr-3">
              <CheckCircle2 className="h-5 w-5 text-purple-600" />
            </div>
            <span className="font-medium">Flexibilidade</span>
          </div>
          <p className="text-sm text-muted-foreground">Publique quando precisar sem necessidade de novas transações</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-indigo-100">
          <div className="flex items-start mb-2">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <span className="font-medium">Funcionalidades extras</span>
          </div>
          <p className="text-sm text-muted-foreground">Recursos exclusivos para otimizar seu processo de recrutamento</p>
        </div>
      </div>
    </div>
  )
} 