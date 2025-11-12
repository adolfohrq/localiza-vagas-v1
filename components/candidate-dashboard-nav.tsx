"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  Calendar,
  LifeBuoy,
  Award,
  Trophy,
  Search,
  Badge,
  BarChart3,
  Clock,
  Home,
  Sparkles,
} from "lucide-react"

const items = [
  {
    title: "Visão Geral",
    href: "/candidate-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Visão Geral v2",
    href: "/candidate-dashboard/overview-v2",
    icon: LayoutDashboard,
  },
  {
    title: "Visão Geral v3",
    href: "/candidate-dashboard/overview-v3",
    icon: Sparkles,
  },
  {
    title: "Meu Currículo",
    href: "/candidate-dashboard/resume",
    icon: FileText,
  },
  {
    title: "Vagas Aplicadas",
    href: "/candidate-dashboard/applications",
    icon: Briefcase,
  },
  {
    title: "Mensagens",
    href: "/candidate-dashboard/messages",
    icon: MessageSquare,
  },
  {
    title: "Notificações",
    href: "/candidate-dashboard/notifications",
    icon: Bell,
  },
  {
    title: "Entrevistas",
    href: "/candidate-dashboard/interviews",
    icon: Calendar,
  },
  {
    title: "Entrevistas v2",
    href: "/candidate-dashboard/entrevistas-v2",
    icon: Calendar,
  },
  {
    title: "Minhas Conquistas",
    href: "/candidate-dashboard/achievements",
    icon: Award,
  },
  {
    title: "Busca Vaga IA",
    href: "/candidate-dashboard/ai-job-search",
    icon: Search,
  },
  {
    title: "Configurações",
    href: "/candidate-dashboard/settings",
    icon: Settings,
  },
  {
    title: "Ajuda & Suporte",
    href: "/candidate-dashboard/support",
    icon: HelpCircle,
  },

]

export function CandidateDashboardNav() {
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

