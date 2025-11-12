"use client"

import { useState } from "react"
import { AdminDashboardShell } from "@/components/admin-dashboard-shell"
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
import { Search, MoreHorizontal, MessageSquare, Clock, CheckCircle2, AlertTriangle } from "lucide-react"

type TicketStatus = "open" | "in_progress" | "resolved" | "closed"
type TicketPriority = "low" | "medium" | "high" | "urgent"

interface Ticket {
  id: string
  subject: string
  status: TicketStatus
  priority: TicketPriority
  user: {
    name: string
    email: string
    avatar?: string
  }
  category: string
  createdAt: string
  lastUpdate: string
  messages: number
}

const tickets: Ticket[] = [
  {
    id: "1",
    subject: "Problema com candidatura",
    status: "open",
    priority: "high",
    user: {
      name: "João Silva",
      email: "joao.silva@example.com",
      avatar: "/placeholder.svg",
    },
    category: "Candidaturas",
    createdAt: "2024-02-24T10:00:00",
    lastUpdate: "2024-02-24T10:00:00",
    messages: 1,
  },
  {
    id: "2",
    subject: "Dúvida sobre pagamento",
    status: "in_progress",
    priority: "medium",
    user: {
      name: "Maria Santos",
      email: "maria.santos@example.com",
      avatar: "/placeholder.svg",
    },
    category: "Pagamentos",
    createdAt: "2024-02-23T15:30:00",
    lastUpdate: "2024-02-24T09:15:00",
    messages: 3,
  },
  {
    id: "3",
    subject: "Erro ao publicar vaga",
    status: "resolved",
    priority: "urgent",
    user: {
      name: "Tech Solutions",
      email: "suporte@techsolutions.com",
      avatar: "/placeholder.svg",
    },
    category: "Vagas",
    createdAt: "2024-02-22T08:45:00",
    lastUpdate: "2024-02-24T11:30:00",
    messages: 5,
  },
]

const statusStyles: Record<
  TicketStatus,
  { label: string; variant: "default" | "secondary" | "success" | "destructive" }
> = {
  open: { label: "Aberto", variant: "default" },
  in_progress: { label: "Em Andamento", variant: "secondary" },
  resolved: { label: "Resolvido", variant: "success" },
  closed: { label: "Fechado", variant: "destructive" },
}

const priorityStyles: Record<
  TicketPriority,
  { label: string; variant: "default" | "secondary" | "warning" | "destructive" }
> = {
  low: { label: "Baixa", variant: "secondary" },
  medium: { label: "Média", variant: "default" },
  high: { label: "Alta", variant: "warning" },
  urgent: { label: "Urgente", variant: "destructive" },
}

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<TicketStatus | "all">("all")
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority | "all">("all")

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <AdminDashboardShell>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Suporte</h2>
          <p className="text-muted-foreground">Gerencie os tickets de suporte</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Tickets</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tickets.length}</div>
            <p className="text-xs text-muted-foreground">+2 novos hoje</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Aberto</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tickets.filter((t) => t.status === "open").length}</div>
            <p className="text-xs text-muted-foreground">Necessitam atenção</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tickets.filter((t) => t.status === "in_progress").length}</div>
            <p className="text-xs text-muted-foreground">Sendo atendidos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolvidos</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tickets.filter((t) => t.status === "resolved").length}</div>
            <p className="text-xs text-muted-foreground">Nos últimos 30 dias</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tickets de Suporte</CardTitle>
          <CardDescription>Gerencie todos os tickets de suporte</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar tickets..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as TicketStatus | "all")}>
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
            <Select
              value={priorityFilter}
              onValueChange={(value) => setPriorityFilter(value as TicketPriority | "all")}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {Object.entries(priorityStyles).map(([key, { label }]) => (
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
                  <th className="h-12 px-4 text-left align-middle font-medium">Assunto</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Usuário</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Categoria</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Prioridade</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Última Atualização</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Ações</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {filteredTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle">
                      <div className="flex flex-col">
                        <span className="font-medium">{ticket.subject}</span>
                        <span className="text-sm text-muted-foreground">#{ticket.id}</span>
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={ticket.user.avatar} />
                          <AvatarFallback>{ticket.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{ticket.user.name}</span>
                          <span className="text-sm text-muted-foreground">{ticket.user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <Badge variant="secondary">{ticket.category}</Badge>
                    </td>
                    <td className="p-4 align-middle">
                      <Badge variant={statusStyles[ticket.status].variant}>{statusStyles[ticket.status].label}</Badge>
                    </td>
                    <td className="p-4 align-middle">
                      <Badge variant={priorityStyles[ticket.priority].variant}>
                        {priorityStyles[ticket.priority].label}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex flex-col">
                        <span>{new Date(ticket.lastUpdate).toLocaleDateString()}</span>
                        <span className="text-sm text-muted-foreground">
                          {ticket.messages} {ticket.messages === 1 ? "mensagem" : "mensagens"}
                        </span>
                      </div>
                    </td>
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
                          <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                          <DropdownMenuItem>Responder</DropdownMenuItem>
                          <DropdownMenuItem>Atribuir</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Marcar como resolvido</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Fechar ticket</DropdownMenuItem>
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

