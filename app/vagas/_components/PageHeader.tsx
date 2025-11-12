import { Button } from "@/components/ui/button"
import { Filter, ChevronUp, ChevronDown } from "lucide-react"

interface PageHeaderProps {
  filtersVisible: boolean
  toggleFilters: () => void
}

export function PageHeader({ filtersVisible, toggleFilters }: PageHeaderProps) {
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Vagas Disponíveis</h1>
        <p className="text-muted-foreground">Encontre as melhores oportunidades para sua carreira</p>
      </div>
      <Button
        onClick={toggleFilters}
        variant="outline"
        className="flex items-center md:hidden"
      >
        <Filter className="mr-2 h-4 w-4" />
        Filtros
        {filtersVisible ? (
          <ChevronUp className="ml-1 h-4 w-4" />
        ) : (
          <ChevronDown className="ml-1 h-4 w-4" />
        )}
      </Button>
    </div>
  )
} 