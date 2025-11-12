'use client'

import { CreditCard, Download, Share2, HelpCircle, FileText } from "lucide-react"
import { PageHeader, PageHeaderAction } from "@/components/ui/page-header"

export function PlansHeader() {
  // Definindo as ações do dropdown como um array de PageHeaderAction
  const dropdownActions: PageHeaderAction[] = [
    {
      label: "Histórico de pagamentos",
      icon: FileText,
      onClick: () => console.log("Histórico de pagamentos")
    },
    {
      label: "Exportar faturas",
      icon: Download,
      onClick: () => console.log("Exportar faturas")
    },
    {
      label: "Compartilhar plano",
      icon: Share2,
      onClick: () => console.log("Compartilhar plano")
    }
  ];

  return (
    <PageHeader 
      title="Planos e Pacotes"
      description="Escolha o melhor plano para sua empresa e otimize seu processo de recrutamento. Assinaturas mensais ou pacotes individuais para atender suas necessidades."
      icon={CreditCard}
      dropdownActions={dropdownActions}
      showHelpButton={true}
      onHelpClick={() => console.log("Ajuda sobre planos")}
    />
  )
} 