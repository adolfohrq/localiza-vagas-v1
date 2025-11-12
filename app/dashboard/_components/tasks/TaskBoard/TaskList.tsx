'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar as CalendarIcon, CheckCircle, Edit, Copy, Trash2, MoreHorizontal, Eye, ChevronDown, Tag } from "lucide-react";
import { useTasks } from "@/app/contexts/tasks/tasksContext";
import { useState } from "react";
import { TaskViewModal } from "./TaskViewModal";

/**
 * Componente de visualização em lista das tarefas
 */
export interface TaskListProps {
  sortBy?: string;
}

export function TaskList({ sortBy = "dueDate" }: TaskListProps) {
  const { 
    sortedTasks, 
    toggleTaskStatus,
    openEditTaskModal,
    updateTaskStatus,
    duplicateTask,
    setCurrentTask,
    setIsDeleteDialogOpen,
    handleSort,
    sortOrder,
    selectedTask,
    handleTaskClick,
    setContextMenu
  } = useTasks();
  
  // Estado para controlar o modal de visualização
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  
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
  
  // Função para renderizar o ícone de prioridade
  const renderPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge className="bg-red-500 text-white hover:bg-red-500">Urgente</Badge>;
      case 'high':
        return <Badge className="bg-orange-500 text-white hover:bg-orange-500">Alta</Badge>;
      case 'medium':
        return <Badge className="bg-blue-500 text-white hover:bg-blue-500">Média</Badge>;
      case 'low':
        return <Badge className="bg-green-500 text-white hover:bg-green-500">Baixa</Badge>;
      default:
        return null;
    }
  };

  // Função para renderizar o badge de status
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
  
  // Função para renderizar o badge de categoria
  const renderCategoryBadge = (task: any) => {
    // Verificar se a tarefa tem tags ou relatedTo para determinar a categoria
    // Esta é uma implementação simplificada - em um caso real, você teria um campo específico para categoria
    
    // Verificar primeiro no relatedTo
    if (task.relatedTo) {
      switch (task.relatedTo.type) {
        case 'interview':
          return <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-100">Entrevistas</Badge>;
        case 'job':
          return <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Contratação</Badge>;
        default:
          break;
      }
    }
    
    // Verificar nas tags
    if (task.tags && task.tags.length > 0) {
      const lowerTags = task.tags.map((tag: string) => tag.toLowerCase());
      
      if (lowerTags.some((tag: string) => tag.includes('reuni') || tag.includes('meet'))) {
        return <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">Reunião</Badge>;
      }
      
      if (lowerTags.some((tag: string) => tag.includes('contato') || tag.includes('contact'))) {
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Entrar em Contato</Badge>;
      }
      
      if (lowerTags.some((tag: string) => tag.includes('revis') || tag.includes('review'))) {
        return <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">Revisar</Badge>;
      }
    }
    
    // Categoria padrão baseada no ID da tarefa para demonstração
    const taskIdNum = parseInt(task.id.replace(/\D/g, '')) || 0;
    const categories = [
      { name: 'Entrevistas', class: 'bg-purple-100 text-purple-800 hover:bg-purple-100' },
      { name: 'Contratação', class: 'bg-blue-100 text-blue-800 hover:bg-blue-100' },
      { name: 'Reunião', class: 'bg-green-100 text-green-800 hover:bg-green-100' },
      { name: 'Entrar em Contato', class: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' },
      { name: 'Revisar', class: 'bg-red-100 text-red-800 hover:bg-red-100' }
    ];
    
    const category = categories[taskIdNum % categories.length];
    return <Badge variant="secondary" className={category.class}>{category.name}</Badge>;
  };

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-xs">
                  <th 
                    className="text-left py-3 px-4 font-medium cursor-pointer"
                    onClick={() => handleSort("title")}
                  >
                    Título
                    {sortBy === "title" && (
                      <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                    )}
                  </th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th 
                    className="text-left py-3 px-4 font-medium cursor-pointer"
                    onClick={() => handleSort("priority")}
                  >
                    Prioridade
                    {sortBy === "priority" && (
                      <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                    )}
                  </th>
                  <th className="text-left py-3 px-4 font-medium">Categoria</th>
                  <th 
                    className="text-left py-3 px-4 font-medium cursor-pointer"
                    onClick={() => handleSort("dueDate")}
                  >
                    Vencimento
                    {sortBy === "dueDate" && (
                      <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                    )}
                  </th>
                  <th className="py-3 px-4 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {sortedTasks.map((task) => (
                  <tr 
                    key={task.id}
                    className={`border-b hover:bg-muted/30 transition-colors ${selectedTask === task.id ? 'bg-muted/50' : ''}`}
                    onClick={() => openViewModal(task.id)}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      setContextMenu({
                        x: e.clientX,
                        y: e.clientY,
                        taskId: task.id,
                        visible: true
                      });
                    }}
                  >
                    <td className="py-3 px-4 max-w-[300px]">
                      <div className="font-medium truncate">{task.title}</div>
                      <div className="text-xs text-muted-foreground truncate mt-1">{task.description}</div>
                    </td>
                    <td className="py-3 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-1 cursor-pointer hover:bg-muted/50 px-2 py-1 rounded">
                            {renderStatusBadge(task.status)}
                            <ChevronDown className="h-3 w-3 text-muted-foreground" />
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <DropdownMenuLabel>Alterar status</DropdownMenuLabel>
                          <DropdownMenuItem 
                            className={task.status === "pending" ? "bg-muted" : ""}
                            onClick={(e) => {
                              e.stopPropagation();
                              updateTaskStatus(task.id, "pending");
                            }}
                          >
                            <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50 mr-2">Pendente</Badge>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className={task.status === "in-progress" ? "bg-muted" : ""}
                            onClick={(e) => {
                              e.stopPropagation();
                              updateTaskStatus(task.id, "in-progress");
                            }}
                          >
                            <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50 mr-2">Em Andamento</Badge>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className={task.status === "completed" ? "bg-muted" : ""}
                            onClick={(e) => {
                              e.stopPropagation();
                              updateTaskStatus(task.id, "completed");
                            }}
                          >
                            <Badge variant="outline" className="text-emerald-500 border-emerald-200 bg-emerald-50 mr-2">Concluída</Badge>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className={task.status === "cancelled" ? "bg-muted" : ""}
                            onClick={(e) => {
                              e.stopPropagation();
                              updateTaskStatus(task.id, "cancelled");
                            }}
                          >
                            <Badge variant="outline" className="text-gray-500 border-gray-200 bg-gray-50 mr-2">Cancelada</Badge>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                    <td className="py-3 px-4">
                      {renderPriorityBadge(task.priority)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                        {renderCategoryBadge(task)}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <CalendarIcon className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        <span className="text-sm">{task.dueDate}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            openViewModal(task.id);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            openEditTaskModal(task.id);
                          }}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            toggleTaskStatus(task.id);
                          }}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            {task.status === "completed" ? "Marcar como pendente" : "Marcar como concluída"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            duplicateTask(task.id);
                          }}>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive focus:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentTask(task);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
                
                {sortedTasks.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted-foreground">
                      Nenhuma tarefa encontrada
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Modal de visualização de tarefa */}
      <TaskViewModal 
        isOpen={viewModalOpen} 
        onClose={closeViewModal} 
        taskId={selectedTaskId} 
      />
    </>
  );
} 