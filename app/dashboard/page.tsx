"use client"

import { Metadata } from "next"
import Link from "next/link"
import { useState, useEffect } from "react"
import React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DashboardShell } from "@/components/dashboard-shell"
import { Overview } from "@/components/overview"
import { RecentApplications } from "@/components/recent-applications"
import { JobPostings } from "@/components/job-postings"
import { toast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  PlusCircle, 
  Users, 
  FileText, 
  Eye, 
  UserCheck, 
  BarChart2 as BarChart, 
  Clock, 
  ChevronUp, 
  ChevronDown, 
  Calendar, 
  CheckCircle2, 
  ArrowUpRight, 
  Bell, 
  MessageSquare, 
  Briefcase,
  Search,
  ChevronRight,
  Award,
  Zap,
  CreditCard,
  ArrowRight,
  CalendarDays,
  Sparkles,
  LineChart,
  CheckCheck,
  Star,
  AlertCircle,
  MoreHorizontal,
  Filter,
  ArrowUpCircle,
  TrendingUp,
  Home,
  HelpCircle,
  Share2,
  Download,
  ListTodo,
  Settings,
  CheckCircle,
  Activity,
  ExternalLink,
  User,
  UserPlus,
  LayoutDashboard,
  UserCircle,
  FileEdit,
  ListChecks,
  SlidersHorizontal,
  X,
  ChevronLeft,
  Edit,
  MapPin,
  Plus,
  Mail,
  ArrowDown,
  ArrowUp
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Table, TableBody, TableCell, TableFooter, TableHeader, TableRow, TableHead } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { NavigationTabs } from "@/app/components/ui/navigation-tabs"

// Interfaces para os tipos de dados
interface MetricCardProps {
  title: string;
  value: string | number;
  trend: "up" | "down" | "neutral";
  percentage: string;
  description: string;
  icon: React.ElementType;
  color: "blue" | "purple" | "amber" | "emerald" | "slate" | "indigo" | "rose";
  goalValue: number;
}

interface JobApplicant {
  name: string;
  image: string;
}

interface FeaturedJobProps {
  id: string;
  title: string;
  location: string;
  applications: number;
  views: number;
  daysLeft: number;
  status: "active" | "ending" | "draft" | "paused";
  featured: boolean;
  recentApplicants: JobApplicant[];
}

interface PriorityItemProps {
  id: string;
  title: string;
  deadline: string;
  status: "urgent" | "high" | "medium" | "low";
  icon: React.ReactNode;
  actionLink: string;
  tag?: string;
}

interface ActivityProps {
  type: 'candidato' | 'entrevista' | 'vaga' | 'mensagem';
  title: string;
  description: string;
  time: string;
  user?: {
    name: string;
    avatar: string;
  };
}

interface UserPlanProps {
  isPaid: boolean;
  planName: string;
  jobSlots: number;
  usedSlots: number;
  expiryDate?: string;
  features: string[];
}

// Componente MetricCard
function MetricCard({
  title,
  value,
  trend,
  percentage,
  description,
  icon: Icon,
  color,
  goalValue
}: MetricCardProps) {
  return (
    <Card className="overflow-hidden border bg-card text-card-foreground shadow-sm">
      <CardHeader className="p-3 md:p-4 pb-0 flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl md:text-2xl font-bold">
              {value}
            </span>
            <div className={`flex items-center text-xs font-medium ${
              trend === "up" ? "text-emerald-500" : 
              trend === "down" ? "text-rose-500" : 
              "text-slate-500"
            }`}>
              {trend === "up" ? (
                <ArrowUpCircle className="mr-1 h-3 w-3 md:h-3.5 md:w-3.5" />
              ) : trend === "down" ? (
                <ChevronDown className="mr-1 h-3 w-3 md:h-3.5 md:w-3.5" />
              ) : null}
              {percentage}
            </div>
          </div>
        </div>
        <div className={`rounded-full p-1.5 md:p-2 ${
          color === "blue" ? "bg-blue-100 text-blue-600" :
          color === "purple" ? "bg-purple-100 text-purple-600" :
          color === "amber" ? "bg-amber-100 text-amber-600" :
          color === "emerald" ? "bg-emerald-100 text-emerald-600" :
          color === "indigo" ? "bg-indigo-100 text-indigo-600" :
          color === "rose" ? "bg-rose-100 text-rose-600" :
          "bg-slate-100 text-slate-600"
        }`}>
          <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
        </div>
      </CardHeader>
      <CardContent className="p-3 md:p-4 pt-0">
        <div className="text-xs text-muted-foreground mt-2 md:mt-2.5 mb-1 md:mb-1.5">
          {description}
        </div>
        <div className="relative pt-1">
          <div className="flex mb-1 items-center justify-between">
            <div>
              <span className="text-xs font-medium inline-block py-0.5 md:py-1 rounded-full">
                {Math.round((Number(value) / goalValue) * 100)}%
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-medium inline-block text-muted-foreground">
                Meta: {goalValue}
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-1.5 text-xs flex rounded-full bg-gray-200">
            <div 
              style={{ width: `${Math.min(100, (Number(value) / goalValue) * 100)}%` }} 
              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                color === "blue" ? "bg-blue-500" :
                color === "purple" ? "bg-purple-500" :
                color === "amber" ? "bg-amber-500" :
                color === "emerald" ? "bg-emerald-500" :
                color === "indigo" ? "bg-indigo-500" :
                color === "rose" ? "bg-rose-500" :
                "bg-slate-500"
              }`}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Dados de candidatos
const candidates = [
  {
    id: "1",
    name: "Anaa Silva",
    email: "ana.silva@email.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    jobTitle: "Desenvolvedor Frontend",
    status: "interview",
    rating: 4,
    lastUpdated: "Hoje, 10:30"
  },
  {
    id: "2",
    name: "Carlos Oliveira",
    email: "carlos.oliveira@email.com",
    avatar: "https://i.pravatar.cc/150?img=2",
    jobTitle: "UX Designer",
    status: "screening",
    rating: 3,
    lastUpdated: "Ontem"
  },
  {
    id: "3",
    name: "Mariana Costa",
    email: "mariana.costa@email.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    jobTitle: "Desenvolvedor Backend",
    status: "applied",
    rating: 5,
    lastUpdated: "2 dias atrás"
  },
  {
    id: "4",
    name: "Pedro Santos",
    email: "pedro.santos@email.com",
    avatar: "https://i.pravatar.cc/150?img=4",
    jobTitle: "Gerente de Produto",
    status: "offer",
    rating: 4,
    lastUpdated: "3 dias atrás"
  },
  {
    id: "5",
    name: "Juliana Lima",
    email: "juliana.lima@email.com",
    avatar: "https://i.pravatar.cc/150?img=5",
    jobTitle: "Analista de Dados",
    status: "hired",
    rating: 5,
    lastUpdated: "1 semana atrás"
  },
  {
    id: "6",
    name: "Roberto Alves",
    email: "roberto.alves@email.com",
    avatar: "https://i.pravatar.cc/150?img=6",
    jobTitle: "Desenvolvedor Mobile",
    status: "rejected",
    rating: 2,
    lastUpdated: "2 semanas atrás"
  }
]

// Dados para tarefas prioritárias
const priorities = [
  {
    id: "task-1",
    title: "Revisar candidatos para vaga de frontend",
    deadline: "Hoje, 16:00",
    status: "urgent",
    icon: <Users className="h-4 w-4" />,
    actionLink: "/candidates/review",
    tag: "Frontend"
  },
  {
    id: "task-2",
    title: "Agendar entrevista com finalistas",
    deadline: "Amanhã, 10:00",
    status: "high",
    icon: <Calendar className="h-4 w-4" />,
    actionLink: "/interviews/schedule",
    tag: "UX Design"
  },
  {
    id: "task-3",
    title: "Criar nova descrição de vaga",
    deadline: "Quarta-feira",
    status: "medium",
    icon: <FileText className="h-4 w-4" />,
    actionLink: "/jobs/create",
    tag: "Backend"
  },
  {
    id: "task-4",
    title: "Finalizar propostas de contratação",
    deadline: "Hoje, 18:00",
    status: "high",
    icon: <FileText className="h-4 w-4" />,
    actionLink: "/offers/draft",
    tag: "Contratação"
  },
  {
    id: "task-5",
    title: "Atualizar descrição da vaga de Analista de Dados",
    deadline: "Próxima semana",
    status: "low",
    icon: <Edit className="h-4 w-4" />,
    actionLink: "/jobs/edit/123",
    tag: "Vagas"
  },
  {
    id: "task-6",
    title: "Enviar feedback para candidatos",
    deadline: "Sexta-feira",
    status: "medium",
    icon: <Mail className="h-4 w-4" />,
    actionLink: "/candidates/feedback",
    tag: "Feedback"
  }
]

export default function DashboardPage() {
  // Estados para dados dinâmicos
  const [greeting, setGreeting] = React.useState("");
  const [companyName, setCompanyName] = React.useState("TechRecruit");
  const [activeTab, setActiveTab] = React.useState("overview");
  
  // Dados para cards de métricas
  const metricsData = [
    { 
      title: "Candidatos Recebidos", 
      value: 42, 
      trend: "up", 
      percentage: "12%", 
      description: "vs. último mês",
      icon: UserPlus,
      color: "blue",
      goalValue: 50
    },
    { 
      title: "Entrevistas Agendadas", 
      value: 18, 
      trend: "up", 
      percentage: "8%", 
      description: "vs. último mês",
      icon: Calendar,
      color: "purple",
      goalValue: 25
    },
    { 
      title: "Vagas Ativas", 
      value: 8, 
      trend: "neutral", 
      percentage: "0%", 
      description: "vs. último mês",
      icon: Briefcase,
      color: "amber",
      goalValue: 10
    },
    { 
      title: "Taxa de Conversão", 
      value: "24%", 
      trend: "down", 
      percentage: "3%", 
      description: "vs. último mês",
      icon: Activity,
      color: "emerald",
      goalValue: 30
    }
  ];
  
  // Dados para atividades recentes
  const recentActivities = [
    {
      id: "log-1",
      user: {
        name: "João Silva",
        avatar: "/placeholder-user.jpg"
      },
      action: "candidatou-se",
      description: "João Silva se candidatou para Desenvolvedor Frontend",
      time: "Há 10 minutos",
      link: "/candidates/123"
    },
    {
      id: "log-2",
      user: {
        name: "Maria Costa",
        avatar: "/placeholder-user.jpg"
      },
      action: "entrevista",
      description: "Entrevista técnica com Maria Oliveira para Designer UX",
      time: "Há 30 minutos",
      link: "/interviews/456"
    },
    {
      id: "log-3",
      user: {
        name: "Ana Santos",
        avatar: "/placeholder-user.jpg"
      },
      action: "contratação",
      description: "Proposta enviada para Carlos Mendes para Desenvolvedor Backend",
      time: "Há 2 horas",
      link: "/offers/789"
    }
  ];

  // Dados para plano do usuário
  const planData = {
    name: "Recrutador Pro",
    usedSlots: 4,
    totalSlots: 10,
    percentUsed: 40,
    daysLeft: 15,
    features: [
      "Até 10 vagas ativas",
      "Candidatos ilimitados",
      "Painel de análise avançado",
      "Integração com ATS"
    ]
  };
  
  // Obter saudação baseada na hora do dia
  React.useEffect(() => {
    const hour = new Date().getHours();
    let greetingText = "";
    
    if (hour >= 5 && hour < 12) {
      greetingText = "Bom dia";
    } else if (hour >= 12 && hour < 18) {
      greetingText = "Boa tarde";
    } else {
      greetingText = "Boa noite";
    }
    
    setGreeting(greetingText);
  }, []);

  // Número de vagas ativas e candidatos não vistos
  const activeJobs = 8; // Valor fixo para vagas ativas
  const unseenCandidates = 14; // Simulando dados
  const urgentTasks = priorities.filter(p => p.status === 'urgent').length;
  
  // Data atual formatada
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Estatísticas de resumo
  const weeklyStats = {
    applications: 42,
    interviews: 12,
    hired: 3,
    increase: 18
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Conteúdo principal */}
      <div className="container flex-1 space-y-4 md:space-y-6 p-4 md:p-8 md:pl-6">
        {/* Cabeçalho da página com ações rápidas */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight group">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 animate-gradient">
                {greeting}, Recrutador
              </span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Você tem {activeJobs} vagas ativas, {unseenCandidates} candidatos não revisados e {urgentTasks} {urgentTasks === 1 ? 'tarefa urgente' : 'tarefas urgentes'}.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-between md:justify-end mt-2 md:mt-0">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-9 flex-1 md:flex-none hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              <span className="whitespace-nowrap">Nova Vaga</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-9 flex-1 md:flex-none hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              <span className="whitespace-nowrap">Novo Candidato</span>
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              className="h-9 flex-1 md:flex-none hover:bg-secondary/80 transition-colors"
            >
              <Calendar className="mr-2 h-4 w-4" />
              <span className="whitespace-nowrap">Agendar Entrevista</span>
            </Button>
          </div>
        </div>

        {/* Card de resumo semanal */}
        <Card className="bg-muted/30 border-primary/20">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
              <div className="bg-primary/10 p-3 md:p-4 rounded-full h-14 w-14 md:h-16 md:w-16 flex items-center justify-center">
                <Activity className="h-7 w-7 md:h-8 md:w-8 text-primary" />
              </div>
              <div className="flex-1 space-y-1 text-center md:text-left">
                <h3 className="font-medium">Resumo da semana</h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Seu recrutamento teve um aumento de <span className="text-emerald-600 font-medium">{weeklyStats.increase}%</span> esta semana. 
                  Você recebeu <span className="font-medium">{weeklyStats.applications}</span> candidaturas, realizou <span className="font-medium">{weeklyStats.interviews}</span> entrevistas e contratou <span className="font-medium">{weeklyStats.hired}</span> candidatos.
                </p>
              </div>
              <Button variant="outline" className="w-full md:w-auto shrink-0 mt-2 md:mt-0 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors">
                Ver análise completa
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Navegação de guias com indicador de seleção e animações suaves */}
        <Tabs defaultValue="overview" className="space-y-4 md:space-y-6" onValueChange={setActiveTab}>
          <NavigationTabs 
            tabs={[
              {
                id: "overview",
                label: "Visão Geral",
                icon: LayoutDashboard,
                description: "Resumo geral do seu dashboard"
              },
              {
                id: "vagas",
                label: "Vagas",
                icon: Briefcase,
                count: activeJobs,
                description: "Gerenciar suas vagas publicadas"
              },
              {
                id: "candidatos",
                label: "Candidatos",
                icon: Users,
                description: "Visualizar candidatos às suas vagas"
              },
              {
                id: "tarefas",
                label: "Tarefas",
                icon: CheckCheck,
                count: urgentTasks,
                badgeVariant: "destructive",
                description: "Gerenciar suas tarefas pendentes"
              },
            ]}
            onChange={setActiveTab}
          />
          
          {/* Conteúdo das abas */}
          <TabsContent value="overview" className="animate-in fade-in-50 slide-in-from-bottom-5 duration-300">
            {/* Cards de métricas em grid responsivo */}
            <div className="grid gap-3 md:gap-6 grid-cols-2 lg:grid-cols-4">
              {metricsData.map((metric, index) => (
                <MetricCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  trend={metric.trend as "up" | "down" | "neutral"}
                  percentage={metric.percentage}
                  description={metric.description}
                  icon={metric.icon}
                  color={metric.color as "blue" | "purple" | "amber" | "emerald" | "slate" | "indigo" | "rose"}
                  goalValue={metric.goalValue}
                />
              ))}
            </div>

            {/* Layout principal com duas colunas responsivas */}
            <div className="mt-4 md:mt-6 grid gap-4 md:gap-6">
              {/* Card de Inscrições Recentes */}
              <Card>
                <CardHeader className="p-4 pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base md:text-lg font-medium">Inscrições Recentes</CardTitle>
                    <Badge className="px-2 py-1 text-xs">
                      Últimas 24h
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {/* Versão para desktop da tabela */}
                  <div className="hidden md:block">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[250px]">Candidato</TableHead>
                          <TableHead>Vaga</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {candidates.slice(0, 5).map((candidate) => (
                          <TableRow key={candidate.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={candidate.avatar} alt={candidate.name} />
                                  <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{candidate.name}</div>
                                  <div className="text-xs text-muted-foreground">{candidate.email}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                                <span>{candidate.jobTitle}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={`${
                                candidate.status === 'applied' ? 'bg-blue-100 text-blue-700' :
                                candidate.status === 'screening' ? 'bg-amber-100 text-amber-700' :
                                candidate.status === 'interview' ? 'bg-purple-100 text-purple-700' :
                                candidate.status === 'offer' ? 'bg-emerald-100 text-emerald-700' :
                                candidate.status === 'hired' ? 'bg-green-100 text-green-700' :
                                'bg-slate-100 text-slate-700'
                              }`}>
                                {candidate.status === 'applied' ? 'Candidatou-se' :
                                 candidate.status === 'screening' ? 'Em análise' :
                                 candidate.status === 'interview' ? 'Entrevista' :
                                 candidate.status === 'offer' ? 'Oferta' :
                                 candidate.status === 'hired' ? 'Contratado' : 'Rejeitado'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">Ver perfil</span>
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                  <MessageSquare className="h-4 w-4" />
                                  <span className="sr-only">Enviar mensagem</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  {/* Versão para mobile da tabela */}
                  <div className="md:hidden">
                    <div className="divide-y">
                      {candidates.slice(0, 5).map((candidate) => (
                        <div key={candidate.id} className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-9 w-9">
                                <AvatarImage src={candidate.avatar} alt={candidate.name} />
                                <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-sm">{candidate.name}</div>
                                <div className="text-xs text-muted-foreground truncate max-w-[180px]">{candidate.email}</div>
                              </div>
                            </div>
                            <Badge className={`ml-2 text-xs ${
                              candidate.status === 'applied' ? 'bg-blue-100 text-blue-700' :
                              candidate.status === 'screening' ? 'bg-amber-100 text-amber-700' :
                              candidate.status === 'interview' ? 'bg-purple-100 text-purple-700' :
                              candidate.status === 'offer' ? 'bg-emerald-100 text-emerald-700' :
                              candidate.status === 'hired' ? 'bg-green-100 text-green-700' :
                              'bg-slate-100 text-slate-700'
                            }`}>
                              {candidate.status === 'applied' ? 'Candidatou-se' :
                               candidate.status === 'screening' ? 'Em análise' :
                               candidate.status === 'interview' ? 'Entrevista' :
                               candidate.status === 'offer' ? 'Oferta' :
                               candidate.status === 'hired' ? 'Contratado' : 'Rejeitado'}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-xs">{candidate.jobTitle}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-xs text-muted-foreground">
                              Atualizado: {candidate.lastUpdated}
                            </div>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                                <Eye className="h-3.5 w-3.5" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                                <MessageSquare className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col md:flex-row md:justify-between border-t p-4 gap-3">
                  <div className="text-sm text-muted-foreground">
                    Mostrando {Math.min(candidates.length, 5)} de {candidates.length} candidatos
                  </div>
                  <Button asChild className="w-full md:w-auto">
                    <Link href="/dashboard/candidates">
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Ver todos os candidatos
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Card de prioridades */}
                <Card>
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-base md:text-lg font-medium">Tarefas Prioritárias</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="divide-y">
                      {priorities.slice(0, 4).map((priority) => (
                        <div 
                          key={priority.id} 
                          className="py-3 first:pt-0 last:pb-0 rounded-md my-1 px-2 -mx-2"
                        >
                          <div className="flex gap-3 items-center">
                            <div className={`w-1 self-stretch rounded-full ${
                              priority.status === 'urgent' ? 'bg-rose-500' :
                              priority.status === 'high' ? 'bg-amber-500' : 
                              priority.status === 'medium' ? 'bg-blue-500' : 'bg-emerald-500'
                            }`} />
                            
                            <div className="flex-grow min-w-0">
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="font-medium text-sm md:text-base">{priority.title}</div>
                                  <div className="flex flex-wrap items-center text-xs text-muted-foreground mt-1">
                                    <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                                    <span className={`${priority.status === 'urgent' ? 'text-rose-500 font-medium' : ''}`}>
                                      {priority.deadline}
                                    </span>
                                    {priority.tag && (
                                      <>
                                        <span className="mx-1">•</span>
                                        <Badge variant="outline" className="text-xs h-5 px-1 rounded-sm">
                                          {priority.tag}
                                        </Badge>
                                      </>
                                    )}
                                  </div>
                                </div>
                                
                                <div>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-6 w-6 rounded-full"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t p-4">
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      asChild
                    >
                      <Link href="/dashboard/tarefas">
                        <ListTodo className="mr-2 h-4 w-4" />
                        Ver todas as tarefas
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>

                {/* Card de atividades recentes */}
                <Card>
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-base md:text-lg font-medium">Atividade Recente</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-4 md:pt-6">
                    <div className="space-y-4 md:space-y-6">
                      {recentActivities.map((activity, index) => (
                        <div key={index} className="relative pl-6">
                          {/* Linha de tempo conectando eventos */}
                          {index < recentActivities.length - 1 && (
                            <div className="absolute left-[10px] top-[26px] bottom-[-16px] md:bottom-[-20px] w-0.5 bg-muted" />
                          )}
                          
                          {/* Ícone da atividade */}
                          <div className={`absolute left-0 top-0 flex h-5 w-5 items-center justify-center rounded-full ${
                            activity.action === "candidatou-se" ? "bg-blue-100 text-blue-600" :
                            activity.action === "entrevista" ? "bg-purple-100 text-purple-600" :
                            activity.action === "contratação" ? "bg-emerald-100 text-emerald-600" :
                            "bg-amber-100 text-amber-600"
                          } border border-background`}>
                            {activity.action === "candidatou-se" && <User className="h-3 w-3" />}
                            {activity.action === "entrevista" && <Calendar className="h-3 w-3" />}
                            {activity.action === "contratação" && <Award className="h-3 w-3" />}
                            {activity.action === "mensagem" && <MessageSquare className="h-3 w-3" />}
                          </div>
                          
                          {/* Conteúdo da atividade */}
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-sm font-medium leading-none">
                                {activity.user.name}
                              </p>
                              <Badge 
                                variant="outline" 
                                className="px-1 h-5 text-[10px] rounded-sm"
                              >
                                {activity.time}
                              </Badge>
                            </div>
                            
                            <p className="mt-1 text-xs text-muted-foreground">{activity.description}</p>
                            
                            {/* Avatares ou badges adicionais */}
                            {activity.user && (
                              <div className="mt-2 flex -space-x-2">
                                <Avatar className="h-5 w-5 border-2 border-background">
                                  <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                                  <AvatarFallback className="text-[10px]">{activity.user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="text-xs ml-3">{activity.user.name}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2 border-t p-4">
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      asChild
                    >
                      <Link href="/dashboard/activity">
                        <Activity className="mr-2 h-4 w-4" />
                        Ver toda a atividade
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="vagas" className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-semibold">Vagas</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8 gap-1 text-xs md:text-sm">
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  Filtros
                </Button>
                <Button size="sm" className="h-8 gap-1 text-xs md:text-sm">
                  <Plus className="h-3.5 w-3.5" />
                  Nova Vaga
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="rounded-lg gap-1 pl-2 pr-3 py-1.5 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors cursor-pointer">
                  <X className="h-3.5 w-3.5" />
                  Apenas ativas
                </Badge>
                <Select defaultValue="30">
                  <SelectTrigger className="h-8 px-2 text-xs gap-1 w-full sm:w-auto">
                    <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                    <SelectValue>Últimos 30 dias</SelectValue>
                  </SelectTrigger>
                  <SelectContent side="bottom" align="end">
                    <SelectItem value="7">Últimos 7 dias</SelectItem>
                    <SelectItem value="14">Últimos 14 dias</SelectItem>
                    <SelectItem value="30">Últimos 30 dias</SelectItem>
                    <SelectItem value="90">Últimos 90 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar vagas..."
                  className="w-full pl-9 rounded-lg h-9"
                />
              </div>
            </div>

            <Card>
              {/* Versão desktop da tabela */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Candidato</TableHead>
                      <TableHead>Vaga</TableHead>
                      <TableHead>Fase</TableHead>
                      <TableHead>Avaliação</TableHead>
                      <TableHead>Última atualização</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {candidates.map((candidate, index) => (
                      <TableRow key={index} className="group hover:bg-muted/50">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 border-2 border-background ring-0 transition-transform group-hover:ring-1 group-hover:ring-primary/30">
                              <AvatarImage src={candidate.avatar} alt={candidate.name} />
                              <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium group-hover:text-primary transition-colors">
                                {candidate.name}
                              </div>
                              <div className="text-xs text-muted-foreground flex gap-2 mt-0.5 items-center">
                                <Mail className="h-3 w-3" />
                                {candidate.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="group-hover:border-primary/30 group-hover:bg-primary/5 transition-colors">
                            {candidate.jobTitle}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={`transition-colors ${
                            candidate.status === 'applied' ? 'bg-blue-100 text-blue-700 group-hover:bg-blue-200' :
                            candidate.status === 'screening' ? 'bg-indigo-100 text-indigo-700 group-hover:bg-indigo-200' :
                            candidate.status === 'interview' ? 'bg-violet-100 text-violet-700 group-hover:bg-violet-200' :
                            candidate.status === 'offer' ? 'bg-amber-100 text-amber-700 group-hover:bg-amber-200' :
                            candidate.status === 'hired' ? 'bg-emerald-100 text-emerald-700 group-hover:bg-emerald-200' :
                            'bg-rose-100 text-rose-700 group-hover:bg-rose-200'
                          }`}>
                            {candidate.status === 'applied' ? 'Aplicado' :
                              candidate.status === 'screening' ? 'Triagem' :
                              candidate.status === 'interview' ? 'Entrevista' :
                              candidate.status === 'offer' ? 'Oferta' :
                              candidate.status === 'hired' ? 'Contratado' :
                              'Rejeitado'}
                        </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${
                                  i < candidate.rating 
                                    ? 'text-amber-500 fill-amber-500 group-hover:text-amber-600 group-hover:fill-amber-600' 
                                    : 'text-muted'
                                } transition-colors`} 
                              />
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">
                            {candidate.lastUpdated}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="outline" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors">
                                    <FileEdit className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Avaliar candidato</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="outline" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors">
                                    <Calendar className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Agendar entrevista</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="outline" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Mais opções</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {/* Versão mobile da tabela */}
              <div className="md:hidden">
                <div className="divide-y">
                  {candidates.map((candidate, index) => (
                    <div key={index} className="p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-9 w-9 border-2 border-background">
                            <AvatarImage src={candidate.avatar} alt={candidate.name} />
                            <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">{candidate.name}</div>
                            <div className="text-xs text-muted-foreground truncate max-w-[180px]">{candidate.email}</div>
                          </div>
                        </div>
                        <Badge className={`ml-2 text-xs transition-colors ${
                          candidate.status === 'applied' ? 'bg-blue-100 text-blue-700' :
                          candidate.status === 'screening' ? 'bg-indigo-100 text-indigo-700' :
                          candidate.status === 'interview' ? 'bg-violet-100 text-violet-700' :
                          candidate.status === 'offer' ? 'bg-amber-100 text-amber-700' :
                          candidate.status === 'hired' ? 'bg-emerald-100 text-emerald-700' :
                          'bg-rose-100 text-rose-700'
                        }`}>
                          {candidate.status === 'applied' ? 'Aplicado' :
                            candidate.status === 'screening' ? 'Triagem' :
                            candidate.status === 'interview' ? 'Entrevista' :
                            candidate.status === 'offer' ? 'Oferta' :
                            candidate.status === 'hired' ? 'Contratado' :
                            'Rejeitado'}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant="outline" className="text-xs">
                          {candidate.jobTitle}
                        </Badge>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${
                                i < candidate.rating 
                                  ? 'text-amber-500 fill-amber-500' 
                                  : 'text-muted'
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-muted-foreground">
                          {candidate.lastUpdated}
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                            <FileEdit className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                            <Calendar className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                            <MoreHorizontal className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <CardFooter className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t p-4 gap-3">
                <div className="text-sm text-muted-foreground">
                  Mostrando {candidates.length} de {candidates.length} candidatos
                </div>
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto gap-1 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors" 
                  size="sm"
                >
                  <ListChecks className="h-4 w-4 mr-1" />
                  Ver todas as tarefas
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
