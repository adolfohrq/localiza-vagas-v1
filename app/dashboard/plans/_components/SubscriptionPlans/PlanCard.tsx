import { Check, CreditCard } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Plan } from "../../_data/plans-data"

interface PlanCardProps {
  plan: Plan
}

export function PlanCard({ plan }: PlanCardProps) {
  return (
    <Card 
      className={cn(
        "transition-all duration-200 hover:shadow-md", 
        plan.popular && "border-2 border-primary relative"
      )}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs font-semibold px-4 py-1 rounded-full">
          Mais Popular
        </div>
      )}
      <CardHeader className={cn(
        "pb-4",
        plan.popular && "pt-6"
      )}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-full bg-${plan.color}-100`}>
              <plan.icon className={`h-5 w-5 text-${plan.color}-600`} />
            </div>
            <CardTitle>{plan.name}</CardTitle>
          </div>
        </div>
        
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">{plan.price}</span>
          <span className="text-muted-foreground text-sm">/mês</span>
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          {plan.priceComparison}
        </div>
        
        <CardDescription className="mt-3">{plan.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <ul className="space-y-3 text-sm">
          {plan.features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-start">
              <Check className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-3">
        <Button 
          className={cn(
            "w-full", 
            plan.popular ? "bg-primary hover:bg-primary/90" : "bg-primary/90 hover:bg-primary"
          )}
        >
          <CreditCard className="mr-2 h-4 w-4" />
          Assinar {plan.name}
        </Button>
        
        <span className="text-xs text-center text-muted-foreground">
          Cancele a qualquer momento
        </span>
      </CardFooter>
    </Card>
  )
} 