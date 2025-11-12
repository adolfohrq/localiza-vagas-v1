import React from 'react'
import { Badge } from "@/components/ui/badge"
import { timeline } from '../_data/timeline-data'

export function TimelineSection() {
  return (
    <section className="py-20 container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge className="mb-4 bg-blue-50 text-primary hover:bg-blue-50">Nossa Trajetória</Badge>
        <h2 className="text-3xl font-bold mb-6">Uma história de crescimento e inovação</h2>
        <p className="text-gray-600">
          Desde nossa fundação, temos trabalhado incansavelmente para transformar a forma como as pessoas encontram empregos e como as empresas descobrem talentos.
        </p>
      </div>
      
      <div className="relative">
        {/* Linha central */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-100"></div>
        
        <div className="space-y-12">
          {timeline.map((item, index) => (
            <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
              <div className="flex-1"></div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-blue-600 border-4 border-white z-10 flex items-center justify-center">
                <span className="text-white text-xs font-bold">{item.year}</span>
              </div>
              <div className="flex-1">
                <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 ml-6 ${index % 2 === 0 ? 'mr-6 ml-0 text-right' : ''}`}>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 