'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  Clock, 
  Link2, 
  Tag, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  XCircle, 
  Edit, 
  Copy, 
  Trash2, 
  Share2,
  MessageSquare,
  Bookmark,
  BookmarkCheck,
  CalendarClock,
  History,
  Paperclip,
  Check,
  X,
  Save,
  Plus
} from "lucide-react";
import { useTasks } from "@/app/contexts/tasks/tasksContext";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, addDays, isToday, isTomorrow, isThisWeek, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface TaskViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId: string | null;
  isCreatingTask?: boolean;
  selectedDate?: {
    day: number;
    month: number;
    year: number;
  } | null;
}

// Lista de categorias disponíveis
const CATEGORIAS_DISPONIVEIS = [
  { value: "projeto", label: "Projeto" },
  { value: "reuniao", label: "Reunião" },
  { value: "bug", label: "Bug" },
  { value: "feature", label: "Feature" },
  { value: "melhoria", label: "Melhoria" },
  { value: "documentacao", label: "Documentação" },
  { value: "planejamento", label: "Planejamento" },
  { value: "design", label: "Design" },
  { value: "teste", label: "Teste" },
  { value: "pesquisa", label: "Pesquisa" },
  { value: "urgente", label: "Urgente" },
  { value: "pendente", label: "Pendente" },
  { value: "outros", label: "Outros" }
];

// Lista de usuários disponíveis para atribuição
const USUARIOS_DISPONIVEIS = [
  { id: "user1", name: "Ana Silva", avatar: "/avatars/ana.png" },
  { id: "user2", name: "Bruno Costa", avatar: "/avatars/bruno.png" },
  { id: "user3", name: "Carla Mendes", avatar: "/avatars/carla.png" },
  { id: "user4", name: "Daniel Oliveira", avatar: "/avatars/daniel.png" },
  { id: "user5", name: "Eduarda Santos", avatar: "/avatars/eduarda.png" }
];

// Lista de itens relacionados disponíveis
const ITENS_RELACIONADOS = [
  { id: "vaga1", title: "Desenvolvedor Front-end", type: "vaga" },
  { id: "vaga2", title: "Desenvolvedor Back-end", type: "vaga" },
  { id: "vaga3", title: "Designer UX/UI", type: "vaga" },
  { id: "vaga4", title: "Product Manager", type: "vaga" },
  { id: "vaga5", title: "DevOps Engineer", type: "vaga" },
  { id: "vaga6", title: "QA Tester", type: "vaga" }
];

export function TaskViewModal({ isOpen, onClose, taskId, isCreatingTask = false, selectedDate = null }: TaskViewModalProps) {
  const { 
    tasks, 
    openEditTaskModal, 
    toggleTaskStatus, 
    duplicateTask, 
    updateTaskStatus, 
    setCurrentTask, 
    setIsDeleteDialogOpen,
    // Form states
    setFormTitle,
    setFormDescription,
    setFormDueDate,
    setFormPriority,
    setFormStatus,
    setFormAssignee,
    setFormTags,
    setFormRelatedType,
    setFormRelatedItem,
    saveTask
  } = useTasks();
  
  const [activeTab, setActiveTab] = useState("detalhes");
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Estados locais para edição
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [editPriority, setEditPriority] = useState("medium");
  const [editStatus, setEditStatus] = useState("pending");
  const [editTag, setEditTag] = useState("");
  const [editAssignee, setEditAssignee] = useState("none");
  const [editRelatedItem, setEditRelatedItem] = useState("none");
  const [editRelatedType, setEditRelatedType] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hasChanges, setHasChanges] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Array<{id: string, text: string, author: string, createdAt: string}>>([]);
  
  // Encontrar a tarefa pelo ID ou inicializar como null para criar nova tarefa
  const task = tasks.find(t => t.id === taskId);
  
  // Resetar a aba ativa quando o modal é aberto
  useEffect(() => {
    if (isOpen) {
      // Definir a aba padrão como "detalhes" quando o modal é aberto
      setActiveTab("detalhes");
      
      // Resetar o scroll da área de conteúdo
      const scrollArea = document.querySelector('.scroll-area');
      if (scrollArea) {
        scrollArea.scrollTop = 0;
      }
      
      // Se estiver criando uma nova tarefa, inicializar com valores padrão
      if (isCreatingTask) {
        setEditTitle("");
        setEditDescription("");
        // Se tiver uma data selecionada, usá-la
        if (selectedDate) {
          const formattedDate = `${selectedDate.day.toString().padStart(2, '0')}/${(selectedDate.month + 1).toString().padStart(2, '0')}/${selectedDate.year}`;
          setEditDueDate(formattedDate);
          
          try {
            const day = selectedDate.day;
            const month = selectedDate.month; // já está 0-indexed
            const year = selectedDate.year;
            setDate(new Date(year, month, day));
          } catch (e) {
            // Ignora erros de parsing de data
          }
        } else {
          setEditDueDate("");
          setDate(undefined);
        }
        setEditPriority("medium");
        setEditStatus("pending");
        setEditTag("");
        setEditAssignee("none");
        setEditRelatedItem("none");
        setEditRelatedType("");
        setComments([]);
        setHasChanges(true); // Marcar como alterado para habilitar o botão de salvar
      }
    }
  }, [isOpen, isCreatingTask, selectedDate]);
  
  // Inicializar estados de edição quando a tarefa muda
  useEffect(() => {
    if (task && !isCreatingTask) {
      setEditTitle(task.title);
      setEditDescription(task.description);
      setEditDueDate(task.dueDate);
      setEditPriority(task.priority);
      setEditStatus(task.status);
      // Pegar a primeira tag se existir, ou deixar vazio
      setEditTag(task.tags && task.tags.length > 0 ? task.tags[0] : "");
      // Inicializar responsável
      setEditAssignee(task.assignee ? task.assignee.id : "none");
      // Inicializar item relacionado
      if (task.relatedTo) {
        setEditRelatedItem(task.relatedTo.id);
        setEditRelatedType(task.relatedTo.type);
      } else {
        setEditRelatedItem("none");
        setEditRelatedType("");
      }
      // Inicializar comentários (simulados)
      setComments([]);
      setHasChanges(false);
      
      // Tenta converter a data de vencimento para um objeto Date
      try {
        const dateParts = task.dueDate.split('/');
        if (dateParts.length === 3) {
          const day = parseInt(dateParts[0], 10);
          const month = parseInt(dateParts[1], 10) - 1; // mês em JS é 0-indexed
          const year = parseInt(dateParts[2], 10);
          setDate(new Date(year, month, day));
        }
      } catch (e) {
        // Ignora erros de parsing de data
      }
    }
  }, [task, isCreatingTask]);
  
  // Verificar mudanças nos campos
  useEffect(() => {
    if (task && !isCreatingTask) {
      const firstTag = task.tags && task.tags.length > 0 ? task.tags[0] : "";
      const currentAssigneeId = task.assignee ? task.assignee.id : "none";
      const currentRelatedItemId = task.relatedTo ? task.relatedTo.id : "none";
      const currentRelatedItemType = task.relatedTo ? task.relatedTo.type : "";
      
      const hasChanged = 
        editTitle !== task.title ||
        editDescription !== task.description ||
        editDueDate !== task.dueDate ||
        editPriority !== task.priority ||
        editStatus !== task.status ||
        editTag !== firstTag ||
        editAssignee !== currentAssigneeId ||
        editRelatedItem !== currentRelatedItemId ||
        editRelatedType !== currentRelatedItemType;
      
      setHasChanges(hasChanged);
    } else if (isCreatingTask) {
      // Se estiver criando uma nova tarefa, as mudanças são baseadas apenas nos campos não estarem vazios
      const hasChanged = editTitle.trim() !== "" || editDescription.trim() !== "";
      setHasChanges(hasChanged);
    }
  }, [task, isCreatingTask, editTitle, editDescription, editDueDate, editPriority, editStatus, editTag, editAssignee, editRelatedItem, editRelatedType]);
  
  // Função para renderizar o ícone de status
  const renderStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'in-progress':
        return <ArrowRight className="h-5 w-5 text-blue-500" />;
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-gray-500" />;
      default:
        return null;
    }
  };
  
  // Função para renderizar o badge de prioridade
  const renderPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge className="bg-red-500 text-white hover:bg-red-600">Urgente</Badge>;
      case 'high':
        return <Badge className="bg-orange-500 text-white hover:bg-orange-600">Alta</Badge>;
      case 'medium':
        return <Badge className="bg-blue-500 text-white hover:bg-blue-600">Média</Badge>;
      case 'low':
        return <Badge className="bg-green-500 text-white hover:bg-green-600">Baixa</Badge>;
      default:
        return null;
    }
  };

  // Função para renderizar o badge de status
  const renderStatusBadge = (status: string | undefined) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">Pendente</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">Em Andamento</Badge>;
      case 'completed':
        return <Badge variant="outline" className="text-emerald-500 border-emerald-200 bg-emerald-50">Concluída</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="text-gray-500 border-gray-200 bg-gray-50">Cancelada</Badge>;
      default:
        return <Badge variant="outline" className="text-muted-foreground border-muted-foreground/20">Desconhecido</Badge>;
    }
  };

  // Formatar data para exibição
  const formatDate = (dateString: string) => {
    if (dateString === "Hoje, 18:00") return "Hoje, 18:00";
    if (dateString === "Amanhã, 12:00") return "Amanhã, 12:00";
    if (dateString === "Quinta-feira") return "Quinta-feira";
    if (dateString === "Sexta-feira") return "Sexta-feira";
    
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };
  
  // Calcular tempo desde a criação
  const getTimeAgo = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) {
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        if (diffHours === 0) {
          const diffMinutes = Math.floor(diffMs / (1000 * 60));
          return `${diffMinutes} minutos atrás`;
        }
        return `${diffHours} horas atrás`;
      } else if (diffDays === 1) {
        return "ontem";
      } else if (diffDays < 30) {
        return `${diffDays} dias atrás`;
      } else {
        return formatDate(dateString);
      }
    } catch (e) {
      return "data desconhecida";
    }
  };
  
  // Calcular progresso baseado no status
  const getProgressByStatus = (status: string) => {
    switch (status) {
      case 'pending': return 0;
      case 'in-progress': return 50;
      case 'completed': return 100;
      case 'cancelled': return 100;
      default: return 0;
    }
  };
  
  // Função para alternar o status da tarefa
  const handleStatusChange = (newStatus: "pending" | "in-progress" | "completed" | "cancelled") => {
    setEditStatus(newStatus);
    setHasChanges(true);
  };
  
  // Função para excluir a tarefa
  const handleDeleteTask = () => {
    if (task) {
      setCurrentTask(task);
      setIsDeleteDialogOpen(true);
      onClose();
    }
  };
  
  // Função para duplicar a tarefa
  const handleDuplicateTask = () => {
    if (task) {
      duplicateTask(task.id);
      onClose();
    }
  };
  
  // Função para cancelar a edição
  const cancelEdit = () => {
    if (task) {
      setEditTitle(task.title);
      setEditDescription(task.description);
      setEditDueDate(task.dueDate);
      setEditPriority(task.priority);
      setEditStatus(task.status);
      setEditTag(task.tags && task.tags.length > 0 ? task.tags[0] : "");
      setEditAssignee(task.assignee ? task.assignee.id : "none");
      setEditRelatedItem(task.relatedTo ? task.relatedTo.id : "none");
      setEditRelatedType(task.relatedTo ? task.relatedTo.type : "");
      setHasChanges(false);
    } else if (isCreatingTask) {
      // Se estiver criando uma nova tarefa, resetar para valores padrão
      setEditTitle("");
      setEditDescription("");
      if (selectedDate) {
        const formattedDate = `${selectedDate.day.toString().padStart(2, '0')}/${(selectedDate.month + 1).toString().padStart(2, '0')}/${selectedDate.year}`;
        setEditDueDate(formattedDate);
      } else {
        setEditDueDate("");
      }
      setEditPriority("medium");
      setEditStatus("pending");
      setEditTag("");
      setEditAssignee("none");
      setEditRelatedItem("none");
      setEditRelatedType("");
      setHasChanges(false);
    }
  };
  
  // Função para adicionar um comentário
  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    
    const newCommentObj = {
      id: `comment-${Date.now()}`,
      text: newComment,
      author: "Você",
      createdAt: new Date().toISOString()
    };
    
    setComments(prev => [newCommentObj, ...prev]);
    setNewComment("");
    setHasChanges(true);
    
    // Mudar para a aba de comentários se não estiver nela
    if (activeTab !== "comentarios") {
      setActiveTab("comentarios");
    }
  };
  
  // Função para salvar as alterações
  const saveChanges = () => {
    // Preparar os dados do formulário no contexto
    setFormTitle(editTitle);
    setFormDescription(editDescription);
    setFormDueDate(editDueDate);
    setFormPriority(editPriority);
    setFormStatus(editStatus);
    setFormTags(editTag); // Usando apenas a tag selecionada
    
    // Tratar o caso especial do "none" para assignee
    if (editAssignee === "none") {
      setFormAssignee("");
    } else {
      setFormAssignee(editAssignee);
    }
    
    // Tratar o caso especial do "none" para item relacionado
    if (editRelatedItem === "none") {
      setFormRelatedType("");
      setFormRelatedItem("");
    } else {
      setFormRelatedType(editRelatedType);
      setFormRelatedItem(editRelatedItem);
    }
    
    // Se estiver editando uma tarefa existente, definir a tarefa atual no contexto
    if (!isCreatingTask && task) {
      setCurrentTask(task);
    } else {
      // Se estiver criando uma nova tarefa, definir como null
      setCurrentTask(null);
    }
    
    // Salvar as alterações
    saveTask();
    setHasChanges(false);
    
    // Fechar o modal após salvar
    onClose();
  };
  
  // Função para formatar a data do calendário
  const formatCalendarDate = (date: Date | undefined) => {
    if (!date) return "";
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  };
  
  // Handler para alterar a data
  const handleDateChange = (date: Date | undefined) => {
    setDate(date);
    if (date) {
      setEditDueDate(formatCalendarDate(date));
      setHasChanges(true);
    }
  };

  // Função para obter texto amigável para datas próximas
  const getFriendlyDateText = (date: Date | undefined) => {
    if (!date) return "Selecione uma data";
    
    if (isToday(date)) {
      return "Hoje";
    } else if (isTomorrow(date)) {
      return "Amanhã";
    } else if (isThisWeek(date)) {
      return format(date, "EEEE", { locale: ptBR });
    } else {
      return format(date, "dd/MM/yyyy", { locale: ptBR });
    }
  };

  // Função para obter o status do prazo
  const getDeadlineStatus = (date: Date | undefined) => {
    if (!date) return null;
    
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { label: "Atrasado", color: "text-red-500" };
    } else if (diffDays === 0) {
      return { label: "Vence hoje", color: "text-amber-500" };
    } else if (diffDays === 1) {
      return { label: "Vence amanhã", color: "text-blue-500" };
    } else if (diffDays <= 3) {
      return { label: `Vence em ${diffDays} dias`, color: "text-blue-500" };
    } else {
      return { label: `Vence em ${diffDays} dias`, color: "text-green-500" };
    }
  };

  // Opções rápidas de data
  const quickDateOptions = [
    { label: "Hoje", value: new Date(), icon: <Calendar className="h-3.5 w-3.5 text-primary" /> },
    { label: "Amanhã", value: addDays(new Date(), 1), icon: <CalendarClock className="h-3.5 w-3.5 text-blue-500" /> },
    { label: "Próxima semana", value: addDays(new Date(), 7), icon: <Calendar className="h-3.5 w-3.5 text-orange-500" /> },
    { label: "Duas semanas", value: addDays(new Date(), 14), icon: <Calendar className="h-3.5 w-3.5 text-green-500" /> },
  ];

  // Se não tiver tarefa e não estiver criando uma nova, não renderizar nada
  if (!task && !isCreatingTask) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open && hasChanges) {
        if (confirm("Deseja sair sem salvar as alterações?")) {
          onClose();
        }
      } else {
        onClose();
      }
    }}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden max-h-[90vh] shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
        {/* Botão de fechar customizado */}
        <button
          onClick={() => {
            if (hasChanges) {
              if (confirm("Deseja sair sem salvar as alterações?")) {
                onClose();
              }
            } else {
              onClose();
            }
          }}
          className={`absolute top-3 right-3 z-50 flex items-center justify-center h-6 w-6 rounded-full ${
            editPriority === 'urgent' ? 'bg-red-600 hover:bg-red-700' : 
            editPriority === 'high' ? 'bg-orange-600 hover:bg-orange-700' : 
            editPriority === 'medium' ? 'bg-blue-600 hover:bg-blue-700' : 
            'bg-green-600 hover:bg-green-700'
          } transition-colors shadow-sm`}
        >
          <X className="h-3.5 w-3.5 text-white" />
        </button>
        
        {/* Cabeçalho redesenhado */}
        <div className="w-full flex flex-col">
          {/* Barra superior colorida com ações rápidas */}
          <div className={`px-4 py-2 flex items-center justify-between ${
            editPriority === 'urgent' ? 'bg-red-500' : 
            editPriority === 'high' ? 'bg-orange-500' : 
            editPriority === 'medium' ? 'bg-blue-500' : 
            'bg-green-500'
          }`}>
            <div className="flex items-center gap-2">
              <Select 
                value={editStatus} 
                onValueChange={(value) => {
                  handleStatusChange(value as "pending" | "in-progress" | "completed" | "cancelled");
                }}
              >
                <SelectTrigger className="h-7 px-2 py-0 bg-white/20 border-0 text-xs hover:bg-white/30 rounded text-white focus:ring-0 min-w-[110px]">
                  <span className="flex items-center gap-1.5">
                    {renderStatusIcon(editStatus)}
                    <span className="capitalize">
                      {editStatus === 'pending' ? "Pendente" :
                       editStatus === 'in-progress' ? "Em Andamento" :
                       editStatus === 'completed' ? "Concluída" :
                       "Cancelada"}
                    </span>
                  </span>
                </SelectTrigger>
                <SelectContent align="start" side="bottom" className="w-[130px]">
                  <SelectItem value="pending" className="text-xs flex items-center gap-1.5 cursor-pointer">
                    <span className="flex items-center gap-1.5 text-amber-500">
                      <AlertCircle className="h-3.5 w-3.5" />
                      <span>Pendente</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="in-progress" className="text-xs flex items-center gap-1.5 cursor-pointer">
                    <span className="flex items-center gap-1.5 text-blue-500">
                      <ArrowRight className="h-3.5 w-3.5" />
                      <span>Em Andamento</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="completed" className="text-xs flex items-center gap-1.5 cursor-pointer">
                    <span className="flex items-center gap-1.5 text-emerald-500">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Concluída</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="cancelled" className="text-xs flex items-center gap-1.5 cursor-pointer">
                    <span className="flex items-center gap-1.5 text-gray-500">
                      <XCircle className="h-3.5 w-3.5" />
                      <span>Cancelada</span>
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
              
              <Progress
                value={getProgressByStatus(editStatus)}
                className="h-1.5 w-16 bg-white/20 ml-1 hidden sm:block"
              />
            </div>
            
            <div className="flex items-center mr-6 gap-1.5">
              {/* Mostra os botões de ação apenas se não estiver criando uma nova tarefa */}
              {!isCreatingTask && (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 bg-white/20 hover:bg-white/30 text-white"
                          onClick={() => setIsBookmarked(!isBookmarked)}
                        >
                          {isBookmarked ? 
                            <BookmarkCheck className="h-3 w-3" /> : 
                            <Bookmark className="h-3 w-3" />
                          }
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="text-xs p-1.5">
                        <p>{isBookmarked ? "Remover" : "Favoritar"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 bg-white/20 hover:bg-white/30 text-white"
                          onClick={handleDuplicateTask}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="text-xs p-1.5">
                        <p>Duplicar</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 bg-white/20 hover:bg-white/30 text-white"
                          onClick={handleDeleteTask}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="text-xs p-1.5">
                        <p>Excluir</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              )}
            </div>
          </div>
          
          {/* Área do título e metadados principais */}
          <div className="px-4 py-3 bg-background border-b">
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <Input 
                  value={editTitle} 
                  onChange={(e) => {
                    setEditTitle(e.target.value);
                    setHasChanges(true);
                  }}
                  className="text-lg font-semibold px-0 py-0 h-8 border-none shadow-none focus-visible:ring-0 bg-transparent max-w-full"
                  placeholder={isCreatingTask ? "Título da nova tarefa" : "Título da tarefa"}
                />
                
                <Select 
                  value={editPriority} 
                  onValueChange={(value) => {
                    setEditPriority(value);
                    setHasChanges(true);
                  }}
                >
                  <SelectTrigger className="h-6 min-h-0 px-2 py-0 ml-2 text-xs font-medium border-muted-foreground/20 bg-transparent hover:bg-muted/40 focus:ring-0 w-[85px]">
                    <span className="flex items-center gap-1.5">
                      <span className={cn(
                        "w-2 h-2 rounded-full",
                        editPriority === 'urgent' ? "bg-red-500" :
                        editPriority === 'high' ? "bg-orange-500" :
                        editPriority === 'medium' ? "bg-blue-500" :
                        "bg-green-500"
                      )} />
                      <span className="capitalize">
                        {editPriority === 'urgent' ? "Urgente" :
                         editPriority === 'high' ? "Alta" :
                         editPriority === 'medium' ? "Média" :
                         "Baixa"}
                      </span>
                    </span>
                  </SelectTrigger>
                  <SelectContent align="end" side="bottom" className="w-[100px]">
                    <SelectItem value="urgent" className="text-xs flex items-center gap-1.5 cursor-pointer">
                      <span className="flex items-center gap-1.5 text-red-500">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        <span>Urgente</span>
                      </span>
                    </SelectItem>
                    <SelectItem value="high" className="text-xs flex items-center gap-1.5 cursor-pointer">
                      <span className="flex items-center gap-1.5 text-orange-500">
                        <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                        <span>Alta</span>
                      </span>
                    </SelectItem>
                    <SelectItem value="medium" className="text-xs flex items-center gap-1.5 cursor-pointer">
                      <span className="flex items-center gap-1.5 text-blue-500">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                        <span>Média</span>
                      </span>
                    </SelectItem>
                    <SelectItem value="low" className="text-xs flex items-center gap-1.5 cursor-pointer">
                      <span className="flex items-center gap-1.5 text-green-500">
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                        <span>Baixa</span>
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center flex-wrap gap-2 mt-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5 bg-muted/30 px-2 py-0.5 rounded-full">
                  <Clock className="h-3 w-3" />
                  <span>{editDueDate || "Sem data definida"}</span>
                </div>
                
                {editAssignee && editAssignee !== "none" && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="flex items-center gap-1.5 bg-muted/30 px-2 py-0.5 rounded-full hover:bg-muted/50">
                        <User className="h-3 w-3" />
                        <Avatar className="h-3.5 w-3.5 mr-0.5">
                          <AvatarImage 
                            src={USUARIOS_DISPONIVEIS.find(u => u.id === editAssignee)?.avatar} 
                            alt={USUARIOS_DISPONIVEIS.find(u => u.id === editAssignee)?.name || ""} 
                          />
                          <AvatarFallback className="bg-primary/10 text-primary text-[8px]">
                            {USUARIOS_DISPONIVEIS.find(u => u.id === editAssignee)?.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="truncate max-w-[120px]">{USUARIOS_DISPONIVEIS.find(u => u.id === editAssignee)?.name}</span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-1" align="start">
                      <div className="text-xs p-2 font-medium border-b mb-1">Alterar responsável</div>
                      {USUARIOS_DISPONIVEIS.map(user => (
                        <div 
                          key={user.id}
                          className={cn(
                            "flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted cursor-pointer",
                            user.id === editAssignee && "bg-muted/50"
                          )}
                          onClick={() => {
                            setEditAssignee(user.id);
                            setHasChanges(true);
                          }}
                        >
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{user.name}</span>
                          {user.id === editAssignee && (
                            <Check className="h-3.5 w-3.5 ml-auto text-primary" />
                          )}
                        </div>
                      ))}
                      <Separator className="my-1" />
                      <div 
                        className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted cursor-pointer"
                        onClick={() => {
                          setEditAssignee("none");
                          setHasChanges(true);
                        }}
                      >
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Remover responsável</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
                
                {!editAssignee || editAssignee === "none" && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="flex items-center gap-1.5 bg-muted/30 px-2 py-0.5 rounded-full hover:bg-muted/50">
                        <User className="h-3 w-3" />
                        <span>Sem responsável</span>
                        <Plus className="h-3 w-3 ml-0.5" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-1" align="start">
                      <div className="text-xs p-2 font-medium border-b mb-1">Atribuir a alguém</div>
                      {USUARIOS_DISPONIVEIS.map(user => (
                        <div 
                          key={user.id}
                          className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted cursor-pointer"
                          onClick={() => {
                            setEditAssignee(user.id);
                            setHasChanges(true);
                          }}
                        >
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{user.name}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                )}
                
                {editTag ? (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="flex items-center gap-1.5 bg-primary/10 text-primary px-2 py-0.5 rounded-full hover:bg-primary/20">
                        <Tag className="h-3 w-3" />
                        <span>{editTag}</span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-1" align="start">
                      <div className="text-xs p-2 font-medium border-b mb-1">Alterar categoria</div>
                      <div className="grid grid-cols-2 gap-1 p-1">
                        {CATEGORIAS_DISPONIVEIS.map(categoria => (
                          <div 
                            key={categoria.value}
                            className={cn(
                              "flex items-center gap-1 px-2 py-1 rounded text-xs hover:bg-muted cursor-pointer",
                              editTag === categoria.label && "bg-muted/50"
                            )}
                            onClick={() => {
                              setEditTag(categoria.label);
                              setHasChanges(true);
                            }}
                          >
                            <span className={cn(
                              "w-2 h-2 rounded-full",
                              "bg-primary/70"
                            )} />
                            <span>{categoria.label}</span>
                          </div>
                        ))}
                      </div>
                      <Separator className="my-1" />
                      <div 
                        className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted cursor-pointer"
                        onClick={() => {
                          setEditTag("");
                          setHasChanges(true);
                        }}
                      >
                        <X className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm">Remover categoria</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="flex items-center gap-1.5 bg-muted/30 px-2 py-0.5 rounded-full hover:bg-muted/50">
                        <Tag className="h-3 w-3" />
                        <span>Adicionar categoria</span>
                        <Plus className="h-3 w-3 ml-0.5" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-1" align="start">
                      <div className="text-xs p-2 font-medium border-b mb-1">Escolher categoria</div>
                      <div className="grid grid-cols-2 gap-1 p-1">
                        {CATEGORIAS_DISPONIVEIS.map(categoria => (
                          <div 
                            key={categoria.value}
                            className="flex items-center gap-1 px-2 py-1 rounded text-xs hover:bg-muted cursor-pointer"
                            onClick={() => {
                              setEditTag(categoria.label);
                              setHasChanges(true);
                            }}
                          >
                            <span className={cn(
                              "w-2 h-2 rounded-full",
                              "bg-primary/70"
                            )} />
                            <span>{categoria.label}</span>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
                
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="flex items-center gap-1.5 bg-muted/30 px-2 py-0.5 rounded-full hover:bg-muted/50">
                      <Calendar className="h-3 w-3" />
                      <span>Prazo</span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <div className="p-2 border-b">
                      <h4 className="text-xs font-medium text-muted-foreground mb-2">Selecionar data</h4>
                      <div className="grid grid-cols-2 gap-1.5">
                        {quickDateOptions.map((option) => (
                          <Button
                            key={option.label}
                            variant="outline"
                            size="sm"
                            className="h-7 justify-start text-xs w-full border-muted-foreground/20 hover:bg-muted/50 transition-colors"
                            onClick={() => {
                              const newDate = startOfDay(option.value);
                              handleDateChange(newDate);
                            }}
                          >
                            <div className="flex items-center gap-1.5">
                              {option.icon}
                              <span>{option.label}</span>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={handleDateChange}
                      initialFocus
                      locale={ptBR}
                      className="rounded-none border-t"
                      weekStartsOn={0}
                      ISOWeek={false}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-0 flex flex-col h-full max-h-[calc(90vh-2px)]">
          <div className="px-6 pt-3 pb-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
              <div className="border-b">
                <TabsList className="flex h-12 bg-transparent p-0 w-full justify-start gap-8">
                  <TabsTrigger 
                    value="detalhes" 
                    className="text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-0 pb-3 pt-2 font-medium transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Detalhes
                    </div>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="comentarios" 
                    className="text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-0 pb-3 pt-2 font-medium transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Comentários
                      {comments.length > 0 && (
                        <span className="ml-1 text-xs bg-primary/10 text-primary rounded-full px-1.5 py-0.5 inline-flex items-center justify-center min-w-[20px]">
                          {comments.length}
                        </span>
                      )}
                    </div>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="atividade" 
                    className="text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-0 pb-3 pt-2 font-medium transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <History className="h-4 w-4" />
                      Atividade
                    </div>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="anexos" 
                    className="text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-0 pb-3 pt-2 font-medium transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <Paperclip className="h-4 w-4" />
                      Anexos
                    </div>
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <ScrollArea className="h-[400px] pr-4">
                <TabsContent value="detalhes" className="mt-4 space-y-6">
                  {/* Descrição da tarefa */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-primary/70" />
                        Descrição
                      </h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs text-muted-foreground hover:text-foreground"
                        onClick={() => {
                          const textarea = document.querySelector('textarea');
                          if (textarea) textarea.focus();
                        }}
                      >
                        <Edit className="h-3.5 w-3.5 mr-1.5" />
                        Editar
                      </Button>
                    </div>
                    <div className="bg-muted/30 rounded-lg border border-muted-foreground/10 p-4">
                      <Textarea 
                        value={editDescription} 
                        onChange={(e) => {
                          setEditDescription(e.target.value);
                          setHasChanges(true);
                        }}
                        className="min-h-[120px] text-sm resize-none border-none shadow-none bg-transparent focus-visible:ring-0 p-0 placeholder:text-muted-foreground/50"
                        placeholder="Adicione uma descrição detalhada da tarefa aqui..."
                      />
                    </div>
                  </div>
                  
                  {/* Detalhes da tarefa */}
                  <div className="space-y-4 mt-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Tag className="h-4 w-4 text-primary/70" />
                        Informações
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Coluna 1: Data de vencimento e Categoria */}
                      <div className="space-y-3">
                        {/* Card de Data de vencimento */}
                        <div className="flex items-center gap-3 bg-muted/30 p-4 rounded-lg hover:bg-muted/40 transition-colors border border-muted-foreground/10">
                          <div className="bg-primary/10 p-2 rounded-md">
                            <Calendar className="h-5 w-5 text-primary/80" />
                          </div>
                          <div className="flex flex-col flex-1">
                            <span className="text-xs font-medium text-muted-foreground mb-1.5">Data de vencimento</span>
                            <div className="space-y-2">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className={cn(
                                      "h-9 text-sm px-3 flex justify-between items-center w-full font-normal border-muted-foreground/20 hover:bg-muted/50 transition-colors",
                                      date ? "text-foreground" : "text-muted-foreground"
                                    )}
                                  >
                                    <div className="flex items-center gap-2">
                                      {date && (
                                        <div className={cn(
                                          "w-2 h-2 rounded-full",
                                          isToday(date) ? "bg-amber-500" : 
                                          isTomorrow(date) ? "bg-blue-500" : 
                                          "bg-green-500"
                                        )} />
                                      )}
                                      <span>{getFriendlyDateText(date)}</span>
                                    </div>
                                    <Calendar className="h-4 w-4 opacity-70" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent align="start" className="w-auto p-0" sideOffset={5}>
                                  <div className="p-3 border-b">
                                    <h4 className="text-xs font-medium text-muted-foreground mb-2">Selecionar data rápida</h4>
                                    <div className="grid grid-cols-2 gap-1.5">
                                      {quickDateOptions.map((option) => (
                                        <Button
                                          key={option.label}
                                          variant="outline"
                                          size="sm"
                                          className="h-8 justify-start text-xs w-full border-muted-foreground/20 hover:bg-muted/50 transition-colors"
                                          onClick={() => {
                                            const newDate = startOfDay(option.value);
                                            handleDateChange(newDate);
                                          }}
                                        >
                                          <div className="flex items-center gap-1.5">
                                            {option.icon}
                                            <span>{option.label}</span>
                                          </div>
                                        </Button>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="p-3 border-b flex items-center justify-between">
                                    <h4 className="text-xs font-medium text-foreground">Calendário</h4>
                                    {date && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 text-xs text-destructive hover:text-destructive"
                                        onClick={() => handleDateChange(undefined)}
                                      >
                                        <X className="h-3.5 w-3.5 mr-1" />
                                        Limpar
                                      </Button>
                                    )}
                                  </div>
                                  <div className="calendar-wrapper p-3">
                                    <style jsx global>{`
                                      .calendar-wrapper .rdp {
                                        --rdp-cell-size: 40px;
                                        margin: 0;
                                      }
                                      .calendar-wrapper .rdp-months {
                                        width: 100%;
                                      }
                                      .calendar-wrapper .rdp-month {
                                        width: 100%;
                                      }
                                      .calendar-wrapper .rdp-table {
                                        width: 100%;
                                        max-width: 100%;
                                      }
                                      .calendar-wrapper .rdp-head_cell {
                                        font-size: 0.75rem;
                                        font-weight: 500;
                                        color: var(--muted-foreground);
                                        padding: 0;
                                        text-transform: uppercase;
                                      }
                                      .calendar-wrapper .rdp-head_row {
                                        display: flex;
                                        justify-content: space-between;
                                      }
                                      .calendar-wrapper .rdp-row {
                                        display: flex;
                                        justify-content: space-between;
                                      }
                                      .calendar-wrapper .rdp-cell {
                                        text-align: center;
                                        padding: 0;
                                      }
                                      .calendar-wrapper .rdp-day {
                                        width: 40px;
                                        height: 36px;
                                        font-size: 0.875rem;
                                        margin: 0;
                                      }
                                    `}</style>
                                    <CalendarComponent
                                      mode="single"
                                      selected={date}
                                      onSelect={handleDateChange}
                                      initialFocus
                                      locale={ptBR}
                                      className="rounded-none"
                                      weekStartsOn={0}
                                      ISOWeek={false}
                                    />
                                  </div>
                                  {date && (
                                    <div className="p-3 border-t">
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-medium text-foreground">
                                          Data selecionada
                                        </span>
                                        <span className={cn(
                                          "text-xs font-medium",
                                          getDeadlineStatus(date)?.color
                                        )}>
                                          {getDeadlineStatus(date)?.label}
                                        </span>
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        {format(date, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                                      </div>
                                    </div>
                                  )}
                                </PopoverContent>
                              </Popover>
                              
                              {date && (
                                <div className={cn(
                                  "text-xs flex items-center gap-1.5 font-medium",
                                  getDeadlineStatus(date)?.color
                                )}>
                                  <Clock className="h-3 w-3" />
                                  <span>{getDeadlineStatus(date)?.label}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Card de Categoria */}
                        <div className="flex items-start gap-3 bg-muted/30 p-4 rounded-lg hover:bg-muted/40 transition-colors border border-muted-foreground/10">
                          <div className="bg-primary/10 p-2 rounded-md">
                            <Tag className="h-5 w-5 text-primary/80" />
                          </div>
                          <div className="flex flex-col flex-1">
                            <span className="text-xs font-medium text-muted-foreground mb-1.5">Categoria</span>
                            <div>
                              <Select 
                                value={editTag}
                                onValueChange={(value) => {
                                  setEditTag(value);
                                  setHasChanges(true);
                                }}
                              >
                                <SelectTrigger className="w-full h-9 text-sm border-muted-foreground/20 bg-background hover:bg-background transition-colors focus:ring-primary/30">
                                  <SelectValue placeholder="Selecione uma categoria">
                                    {editTag ? (
                                      <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="h-5 px-2 py-0 text-xs font-normal bg-primary/5 border-primary/20">
                                          {editTag}
                                        </Badge>
                                      </div>
                                    ) : (
                                      <div className="flex items-center gap-2 text-muted-foreground">
                                        <Tag className="h-4 w-4" />
                                        <span>Sem categoria</span>
                                      </div>
                                    )}
                                  </SelectValue>
                                </SelectTrigger>
                                <SelectContent className="max-h-[280px]">
                                  <div className="p-2 border-b">
                                    <h4 className="text-xs font-medium text-muted-foreground mb-1">Categorias</h4>
                                  </div>
                                  <div className="grid grid-cols-2 gap-1 p-2">
                                    {CATEGORIAS_DISPONIVEIS.map((categoria) => (
                                      <SelectItem
                                        key={categoria.value}
                                        value={categoria.label}
                                        className="py-2 my-1"
                                      >
                                        <div className="flex items-center gap-2">
                                          <Badge variant="outline" className="h-5 px-2 py-0 text-xs font-normal bg-primary/5 border-primary/20">
                                            {categoria.label}
                                          </Badge>
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </div>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Coluna 2: Responsável e Relacionado a */}
                      <div className="space-y-3">
                        {/* Card de Responsável */}
                        {task?.assignee ? (
                          <div className="flex items-center gap-3 bg-muted/30 p-4 rounded-lg hover:bg-muted/40 transition-colors border border-muted-foreground/10">
                            <div className="bg-primary/10 p-2 rounded-md">
                              <User className="h-5 w-5 text-primary/80" />
                            </div>
                            <div className="flex flex-col flex-1">
                              <span className="text-xs font-medium text-muted-foreground mb-1.5">Responsável</span>
                              <div>
                                <Select 
                                  value={editAssignee}
                                  onValueChange={(value) => {
                                    setEditAssignee(value);
                                    setHasChanges(true);
                                  }}
                                >
                                  <SelectTrigger className="w-full h-9 text-sm border-muted-foreground/20 bg-background hover:bg-background transition-colors focus:ring-primary/30">
                                    <SelectValue placeholder="Selecione um responsável">
                                      {editAssignee === "none" ? (
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                          <User className="h-4 w-4" />
                                          <span>Sem responsável</span>
                                        </div>
                                      ) : (
                                        USUARIOS_DISPONIVEIS.find(u => u.id === editAssignee) && (
                                          <div className="flex items-center gap-2">
                                            <Avatar className="h-5 w-5">
                                              <AvatarImage 
                                                src={USUARIOS_DISPONIVEIS.find(u => u.id === editAssignee)?.avatar} 
                                                alt={USUARIOS_DISPONIVEIS.find(u => u.id === editAssignee)?.name || ""} 
                                              />
                                              <AvatarFallback className="bg-primary/10 text-primary">
                                                {USUARIOS_DISPONIVEIS.find(u => u.id === editAssignee)?.name.charAt(0)}
                                              </AvatarFallback>
                                            </Avatar>
                                            <span>{USUARIOS_DISPONIVEIS.find(u => u.id === editAssignee)?.name}</span>
                                          </div>
                                        )
                                      )}
                                    </SelectValue>
                                  </SelectTrigger>
                                  <SelectContent className="max-h-[280px]">
                                    <div className="p-2 border-b">
                                      <h4 className="text-xs font-medium text-muted-foreground mb-1">Responsável</h4>
                                    </div>
                                    <SelectItem value="none" className="py-2 my-1">
                                      <div className="flex items-center gap-2 text-muted-foreground">
                                        <User className="h-4 w-4" />
                                        <span>Sem responsável</span>
                                      </div>
                                    </SelectItem>
                                    <div className="p-2 border-t">
                                      <h4 className="text-xs font-medium text-muted-foreground mb-1">Equipe</h4>
                                    </div>
                                    {USUARIOS_DISPONIVEIS.map((usuario) => (
                                      <SelectItem
                                        key={usuario.id}
                                        value={usuario.id}
                                        className="py-2 my-1"
                                      >
                                        <div className="flex items-center gap-2">
                                          <Avatar className="h-5 w-5">
                                            <AvatarImage src={usuario.avatar} alt={usuario.name} />
                                            <AvatarFallback className="bg-primary/10 text-primary">{usuario.name.charAt(0)}</AvatarFallback>
                                          </Avatar>
                                          <span className="text-sm">{usuario.name}</span>
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3 bg-muted/30 p-4 rounded-lg hover:bg-muted/40 transition-colors border border-muted-foreground/10">
                            <div className="bg-primary/10 p-2 rounded-md">
                              <User className="h-5 w-5 text-primary/80" />
                            </div>
                            <div className="flex flex-col flex-1">
                              <span className="text-xs font-medium text-muted-foreground mb-1.5">Responsável</span>
                              <div>
                                <Select 
                                  value={editAssignee}
                                  onValueChange={(value) => {
                                    setEditAssignee(value);
                                    setHasChanges(true);
                                  }}
                                >
                                  <SelectTrigger className="w-full h-9 text-sm border-muted-foreground/20 bg-background hover:bg-background transition-colors focus:ring-primary/30">
                                    <SelectValue placeholder="Selecione um responsável">
                                      {editAssignee === "none" ? (
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                          <User className="h-4 w-4" />
                                          <span>Sem responsável</span>
                                        </div>
                                      ) : (
                                        USUARIOS_DISPONIVEIS.find(u => u.id === editAssignee) && (
                                          <div className="flex items-center gap-2">
                                            <Avatar className="h-5 w-5">
                                              <AvatarImage 
                                                src={USUARIOS_DISPONIVEIS.find(u => u.id === editAssignee)?.avatar} 
                                                alt={USUARIOS_DISPONIVEIS.find(u => u.id === editAssignee)?.name || ""} 
                                              />
                                              <AvatarFallback className="bg-primary/10 text-primary">
                                                {USUARIOS_DISPONIVEIS.find(u => u.id === editAssignee)?.name.charAt(0)}
                                              </AvatarFallback>
                                            </Avatar>
                                            <span>{USUARIOS_DISPONIVEIS.find(u => u.id === editAssignee)?.name}</span>
                                          </div>
                                        )
                                      )}
                                    </SelectValue>
                                  </SelectTrigger>
                                  <SelectContent className="max-h-[280px]">
                                    <div className="p-2 border-b">
                                      <h4 className="text-xs font-medium text-muted-foreground mb-1">Responsável</h4>
                                    </div>
                                    <SelectItem value="none" className="py-2 my-1">
                                      <div className="flex items-center gap-2 text-muted-foreground">
                                        <User className="h-4 w-4" />
                                        <span>Sem responsável</span>
                                      </div>
                                    </SelectItem>
                                    <div className="p-2 border-t">
                                      <h4 className="text-xs font-medium text-muted-foreground mb-1">Equipe</h4>
                                    </div>
                                    {USUARIOS_DISPONIVEIS.map((usuario) => (
                                      <SelectItem
                                        key={usuario.id}
                                        value={usuario.id}
                                        className="py-2 my-1"
                                      >
                                        <div className="flex items-center gap-2">
                                          <Avatar className="h-5 w-5">
                                            <AvatarImage src={usuario.avatar} alt={usuario.name} />
                                            <AvatarFallback className="bg-primary/10 text-primary">{usuario.name.charAt(0)}</AvatarFallback>
                                          </Avatar>
                                          <span className="text-sm">{usuario.name}</span>
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* Card de Relacionado a */}
                        <div className="flex items-center gap-3 bg-muted/30 p-4 rounded-lg hover:bg-muted/40 transition-colors border border-muted-foreground/10">
                          <div className="bg-primary/10 p-2 rounded-md">
                            <Link2 className="h-5 w-5 text-primary/80" />
                          </div>
                          <div className="flex flex-col flex-1">
                            <span className="text-xs font-medium text-muted-foreground mb-1.5">Relacionado a</span>
                            <div>
                              <Select 
                                value={editRelatedItem}
                                onValueChange={(value) => {
                                  setEditRelatedItem(value);
                                  // Encontrar o tipo do item relacionado
                                  const item = ITENS_RELACIONADOS.find(i => i.id === value);
                                  if (item) {
                                    setEditRelatedType(item.type);
                                  } else {
                                    setEditRelatedType("");
                                  }
                                  setHasChanges(true);
                                }}
                              >
                                <SelectTrigger className="w-full h-9 text-sm border-muted-foreground/20 bg-background hover:bg-background transition-colors focus:ring-primary/30">
                                  <SelectValue placeholder="Selecione uma vaga">
                                    {editRelatedItem === "none" ? (
                                      <div className="flex items-center gap-2 text-muted-foreground">
                                        <Link2 className="h-4 w-4" />
                                        <span>Sem vaga relacionada</span>
                                      </div>
                                    ) : (
                                      ITENS_RELACIONADOS.find(i => i.id === editRelatedItem) && (
                                        <div className="flex items-center gap-2">
                                          <Tag className="h-4 w-4 text-primary/70" />
                                          <span>{ITENS_RELACIONADOS.find(i => i.id === editRelatedItem)?.title}</span>
                                        </div>
                                      )
                                    )}
                                  </SelectValue>
                                </SelectTrigger>
                                <SelectContent className="max-h-[280px]">
                                  <div className="p-2 border-b">
                                    <h4 className="text-xs font-medium text-muted-foreground mb-1">Vagas disponíveis</h4>
                                  </div>
                                  <SelectItem value="none" className="py-2 my-1">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                      <Link2 className="h-4 w-4" />
                                      <span>Sem vaga relacionada</span>
                                    </div>
                                  </SelectItem>
                                  
                                  {ITENS_RELACIONADOS.map((item) => (
                                    <SelectItem
                                      key={item.id}
                                      value={item.id}
                                      className="py-2 my-1"
                                    >
                                      <div className="flex items-center gap-2">
                                        <Tag className="h-4 w-4 text-primary/70" />
                                        <span>{item.title}</span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Linha extra para Comentários e Anexos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div 
                        className="flex items-center gap-3 bg-muted/30 p-4 rounded-lg hover:bg-muted/40 hover:border-primary/20 transition-colors cursor-pointer relative border border-muted-foreground/10"
                        onClick={() => setActiveTab("comentarios")}
                      >
                        <div className="bg-primary/10 p-2 rounded-md">
                          <MessageSquare className="h-5 w-5 text-primary/80" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-muted-foreground mb-1.5">Comentários</span>
                          <span className="text-sm font-medium">{comments.length} comentários</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground/50 absolute right-3" />
                      </div>
                      
                      <div 
                        className="flex items-center gap-3 bg-muted/30 p-4 rounded-lg hover:bg-muted/40 hover:border-primary/20 transition-colors cursor-pointer relative border border-muted-foreground/10"
                        onClick={() => setActiveTab("anexos")}
                      >
                        <div className="bg-primary/10 p-2 rounded-md">
                          <Paperclip className="h-5 w-5 text-primary/80" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-muted-foreground mb-1.5">Anexos</span>
                          <span className="text-sm font-medium">0 anexos</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground/50 absolute right-3" />
                      </div>
                    </div>
                    
                    {/* Espaçamento adicional após a seção de informações */}
                    <div className="mb-8"></div>
                  </div>
                </TabsContent>
                
                <TabsContent value="comentarios" className="mt-4 space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-primary/70" />
                        Comentários
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {comments.length} {comments.length === 1 ? 'comentário' : 'comentários'}
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary">V</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <div className="bg-muted/30 rounded-lg border border-muted-foreground/10 p-1">
                            <Textarea 
                              placeholder="Adicione um comentário..." 
                              className="min-h-[80px] text-sm resize-none border-none shadow-none bg-transparent focus-visible:ring-0 p-2 placeholder:text-muted-foreground/50"
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                            />
                            <div className="flex justify-end p-2 pt-0">
                              <Button 
                                size="sm" 
                                className="h-8 text-xs"
                                onClick={handleAddComment}
                                disabled={!newComment.trim()}
                              >
                                <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                                Comentar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {comments.length > 0 ? (
                        <div className="space-y-3 mt-4">
                          {comments.map((comment) => (
                            <div key={comment.id} className="flex items-start gap-3">
                              <Avatar className="h-7 w-7">
                                <AvatarFallback className="bg-primary/10 text-primary">{comment.author.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 bg-muted/30 p-3 rounded-lg border border-muted-foreground/10">
                                <div className="flex items-center justify-between mb-1">
                                  <p className="text-sm font-medium">{comment.author}</p>
                                  <span className="text-xs text-muted-foreground">{getTimeAgo(comment.createdAt)}</span>
                                </div>
                                <p className="text-sm">{comment.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-8 bg-muted/20 rounded-lg mt-4 border border-dashed border-muted-foreground/20">
                          <MessageSquare className="h-6 w-6 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">Nenhum comentário ainda</p>
                          <p className="text-xs text-muted-foreground mt-1">Seja o primeiro a comentar</p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="atividade" className="mt-4 space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
                        <History className="h-4 w-4 text-primary/70" />
                        Histórico de atividades
                      </h3>
                    </div>
                    
                    <div className="relative pl-4 border-l-2 border-muted-foreground/20 space-y-4 ml-2">
                      <div className="flex items-start gap-3">
                        <div className="absolute -left-[13px] bg-primary/10 p-1.5 rounded-full">
                          <History className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 bg-muted/30 p-3 rounded-lg border border-muted-foreground/10">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium">Tarefa atualizada</p>
                            <span className="text-xs text-muted-foreground">{task?.updatedAt ? getTimeAgo(task.updatedAt) : "-"}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Status alterado para {task?.status ? renderStatusBadge(task.status) : renderStatusBadge('pending')}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="absolute -left-[13px] bg-primary/10 p-1.5 rounded-full">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 bg-muted/30 p-3 rounded-lg border border-muted-foreground/10">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium">Tarefa criada</p>
                            <span className="text-xs text-muted-foreground">{task?.createdAt ? getTimeAgo(task.createdAt) : "-"}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {task?.assignee ? `Atribuída a ${task.assignee.name}` : "Sem responsável atribuído"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="anexos" className="mt-4 space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Paperclip className="h-4 w-4 text-primary/70" />
                        Anexos
                      </h3>
                      <Button variant="outline" size="sm" className="h-8 text-xs">
                        <Paperclip className="h-3.5 w-3.5 mr-1.5" />
                        Adicionar
                      </Button>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center py-10 bg-muted/20 rounded-lg border border-dashed border-muted-foreground/20">
                      <div className="bg-primary/10 p-3 rounded-full mb-3">
                        <Paperclip className="h-6 w-6 text-primary/80" />
                      </div>
                      <p className="text-sm font-medium text-foreground mb-1">Nenhum anexo disponível</p>
                      <p className="text-xs text-muted-foreground">Arraste arquivos aqui ou clique em "Adicionar"</p>
                      <Button variant="outline" size="sm" className="h-8 text-xs mt-4">
                        <Paperclip className="h-3.5 w-3.5 mr-1.5" />
                        Adicionar arquivo
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>
          
          <div className="mt-auto border-t">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={onClose}
                  className="h-9 text-xs px-4 hover:bg-muted/50"
                >
                  Fechar
                </Button>
                
                {hasChanges && (
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={isCreatingTask ? onClose : cancelEdit}
                    className="h-9 text-xs px-4 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <X className="h-3.5 w-3.5 mr-1.5" />
                    {isCreatingTask ? "Cancelar" : "Descartar"}
                  </Button>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                {hasChanges && (
                  <span className="text-xs text-amber-500 flex items-center gap-1.5">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {isCreatingTask ? "Tarefa não salva" : "Alterações não salvas"}
                  </span>
                )}
                
                <Button 
                  size="sm"
                  onClick={saveChanges}
                  className={cn(
                    "h-9 text-xs px-5",
                    hasChanges ? "bg-primary hover:bg-primary/90" : "bg-muted-foreground/30 hover:bg-muted-foreground/40 text-muted-foreground"
                  )}
                  disabled={!hasChanges || !editTitle.trim()}
                >
                  {isCreatingTask ? (
                    <>
                      <Plus className="h-3.5 w-3.5 mr-1.5" />
                      Criar Tarefa
                    </>
                  ) : hasChanges ? (
                    <>
                      <Save className="h-3.5 w-3.5 mr-1.5" />
                      Salvar alterações
                    </>
                  ) : (
                    <>
                      <Check className="h-3.5 w-3.5 mr-1.5" />
                      Salvo
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 