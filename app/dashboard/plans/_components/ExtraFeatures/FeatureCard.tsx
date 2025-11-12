import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ExtraFeature } from "../../_data/features-data"

interface FeatureCardProps {
  feature: ExtraFeature
}

export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <div className="flex items-start justify-between rounded-lg border p-4 hover:bg-slate-50 transition-colors">
      <div className="flex items-start gap-3">
        <div className="bg-amber-50 p-2 rounded-full">
          <feature.icon className="h-5 w-5 text-amber-500" />
        </div>
        <div>
          <h3 className="font-semibold">{feature.name}</h3>
          <p className="text-sm text-muted-foreground">{feature.description}</p>
          <div className="mt-1.5 flex items-center gap-2">
            <Badge variant="outline" className="text-xs font-normal">
              {feature.duration}
            </Badge>
            <span className="text-sm font-medium">{feature.price}</span>
          </div>
        </div>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="sm" variant="outline">Adicionar</Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p className="text-xs">Adicione ao seu carrinho junto com um anúncio</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
} 