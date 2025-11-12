import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="relative px-6 py-16 md:p-16 text-center">
            {/* Elementos decorativos */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
              <div className="absolute -top-[400px] -left-[400px] w-[800px] h-[800px] rounded-full bg-white"></div>
              <div className="absolute -bottom-[300px] -right-[300px] w-[600px] h-[600px] rounded-full bg-white"></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Pronto para transformar seu processo de recrutamento?
              </h2>
              
              <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
                Junte-se a milhares de empresas e profissionais que já estão conectados através da nossa plataforma
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg px-8 h-14 text-lg">
                  <Link href="/cadastro">
                    <span className="flex items-center gap-2">
                      Criar conta grátis
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </Link>
                </Button>
                
                <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 px-8 h-14 text-lg">
                  <Link href="/demonstracao">
                    Agendar demonstração
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 