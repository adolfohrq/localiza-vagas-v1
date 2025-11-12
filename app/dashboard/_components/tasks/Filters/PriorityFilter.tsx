'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTasks } from "@/app/contexts/tasks/tasksContext";

/**
 * Componente para filtrar tarefas por prioridade
 */
export function PriorityFilter() {
  const { filterPriority, setFilterPriority } = useTasks();

  return (
    <Select
      value={filterPriority}
      onValueChange={setFilterPriority}
    >
      <SelectTrigger className="w-[130px] h-9 bg-white">
        <SelectValue placeholder="Prioridade" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todas</SelectItem>
        <SelectItem value="urgent">Urgente</SelectItem>
        <SelectItem value="high">Alta</SelectItem>
        <SelectItem value="medium">Média</SelectItem>
        <SelectItem value="low">Baixa</SelectItem>
      </SelectContent>
    </Select>
  );
} 