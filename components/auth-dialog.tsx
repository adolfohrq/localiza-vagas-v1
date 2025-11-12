"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/AuthContext"

export function AuthDialog() {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { login, user } = useAuth()

  // Usar useEffect para monitorar mudanças no usuário e redirecionar
  React.useEffect(() => {
    if (user) {
      // Redirecionamento baseado no tipo de usuário
      if (user.role === "candidate") {
        router.push("/candidate-dashboard")
      } else if (user.role === "recruiter") {
        router.push("/dashboard")
      } else if (user.role === "admin") {
        router.push("/admin-dashboard")
      }
    }
  }, [user, router])

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const success = await login(email, password)
      
      if (success) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Redirecionando para o painel...",
        })
        setOpen(false)
        
        // Forçar o redirecionamento aqui, não confiar apenas no useEffect
        // Verificar o email para determinar o tipo de usuário
        if (email === "candidato@candidato.com.br") {
          router.push("/candidate-dashboard")
        } else if (email === "recrutador@empresa.com") {
          router.push("/dashboard")
        } else if (email === "admin@admin.com") {
          router.push("/admin-dashboard")
        }
      } else {
        toast({
          variant: "destructive",
          title: "Erro ao fazer login",
          description: "Credenciais inválidas. Tente novamente.",
        })
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: error instanceof Error ? error.message : "Ocorreu um erro inesperado.",
      })
    }

    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="hidden md:inline-flex hover:bg-primary hover:text-white transition-colors">
          Conectar / Registrar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Bem-vindo ao Localiza Vagas</DialogTitle>
          <DialogDescription>
            Conecte-se para acessar todas as funcionalidades ou crie uma nova conta.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Conectar</TabsTrigger>
            <TabsTrigger value="register">Registrar</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="text" placeholder="seu@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" name="password" type="password" />
              </div>
              <div className="space-y-2">
                <Label>Tipo de Usuário</Label>
                <RadioGroup defaultValue="candidate" name="userType">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="candidate" id="candidate" />
                    <Label htmlFor="candidate">Candidato</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="company" id="company" />
                    <Label htmlFor="company">Empresa</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="admin" />
                    <Label htmlFor="admin">Admin</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
            <div className="text-center text-sm">
              <a href="#" className="text-primary hover:underline">
                Esqueceu sua senha?
              </a>
            </div>
          </TabsContent>
          <TabsContent value="register" className="space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              Funcionalidade de registro em desenvolvimento.
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

