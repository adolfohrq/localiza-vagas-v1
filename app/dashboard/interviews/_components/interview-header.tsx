"use client"

import { PageHeader, PageHeaderAction } from "@/components/ui/page-header"
import { Calendar, Mail, FileSpreadsheet, Download, CalendarDays, Settings, HelpCircle } from "lucide-react"
import { InterviewStats } from "../_types"

interface InterviewHeaderProps {
  stats: InterviewStats
}

export function InterviewHeader({ stats }: InterviewHeaderProps) {
  // Definindo as ações do dropdown
  const dropdownActions: PageHeaderAction[] = [
    {
      label: "Enviar comunicação",
      icon: Mail,
      onClick: () => console.log("Enviar comunicação")
    },
    {
      label: "Agendamento em massa",
      icon: Calendar,
      onClick: () => console.log("Agendamento em massa")
    },
    {
      label: "Criar relatório",
      icon: FileSpreadsheet,
      onClick: () => console.log("Criar relatório")
    },
    {
      label: "Exportar dados",
      icon: Download,
      onClick: () => console.log("Exportar dados")
    },
    {
      label: "Configurar agenda",
      icon: CalendarDays,
      onClick: () => console.log("Configurar agenda")
    },
    {
      label: "Preferências",
      icon: Settings,
      onClick: () => console.log("Preferências")
    }
  ]

  return (
    <PageHeader 
      title="Entrevistas"
      description="Gerencie e acompanhe as entrevistas com candidatos"
      icon={Calendar}
      badge={{
        text: stats.total.toString(),
        variant: "outline"
      }}
      primaryAction={{
        label: "Agendar Entrevista",
        shortLabel: "Agendar",
        icon: Calendar,
        onClick: () => console.log("Agendar entrevista")
      }}
      dropdownActions={dropdownActions}
      showHelpButton={true}
      onHelpClick={() => console.log("Ajuda e guias")}
    />
  )
} 