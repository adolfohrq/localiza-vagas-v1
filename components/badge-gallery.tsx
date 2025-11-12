import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const badges = [
  { name: "Comunicador Eficaz", icon: "🎙️", description: "Excelente em comunicação verbal e escrita", unlocked: true },
  { name: "Líder Inspirador", icon: "👑", description: "Capacidade de liderar e motivar equipes", unlocked: false },
  { name: "Mestre em Negociação", icon: "🤝", description: "Habilidades avançadas de negociação", unlocked: false },
  {
    name: "Gerente de Projetos",
    icon: "📊",
    description: "Gerenciamento eficaz de projetos complexos",
    unlocked: false,
  },
  { name: "Vendedor Estrela", icon: "💼", description: "Resultados excepcionais em vendas", unlocked: false },
  { name: "Inovador Criativo", icon: "💡", description: "Pensamento inovador e soluções criativas", unlocked: true },
]

export function BadgeGallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {badges.map((badge, index) => (
        <Card key={index} className={badge.unlocked ? "bg-green-100" : "bg-gray-100"}>
          <CardContent className="p-4 text-center">
            <div className="text-4xl mb-2">{badge.icon}</div>
            <h3 className="font-bold mb-1">{badge.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
            <Badge variant={badge.unlocked ? "secondary" : "outline"}>
              {badge.unlocked ? "Conquistado" : "Bloqueado"}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

