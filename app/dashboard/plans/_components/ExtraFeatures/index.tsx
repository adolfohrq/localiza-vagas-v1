import { Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FeatureCard } from "./FeatureCard"
import { extraFeatures } from "../../_data/features-data"

export function ExtraFeatures() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-amber-500" />
          <CardTitle>Recursos Extras</CardTitle>
        </div>
        <CardDescription>
          Incremente seu anúncio com recursos adicionais para aumentar a visibilidade
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {extraFeatures.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 