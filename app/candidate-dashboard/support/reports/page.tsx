"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BarChart, PieChart, Calendar, Download, RefreshCw, Clock } from "lucide-react"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

// Interface para os dados de relatórios
interface StatusData {
  status: string
  count: number
  color: string
}

interface CategoryData {
  category: string
  count: number
  color: string
}

interface PriorityData {
  priority: string
  count: number
  color: string
}

interface TimeData {
  date: string
  created: number
  resolved: number
}

interface ResponseTimeData {
  category: string
  avgHours: number
}

interface AgentData {
  name: string
  resolved: number
  avgSatisfaction: number
}

interface DateRange {
  from: Date
  to: Date
}

export default function SupportReportsPage() {
  const router = useRouter()
  const [dateRange, setDateRange] = useState<DateRange>({ from: new Date(2023, 9, 1), to: new Date(2023, 9, 31) })
  const [reportType, setReportType] = useState("tickets")
  const [timeFrame, setTimeFrame] = useState("month")

  // Dados simulados para os relatórios
  const ticketsByStatus: StatusData[] = [
    { status: "Abertos", count: 18, color: "#3b82f6" },
    { status: "Em Andamento", count: 12, color: "#eab308" },
    { status: "Pendentes", count: 5, color: "#f97316" },
    { status: "Resolvidos", count: 34, color: "#22c55e" },
  ]

  const ticketsByCategory: CategoryData[] = [
    { category: "Currículo", count: 24, color: "#8b5cf6" },
    { category: "Candidatura", count: 17, color: "#06b6d4" },
    { category: "Documentos", count: 9, color: "#ec4899" },
    { category: "Notificações", count: 12, color: "#f43f5e" },
    { category: "Sugestão", count: 5, color: "#14b8a6" },
    { category: "Outro", count: 2, color: "#6b7280" },
  ]

  const ticketsByPriority: PriorityData[] = [
    { priority: "Alta", count: 14, color: "#ef4444" },
    { priority: "Média", count: 27, color: "#f59e0b" },
    { priority: "Baixa", count: 28, color: "#10b981" },
  ]

  const ticketsOverTime: TimeData[] = [
    { date: "01/10", created: 4, resolved: 2 },
    { date: "02/10", created: 5, resolved: 3 },
    { date: "03/10", created: 2, resolved: 4 },
    { date: "04/10", created: 6, resolved: 3 },
    { date: "05/10", created: 4, resolved: 5 },
    { date: "06/10", created: 3, resolved: 6 },
    { date: "07/10", created: 1, resolved: 3 },
    { date: "08/10", created: 4, resolved: 2 },
    { date: "09/10", created: 7, resolved: 5 },
    { date: "10/10", created: 5, resolved: 6 },
  ]

  const responseTimeByCategory: ResponseTimeData[] = [
    { category: "Currículo", avgHours: 7.5 },
    { category: "Candidatura", avgHours: 5.2 },
    { category: "Documentos", avgHours: 8.4 },
    { category: "Notificações", avgHours: 10.1 },
    { category: "Sugestão", avgHours: 24.6 },
    { category: "Outro", avgHours: 12.3 },
  ]

  const topAgents: AgentData[] = [
    { name: "Carlos Silva", resolved: 22, avgSatisfaction: 4.7 },
    { name: "Ana Oliveira", resolved: 18, avgSatisfaction: 4.5 },
    { name: "Mariana Costa", resolved: 15, avgSatisfaction: 4.8 },
  ]

  // Função para renderizar o gráfico de barras (simulado)
  const renderBarChart = <T extends Record<string, any>>(data: T[], xKey: keyof T, yKey: keyof T, color = "#3b82f6") => {
    const maxValue = Math.max(...data.map(item => Number(item[yKey])))
    
    return (
      <div className="h-64 flex items-end space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div 
              className="w-full rounded-t-sm" 
              style={{ 
                backgroundColor: 'color' in item ? String(item.color) : color,
                height: `${(Number(item[yKey]) / maxValue) * 100}%`,
                minHeight: '8px'
              }}
            />
            <div className="text-xs mt-2 text-center w-full truncate" title={String(item[xKey])}>
              {String(item[xKey])}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Função para renderizar o gráfico de linha (simulado)
  const renderLineChart = () => {
    return (
      <div className="h-64 flex flex-col justify-between">
        <div className="flex-1 border-b border-border relative">
          {/* Simulação de um gráfico de linha */}
          <div className="absolute bottom-0 left-0 w-full h-full flex items-end">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline
                points="0,70 10,50 20,65 30,40 40,45 50,30 60,35 70,25 80,20 90,15 100,10"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              <polyline
                points="0,80 10,75 20,85 30,70 40,75 50,65 60,60 70,50 80,45 90,40 100,30"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground pt-2">
          {ticketsOverTime.map((item, index) => (
            <div key={index}>{item.date}</div>
          ))}
        </div>
      </div>
    )
  }

  // Componente de seleção de data personalizado
  const CustomDateRangePicker = () => {
    return (
      <div className="flex items-center space-x-2">
        <div>
          <p className="text-sm mb-1">De:</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
                {dateRange.from ? (
                  format(dateRange.from, "dd/MM/yyyy")
                ) : (
                  <span>Selecione uma data</span>
                )}
                <Calendar className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={dateRange.from}
                onSelect={(date: Date | undefined) => {
                  if (date) {
                    setDateRange({ ...dateRange, from: date });
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <p className="text-sm mb-1">Até:</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
                {dateRange.to ? (
                  format(dateRange.to, "dd/MM/yyyy")
                ) : (
                  <span>Selecione uma data</span>
                )}
                <Calendar className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={dateRange.to}
                onSelect={(date: Date | undefined) => {
                  if (date) {
                    setDateRange({ ...dateRange, to: date });
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    );
  };

  return (
    <DashboardShell>
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.push('/candidate-dashboard/support')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Relatórios de Suporte</h2>
          <p className="text-muted-foreground">Análise e métricas dos seus tickets de suporte</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo de Relatório" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tickets">Tickets</SelectItem>
              <SelectItem value="satisfaction">Satisfação</SelectItem>
              <SelectItem value="response">Tempo de Resposta</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Última Semana</SelectItem>
              <SelectItem value="month">Último Mês</SelectItem>
              <SelectItem value="quarter">Último Trimestre</SelectItem>
              <SelectItem value="year">Último Ano</SelectItem>
              <SelectItem value="custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>
          
          {timeFrame === "custom" && <CustomDateRangePicker />}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="categories">Categorias</TabsTrigger>
          <TabsTrigger value="response">Tempo de Resposta</TabsTrigger>
          <TabsTrigger value="trends">Tendências</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Tickets</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">69</div>
                <p className="text-xs text-muted-foreground">
                  +3.8% em relação ao período anterior
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tickets Abertos</CardTitle>
                <div className="h-4 w-4 rounded-full bg-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">
                  26.1% do total de tickets
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tempo Médio de Resposta</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">9.2h</div>
                <p className="text-xs text-muted-foreground">
                  -0.8h em relação ao período anterior
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Resolução</CardTitle>
                <div className="h-4 w-4 rounded-full bg-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">82%</div>
                <p className="text-xs text-muted-foreground">
                  +1.5% em relação ao período anterior
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Tickets por Status</CardTitle>
                <CardDescription>
                  Distribuição de seus tickets por status atual
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderBarChart(ticketsByStatus, 'status', 'count')}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tickets por Prioridade</CardTitle>
                <CardDescription>
                  Distribuição de seus tickets por nível de prioridade
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderBarChart(ticketsByPriority, 'priority', 'count')}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tickets por Categoria</CardTitle>
              <CardDescription>
                Distribuição de seus tickets por categoria
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderBarChart(ticketsByCategory, 'category', 'count')}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tempo Médio de Resposta por Categoria</CardTitle>
              <CardDescription>
                Tempo médio para primeira resposta em horas por categoria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {responseTimeByCategory.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-36 font-medium truncate" title={item.category}>
                      {item.category}
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full" 
                          style={{ width: `${(item.avgHours / 24) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-16 text-right text-sm">
                      {item.avgHours.toFixed(1)}h
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="response" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Equipe de Suporte</CardTitle>
              <CardDescription>
                Tickets resolvidos e índice de satisfação por atendente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {topAgents.map((agent, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="h-8 w-8 rounded-full p-0 flex items-center justify-center">
                          {agent.name.charAt(0)}
                        </Badge>
                        <span className="font-medium">{agent.name}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {agent.resolved} tickets atendidos
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1">
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 rounded-full" 
                            style={{ width: `${(agent.avgSatisfaction / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-sm font-medium">
                        {agent.avgSatisfaction.toFixed(1)}/5
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tendência de Tickets</CardTitle>
              <CardDescription>
                Seus tickets criados vs. resolvidos ao longo do tempo
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderLineChart()}
              <div className="flex items-center justify-center space-x-4 mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                  <span className="text-sm">Criados</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                  <span className="text-sm">Resolvidos</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
} 