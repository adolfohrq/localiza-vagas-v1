import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TeamStats } from '../_types';
import { UserCog, Users, UserCheck, UserX, ShieldCheck, Briefcase, Eye } from 'lucide-react';

interface TeamStatsProps {
  stats: TeamStats;
  isLoading?: boolean;
}

export function TeamStatsCards({ stats, isLoading = false }: TeamStatsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex flex-col space-y-1">
            <CardTitle className="text-sm font-medium">Total de Membros</CardTitle>
            <CardDescription>Equipe completa</CardDescription>
          </div>
          <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
            <Users className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {stats.active} ativos, {stats.invited} convidados, {stats.inactive} inativos
          </p>
          <Progress 
            value={(stats.active / stats.total) * 100} 
            className="h-2 mt-2" 
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex flex-col space-y-1">
            <CardTitle className="text-sm font-medium">Administradores</CardTitle>
            <CardDescription>Acesso total</CardDescription>
          </div>
          <div className="bg-purple-100 text-purple-700 p-2 rounded-full">
            <ShieldCheck className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.byRole.admin}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {((stats.byRole.admin / stats.total) * 100).toFixed(0)}% do total da equipe
          </p>
          <Progress 
            value={(stats.byRole.admin / stats.total) * 100} 
            className="h-2 mt-2 bg-purple-100" 
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex flex-col space-y-1">
            <CardTitle className="text-sm font-medium">Recrutadores</CardTitle>
            <CardDescription>Gerenciam vagas</CardDescription>
          </div>
          <div className="bg-amber-100 text-amber-700 p-2 rounded-full">
            <Briefcase className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.byRole.recruiter}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {((stats.byRole.recruiter / stats.total) * 100).toFixed(0)}% do total da equipe
          </p>
          <Progress 
            value={(stats.byRole.recruiter / stats.total) * 100} 
            className="h-2 mt-2 bg-amber-100" 
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex flex-col space-y-1">
            <CardTitle className="text-sm font-medium">Taxa de Ativação</CardTitle>
            <CardDescription>Convites aceitos</CardDescription>
          </div>
          <div className="bg-emerald-100 text-emerald-700 p-2 rounded-full">
            <UserCheck className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.invited > 0 
              ? `${((stats.active / (stats.active + stats.invited)) * 100).toFixed(0)}%` 
              : '100%'}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {stats.invited} convites pendentes
          </p>
          <Progress 
            value={stats.invited > 0 
              ? ((stats.active / (stats.active + stats.invited)) * 100)
              : 100} 
            className="h-2 mt-2 bg-emerald-100" 
          />
        </CardContent>
      </Card>
    </div>
  );
}

export function TeamRoleDistribution({ stats }: TeamStatsProps) {
  const roles = [
    { name: 'Administradores', count: stats.byRole.admin, color: 'bg-purple-500', icon: ShieldCheck },
    { name: 'Gerentes', count: stats.byRole.manager, color: 'bg-indigo-500', icon: UserCog },
    { name: 'Recrutadores', count: stats.byRole.recruiter, color: 'bg-amber-500', icon: Briefcase },
    { name: 'Visualizadores', count: stats.byRole.viewer, color: 'bg-emerald-500', icon: Eye }
  ];

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Distribuição por Função</CardTitle>
        <CardDescription>
          Divisão da equipe por nível de acesso
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {roles.map((role) => {
            const Icon = role.icon;
            const percentage = stats.total > 0 ? (role.count / stats.total) * 100 : 0;
            
            return (
              <div key={role.name} className="flex items-center">
                <div className={`p-2 rounded-full ${role.color.replace('500', '100')} mr-3`}>
                  <Icon className={`h-4 w-4 ${role.color.replace('bg-', 'text-').replace('500', '700')}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium">{role.name}</p>
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2 text-xs">
                        {role.count} {role.count === 1 ? 'membro' : 'membros'}
                      </Badge>
                      <span className="text-sm font-medium">{percentage.toFixed(0)}%</span>
                    </div>
                  </div>
                  <Progress value={percentage} className={`h-2 ${role.color}`} />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
} 