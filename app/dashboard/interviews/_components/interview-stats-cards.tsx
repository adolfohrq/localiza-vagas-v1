"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Users, BarChart, CalendarDays, Activity, ArrowUpCircle } from "lucide-react"
import { InterviewStats } from "../_types"

interface InterviewStatsCardsProps {
  stats: InterviewStats
}

export function InterviewStatsCards({ stats }: InterviewStatsCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <Card className="overflow-hidden border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300 group">
        <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            Total de Entrevistas
          </CardTitle>
          <div className="rounded-full p-2 group-hover:scale-110 transition-transform duration-300 bg-blue-100 text-blue-600">
            <Users className="h-4 w-4 group-hover:animate-pulse" />
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex items-baseline gap-1.5 mb-3">
            <span className="text-2xl font-bold group-hover:scale-105 transition-transform duration-300 group-hover:text-primary">
              {stats.total}
            </span>
            <div className="flex items-center text-xs font-medium text-emerald-500">
              <ArrowUpCircle className="mr-1 h-3.5 w-3.5 group-hover:animate-bounce" />
              {Math.round((stats.total / (stats.total - 2)) * 100 - 100)}%
            </div>
          </div>

          <div className="text-xs text-muted-foreground mb-2 group-hover:text-foreground/80 transition-colors">
            <div className="flex justify-between">
              <span>{stats.scheduled} agendadas</span>
              <span>{stats.completed} concluídas</span>
            </div>
          </div>
          
          <div className="relative pt-1">
            <div className="flex mb-1 items-center justify-between">
              <div>
                <span className="text-xs font-medium inline-block py-1 rounded-full">
                  {Math.round((stats.total / 50) * 100)}%
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
                style={{ width: `${Math.min(100, (stats.total / 50) * 100)}%` }} 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ease-out bg-blue-500"
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300 group">
        <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            Taxa de Conclusão
          </CardTitle>
          <div className="rounded-full p-2 group-hover:scale-110 transition-transform duration-300 bg-purple-100 text-purple-600">
            <BarChart className="h-4 w-4 group-hover:animate-pulse" />
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex items-baseline gap-1.5 mb-3">
            <span className="text-2xl font-bold group-hover:scale-105 transition-transform duration-300 group-hover:text-primary">
              {stats.completion.percentage}%
            </span>
            <div className="flex items-center text-xs font-medium text-emerald-500">
              <ArrowUpCircle className="mr-1 h-3.5 w-3.5 group-hover:animate-bounce" />
              5%
            </div>
          </div>

          <div className="text-xs text-muted-foreground mb-2 group-hover:text-foreground/80 transition-colors">
            <div className="flex justify-between">
              <span>{stats.completion.done} concluídas</span>
              <span>de {stats.completion.total} total</span>
            </div>
          </div>
          
          <div className="relative pt-1">
            <div className="flex mb-1 items-center justify-between">
              <div>
                <span className="text-xs font-medium inline-block py-1 rounded-full">
                  {stats.completion.percentage}%
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-medium inline-block text-muted-foreground">
                  Meta: 100%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-1.5 text-xs flex rounded-full bg-gray-200 group-hover:h-2 transition-all duration-300">
              <div 
                style={{ width: `${stats.completion.percentage}%` }} 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ease-out bg-purple-500"
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300 group">
        <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            Entrevistas por Tipo
          </CardTitle>
          <div className="rounded-full p-2 group-hover:scale-110 transition-transform duration-300 bg-amber-100 text-amber-600">
            <CalendarDays className="h-4 w-4 group-hover:animate-pulse" />
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex items-baseline gap-1.5 mb-3">
            <span className="text-2xl font-bold group-hover:scale-105 transition-transform duration-300 group-hover:text-primary">
              {stats.online}
            </span>
            <div className="flex items-center text-xs font-medium text-amber-500">
              <span>Online</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-2 group-hover:text-foreground/80 transition-colors">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <span>Presenciais: {stats.inPerson}</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
              <span>Telefone: {stats.phone}</span>
            </div>
          </div>
          
          <div className="relative pt-1">
            <div className="flex mb-1 items-center justify-between">
              <div>
                <span className="text-xs font-medium inline-block py-1 rounded-full">
                  {Math.round((stats.online / (stats.online + stats.inPerson + stats.phone)) * 100)}%
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-medium inline-block text-muted-foreground">
                  Meta: 20
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-1.5 text-xs flex rounded-full bg-gray-200 group-hover:h-2 transition-all duration-300">
              <div 
                style={{ width: `${Math.min(100, (stats.online / 20) * 100)}%` }} 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ease-out bg-amber-500"
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300 group">
        <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            Atividade Recente
          </CardTitle>
          <div className="rounded-full p-2 group-hover:scale-110 transition-transform duration-300 bg-emerald-100 text-emerald-600">
            <Activity className="h-4 w-4 group-hover:animate-pulse" />
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex items-baseline gap-1.5 mb-3">
            <span className="text-2xl font-bold group-hover:scale-105 transition-transform duration-300 group-hover:text-primary">
              {stats.todayInterviews + stats.tomorrowInterviews}
            </span>
            <div className="flex items-center text-xs font-medium text-emerald-500">
              <ArrowUpCircle className="mr-1 h-3.5 w-3.5 group-hover:animate-bounce" />
              3%
            </div>
          </div>

          <div className="text-xs text-muted-foreground mb-2 group-hover:text-foreground/80 transition-colors">
            <div className="flex justify-between">
              <span>Hoje: {stats.todayInterviews}</span>
              <span>Amanhã: {stats.tomorrowInterviews}</span>
            </div>
            <div className="mt-1">Entrevistas nas próximas 48h</div>
          </div>
          
          <div className="relative pt-1">
            <div className="flex mb-1 items-center justify-between">
              <div>
                <span className="text-xs font-medium inline-block py-1 rounded-full">
                  {Math.round((stats.todayInterviews / 15) * 100)}%
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-medium inline-block text-muted-foreground">
                  Meta: 15
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-1.5 text-xs flex rounded-full bg-gray-200 group-hover:h-2 transition-all duration-300">
              <div 
                style={{ width: `${Math.min(100, (stats.todayInterviews / 15) * 100)}%` }} 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ease-out bg-emerald-500"
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 