// Recursos extras
import { Star, Zap } from "lucide-react"

export interface ExtraFeature {
  id: string
  name: string
  description: string
  price: string
  duration: string
  icon: any
}

export const extraFeatures: ExtraFeature[] = [
  {
    id: "highlight",
    name: "Destaque na Home",
    description: "Seu anúncio aparecerá em destaque na página inicial",
    price: "R$ 75",
    duration: "15 dias",
    icon: Zap,
  },
  {
    id: "urgent",
    name: "Selo de Urgente",
    description: "Destaque a urgência da sua vaga para atrair mais candidatos",
    price: "R$ 45",
    duration: "Durante toda publicação",
    icon: Star,
  },
] 