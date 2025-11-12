"use client"

import { useState } from "react"
import { AdminDashboardShell } from "@/components/admin-dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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
import {
  Search,
  MoreHorizontal,
  Plus,
  Briefcase,
  Users,
  Eye,
  Building2,
  AlertTriangle,
  Ban,
  CheckCircle,
} from "lucide-react"

type JobStatus = "active" | "pending" | "expired" | "blocked"

interface Job {
  id: string
  title: string
  company: {
    name: string
    logo?: string
  }
  location: string
  type: string
  status: JobStatus
  views: number
  applications: number
  postedDate: string
  expirationDate: string
}

const jobs: Job[] = [
  {
    id: "1",
    title: "Desenvolvedor Full Stack Senior",
    company: {
      name: "Tech Solutions Inc.",
      logo: "/placeholder.svg",
    },
    location: "Remoto",
    type: "Tempo Integral",
    status: "active",
    views: 245,
    applications: 12,
    postedDate: "2024-02-15",
    expirationDate: "2024-03-15",
  },
  {
    id: "2",
    title: "UX Designer",
    company: {
      name: "Design Co.",
      logo: "/placeholder.svg",
    },
    location: "São Paulo, SP",
    type: "Tempo Integral",
    status: "pending",
    views: 180,
    applications: 8,
    postedDate: "2024-02-20",
    expirationDate: "2024-03-20",
  },
  {
    id: "3",
    title: "Gerente de Projetos",
    company: {
      name: "Global Services",
      logo: "/placeholder.svg",
    },
    location: "Híbrido",
    type: "Tempo Integral",
    status: "expired",
    views: 320,
    applications: 15,
    postedDate: "2024-01-15",
    expirationDate: "2024-02-15",
  },
]

const statusStyles: Record<JobStatus, { label: string; variant: "default" | "warning" | "success" | "destructive" }> = {
  active: { label: "Ativa", variant: "success" },
  pending: { label: "Pendente", variant: "warning" },
  expired: { label: "Expirada", variant: "default" },
  blocked: { label: "Bloqueada", variant: "destructive" },
}

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState<JobStatus | "all">("all")

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || job.type === typeFilter
    const matchesStatus = statusFilter === "all" || job.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <AdminDashboardShell>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Vagas</h2>
          <p className="text-muted-foreground">Gerencie as vagas publicadas na plataforma</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Vaga
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Vagas</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobs.length}</div>
            <p className="text-xs text-muted-foreground">+3 novas esta semana</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Candidaturas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobs.reduce((acc, job) => acc + job.applications, 0)}</div>
            <p className="text-xs text-muted-foreground">+15 hoje</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobs.reduce((acc, job) => acc + job.views, 0)}</div>
            <p className="text-xs text-muted-foreground">+28% que ontem</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vagas Pendentes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobs.filter((j) => j.status === "pending").length}</div>
            <p className="text-xs text-muted-foreground">Aguardando aprovação</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Vagas</CardTitle>
          <CardDescription>Gerencie todas as vagas publicadas na plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar vagas..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Tempo Integral">Tempo Integral</SelectItem>
                <SelectItem value="Meio Período">Meio Período</SelectItem>
                <SelectItem value="Freelancer">Freelancer</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as JobStatus | "all")}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {Object.entries(statusStyles).map(([key, { label }]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium">Vaga</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Tipo</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Visualizações</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Candidaturas</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Data de Publicação</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Expira em</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Ações</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {filteredJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={job.company.logo} />
                          <AvatarFallback>{job.company.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{job.title}</div>
                          <div className="text-sm text-muted-foreground">{job.company.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-middle">{job.type}</td>
                    <td className="p-4 align-middle">
                      <Badge variant={statusStyles[job.status].variant}>{statusStyles[job.status].label}</Badge>
                    </td>
                    <td className="p-4 align-middle">{job.views}</td>
                    <td className="p-4 align-middle">{job.applications}</td>
                    <td className="p-4 align-middle">{new Date(job.postedDate).toLocaleDateString()}</td>
                    <td className="p-4 align-middle">{new Date(job.expirationDate).toLocaleDateString()}</td>
                    <td className="p-4 align-middle">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Building2 className="mr-2 h-4 w-4" />
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Aprovar vaga
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Suspender vaga
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Ban className="mr-2 h-4 w-4" />
                            Bloquear vaga
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </AdminDashboardShell>
  )
}

