import { AlertTriangle, Check, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Status } from "../../_data/transactions-data"

interface StatusBadgeProps {
  status: Status
  compact?: boolean
}

export function StatusBadge({ status, compact = false }: StatusBadgeProps) {
  const styles = {
    completed: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
    pending: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
    failed: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
  }
  
  const icons = {
    completed: Check,
    pending: Clock,
    failed: AlertTriangle
  }
  
  const StatusIcon = icons[status]
  
  const labels = {
    completed: "Pago",
    pending: "Pendente",
    failed: "Falhou"
  }
  
  return (
    <Badge 
      variant="outline" 
      className={cn(styles[status], compact ? "px-2 py-0.5 text-xs" : "px-2.5 py-0.5")}
    >
      <StatusIcon className={cn("w-3 h-3 mr-1", compact ? "w-2.5 h-2.5" : "")} />
      {labels[status]}
    </Badge>
  )
} 