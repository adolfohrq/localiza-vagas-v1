"use client"

import { TasksProvider } from "@/app/contexts/tasks/tasksContext"
import { TasksHeader } from "@/app/dashboard/_components/tasks/TasksHeader"
import { TasksStats } from "@/app/dashboard/_components/tasks/TasksStats"
import { TaskFilters } from "@/app/dashboard/_components/tasks/Filters"
import { TaskBoard } from "@/app/dashboard/_components/tasks/TaskBoard"
import { TaskCreation } from "@/app/dashboard/_components/tasks/TaskCreation"

export default function TasksPage() {
  return (
    <TasksProvider>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <main className="flex-1 overflow-hidden">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-6">
            {/* Cabeçalho com ações principais */}
            <TasksHeader />
            
            {/* Estatísticas em cards horizontais */}
            <div className="mt-6">
              <TasksStats />
            </div>
            
            {/* Área principal com filtros e conteúdo integrados */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Área de filtros */}
              <div className="border-b border-gray-200 dark:border-gray-700 p-4">
                <TaskFilters />
              </div>
              
              {/* Área do quadro de tarefas */}
              <div className="h-[calc(100vh-20rem)]">
                <TaskBoard />
              </div>
            </div>
          </div>
        </main>
        
        {/* Componentes modais */}
        <TaskCreation />
      </div>
    </TasksProvider>
  )
} 