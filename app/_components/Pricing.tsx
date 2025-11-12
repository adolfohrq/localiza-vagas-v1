import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { plans } from "@/app/_data/home-data"

export function Pricing() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Planos para empresas de todos os tamanhos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Escolha o plano ideal para suas necessidades de recrutamento
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`border ${plan.popular ? 'border-blue-200 ring-2 ring-blue-500 ring-opacity-20' : 'border-gray-200'} shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full relative overflow-hidden`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 w-28 h-28 overflow-hidden">
                  <div className="absolute transform rotate-45 bg-blue-600 text-white text-xs text-center font-semibold py-1 right-[-30px] top-[18px] w-[170px]">
                    Mais popular
                  </div>
                </div>
              )}
              
              <CardHeader className="pt-8 px-6">
                <div className="mb-2">
                  <p className="text-xl font-bold text-gray-900">{plan.name}</p>
                  {plan.popular && (
                    <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-0 mt-2">
                      Recomendado
                    </Badge>
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-3xl lg:text-4xl font-bold text-gray-900">
                    {plan.price}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
                </div>
              </CardHeader>
              
              <CardContent className="px-6 py-4 flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="pb-8 px-6">
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-white hover:bg-gray-50 text-blue-600 border border-blue-200 hover:border-blue-300'
                  }`}
                >
                  Começar {plan.name.toLowerCase() === 'básico' ? 'Grátis' : 'Agora'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-500">
            Precisa de um plano personalizado? <a href="/contato" className="text-blue-600 hover:underline">Entre em contato</a>
          </p>
        </div>
      </div>
    </section>
  )
} 