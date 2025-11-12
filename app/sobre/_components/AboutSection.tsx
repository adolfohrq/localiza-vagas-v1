import React from 'react'
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { Building, Users, Award } from "lucide-react"

export function AboutSection() {
  return (
    <section className="py-20 container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <Badge className="mb-4 bg-blue-50 text-primary hover:bg-blue-50">Nossa História</Badge>
          <h2 className="text-3xl font-bold mb-6">Conectando talentos e oportunidades desde 2018</h2>
          <p className="text-gray-600 mb-6">
            A Localiza Vagas nasceu da visão de transformar a forma como as pessoas encontram empregos e como as empresas descobrem talentos. Fundada por profissionais com vasta experiência em recrutamento e tecnologia, nossa plataforma combina o melhor da inteligência artificial com o toque humano necessário para criar conexões significativas no mercado de trabalho.
          </p>
          <p className="text-gray-600 mb-6">
            Ao longo dos anos, evoluímos de uma simples plataforma de busca de empregos para um ecossistema completo que oferece ferramentas inovadoras tanto para candidatos quanto para recrutadores. Nossa missão permanece a mesma: facilitar o encontro entre o talento certo e a oportunidade ideal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-lg">+2.500</h4>
                <p className="text-gray-600">Empresas parceiras</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-lg">+500.000</h4>
                <p className="text-gray-600">Usuários ativos</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-lg">+100.000</h4>
                <p className="text-gray-600">Contratações</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-100 rounded-lg z-0"></div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-100 rounded-lg z-0"></div>
          <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
            <Image 
              src="/placeholder.svg?height=600&width=800" 
              alt="Equipe Localiza Vagas" 
              width={800} 
              height={600} 
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
} 