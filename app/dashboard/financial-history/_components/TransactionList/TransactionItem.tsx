import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { format, isThisMonth } from "date-fns"
import { ptBR } from "date-fns/locale"
import { TransactionIcon } from "./TransactionIcon"
import { StatusBadge } from "./StatusBadge"
import { PlanTag } from "./PlanTag"
import { Transaction } from "../../_data/transactions-data"

interface TransactionItemProps {
  transaction: Transaction
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const isRecent = isThisMonth(new Date(transaction.date))
  const isPending = transaction.status === "pending"
  
  return (
    <div className={cn(
      "grid grid-cols-12 items-center py-3 px-4 transition-colors hover:bg-slate-50/80",
      isRecent && "bg-blue-50/30",
      isPending && "bg-amber-50/30"
    )}>
      {/* Coluna de Ícone do Tipo - 1/12 */}
      <div className="col-span-1 flex justify-center">
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          transaction.type === "payment" ? "bg-primary/10" : 
          transaction.type === "package" ? "bg-amber-100" : "bg-emerald-100"
        )}>
          <TransactionIcon type={transaction.type} className="h-4 w-4" />
        </div>
      </div>
      
      {/* Coluna de Descrição - 6/12 */}
      <div className="col-span-6">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-medium text-sm truncate">
              {transaction.description}
            </p>
            <PlanTag planId={transaction.planId} />
            {isRecent && (
              <Badge variant="outline" className="px-1 py-0 text-[10px] bg-blue-50 border-blue-200 text-blue-600 shrink-0">
                Recente
              </Badge>
            )}
          </div>
          
          <p className="text-xs text-muted-foreground mt-1">
            {format(new Date(transaction.date), "dd MMM, yyyy", { locale: ptBR })}
          </p>
        </div>
      </div>
      
      {/* Coluna de Valor - 2/12 */}
      <div className="col-span-2 text-right">
        <div className={cn(
          "font-medium text-sm",
          transaction.status === "failed" && "text-red-600"
        )}>
          {transaction.status === "failed" ? "- " : ""}
          R$ {transaction.amount.toFixed(2)}
        </div>
      </div>
      
      {/* Coluna de Status - 2/12 */}
      <div className="col-span-2 flex justify-center">
        <StatusBadge status={transaction.status} compact />
      </div>
      
      {/* Coluna de Ações - 1/12 */}
      <div className="col-span-1 flex justify-center">
        {transaction.type === "payment" && transaction.planId ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 rounded-full opacity-70 hover:opacity-100"
                  asChild
                >
                  <Link href={`/dashboard/plans#${transaction.planId}`}>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p className="text-xs">Ver detalhes do plano</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <div className="w-7 h-7"></div> /* Espaçador para manter alinhamento */
        )}
      </div>
    </div>
  )
} 