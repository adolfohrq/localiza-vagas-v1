import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { MessageSquare, Send } from "lucide-react"

export function MessageForm() {
  return (
    <Card className="border-blue-100 shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-50 border-b border-blue-100">
        <CardTitle className="flex items-center text-blue-700">
          <MessageSquare className="h-5 w-5 mr-2" />
          Envie-nos uma mensagem
        </CardTitle>
        <CardDescription>
          Use o formulário abaixo para entrar em contato com nossa equipe de atendimento.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Nome completo
              </Label>
              <Input 
                id="name" 
                placeholder="Seu nome" 
                className="border-gray-200 focus:border-blue-300 focus:ring-blue-200" 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                E-mail
              </Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="seu@email.com" 
                className="border-gray-200 focus:border-blue-300 focus:ring-blue-200" 
                required 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-sm font-medium">
              Assunto
            </Label>
            <Input 
              id="subject" 
              placeholder="Assunto da mensagem" 
              className="border-gray-200 focus:border-blue-300 focus:ring-blue-200" 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Departamento
            </Label>
            <RadioGroup defaultValue="atendimento" className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="atendimento" id="atendimento" />
                <Label htmlFor="atendimento">Atendimento ao Cliente</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="comercial" id="comercial" />
                <Label htmlFor="comercial">Comercial</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="financeiro" id="financeiro" />
                <Label htmlFor="financeiro">Financeiro</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="outro" id="outro" />
                <Label htmlFor="outro">Outro</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium">
              Mensagem
            </Label>
            <Textarea 
              id="message" 
              placeholder="Descreva detalhadamente como podemos ajudar você" 
              className="min-h-[150px] border-gray-200 focus:border-blue-300 focus:ring-blue-200" 
              required 
            />
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox id="terms" />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Aceito receber comunicações da Localiza Vagas
              </Label>
              <p className="text-sm text-gray-500">
                Você pode cancelar a qualquer momento.
              </p>
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Enviar Mensagem
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 