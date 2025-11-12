import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Download, MoreHorizontal, Mail, Calendar, Star, XCircle } from "lucide-react"

// Mock data for the job and its candidates
function getJobData(id: string) {
  return {
    id,
    title: "Desenvolvedor Full Stack",
    department: "Tecnologia",
    type: "Tempo Integral",
    location: "Remoto",
    candidates: [
      {
        id: "1",
        name: "João Silva",
        title: "Desenvolvedor Full Stack Senior",
        email: "joao.silva@example.com",
        status: "shortlisted",
        appliedDate: "2024-02-20",
        avatar: "/placeholder.svg",
        rating: 4.5,
        experience: "8 anos",
        skills: ["React", "Node.js", "TypeScript", "AWS"],
        matchScore: 95,
      },
      {
        id: "2",
        name: "Maria Santos",
        title: "Desenvolvedora Full Stack Pleno",
        email: "maria.santos@example.com",
        status: "reviewing",
        appliedDate: "2024-02-19",
        avatar: "/placeholder.svg",
        rating: 4.0,
        experience: "5 anos",
        skills: ["React", "Node.js", "MongoDB"],
        matchScore: 85,
      },
      {
        id: "3",
        name: "Pedro Costa",
        title: "Desenvolvedor Full Stack Pleno",
        email: "pedro.costa@example.com",
        status: "new",
        appliedDate: "2024-02-18",
        avatar: "/placeholder.svg",
        rating: 3.5,
        experience: "4 anos",
        skills: ["React", "Express", "PostgreSQL"],
        matchScore: 75,
      },
    ],
  }
}

const statusStyles = {
  new: { label: "Novo", variant: "default" },
  reviewing: { label: "Em Análise", variant: "secondary" },
  shortlisted: { label: "Pré-selecionado", variant: "success" },
  rejected: { label: "Rejeitado", variant: "destructive" },
}

export default function JobCandidatesPage({ params }: { params: { id: string } }) {
  const job = getJobData(params.id)

  return (
    <DashboardShell>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Candidatos</h2>
          <p className="text-muted-foreground">Gerencie os candidatos para a vaga de {job.title}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button>Enviar Mensagem em Massa</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Refine sua busca usando os filtros abaixo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar candidatos..." className="pl-8" />
              </div>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="new">Novos</SelectItem>
                <SelectItem value="reviewing">Em análise</SelectItem>
                <SelectItem value="shortlisted">Pré-selecionados</SelectItem>
                <SelectItem value="rejected">Rejeitados</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="match">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="match">Melhor match</SelectItem>
                <SelectItem value="recent">Mais recentes</SelectItem>
                <SelectItem value="experience">Mais experientes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Candidatos</CardTitle>
          <CardDescription>{job.candidates.length} candidatos encontrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {job.candidates.map((candidate) => (
              <div key={candidate.id} className="flex items-center justify-between space-x-4 rounded-lg border p-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={candidate.avatar} />
                    <AvatarFallback>{candidate.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="font-medium">{candidate.name}</h3>
                    <p className="text-sm text-muted-foreground">{candidate.title}</p>
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-50 text-primary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-sm text-right">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Candidatura: {new Date(candidate.appliedDate).toLocaleDateString("pt-BR")}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span>{candidate.matchScore}% de match</span>
                    </div>
                  </div>

                  <Badge
                    variant={
                      statusStyles[candidate.status as keyof typeof statusStyles].variant as
                        | "default"
                        | "secondary"
                        | "success"
                        | "destructive"
                    }
                  >
                    {statusStyles[candidate.status as keyof typeof statusStyles].label}
                  </Badge>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        Enviar mensagem
                      </DropdownMenuItem>
                      <DropdownMenuItem>Ver perfil completo</DropdownMenuItem>
                      <DropdownMenuItem>Baixar currículo</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Star className="mr-2 h-4 w-4" />
                        Pré-selecionar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <XCircle className="mr-2 h-4 w-4" />
                        Rejeitar candidatura
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}

