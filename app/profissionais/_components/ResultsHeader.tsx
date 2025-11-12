import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ResultsHeaderProps {
  count: number
}

export function ResultsHeader({ count }: ResultsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-3 sm:p-4 rounded-lg shadow-sm gap-3">
      <p className="text-sm text-muted-foreground">
        Mostrando <span className="font-semibold text-primary">{count}</span> profissionais
      </p>
      <Select>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recent">Inscrição mais recente</SelectItem>
          <SelectItem value="experience">Mais experientes</SelectItem>
          <SelectItem value="active">Ativos recentemente</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
} 