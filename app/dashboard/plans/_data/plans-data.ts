// Planos de assinatura - reduzidos para 3 opções
import { Gem, Rocket, Shield } from "lucide-react"

export interface Plan {
  id: string
  name: string
  price: string
  priceComparison: string
  description: string
  popular?: boolean
  features: string[]
  icon: any
  color: string
}

export const plans: Plan[] = [
  {
    id: "basic",
    name: "Básico",
    price: "R$ 249",
    priceComparison: "R$ 50 por vaga",
    description: "Para empresas em fase inicial de recrutamento",
    features: [
      "5 Anúncios de Vagas/mês",
      "Anúncios expiram em 30 dias",
      "Acesso ao perfil de profissionais cadastrados",
      "Visualização de estatísticas básicas",
      "Download de currículos (limite mensal)",
      "Gestão simplificada de inscrições",
    ],
    icon: Shield,
    color: "blue",
  },
  {
    id: "pro",
    name: "Pro",
    price: "R$ 499",
    priceComparison: "R$ 40 por vaga",
    description: "Ideal para empresas em crescimento",
    popular: true,
    features: [
      "12 Anúncios de Vagas/mês",
      "3 Anúncios em Destaque incluídos",
      "Anúncios expiram em 60 dias",
      "Relatórios personalizados de desempenho",
      "Filtros avançados de candidatos",
      "Acesso a banco de talentos premium",
      "Atendimento prioritário",
    ],
    icon: Rocket,
    color: "purple",
  },
  {
    id: "enterprise",
    name: "Empresarial",
    price: "R$ 899",
    priceComparison: "R$ 30 por vaga",
    description: "Solução completa para grandes empresas",
    features: [
      "30 Anúncios de Vagas/mês",
      "10 Anúncios em Destaque incluídos",
      "Anúncios expiram em 90 dias",
      "Painel exclusivo de currículos segmentados",
      "Integração com sistemas de RH",
      "Análise avançada de candidatos",
      "Gestão de equipe de recrutamento",
      "Suporte dedicado 24/7",
    ],
    icon: Gem,
    color: "green",
  },
] 