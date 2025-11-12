import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Headphones, Send } from "lucide-react"

export function SupportForm() {
  return (
    <Card className="border-blue-100 shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-50 border-b border-blue-100">
        <CardTitle className="flex items-center text-blue-700">
          <Headphones className="h-5 w-5 mr-2" />
          Suporte Técnico
        </CardTitle>
        <CardDescription>
          Precisa de ajuda com a plataforma? Nossa equipe técnica está pronta para ajudar.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="support-name" className="text-sm font-medium">
                Nome completo
              </Label>
              <Input 
                id="support-name" 
                placeholder="Seu nome" 
                className="border-gray-200 focus:border-blue-300 focus:ring-blue-200" 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="support-email" className="text-sm font-medium">
                E-mail
              </Label>
              <Input 
                id="support-email" 
                type="email" 
                placeholder="seu@email.com" 
                className="border-gray-200 focus:border-blue-300 focus:ring-blue-200" 
                required 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="support-message" className="text-sm font-medium">
              Descreva o problema
            </Label>
            <Textarea 
              id="support-message" 
              placeholder="Descreva o problema em detalhes, incluindo passos para reproduzir, mensagens de erro e capturas de tela se possível" 
              className="min-h-[150px] border-gray-200 focus:border-blue-300 focus:ring-blue-200" 
              required 
            />
          </div>
          
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Enviar Solicitação de Suporte
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 