'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CalendarDays, CheckCircle, MoreHorizontal, Edit, Copy, Trash2, Eye, ArrowRight } from "lucide-react";
import { useTasks } from "@/app/contexts/tasks/tasksContext";
import { TaskColumn } from "./TaskColumn";
import { useState } from "react";
import { TaskViewModal } from "./TaskViewModal";
import { Task } from "@/app/contexts/tasks/tasksContext";
import {
  DndContext, 
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  closestCorners,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { toast } from "@/components/ui/use-toast";

/**
 * Componente de visualização em Kanban das tarefas
 */
export function TaskKanban() {
  const { 
    sortedTasks,
    updateTaskStatus,
    openEditTaskModal,
    duplicateTask,
    setCurrentTask,
    setIsDeleteDialogOpen,
    setContextMenu,
    tasks
  } = useTasks();
  
  // Estado para controlar o modal de visualização
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  
  // Estados para controlar o drag-and-drop
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  // Sensores para controlar o drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
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

  // Handler de início de drag
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
    
    const task = tasks.find(t => t.id === active.id);
    if (task) {
      setDraggedTask(task);
    }
  };
  
  // Handler durante o drag
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    
    if (!over) return;
    
    // Extrair IDs e tipos
    const activeId = active.id as string;
    const overId = over.id as string;
    
    // Não fazer nada se estiver sobre o mesmo item
    if (activeId === overId) return;
  };
  
  // Handler de fim de drag
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    // Limpar os estados de arrasto
    setActiveId(null);
    setDraggedTask(null);
    
    if (!over) return;
    
    // Não fazer nada se arrastar sobre o mesmo item
    if (active.id === over.id) return;
    
    // Extrair IDs
    const activeId = active.id as string;
    const overId = over.id as string;
    
    // Se estiver arrastando sobre uma coluna (status)
    if (overId.toString().startsWith('status-')) {
      const newStatus = overId.toString().replace('status-', '') as "pending" | "in-progress" | "completed" | "cancelled";
      
      // Verificar se a tarefa está realmente se movendo para um status diferente
      const taskToMove = tasks.find(t => t.id === activeId);
      if (!taskToMove) return;
      
      // Não fazer nada se estiver no mesmo status
      if (taskToMove.status === newStatus) return;
      
      // Atualizar o status da tarefa
      updateTaskStatus(activeId, newStatus);
      
      // Notificar o usuário sobre a mudança
      toast({
        title: "Tarefa movida",
        description: `Tarefa movida para ${getStatusLabel(newStatus)}`,
      });
    }
  };
  
  // Função para obter o label do status
  const getStatusLabel = (status: string): string => {
    switch(status) {
      case 'pending': return 'Pendentes';
      case 'in-progress': return 'Em Andamento';
      case 'completed': return 'Concluídas';
      case 'cancelled': return 'Canceladas';
      default: return status;
    }
  };

  // Componente para item arrastável
  const DraggableTaskCard = ({ task }: { task: Task }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging
    } = useSortable({
      id: task.id,
      data: {
        type: 'task',
        task,
      },
    });
    
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
      zIndex: isDragging ? 999 : 1,
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
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-white dark:bg-gray-800 border rounded-md p-3 mb-2 shadow-sm hover:shadow-md transition-shadow cursor-grab"
        onClick={() => openViewModal(task.id)}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2 flex-1">
            <Checkbox
              id={`task-${task.id}`}
              checked={task.status === "completed"}
              onCheckedChange={() => updateTaskStatus(task.id, task.status === "completed" ? "pending" : "completed")}
              onClick={(e) => e.stopPropagation()}
            />
            <div className="flex-1">
              <p className="font-medium text-sm leading-tight line-clamp-2">{task.title}</p>
              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{task.description}</p>
              
              <div className="mt-3 flex flex-wrap gap-2">
                {renderPriorityBadge(task.priority)}
                
                {task.dueDate && (
                  <Badge variant="outline" className="gap-1 text-xs">
                    <CalendarDays className="h-3 w-3" />
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
                updateTaskStatus(task.id, task.status === "completed" ? "pending" : "completed");
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
      </div>
    );
  };
  
  // Componente para coluna arrastável
  const DroppableStatusColumn = ({ status, children }: { status: string, children: React.ReactNode }) => {
    // Mapear status para rótulos e cores
    const statusConfig: Record<string, { title: string, icon: React.ReactNode, color: string }> = {
      "pending": { 
        title: "Pendentes", 
        icon: <CalendarDays className="h-4 w-4 text-amber-500" />, 
        color: "bg-amber-50 border-amber-100" 
      },
      "in-progress": { 
        title: "Em Andamento", 
        icon: <CalendarDays className="h-4 w-4 text-blue-500" />, 
        color: "bg-blue-50 border-blue-100" 
      },
      "completed": { 
        title: "Concluídas", 
        icon: <CheckCircle className="h-4 w-4 text-emerald-500" />, 
        color: "bg-emerald-50 border-emerald-100" 
      },
      "cancelled": { 
        title: "Canceladas", 
        icon: <CalendarDays className="h-4 w-4 text-gray-500" />, 
        color: "bg-gray-50 border-gray-100" 
      }
    };
    
    const { title, icon, color } = statusConfig[status] || { 
      title: status, 
      icon: <CalendarDays className="h-4 w-4" />, 
      color: "bg-gray-50 border-gray-100" 
    };
    
    const {
      setNodeRef,
    } = useSortable({
      id: `status-${status}`,
      data: {
        type: 'status',
        status,
      },
    });
    
    return (
      <div
        ref={setNodeRef}
        className="flex-shrink-0 w-[280px]"
      >
        <div className={`border rounded-t-md ${color} p-3 font-medium flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            {icon}
            <span>{title}</span>
            <Badge variant="outline" className="ml-2">{tasks.filter(t => t.status === status).length}</Badge>
          </div>
        </div>
        <div className="border border-t-0 rounded-b-md p-2 bg-muted/20 min-h-[500px]">
          {children}
          
          {tasks.filter(t => t.status === status).length === 0 && (
            <div className="flex items-center justify-center h-20 border border-dashed rounded-md mt-2">
              <p className="text-xs text-muted-foreground">Sem tarefas neste status</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Agrupar tarefas por status
  const statusGroups = ["pending", "in-progress", "completed", "cancelled"];

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToParentElement]}
        id="kanban-board"
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {statusGroups.map((status) => (
            <DroppableStatusColumn key={`status-${status}`} status={status}>
              <SortableContext 
                items={tasks.filter(t => t.status === status).map(t => t.id)} 
                strategy={verticalListSortingStrategy}
              >
                {tasks.filter(t => t.status === status).map((task) => (
                  <DraggableTaskCard key={task.id} task={task} />
                ))}
              </SortableContext>
            </DroppableStatusColumn>
          ))}
        </div>
        
        <DragOverlay>
          {draggedTask ? (
            <div className="bg-white dark:bg-gray-800 border rounded-md p-3 shadow-xl w-[256px]">
              <div className="flex items-start gap-2">
                <Checkbox checked={draggedTask.status === "completed"} />
                <div className="flex-1">
                  <p className="font-medium text-sm leading-tight">{draggedTask.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{draggedTask.description}</p>
                </div>
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
      
      {/* Modal de visualização de tarefa */}
      <TaskViewModal 
        isOpen={viewModalOpen} 
        onClose={closeViewModal} 
        taskId={selectedTaskId} 
      />
    </>
  );
} 