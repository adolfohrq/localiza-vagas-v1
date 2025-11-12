"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { ToastProvider, ToastViewport } from "@/components/ui/toast"
import { NewBadgeNotification } from "@/components/new-badge-notification"

export default function CandidateDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Verificar autenticação e redirecionamento
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    } else if (user && user.role !== "candidate") {
      if (user.role === "recruiter") {
        router.push("/dashboard")
      } else if (user.role === "admin") {
        router.push("/admin-dashboard")
      }
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
    <ToastProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:bg-gray-900">
        <DashboardHeader />
        <div className="flex pt-[65px]">
          <DashboardSidebar 
            defaultCollapsed={sidebarCollapsed}
            showMobileTrigger={true}
            variant="default"
            showTooltipsWhenCollapsed={true}
            onCollapseChange={(collapsed) => setSidebarCollapsed(collapsed)}
          />
          <div className={`w-full ${
            sidebarCollapsed ? 'md:ml-[70px]' : 'md:ml-[260px]'
          }`}>
            <div className="container mx-auto px-1 sm:px-4">
              <main className="p-2 sm:p-6">
                {children}
              </main>
            </div>
          </div>
        </div>
        <NewBadgeNotification />
        <ToastViewport />
      </div>
    </ToastProvider>
  )
} 