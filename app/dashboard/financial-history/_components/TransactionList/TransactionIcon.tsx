import { CreditCard, Package, Receipt } from "lucide-react"
import { cn } from "@/lib/utils"
import { TransactionType } from "../../_data/transactions-data"

interface TransactionIconProps {
  type: TransactionType
  className?: string
}

export function TransactionIcon({ type, className }: TransactionIconProps) {
  switch (type) {
    case "payment":
      return <CreditCard className={cn("text-primary", className)} />
    case "package":
      return <Package className={cn("text-amber-500", className)} />
    case "extra":
      return <Receipt className={cn("text-emerald-500", className)} />
  }
} 