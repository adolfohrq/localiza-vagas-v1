import { testimonials } from "@/app/_data/home-data"
import { Card, CardContent } from "@/components/ui/card"
import { QuoteIcon } from "lucide-react"
import Image from "next/image"

export function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            O que nossos usuários dizem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Histórias de sucesso de candidatos e empresas que transformaram seu processo de recrutamento
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
              <CardContent className="p-8 flex-grow flex flex-col">
                <div className="mb-6 text-blue-500">
                  <QuoteIcon size={36} strokeWidth={1.5} />
                </div>
                
                <p className="text-gray-700 mb-8 flex-grow">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center mt-auto">
                  <div className="mr-4 flex-shrink-0">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                      {testimonial.avatar ? (
                        <Image 
                          src={testimonial.avatar} 
                          alt={testimonial.author}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 text-xl font-bold">
                          {testimonial.author.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 