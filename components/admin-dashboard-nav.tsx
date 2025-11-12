"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Building2,
  Settings,
  HelpCircle,
  LogOut,
  FileText,
  BarChart3,
  Package,
} from "lucide-react"

const items = [
  {
    title: "Visão Geral",
    href: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Usuários",
    href: "/admin-dashboard/users",
    icon: Users,
  },
  {
    title: "Empresas",
    href: "/admin-dashboard/companies",
    icon: Building2,
  },
  {
    title: "Vagas",
    href: "/admin-dashboard/jobs",
    icon: Briefcase,
  },
  {
    title: "Relatórios",
    href: "/admin-dashboard/reports",
    icon: BarChart3,
  },
  {
    title: "Conteúdo",
    href: "/admin-dashboard/content",
    icon: FileText,
  },
  {
    title: "Planos e Pacotes",
    href: "/admin-dashboard/subscriptions",
    icon: Package,
  },
  {
    title: "Configurações",
    href: "/admin-dashboard/settings",
    icon: Settings,
  },
  {
    title: "Suporte",
    href: "/admin-dashboard/support",
    icon: HelpCircle,
  },
]

export function AdminDashboardNav() {
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

