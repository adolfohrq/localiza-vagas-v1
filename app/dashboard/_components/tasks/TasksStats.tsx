'use client';

import { useTasks } from "@/app/contexts/tasks/tasksContext";
import { ClipboardCheck, Clock, ListTodo, CheckCircle, AlertTriangle } from "lucide-react";

/**
 * Componente que exibe as estatísticas das tarefas
 * Redesenhado para um formato horizontal com cards
 */
export function TasksStats() {
  const { tasks } = useTasks();
  
  // Calcular estatísticas
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(t => t.status === "pending").length;
  const inProgressTasks = tasks.filter(t => t.status === "in-progress").length;
  const completedTasks = tasks.filter(t => t.status === "completed").length;
  const urgentTasks = tasks.filter(t => t.priority === "urgent" && t.status !== "completed").length;
  
  return (
    <div>
      {/* Cards de estatísticas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total</p>
              <p className="text-2xl font-bold group-hover:scale-105 transition-transform">{totalTasks}</p>
            </div>
            <div className="bg-primary/10 p-2.5 rounded-full group-hover:bg-primary/20 transition-colors">
              <ClipboardCheck className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pendentes</p>
              <p className="text-2xl font-bold group-hover:scale-105 transition-transform">{pendingTasks}</p>
            </div>
            <div className="bg-amber-100 p-2.5 rounded-full group-hover:bg-amber-200 transition-colors">
              <Clock className="h-5 w-5 text-amber-600 group-hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Em Andamento</p>
              <p className="text-2xl font-bold group-hover:scale-105 transition-transform">{inProgressTasks}</p>
            </div>
            <div className="bg-blue-100 p-2.5 rounded-full group-hover:bg-blue-200 transition-colors">
              <ListTodo className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Concluídas</p>
              <p className="text-2xl font-bold group-hover:scale-105 transition-transform">{completedTasks}</p>
            </div>
            <div className="bg-emerald-100 p-2.5 rounded-full group-hover:bg-emerald-200 transition-colors">
              <CheckCircle className="h-5 w-5 text-emerald-600 group-hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 