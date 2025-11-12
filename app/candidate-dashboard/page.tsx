"use client"

import { useState } from "react"
import { CandidateDashboardShell } from "@/components/candidate-dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Briefcase,
  GraduationCap,
  Eye,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Star,
  ChevronRight,
} from "lucide-react"

export default function CandidateDashboardPage() {
  const [jobFilter, setJobFilter] = useState("all")

  const profileSections = [
    { name: "Informações Pessoais", progress: 100 },
    { name: "Experiência Profissional", progress: 75 },
    { name: "Educação", progress: 100 },
    { name: "Habilidades", progress: 80 },
    { name: "Idiomas", progress: 100 },
    { name: "Certificações", progress: 60 },
  ]

  const overallProgress = Math.round(
    profileSections.reduce((acc, section) => acc + section.progress, 0) / profileSections.length,
  )

  const upcomingInterviews = [
    {
      company: "TechCorp",
      position: "Desenvolvedor Full Stack Senior",
      date: "2024-02-26T14:00:00",
      type: "online",
      platform: "Google Meet",
    },
    {
      company: "InnovaSoft",
      position: "Tech Lead",
      date: "2024-02-28T10:00:00",
      type: "in-person",
      location: "Av. Paulista, 1000 - São Paulo, SP",
    },
  ]

  const recommendedJobs = [
    {
      id: "1",
      title: "Desenvolvedor Full Stack Senior",
      company: "TechInnovate Solutions",
      location: "Remoto",
      salary: "R$ 15.000 - R$ 20.000",
      matchScore: 95,
      type: "full-time",
    },
    {
      id: "2",
      title: "Arquiteto de Software",
      company: "CloudTech Systems",
      location: "São Paulo, SP",
      salary: "R$ 18.000 - R$ 25.000",
      matchScore: 88,
      type: "full-time",
    },
    {
      id: "3",
      title: "Desenvolvedor Frontend Pleno",
      company: "WebDesign Pro",
      location: "Remoto",
      salary: "R$ 8.000 - R$ 12.000",
      matchScore: 82,
      type: "contract",
    },
    {
      id: "4",
      title: "Engenheiro DevOps",
      company: "AgileOps",
      location: "Híbrido - São Paulo",
      salary: "R$ 12.000 - R$ 16.000",
      matchScore: 79,
      type: "full-time",
    },
  ]

  const filteredJobs = jobFilter === "all" ? recommendedJobs : recommendedJobs.filter((job) => job.type === jobFilter)

  return (
    <CandidateDashboardShell>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Bem-vindo, João Silva</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vagas Aplicadas</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 na última semana</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cursos Concluídos</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">+1 no último mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visualizações do Perfil</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">132</div>
            <p className="text-xs text-muted-foreground">+28% em relação ao mês passado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entrevistas Agendadas</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Próxima em 2 dias</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Progresso do Perfil</CardTitle>
            <CardDescription>Complete seu perfil para aumentar suas chances</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Progresso Geral</p>
                  <Progress value={overallProgress} className="h-2 w-full" />
                </div>
                <span className="text-2xl font-bold">{overallProgress}%</span>
              </div>
              {profileSections.map((section, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium">{section.name}</p>
                    <Progress value={section.progress} className="h-2 w-full" />
                  </div>
                  <Badge variant={section.progress === 100 ? "success" : "secondary"} className="ml-2">
                    {section.progress}%
                  </Badge>
                </div>
              ))}
              <Button className="w-full mt-4">Completar Perfil</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Próximas Entrevistas</CardTitle>
            <CardDescription>Prepare-se para suas entrevistas agendadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingInterviews.map((interview, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-secondary rounded-lg">
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">{interview.position}</p>
                    <p className="text-sm text-muted-foreground">{interview.company}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      {new Date(interview.date).toLocaleDateString()}
                      <Clock className="ml-4 mr-2 h-4 w-4" />
                      {new Date(interview.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      {interview.type === "online" ? (
                        <>
                          <Eye className="mr-2 h-4 w-4" />
                          {interview.platform}
                        </>
                      ) : (
                        <>
                          <MapPin className="mr-2 h-4 w-4" />
                          {interview.location}
                        </>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Preparar
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Ver Todas as Entrevistas
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Vagas Recomendadas</CardTitle>
              <CardDescription>Baseadas no seu perfil e preferências</CardDescription>
            </div>
            <Select value={jobFilter} onValueChange={setJobFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="full-time">Tempo Integral</SelectItem>
                <SelectItem value="part-time">Meio Período</SelectItem>
                <SelectItem value="contract">Contrato</SelectItem>
                <SelectItem value="temporary">Temporário</SelectItem>
                <SelectItem value="internship">Estágio</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list" className="space-y-4">
            <TabsList>
              <TabsTrigger value="list">Lista</TabsTrigger>
              <TabsTrigger value="grid">Grade</TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="space-y-4">
              {filteredJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <div className="space-y-1">
                    <h3 className="font-semibold">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-1 h-4 w-4" />
                      {job.location}
                      <span className="mx-2">•</span>
                      <DollarSign className="mr-1 h-4 w-4" />
                      {job.salary}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-medium">{job.matchScore}% Match</div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= Math.round(job.matchScore / 20)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <Button size="sm">
                      Ver Vaga
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="grid" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job) => (
                <Card key={job.id}>
                  <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription>{job.company}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <MapPin className="mr-1 h-4 w-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-sm">
                        <DollarSign className="mr-1 h-4 w-4" />
                        {job.salary}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{job.matchScore}% Match</div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= Math.round(job.matchScore / 20)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <Button className="w-full mt-2">
                        Ver Vaga
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
          <Button variant="outline" className="w-full mt-4">
            Ver Todas as Vagas Recomendadas
          </Button>
        </CardContent>
      </Card>
    </CandidateDashboardShell>
  )
}

