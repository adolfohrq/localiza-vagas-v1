'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTasks } from "@/app/contexts/tasks/tasksContext";

/**
 * Componente para filtrar tarefas por status
 */
export function StatusFilter() {
  const { filterStatus, setFilterStatus } = useTasks();

  return (
    <Select
      value={filterStatus}
      onValueChange={setFilterStatus}
    >
      <SelectTrigger className="w-[130px] h-9 bg-white">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todos</SelectItem>
        <SelectItem value="pending">Pendentes</SelectItem>
        <SelectItem value="in-progress">Em Andamento</SelectItem>
        <SelectItem value="completed">Concluídas</SelectItem>
        <SelectItem value="cancelled">Canceladas</SelectItem>
      </SelectContent>
    </Select>
  );
} 