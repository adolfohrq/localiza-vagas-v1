import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, BarChart3, Users, Eye, Briefcase } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao seu painel de controle
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nova Ação
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300 group">
          <CardHeader className="p-4 pb-0 flex flex-row items-start justify-between space-y-0">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                Vagas Ativas
              </CardTitle>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold group-hover:scale-105 transition-transform duration-300 group-hover:text-primary">
                  3
                </span>
              </div>
            </div>
            <div className="rounded-full p-2 group-hover:scale-110 transition-transform duration-300 bg-blue-100 text-blue-600">
              <Briefcase className="h-4 w-4 group-hover:animate-pulse" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-xs text-muted-foreground mt-2.5 mb-1.5 group-hover:text-foreground/80 transition-colors">
              1 rascunho, 1 encerrada
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
                  590
                </span>
              </div>
            </div>
            <div className="rounded-full p-2 group-hover:scale-110 transition-transform duration-300 bg-purple-100 text-purple-600">
              <Eye className="h-4 w-4 group-hover:animate-pulse" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-xs text-muted-foreground mt-2.5 mb-1.5 group-hover:text-foreground/80 transition-colors">
              Média de 196 visualizações por vaga
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
                  26
                </span>
              </div>
            </div>
            <div className="rounded-full p-2 group-hover:scale-110 transition-transform duration-300 bg-amber-100 text-amber-600">
              <Users className="h-4 w-4 group-hover:animate-pulse" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-xs text-muted-foreground mt-2.5 mb-1.5 group-hover:text-foreground/80 transition-colors">
              Média de 8 candidaturas por vaga
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
                  4.4%
                </span>
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
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>
              Últimas atividades em suas vagas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full p-2 bg-blue-100 text-blue-600">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Nova candidatura</p>
                  <p className="text-sm text-muted-foreground">
                    Maria Silva se candidatou para Desenvolvedor Frontend
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Há 2 horas
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="rounded-full p-2 bg-purple-100 text-purple-600">
                  <Eye className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Aumento de visualizações</p>
                  <p className="text-sm text-muted-foreground">
                    Sua vaga de UX Designer recebeu 45 novas visualizações
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Há 5 horas
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="rounded-full p-2 bg-amber-100 text-amber-600">
                  <Briefcase className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Nova vaga publicada</p>
                  <p className="text-sm text-muted-foreground">
                    Você publicou a vaga de Analista de Marketing
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Há 1 dia
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Vagas em Destaque</CardTitle>
            <CardDescription>
              Suas vagas com melhor desempenho
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Desenvolvedor Frontend</p>
                  <p className="text-xs text-muted-foreground">
                    São Paulo, SP • Remoto
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Eye className="mr-1 h-3.5 w-3.5" />
                    245
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Users className="mr-1 h-3.5 w-3.5" />
                    12
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">UX Designer</p>
                  <p className="text-xs text-muted-foreground">
                    Rio de Janeiro, RJ • Híbrido
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Eye className="mr-1 h-3.5 w-3.5" />
                    198
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Users className="mr-1 h-3.5 w-3.5" />
                    8
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Analista de Marketing</p>
                  <p className="text-xs text-muted-foreground">
                    Belo Horizonte, MG • Presencial
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Eye className="mr-1 h-3.5 w-3.5" />
                    147
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Users className="mr-1 h-3.5 w-3.5" />
                    6
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 