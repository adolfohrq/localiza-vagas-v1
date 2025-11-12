import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Headphones, Building } from "lucide-react"
import { MessageForm } from "./MessageForm"
import { SupportForm } from "./SupportForm"
import { SalesForm } from "./SalesForm"

export function ContactForms() {
  return (
    <section className="py-16 container mx-auto px-4">
      <Tabs defaultValue="message" className="w-full max-w-5xl mx-auto">
        <TabsList className="grid grid-cols-3 mb-8 bg-gray-100 p-1">
          <TabsTrigger value="message" className="text-sm md:text-base py-3 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Enviar Mensagem
          </TabsTrigger>
          <TabsTrigger value="support" className="text-sm md:text-base py-3 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
            <Headphones className="h-4 w-4 mr-2" />
            Suporte Técnico
          </TabsTrigger>
          <TabsTrigger value="sales" className="text-sm md:text-base py-3 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
            <Building className="h-4 w-4 mr-2" />
            Vendas Corporativas
          </TabsTrigger>
        </TabsList>
        
        {/* Mensagem Geral */}
        <TabsContent value="message" className="mt-0">
          <MessageForm />
        </TabsContent>
        
        {/* Suporte Técnico */}
        <TabsContent value="support" className="mt-0">
          <SupportForm />
        </TabsContent>
        
        {/* Vendas Corporativas */}
        <TabsContent value="sales" className="mt-0">
          <SalesForm />
        </TabsContent>
      </Tabs>
    </section>
  );
} 