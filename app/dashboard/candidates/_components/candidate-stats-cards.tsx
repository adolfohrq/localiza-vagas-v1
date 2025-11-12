"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export function CandidateStatsCards() {
  const { stats } = useCandidates();
  
  return (
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
  );
} 