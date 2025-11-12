import { FileText, Shield, Eye, Lock, Scale, Clock, AlertCircle } from "lucide-react"
import { LucideIcon } from "lucide-react"

// Data da última atualização dos termos
export const lastUpdated = "15 de fevereiro de 2025"

// Seções dos termos
export interface TermSection {
  id: string
  title: string
  icon: LucideIcon
}

export const sections: TermSection[] = [
  {
    id: "introducao",
    title: "Introdução",
    icon: FileText
  },
  {
    id: "definicoes",
    title: "Definições",
    icon: FileText
  },
  {
    id: "cadastro",
    title: "Cadastro e Conta",
    icon: Shield
  },
  {
    id: "servicos",
    title: "Serviços Oferecidos",
    icon: FileText
  },
  {
    id: "responsabilidades",
    title: "Responsabilidades",
    icon: Scale
  },
  {
    id: "privacidade",
    title: "Privacidade e Dados",
    icon: Lock
  },
  {
    id: "propriedade",
    title: "Propriedade Intelectual",
    icon: Shield
  },
  {
    id: "modificacoes",
    title: "Modificações nos Termos",
    icon: Clock
  },
  {
    id: "encerramento",
    title: "Encerramento de Conta",
    icon: AlertCircle
  },
  {
    id: "disposicoes",
    title: "Disposições Gerais",
    icon: FileText
  }
] 