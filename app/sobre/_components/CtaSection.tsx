import React from 'react'
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-[#003495] to-[#007cfa] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-20 bg-gradient-to-r from-[#007cfa] to-[#38bdf8] blur-[120px] transform translate-x-1/3 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-20 bg-gradient-to-r from-[#003495] to-[#0369a1] blur-[120px] transform -translate-x-1/3 translate-y-1/3"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative">
        <h2 className="text-3xl font-bold mb-6 text-white">Pronto para encontrar sua próxima oportunidade?</h2>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
          Junte-se a milhares de profissionais e empresas que já estão transformando a forma de conectar talentos e oportunidades
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-white hover:bg-blue-50 text-blue-700">
            Buscar Vagas
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white/10">
            Para Empresas
          </Button>
        </div>
      </div>
    </section>
  )
} 