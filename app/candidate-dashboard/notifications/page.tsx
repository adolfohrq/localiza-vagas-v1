"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { CandidateDashboardShell } from "@/components/candidate-dashboard-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { 
  Bell, 
  Calendar, 
  Building2, 
  CheckCircle, 
  Trash2, 
  CheckCheck, 
  MoreHorizontal,
  MessageSquare,
  Search,
  X,
  Filter,
  ChevronDown,
  Undo2,
  Loader2,
  Eye,
  EyeOff,
  AlertCircle,
  ChevronUp,
  ArrowUpDown,
  Award,
  Briefcase,
  Star,
  User
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Notification {
  id: string
  title: string
  description: string
  time: string
  type: "interview" | "application" | "message" | "status" | "achievement" | "job" | "profile_view"
  read: boolean
  date: Date
  priority?: "high" | "medium" | "low"
  actionUrl?: string
  company?: string
  detailedContent?: string
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "Entrevista Agendada",
    description: "Entrevista técnica com TechCorp marcada para amanhã às 14:00",
    time: "há 1 hora",
    type: "interview",
    read: false,
    date: new Date(Date.now() - 1000 * 60 * 60),
    priority: "high",
    actionUrl: "/candidate-dashboard/interviews",
    company: "TechCorp",
    detailedContent: "Você tem uma entrevista técnica marcada com TechCorp para amanhã às 14:00. O entrevistador será João Silva, Gerente de Engenharia. Prepare-se para discutir suas experiências anteriores com desenvolvimento web e arquitetura de sistemas. A entrevista terá duração aproximada de 1 hora e será realizada remotamente via Google Meet."
  },
  {
    id: "2",
    title: "Nova Mensagem",
    description: "InnovaSoft enviou uma mensagem sobre sua candidatura",
    time: "há 2 horas",
    type: "message",
    read: false,
    date: new Date(Date.now() - 1000 * 60 * 60 * 2),
    priority: "medium",
    actionUrl: "/candidate-dashboard/messages",
    company: "InnovaSoft",
    detailedContent: "Olá! Obrigado pelo seu interesse na vaga de Desenvolvedor Full Stack na InnovaSoft. Gostaríamos de saber se você tem disponibilidade para uma entrevista inicial na próxima semana. Por favor, confirme suas datas e horários disponíveis respondendo a esta mensagem. Atenciosamente, Equipe de Recrutamento da InnovaSoft."
  },
  {
    id: "3",
    title: "Candidatura Atualizada",
    description: "Sua candidatura para DataDriven foi aprovada para a próxima fase",
    time: "há 5 horas",
    type: "status",
    read: false,
    date: new Date(Date.now() - 1000 * 60 * 60 * 5),
    company: "DataDriven",
    actionUrl: "/candidate-dashboard/applications"
  },
  {
    id: "nova-conquista",
    title: "Nova conquista desbloqueada",
    description: "Parabéns! Você desbloqueou a conquista 'Candidato Dedicado' por se candidatar a 10 vagas",
    time: "há 3 horas",
    type: "achievement",
    read: false,
    date: new Date(Date.now() - 1000 * 60 * 60 * 3),
    actionUrl: "/candidate-dashboard/achievements",
    detailedContent: "Você alcançou a marca de 10 candidaturas! Isso demonstra seu comprometimento com sua busca profissional. Continue assim e desbloquearemos mais recompensas e recursos para turbinar sua jornada de carreira."
  },
  {
    id: "vaga-recomendada",
    title: "Vaga recomendada",
    description: "Encontramos uma vaga de UX Designer que combina com seu perfil",
    time: "há 4 horas",
    type: "job",
    read: false,
    date: new Date(Date.now() - 1000 * 60 * 60 * 4),
    company: "CreativeDesign",
    actionUrl: "/candidate-dashboard/jobs/recommended",
    detailedContent: "Com base nas suas habilidades e experiências, identificamos esta vaga que parece ser um excelente match para seu perfil profissional. A CreativeDesign está buscando um UX Designer com suas qualificações para participar de projetos inovadores. Salário: R$ 6.500 - R$ 8.000. Modalidade: Remoto com reuniões presenciais mensais."
  },
  {
    id: "perfil-visto",
    title: "Perfil visualizado",
    description: "TechInnovate visualizou seu perfil",
    time: "há 6 horas",
    type: "profile_view",
    read: false,
    date: new Date(Date.now() - 1000 * 60 * 60 * 6),
    company: "TechInnovate",
    actionUrl: "/candidate-dashboard/profile/views",
    detailedContent: "A empresa TechInnovate visitou seu perfil hoje. Isso pode indicar interesse da empresa em seu histórico profissional. Recomendamos manter seu perfil atualizado e considerar entrar em contato com a empresa para demonstrar interesse em oportunidades disponíveis."
  },
  {
    id: "4",
    title: "Candidatura Recebida",
    description: "CloudTech recebeu sua candidatura para a vaga de Arquiteto de Software",
    time: "há 1 dia",
    type: "application",
    read: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24)
  },
  {
    id: "5",
    title: "Entrevista Remarcada",
    description: "Sua entrevista com GlobalTech foi remarcada para sexta-feira às 10:00",
    time: "há 2 dias",
    type: "interview",
    read: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 48)
  },
  {
    id: "6",
    title: "Feedback de Entrevista",
    description: "TechInnovate enviou um feedback sobre sua entrevista recente",
    time: "há 3 dias",
    type: "message",
    read: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 72)
  },
  {
    id: "7",
    title: "Nova Vaga Recomendada",
    description: "Com base no seu perfil, encontramos uma vaga de Desenvolvedor Full Stack que pode te interessar",
    time: "há 4 dias",
    type: "job",
    read: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 96)
  },
]

const typeIcons = {
  interview: Calendar,
  application: Building2,
  message: MessageSquare,
  status: CheckCircle,
  achievement: Award,
  job: Briefcase,
  profile_view: User
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [activeTab, setActiveTab] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [showSearch, setShowSearch] = useState(false)
  const [isSelectionMode, setIsSelectionMode] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")
  
  // Estados de carregamento
  const [isLoading, setIsLoading] = useState(false)
  const [loadingAction, setLoadingAction] = useState<string | null>(null)

  // Estados para desfazer operações
  const [lastDeletedNotifications, setLastDeletedNotifications] = useState<Notification[]>([])
  const [showUndoDelete, setShowUndoDelete] = useState(false)

  // Referência para o campo de pesquisa
  const searchInputRef = useRef<HTMLInputElement>(null)

  const unreadCount = notifications.filter((n) => !n.read).length
  const readCount = notifications.filter((n) => n.read).length

  // Foco automático no campo de pesquisa quando ele aparece
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [showSearch])

  // Filtrar notificações
  const filteredNotifications = notifications.filter((notification) => {
    // Filtro por tab (read status)
    if (activeTab === "unread" && notification.read) return false
    if (activeTab === "read" && !notification.read) return false
    
    // Filtro por tipo
    if (selectedType !== "all" && notification.type !== selectedType) return false
    
    // Filtro por pesquisa
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return (
        notification.title.toLowerCase().includes(searchLower) ||
        notification.description.toLowerCase().includes(searchLower) ||
        (notification.company && notification.company.toLowerCase().includes(searchLower)) ||
        (notification.detailedContent && notification.detailedContent.toLowerCase().includes(searchLower))
      )
    }
    
    return true
  })

  // Agrupar notificações por data
  const groupedNotifications = filteredNotifications.reduce((groups, notification) => {
    const date = new Date(notification.date).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
    
    if (!groups[date]) {
      groups[date] = [];
    }
    
    groups[date].push(notification);
    return groups;
  }, {} as Record<string, Notification[]>);

  // Ordenar grupos por data
  const sortedDates = Object.keys(groupedNotifications).sort((a, b) => {
    const dateA = groupedNotifications[a][0].date.getTime();
    const dateB = groupedNotifications[b][0].date.getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  // Alternar ordem de classificação
  const toggleSortOrder = useCallback(() => {
    setSortOrder(prev => prev === "newest" ? "oldest" : "newest");
  }, []);

  // Toggle selection of notification
  const toggleSelection = (id: string) => {
    setSelectedIds(prevSelected => 
      prevSelected.includes(id) 
        ? prevSelected.filter(selectedId => selectedId !== id)
        : [...prevSelected, id]
    )
  }

  // Select all visible notifications
  const selectAllVisible = () => {
    if (selectedIds.length === filteredNotifications.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(filteredNotifications.map(n => n.id))
    }
  }

  // Simulação de carregamento para demonstrar feedback visual
  const simulateLoading = (action: string, delay: number = 600) => {
    setLoadingAction(action);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setLoadingAction(null);
        resolve();
      }, delay);
    });
  };

  // Marcar como lida com simulação de carregamento
  const markAsRead = async (id: string) => {
    await simulateLoading(`mark-${id}`);
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Marcar múltiplas como lidas com simulação de carregamento
  const markSelectedAsRead = async () => {
    await simulateLoading('mark-selected');
    setNotifications(
      notifications.map((notification) =>
        selectedIds.includes(notification.id) ? { ...notification, read: true } : notification
      )
    );
    setSelectedIds([]);
  };

  // Marcar todas como lidas com simulação de carregamento
  const markAllAsRead = async () => {
    await simulateLoading('mark-all');
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  // Excluir notificação com simulação de carregamento
  const deleteNotification = async (id: string) => {
    await simulateLoading(`delete-${id}`);
    const notificationsToDelete = notifications.filter(n => n.id === id);
    setLastDeletedNotifications(notificationsToDelete);
    setNotifications(notifications.filter(n => n.id !== id));
    setShowUndoDelete(true);
    
    // Esconder a mensagem de desfazer após 5 segundos
    setTimeout(() => {
      setShowUndoDelete(false);
    }, 5000);
  };

  // Excluir múltiplas notificações com simulação de carregamento
  const deleteSelected = async () => {
    await simulateLoading('delete-selected');
    const notificationsToDelete = notifications.filter(n => selectedIds.includes(n.id));
    setLastDeletedNotifications(notificationsToDelete);
    setNotifications(notifications.filter(n => !selectedIds.includes(n.id)));
    setSelectedIds([]);
    setShowUndoDelete(true);
    
    // Esconder a mensagem de desfazer após 5 segundos
    setTimeout(() => {
      setShowUndoDelete(false);
    }, 5000);
  };

  // Restaurar notificações excluídas
  const undoDelete = () => {
    setNotifications([...notifications, ...lastDeletedNotifications])
    setLastDeletedNotifications([])
    setShowUndoDelete(false)
  }

  // Limpar pesquisa
  const clearSearch = () => {
    setSearchTerm("")
    setShowSearch(false)
  }

  // Sair do modo de seleção
  const exitSelectionMode = () => {
    setIsSelectionMode(false)
    setSelectedIds([])
  }

  // Efeito para sair do modo de seleção quando não há itens selecionados
  useEffect(() => {
    if (selectedIds.length === 0 && isSelectionMode) {
      setIsSelectionMode(false)
    }
  }, [selectedIds, isSelectionMode])

  // Efeito para simular carregamento inicial da página
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  // Alternar expansão da notificação
  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Manipulador de teclas para acessibilidade
  const handleKeyDown = useCallback((e: React.KeyboardEvent, notificationId: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!isSelectionMode) {
        toggleExpand(notificationId);
      } else {
        toggleSelection(notificationId);
      }
    }
  }, [isSelectionMode]);

  // Limpar expandido ao mudar de tab ou tipo de filtro
  useEffect(() => {
    setExpandedId(null);
  }, [activeTab, selectedType, sortOrder]);

  return (
    <CandidateDashboardShell>
      <div className="flex flex-col space-y-4">
        {/* Barra superior com título e ações */}
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-2xl font-bold tracking-tight flex items-center">
              Notificações
              {unreadCount > 0 && (
                <Badge className="ml-2 bg-blue-600">{unreadCount}</Badge>
              )}
            </h2>
            
            {!isSelectionMode ? (
              <div className="flex items-center gap-2 flex-wrap justify-end">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setShowSearch(!showSearch)}
                        className="h-8 w-8"
                        disabled={isLoading || !!loadingAction}
                        aria-label="Pesquisar notificações"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Pesquisar notificações</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={toggleSortOrder}
                        className="h-8 w-8"
                        disabled={isLoading || !!loadingAction}
                        aria-label={`Ordenar por ${sortOrder === "newest" ? "mais antigos" : "mais recentes"} primeiro`}
                      >
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {sortOrder === "newest" 
                          ? "Ordenado do mais recente para o mais antigo" 
                          : "Ordenado do mais antigo para o mais recente"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <DropdownMenu>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8"
                            disabled={isLoading || !!loadingAction}
                            aria-label="Filtrar notificações"
                          >
                            <Filter className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Filtrar notificações</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="text-xs font-medium">Filtrar notificações</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-xs">Status de leitura</DropdownMenuLabel>
                      <DropdownMenuRadioGroup value={activeTab} onValueChange={setActiveTab}>
                        <DropdownMenuRadioItem value="all" className="text-xs">
                          Todas
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="unread" className="text-xs">
                          <EyeOff className="mr-2 h-3 w-3" />
                          Não lidas ({unreadCount})
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="read" className="text-xs">
                          <Eye className="mr-2 h-3 w-3" />
                          Lidas ({readCount})
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuGroup>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-xs">Tipo de notificação</DropdownMenuLabel>
                      <DropdownMenuRadioGroup value={selectedType} onValueChange={setSelectedType}>
                        <DropdownMenuRadioItem value="all" className="text-xs">
                          Todos os tipos
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="interview" className="text-xs">
                          <Calendar className="mr-2 h-3 w-3 text-orange-500" />
                          Entrevistas
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="message" className="text-xs">
                          <MessageSquare className="mr-2 h-3 w-3 text-blue-500" />
                          Mensagens
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="application" className="text-xs">
                          <Building2 className="mr-2 h-3 w-3 text-green-500" />
                          Candidaturas
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="status" className="text-xs">
                          <CheckCircle className="mr-2 h-3 w-3 text-purple-500" />
                          Atualizações
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="achievement" className="text-xs">
                          <Award className="mr-2 h-3 w-3 text-purple-500" />
                          Conquistas
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="job" className="text-xs">
                          <Briefcase className="mr-2 h-3 w-3 text-amber-500" />
                          Vagas
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="profile_view" className="text-xs">
                          <User className="mr-2 h-3 w-3 text-teal-500" />
                          Visualizações de perfil
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuGroup>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-xs">Ordenação</DropdownMenuLabel>
                      <DropdownMenuRadioGroup value={sortOrder} onValueChange={(value) => setSortOrder(value as "newest" | "oldest")}>
                        <DropdownMenuRadioItem value="newest" className="text-xs">
                          <ChevronUp className="mr-2 h-3 w-3" />
                          Mais recentes primeiro
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="oldest" className="text-xs">
                          <ChevronDown className="mr-2 h-3 w-3" />
                          Mais antigos primeiro
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsSelectionMode(true)}
                  className="h-8 text-xs"
                  disabled={isLoading || !!loadingAction || filteredNotifications.length === 0}
                >
                  Selecionar
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0 || isLoading || loadingAction === 'mark-all'}
                  className="h-8 text-xs whitespace-nowrap"
                >
                  {loadingAction === 'mark-all' ? (
                    <Loader2 className="h-3 w-3 animate-spin mr-1" />
                  ) : (
                    <CheckCheck className="mr-1 h-3 w-3" />
                  )}
                  Marcar todas
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 flex-wrap justify-end">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={selectAllVisible}
                  className="h-8 text-xs"
                  disabled={isLoading || !!loadingAction}
                >
                  {selectedIds.length === filteredNotifications.length
                    ? "Desmarcar todos"
                    : "Selecionar todos"}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={markSelectedAsRead}
                  disabled={
                    selectedIds.length === 0 || 
                    selectedIds.every(id => notifications.find(n => n.id === id)?.read) ||
                    isLoading || 
                    loadingAction === 'mark-selected'
                  }
                  className="h-8 text-xs"
                >
                  {loadingAction === 'mark-selected' ? (
                    <Loader2 className="h-3 w-3 animate-spin mr-1" />
                  ) : (
                    <CheckCheck className="mr-1 h-3 w-3" />
                  )}
                  Marcar como lidas
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={deleteSelected}
                  disabled={selectedIds.length === 0 || isLoading || loadingAction === 'delete-selected'}
                  className="h-8 text-xs"
                >
                  {loadingAction === 'delete-selected' ? (
                    <Loader2 className="h-3 w-3 animate-spin mr-1" />
                  ) : (
                    <Trash2 className="mr-1 h-3 w-3" />
                  )}
                  Excluir
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={exitSelectionMode}
                  className="h-8 text-xs"
                  disabled={isLoading || !!loadingAction}
                >
                  Cancelar
                </Button>
              </div>
            )}
          </div>
          
          {/* Barra de pesquisa */}
          {showSearch && (
            <div className="flex items-center gap-2 mt-2 animate-in fade-in duration-200">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar notificações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 h-8 text-sm"
                  ref={searchInputRef}
                  aria-label="Pesquisar notificações"
                />
                {searchTerm && (
                  <X 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground"
                    onClick={() => setSearchTerm("")}
                    aria-label="Limpar pesquisa"
                  />
                )}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearSearch}
                className="h-8"
              >
                Cancelar
              </Button>
            </div>
          )}
          
          {/* Mensagem de desfazer exclusão */}
          {showUndoDelete && (
            <div className="flex items-center justify-between bg-muted/80 p-2 rounded-md mt-2 animate-in slide-in-from-top duration-300">
              <p className="text-xs">
                {lastDeletedNotifications.length === 1 
                  ? "1 notificação excluída" 
                  : `${lastDeletedNotifications.length} notificações excluídas`}
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={undoDelete}
                className="h-6 text-xs px-2"
              >
                <Undo2 className="mr-1 h-3 w-3" />
                Desfazer
              </Button>
            </div>
          )}
        </div>

        {/* Conteúdo principal - substituindo o componente Tabs */}
        <div className="mt-2">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Loader2 className="h-12 w-12 text-muted-foreground mb-4 animate-spin" />
              <p className="text-sm font-medium text-muted-foreground">
                Carregando notificações...
              </p>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              {searchTerm ? (
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
              ) : activeTab === "unread" ? (
                <EyeOff className="h-12 w-12 text-muted-foreground mb-4" />
              ) : activeTab === "read" ? (
                <Eye className="h-12 w-12 text-muted-foreground mb-4" />
              ) : (
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              )}
              
              <p className="text-sm font-medium text-muted-foreground">
                {searchTerm 
                  ? "Nenhuma notificação corresponde à sua pesquisa"
                  : activeTab === "unread"
                    ? "Você não tem notificações não lidas"
                    : activeTab === "read"
                      ? "Você não tem notificações lidas"
                      : "Nenhuma notificação encontrada"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {searchTerm 
                  ? <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearSearch}
                      className="h-auto p-0 text-xs underline"
                    >
                      Limpar pesquisa
                    </Button>
                  : activeTab === "unread"
                    ? "Todas as suas notificações foram lidas"
                    : activeTab === "read"
                      ? "Você ainda não leu nenhuma notificação"
                      : "Verifique novamente mais tarde"}
              </p>
            </div>
          ) : (
            <ScrollArea className="pr-2 -mr-2 max-h-[calc(100vh-230px)]">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    {filteredNotifications.length} {filteredNotifications.length === 1 ? "notificação" : "notificações"}
                  </p>
                  {sortOrder === "newest" ? (
                    <Badge variant="outline" className="text-[10px] h-4">Mais recentes primeiro</Badge>
                  ) : (
                    <Badge variant="outline" className="text-[10px] h-4">Mais antigas primeiro</Badge>
                  )}
                </div>
                
                {sortedDates.map((date) => (
                  <div key={date} className="space-y-2">
                    <h3 className="text-xs font-medium text-muted-foreground capitalize mt-4 mb-2 sticky top-0 pb-1 z-10">
                      {date}
                    </h3>
                    <div className="space-y-2">
                      {groupedNotifications[date].map((notification) => {
                        const Icon = typeIcons[notification.type]
                        const isExpanded = expandedId === notification.id;
                        
                        return (
                          <Card 
                            key={notification.id} 
                            className={cn(
                              "transition-all hover:bg-gray-50 relative overflow-hidden",
                              notification.read 
                                ? "bg-gray-50/50" 
                                : notification.type === "interview"
                                  ? "border-l-4 border-l-orange-500"
                                  : notification.type === "message"
                                    ? "border-l-4 border-l-blue-500"
                                    : notification.type === "application"
                                      ? "border-l-4 border-l-green-500"
                                      : notification.type === "status"
                                        ? "border-l-4 border-l-purple-500"
                                        : notification.type === "achievement"
                                          ? "border-l-4 border-l-purple-500"
                                          : notification.type === "job"
                                            ? "border-l-4 border-l-amber-500"
                                            : "border-l-4 border-l-teal-500",
                              selectedIds.includes(notification.id) && "ring-2 ring-blue-500 bg-blue-50/30",
                              isExpanded && "ring-1 ring-blue-200"
                            )}
                          >
                            <CardContent className={cn("p-3", isExpanded && "pb-0")}>
                              <div 
                                className={cn(
                                  "flex items-start gap-3",
                                  !isSelectionMode && notification.detailedContent && "cursor-pointer"
                                )}
                                onClick={() => {
                                  if (!isSelectionMode && notification.detailedContent) {
                                    toggleExpand(notification.id);
                                  }
                                }}
                                onKeyDown={(e) => handleKeyDown(e, notification.id)}
                                tabIndex={!isSelectionMode && notification.detailedContent ? 0 : -1}
                                role={!isSelectionMode && notification.detailedContent ? "button" : undefined}
                                aria-expanded={isExpanded}
                                aria-label={`Notificação: ${notification.title}${notification.read ? " (Lida)" : ""}`}
                              >
                                {isSelectionMode && (
                                  <Checkbox 
                                    checked={selectedIds.includes(notification.id)}
                                    onCheckedChange={() => toggleSelection(notification.id)}
                                    className="mt-1"
                                    aria-label={`Selecionar notificação: ${notification.title}`}
                                  />
                                )}
                                <div 
                                  className={cn(
                                    "rounded-full p-2 flex-shrink-0",
                                    notification.read 
                                      ? "bg-gray-100 text-gray-400" 
                                      : notification.type === "interview" 
                                        ? "bg-orange-100 text-orange-600" 
                                        : notification.type === "message" 
                                          ? "bg-blue-100 text-blue-600" 
                                          : notification.type === "application" 
                                            ? "bg-green-100 text-green-600" 
                                            : notification.type === "status" 
                                              ? "bg-purple-100 text-purple-600"
                                              : notification.type === "achievement" 
                                                ? "bg-purple-100 text-purple-600"
                                                : notification.type === "job" 
                                                  ? "bg-amber-100 text-amber-600"
                                                  : "bg-teal-100 text-teal-600"
                                  )}
                                  aria-hidden="true"
                                >
                                  <Icon className={cn("h-4 w-4", notification.read ? "text-gray-500" : "")} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <h3 className={cn(
                                      "font-medium text-sm", 
                                      notification.read ? "text-gray-600" : ""
                                    )}>
                                      {notification.title}
                                      {notification.company && (
                                        <span className="text-xs font-normal text-muted-foreground ml-1">
                                          • {notification.company}
                                        </span>
                                      )}
                                    </h3>
                                    <div className="flex items-center gap-1 flex-shrink-0">
                                      <Badge 
                                        variant="secondary" 
                                        className={cn(
                                          "text-[10px] px-1 h-5", 
                                          notification.read ? "bg-gray-100 text-gray-500" : ""
                                        )}
                                      >
                                        {notification.time}
                                      </Badge>
                                      
                                      {!isSelectionMode && (
                                        <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                            <Button 
                                              variant="ghost" 
                                              size="sm" 
                                              className="h-6 w-6 p-0"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                              }}
                                              disabled={loadingAction === `mark-${notification.id}` || loadingAction === `delete-${notification.id}`}
                                              aria-label="Opções da notificação"
                                            >
                                              {loadingAction === `mark-${notification.id}` || loadingAction === `delete-${notification.id}` ? (
                                                <Loader2 className="h-3 w-3 animate-spin" />
                                              ) : (
                                                <MoreHorizontal className="h-3 w-3" />
                                              )}
                                            </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent align="end" className="w-36">
                                            {!notification.read && (
                                              <DropdownMenuItem 
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  markAsRead(notification.id);
                                                }} 
                                                className="text-xs"
                                              >
                                                <CheckCheck className="mr-2 h-3 w-3" />
                                                Marcar como lida
                                              </DropdownMenuItem>
                                            )}
                                            {notification.actionUrl && (
                                              <DropdownMenuItem className="text-xs" asChild>
                                                <a 
                                                  href={notification.actionUrl}
                                                  onClick={(e) => e.stopPropagation()}
                                                >
                                                  <CheckCircle className="mr-2 h-3 w-3" />
                                                  Ver detalhes
                                                </a>
                                              </DropdownMenuItem>
                                            )}
                                            <DropdownMenuItem 
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                deleteNotification(notification.id);
                                              }} 
                                              className="text-xs text-red-500 focus:text-red-500"
                                            >
                                              <Trash2 className="mr-2 h-3 w-3" />
                                              Excluir
                                            </DropdownMenuItem>
                                          </DropdownMenuContent>
                                        </DropdownMenu>
                                      )}
                                    </div>
                                  </div>
                                  <p className={cn("text-xs text-muted-foreground mt-1", notification.read ? "text-gray-400" : "")}>
                                    {notification.description}
                                  </p>
                                  
                                  {notification.detailedContent && isExpanded && (
                                    <div className="mt-3 pt-3 border-t border-gray-100 animate-in fade-in duration-200">
                                      <p className="text-xs text-muted-foreground whitespace-pre-line">
                                        {notification.detailedContent}
                                      </p>
                                      
                                      <div className="flex justify-end mt-3 gap-2 pb-3">
                                        {notification.actionUrl && (
                                          <Button 
                                            size="sm" 
                                            className="h-7 text-xs"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              window.location.href = notification.actionUrl!;
                                            }}
                                          >
                                            Ver detalhes
                                          </Button>
                                        )}
                                        <Button 
                                          variant="outline" 
                                          size="sm" 
                                          className="h-7 text-xs"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setExpandedId(null);
                                          }}
                                        >
                                          Fechar
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
    </CandidateDashboardShell>
  )
}

