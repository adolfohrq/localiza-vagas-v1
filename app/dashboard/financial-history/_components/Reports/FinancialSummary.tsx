import { ArrowDown, ArrowRight, ArrowUp, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Transaction } from "../../_data/transactions-data"
import { useFinancialSummary } from "../../_hooks/useFinancialSummary"

interface FinancialSummaryProps {
  transactions: Transaction[]
}

export function FinancialSummary({ transactions }: FinancialSummaryProps) {
  const { 
    currentMonthAmount, 
    lastMonthAmount, 
    hasTrend, 
    trend, 
    trendPercentage 
  } = useFinancialSummary(transactions)
    
  return (
    <div className="grid grid-cols-2 gap-3 mb-6 sm:grid-cols-4">
      <Card className="bg-white border border-slate-200">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Este mês</p>
              <p className="text-lg font-bold">R$ {currentMonthAmount.toFixed(2)}</p>
            </div>
            {hasTrend && (
              <Badge 
                variant="outline" 
                className={cn(
                  "px-1.5 py-0.5 font-normal text-xs",
                  trend ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"
                )}
              >
                {trend ? <ArrowUp className="w-3 h-3 mr-0.5" /> : <ArrowDown className="w-3 h-3 mr-0.5" />}
                {trendPercentage}%
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white border border-slate-200">
        <CardContent className="p-3">
          <p className="text-xs text-muted-foreground mb-1">Mês anterior</p>
          <p className="text-lg font-bold">R$ {lastMonthAmount.toFixed(2)}</p>
        </CardContent>
      </Card>
      <Card className="bg-white border border-slate-200">
        <CardContent className="p-3">
          <p className="text-xs text-muted-foreground mb-1">Plano atual</p>
          <div className="flex items-center gap-1.5">
            <Badge className="bg-primary text-white font-normal">Pro</Badge>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            <p className="font-medium">R$ 499,99/mês</p>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white border border-slate-200">
        <CardContent className="p-3">
          <p className="text-xs text-muted-foreground mb-1">Próximo pagamento</p>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
            <p className="font-medium">05/06/2024</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 