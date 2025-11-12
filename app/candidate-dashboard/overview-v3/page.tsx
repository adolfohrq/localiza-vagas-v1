"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowDown,
  ArrowUp,
  Award,
  BarChart3,
  Bookmark,
  Briefcase,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Cloud,
  Code,
  Database,
  Eye,
  FileText,
  Gauge,
  Globe,
  GraduationCap,
  Lightbulb,
  MessageSquare,
  Palette,
  Server,
  Smartphone,
  ThumbsUp,
  User,
  Users,
  Zap,
  MapPin,
  DollarSign,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Definição da interface User
interface User {
  name?: string;
  email?: string;
  avatar?: string;
  title?: string;
}

// Definição da interface AuthContextType para resolver o erro de userType
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  userType?: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Mock da função useAuth
const useAuth = (): AuthContextType => {
  return {
    user: {
      name: "João Silva",
      email: "joao.silva@example.com",
      avatar: "/avatars/user.png",
      title: "Desenvolvedor Frontend"
    },
    isAuthenticated: true,
    userType: "candidate",
    login: async () => {},
    logout: () => {}
  };
};

// Estilos customizados para animações
const customStyles = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  @keyframes hover-scale {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  .hover-scale {
    animation: hover-scale 2s ease-in-out infinite;
  }
  
  .gradient-text {
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

/**
 * Visão Geral v3 - Dashboard de Candidato
 * 
 * Esta página apresenta uma visão geral moderna e interativa da carreira do candidato,
 * com métricas, recomendações de vagas, entrevistas agendadas e progresso de habilidades.
 */
export default function OverviewV3() {
  const router = useRouter();
  const { user, isAuthenticated, userType } = useAuth();
  
  const [activeTab, setActiveTab] = useState<string>("vagas");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState<boolean>(false);
  
  // Métricas do usuário
  const [careerScore, setCareerScore] = useState<number>(78);
  const [profileCompleteness, setProfileCompleteness] = useState<number>(85);
  const [applicationSuccess, setApplicationSuccess] = useState<number>(62);
  const [interviewRate, setInterviewRate] = useState<number>(45);
  
  // Efeito para simular carregamento
  useEffect(() => {
    // Verificar autenticação e tipo de usuário
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    if (userType && userType !== 'candidate') {
      router.push('/dashboard');
      return;
    }
    
    // Continua com o carregamento normal da página para candidatos autenticados
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowWelcomeMessage(true);
    }, 1500);
    
    const welcomeTimer = setTimeout(() => {
      setShowWelcomeMessage(false);
    }, 5000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(welcomeTimer);
    };
  }, [isAuthenticated, userType, router]);

  // Renderização da tela de carregamento
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 p-4">
        <style>{customStyles}</style>
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-r-blue-400 border-b-transparent border-l-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
        
        <h2 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">Carregando seu dashboard</h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Estamos preparando seus dados e recomendações personalizadas</p>
        
        <div className="mt-8 max-w-md w-full">
          <div className="space-y-3">
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-1200 w-full"
              />
            </div>
            
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Carregando seu perfil...</span>
              <span>75%</span>
            </div>
            
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-1500 w-3/5"
              />
            </div>
            
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Buscando recomendações de vagas...</span>
              <span>60%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Renderização da mensagem de boas-vindas
  if (showWelcomeMessage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 p-4">
        <style>{customStyles}</style>
        <div
          className="text-center opacity-0 scale-95 animate-in fade-in-0 zoom-in-95 duration-500 fill-mode-forwards"
        >
          <div className="mb-4 text-blue-600 dark:text-blue-400">
            <CheckCircle className="h-16 w-16 mx-auto hover-scale" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-2 gradient-text">
            Bem-vindo de volta, {user?.name?.split(' ')[0]}!
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Seu dashboard foi atualizado com novas recomendações de vagas e oportunidades baseadas no seu perfil.
          </p>
        </div>
      </div>
    );
  }

  // Renderização do conteúdo principal
  return (
    <div className="flex flex-col max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Visão Geral da Carreira</h1>
          <p className="text-muted-foreground">
            Acompanhe seu progresso e descubra novas oportunidades
          </p>
        </div>

        {/* Métricas principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard 
            title="Pontuação de Carreira" 
            value={careerScore} 
            icon={<Gauge className="h-5 w-5 text-blue-600" />}
            description="Baseado em seu perfil e atividades" 
            trend="up" 
            trendValue="+5 pts"
            color="blue"
          />
          <MetricCard 
            title="Perfil Completo" 
            value={profileCompleteness} 
            icon={<User className="h-5 w-5 text-emerald-600" />}
            description="Complete seu perfil para mais oportunidades" 
            trend="up" 
            trendValue="+2%"
            color="emerald"
          />
          <MetricCard 
            title="Taxa de Sucesso" 
            value={applicationSuccess} 
            icon={<CheckCircle className="h-5 w-5 text-amber-600" />}
            description="Candidaturas que avançaram no processo" 
            trend="down" 
            trendValue="-3%"
            color="amber"
          />
          <MetricCard 
            title="Taxa de Entrevistas" 
            value={interviewRate} 
            icon={<Calendar className="h-5 w-5 text-purple-600" />}
            description="Candidaturas que chegaram à entrevista" 
            trend="up" 
            trendValue="+8%"
            color="purple"
          />
        </div>

        {/* Sistema de abas */}
        <div className="flex flex-col space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex space-x-1 border-b">
              <TabsList>
                <TabsTrigger value="vagas">
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="habilidades">
                  Vagas
                </TabsTrigger>
                <TabsTrigger value="conquistas">
                  Habilidades
                </TabsTrigger>
                <TabsTrigger value="desenvolvimento">
                  Conquistas
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Conteúdo das abas */}
            <div className="pt-2">
              {/* Aba de Dashboard */}
              <TabsContent value="vagas" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Coluna principal */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Vagas recomendadas */}
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Vagas Recomendadas</CardTitle>
                          <Button variant="ghost" size="sm" className="text-xs text-blue-600 hover:text-blue-700">
                            Ver todas
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Lista de vagas recomendadas */}
                        <RecommendedJobCard
                          title="Desenvolvedor Frontend React"
                          company="TechSolutions"
                          location="São Paulo, SP (Remoto)"
                          salary="R$ 8.000 - R$ 12.000"
                          matchPercentage={95}
                          tags={["React", "TypeScript", "UI/UX"]}
                          postedTime="Há 2 dias"
                          logo="/logos/techsolutions.png"
                          isNew={true}
                        />
                        
                        <RecommendedJobCard
                          title="UX/UI Designer Sênior"
                          company="Inovação Digital"
                          location="Florianópolis, SC (Híbrido)"
                          salary="R$ 10.000 - R$ 15.000"
                          matchPercentage={87}
                          tags={["Figma", "Design Systems", "User Research"]}
                          postedTime="Há 5 dias"
                          logo="/logos/inovacao.png"
                        />
                        
                        <RecommendedJobCard
                          title="Desenvolvedor Full Stack"
                          company="Empresa ABC"
                          location="Rio de Janeiro, RJ (Presencial)"
                          salary="R$ 9.000 - R$ 14.000"
                          matchPercentage={82}
                          tags={["React", "Node.js", "MongoDB"]}
                          postedTime="Há 1 semana"
                          logo="/logos/abc.png"
                        />
                      </CardContent>
                    </Card>
                    
                    {/* Próximas entrevistas e atividades recentes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Próximas entrevistas */}
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Próximas Entrevistas</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <UpcomingInterviewCard
                            company="TechSolutions"
                            position="Desenvolvedor Frontend React"
                            date="Amanhã"
                            time="14:00 - 15:30"
                            interviewer="Ana Silva"
                            type="Técnica"
                            logo="/logos/techsolutions.png"
                          />
                          
                          <UpcomingInterviewCard
                            company="Inovação Digital"
                            position="UX/UI Designer Sênior"
                            date="23/03/2023"
                            time="10:00 - 11:00"
                            interviewer="Carlos Mendes"
                            type="Comportamental"
                            logo="/logos/inovacao.png"
                          />
                        </CardContent>
                      </Card>
                      
                      {/* Atividades recentes */}
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Atividades Recentes</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <ActivityItem
                            icon={<Eye className="h-4 w-4 text-blue-600" />}
                            title="Currículo visualizado"
                            description="Seu currículo foi visualizado por TechSolutions"
                            time="3h atrás"
                          />
                          
                          <ActivityItem
                            icon={<CheckCircle className="h-4 w-4 text-green-600" />}
                            title="Candidatura enviada"
                            description="Você se candidatou para Desenvolvedor Full Stack"
                            time="1d atrás"
                          />
                          
                          <ActivityItem
                            icon={<MessageSquare className="h-4 w-4 text-purple-600" />}
                            title="Nova mensagem"
                            description="Ana Silva enviou uma mensagem para você"
                            time="2d atrás"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Perfil rápido */}
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                            {user?.avatar ? (
                              <img src={user.avatar} alt={user.name || "Usuário"} className="h-full w-full object-cover" />
                            ) : (
                              <User className="h-6 w-6 text-gray-500" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">{user?.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{user?.title}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                          <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-md">
                            <p className="text-xs text-gray-500 dark:text-gray-400">Nível</p>
                            <p className="font-medium text-gray-900 dark:text-white">15</p>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-md">
                            <p className="text-xs text-gray-500 dark:text-gray-400">XP</p>
                            <p className="font-medium text-gray-900 dark:text-white">2.450</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Atividades recentes */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Atividades Recentes</CardTitle>
                      </CardHeader>
                      <CardContent className="p-3">
                        <div className="space-y-3">
                          <SidebarActivityItem
                            icon={<Eye className="h-3.5 w-3.5 text-blue-600" />}
                            text="Seu currículo foi visualizado por TechSolutions"
                            time="3h"
                          />
                          <SidebarActivityItem
                            icon={<CheckCircle className="h-3.5 w-3.5 text-green-600" />}
                            text="Você se candidatou para Desenvolvedor Full Stack"
                            time="1d"
                          />
                          <SidebarActivityItem
                            icon={<MessageSquare className="h-3.5 w-3.5 text-purple-600" />}
                            text="Ana Silva enviou uma mensagem para você"
                            time="2d"
                          />
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Próximas entrevistas */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Próximas Entrevistas</CardTitle>
                      </CardHeader>
                      <CardContent className="p-3">
                        <div className="space-y-3">
                          <SidebarInterviewItem
                            company="TechSolutions"
                            position="Desenvolvedor Frontend React"
                            date="Amanhã"
                            time="14:00"
                          />
                          <SidebarInterviewItem
                            company="Inovação Digital"
                            position="UX/UI Designer Sênior"
                            date="23/03/2023"
                            time="10:00"
                          />
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Dicas para você */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Dicas para Você</CardTitle>
                      </CardHeader>
                      <CardContent className="p-3">
                        <div className="space-y-2 text-sm">
                          <p className="text-gray-700 dark:text-gray-300">
                            Adicione mais projetos ao seu portfólio para aumentar suas chances de ser notado por recrutadores.
                          </p>
                          <Button variant="ghost" size="sm" className="p-0 h-auto text-xs text-blue-600 hover:text-blue-700 mt-2">
                            Mais dicas
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              {/* Outras abas seriam implementadas aqui */}
              <TabsContent value="habilidades">
                <div className="py-4">
                  <h3 className="text-lg font-medium">Conteúdo da aba Vagas</h3>
                  <p className="text-muted-foreground">Esta seção está em desenvolvimento.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="conquistas">
                <div className="py-4">
                  <h3 className="text-lg font-medium">Conteúdo da aba Habilidades</h3>
                  <p className="text-muted-foreground">Esta seção está em desenvolvimento.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="desenvolvimento">
                <div className="py-4">
                  <h3 className="text-lg font-medium">Conteúdo da aba Conquistas</h3>
                  <p className="text-muted-foreground">Esta seção está em desenvolvimento.</p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
      
      {/* Botão de feedback flutuante */}
      <div className="fixed bottom-6 right-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
                <MessageSquare className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Enviar feedback</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

// Componente de cartão de métrica
function MetricCard({ 
  title, 
  value, 
  icon, 
  description, 
  trend, 
  trendValue,
  color = "blue"
}: { 
  title: string
  value: number
  icon: React.ReactNode
  description: string
  trend: "up" | "down" | "neutral"
  trendValue: string
  color?: "blue" | "emerald" | "amber" | "purple" | "pink"
}) {
  const colorClasses = {
    blue: {
      bg: "bg-blue-50 dark:bg-blue-950/50",
      border: "border-blue-100 dark:border-blue-900",
      text: "text-blue-700 dark:text-blue-300",
      progress: "bg-blue-600 dark:bg-blue-400"
    },
    emerald: {
      bg: "bg-emerald-50 dark:bg-emerald-950/50",
      border: "border-emerald-100 dark:border-emerald-900",
      text: "text-emerald-700 dark:text-emerald-300",
      progress: "bg-emerald-600 dark:bg-emerald-400"
    },
    amber: {
      bg: "bg-amber-50 dark:bg-amber-950/50",
      border: "border-amber-100 dark:border-amber-900",
      text: "text-amber-700 dark:text-amber-300",
      progress: "bg-amber-600 dark:bg-amber-400"
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-950/50",
      border: "border-purple-100 dark:border-purple-900",
      text: "text-purple-700 dark:text-purple-300",
      progress: "bg-purple-600 dark:bg-purple-400"
    },
    pink: {
      bg: "bg-pink-50 dark:bg-pink-950/50",
      border: "border-pink-100 dark:border-pink-900",
      text: "text-pink-700 dark:text-pink-300",
      progress: "bg-pink-600 dark:bg-pink-400"
    }
  };

  return (
    <div
      className={`rounded-xl border ${colorClasses[color].border} p-4 shadow-sm hover:shadow-md transition-shadow duration-200`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg ${colorClasses[color].bg}`}>
          {icon}
        </div>
        <div className="flex items-center">
          {trend === "up" && (
            <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-medium">
              <ArrowUp className="h-4 w-4 mr-1" />
              {trendValue}
            </div>
          )}
          {trend === "down" && (
            <div className="flex items-center text-red-600 dark:text-red-400 text-sm font-medium">
              <ArrowDown className="h-4 w-4 mr-1" />
              {trendValue}
            </div>
          )}
          {trend === "neutral" && (
            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              {trendValue}
            </div>
          )}
        </div>
      </div>
      <div className="mb-2">
        <div className="flex items-end gap-1 mb-1">
          <h3 className="text-2xl font-bold">{value}</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-0.5">/ 100</span>
        </div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</h4>
      </div>
      <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
        <div 
          className={`h-full ${colorClasses[color].progress} rounded-full`}
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  )
}

// Componente de vaga recomendada
function RecommendedJobCard({
  title,
  company,
  location,
  salary,
  matchPercentage,
  tags,
  postedTime,
  logo,
  isNew = false,
}: {
  title: string
  company: string
  location: string
  salary: string
  matchPercentage: number
  tags: string[]
  postedTime: string
  logo: string
  isNew?: boolean
}) {
  return (
    <div
      className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-800"
    >
      <div className="flex items-start gap-3">
        <div className="h-12 w-12 rounded-lg border bg-white p-2 flex-shrink-0">
          <img src={logo} alt={`${company} logo`} className="h-full w-full object-contain" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400">{company}</h3>
              <h2 className="font-semibold text-gray-900 dark:text-gray-100 truncate">{title}</h2>
            </div>
            {isNew && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400">
                Nova
              </Badge>
            )}
          </div>
          
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag, i) => (
              <Badge key={i} variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <span className="text-xs text-gray-500 dark:text-gray-400 self-center">+{tags.length - 3}</span>
            )}
          </div>
          
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-3.5 w-3.5" />
                <span>{salary}</span>
              </div>
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500">{postedTime}</div>
          </div>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 dark:bg-blue-500 rounded-full" 
              style={{ width: `${matchPercentage}%` }}
            />
          </div>
          <span className="text-sm font-medium text-blue-700 dark:text-blue-400">{matchPercentage}%</span>
        </div>
        
        <Button size="sm" className="h-8">Ver vaga</Button>
      </div>
    </div>
  )
}

// Componente de entrevista próxima
function UpcomingInterviewCard({
  company,
  position,
  date,
  time,
  interviewer,
  type,
  logo,
}: {
  company: string
  position: string
  date: string
  time: string
  interviewer: string
  type: string
  logo: string
}) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-800">
      <div className="flex items-start gap-3">
        <div className="h-12 w-12 rounded-lg border bg-white p-2 flex-shrink-0">
          <img src={logo} alt={`${company} logo`} className="h-full w-full object-contain" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400">{company}</h3>
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">{position}</h2>
          
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">{date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">{time}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4 text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">{interviewer}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Briefcase className="h-4 w-4 text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">{type}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t flex justify-between">
        <Button variant="outline" size="sm" className="h-8">Reagendar</Button>
        <Button size="sm" className="h-8">Preparar</Button>
      </div>
    </div>
  )
}

// Componente de item de atividade
function ActivityItem({
  icon,
  title,
  description,
  time,
}: {
  icon: React.ReactNode
  title: string
  description: string
  time: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h4>
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  )
}

// Componente de item de atividade da sidebar
function SidebarActivityItem({
  icon,
  text,
  time,
}: {
  icon: React.ReactNode
  text: string
  time: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-700 dark:text-gray-300">{text}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  )
}

// Componente de item de entrevista da sidebar
function SidebarInterviewItem({
  company,
  position,
  date,
  time,
}: {
  company: string
  position: string
  date: string
  time: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
        <Calendar className="h-4 w-4 text-blue-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-800 dark:text-gray-200">{position}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{company}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{date} • {time}</p>
      </div>
    </div>
  )
}