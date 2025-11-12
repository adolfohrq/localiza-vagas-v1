"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, Search, Briefcase, Users, Eye, Calendar, BarChart3, Filter, SlidersHorizontal, Clock, ChevronDown, CheckCircle2, FileText, Archive, Download, Share2 } from "lucide-react"
import { JobPostings } from "@/components/job-postings"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { NavigationTabs } from "@/app/components/ui/navigation-tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"

// Importando o componente PageHeader e o tipo PageHeaderAction
import { PageHeader, PageHeaderAction } from "@/components/ui/page-header"

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [activeTab, setActiveTab] = useState("all")
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false)
  const [locationFilter, setLocationFilter] = useState("all")
  const [timeFrame, setTimeFrame] = useState("this-month")
  
  // Dados simulados para estatísticas
  const stats = {
    active: 3,
    views: 590,
    applications: 26,
    conversionRate: 4.4,
    applicationsToday: 5,
    viewsToday: 42,
    byStatus: {
      all: 5,
      active: 3,
      draft: 1,
      closed: 1,
      expired: 0
    }
  }
  
  // Dados simulados para o gráfico de desempenho
  const performanceData = [
    { day: 'Seg', views: 65, applications: 4 },
    { day: 'Ter', views: 82, applications: 6 },
    { day: 'Qua', views: 73, applications: 5 },
    { day: 'Qui', views: 120, applications: 7 },
    { day: 'Sex', views: 95, applications: 4 },
    { day: 'Sáb', views: 85, applications: 0 },
    { day: 'Dom', views: 70, applications: 0 },
  ]

  // Definindo as ações do dropdown como um array de PageHeaderAction
  const dropdownActions: PageHeaderAction[] = [
    {
      label: "Exportar vagas",
      icon: Download,
      onClick: () => console.log("Exportar vagas")
    },
    {
      label: "Compartilhar vagas",
      icon: Share2,
      onClick: () => console.log("Compartilhar vagas")
    },
    {
      label: "Arquivar vagas",
      icon: Archive,
      onClick: () => console.log("Arquivar vagas")
    },
    {
      label: "Relatório de desempenho",
      icon: FileText,
      onClick: () => console.log("Relatório de desempenho")
    }
  ];

  return (
    <DashboardShell>
      {/* Substituindo o cabeçalho antigo pelo PageHeader */}
      <PageHeader 
        title="Gerenciar Vagas"
        description="Gerencie suas vagas publicadas e acompanhe as candidaturas"
        icon={Briefcase}
        badge={{
          text: `${stats.active} ativas`,
          variant: "outline"
        }}
        primaryAction={{
          label: "Publicar Nova Vaga",
          shortLabel: "Publicar",
          icon: PlusCircle,
          onClick: () => window.location.href = "/dashboard/jobs/new/select-plan"
        }}
        dropdownActions={dropdownActions}
        showHelpButton={true}
        onHelpClick={() => console.log("Ajuda e guias")}
      />
      
      {/* Cards de estatísticas */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="overflow-hidden border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300 group">
          <CardHeader className="p-4 pb-0 flex flex-row items-start justify-between space-y-0">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                Vagas Ativas
              </CardTitle>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold group-hover:scale-105 transition-transform duration-300 group-hover:text-primary">
                  {stats.active}
                </span>
                <div className="flex items-center text-xs font-medium text-emerald-500">
                  <CheckCircle2 className="mr-1 h-3.5 w-3.5 group-hover:animate-pulse" />
                  {stats.byStatus.active}/{stats.byStatus.all}
                </div>
              </div>
            </div>
            <div className="rounded-full p-2 group-hover:scale-110 transition-transform duration-300 bg-blue-100 text-blue-600">
              <Briefcase className="h-4 w-4 group-hover:animate-pulse" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-xs text-muted-foreground mt-2.5 mb-1.5 group-hover:text-foreground/80 transition-colors">
              {stats.byStatus.draft} rascunho, {stats.byStatus.closed} encerradas
            </div>
            <div className="relative pt-1">
              <div className="flex mb-1 items-center justify-between">
                <div>
                  <span className="text-xs font-medium inline-block py-1 rounded-full">
                    {Math.round((stats.active / 5) * 100)}%
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium inline-block text-muted-foreground">
                    Meta: 5
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-1.5 text-xs flex rounded-full bg-gray-200 group-hover:h-2 transition-all duration-300">
                <div 
                  style={{ width: `${Math.min(100, (stats.active / 5) * 100)}%` }} 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ease-out bg-blue-500"
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300 group">
          <CardHeader className="p-4 pb-0 flex flex-row items-start justify-between space-y-0">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                Visualizações
              </CardTitle>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold group-hover:scale-105 transition-transform duration-300 group-hover:text-primary">
                  {stats.views}
                </span>
                <div className="flex items-center text-xs font-medium text-emerald-500">
                  <ChevronDown className="mr-1 h-3.5 w-3.5 group-hover:animate-pulse" />
                  +{stats.viewsToday} hoje
                </div>
              </div>
            </div>
            <div className="rounded-full p-2 group-hover:scale-110 transition-transform duration-300 bg-purple-100 text-purple-600">
              <Eye className="h-4 w-4 group-hover:animate-pulse" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-xs text-muted-foreground mt-2.5 mb-1.5 group-hover:text-foreground/80 transition-colors">
              Média de {Math.round(stats.views / stats.active)} visualizações por vaga
            </div>
            <div className="relative pt-1">
              <div className="flex mb-1 items-center justify-between">
                <div>
                  <span className="text-xs font-medium inline-block py-1 rounded-full">
                    {Math.round((stats.views / 1000) * 100)}%
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium inline-block text-muted-foreground">
                    Meta: 1000
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-1.5 text-xs flex rounded-full bg-gray-200 group-hover:h-2 transition-all duration-300">
                <div 
                  style={{ width: `${Math.min(100, (stats.views / 1000) * 100)}%` }} 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ease-out bg-purple-500"
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300 group">
          <CardHeader className="p-4 pb-0 flex flex-row items-start justify-between space-y-0">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                Candidaturas
              </CardTitle>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold group-hover:scale-105 transition-transform duration-300 group-hover:text-primary">
                  {stats.applications}
                </span>
                <div className="flex items-center text-xs font-medium text-emerald-500">
                  <ChevronDown className="mr-1 h-3.5 w-3.5 group-hover:animate-pulse" />
                  +{stats.applicationsToday} hoje
                </div>
              </div>
            </div>
            <div className="rounded-full p-2 group-hover:scale-110 transition-transform duration-300 bg-amber-100 text-amber-600">
              <Users className="h-4 w-4 group-hover:animate-pulse" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-xs text-muted-foreground mt-2.5 mb-1.5 group-hover:text-foreground/80 transition-colors">
              Média de {Math.round(stats.applications / stats.active)} candidaturas por vaga
            </div>
            <div className="relative pt-1">
              <div className="flex mb-1 items-center justify-between">
                <div>
                  <span className="text-xs font-medium inline-block py-1 rounded-full">
                    {Math.round((stats.applications / 50) * 100)}%
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium inline-block text-muted-foreground">
                    Meta: 50
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-1.5 text-xs flex rounded-full bg-gray-200 group-hover:h-2 transition-all duration-300">
                <div 
                  style={{ width: `${Math.min(100, (stats.applications / 50) * 100)}%` }} 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ease-out bg-amber-500"
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300 group">
          <CardHeader className="p-4 pb-0 flex flex-row items-start justify-between space-y-0">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                Taxa de Conversão
              </CardTitle>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold group-hover:scale-105 transition-transform duration-300 group-hover:text-primary">
                  {stats.conversionRate}%
                </span>
                <div className="flex items-center text-xs font-medium text-emerald-500">
                  <ChevronDown className="mr-1 h-3.5 w-3.5 group-hover:animate-pulse" />
                  Bom
                </div>
              </div>
            </div>
            <div className="rounded-full p-2 group-hover:scale-110 transition-transform duration-300 bg-emerald-100 text-emerald-600">
              <BarChart3 className="h-4 w-4 group-hover:animate-pulse" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-xs text-muted-foreground mt-2.5 mb-1.5 group-hover:text-foreground/80 transition-colors">
              Visualizações para candidaturas
            </div>
            <div className="relative pt-1">
              <div className="flex mb-1 items-center justify-between">
                <div>
                  <span className="text-xs font-medium inline-block py-1 rounded-full">
                    {Math.round((stats.conversionRate / 10) * 100)}%
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium inline-block text-muted-foreground">
                    Meta: 10%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-1.5 text-xs flex rounded-full bg-gray-200 group-hover:h-2 transition-all duration-300">
                <div 
                  style={{ width: `${Math.min(100, (stats.conversionRate / 10) * 100)}%` }} 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ease-out bg-emerald-500"
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs para filtros por status */}
      <Card className="shadow-md border">
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <NavigationTabs
              tabs={[
                {
                  id: "all",
                  label: "Todas",
                  icon: Briefcase,
                  count: stats.byStatus.all,
                  description: "Visualize todas as suas vagas"
                },
                {
                  id: "active",
                  label: "Ativas",
                  icon: CheckCircle2,
                  count: stats.byStatus.active,
                  description: "Vagas que estão ativamente recebendo candidaturas"
                },
                {
                  id: "draft",
                  label: "Rascunhos",
                  icon: FileText,
                  count: stats.byStatus.draft,
                  description: "Vagas que ainda não foram publicadas"
                },
                {
                  id: "closed",
                  label: "Encerradas",
                  icon: Archive,
                  count: stats.byStatus.closed,
                  badgeVariant: "secondary",
                  description: "Vagas que foram encerradas manualmente"
                },
                {
                  id: "expired",
                  label: "Expiradas",
                  icon: Clock,
                  count: stats.byStatus.expired,
                  badgeVariant: "destructive",
                  description: "Vagas que expiraram automaticamente"
                },
              ]}
              defaultValue={activeTab}
              onChange={(value) => {
                setActiveTab(value);
              }}
            />
            
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsAdvancedFilterOpen(!isAdvancedFilterOpen)}
                  className="flex items-center gap-1"
                >
                  <SlidersHorizontal className="mr-2 h-3.5 w-3.5" />
                  <span className="hidden md:inline">Filtros Avançados</span>
                </Button>
                
                <Select value={timeFrame} onValueChange={setTimeFrame}>
                  <SelectTrigger className="w-[180px] h-8 text-xs">
                    <Clock className="mr-2 h-3.5 w-3.5" />
                    <SelectValue placeholder="Período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Hoje</SelectItem>
                    <SelectItem value="this-week">Esta semana</SelectItem>
                    <SelectItem value="this-month">Este mês</SelectItem>
                    <SelectItem value="last-month">Mês passado</SelectItem>
                    <SelectItem value="custom">Personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px] h-8 text-xs">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Mais recentes</SelectItem>
                    <SelectItem value="applications">Mais candidaturas</SelectItem>
                    <SelectItem value="views">Mais visualizações</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {isAdvancedFilterOpen && (
              <div className="p-4 border-b space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="location-filter" className="text-sm font-medium">
                      Local
                    </label>
                    <Select value={locationFilter} onValueChange={setLocationFilter}>
                      <SelectTrigger id="location-filter">
                        <SelectValue placeholder="Localização" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="remote">Remoto</SelectItem>
                        <SelectItem value="sp">São Paulo</SelectItem>
                        <SelectItem value="rj">Rio de Janeiro</SelectItem>
                        <SelectItem value="hybrid">Híbrido</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="department-filter" className="text-sm font-medium">
                      Departamento
                    </label>
                    <Select>
                      <SelectTrigger id="department-filter">
                        <SelectValue placeholder="Departamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="tech">Tecnologia</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Vendas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="type-filter" className="text-sm font-medium">
                      Tipo de Contrato
                    </label>
                    <Select>
                      <SelectTrigger id="type-filter">
                        <SelectValue placeholder="Tipo de Contrato" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="full-time">Tempo Integral</SelectItem>
                        <SelectItem value="part-time">Meio Período</SelectItem>
                        <SelectItem value="contract">Contrato</SelectItem>
                        <SelectItem value="internship">Estágio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">Limpar Filtros</Button>
                  <Button size="sm">Aplicar Filtros</Button>
                </div>
              </div>
            )}
            
            <div className="p-4 space-y-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por título, local, tipo de vaga..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <TabsContent value="all" className="p-0 m-0">
              <CardContent>
                <JobPostings 
                  filter={activeTab} 
                  sortBy={sortBy} 
                  searchTerm={searchTerm}
                />
              </CardContent>
            </TabsContent>
            
            <TabsContent value="active" className="p-0 m-0">
              <CardContent>
                <JobPostings 
                  filter="active" 
                  sortBy={sortBy} 
                  searchTerm={searchTerm}
                />
              </CardContent>
            </TabsContent>
            
            <TabsContent value="draft" className="p-0 m-0">
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Briefcase className="h-12 w-12 text-muted-foreground mb-4 opacity-30" />
                  <h3 className="text-lg font-medium">Nenhum rascunho encontrado</h3>
                  <p className="text-sm text-muted-foreground max-w-sm mt-2">
                    Comece a criar uma nova vaga e salve como rascunho para continuar editando mais tarde.
                  </p>
                  <Button className="mt-4" asChild>
                    <Link href="/dashboard/jobs/new/select-plan">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Criar Vaga
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="closed" className="p-0 m-0">
              <CardContent>
                <JobPostings 
                  filter="closed" 
                  sortBy={sortBy} 
                  searchTerm={searchTerm}
                />
              </CardContent>
            </TabsContent>
            
            <TabsContent value="expired" className="p-0 m-0">
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4 opacity-30" />
                  <h3 className="text-lg font-medium">Nenhuma vaga expirada</h3>
                  <p className="text-sm text-muted-foreground max-w-sm mt-2">
                    Quando suas vagas expirarem, elas aparecerão aqui. Você poderá renovar ou arquivá-las.
                  </p>
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}

