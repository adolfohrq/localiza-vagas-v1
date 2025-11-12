"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  UserCheck, 
  Clock, 
  Star, 
  TrendingUp,
  BriefcaseBusiness,
  CheckCircle2,
  XCircle,
  PieChart,
  Activity,
  Lightbulb,
  Target,
  Bot
} from "lucide-react";
import { useCandidates } from "../_hooks/use-candidates";

export function CandidateAnalytics() {
  const { candidates, stats } = useCandidates();
  
  return (
    <div className="space-y-6">
      {/* Cards de estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Candidatos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCandidates}</div>
            <p className="text-xs text-muted-foreground">
              {stats.weekCandidatesCount} novos esta semana
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entrevistas Agendadas</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.interviewScheduled}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((stats.interviewScheduled / stats.totalCandidates) * 100)}% dos candidatos
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Match Score Médio</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageMatchScore}%</div>
            <p className="text-xs text-muted-foreground">
              {stats.highMatchScoreCount} candidatos com +85%
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRates.contratados}%</div>
            <p className="text-xs text-muted-foreground">
              De candidaturas a contratações
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Gráfico de funil de conversão */}
      <Card>
        <CardHeader>
          <CardTitle>Funil de Recrutamento</CardTitle>
          <CardDescription>
            Conversão de candidatos em cada etapa do processo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <BriefcaseBusiness className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Candidaturas</span>
                </div>
                <span className="font-medium">{stats.conversionRates.candidaturas}%</span>
              </div>
              <Progress value={stats.conversionRates.candidaturas} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <UserCheck className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Triagem</span>
                </div>
                <span className="font-medium">{stats.conversionRates.triagem}%</span>
              </div>
              <Progress value={stats.conversionRates.triagem} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Activity className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Entrevista Técnica</span>
                </div>
                <span className="font-medium">{stats.conversionRates.entrevistaTecnica}%</span>
              </div>
              <Progress value={stats.conversionRates.entrevistaTecnica} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Entrevista RH</span>
                </div>
                <span className="font-medium">{stats.conversionRates.entrevistaRH}%</span>
              </div>
              <Progress value={stats.conversionRates.entrevistaRH} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Contratados</span>
                </div>
                <span className="font-medium">{stats.conversionRates.contratados}%</span>
              </div>
              <Progress value={stats.conversionRates.contratados} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Distribuição de candidatos e insights */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Status</CardTitle>
            <CardDescription>
              Candidatos por etapa do processo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-blue-500 mr-2" />
                  <span className="text-sm">Novos</span>
                </div>
                <span className="text-sm font-medium">
                  {candidates.filter(c => c.status === "new").length}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-purple-500 mr-2" />
                  <span className="text-sm">Em Análise</span>
                </div>
                <span className="text-sm font-medium">
                  {candidates.filter(c => c.status === "reviewing").length}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-2" />
                  <span className="text-sm">Entrevistados</span>
                </div>
                <span className="text-sm font-medium">
                  {candidates.filter(c => c.status === "interviewed").length}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-700 mr-2" />
                  <span className="text-sm">Aprovados</span>
                </div>
                <span className="text-sm font-medium">
                  {candidates.filter(c => c.status === "approved").length}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-red-500 mr-2" />
                  <span className="text-sm">Rejeitados</span>
                </div>
                <span className="text-sm font-medium">
                  {candidates.filter(c => c.status === "rejected").length}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-600 mr-2" />
                  <span className="text-sm">Contratados</span>
                </div>
                <span className="text-sm font-medium">
                  {candidates.filter(c => c.status === "hired").length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Insights e Recomendações</CardTitle>
            <CardDescription>
              Análises baseadas nos dados atuais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Aumente a taxa de conversão</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    A taxa de conversão da triagem para entrevista técnica está abaixo do ideal. 
                    Considere revisar os critérios de triagem.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Target className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Candidatos de alta prioridade</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stats.highMatchScoreCount} candidatos têm match score acima de 85%. 
                    Priorize a análise destes perfis.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Bot className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Automação de processos</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Automatize o envio de emails para candidatos em espera há mais de 5 dias 
                    para melhorar a experiência.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 