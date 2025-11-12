import { features } from "@/app/_data/home-data"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Search, 
  Zap, 
  ThumbsUp, 
  Layers, 
  Clock, 
  MessageSquare 
} from "lucide-react"

export function Features() {
  // Mapeamento de ícones por título
  const getIconByTitle = (title: string) => {
    const iconMap: Record<string, JSX.Element> = {
      "Busca Inteligente": <Search className="h-10 w-10 text-blue-600" />,
      "Matching por IA": <Zap className="h-10 w-10 text-blue-600" />,
      "Perfil Destacado": <ThumbsUp className="h-10 w-10 text-blue-600" />,
      "Multicanais": <Layers className="h-10 w-10 text-blue-600" />,
      "Processos Otimizados": <Clock className="h-10 w-10 text-blue-600" />,
      "Comunicação Direta": <MessageSquare className="h-10 w-10 text-blue-600" />
    };
    
    return iconMap[title] || <Search className="h-10 w-10 text-blue-600" />;
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Por que escolher nossa plataforma?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ferramentas poderosas para impulsionar sua carreira ou encontrar os melhores talentos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300">
              <CardContent className="p-8">
                <div className="mb-6 w-16 h-16 rounded-lg flex items-center justify-center bg-blue-50">
                  {getIconByTitle(feature.title)}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 