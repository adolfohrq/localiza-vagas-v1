"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/AuthContext"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { login, user, getUserRole } = useAuth()

  // Usar useEffect para monitorar mudanças no usuário e redirecionar
  useEffect(() => {
    if (user) {
      console.log("Usuário autenticado:", user)
      // Redirecionamento baseado no tipo de usuário
      if (user.role === "admin") {
        router.push("/admin-dashboard")
      } else if (user.role === "candidate") {
        router.push("/candidate-dashboard")
      } else if (user.role === "recruiter") {
        router.push("/dashboard")
      }
    }
  }, [user, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const success = await login(username, password)
      
      if (success) {
        toast({
          title: "Login bem-sucedido",
          description: "Bem-vindo ao painel de administração.",
        })
        
        // Forçar o redirecionamento aqui, não confiar apenas no useEffect
        const role = getUserRole(username)
        if (role === "admin") {
          router.push("/admin-dashboard")
        } else if (role === "candidate") {
          router.push("/candidate-dashboard")
        } else if (role === "recruiter") {
          router.push("/dashboard")
        }
      } else {
        toast({
          variant: "destructive",
          title: "Erro de login",
          description: "Usuário ou senha incorretos.",
        })
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        variant: "destructive",
        title: "Erro de login",
        description: "Ocorreu um erro ao tentar fazer login.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login de Administrador</CardTitle>
          <CardDescription>Entre com suas credenciais de administrador</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                type="text"
                placeholder="Digite seu usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

