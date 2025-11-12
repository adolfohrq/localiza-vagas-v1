"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import {
  Search,
  Menu,
  Bell,
  User,
  Users,
  Briefcase,
  Building,
  BookOpen,
  HelpCircle,
  FileText,
  ChevronRight,
  LogIn,
  UserPlus,
  Settings,
  LogOut,
  Heart,
  MessageSquare,
  X,
  Home,
  Zap,
  Star,
  Sparkles,
  ArrowRight,
  MapPin,
  Filter,
  Calendar,
  BarChart3,
  PanelLeft,
  FileEdit,
  GraduationCap,
  AlertCircle,
  Clock,
  Award,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export function HeaderAlt() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Simulação de estado de login
  const [searchFocused, setSearchFocused] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()

  // Detecta o scroll para mudar o estilo do header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header className="relative z-50">
      {/* Barra superior com logo e login */}
      <div 
        className={cn(
          "w-full transition-all duration-300 py-3 border-b",
          isScrolled
            ? "bg-white shadow-sm"
            : "bg-white"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center mr-3">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">Localiza</span>
                <span className="text-xl font-bold text-indigo-600">Vagas</span>
              </div>
            </Link>

            {/* Botões de login/cadastro ou perfil do usuário */}
            <div className="flex items-center space-x-2">
              {isLoggedIn ? (
                <div className="flex items-center">
                  {/* Notificações */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-indigo-600">3</Badge>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                      <div className="flex items-center justify-between px-4 py-2 border-b">
                        <h3 className="font-medium">Notificações</h3>
                        <Button variant="ghost" size="sm" className="text-xs text-indigo-600">
                          Marcar todas como lidas
                        </Button>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        <NotificationItem
                          title="Nova mensagem de recrutador"
                          description="Você recebeu uma mensagem sobre a vaga de UX Designer"
                          time="10 min atrás"
                          isNew
                        />
                        <NotificationItem
                          title="Candidatura visualizada"
                          description="Sua candidatura para Dev Frontend foi visualizada"
                          time="2 horas atrás"
                          isNew
                        />
                        <NotificationItem
                          title="Vaga recomendada"
                          description="Encontramos uma vaga que combina com seu perfil"
                          time="5 horas atrás"
                          isNew
                        />
                      </div>
                      <div className="p-2 border-t">
                        <Button variant="ghost" size="sm" className="w-full justify-center text-indigo-600">
                          Ver todas as notificações
                        </Button>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Menu do usuário */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar>
                          <AvatarImage src={user.avatar || "/avatars/default.png"} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user.name}</p>
                          <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      
                      {user.role === "candidate" ? (
                        // Menu para candidatos
                        <>
                          <DropdownMenuItem asChild>
                            <Link href="/candidate-dashboard" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-indigo-50 rounded-md p-2">
                              <BarChart3 className="mr-2 h-4 w-4" />
                              <span>Visão Geral</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/candidate-dashboard/overview-v2" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-indigo-50 rounded-md p-2">
                              <PanelLeft className="mr-2 h-4 w-4" />
                              <span>Visão Geral v2</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/candidate-dashboard/resume" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-indigo-50 rounded-md p-2">
                              <FileEdit className="mr-2 h-4 w-4" />
                              <span>Meu Currículo</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/candidate-dashboard/applications" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-indigo-50 rounded-md p-2">
                              <Briefcase className="mr-2 h-4 w-4" />
                              <span>Vagas Aplicadas</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/candidate-dashboard/courses" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-indigo-50 rounded-md p-2">
                              <GraduationCap className="mr-2 h-4 w-4" />
                              <span>Cursos e Certificações</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/candidate-dashboard/messages" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-indigo-50 rounded-md p-2">
                              <MessageSquare className="mr-2 h-4 w-4" />
                              <span>Mensagens</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/candidate-dashboard/notifications" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-indigo-50 rounded-md p-2">
                              <Bell className="mr-2 h-4 w-4" />
                              <span>Notificações</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/candidate-dashboard/interviews" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-indigo-50 rounded-md p-2">
                              <Calendar className="mr-2 h-4 w-4" />
                              <span>Entrevistas</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/candidate-dashboard/interviews-v2" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-indigo-50 rounded-md p-2">
                              <Clock className="mr-2 h-4 w-4" />
                              <span>Entrevistas v2</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/candidate-dashboard/achievements" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-indigo-50 rounded-md p-2">
                              <Award className="mr-2 h-4 w-4" />
                              <span>Minhas Conquistas</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/candidate-dashboard/achievements-v2" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-indigo-50 rounded-md p-2">
                              <Star className="mr-2 h-4 w-4" />
                              <span>Minhas Conquistas v2</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/candidate-dashboard/ai-search" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-indigo-50 rounded-md p-2">
                              <Search className="mr-2 h-4 w-4" />
                              <span>Busca Vaga IA</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/candidate-dashboard/settings" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-indigo-50 rounded-md p-2">
                              <Settings className="mr-2 h-4 w-4" />
                              <span>Configurações</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/candidate-dashboard/support" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-indigo-50 rounded-md p-2">
                              <HelpCircle className="mr-2 h-4 w-4" />
                              <span>Ajuda & Suporte</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/candidate-dashboard/support-v2" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-indigo-50 rounded-md p-2">
                              <AlertCircle className="mr-2 h-4 w-4" />
                              <span>Ajuda & Suporte v2</span>
                            </Link>
                          </DropdownMenuItem>
                        </>
                      ) : user.role === "recruiter" ? (
                        // Menu para recrutadores (empresas)
                        <>
                          <DropdownMenuItem asChild>
                            <Link href="/dashboard" className="flex items-center">
                              <BarChart3 className="mr-2 h-4 w-4" />
                              <span>Visão Geral</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/dashboard/jobs" className="flex items-center">
                              <Briefcase className="mr-2 h-4 w-4" />
                              <span>Gerenciar Vagas</span>
                            </Link>
                          </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                            <Link href="/dashboard/candidates" className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                              <span>Candidatos</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/dashboard/interviews" className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4" />
                              <span>Entrevistas</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/dashboard/ai-search" className="flex items-center">
                              <Search className="mr-2 h-4 w-4" />
                              <span>Busca por IA</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/dashboard/ai-search-v2" className="flex items-center">
                              <Zap className="mr-2 h-4 w-4" />
                              <span>Busca por IA v2</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/dashboard/plans" className="flex items-center">
                              <Star className="mr-2 h-4 w-4" />
                              <span>Planos e Pacotes</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/dashboard/financial" className="flex items-center">
                              <BarChart3 className="mr-2 h-4 w-4" />
                              <span>Histórico Financeiro</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/dashboard/company-profile" className="flex items-center">
                              <Building className="mr-2 h-4 w-4" />
                              <span>Perfil da Empresa</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/dashboard/messages" className="flex items-center">
                              <MessageSquare className="mr-2 h-4 w-4" />
                              <span>Mensagens</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/dashboard/crm" className="flex items-center">
                              <Users className="mr-2 h-4 w-4" />
                              <span>CRM</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/dashboard/crm-v2" className="flex items-center">
                              <UserPlus className="mr-2 h-4 w-4" />
                              <span>CRM v2</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/dashboard/settings" className="flex items-center">
                              <Settings className="mr-2 h-4 w-4" />
                              <span>Configurações</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/dashboard/support" className="flex items-center">
                              <HelpCircle className="mr-2 h-4 w-4" />
                              <span>Ajuda & Suporte</span>
                            </Link>
                          </DropdownMenuItem>
                        </>
                      ) : (
                        // Menu para administradores
                        <>
                          <DropdownMenuItem asChild>
                            <Link href="/admin-dashboard" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-indigo-50 rounded-md p-2">
                              <BarChart3 className="mr-2 h-4 w-4" />
                              <span>Visão Geral</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/admin-dashboard/users" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-indigo-50 rounded-md p-2">
                              <Users className="mr-2 h-4 w-4" />
                              <span>Usuários</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/admin-dashboard/companies" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-indigo-50 rounded-md p-2">
                              <Building className="mr-2 h-4 w-4" />
                              <span>Empresas</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                            <Link href="/admin-dashboard/jobs" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-indigo-50 rounded-md p-2">
                          <Briefcase className="mr-2 h-4 w-4" />
                              <span>Vagas</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/admin-dashboard/reports" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-indigo-50 rounded-md p-2">
                              <BarChart3 className="mr-2 h-4 w-4" />
                              <span>Relatórios</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/admin-dashboard/content" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-indigo-50 rounded-md p-2">
                              <FileText className="mr-2 h-4 w-4" />
                              <span>Conteúdo</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                            <Link href="/admin-dashboard/plans" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-indigo-50 rounded-md p-2">
                              <Star className="mr-2 h-4 w-4" />
                              <span>Planos e Pacotes</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                            <Link href="/admin-dashboard/settings" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-indigo-50 rounded-md p-2">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Configurações</span>
                        </Link>
                      </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/admin-dashboard/support" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-indigo-50 rounded-md p-2">
                              <HelpCircle className="mr-2 h-4 w-4" />
                              <span>Suporte</span>
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}
                      
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => {
                          logout();
                          router.push("/");
                        }}
                        className="text-red-600 cursor-pointer transition-colors duration-200 hover:bg-red-50 rounded-md p-2 flex items-center"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sair</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="hidden sm:flex" asChild>
                    <Link href="/login">
                      <LogIn className="mr-2 h-4 w-4" />
                      Entrar
                    </Link>
                  </Button>
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700" asChild>
                    <Link href="/cadastro">
                      <UserPlus className="mr-2 h-4 w-4 sm:block hidden" />
                      <span className="sm:block hidden">Cadastre-se</span>
                      <span className="sm:hidden">Entrar</span>
                    </Link>
                  </Button>
                </div>
              )}

              {/* Menu mobile */}
              <div className="md:hidden ml-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[85%] sm:w-[350px]">
                    <SheetHeader className="border-b pb-4">
                      <SheetTitle className="flex items-center">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center mr-2">
                          <Briefcase className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-lg font-bold">
                          <span className="text-gray-900">Localiza</span>
                          <span className="text-indigo-600">Vagas</span>
                        </span>
                      </SheetTitle>
                    </SheetHeader>

                    <div className="py-4">
                      {isLoggedIn ? (
                        <div className="flex items-center p-3 mb-4 bg-gray-50 rounded-lg">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                            <User className="h-5 w-5 text-indigo-600" />
                          </div>
                          <div>
                            <p className="font-medium">Ana Silva</p>
                            <p className="text-xs text-gray-500">ana.silva@email.com</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col space-y-2 mb-4">
                          <Button className="w-full bg-indigo-600 hover:bg-indigo-700" asChild>
                            <Link href="/cadastro">
                              <UserPlus className="mr-2 h-4 w-4" />
                              Cadastre-se
                            </Link>
                          </Button>
                          <Button variant="outline" className="w-full" asChild>
                            <Link href="/login">
                              <LogIn className="mr-2 h-4 w-4" />
                              Entrar
                            </Link>
                          </Button>
                        </div>
                      )}

                      <div className="space-y-1">
                        <MobileNavItem href="/" icon={Home}>
                          Início
                        </MobileNavItem>
                        <MobileNavItem href="/vagas" icon={Briefcase}>
                          Buscar Vagas
                        </MobileNavItem>
                        <MobileNavItem href="/vagas-destaque" icon={Star}>
                          Vagas em Destaque
                        </MobileNavItem>
                        <MobileNavItem href="/para-candidatos" icon={User}>
                          Para Candidatos
                        </MobileNavItem>
                        <MobileNavItem href="/para-empresas" icon={Building}>
                          Para Empresas
                        </MobileNavItem>
                        <MobileNavItem href="/blog" icon={BookOpen}>
                          Blog
                        </MobileNavItem>
                        <MobileNavItem href="/sobre" icon={FileText}>
                          Sobre Nós
                        </MobileNavItem>
                        <MobileNavItem href="/contato" icon={MessageSquare}>
                          Contato
                        </MobileNavItem>
                      </div>

                      {isLoggedIn && (
                        <>
                          <div className="h-px bg-gray-200 my-4"></div>
                          <div className="space-y-1">
                            <MobileNavItem href="/perfil" icon={User}>
                              Meu Perfil
                            </MobileNavItem>
                            <MobileNavItem href="/candidaturas" icon={Briefcase}>
                              Minhas Candidaturas
                            </MobileNavItem>
                            <MobileNavItem href="/vagas-salvas" icon={Heart}>
                              Vagas Salvas
                            </MobileNavItem>
                            <MobileNavItem href="/configuracoes" icon={Settings}>
                              Configurações
                            </MobileNavItem>
                            <Button 
                              variant="ghost" 
                              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => setIsLoggedIn(false)}
                            >
                              <LogOut className="mr-2 h-4 w-4" />
                              Sair
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de navegação e pesquisa */}
      <div className="bg-gray-50 border-b py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Barra de pesquisa */}
            <div 
              className={cn(
                "w-full md:w-auto md:flex-1 max-w-2xl transition-all duration-300 rounded-xl",
                searchFocused ? "ring-2 ring-indigo-300" : ""
              )}
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="search"
                  placeholder="Buscar vagas, empresas ou palavras-chave..."
                  className="pl-10 pr-4 py-2 h-12 rounded-xl border-gray-200 w-full focus:border-indigo-300 focus:ring-0"
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <div className="h-8 w-px bg-gray-200 mx-2"></div>
                  <Button variant="ghost" size="sm" className="mr-1 text-gray-500 hover:text-indigo-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">Localização</span>
                  </Button>
                  <div className="h-8 w-px bg-gray-200 mx-2"></div>
                  <Button variant="ghost" size="sm" className="mr-1 text-gray-500 hover:text-indigo-600">
                    <Filter className="h-4 w-4 mr-1" />
                    <span className="text-sm">Filtros</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Navegação principal - Desktop */}
            <nav className="hidden md:flex items-center space-x-1">
              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-indigo-600 hover:bg-indigo-50" asChild>
                <Link href="/vagas">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Vagas
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-indigo-600 hover:bg-indigo-50" asChild>
                <Link href="/empresas">
                  <Building className="h-4 w-4 mr-2" />
                  Empresas
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-indigo-600 hover:bg-indigo-50" asChild>
                <Link href="/blog">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Blog
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-indigo-600 hover:bg-indigo-50" asChild>
                <Link href="/sobre">
                  <FileText className="h-4 w-4 mr-2" />
                  Sobre
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </div>

      {/* Barra de categorias populares */}
      <div className="bg-white py-2 border-b hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <span className="text-sm font-medium text-gray-500">Categorias Populares:</span>
              <div className="flex items-center space-x-4">
                <Link href="/vagas/tecnologia" className="text-sm text-gray-600 hover:text-indigo-600 flex items-center">
                  <Zap className="h-3 w-3 mr-1 text-indigo-500" />
                  Tecnologia
                </Link>
                <Link href="/vagas/marketing" className="text-sm text-gray-600 hover:text-indigo-600 flex items-center">
                  <Sparkles className="h-3 w-3 mr-1 text-indigo-500" />
                  Marketing
                </Link>
                <Link href="/vagas/vendas" className="text-sm text-gray-600 hover:text-indigo-600 flex items-center">
                  <Star className="h-3 w-3 mr-1 text-indigo-500" />
                  Vendas
                </Link>
                <Link href="/vagas/design" className="text-sm text-gray-600 hover:text-indigo-600 flex items-center">
                  <Sparkles className="h-3 w-3 mr-1 text-indigo-500" />
                  Design
                </Link>
                <Link href="/vagas/remoto" className="text-sm text-gray-600 hover:text-indigo-600 flex items-center">
                  <Home className="h-3 w-3 mr-1 text-indigo-500" />
                  Remoto
                </Link>
              </div>
            </div>
            <Link href="/vagas/todas-categorias" className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
              Ver todas
              <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Barra de promoção - Aparece apenas quando não há scroll */}
      {!isScrolled && (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 text-center text-sm">
          <span className="font-medium">Novo!</span> Planos premium com 30% de desconto até 30/03 
          <Link href="/planos" className="ml-2 underline hover:text-indigo-100">Saiba mais</Link>
        </div>
      )}
    </header>
  )
}

// Componente para itens de notificação
function NotificationItem({ 
  title, 
  description, 
  time, 
  isNew = false 
}: { 
  title: string; 
  description: string; 
  time: string; 
  isNew?: boolean 
}) {
  return (
    <div className={cn(
      "flex items-start p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100",
      isNew && "bg-indigo-50/50"
    )}>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="font-medium text-sm">{title}</p>
          {isNew && <Badge className="bg-indigo-600 text-[10px]">Novo</Badge>}
        </div>
        <p className="text-xs text-gray-600 mt-1">{description}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  )
}

// Componente para itens do menu mobile
function MobileNavItem({ 
  children, 
  href, 
  icon: Icon 
}: { 
  children: React.ReactNode; 
  href: string; 
  icon: React.ComponentType<{ className?: string }> 
}) {
  return (
    <SheetClose asChild>
      <Link 
        href={href}
        className="flex items-center py-3 px-2 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600"
      >
        <Icon className="h-5 w-5 mr-3 text-gray-500" />
        <span className="font-medium">{children}</span>
        <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
      </Link>
    </SheetClose>
  )
} 