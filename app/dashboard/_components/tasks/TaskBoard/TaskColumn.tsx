'use client';

import { ReactNode, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, CheckCircle, Edit, Copy, Trash2, MoreHorizontal, Eye } from "lucide-react";
import { useTasks } from "@/app/contexts/tasks/tasksContext";
import { Task } from "@/app/contexts/tasks/tasksContext";
import { TaskViewModal } from "./TaskViewModal";

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  status: "pending" | "in-progress" | "completed" | "cancelled";
  icon: ReactNode;
  color: string;
}

/**
 * Componente de coluna do quadro Kanban
 */
export function TaskColumn({ title, tasks, status, icon, color }: TaskColumnProps) {
  const { 
    updateTaskStatus, 
    toggleTaskStatus, 
    openEditTaskModal, 
    duplicateTask, 
    setCurrentTask, 
    setIsDeleteDialogOpen,
    setContextMenu,
    handleTaskClick,
    selectedTask
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

  // Função para renderizar o badge de prioridade
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

  return (
    <>
      <div className={`border rounded-md ${color} flex flex-col`}>
        <div className="p-3 font-medium flex items-center justify-between border-b">
          <div className="flex items-center gap-2">
            {icon}
            <span>{title}</span>
            <Badge variant="outline" className="ml-2">{tasks.length}</Badge>
          </div>
        </div>
        <div className="flex-grow overflow-auto p-2 space-y-2 min-h-[400px]">
          {tasks.map(task => (
            <Card 
              key={task.id}
              className={`mb-2 hover:shadow-md transition-all cursor-pointer ${selectedTask === task.id ? 'ring-2 ring-primary ring-opacity-50' : ''}`}
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
              <CardContent className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 flex-1">
                    <Checkbox
                      id={`task-${task.id}`}
                      checked={task.status === "completed"}
                      onCheckedChange={() => toggleTaskStatus(task.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm leading-tight">{task.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{task.description}</p>
                      
                      <div className="mt-3 flex flex-wrap gap-2">
                        {renderPriorityBadge(task.priority)}
                        
                        {task.dueDate && (
                          <Badge variant="outline" className="gap-1 text-xs">
                            <CalendarIcon className="h-3 w-3" />
                            {task.dueDate}
                          </Badge>
                        )}
                        
                        {task.tags && task.tags.length > 0 && (
                          <div className="flex gap-1 flex-wrap mt-1">
                            {task.tags.slice(0, 2).map((tag, index) => (
                              <Badge variant="secondary" key={index} className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {task.tags.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{task.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Opções</span>
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
                        {task.status === "completed" ? "Marcar como pendente" : "Concluir"}
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
                </div>
              </CardContent>
            </Card>
          ))}
          
          {tasks.length === 0 && (
            <div className="text-center py-8 px-2 text-sm text-muted-foreground h-full flex items-center justify-center">
              <p>Arraste tarefas para esta coluna</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Modal de visualização de tarefa */}
      <TaskViewModal 
        isOpen={viewModalOpen} 
        onClose={closeViewModal} 
        taskId={selectedTaskId} 
      />
    </>
  );
} 