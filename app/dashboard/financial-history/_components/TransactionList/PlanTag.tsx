import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { plans } from "../../_data/transactions-data"

interface PlanTagProps {
  planId?: string
}

export function PlanTag({ planId }: PlanTagProps) {
  if (!planId) return null
  
  const plan = plans.find(p => p.id === planId)
  if (!plan) return null
  
  const colorMap = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    green: "bg-green-50 text-green-700 border-green-200"
  }
  
  return (
    <Badge variant="outline" className={cn("px-1.5 py-0.5 text-[10px] font-normal", colorMap[plan.color as keyof typeof colorMap])}>
      {plan.name}
    </Badge>
  )
} 