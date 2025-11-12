interface TermsHeroProps {
  lastUpdated: string
}

export function TermsHero({ lastUpdated }: TermsHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#003495] to-[#007cfa] py-16">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-20 bg-gradient-to-r from-[#007cfa] to-[#38bdf8] blur-[120px] transform translate-x-1/3 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-20 bg-gradient-to-r from-[#003495] to-[#0369a1] blur-[120px] transform -translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full opacity-15 bg-gradient-to-r from-[#38bdf8] to-[#007cfa] blur-[120px] transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      <div className="container relative mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Termos de Uso
        </h1>
        <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-4">
          Última atualização: {lastUpdated}
        </p>
        <p className="text-blue-200 max-w-2xl mx-auto">
          Por favor, leia atentamente estes termos antes de utilizar nossa plataforma
        </p>
      </div>
    </section>
  )
} 