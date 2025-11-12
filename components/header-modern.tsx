"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Compass,
  PlusCircle,
  ChevronDown,
  Calendar,
  BarChart3,
  Star,
  Zap,
  PanelLeft,
  FileEdit,
  GraduationCap,
  AlertCircle,
  Clock,
  Award,
} from "lucide-react"
import { LoginModal } from "@/components/login-modal"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

export function HeaderModern() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Simulação de estado de login
  const [isSearchOpen, setIsSearchOpen] = useState(false)
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
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-gradient-to-r from-[#0047ab] to-[#1ca9c9] shadow-md"
          : "bg-gradient-to-r from-[#0047ab] to-[#1ca9c9]"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-10 h-10 mr-2 overflow-hidden rounded-md bg-[#0047ab]">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0047ab] to-[#1ca9c9]"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold text-white">Localiza<span className="text-[#1ca9c9]">Vagas</span></span>
          </Link>

          {/* Navegação principal - Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink href="/" icon={<Home className="h-4 w-4 mr-1.5" />}>
              Início
            </NavLink>
            <NavLink href="/vagas" icon={<Briefcase className="h-4 w-4 mr-1.5" />}>
              Vagas
            </NavLink>
            <NavLink href="/profissionais" icon={<User className="h-4 w-4 mr-1.5" />}>
              Profissionais
            </NavLink>
            <NavLink href="/empresas" icon={<Building className="h-4 w-4 mr-1.5" />}>
              Empresas
            </NavLink>
            <NavLink href="/blog" icon={<BookOpen className="h-4 w-4 mr-1.5" />}>
              Blog
            </NavLink>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-[#0047ab]/20">
                  <span>Mais</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/sobre" className="cursor-pointer">
                    <FileText className="h-4 w-4 mr-2" />
                    <span>Sobre Nós</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/contato" className="cursor-pointer">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    <span>Contato</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/faq" className="cursor-pointer">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    <span>FAQ</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Ações do usuário - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-500 hover:text-indigo-600 hover:bg-indigo-50"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {user ? (
              <>
                {/* Notificações */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-indigo-600 hover:bg-indigo-50">
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

                {/* Avatar do usuário */}
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
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <LoginModal>
                  <Button variant="ghost" size="sm" className="text-gray-700">
                    Entrar
                  </Button>
                </LoginModal>
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700" asChild>
                  <Link href="/cadastro">
                    Cadastre-se
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Menu mobile */}
          <div className="md:hidden flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-500"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-500">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85%] sm:w-[350px]">
                <SheetHeader className="border-b pb-4">
                  <SheetTitle className="flex items-center">
                    <div className="relative w-8 h-8 mr-2 overflow-hidden rounded-md bg-indigo-600">
                      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-600"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Briefcase className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <span className="text-lg font-bold">Localiza<span className="text-indigo-600">Vagas</span></span>
                  </SheetTitle>
                </SheetHeader>

                <div className="py-4">
                  {user ? (
                    <div className="flex items-center p-3 mb-4 bg-gray-50 rounded-lg">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={user.avatar || "/avatars/default.png"} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
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
                      <LoginModal>
                        <Button variant="outline" className="w-full">
                          <LogIn className="mr-2 h-4 w-4" />
                          Entrar
                        </Button>
                      </LoginModal>
                    </div>
                  )}

                  <div className="space-y-1">
                    <MobileNavItem href="/" icon={Home}>
                      Início
                    </MobileNavItem>
                    <MobileNavItem href="/vagas" icon={Briefcase}>
                      Vagas
                    </MobileNavItem>
                    <MobileNavItem href="/profissionais" icon={User}>
                      Profissionais
                    </MobileNavItem>
                    <MobileNavItem href="/empresas" icon={Building}>
                      Empresas
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
                    <MobileNavItem href="/faq" icon={HelpCircle}>
                      Ajuda e FAQ
                    </MobileNavItem>
                  </div>

                  {user && (
                    <>
                      <div className="h-px bg-gray-200 my-4"></div>
                      <div className="space-y-1">
                        {user.role === "candidate" ? (
                          // Menu para candidatos
                          <>
                            <MobileNavItem href="/candidate-dashboard" icon={BarChart3}>Visão Geral</MobileNavItem>
                            <MobileNavItem href="/candidate-dashboard/overview-v2" icon={PanelLeft}>Visão Geral v2</MobileNavItem>
                            <MobileNavItem href="/candidate-dashboard/resume" icon={FileEdit}>Meu Currículo</MobileNavItem>
                            <MobileNavItem href="/candidate-dashboard/applications" icon={Briefcase}>Vagas Aplicadas</MobileNavItem>
                            <MobileNavItem href="/candidate-dashboard/courses" icon={GraduationCap}>Cursos e Certificações</MobileNavItem>
                            <MobileNavItem href="/candidate-dashboard/messages" icon={MessageSquare}>Mensagens</MobileNavItem>
                            <MobileNavItem href="/candidate-dashboard/notifications" icon={Bell}>Notificações</MobileNavItem>
                            <MobileNavItem href="/candidate-dashboard/interviews" icon={Calendar}>Entrevistas</MobileNavItem>
                            <MobileNavItem href="/candidate-dashboard/interviews-v2" icon={Clock}>Entrevistas v2</MobileNavItem>
                            <MobileNavItem href="/candidate-dashboard/achievements" icon={Award}>Minhas Conquistas</MobileNavItem>
                            <MobileNavItem href="/candidate-dashboard/achievements-v2" icon={Star}>Minhas Conquistas v2</MobileNavItem>
                            <MobileNavItem href="/candidate-dashboard/ai-search" icon={Search}>Busca Vaga IA</MobileNavItem>
                            <MobileNavItem href="/candidate-dashboard/settings" icon={Settings}>Configurações</MobileNavItem>
                            <MobileNavItem href="/candidate-dashboard/support" icon={HelpCircle}>Ajuda & Suporte</MobileNavItem>
                            <MobileNavItem href="/candidate-dashboard/support-v2" icon={AlertCircle}>Ajuda & Suporte v2</MobileNavItem>
                          </>
                        ) : user.role === "recruiter" ? (
                          // Menu para recrutadores (empresas)
                          <>
                            <MobileNavItem href="/dashboard" icon={BarChart3}>Visão Geral</MobileNavItem>
                            <MobileNavItem href="/dashboard/jobs" icon={Briefcase}>Gerenciar Vagas</MobileNavItem>
                            <MobileNavItem href="/dashboard/candidates" icon={User}>Candidatos</MobileNavItem>
                            <MobileNavItem href="/dashboard/interviews" icon={Calendar}>Entrevistas</MobileNavItem>
                            <MobileNavItem href="/dashboard/ai-search" icon={Search}>Busca por IA</MobileNavItem>
                            <MobileNavItem href="/dashboard/ai-search-v2" icon={Zap}>Busca por IA v2</MobileNavItem>
                            <MobileNavItem href="/dashboard/plans" icon={Star}>Planos e Pacotes</MobileNavItem>
                            <MobileNavItem href="/dashboard/financial" icon={BarChart3}>Histórico Financeiro</MobileNavItem>
                            <MobileNavItem href="/dashboard/company-profile" icon={Building}>Perfil da Empresa</MobileNavItem>
                            <MobileNavItem href="/dashboard/messages" icon={MessageSquare}>Mensagens</MobileNavItem>
                            <MobileNavItem href="/dashboard/crm" icon={Users}>CRM</MobileNavItem>
                            <MobileNavItem href="/dashboard/crm-v2" icon={UserPlus}>CRM v2</MobileNavItem>
                            <MobileNavItem href="/dashboard/settings" icon={Settings}>Configurações</MobileNavItem>
                            <MobileNavItem href="/dashboard/support" icon={HelpCircle}>Ajuda & Suporte</MobileNavItem>
                          </>
                        ) : (
                          // Menu para administradores
                          <>
                            <MobileNavItem href="/admin-dashboard" icon={BarChart3}>Visão Geral</MobileNavItem>
                            <MobileNavItem href="/admin-dashboard/users" icon={Users}>Usuários</MobileNavItem>
                            <MobileNavItem href="/admin-dashboard/companies" icon={Building}>Empresas</MobileNavItem>
                            <MobileNavItem href="/admin-dashboard/jobs" icon={Briefcase}>Vagas</MobileNavItem>
                            <MobileNavItem href="/admin-dashboard/reports" icon={BarChart3}>Relatórios</MobileNavItem>
                            <MobileNavItem href="/admin-dashboard/content" icon={FileText}>Conteúdo</MobileNavItem>
                            <MobileNavItem href="/admin-dashboard/plans" icon={Star}>Planos e Pacotes</MobileNavItem>
                            <MobileNavItem href="/admin-dashboard/settings" icon={Settings}>Configurações</MobileNavItem>
                            <MobileNavItem href="/admin-dashboard/support" icon={HelpCircle}>Suporte</MobileNavItem>
                          </>
                        )}
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
                          onClick={() => {
                            logout();
                            router.push("/");
                          }}
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
      
      {/* Barra de pesquisa expansível */}
      <div 
        className={cn(
          "bg-gray-50 border-b border-t overflow-hidden transition-all duration-300",
          isSearchOpen ? "max-h-16 py-3" : "max-h-0 py-0"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Buscar vagas, empresas ou palavras-chave..."
              className="pl-10 pr-10 py-2 bg-white border-gray-200 rounded-full w-full"
              autoFocus
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 text-gray-400 hover:text-gray-600"
              onClick={() => setIsSearchOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Barra de destaque/promoção - Aparece apenas quando não há scroll */}
      {!isScrolled && (
        <div className="bg-indigo-600 text-white py-2 px-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <Badge className="bg-white text-indigo-600 mr-2">Novo</Badge>
              <span className="text-sm">Encontre vagas remotas em todo o Brasil</span>
            </div>
            <Button variant="ghost" className="text-white text-sm p-0 h-auto hover:bg-transparent hover:text-white/80" asChild>
              <Link href="/vagas/remoto">
                Explorar
                <ChevronRight className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

// Componente para links de navegação
function NavLink({ 
  href, 
  children,
  icon
}: { 
  href: string; 
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <Button variant="ghost" size="sm" className="text-gray-700 hover:text-indigo-600 hover:bg-indigo-50" asChild>
      <Link href={href} className="flex items-center">
        {icon}
        {children}
      </Link>
    </Button>
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