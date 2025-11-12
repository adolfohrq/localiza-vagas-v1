"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

export default function LogoutPage() {
  const { logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Executa o logout
    logout()
    
    // Redireciona para a página inicial
    router.push("/")
  }, [logout, router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Saindo...</h1>
        <p className="text-muted-foreground">Você está sendo redirecionado para a página inicial.</p>
      </div>
    </div>
  )
} 