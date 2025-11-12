"use client"

import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FAQ, Category } from "../_data/faq-data"

interface FaqContentProps {
  faqs: FAQ[]
  categories: Category[]
  type: "candidates" | "companies"
}

export function FaqContent({ faqs, categories, type }: FaqContentProps) {
  const prefix = type === "companies" ? "company-" : ""
  
  // Dividir as FAQs por categoria
  const faqsByCategory = {
    [categories[0].id]: faqs.slice(0, 3),
    [categories[1].id]: faqs.slice(3, 6),
    [categories[2].id]: faqs.slice(6, 10)
  }
  
  return (
    <div className="lg:col-span-9">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        {categories.map((category, categoryIndex) => {
          const categoryFaqs = faqsByCategory[category.id]
          return (
            <div id={`${prefix}${category.id}`} className="mb-12" key={category.id}>
              <Badge className="mb-4 bg-blue-50 text-primary hover:bg-blue-50">{category.name}</Badge>
              <h2 className="text-2xl font-bold mb-6">
                {categoryIndex === 0 && type === "candidates" && "Gerenciando sua conta e perfil"}
                {categoryIndex === 1 && type === "candidates" && "Buscando e se candidatando a vagas"}
                {categoryIndex === 2 && type === "candidates" && "Aproveitando ao máximo a plataforma"}
                
                {categoryIndex === 0 && type === "companies" && "Gerenciando sua conta empresarial"}
                {categoryIndex === 1 && type === "companies" && "Gerenciando processos seletivos"}
                {categoryIndex === 2 && type === "companies" && "Recursos avançados para recrutadores"}
              </h2>
              
              <Accordion type="single" collapsible className="w-full">
                {categoryFaqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`${type}-${category.id}-${index}`} 
                    className="border-b border-gray-200 py-2"
                  >
                    <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-primary transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pt-2 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )
        })}
      </div>
    </div>
  )
} 