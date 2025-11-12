"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, AlertCircle, Loader2, ArrowRight, Github, LogIn } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useAuth, USERS } from "@/contexts/AuthContext"
import { useToast } from "@/components/ui/use-toast"

// Esquema de validação para o formulário de login
const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(1, { message: "A senha é obrigatória" }),
  rememberMe: z.boolean().optional(),
})

// Esquema de validação para o formulário de cadastro
const registerSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "Você deve aceitar os termos e condições" }),
  }),
})

type LoginFormValues = z.infer<typeof loginSchema>
type RegisterFormValues = z.infer<typeof registerSchema>

export function LoginModal({ children }: { children?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState("")
  const router = useRouter()
  const { login, user } = useAuth()
  const { toast } = useToast()

  // Usar useEffect para monitorar mudanças no usuário e redirecionar
  useEffect(() => {
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

  // Formulário de login
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  // Formulário de cadastro
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      acceptTerms: false as unknown as true,
    },
  })

  // Função para lidar com o envio do formulário de login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginError("")

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
        setIsOpen(false)
        
        // Forçar o redirecionamento aqui, não confiar apenas no useEffect
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

    setIsLoading(false)
  }

  // Função para lidar com o envio do formulário de cadastro
  async function onRegisterSubmit(data: RegisterFormValues) {
    setIsLoading(true)
    setLoginError("")
    
    try {
      // Simulação de cadastro - aqui você conectaria com sua API real
      console.log("Register data:", data)
      
      // Simulando um atraso de rede
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simulação de sucesso
      setIsOpen(false)
      toast({
        title: "Conta criada com sucesso!",
        description: "Sua conta foi criada. Você já pode fazer login.",
        variant: "default",
      })
      router.refresh()
      
    } catch (error) {
      setLoginError("Erro ao criar conta. Por favor, tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  // Função para preencher automaticamente as credenciais do usuário candidato
  const fillCandidateCredentials = () => {
    loginForm.setValue("email", "candidato@candidato.com.br")
    loginForm.setValue("password", "candidato")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="ghost" size="sm" className="text-gray-700">
            Entrar
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid grid-cols-2 w-full rounded-none h-14">
            <TabsTrigger value="login" className="text-base font-medium rounded-none data-[state=active]:bg-background">
              Entrar
            </TabsTrigger>
            <TabsTrigger value="register" className="text-base font-medium rounded-none data-[state=active]:bg-background">
              Cadastrar
            </TabsTrigger>
          </TabsList>
          
          {/* Conteúdo da aba de Login */}
          <TabsContent value="login" className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Bem-vindo de volta</h2>
                <p className="text-sm text-muted-foreground">
                  Entre com suas credenciais para acessar sua conta
                </p>
              </div>
              
              {loginError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-start text-sm">
                  <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}
              
              <Form {...loginForm}>
                <form onSubmit={handleLogin} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="seu@email.com" 
                              className="pl-10" 
                              {...field} 
                              disabled={isLoading}
                              autoComplete="email"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              type={showPassword ? "text" : "password"} 
                              placeholder="••••••••" 
                              className="pl-10 pr-10" 
                              {...field} 
                              disabled={isLoading}
                              autoComplete="current-password"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-10 w-10 p-0 text-muted-foreground"
                              onClick={() => setShowPassword(!showPassword)}
                              disabled={isLoading}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                              <span className="sr-only">
                                {showPassword ? "Esconder senha" : "Mostrar senha"}
                              </span>
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex items-center justify-between">
                    <FormField
                      control={loginForm.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={isLoading}
                              id="remember-me"
                            />
                          </FormControl>
                          <FormLabel htmlFor="remember-me" className="text-sm font-normal cursor-pointer">
                            Lembrar de mim
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <Button
                      variant="default"
                      size="sm"
                      className="px-0 font-normal text-blue-600 hover:text-blue-700 bg-transparent hover:bg-transparent"
                      asChild
                    >
                      <Link href="/recuperar-senha">Esqueceu a senha?</Link>
                    </Button>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Entrando...
                      </>
                    ) : (
                      <>
                        Entrar
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full text-blue-600 border-blue-200 hover:bg-blue-50"
                    onClick={fillCandidateCredentials}
                    disabled={isLoading}
                  >
                    Usar conta de demonstração
                  </Button>
                </form>
              </Form>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-background px-2 text-xs text-muted-foreground">
                    ou continue com
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full" disabled={isLoading}>
                  <Github className="mr-2 h-4 w-4" />
                  Github
                </Button>
                <Button variant="outline" className="w-full" disabled={isLoading}>
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Google
                </Button>
              </div>
            </div>
          </TabsContent>
          
          {/* Conteúdo da aba de Cadastro */}
          <TabsContent value="register" className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Crie sua conta</h2>
                <p className="text-sm text-muted-foreground">
                  Preencha os dados abaixo para criar sua conta
                </p>
              </div>
              
              {loginError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-start text-sm">
                  <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}
              
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                  <FormField
                    control={registerForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome completo</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Seu nome" 
                            {...field} 
                            disabled={isLoading}
                            autoComplete="name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="seu@email.com" 
                              className="pl-10" 
                              {...field} 
                              disabled={isLoading}
                              autoComplete="email"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              type={showPassword ? "text" : "password"} 
                              placeholder="••••••••" 
                              className="pl-10 pr-10" 
                              {...field} 
                              disabled={isLoading}
                              autoComplete="new-password"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-10 w-10 p-0 text-muted-foreground"
                              onClick={() => setShowPassword(!showPassword)}
                              disabled={isLoading}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                              <span className="sr-only">
                                {showPassword ? "Esconder senha" : "Mostrar senha"}
                              </span>
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="acceptTerms"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isLoading}
                            id="accept-terms"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel htmlFor="accept-terms" className="text-sm font-normal cursor-pointer">
                            Eu aceito os{" "}
                            <Link
                              href="/termos"
                              className="text-blue-600 hover:text-blue-700 hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              termos de serviço
                            </Link>{" "}
                            e{" "}
                            <Link
                              href="/privacidade"
                              className="text-blue-600 hover:text-blue-700 hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              política de privacidade
                            </Link>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Criando conta...
                      </>
                    ) : (
                      <>
                        Criar conta
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-background px-2 text-xs text-muted-foreground">
                    ou continue com
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full" disabled={isLoading}>
                  <Github className="mr-2 h-4 w-4" />
                  Github
                </Button>
                <Button variant="outline" className="w-full" disabled={isLoading}>
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Google
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
} 