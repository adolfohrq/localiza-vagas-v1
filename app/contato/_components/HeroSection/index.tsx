export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#003495] to-[#007cfa] py-20">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-20 bg-gradient-to-r from-[#007cfa] to-[#38bdf8] blur-[120px] transform translate-x-1/3 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-20 bg-gradient-to-r from-[#003495] to-[#0369a1] blur-[120px] transform -translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full opacity-15 bg-gradient-to-r from-[#38bdf8] to-[#007cfa] blur-[120px] transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      <div className="container relative mx-auto px-4 text-center">
        <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm mb-6">
          <span className="text-sm font-medium text-white">Estamos aqui para ajudar</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
          Fale com a <span className="text-blue-200">Localiza Vagas</span>
        </h1>
        <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10">
          Nossa equipe está pronta para atender você e sua empresa com soluções personalizadas
          para todas as suas necessidades de recrutamento.
        </p>
      </div>
    </section>
  );
} 