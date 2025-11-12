import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { values } from '../_data/values-data'

export function ValuesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-blue-50 text-primary hover:bg-blue-50">Missão e Valores</Badge>
          <h2 className="text-3xl font-bold mb-6">O que nos guia todos os dias</h2>
          <p className="text-gray-600">
            Nossa missão é democratizar o acesso a oportunidades de trabalho e facilitar o processo de recrutamento, criando um ecossistema onde talentos e empresas possam se encontrar de forma eficiente e transparente.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <Card key={index} className="border-gray-100 hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
} 