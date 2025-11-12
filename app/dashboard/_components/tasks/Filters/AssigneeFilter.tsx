'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTasks } from "@/app/contexts/tasks/tasksContext";

/**
 * Componente para filtrar tarefas por responsável
 */
export function AssigneeFilter() {
  const { filterAssignee, setFilterAssignee } = useTasks();

  return (
    <Select
      value={filterAssignee}
      onValueChange={setFilterAssignee}
    >
      <SelectTrigger className="w-[150px] h-9 bg-white">
        <SelectValue placeholder="Responsável" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todos</SelectItem>
        <SelectItem value="user-1">Ana Silva</SelectItem>
        <SelectItem value="user-2">Carlos Oliveira</SelectItem>
        <SelectItem value="user-3">Mariana Costa</SelectItem>
        <SelectItem value="user-4">Juliana Lima</SelectItem>
        <SelectItem value="user-5">Roberto Alves</SelectItem>
      </SelectContent>
    </Select>
  );
} 