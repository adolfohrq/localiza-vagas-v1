"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    } else if (user && user.role === "candidate") {
      router.push("/candidate-dashboard")
    }
  }, [isAuthenticated, user, router])

  // Detectar tamanho da tela para colapsar automaticamente em telas menores
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setSidebarCollapsed(true)
      } else {
        setSidebarCollapsed(false)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Verificar no carregamento inicial
    
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar 
          defaultCollapsed={sidebarCollapsed}
          showMobileTrigger={true}
          variant="default"
          showTooltipsWhenCollapsed={true}
          className="border-t-0 bg-gradient-to-b from-blue-50/30 to-white"
          onCollapseChange={(collapsed) => setSidebarCollapsed(collapsed)}
        />
        <div className={`w-full ${
          sidebarCollapsed ? 'md:ml-[70px]' : 'md:ml-[260px]'
        }`}>
          <div className="container mx-auto px-1 sm:px-4">
            <main className="p-2 sm:p-6 sm:pt-5">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

