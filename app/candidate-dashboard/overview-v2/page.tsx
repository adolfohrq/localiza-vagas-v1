"use client"

import { CandidateDashboardShell } from "@/components/candidate-dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Briefcase,
  Eye,
  Calendar,
  Trophy,
  ArrowUpRight,
  MapPin,
  Clock,
  Star,
  Medal,
  Award,
  Target,
  Flame,
  Crown,
} from "lucide-react"

const upcomingInterviews = [
  {
    id: 1,
    company: "TechCorp",
    position: "Senior Frontend Developer",
    date: "26 Fev 2024",
    time: "14:00",
    type: "Remoto",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    company: "InnovaSoft",
    position: "Tech Lead",
    date: "28 Fev 2024",
    time: "10:30",
    type: "Presencial",
    logo: "/placeholder.svg?height=40&width=40",
  },
]

const recommendedJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "WebTech Solutions",
    location: "São Paulo, SP",
    match: 95,
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    title: "React Developer",
    company: "Digital Innovations",
    location: "Remoto",
    match: 90,
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    title: "Full Stack Engineer",
    company: "Tech Giants",
    location: "Rio de Janeiro, RJ",
    match: 85,
    logo: "/placeholder.svg?height=40&width=40",
  },
]

const achievements = [
  { id: 1, name: "Perfil Estrela", icon: Star, color: "text-yellow-500", earned: true },
  { id: 2, name: "Candidato Premium", icon: Crown, color: "text-purple-500", earned: true },
  { id: 3, name: "Networking Pro", icon: Medal, color: "text-blue-500", earned: true },
  { id: 4, name: "Especialista", icon: Award, color: "text-green-500", earned: true },
  { id: 5, name: "Meta Alcançada", icon: Target, color: "text-red-500", earned: false },
  { id: 6, name: "Em Destaque", icon: Flame, color: "text-orange-500", earned: false },
]

export default function CandidateOverviewV2Page() {
  return (
    <CandidateDashboardShell>
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vagas Aplicadas</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">↑ 12%</span> desde o último mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visualizações do Perfil</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">↑ 24%</span> desde o último mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entrevistas Agendadas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">2 entrevistas esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conquistas</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">4 novas conquistas</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
        {/* Upcoming Interviews */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Próximas Entrevistas</CardTitle>
            <CardDescription>Suas entrevistas agendadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingInterviews.map((interview) => (
                <div key={interview.id} className="flex items-start space-x-4 rounded-lg border p-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={interview.logo} alt={interview.company} />
                    <AvatarFallback>{interview.company[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">{interview.position}</p>
                    <p className="text-sm text-muted-foreground">{interview.company}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      {interview.date} às {interview.time}
                    </div>
                    <Badge variant="secondary">{interview.type}</Badge>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Ver Todas as Entrevistas
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Jobs */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Vagas Recomendadas</CardTitle>
            <CardDescription>Baseado no seu perfil</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendedJobs.map((job) => (
                <div key={job.id} className="flex items-start space-x-4 rounded-lg border p-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={job.logo} alt={job.company} />
                    <AvatarFallback>{job.company[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">{job.title}</p>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-1 h-4 w-4" />
                      {job.location}
                    </div>
                    <Badge variant="secondary" className="bg-green-50 text-green-700">
                      {job.match}% match
                    </Badge>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Ver Todas as Vagas
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Achievement Progress */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Progresso das Conquistas</CardTitle>
            <CardDescription>Suas conquistas e selos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {achievements.map((achievement) => {
                const Icon = achievement.icon
                return (
                  <div
                    key={achievement.id}
                    className={`flex flex-col items-center justify-center rounded-lg border p-3 ${
                      achievement.earned ? "bg-gray-50" : "opacity-50"
                    }`}
                  >
                    <Icon className={`h-8 w-8 mb-2 ${achievement.color}`} />
                    <span className="text-xs text-center font-medium">{achievement.name}</span>
                  </div>
                )
              })}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Ver Todas as Conquistas
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </CandidateDashboardShell>
  )
}

