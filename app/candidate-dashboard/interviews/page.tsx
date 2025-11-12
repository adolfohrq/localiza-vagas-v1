"use client"

import { useState } from "react"
import { CandidateDashboardShell } from "@/components/candidate-dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  Building2,
  Video,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  FileText,
} from "lucide-react"

// Types
type InterviewStatus = "scheduled" | "in-progress" | "completed" | "cancelled"
type InterviewType = "online" | "in-person"

interface Interview {
  id: string
  company: string
  position: string
  date: string
  type: InterviewType
  status: InterviewStatus
  interviewer?: string
  platform?: string
  meetingLink?: string
  location?: string
  notes?: string
  feedback?: string
  preparationMaterials?: string[]
  companyLogo: string
}

// Mock data
const interviews: Interview[] = [
  {
    id: "1",
    company: "TechCorp",
    position: "Desenvolvedor Full Stack Senior",
    date: "2024-02-26T14:00:00",
    type: "online",
    status: "scheduled",
    interviewer: "Ana Silva",
    platform: "Google Meet",
    meetingLink: "https://meet.google.com/xxx-yyyy-zzz",
    preparationMaterials: [
      "Revisão de algoritmos e estruturas de dados",
      "Preparar apresentação de projetos anteriores",
      "Revisar arquitetura de microsserviços",
    ],
    companyLogo: "/placeholder.svg",
  },
  {
    id: "2",
    company: "InnovaSoft",
    position: "Tech Lead",
    date: "2024-02-28T10:00:00",
    type: "in-person",
    status: "scheduled",
    interviewer: "Carlos Santos",
    location: "Av. Paulista, 1000 - São Paulo, SP",
    notes: "Trazer portfólio impresso e documentos pessoais",
    preparationMaterials: ["Preparar cases de liderança técnica", "Revisar metodologias ágeis"],
    companyLogo: "/placeholder.svg",
  },
  {
    id: "3",
    company: "DataDriven",
    position: "Desenvolvedor Frontend Senior",
    date: "2024-02-15T15:00:00",
    type: "online",
    status: "completed",
    interviewer: "Marina Oliveira",
    platform: "Microsoft Teams",
    feedback: "Ótima discussão sobre arquitetura frontend e experiência com React. Próxima etapa: teste técnico.",
    companyLogo: "/placeholder.svg",
  },
  {
    id: "4",
    company: "CloudTech",
    position: "Arquiteto de Software",
    date: "2024-02-10T11:00:00",
    type: "online",
    status: "cancelled",
    platform: "Zoom",
    notes: "Entrevista remarcada para a próxima semana",
    companyLogo: "/placeholder.svg",
  },
]

const statusStyles: Record<
  InterviewStatus,
  { label: string; variant: "default" | "secondary" | "success" | "destructive" }
> = {
  scheduled: { label: "Agendada", variant: "default" },
  "in-progress": { label: "Realizada", variant: "secondary" },
  completed: { label: "Concluída", variant: "success" },
  cancelled: { label: "Cancelada", variant: "destructive" },
}

export default function InterviewsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredInterviews = interviews.filter(
    (interview) =>
      interview.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.position.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <CandidateDashboardShell>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Entrevistas</h2>
          <p className="text-muted-foreground">Gerencie suas entrevistas agendadas e histórico</p>
        </div>
      </div>

      <div className="space-y-4">
        {filteredInterviews.filter(
          (interview) => new Date(interview.date) > new Date() && interview.status === "scheduled",
        ).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Próxima Entrevista</CardTitle>
              <CardDescription>Prepare-se para sua próxima entrevista</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 flex-shrink-0">
                    <img
                      src={
                        filteredInterviews.filter(
                          (interview) => new Date(interview.date) > new Date() && interview.status === "scheduled",
                        )[0].companyLogo || "/placeholder.svg"
                      }
                      alt={
                        filteredInterviews.filter(
                          (interview) => new Date(interview.date) > new Date() && interview.status === "scheduled",
                        )[0].company
                      }
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {
                        filteredInterviews.filter(
                          (interview) => new Date(interview.date) > new Date() && interview.status === "scheduled",
                        )[0].position
                      }
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {
                        filteredInterviews.filter(
                          (interview) => new Date(interview.date) > new Date() && interview.status === "scheduled",
                        )[0].company
                      }
                    </p>
                  </div>
                  <Badge variant="default">
                    {format(
                      parseISO(
                        filteredInterviews.filter(
                          (interview) => new Date(interview.date) > new Date() && interview.status === "scheduled",
                        )[0].date,
                      ),
                      "dd 'de' MMMM",
                      { locale: ptBR },
                    )}
                  </Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {format(
                          parseISO(
                            filteredInterviews.filter(
                              (interview) => new Date(interview.date) > new Date() && interview.status === "scheduled",
                            )[0].date,
                          ),
                          "dd 'de' MMMM 'de' yyyy",
                          {
                            locale: ptBR,
                          },
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {format(
                          parseISO(
                            filteredInterviews.filter(
                              (interview) => new Date(interview.date) > new Date() && interview.status === "scheduled",
                            )[0].date,
                          ),
                          "HH:mm",
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {filteredInterviews.filter(
                        (interview) => new Date(interview.date) > new Date() && interview.status === "scheduled",
                      )[0].type === "online" ? (
                        <>
                          <Video className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {
                              filteredInterviews.filter(
                                (interview) =>
                                  new Date(interview.date) > new Date() && interview.status === "scheduled",
                              )[0].platform
                            }
                          </span>
                        </>
                      ) : (
                        <>
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {
                              filteredInterviews.filter(
                                (interview) =>
                                  new Date(interview.date) > new Date() && interview.status === "scheduled",
                              )[0].location
                            }
                          </span>
                        </>
                      )}
                    </div>
                    {filteredInterviews.filter(
                      (interview) => new Date(interview.date) > new Date() && interview.status === "scheduled",
                    )[0].interviewer && (
                      <div className="flex items-center gap-2 text-sm">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span>
                          Entrevistador:{" "}
                          {
                            filteredInterviews.filter(
                              (interview) => new Date(interview.date) > new Date() && interview.status === "scheduled",
                            )[0].interviewer
                          }
                        </span>
                      </div>
                    )}
                  </div>

                  {filteredInterviews.filter(
                    (interview) => new Date(interview.date) > new Date() && interview.status === "scheduled",
                  )[0].preparationMaterials && (
                    <div className="space-y-2">
                      <h4 className="font-medium">Material de Preparação</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {filteredInterviews
                          .filter(
                            (interview) => new Date(interview.date) > new Date() && interview.status === "scheduled",
                          )[0]
                          .preparationMaterials.map((material, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                              {material}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  {filteredInterviews.filter(
                    (interview) => new Date(interview.date) > new Date() && interview.status === "scheduled",
                  )[0].type === "online" &&
                    filteredInterviews.filter(
                      (interview) => new Date(interview.date) > new Date() && interview.status === "scheduled",
                    )[0].meetingLink && (
                      <Button asChild>
                        <a
                          href={
                            filteredInterviews.filter(
                              (interview) => new Date(interview.date) > new Date() && interview.status === "scheduled",
                            )[0].meetingLink
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Entrar na Reunião
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Preparação para Entrevista
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar entrevistas..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="scheduled">Agendadas</TabsTrigger>
            <TabsTrigger value="in-progress">Realizadas</TabsTrigger>
            <TabsTrigger value="completed">Concluídas</TabsTrigger>
            <TabsTrigger value="cancelled">Canceladas</TabsTrigger>
          </TabsList>

          {["all", "scheduled", "in-progress", "completed", "cancelled"].map((status) => (
            <TabsContent key={status} value={status} className="space-y-4">
              {filteredInterviews
                .filter(
                  (interview) =>
                    status === "all" ||
                    (status === "scheduled" && interview.status === "scheduled") ||
                    (status === "in-progress" && interview.status === "in-progress") ||
                    (status === "completed" && interview.status === "completed") ||
                    (status === "cancelled" && interview.status === "cancelled"),
                )
                .map((interview) => (
                  <InterviewCard key={interview.id} interview={interview} />
                ))}
              {filteredInterviews.filter((interview) => status === "all" || interview.status === status).length ===
                0 && (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                    <AlertCircle className="h-8 w-8 text-muted-foreground" />
                    <h3 className="mt-4 font-medium">
                      Nenhuma entrevista {status === "all" ? "encontrada" : `${status}`}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {status === "all"
                        ? "Não há entrevistas para exibir no momento."
                        : `Você não tem entrevistas ${status} no momento.`}
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </CandidateDashboardShell>
  )
}

function InterviewCard({ interview }: { interview: Interview }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex gap-4">
            <div className="h-12 w-12 flex-shrink-0">
              <img
                src={interview.companyLogo || "/placeholder.svg"}
                alt={interview.company}
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold">{interview.position}</h3>
              <p className="text-sm text-muted-foreground">{interview.company}</p>
              <div className="mt-2 flex flex-col gap-1 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {format(parseISO(interview.date), "dd 'de' MMMM 'de' yyyy", {
                      locale: ptBR,
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{format(parseISO(interview.date), "HH:mm")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{format(parseISO(interview.date), "HH:mm")}</span>
                </div>
                <div className="flex items-center gap-2">
                  {interview.type === "online" ? (
                    <>
                      <Video className="h-4 w-4 text-muted-foreground" />
                      <span>{interview.platform}</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{interview.location}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <Badge variant={statusStyles[interview.status].variant}>{statusStyles[interview.status].label}</Badge>
            {interview.feedback && (
              <p className="text-sm text-muted-foreground max-w-[300px] text-right">{interview.feedback}</p>
            )}
            {interview.status === "scheduled" && interview.type === "online" && interview.meetingLink && (
              <Button asChild size="sm">
                <a href={interview.meetingLink} target="_blank" rel="noopener noreferrer">
                  Entrar na Reunião
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

