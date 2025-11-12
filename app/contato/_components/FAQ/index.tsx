import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight } from "lucide-react"
import { faqs } from "../../_data/faqs"

export function FAQ() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Perguntas Frequentes</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Encontre respostas rápidas para as dúvidas mais comuns sobre nosso atendimento
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`faq-${index}`}
                className="border border-blue-100 rounded-lg overflow-hidden bg-white shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-blue-50 hover:no-underline">
                  <span className="text-left font-medium text-gray-900">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-10 text-center">
            <p className="text-gray-700 mb-4">Não encontrou o que procurava?</p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Ver todas as perguntas frequentes
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 