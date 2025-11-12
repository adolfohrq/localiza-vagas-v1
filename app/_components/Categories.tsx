import { Card, CardContent } from "@/components/ui/card"
import { categories } from "@/app/_data/home-data"
import { 
  Code, 
  PenTool, 
  BarChart, 
  MessageSquare, 
  ShieldCheck, 
  Building, 
  Network, 
  HeartPulse, 
  Server, 
  DollarSign 
} from "lucide-react"

export function Categories() {
  // Mapeamento de ícones por nome de categoria
  const getIconByName = (name: string) => {
    const iconMap: Record<string, JSX.Element> = {
      "Tecnologia": <Code className="h-8 w-8 text-blue-600" />,
      "Design": <PenTool className="h-8 w-8 text-blue-600" />,
      "Marketing": <BarChart className="h-8 w-8 text-blue-600" />,
      "Atendimento": <MessageSquare className="h-8 w-8 text-blue-600" />,
      "Segurança": <ShieldCheck className="h-8 w-8 text-blue-600" />,
      "Administração": <Building className="h-8 w-8 text-blue-600" />,
      "Vendas": <DollarSign className="h-8 w-8 text-blue-600" />,
      "Redes": <Network className="h-8 w-8 text-blue-600" />,
      "Saúde": <HeartPulse className="h-8 w-8 text-blue-600" />,
      "Infraestrutura": <Server className="h-8 w-8 text-blue-600" />
    };
    
    return iconMap[name] || <Code className="h-8 w-8 text-blue-600" />;
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Explore por Categoria
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Encontre oportunidades nas principais áreas do mercado
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className="group bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-blue-50 mb-5 group-hover:bg-blue-100 transition-colors duration-300">
                  {getIconByName(category.name)}
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} vagas</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 