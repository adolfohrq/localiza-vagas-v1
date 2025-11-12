import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PackageCard } from "./PackageCard"
import { singlePackages } from "../../_data/packages-data"

export function SinglePackages() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Anúncio Individual</CardTitle>
          <CardDescription>
            Publique anúncios individuais sem compromisso de assinatura. 
            Escolha o período de expiração que melhor atende sua necessidade.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {singlePackages.map((packageItem, index) => (
              <PackageCard key={index} package={packageItem} />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="rounded-lg bg-slate-50 p-4 flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Precisando publicar várias vagas regularmente? 
          Nossos planos mensais oferecem melhor custo-benefício.
        </p>
        <Button variant="default" size="sm" className="whitespace-nowrap">
          Ver Planos Mensais
        </Button>
      </div>
    </div>
  )
} 