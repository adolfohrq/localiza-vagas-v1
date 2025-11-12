'use client';

import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { 
  CalendarDays, 
  Plus, 
  Search, 
  Bell, 
  Filter, 
  MoreHorizontal, 
  Download, 
  Share2, 
  HelpCircle 
} from "lucide-react";
import { useTasks } from "@/app/contexts/tasks/tasksContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

/**
 * Componente de cabeçalho da página de tarefas
 * Redesenhado para uma experiência mais moderna e funcional
 */
export function TasksHeader() {
  const { openNewTaskModal, tasks } = useTasks();
  
  // Calcular tarefas para hoje
  const todayTasks = tasks.filter(task => 
    task.dueDate.toLowerCase().includes('hoje') && 
    task.status !== 'completed'
  ).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Barra superior com título e ações principais */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center">
          <div className="mr-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <CalendarDays className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Tarefas
              </h1>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-medium">
                {todayTasks} para hoje
              </Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground max-w-2xl">
              Gerencie suas tarefas e acompanhe o progresso de suas atividades
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap justify-end">
          {/* Botão de ajuda com tooltip */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Ajuda e dicas</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {/* Botão de notificações */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Notificações</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {/* Menu de opções adicionais */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:ml-1">Opções</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="cursor-pointer">
                <Download className="h-4 w-4 mr-2" />
                Exportar tarefas
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <Filter className="h-4 w-4 mr-2" />
                Configurar visualização
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Botão de nova tarefa */}
          <Button 
            size="sm" 
            className="h-9 gap-1 bg-primary hover:bg-primary/90 transition-colors"
            onClick={openNewTaskModal}
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Nova Tarefa</span>
            <span className="sm:hidden">Nova</span>
          </Button>
        </div>
      </div>
    </div>
  );
} 