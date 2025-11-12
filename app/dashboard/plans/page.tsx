import { DashboardShell } from "@/components/dashboard-shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlansHeader } from "./_components/PlansHeader"
import { SubscriptionPlans } from "./_components/SubscriptionPlans"
import { SinglePackages } from "./_components/SinglePackages"
import { ExtraFeatures } from "./_components/ExtraFeatures"
import { Repeat, Package } from "lucide-react"

export default function PlansPage() {
  return (
    <DashboardShell>
      <PlansHeader />

      <Tabs defaultValue="subscription" className="w-full space-y-8">
        <div className="border-b">
          <div className="flex overflow-x-auto">
            <TabsList className="justify-start">
              <TabsTrigger 
                value="subscription"
                className="relative h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary px-4 transition-all"
              >
                <Repeat className="mr-2 h-4 w-4" />
                <span>Planos de Assinatura</span>
              </TabsTrigger>
              <TabsTrigger 
                value="single"
                className="relative h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary px-4 transition-all"
              >
                <Package className="mr-2 h-4 w-4" />
                <span>Pacotes Individuais</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Planos de Assinatura */}
        <TabsContent value="subscription" className="space-y-6 mt-4">
          <SubscriptionPlans />
        </TabsContent>

        {/* Pacotes Individuais */}
        <TabsContent value="single" className="space-y-6 mt-4">
          <SinglePackages />
          <ExtraFeatures />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

