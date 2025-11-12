"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Search,
  Bell,
  User,
  Briefcase,
  Building,
  HelpCircle,
  FileText,
  LogOut,
  MessageSquare,
  X,
  FileEdit,
  GraduationCap,
  Award,
  Clock,
  BarChart3,
  Settings,
  AlertCircle,
  PanelLeft,
  Star,
  Calendar,
  Send,
  Edit,
  MoreHorizontal,
  Circle,
  Eye,
  CheckCircle,
  Bookmark,
  FileCheck,
  Trophy,
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

export function CandidateDashboardHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showNewMessageForm, setShowNewMessageForm] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isNotificationsClosing, setIsNotificationsClosing] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const messagesTriggerRef = useRef<HTMLButtonElement>(null)
  const notificationsTriggerRef = useRef<HTMLButtonElement>(null)

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

  // Lista de contatos para nova conversa
  const contacts = [
    { id: 1, name: "Ana Silva", company: "TechSolutions", avatar: "/avatars/ana.png" },
    { id: 2, name: "Carlos Mendes", company: "Inovação Digital", avatar: "/avatars/carlos.png" },
    { id: 3, name: "Mariana Costa", company: "Empresa ABC", avatar: "/avatars/mariana.png" },
    { id: 4, name: "João Oliveira", company: "Dev Solutions", avatar: "/avatars/joao.png" },
    { id: 5, name: "Equipe LocalizaVagas", company: "LocalizaVagas", avatar: "/avatars/support.png" },
  ]

  // Função para fechar o dropdown de mensagens com animação
  const closeMessagesDropdownWithAnimation = (navigateTo?: string) => {
    // Primeiro definimos que está fechando para a animação
    setIsClosing(true);
    
    // Criamos uma variável para controlar se o dropdown já foi fechado
    let dropdownClosed = false;
    
    // Função para fechar o dropdown de forma forçada
    const forceClose = () => {
      if (!dropdownClosed && messagesTriggerRef.current) {
        dropdownClosed = true;
        messagesTriggerRef.current.click();
      }
    };
    
    // Aguarda a animação terminar antes de fechar o dropdown
    setTimeout(() => {
      // Força o fechamento do dropdown
      forceClose();
      
      // Navega para a página de destino após um pequeno atraso
      setTimeout(() => {
        if (navigateTo) {
          // Antes de navegar, garantimos que o dropdown está fechado
          forceClose();
          
          // Navegamos para a página desejada
          router.push(navigateTo);
          
          // Resetamos o estado de fechamento após a navegação
          setTimeout(() => {
            setIsClosing(false);
          }, 500);
        } else {
          // Se não houver navegação, apenas resetamos o estado
          setIsClosing(false);
        }
      }, 100);
    }, 300); // Duração da animação
  }

  // Função para fechar o dropdown de notificações com animação
  const closeNotificationsDropdownWithAnimation = (navigateTo?: string) => {
    // Primeiro definimos que está fechando para a animação
    setIsNotificationsClosing(true);
    
    // Criamos uma variável para controlar se o dropdown já foi fechado
    let dropdownClosed = false;
    
    // Função para fechar o dropdown de forma forçada
    const forceClose = () => {
      if (!dropdownClosed && notificationsTriggerRef.current) {
        dropdownClosed = true;
        notificationsTriggerRef.current.click();
      }
    };
    
    // Aguarda a animação terminar antes de fechar o dropdown
    setTimeout(() => {
      // Força o fechamento do dropdown
      forceClose();
      
      // Navega para a página de destino após um pequeno atraso
      setTimeout(() => {
        if (navigateTo) {
          // Antes de navegar, garantimos que o dropdown está fechado
          forceClose();
          
          // Navegamos para a página desejada
          router.push(navigateTo);
          
          // Resetamos o estado de fechamento após a navegação
          setTimeout(() => {
            setIsNotificationsClosing(false);
          }, 500);
        } else {
          // Se não houver navegação, apenas resetamos o estado
          setIsNotificationsClosing(false);
        }
      }, 100);
    }, 300); // Duração da animação
  }

  // Função para iniciar nova conversa
  const startNewConversation = (contactId: number) => {
    // Aqui você implementaria a lógica para iniciar uma conversa com o contato selecionado
    setShowNewMessageForm(false);
    closeMessagesDropdownWithAnimation(`/candidate-dashboard/messages/conversation/${contactId}`);
  }

  // Função para lidar com o logout
  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="bg-white relative z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
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

        {/* Título da página - Desktop */}
        <div className="hidden md:flex items-center">
          <h1 className="text-lg font-semibold">Dashboard do Candidato</h1>
        </div>

        {/* Ações do usuário - Desktop */}
        <div className="flex items-center space-x-4">
          {/* Campo de busca simples */}
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Buscar..."
              className="pl-9 w-[180px] h-9 bg-gray-50 border-gray-200 rounded-full focus:border-blue-400 focus:ring-blue-400"
            />
          </div>

          {/* Ícone de mensagens com dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                ref={messagesTriggerRef}
                variant="ghost" 
                size="icon" 
                className="relative text-gray-500 hover:text-blue-600 hover:bg-blue-50"
              >
                <MessageSquare className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-600 rounded-full flex items-center justify-center text-[10px] text-white font-medium">2</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className={cn(
                "w-96 p-0 overflow-hidden transition-all duration-300",
                isClosing && "opacity-0 translate-y-2 scale-95"
              )} 
              ref={dropdownRef}
            >
              {!showNewMessageForm ? (
                <>
                  <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-lg">Mensagens</h3>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20 rounded-full">
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
                      />
                    </div>
                  </div>
                  
                  <div className="max-h-[400px] overflow-y-auto divide-y divide-gray-100">
                    <MessageItem
                      sender="Ana Silva"
                      company="TechSolutions"
                      avatar="/avatars/ana.png"
                      message="Olá! Gostaríamos de agendar uma entrevista para a vaga de UX Designer. Você tem disponibilidade esta semana?"
                      time="15 min atrás"
                      isUnread
                    />
                    <MessageItem
                      sender="Carlos Mendes"
                      company="Inovação Digital"
                      avatar="/avatars/carlos.png"
                      message="Seu perfil chamou nossa atenção! Temos uma vaga que combina com suas habilidades. Podemos conversar sobre isso?"
                      time="2 horas atrás"
                      isUnread
                    />
                    <MessageItem
                      sender="Equipe LocalizaVagas"
                      company="LocalizaVagas"
                      avatar="/avatars/support.png"
                      message="Seu currículo foi atualizado com sucesso! Confira as novas recomendações de vagas que separamos para você."
                      time="1 dia atrás"
                    />
                    <MessageItem
                      sender="Mariana Costa"
                      company="Empresa ABC"
                      avatar="/avatars/mariana.png"
                      message="Obrigada por se candidatar à nossa vaga. Gostaríamos de saber mais sobre sua experiência com React."
                      time="2 dias atrás"
                    />
                  </div>
                  
                  <div className="bg-gray-50 p-3 border-t">
                    <div className="flex items-center justify-between">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs border-blue-200 text-blue-600 hover:bg-blue-50"
                        onClick={() => closeMessagesDropdownWithAnimation('/candidate-dashboard/messages')}
                      >
                        Ver todas as mensagens
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="text-xs bg-blue-600 hover:bg-blue-700 flex items-center"
                        onClick={() => setShowNewMessageForm(true)}
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
                          <AvatarFallback className="bg-blue-100 text-blue-800 text-xs font-medium">{contact.name.charAt(0)}</AvatarFallback>
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

          {/* Notificações */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                ref={notificationsTriggerRef}
                variant="ghost" 
                size="icon" 
                className="relative text-gray-500 hover:text-blue-600 hover:bg-blue-50"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-600 rounded-full flex items-center justify-center text-[10px] text-white font-medium">3</span>
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
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20 rounded-full">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-blue-100 mt-1">3 notificações não lidas</p>
              </div>
              
              <div className="max-h-[400px] overflow-y-auto divide-y divide-gray-100">
                <NotificationItem
                  title="Candidatura visualizada"
                  description="Sua candidatura para Dev Frontend foi visualizada pelo recrutador"
                  time="10 min atrás"
                  isNew
                  type="candidatura"
                />
                <NotificationItem
                  title="Vaga recomendada"
                  description="Encontramos uma vaga de UX Designer que combina com seu perfil"
                  time="2 horas atrás"
                  isNew
                  type="vaga"
                />
                <NotificationItem
                  title="Currículo atualizado"
                  description="Seu currículo foi atualizado com sucesso! Suas novas habilidades foram adicionadas."
                  time="5 horas atrás"
                  isNew
                  type="curriculo"
                />
                <NotificationItem
                  title="Nova conquista desbloqueada"
                  description="Parabéns! Você desbloqueou a conquista 'Candidato Dedicado' por se candidatar a 10 vagas."
                  time="1 dia atrás"
                  type="conquista"
                />
              </div>
              
              <div className="bg-gray-50 p-3 border-t">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-center text-blue-600 hover:bg-blue-50"
                  onClick={() => closeNotificationsDropdownWithAnimation('/candidate-dashboard/notifications')}
                >
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
                  <AvatarImage src={user?.avatar || "/avatars/default.png"} alt={user?.name} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuItem asChild>
                <Link href="/candidate-dashboard" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-blue-50 rounded-md p-2">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <span>Visão Geral</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/candidate-dashboard/overview-v2" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-blue-50 rounded-md p-2">
                  <PanelLeft className="mr-2 h-4 w-4" />
                  <span>Visão Geral v2</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/candidate-dashboard/resume" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-blue-50 rounded-md p-2">
                  <FileEdit className="mr-2 h-4 w-4" />
                  <span>Meu Currículo</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/candidate-dashboard/applications" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-blue-50 rounded-md p-2">
                  <Briefcase className="mr-2 h-4 w-4" />
                  <span>Vagas Aplicadas</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/candidate-dashboard/courses" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-blue-50 rounded-md p-2">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  <span>Cursos e Certificações</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/candidate-dashboard/messages" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-blue-50 rounded-md p-2">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Mensagens</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/candidate-dashboard/messages-v2" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-blue-50 rounded-md p-2">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Mensagens v2</span>
                  <Badge variant="outline" className="ml-2 px-1 py-0 text-[9px] bg-blue-50 text-blue-600 border-blue-200">Novo</Badge>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/candidate-dashboard/notifications" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-blue-50 rounded-md p-2">
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notificações</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/candidate-dashboard/interviews" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-blue-50 rounded-md p-2">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Entrevistas</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/candidate-dashboard/interviews-v2" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-blue-50 rounded-md p-2">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>Entrevistas v2</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/candidate-dashboard/achievements" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-blue-50 rounded-md p-2">
                  <Award className="mr-2 h-4 w-4" />
                  <span>Minhas Conquistas</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/candidate-dashboard/achievements-v2" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-blue-50 rounded-md p-2">
                  <Star className="mr-2 h-4 w-4" />
                  <span>Minhas Conquistas v2</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/candidate-dashboard/ai-search" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-blue-50 rounded-md p-2">
                  <Search className="mr-2 h-4 w-4" />
                  <span>Busca Vaga IA</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/candidate-dashboard/settings" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-blue-50 rounded-md p-2">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/candidate-dashboard/support" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-blue-50 rounded-md p-2">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Ajuda & Suporte</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/candidate-dashboard/support-v2" className="flex items-center cursor-pointer transition-colors duration-200 hover:bg-blue-50 rounded-md p-2">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  <span>Ajuda & Suporte v2</span>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleLogout}
                className="text-red-600 cursor-pointer transition-colors duration-200 hover:bg-red-50 rounded-md p-2 flex items-center"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Adicionando separador visual entre o header e o conteúdo */}
      <div className="h-[1px] bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 shadow-sm relative">
        <div className="absolute inset-0 shadow-md opacity-10"></div>
      </div>
    </header>
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
  type?: "candidatura" | "vaga" | "curriculo" | "conquista" | "default";
}) {
  // Função para determinar o ícone com base no tipo de notificação
  const getNotificationIcon = () => {
    switch (type) {
      case "candidatura":
        return <Eye className={cn("h-5 w-5", isNew ? "text-blue-600" : "text-gray-500")} />;
      case "vaga":
        return <Bookmark className={cn("h-5 w-5", isNew ? "text-blue-600" : "text-gray-500")} />;
      case "curriculo":
        return <FileCheck className={cn("h-5 w-5", isNew ? "text-blue-600" : "text-gray-500")} />;
      case "conquista":
        return <Trophy className={cn("h-5 w-5", isNew ? "text-blue-600" : "text-gray-500")} />;
      default:
        return <Bell className={cn("h-5 w-5", isNew ? "text-blue-600" : "text-gray-500")} />;
    }
  };

  return (
    <div className="group hover:bg-blue-50 cursor-pointer transition-colors duration-150">
      <div className="flex items-start p-3 relative">
        <div className={cn(
          "h-10 w-10 mr-3 flex-shrink-0 rounded-full flex items-center justify-center",
          isNew ? "bg-blue-100" : "bg-gray-100"
        )}>
          {getNotificationIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className={cn("text-xs font-medium", isNew && "text-blue-800")}>
              {title}
            </p>
            <p className="text-[10px] text-gray-400">{time}</p>
          </div>
          <p className={cn(
            "text-xs text-gray-600 mt-1 line-clamp-2 leading-snug",
            isNew && "font-medium text-gray-800"
          )}>
            {description}
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
              // Implementação da funcionalidade de visualizar
            }}
          >
            Visualizar
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-5 text-[10px] text-blue-600 hover:bg-blue-100"
            onClick={(e) => {
              e.stopPropagation();
              // Implementação da funcionalidade de marcar como lida
            }}
          >
            Marcar como lida
          </Button>
        </div>
      </div>
    </div>
  )
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
          <AvatarFallback className="bg-blue-100 text-blue-800 text-xs font-medium">{sender.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className={cn("text-xs font-medium", isUnread && "text-blue-800")}>
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
  )
}

