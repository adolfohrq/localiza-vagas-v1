import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MessageSquare, Users, Linkedin, Twitter, Instagram, Facebook } from "lucide-react"

export function ContactChannels() {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Canais de Contato</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Escolha a forma mais conveniente para entrar em contato conosco
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="border-blue-100 hover:shadow-md transition-all hover:border-blue-300">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Telefone</h3>
              <p className="text-gray-500 mb-4">Atendimento de segunda a sexta, das 8h às 18h</p>
              <p className="font-medium text-blue-600">0800 123 4567</p>
            </CardContent>
          </Card>
          
          <Card className="border-blue-100 hover:shadow-md transition-all hover:border-blue-300">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">E-mail</h3>
              <p className="text-gray-500 mb-4">Resposta em até 24 horas úteis</p>
              <p className="font-medium text-blue-600">contato@localizavagas.com</p>
            </CardContent>
          </Card>
          
          <Card className="border-blue-100 hover:shadow-md transition-all hover:border-blue-300">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Chat Online</h3>
              <p className="text-gray-500 mb-4">Atendimento imediato, das 8h às 20h</p>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Iniciar Chat
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-blue-100 hover:shadow-md transition-all hover:border-blue-300">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Redes Sociais</h3>
              <p className="text-gray-500 mb-4">Siga-nos e envie mensagens diretas</p>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-500 hover:text-blue-600">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-600">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-600">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-600">
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
} 