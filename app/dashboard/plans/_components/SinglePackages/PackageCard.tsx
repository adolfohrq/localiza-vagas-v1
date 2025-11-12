import { CreditCard } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Package } from "../../_data/packages-data"

interface PackageCardProps {
  package: Package
}

export function PackageCard({ package: packageItem }: PackageCardProps) {
  return (
    <Card className={cn(
      packageItem.recommended && "border-2 border-primary relative"
    )}>
      {packageItem.recommended && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs px-3 py-0.5 rounded-full">
          Recomendado
        </div>
      )}
      <CardHeader className={cn(
        packageItem.recommended && "pt-5"
      )}>
        <CardTitle className="text-lg">{packageItem.days} dias</CardTitle>
        <CardDescription>Anúncio expira em {packageItem.days} dias</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">R$ {packageItem.price.toFixed(2)}</div>
        <div className="text-xs text-muted-foreground mt-1">
          Valor único, sem recorrência
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <CreditCard className="mr-2 h-4 w-4" />
          Contratar
        </Button>
      </CardFooter>
    </Card>
  )
} 