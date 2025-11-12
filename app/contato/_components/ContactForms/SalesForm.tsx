import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Building, ArrowRight } from "lucide-react"

export function SalesForm() {
  return (
    <Card className="border-blue-100 shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-50 border-b border-blue-100">
        <CardTitle className="flex items-center text-blue-700">
          <Building className="h-5 w-5 mr-2" />
          Vendas Corporativas
        </CardTitle>
        <CardDescription>
          Descubra como nossa plataforma pode otimizar o processo de recrutamento da sua empresa.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sales-name" className="text-sm font-medium">
                Nome completo
              </Label>
              <Input 
                id="sales-name" 
                placeholder="Seu nome" 
                className="border-gray-200 focus:border-blue-300 focus:ring-blue-200" 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sales-email" className="text-sm font-medium">
                E-mail corporativo
              </Label>
              <Input 
                id="sales-email" 
                type="email" 
                placeholder="seu@empresa.com" 
                className="border-gray-200 focus:border-blue-300 focus:ring-blue-200" 
                required 
              />
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-medium">
                Empresa
              </Label>
              <Input 
                id="company" 
                placeholder="Nome da empresa" 
                className="border-gray-200 focus:border-blue-300 focus:ring-blue-200" 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Telefone
              </Label>
              <Input 
                id="phone" 
                placeholder="(00) 00000-0000" 
                className="border-gray-200 focus:border-blue-300 focus:ring-blue-200" 
                required 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sales-message" className="text-sm font-medium">
              Como podemos ajudar?
            </Label>
            <Textarea 
              id="sales-message" 
              placeholder="Conte-nos sobre suas necessidades específicas de recrutamento" 
              className="min-h-[150px] border-gray-200 focus:border-blue-300 focus:ring-blue-200" 
              required 
            />
          </div>
          
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Solicitar Demonstração
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 