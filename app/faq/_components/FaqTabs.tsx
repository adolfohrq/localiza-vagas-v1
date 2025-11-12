"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FaqSidebar } from "./FaqSidebar"
import { FaqContent } from "./FaqContent"
import { candidatesFAQs, companiesFAQs, candidateCategories, companyCategories } from "../_data/faq-data"

export function FaqTabs() {
  return (
    <section className="py-16 container mx-auto px-4">
      <Tabs defaultValue="candidates" className="w-full">
        <div className="flex justify-center mb-10">
          <TabsList className="bg-gray-100 p-1">
            <TabsTrigger 
              value="candidates" 
              className="px-8 py-3 rounded-md data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              Para Candidatos
            </TabsTrigger>
            <TabsTrigger 
              value="companies" 
              className="px-8 py-3 rounded-md data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              Para Empresas
            </TabsTrigger>
          </TabsList>
        </div>
        
        {/* Candidatos */}
        <TabsContent value="candidates" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <FaqSidebar categories={candidateCategories} type="candidates" />
            <FaqContent 
              faqs={candidatesFAQs} 
              categories={candidateCategories} 
              type="candidates" 
            />
          </div>
        </TabsContent>
        
        {/* Empresas */}
        <TabsContent value="companies" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <FaqSidebar categories={companyCategories} type="companies" />
            <FaqContent 
              faqs={companiesFAQs} 
              categories={companyCategories} 
              type="companies" 
            />
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
} 