import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ResultsHeaderProps {
  jobsCount: number
}

export function ResultsHeader({ jobsCount }: ResultsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-3 sm:p-4 rounded-lg shadow-sm gap-3">
      <p className="text-sm text-muted-foreground">
        Mostrando <span className="font-semibold text-primary">{jobsCount}</span> resultados
      </p>
      <Select>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recent">Mais recentes</SelectItem>
          <SelectItem value="salary">Maior salário</SelectItem>
          <SelectItem value="company">Empresa</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
} 