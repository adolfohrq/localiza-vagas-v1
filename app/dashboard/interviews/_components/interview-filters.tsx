"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  SlidersHorizontal, Clock, PanelRight, CalendarDays, BarChart, 
  Video, Users, Phone, AlertCircle, Calendar, Mail, XCircle, X, 
  CheckCircle, RotateCw, MoreHorizontal, Check, Filter,
  ArrowDownAZ, ArrowUpDown, Clock3, Search
} from "lucide-react"
import { Dispatch, SetStateAction } from "react"
import { cn } from "@/lib/utils"
import { Interview, InterviewStatus, ViewMode } from "../_types"

interface InterviewFiltersProps {
  filtersData: any
  viewMode: ViewMode
  setViewMode: Dispatch<SetStateAction<ViewMode>>
  highlightUpcoming: boolean
  setHighlightUpcoming: Dispatch<SetStateAction<boolean>>
  showBatchActions: boolean
  selectedInterviews: string[]
  handleStatusChange: (id: string, status: InterviewStatus) => void
}

export function InterviewFilters({
  filtersData,
  viewMode,
  setViewMode,
  highlightUpcoming,
  setHighlightUpcoming,
  showBatchActions,
  selectedInterviews,
  handleStatusChange
}: InterviewFiltersProps) {
  const { 
    searchTerm, setSearchTerm,
    activeTab, setActiveTab,
    showFilters, setShowFilters,
    typeFilter, setTypeFilter,
    priorityFilter, setPriorityFilter,
    dateRangeFilter, setDateRangeFilter,
    jobFilter, setJobFilter,
    sortOption, setSortOption,
    uniqueJobs,
    resetFilters,
    stats
  } = filtersData

  return (
    <Card className="shadow-sm border mb-6 overflow-hidden">
      <CardContent className="p-0">
        {/* Barra de pesquisa principal */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, cargo ou habilidades..."
              className="pl-9 pr-4 h-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Tabs de status simplificadas */}
        <div className="border-b">
          <Tabs defaultValue="all" value={activeTab} onValueChange={(value: any) => setActiveTab(value)} className="w-full">
            <div className="flex overflow-x-auto">
              <TabsList className="bg-transparent h-auto p-0 flex">
                <TabsTrigger 
                  value="all" 
                  className="flex items-center gap-2 px-4 py-2.5 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary"
                >
                  <Users className="h-4 w-4" />
                  <span>Todas</span>
                  <Badge className="ml-1 bg-muted text-foreground">{stats.total}</Badge>
                </TabsTrigger>
                <TabsTrigger 
                  value="scheduled" 
                  className="flex items-center gap-2 px-4 py-2.5 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Agendadas</span>
                  <Badge className="ml-1 bg-blue-100 text-blue-700">{stats.scheduled}</Badge>
                </TabsTrigger>
                <TabsTrigger 
                  value="conducted" 
                  className="flex items-center gap-2 px-4 py-2.5 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary"
                >
                  <Video className="h-4 w-4" />
                  <span>Realizadas</span>
                  <Badge className="ml-1 bg-purple-100 text-purple-700">{stats.conducted}</Badge>
                </TabsTrigger>
                <TabsTrigger 
                  value="completed" 
                  className="flex items-center gap-2 px-4 py-2.5 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Concluídas</span>
                  <Badge className="ml-1 bg-green-100 text-green-700">{stats.completed}</Badge>
                </TabsTrigger>
                <TabsTrigger 
                  value="rescheduled" 
                  className="flex items-center gap-2 px-4 py-2.5 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary"
                >
                  <RotateCw className="h-4 w-4" />
                  <span>Remarcadas</span>
                  <Badge className="ml-1 bg-amber-100 text-amber-700">{stats.rescheduled}</Badge>
                </TabsTrigger>
                <TabsTrigger 
                  value="cancelled" 
                  className="flex items-center gap-2 px-4 py-2.5 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary"
                >
                  <X className="h-4 w-4" />
                  <span>Canceladas</span>
                  <Badge className="ml-1 bg-red-100 text-red-700">{stats.cancelled}</Badge>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value={activeTab} className="m-0">
              <div className="p-4 flex flex-wrap items-center justify-between gap-3">
                {/* Filtros rápidos */}
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowFilters(!showFilters)}
                    className={cn(
                      "h-9 flex items-center gap-1",
                      showFilters && "bg-muted"
                    )}
                  >
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    <span>Filtros Avançados</span>
                  </Button>
                </div>
                
                {/* Ordenação e visualização */}
                <div className="flex items-center gap-2">
                  <Select value={sortOption} onValueChange={(value: string) => setSortOption(value)}>
                    <SelectTrigger className="h-9 w-[180px]">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dateAsc">Próximas primeiro</SelectItem>
                      <SelectItem value="dateDesc">Mais recentes primeiro</SelectItem>
                      <SelectItem value="priority">Por prioridade</SelectItem>
                      <SelectItem value="name">Por candidato</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={dateRangeFilter} onValueChange={(value: string) => setDateRangeFilter(value)}>
                    <SelectTrigger className="h-9 w-[120px]">
                      <SelectValue placeholder="Período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="today">Hoje</SelectItem>
                      <SelectItem value="thisWeek">Esta semana</SelectItem>
                      <SelectItem value="nextMonth">Próximo mês</SelectItem>
                      <SelectItem value="past">Passado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Visualização e ações */}
              <div className="px-4 pb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium mr-1">Visualização:</span>
                  <div className="border rounded-md overflow-hidden flex h-9">
                    <Button 
                      variant={viewMode === "list" ? "default" : "ghost"} 
                      size="sm" 
                      className="rounded-none h-full px-3"
                      onClick={() => setViewMode("list")}
                    >
                      <PanelRight className="h-4 w-4 mr-1" />
                      Lista
                    </Button>
                    <Button 
                      variant={viewMode === "calendar" ? "default" : "ghost"} 
                      size="sm" 
                      className="rounded-none h-full px-3"
                      onClick={() => setViewMode("calendar")}
                    >
                      <CalendarDays className="h-4 w-4 mr-1" />
                      Calendário
                    </Button>
                    <Button 
                      variant={viewMode === "analytics" ? "default" : "ghost"} 
                      size="sm" 
                      className="rounded-none h-full px-3"
                      onClick={() => setViewMode("analytics")}
                    >
                      <BarChart className="h-4 w-4 mr-1" />
                      Análise
                    </Button>
                  </div>
                </div>
                
                {/* Ações em lote */}
                {showBatchActions && (
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {selectedInterviews.length} selecionadas
                    </Badge>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" className="h-9">
                        <Mail className="h-3.5 w-3.5 mr-2" />
                        Email
                      </Button>
                      <Button size="sm" variant="outline" className="h-9">
                        <CalendarDays className="h-3.5 w-3.5 mr-2" />
                        Reagendar
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-destructive hover:text-destructive h-9"
                        onClick={() => {
                          selectedInterviews.forEach(id => handleStatusChange(id, "cancelled"));
                        }}
                      >
                        <XCircle className="h-3.5 w-3.5 mr-2" />
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Filtros avançados - expansível */}
              {showFilters && (
                <div className="p-4 bg-muted/10 border-t space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="type-filter" className="text-sm font-medium flex items-center">
                        <Video className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                        Tipo de Entrevista
                      </label>
                      <Select 
                        value={typeFilter.length > 0 ? typeFilter[0] : "all"} 
                        onValueChange={(value: string) => {
                          if (value === "all") {
                            setTypeFilter([]);
                          } else {
                            setTypeFilter([value]);
                          }
                        }}
                      >
                        <SelectTrigger id="type-filter" className="h-9">
                          <SelectValue placeholder="Tipo de entrevista" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          <SelectItem value="online">Online</SelectItem>
                          <SelectItem value="in-person">Presencial</SelectItem>
                          <SelectItem value="phone">Telefone</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="priority-filter" className="text-sm font-medium flex items-center">
                        <AlertCircle className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                        Prioridade
                      </label>
                      <Select 
                        value={priorityFilter.length > 0 ? priorityFilter[0] : "all"} 
                        onValueChange={(value: string) => {
                          if (value === "all") {
                            setPriorityFilter([]);
                          } else {
                            setPriorityFilter([value]);
                          }
                        }}
                      >
                        <SelectTrigger id="priority-filter" className="h-9">
                          <SelectValue placeholder="Prioridade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas</SelectItem>
                          <SelectItem value="high">Alta</SelectItem>
                          <SelectItem value="medium">Média</SelectItem>
                          <SelectItem value="low">Baixa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="job-filter" className="text-sm font-medium flex items-center">
                        <Users className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                        Vaga
                      </label>
                      <Select 
                        value={jobFilter.length > 0 ? jobFilter[0] : "all"} 
                        onValueChange={(value: string) => {
                          if (value === "all") {
                            setJobFilter([]);
                          } else {
                            setJobFilter([value]);
                          }
                        }}
                      >
                        <SelectTrigger id="job-filter" className="h-9">
                          <SelectValue placeholder="Selecione uma vaga" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas as vagas</SelectItem>
                          {uniqueJobs.map((job: { id: string, title: string }) => (
                            <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={resetFilters}
                      className="h-9"
                    >
                      <X className="h-3.5 w-3.5 mr-2" />
                      Limpar Filtros
                    </Button>
                    <Button size="sm" className="h-9">
                      <Check className="h-3.5 w-3.5 mr-2" />
                      Aplicar Filtros
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
} 