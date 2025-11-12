import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, User, Building } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Fundo principal com gradiente 3D */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#003495] to-[#007cfa]"></div>
      
      {/* Efeito de luz/brilho */}
      <div className="absolute top-0 left-1/2 w-[1000px] h-[1000px] rounded-full bg-[#007cfa] opacity-10 blur-[120px] transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full bg-[#38bdf8] opacity-10 blur-[120px] transform translate-x-1/3 translate-y-1/3"></div>
      
      {/* Padrão de linhas */}
      <div className="absolute inset-0 opacity-5"
           style={{
             backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }}>
      </div>

      {/* Círculos decorativos animados */}
      <div className="absolute top-20 left-[10%] w-6 h-6 rounded-full bg-[#38bdf8] opacity-20"></div>
      <div className="absolute top-[30%] right-[15%] w-4 h-4 rounded-full bg-[#0ea5e9] opacity-30"></div>
      <div className="absolute bottom-[25%] left-[20%] w-8 h-8 rounded-full bg-[#60a5fa] opacity-20"></div>
      
      {/* Conteúdo principal */}
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col items-center text-center py-20 lg:py-32 px-4">
          {/* Badge de destaque */}
          <div className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 border border-white/20 mb-8">
            <span className="text-sm font-medium text-white flex items-center">
              <Badge className="mr-2 bg-gradient-to-r from-[#007cfa] to-[#38bdf8] text-white border-0">Novo</Badge>
              Matching inteligente por IA agora disponível
            </span>
          </div>
          
          {/* Título principal com efeito de destaque */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 max-w-5xl">
            Conectando <span className="relative">
              <span className="relative z-10 text-[#38bdf8]">talentos</span>
              <span className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-[#007cfa]/30 to-[#38bdf8]/30 rounded-full blur-sm"></span>
            </span> às melhores <span className="relative">
              <span className="relative z-10 text-[#38bdf8]">oportunidades</span>
              <span className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-[#007cfa]/30 to-[#38bdf8]/30 rounded-full blur-sm"></span>
            </span>
          </h1>
          
          {/* Subtítulo */}
          <p className="text-xl md:text-2xl text-blue-100/90 mb-12 max-w-3xl">
            A plataforma que revoluciona o recrutamento com tecnologia avançada e conexões perfeitas
          </p>
          
          {/* Botões de ação */}
          <div className="flex flex-wrap justify-center gap-5 mb-16">
            <Button size="lg" className="bg-gradient-to-r from-[#007cfa] to-[#0284c7] text-white hover:from-[#0284c7] hover:to-[#0369a1] shadow-lg shadow-[#007cfa]/30 h-14 px-10 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105">
              <User className="mr-2 h-5 w-5" />
              Sou Candidato
            </Button>
            <Button size="lg" className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 shadow-lg shadow-[#003495]/10 h-14 px-10 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105">
              <Building className="mr-2 h-5 w-5" />
              Sou Empresa
            </Button>
          </div>
        </div>

        {/* Formulário de busca flutuante */}
        <div className="relative -mt-8 mb-20 px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl shadow-[#003495]/20 overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="grid md:grid-cols-5 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <label htmlFor="job-search" className="text-sm font-medium text-gray-700">O que você procura?</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input 
                      id="job-search"
                      className="w-full pl-10 h-12 rounded-lg border-gray-200 focus:border-[#007cfa] focus:ring-[#007cfa]" 
                      placeholder="Cargo ou habilidade"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <label htmlFor="location-search" className="text-sm font-medium text-gray-700">Onde?</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input 
                      id="location-search"
                      className="w-full pl-10 h-12 rounded-lg border-gray-200 focus:border-[#007cfa] focus:ring-[#007cfa]" 
                      placeholder="Cidade ou remoto"
                    />
                  </div>
                </div>
                
                <div className="flex items-end">
                  <Button className="w-full bg-gradient-to-r from-[#003495] to-[#007cfa] hover:from-[#00297a] hover:to-[#0063c8] text-white h-12 rounded-lg text-base font-medium shadow-md shadow-[#007cfa]/20">
                    Buscar
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Estatísticas */}
            <div className="bg-gray-50 border-t border-gray-100 py-4 px-8 md:px-10">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-8">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#e0f2fe] flex items-center justify-center mr-3">
                      <Building className="h-5 w-5 text-[#007cfa]" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">+50K</p>
                      <p className="text-sm text-gray-500">Vagas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#e0f2fe] flex items-center justify-center mr-3">
                      <User className="h-5 w-5 text-[#007cfa]" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">+100K</p>
                      <p className="text-sm text-gray-500">Profissionais</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#e0f2fe] flex items-center justify-center mr-3">
                      <Building className="h-5 w-5 text-[#007cfa]" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">+10K</p>
                      <p className="text-sm text-gray-500">Empresas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Transição para a próxima seção */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-white" style={{ 
        clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 100%)' 
      }}></div>
    </section>
  )
} 