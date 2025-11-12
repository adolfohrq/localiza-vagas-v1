import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs } from "@/app/_data/home-data"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function FAQ() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Encontre respostas para dúvidas comuns sobre nossa plataforma
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-gray-200 rounded-lg bg-white shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 text-left font-medium text-gray-900 hover:text-blue-600 text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-2 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Ainda tem dúvidas? Estamos aqui para ajudar!
          </p>
          <Button asChild variant="outline" className="text-blue-600 hover:text-blue-700 border-blue-200 hover:border-blue-300 px-8">
            <Link href="/suporte">
              <span className="flex items-center gap-2">
                Fale conosco
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
} 