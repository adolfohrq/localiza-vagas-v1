'use client'

import { ArrowRight, Download, DollarSign, FileText, Share2, HelpCircle, Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PageHeader, PageHeaderAction } from "@/components/ui/page-header"

export function FinancialHeader() {
  // Definindo as ações do dropdown como um array de PageHeaderAction
  const dropdownActions: PageHeaderAction[] = [
    {
      label: "Exportar relatório",
      icon: FileText,
      onClick: () => console.log("Exportar relatório")
    },
    {
      label: "Compartilhar histórico",
      icon: Share2,
      onClick: () => console.log("Compartilhar histórico")
    },
    {
      label: "Ver faturas",
      icon: Receipt,
      onClick: () => console.log("Ver faturas")
    }
  ];

  return (
    <PageHeader 
      title="Histórico Financeiro"
      description="Acompanhe todas as suas transações e movimentações financeiras"
      icon={DollarSign}
      primaryAction={{
        label: "Exportar CSV",
        shortLabel: "Exportar",
        icon: Download,
        onClick: () => console.log("Exportar CSV")
      }}
      dropdownActions={dropdownActions}
      showHelpButton={true}
      onHelpClick={() => console.log("Ajuda sobre histórico financeiro")}
      extraContent={
        <Link href="/dashboard/plans" className="text-xs text-muted-foreground hover:text-primary flex items-center">
          Ver planos disponíveis
          <ArrowRight className="ml-1 w-3 h-3" />
        </Link>
      }
    />
  )
} 