"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const sidebarItems = [
  { title: "Cores", href: "/guia-de-estilo/cores" },
  { title: "Tipografia", href: "/guia-de-estilo/tipografia" },
  { title: "Componentes", href: "/guia-de-estilo/componentes" },
  { title: "Padrões Visuais", href: "/guia-de-estilo/padroes-visuais" },
  { title: "Notificações", href: "/guia-de-estilo/notificacoes" },
  { title: "Alertas", href: "/guia-de-estilo/alertas" },
]

export function StyleGuideSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gray-100 p-6">
      <h2 className="text-xl font-semibold mb-6">Guia de Estilo</h2>
      <nav className="space-y-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "block py-2 px-4 rounded-lg transition-colors",
              pathname === item.href ? "bg-primary text-white" : "hover:bg-gray-200",
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

