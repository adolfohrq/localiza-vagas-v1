import React from 'react'
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, ArrowRight } from "lucide-react"
import { faqs } from '../_data/faq-data'

export function FaqSection() {
  return (
    <section className="py-20 container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge className="mb-4 bg-blue-50 text-primary hover:bg-blue-50">Perguntas Frequentes</Badge>
        <h2 className="text-3xl font-bold mb-6">Tire suas dúvidas</h2>
        <p className="text-gray-600">
          Respondemos às perguntas mais comuns sobre nossa plataforma e como podemos ajudar você a encontrar a vaga ideal ou o candidato perfeito.
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <Tabs defaultValue="candidates" className="w-full mb-8">
          <TabsList className="mb-6 bg-gray-100 p-1 w-full">
            <TabsTrigger value="candidates" className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-600">
              Para Candidatos
            </TabsTrigger>
            <TabsTrigger value="companies" className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-600">
              Para Empresas
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="candidates" className="mt-0 space-y-4">
            {faqs.slice(0, 3).map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold">{faq.question}</h3>
                  <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
                    <ChevronDown className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-gray-600 mt-4">{faq.answer}</p>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="companies" className="mt-0 space-y-4">
            {faqs.slice(2, 5).map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold">{faq.question}</h3>
                  <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
                    <ChevronDown className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-gray-600 mt-4">{faq.answer}</p>
              </div>
            ))}
          </TabsContent>
        </Tabs>
        
        <div className="text-center">
          <Link href="/contato" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
            Não encontrou o que procurava? Entre em contato
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
} 