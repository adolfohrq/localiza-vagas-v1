"use client"

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Calendar, Clock, MoreHorizontal, CheckCircle, X, RotateCw, Filter, Search, List, CalendarDays, BarChart2, Check, Star } from 'lucide-react'
import { formatDistanceToNow, isAfter, isBefore, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Interview } from '../_types/types'
import { INTERVIEW_STATUS_MAP, INTERVIEW_TYPE_MAP, PRIORITY_MAP } from '../_data/constants'
import { InterviewTable } from './interview-table'
import { InterviewStatus } from '../_types'

interface InterviewDashboardProps {
  interviews: Interview[]
  selectedInterviews: string[]
  favoriteInterviews: string[]
  highlightUpcoming: boolean
  setHighlightUpcoming: (value: boolean) => void
  filtersData: any
  viewMode: 'list' | 'calendar' | 'analytics'
  setViewMode: (mode: 'list' | 'calendar' | 'analytics') => void
  toggleInterviewSelection: (id: string) => void
  toggleFavorite: (id: string) => void
  onSelectInterview: (id: string | null) => void
  handleStatusChange: (ids: string[] | string, newStatus: InterviewStatus) => void
}

export function InterviewDashboard({
  interviews,
  selectedInterviews,
  favoriteInterviews,
  highlightUpcoming,
  setHighlightUpcoming,
  filtersData,
  viewMode,
  setViewMode,
  toggleInterviewSelection,
  toggleFavorite,
  onSelectInterview,
  handleStatusChange
}: InterviewDashboardProps) {
  // Estado para paginação (será gerenciado internamente pelo DataTable)
  const [currentPage, setCurrentPage] = useState(1)

  // Desestruturar filtersData para facilitar o acesso
  const {
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    typeFilter,
    setTypeFilter,
    priorityFilter,
    setPriorityFilter,
    dateRangeFilter,
    setDateRangeFilter,
    jobFilter,
    setJobFilter,
    sortOption,
    setSortOption,
    showFilters,
    setShowFilters,
    resetFilters,
    uniqueJobs,
    stats
  } = filtersData

  return (
    <div className="space-y-5">
      {/* Seção de filtros e controles */}
      <div className="space-y-4">
        {/* Barra de pesquisa e controles de visualização */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Pesquisar candidatos, vagas ou entrevistas..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Tabs value={viewMode} onValueChange={(val: any) => setViewMode(val)}>
              <TabsList>
                <TabsTrigger value="list">
                  <List className="h-4 w-4 mr-1" />
                  Lista
                </TabsTrigger>
                <TabsTrigger value="calendar">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  Calendário
                </TabsTrigger>
                <TabsTrigger value="analytics">
                  <BarChart2 className="h-4 w-4 mr-1" />
                  Análise
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-1" />
              Filtros
            </Button>
          </div>
        </div>
        
        {/* Tabs de Status */}
        <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start">
            <TabsTrigger value="all" className="relative">
              Todas
              <Badge variant="secondary" className="ml-1">{stats.total}</Badge>
            </TabsTrigger>
            <TabsTrigger value="scheduled" className="relative">
              Agendadas
              <Badge variant="secondary" className="ml-1">{stats.scheduled}</Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="relative">
              Realizadas
              <Badge variant="secondary" className="ml-1">{stats.completed}</Badge>
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="relative">
              Canceladas
              <Badge variant="secondary" className="ml-1">{stats.cancelled}</Badge>
            </TabsTrigger>
            <TabsTrigger value="pending_feedback" className="relative">
              Feedback Pendente
              <Badge variant="secondary" className="ml-1">{stats.pendingFeedback}</Badge>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="relative">
              Favoritas
              <Badge variant="secondary" className="ml-1">{stats.favorites}</Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Filtros avançados */}
        {showFilters && (
          <div className="bg-muted/50 p-4 rounded-lg space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de entrevista" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="technical">Técnica</SelectItem>
                    <SelectItem value="behavioral">Comportamental</SelectItem>
                    <SelectItem value="hr">RH</SelectItem>
                    <SelectItem value="manager">Gestor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as prioridades</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="low">Baixa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <Select value={jobFilter} onValueChange={setJobFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Cargo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os cargos</SelectItem>
                    {uniqueJobs.map((job: { id: string, title: string }) => (
                      <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger>
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dateAsc">Data (mais antiga)</SelectItem>
                    <SelectItem value="dateDesc">Data (mais recente)</SelectItem>
                    <SelectItem value="candidate">Candidato (A-Z)</SelectItem>
                    <SelectItem value="priority">Prioridade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="highlight"
                    checked={highlightUpcoming}
                    onCheckedChange={(checked) => setHighlightUpcoming(!!checked)}
                  />
                  <label htmlFor="highlight" className="text-sm font-medium">
                    Destacar entrevistas próximas
                  </label>
                </div>
              </div>
              
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                Limpar filtros
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Conteúdo principal baseado no modo de visualização */}
      {viewMode === 'list' && (
        <InterviewTable
          interviews={interviews}
          selectedInterviews={selectedInterviews}
          favoriteInterviews={favoriteInterviews}
          onStatusChange={handleStatusChange}
          onSelectInterview={onSelectInterview}
          toggleInterviewSelection={toggleInterviewSelection}
          toggleFavorite={toggleFavorite}
        />
      )}
      
      {viewMode === 'calendar' && (
        <div className="bg-muted/50 rounded-lg p-8 text-center min-h-[300px] flex items-center justify-center">
          <div>
            <h3 className="text-lg font-medium mb-2">Visualização de Calendário</h3>
            <p className="text-muted-foreground">
              Esta visualização ainda está em desenvolvimento.
            </p>
          </div>
        </div>
      )}
      
      {viewMode === 'analytics' && (
        <div className="bg-muted/50 rounded-lg p-8 text-center min-h-[300px] flex items-center justify-center">
          <div>
            <h3 className="text-lg font-medium mb-2">Análise de Entrevistas</h3>
            <p className="text-muted-foreground">
              Esta visualização ainda está em desenvolvimento.
            </p>
          </div>
        </div>
      )}
    </div>
  )
} 