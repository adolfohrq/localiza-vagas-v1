import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, ArrowRight } from "lucide-react"
import { featuredJobs } from "@/app/_data/home-data"
import Image from "next/image"
import Link from "next/link"

export function FeaturedJobs() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Vagas em Destaque
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oportunidades selecionadas das melhores empresas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredJobs.slice(0, 6).map((job) => (
            <Card key={job.id} className="group overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
              <CardContent className="p-0 flex-grow">
                {/* Cabeçalho com badges */}
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                  <div className="flex items-start gap-2">
                    {job.isNew && (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-0">
                        Novo
                      </Badge>
                    )}
                    {job.isHot && (
                      <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 border-0">
                        Em alta
                      </Badge>
                    )}
                    {job.isUrgent && (
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-0">
                        Urgente
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{job.postedAt}</span>
                  </div>
                </div>

                {/* Conteúdo principal */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-gray-700 font-medium mb-2">{job.company}</p>
                      
                      <div className="flex items-center flex-wrap gap-3 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{job.location}</span>
                        </div>
                        <Badge variant="outline" className="font-normal bg-white">
                          {job.type}
                        </Badge>
                        <Badge variant="outline" className="font-normal bg-white">
                          {job.salary}
                        </Badge>
                      </div>
                    </div>

                    <div className="ml-4 flex-shrink-0">
                      <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
                        {job.logo ? (
                          <Image
                            src={job.logo}
                            alt={`${job.company} logo`}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        ) : (
                          <div className="text-xl font-bold text-gray-400">
                            {job.company.charAt(0)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Skills / Tags */}
                  <div className="mt-4 space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {job.tags.slice(0, 4).map((tag, i) => (
                        <Badge key={i} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-0">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Benefícios */}
                  {job.benefits && job.benefits.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Benefícios:</p>
                      <div className="flex flex-wrap gap-2">
                        {job.benefits.map((benefit, i) => (
                          <Badge key={i} variant="outline" className="bg-white font-normal">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              
              {/* Botão de Candidatura */}
              <div className="p-5 border-t border-gray-100 mt-auto">
                <Button className="w-full bg-white hover:bg-blue-50 text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 transition-colors">
                  Candidatar-se
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" className="text-blue-600 hover:text-blue-700 border-blue-200 hover:border-blue-300 px-8">
            <Link href="/vagas">
              <span className="flex items-center gap-2">
                Ver todas as vagas
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
} 