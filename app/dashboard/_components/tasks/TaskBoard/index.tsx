'use client';

import { useRef, useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTasks } from "@/app/contexts/tasks/tasksContext";
import { TaskList } from "./TaskList";
import { TaskKanban } from "./TaskKanban";
import { TasksCalendar } from "./TasksCalendar";
import { FileText, Layout, Calendar, BarChart, ChevronDown, MoreHorizontal, Eye, Edit, CheckCircle, Copy, Trash2, ArrowUpDown, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { TaskViewModal } from "./TaskViewModal";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

/**
 * Componente principal do quadro de tarefas
 * Ajustado para se integrar ao novo layout unificado
 */
export function TaskBoard() {
  const { 
    activeView, 
    setActiveView, 
    contextMenu, 
    setContextMenu,
    tasks
  } = useTasks();
  
  // Estado para controlar a ordenação
  const [sortBy, setSortBy] = useState("dueDate");
  
  // Estado para controlar o modal de visualização
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  
  const contextMenuRef = useRef<HTMLDivElement>(null);

  // Fechar menu de contexto ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contextMenu.visible &&
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        setContextMenu(prev => ({ ...prev, visible: false }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contextMenu.visible, setContextMenu]);

  // Função para renderizar o ícone de prioridade
  const renderPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge className="bg-red-500 text-white">Urgente</Badge>;
      case 'high':
        return <Badge className="bg-orange-500 text-white">Alta</Badge>;
      case 'medium':
        return <Badge className="bg-blue-500 text-white">Média</Badge>;
      case 'low':
        return <Badge className="bg-green-500 text-white">Baixa</Badge>;
      default:
        return null;
    }
  };

  // Função para renderizar o ícone de status
  const renderStatusBadge = (status: string) => {
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
        return null;
    }
  };
  
  // Função para abrir o modal de visualização
  const openViewModal = (taskId: string) => {
    setSelectedTaskId(taskId);
    setViewModalOpen(true);
  };
  
  // Função para fechar o modal de visualização
  const closeViewModal = () => {
    setViewModalOpen(false);
    setSelectedTaskId(null);
  };

  return (
    <>
      <div className="flex flex-col h-full">
        {/* Cabeçalho do quadro com abas e opções */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-2">
            <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
              <TabsList className="bg-transparent h-auto p-0 border-0 w-full sm:w-auto justify-start">
                <TabsTrigger 
                  value="list" 
                  className="flex-1 sm:flex-initial relative h-10 rounded-md data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-3 transition-all data-[state=active]:shadow-none"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  <span>Lista</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="kanban" 
                  className="flex-1 sm:flex-initial relative h-10 rounded-md data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-3 transition-all data-[state=active]:shadow-none"
                >
                  <Layout className="h-4 w-4 mr-2" />
                  <span>Kanban</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="calendar" 
                  className="flex-1 sm:flex-initial relative h-10 rounded-md data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-3 transition-all data-[state=active]:shadow-none"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Agenda</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            {/* Opções de ordenação */}
            <div className="flex items-center gap-2 ml-auto pb-2 sm:pb-0">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 gap-1 text-xs bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm min-w-[120px]">
                          <ArrowUpDown className="h-3.5 w-3.5 text-primary mr-1" />
                          <span className="whitespace-nowrap">Ordenar por</span>
                          <ChevronDown className="h-3 w-3 opacity-50 ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56 border-gray-200 dark:border-gray-700">
                        <DropdownMenuCheckboxItem 
                          className="cursor-pointer"
                          checked={sortBy === "dueDate"}
                          onCheckedChange={() => setSortBy("dueDate")}
                        >
                          <Calendar className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                          Data de vencimento
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem 
                          className="cursor-pointer"
                          checked={sortBy === "priority"}
                          onCheckedChange={() => setSortBy("priority")}
                        >
                          <span className="flex h-3.5 w-3.5 mr-2 rounded-full bg-red-500"></span>
                          Prioridade
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem 
                          className="cursor-pointer"
                          checked={sortBy === "title"}
                          onCheckedChange={() => setSortBy("title")}
                        >
                          <FileText className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                          Título
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem 
                          className="cursor-pointer"
                          checked={sortBy === "createdAt"}
                          onCheckedChange={() => setSortBy("createdAt")}
                        >
                          <Clock className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                          Data de criação
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Ordenar tarefas</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800">
                      <BarChart className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Visualizar estatísticas</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        
        {/* Conteúdo das abas */}
        <div className="flex-1 overflow-auto p-4">
          {activeView === "list" && <TaskList sortBy={sortBy} />}
          {activeView === "kanban" && <TaskKanban />}
          {activeView === "calendar" && <TasksCalendar />}
        </div>
      </div>
      
      {/* Modal de visualização de tarefa */}
      <TaskViewModal 
        isOpen={viewModalOpen} 
        onClose={closeViewModal} 
        taskId={selectedTaskId} 
      />
      
      {/* Menu de contexto */}
      {contextMenu.visible && (
        <div
          ref={contextMenuRef}
          className="fixed bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 py-1 w-48 z-50"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground mb-1 border-b">
            Ações da tarefa
          </div>
          <div
            className="px-2 py-1.5 text-sm cursor-pointer hover:bg-muted flex items-center"
            onClick={() => {
              openViewModal(contextMenu.taskId);
              setContextMenu(prev => ({ ...prev, visible: false }));
            }}
          >
            <Eye className="mr-2 h-4 w-4" />
            Visualizar
          </div>
          <div
            className="px-2 py-1.5 text-sm cursor-pointer hover:bg-muted flex items-center"
            onClick={() => {
              useTasks().openEditTaskModal(contextMenu.taskId);
              setContextMenu(prev => ({ ...prev, visible: false }));
            }}
          >
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </div>
          <div
            className="px-2 py-1.5 text-sm cursor-pointer hover:bg-muted flex items-center"
            onClick={() => {
              useTasks().toggleTaskStatus(contextMenu.taskId);
              setContextMenu(prev => ({ ...prev, visible: false }));
            }}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            {tasks.find(t => t.id === contextMenu.taskId)?.status === "completed"
              ? "Marcar como pendente"
              : "Marcar como concluída"}
          </div>
          <div
            className="px-2 py-1.5 text-sm cursor-pointer hover:bg-muted flex items-center"
            onClick={() => {
              useTasks().duplicateTask(contextMenu.taskId);
              setContextMenu(prev => ({ ...prev, visible: false }));
            }}
          >
            <Copy className="mr-2 h-4 w-4" />
            Duplicar
          </div>
          <div
            className="px-2 py-1.5 text-sm cursor-pointer hover:bg-muted flex items-center text-red-500"
            onClick={() => {
              useTasks().setCurrentTask(tasks.find(t => t.id === contextMenu.taskId) || null);
              useTasks().setIsDeleteDialogOpen(true);
              setContextMenu(prev => ({ ...prev, visible: false }));
            }}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Excluir
          </div>
        </div>
      )}
    </>
  );
} 