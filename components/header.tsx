"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { cn } from "@/lib/utils"
import {
  Search,
  Menu,
  Bell,
  User,
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
  ChevronDown,
  FileEdit,
  GraduationCap,
  Award,
  Clock,
  BarChart3,
  Mail,
  Bookmark,
  AlertCircle,
  PanelLeft,
  Zap,
  Lightbulb,
  Newspaper,
  Calendar,
  Star,
  Users,
  MoreHorizontal,
  LayoutDashboard,
  Building2,
  Circle,
  Send,
  Plus,
  CreditCard,
} from "lucide-react"
import { LoginModal } from "@/components/login-modal"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isNotificationsClosing, setIsNotificationsClosing] = useState(false)
  const [isMessagesClosing, setIsMessagesClosing] = useState(false)
  const [showNewMessageForm, setShowNewMessageForm] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const notificationsTriggerRef = useRef<HTMLButtonElement>(null)
  const messagesTriggerRef = useRef<HTMLButtonElement>(null)
  const messagesDropdownRef = useRef<HTMLDivElement>(null)

  // Lista de contatos para nova conversa
  const contacts = [
    { id: 1, name: "João Silva", company: "Candidato", avatar: "/avatars/joao.png" },
    { id: 2, name: "Maria Oliveira", company: "Candidata", avatar: "/avatars/maria.png" },
    { id: 3, name: "Pedro Santos", company: "Candidato", avatar: "/avatars/pedro.png" },
    { id: 4, name: "Ana Costa", company: "Candidata", avatar: "/avatars/ana.png" },
    { id: 5, name: "Suporte LocalizaVagas", company: "Suporte", avatar: "/avatars/support.png" },
  ]

  // Função para fechar o dropdown de mensagens com animação
  const closeMessagesDropdownWithAnimation = (navigateTo?: string) => {
    setIsMessagesClosing(true);
    
    let dropdownClosed = false;
    
    const forceClose = () => {
      if (!dropdownClosed && messagesTriggerRef.current) {
        dropdownClosed = true;
        messagesTriggerRef.current.click();
      }
    };
    
    setTimeout(() => {
      forceClose();
      
      setTimeout(() => {
        if (navigateTo) {
          forceClose();
          router.push(navigateTo);
          
          setTimeout(() => {
            setIsMessagesClosing(false);
          }, 500);
        } else {
          setIsMessagesClosing(false);
        }
      }, 100);
    }, 300);
  }

  // Função para iniciar nova conversa
  const startNewConversation = (contactId: number) => {
    setShowNewMessageForm(false);
    closeMessagesDropdownWithAnimation(`/dashboard/messages/conversation/${contactId}`);
  }

  // Função para fechar o dropdown de notificações com animação
  const closeNotificationsDropdownWithAnimation = (navigateTo?: string) => {
    setIsNotificationsClosing(true);
    
    let dropdownClosed = false;
    
    const forceClose = () => {
      if (!dropdownClosed && notificationsTriggerRef.current) {
        dropdownClosed = true;
        notificationsTriggerRef.current.click();
      }
    };
    
    setTimeout(() => {
      forceClose();
      
      setTimeout(() => {
        if (navigateTo) {
          forceClose();
          router.push(navigateTo);
          
          setTimeout(() => {
            setIsNotificationsClosing(false);
          }, 500);
        } else {
          setIsNotificationsClosing(false);
        }
      }, 100);
    }, 300);
  }

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

  // Função para lidar com o logout
  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white shadow-md"
          : "bg-white"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-10 h-10 mr-2 overflow-hidden rounded-md bg-blue-600">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-blue-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold">Localiza<span className="text-blue-600">Vagas</span></span>
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
                <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50">
                  <span>Mais</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/sobre" className="cursor-pointer transition-colors duration-200 hover:bg-blue-50 rounded-md p-2 flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    <span>Sobre Nós</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/contato" className="cursor-pointer transition-colors duration-200 hover:bg-blue-50 rounded-md p-2 flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    <span>Contato</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/faq" className="cursor-pointer transition-colors duration-200 hover:bg-blue-50 rounded-md p-2 flex items-center">
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
              className="text-gray-500 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {isAuthenticated ? (
              <>
                {/* Notificações */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      ref={notificationsTriggerRef}
                      variant="ghost" 
                      size="icon" 
                      className="relative text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                      aria-label="Notificações"
                    >
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-600 rounded-full flex items-center justify-center text-[10px] text-white font-medium">5</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    className={cn(
                      "w-96 p-0 overflow-hidden transition-all duration-300",
                      isNotificationsClosing && "opacity-0 translate-y-2 scale-95"
                    )}
                  >
                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-lg">Notificações</h3>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20 rounded-full" aria-label="Opções de notificações">
                            <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                      </div>
                      <p className="text-xs text-blue-100 mt-1">5 notificações não lidas</p>
                    </div>
                    
                    <div className="max-h-[400px] overflow-y-auto">
                      <div className="p-2">
                      <NotificationItem
                          title="Nova candidatura" 
                          description="João Silva se candidatou para a vaga de Desenvolvedor Frontend"
                          time="Agora mesmo"
                          isNew={true}
                          type="candidatura"
                        />
                        
                      <NotificationItem
                          title="Vaga em destaque" 
                          description="Sua vaga de UX Designer está recebendo muitas visualizações"
                          time="30 minutos atrás"
                          isNew={true}
                          type="vaga"
                        />
                        
                        <NotificationItem 
                          title="Entrevista agendada" 
                          description="Entrevista com Maria Oliveira confirmada para amanhã às 14h"
                        time="2 horas atrás"
                          isNew={true}
                          type="entrevista"
                      />
                        
                      <NotificationItem
                          title="Vaga expirando" 
                          description="A vaga de Marketing Digital expira em 2 dias"
                        time="5 horas atrás"
                          isNew={true}
                          type="alerta"
                        />
                        
                        <NotificationItem 
                          title="Fatura disponível" 
                          description="Sua fatura de maio está disponível para pagamento"
                          time="1 dia atrás"
                          isNew={true}
                          type="fatura"
                      />
                    </div>
                      
                      <div className="p-3 border-t text-center">
                        <Button 
                          variant="ghost" 
                          className="text-sm text-blue-600 hover:text-blue-600 hover:bg-blue-50 w-full"
                          onClick={() => closeNotificationsDropdownWithAnimation("/dashboard/notifications")}
                          aria-label="Ver todas as notificações"
                        >
                        Ver todas as notificações
                      </Button>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Mensagens */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      ref={messagesTriggerRef}
                      variant="ghost" 
                      size="icon" 
                      className="relative text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                      aria-label="Mensagens"
                    >
                      <MessageSquare className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-600 rounded-full flex items-center justify-center text-[10px] text-white font-medium">2</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    className={cn(
                      "w-96 p-0 overflow-hidden transition-all duration-300",
                      isMessagesClosing && "opacity-0 translate-y-2 scale-95"
                    )}
                    ref={messagesDropdownRef}
                  >
                    {!showNewMessageForm ? (
                      <>
                        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-lg">Mensagens</h3>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20 rounded-full" aria-label="Opções de mensagens">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                      </div>
                          </div>
                          <p className="text-xs text-blue-100 mt-1">2 mensagens não lidas</p>
                        </div>
                        
                        <div className="p-3 border-b border-gray-100 bg-gray-50">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input 
                              placeholder="Pesquisar mensagens..." 
                              className="pl-9 py-2 bg-white border-gray-200 rounded-full text-sm"
                              aria-label="Pesquisar mensagens"
                            />
                          </div>
                        </div>
                        
                        <div className="max-h-[400px] overflow-y-auto divide-y divide-gray-100">
                          <MessageItem
                            sender="João Silva"
                            company="Candidato"
                            avatar="/avatars/joao.png"
                            message="Olá! Tenho interesse na vaga de Desenvolvedor Frontend. Poderia me dar mais informações sobre os requisitos?"
                            time="15 min atrás"
                            isUnread
                          />
                          <MessageItem
                            sender="Maria Oliveira"
                            company="Candidata"
                            avatar="/avatars/maria.png"
                            message="Gostaria de saber mais detalhes sobre a vaga de UX Designer. Qual é o prazo para envio do portfólio?"
                            time="2 horas atrás"
                            isUnread
                          />
                          <MessageItem
                            sender="Equipe LocalizaVagas"
                            company="LocalizaVagas"
                            avatar="/avatars/support.png"
                            message="Sua vaga foi publicada com sucesso! Confira as estatísticas de visualização no painel."
                            time="1 dia atrás"
                          />
                          <MessageItem
                            sender="Pedro Santos"
                            company="Candidato"
                            avatar="/avatars/pedro.png"
                            message="Obrigado pelo retorno! Estou disponível para a entrevista na data sugerida."
                            time="2 dias atrás"
                          />
                        </div>
                        
                        <div className="bg-gray-50 p-3 border-t">
                          <div className="flex items-center justify-between">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs border-blue-200 text-blue-600 hover:bg-blue-50"
                              onClick={() => closeMessagesDropdownWithAnimation('/dashboard/messages')}
                              aria-label="Ver todas as mensagens"
                            >
                              Ver todas as mensagens
                            </Button>
                            <Button 
                              variant="default" 
                              size="sm" 
                              className="text-xs bg-blue-600 hover:bg-blue-700 flex items-center"
                              onClick={() => setShowNewMessageForm(true)}
                              aria-label="Iniciar nova conversa"
                            >
                              <Send className="h-3.5 w-3.5 mr-1.5" />
                              Nova conversa
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-lg">Nova Conversa</h3>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-white hover:bg-white/20 rounded-full"
                              onClick={() => setShowNewMessageForm(false)}
                              aria-label="Fechar nova conversa"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-blue-100 mt-1">Selecione um contato para iniciar</p>
                        </div>
                        
                        <div className="p-3 border-b border-gray-100 bg-gray-50">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input 
                              placeholder="Buscar contatos..." 
                              className="pl-9 py-2 bg-white border-gray-200 rounded-full text-sm"
                              aria-label="Buscar contatos"
                            />
                          </div>
                        </div>
                        
                        <div className="max-h-[400px] overflow-y-auto divide-y divide-gray-100">
                          {contacts.map((contact) => (
                            <div 
                              key={contact.id}
                              className="flex items-center p-3 hover:bg-blue-50 cursor-pointer transition-colors duration-150"
                              onClick={() => startNewConversation(contact.id)}
                            >
                              <Avatar className="h-10 w-10 mr-3 flex-shrink-0 border border-gray-100">
                                <AvatarImage src={contact.avatar} alt={contact.name} />
                                <AvatarFallback className="bg-blue-100 text-blue-600 text-xs font-medium">{contact.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{contact.name}</p>
                                <p className="text-xs text-gray-500">{contact.company}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Avatar do usuário */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 h-10 px-2 py-1 rounded-full hover:bg-blue-50" aria-label="Menu do perfil">
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user?.avatar || "/avatars/default.png"} alt={user?.name || "Usuário"} />
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {user?.name?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="hidden md:flex flex-col items-start">
                        <span className="text-sm font-medium leading-none">{user?.name || "Usuário"}</span>
                        <span className="text-xs text-muted-foreground mt-1">
                          {user?.role === "recruiter" ? "Empresa" : 
                          user?.role === "candidate" ? "Candidato" : 
                          user?.role === "admin" ? "Administrador" : "Usuário"}
                        </span>
                      </div>
                      <div className="hidden md:block text-gray-400">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64">
                    <div className="p-3 border-b bg-gradient-to-r from-blue-100 to-blue-50">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                          <AvatarImage src={user?.avatar || "/avatars/default.png"} alt={user?.name || "Usuário"} />
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {user?.name?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <p className="text-sm font-semibold">{user?.name || "Usuário"}</p>
                          <Badge variant="outline" className="text-xs px-2 py-0 h-5 bg-blue-100 text-blue-600 border-blue-200">
                            {user?.role === "recruiter" ? "Empresa" : 
                            user?.role === "candidate" ? "Candidato" : 
                            user?.role === "admin" ? "Administrador" : "Usuário"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-2">
                      <DropdownMenuLabel className="text-xs text-muted-foreground font-normal px-3 py-1.5">PRINCIPAL</DropdownMenuLabel>
                      
                      <DropdownMenuItem onClick={() => router.push("/dashboard")} className="px-3 py-2 cursor-pointer" aria-label="Ir para dashboard">
                        <LayoutDashboard className="mr-2 h-4 w-4 text-blue-600" />
                        <span>Dashboard</span>
                        </DropdownMenuItem>
                      
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuLabel className="text-xs text-muted-foreground font-normal px-3 py-1.5">PÁGINAS DO SITE</DropdownMenuLabel>
                      
                      <DropdownMenuItem onClick={() => router.push("/")} className="px-3 py-2 cursor-pointer" aria-label="Ir para página inicial">
                        <Home className="mr-2 h-4 w-4 text-blue-600" />
                        <span>Página Inicial</span>
                        </DropdownMenuItem>
                      
                      <DropdownMenuItem onClick={() => router.push("/vagas")} className="px-3 py-2 cursor-pointer" aria-label="Ir para vagas públicas">
                        <Briefcase className="mr-2 h-4 w-4 text-blue-600" />
                            <span>Vagas</span>
                        </DropdownMenuItem>
                      
                      <DropdownMenuItem onClick={() => router.push("/empresas")} className="px-3 py-2 cursor-pointer" aria-label="Ir para empresas">
                        <Building2 className="mr-2 h-4 w-4 text-blue-600" />
                        <span>Empresas</span>
                        </DropdownMenuItem>
                      
                      <DropdownMenuItem onClick={() => router.push("/profissionais")} className="px-3 py-2 cursor-pointer" aria-label="Ir para profissionais">
                        <Users className="mr-2 h-4 w-4 text-blue-600" />
                        <span>Profissionais</span>
                        </DropdownMenuItem>
                      
                      <DropdownMenuItem onClick={() => router.push("/blog")} className="px-3 py-2 cursor-pointer" aria-label="Ir para blog">
                        <FileText className="mr-2 h-4 w-4 text-blue-600" />
                        <span>Blog</span>
                        </DropdownMenuItem>
                      
                      <DropdownMenuItem onClick={() => router.push("/sobre")} className="px-3 py-2 cursor-pointer" aria-label="Ir para sobre">
                        <User className="mr-2 h-4 w-4 text-blue-600" />
                        <span>Sobre</span>
                        </DropdownMenuItem>
                      
                      <DropdownMenuItem onClick={() => router.push("/contato")} className="px-3 py-2 cursor-pointer" aria-label="Ir para contato">
                        <MessageSquare className="mr-2 h-4 w-4 text-blue-600" />
                        <span>Contato</span>
                        </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                      
                      <DropdownMenuItem onClick={handleLogout} className="px-3 py-2 cursor-pointer text-red-500 hover:text-red-500 hover:bg-red-50" aria-label="Sair da conta">
                      <LogOut className="mr-2 h-4 w-4" />
                        <span>Sair da Conta</span>
                    </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <LoginModal>
                  <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50">
                    <LogIn className="mr-2 h-4 w-4" />
                    Entrar
                  </Button>
                </LoginModal>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/cadastro" className="flex items-center">
                    <UserPlus className="mr-2 h-4 w-4" />
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
                    <div className="relative w-8 h-8 mr-2 overflow-hidden rounded-md bg-blue-600">
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-blue-500"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Briefcase className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <span className="text-lg font-bold">Localiza<span className="text-blue-600">Vagas</span></span>
                  </SheetTitle>
                </SheetHeader>

                <div className="py-4">
                  {isAuthenticated ? (
                    <div className="flex items-center p-3 mb-4 bg-gray-50 rounded-lg">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={user?.avatar || "/placeholder.svg?height=40&width=40"} alt={user?.name || "Usuário"} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-2 mb-4">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
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

                  {isAuthenticated && (
                    <>
                      <div className="h-px bg-gray-200 my-4"></div>
                      <div className="space-y-1">
                        <MobileNavItem href="/dashboard" icon={PanelLeft}>
                          Dashboard
                        </MobileNavItem>
                        <MobileNavItem href="/dashboard/perfil" icon={User}>
                          Meu Perfil
                        </MobileNavItem>
                        <MobileNavItem href="/dashboard/curriculo" icon={FileEdit}>
                          Meu Currículo
                        </MobileNavItem>
                        <MobileNavItem href="/dashboard/candidaturas" icon={Briefcase}>
                          Minhas Candidaturas
                        </MobileNavItem>
                        <MobileNavItem href="/dashboard/vagas-salvas" icon={Heart}>
                          Vagas Salvas
                        </MobileNavItem>
                        <MobileNavItem href="/dashboard/mensagens" icon={Mail}>
                          Mensagens
                        </MobileNavItem>
                        <MobileNavItem href="/dashboard/configuracoes" icon={Settings}>
                          Configurações
                        </MobileNavItem>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={handleLogout}
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
    <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50" asChild>
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
  isNew = false,
  type = "default" 
}: { 
  title: string; 
  description: string; 
  time: string; 
  isNew?: boolean;
  type?: "candidatura" | "vaga" | "entrevista" | "alerta" | "fatura" | "default";
}) {
  // Função para obter o ícone e cor baseado no tipo de notificação
  const getNotificationIcon = () => {
    switch (type) {
      case "candidatura":
        return { icon: <Users className="h-5 w-5" />, color: "bg-blue-100 text-blue-600" };
      case "vaga":
        return { icon: <Briefcase className="h-5 w-5" />, color: "bg-purple-100 text-purple-600" };
      case "entrevista":
        return { icon: <Calendar className="h-5 w-5" />, color: "bg-green-100 text-green-600" };
      case "alerta":
        return { icon: <Clock className="h-5 w-5" />, color: "bg-amber-100 text-amber-600" };
      case "fatura":
        return { icon: <CreditCard className="h-5 w-5" />, color: "bg-indigo-100 text-indigo-600" };
      default:
        return { icon: <Bell className="h-5 w-5" />, color: "bg-gray-100 text-gray-600" };
    }
  };

  const { icon, color } = getNotificationIcon();

  return (
    <div className={cn(
      "flex items-start p-3 rounded-lg mb-1 transition-colors",
      isNew ? "bg-blue-50" : "hover:bg-gray-50"
    )}>
      <div className={cn("rounded-full p-2 mr-3", color)}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="font-medium text-sm">{title}</p>
          {isNew && <Badge variant="default" className="text-[10px] h-5 bg-blue-600 text-white">Nova</Badge>}
        </div>
        <p className="text-sm text-gray-600 mt-0.5 line-clamp-2">{description}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
}

// Componente para itens de mensagem
function MessageItem({ 
  sender, 
  company,
  avatar,
  message, 
  time, 
  isUnread = false 
}: { 
  sender: string;
  company: string;
  avatar: string;
  message: string; 
  time: string; 
  isUnread?: boolean 
}) {
  return (
    <div className="group hover:bg-blue-50 cursor-pointer transition-colors duration-150">
      <div className="flex items-start p-3 relative">
        {isUnread && (
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
            <Circle className="h-2 w-2 fill-blue-600 text-blue-600 ml-1" />
          </div>
        )}
        
        <Avatar className="h-10 w-10 mr-3 flex-shrink-0 border border-gray-100">
          <AvatarImage src={avatar} alt={sender} />
          <AvatarFallback className="bg-blue-100 text-blue-600 text-xs font-medium">{sender.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className={cn("text-xs font-medium", isUnread && "text-blue-600")}>
              {sender}
            </p>
            <p className="text-[10px] text-gray-400">{time}</p>
          </div>
          <p className="text-[10px] text-gray-500 mt-0.5">{company}</p>
          <p className={cn(
            "text-xs text-gray-600 mt-1 line-clamp-2 leading-snug",
            isUnread && "font-medium text-gray-800"
          )}>
            {message}
          </p>
        </div>
      </div>
      
      <div className="h-0 group-hover:h-7 overflow-hidden transition-all duration-200 bg-blue-50 flex justify-end px-4">
        <div className="flex items-center space-x-2 py-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-5 text-[10px] text-blue-600 hover:bg-blue-100"
            onClick={(e) => {
              e.stopPropagation();
              // Implementação da funcionalidade de resposta
            }}
          >
            Responder
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-5 text-[10px] text-blue-600 hover:bg-blue-100"
            onClick={(e) => {
              e.stopPropagation();
              // Implementação da funcionalidade de arquivar
            }}
          >
            Arquivar
          </Button>
        </div>
      </div>
    </div>
  );
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
        className="flex items-center py-3 px-2 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600"
      >
        <Icon className="h-5 w-5 mr-3 text-gray-500" />
        <span className="font-medium">{children}</span>
        <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
      </Link>
    </SheetClose>
  )
}

