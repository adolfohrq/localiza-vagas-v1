import { Button } from "@/components/ui/button"
import { BenefitsSection } from "./BenefitsSection"
import { PlanCard } from "./PlanCard"
import { plans } from "../../_data/plans-data"

export function SubscriptionPlans() {
  return (
    <div className="space-y-6">
      {/* Comparativo visual */}
      <BenefitsSection />

      {/* Cards de Planos */}
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>

      <div className="p-4 bg-slate-50 rounded-lg mt-8 text-center text-sm text-muted-foreground">
        <p>Necessidades específicas? Entre em contato com nosso time comercial para um plano personalizado</p>
        <Button variant="ghost" className="mt-1 h-auto p-0 text-blue-600 hover:text-blue-800">Fale com um consultor</Button>
      </div>
    </div>
  )
} 