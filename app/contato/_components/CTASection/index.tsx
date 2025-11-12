import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#003495] to-[#007cfa] py-16">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-20 bg-gradient-to-r from-[#007cfa] to-[#38bdf8] blur-[120px] transform translate-x-1/3 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-20 bg-gradient-to-r from-[#003495] to-[#0369a1] blur-[120px] transform -translate-x-1/3 translate-y-1/3"></div>
      </div>
      
      <div className="container relative mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Pronto para transformar seu processo de recrutamento?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Junte-se a milhares de empresas que já otimizaram suas contratações com nossa plataforma
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
              Agendar Demonstração
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Conhecer Planos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 