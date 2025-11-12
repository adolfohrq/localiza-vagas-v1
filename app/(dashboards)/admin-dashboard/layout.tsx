"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminDashboardNav } from "@/components/admin-dashboard-nav"
import { AdminDashboardHeader } from "@/components/admin-dashboard-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin-login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AdminDashboardHeader />
      <div className="flex-1 items-start md:grid md:grid-cols-[220px_1fr]">
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <ScrollArea className="py-6 pr-6 lg:py-8">
            <AdminDashboardNav />
          </ScrollArea>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden fixed left-4 top-4 z-40">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[280px] pr-0">
              <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
                <AdminDashboardNav />
              </ScrollArea>
            </SheetContent>
          </Sheet>
          {children}
        </main>
      </div>
    </div>
  )
}

