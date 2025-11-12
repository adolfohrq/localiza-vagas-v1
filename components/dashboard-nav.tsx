"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  MessageSquare,
  Settings,
  HelpCircle,
  LogOut,
  Cpu,
  CreditCard,
  CalendarIcon,
  Receipt,
  Search,
  ClipboardCheck,
} from "lucide-react"

const items = [
  {
    title: "Visão Geral",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Gerenciar Vagas",
    href: "/dashboard/jobs",
    icon: FileText,
  },
  {
    title: "Candidatos",
    href: "/dashboard/candidates",
    icon: Users,
  },
  {
    title: "Entrevistas",
    href: "/dashboard/interviews",
    icon: CalendarIcon,
  },
  {
    title: "Tarefas",
    href: "/dashboard/tasks",
    icon: ClipboardCheck,
  },
  {
    title: "Busca por IA",
    href: "/dashboard/ai-search-v2",
    icon: Search,
  },
  {
    title: "Planos e Pacotes",
    href: "/dashboard/plans",
    icon: CreditCard,
  },
  {
    title: "Histórico Financeiro",
    href: "/dashboard/financial-history",
    icon: Receipt,
  },
  {
    title: "Perfil da Empresa",
    href: "/dashboard/company",
    icon: Building2,
  },
  {
    title: "Mensagens",
    href: "/dashboard/messages",
    icon: MessageSquare,
  },
  {
    title: "Configurações",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Ajuda & Suporte",
    href: "/dashboard/support",
    icon: HelpCircle,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start gap-2 px-4">
      {items.map((item, index) => {
        const Icon = item.icon
        return (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "group flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === item.href ? "bg-accent" : "transparent",
              "transition-all duration-200",
            )}
          >
            <Icon className="mr-2 h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        )
      })}
      <Link
        href="/logout"
        className={cn(
          "group flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-destructive/10 hover:text-destructive",
          "transition-all duration-200 mt-auto",
        )}
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span>Sair</span>
      </Link>
    </nav>
  )
}

