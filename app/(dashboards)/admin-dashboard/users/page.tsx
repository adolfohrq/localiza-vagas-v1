"use client"

import { useState } from "react"
import { AdminDashboardShell } from "@/components/admin-dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Plus, Mail, Ban, CheckCircle, AlertTriangle } from "lucide-react"

type UserStatus = "active" | "pending" | "suspended" | "blocked"

interface User {
  id: string
  name: string
  email: string
  type: "candidate" | "company" | "admin"
  status: UserStatus
  joinDate: string
  lastActive: string
  avatar?: string
}

const users: User[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@example.com",
    type: "candidate",
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "2024-02-25",
    avatar: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Tech Solutions",
    email: "contato@techsolutions.com",
    type: "company",
    status: "active",
    joinDate: "2024-01-10",
    lastActive: "2024-02-24",
    avatar: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Maria Santos",
    email: "maria.santos@example.com",
    type: "candidate",
    status: "pending",
    joinDate: "2024-02-20",
    lastActive: "2024-02-20",
    avatar: "/placeholder.svg",
  },
  {
    id: "4",
    name: "Admin User",
    email: "admin@localizavagas.com",
    type: "admin",
    status: "active",
    joinDate: "2023-12-01",
    lastActive: "2024-02-25",
    avatar: "/placeholder.svg",
  },
]

const statusStyles: Record<UserStatus, { label: string; variant: "default" | "warning" | "success" | "destructive" }> =
  {
    active: { label: "Ativo", variant: "success" },
    pending: { label: "Pendente", variant: "warning" },
    suspended: { label: "Suspenso", variant: "warning" },
    blocked: { label: "Bloqueado", variant: "destructive" },
  }

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [userTypeFilter, setUserTypeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = userTypeFilter === "all" || user.type === userTypeFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <AdminDashboardShell>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Usuários</h2>
          <p className="text-muted-foreground">Gerencie os usuários da plataforma</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Usuário
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Refine sua busca de usuários</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar usuários..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Tipo de usuário" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="candidate">Candidatos</SelectItem>
                <SelectItem value="company">Empresas</SelectItem>
                <SelectItem value="admin">Administradores</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="suspended">Suspensos</SelectItem>
                <SelectItem value="blocked">Bloqueados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="candidates">Candidatos</TabsTrigger>
          <TabsTrigger value="companies">Empresas</TabsTrigger>
          <TabsTrigger value="admins">Administradores</TabsTrigger>
        </TabsList>

        {["all", "candidates", "companies", "admins"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">Usuário</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Tipo</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Data de Cadastro</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Último Acesso</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {filteredUsers
                        .filter((user) => tab === "all" || user.type === tab.slice(0, -1))
                        .map((user) => (
                          <tr
                            key={user.id}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                  <AvatarImage src={user.avatar} />
                                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{user.name}</div>
                                  <div className="text-sm text-muted-foreground">{user.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <Badge variant="secondary">
                                {user.type === "candidate"
                                  ? "Candidato"
                                  : user.type === "company"
                                    ? "Empresa"
                                    : "Admin"}
                              </Badge>
                            </td>
                            <td className="p-4 align-middle">
                              <Badge variant={statusStyles[user.status].variant}>
                                {statusStyles[user.status].label}
                              </Badge>
                            </td>
                            <td className="p-4 align-middle">{new Date(user.joinDate).toLocaleDateString()}</td>
                            <td className="p-4 align-middle">{new Date(user.lastActive).toLocaleDateString()}</td>
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
                                    <Mail className="mr-2 h-4 w-4" />
                                    Enviar email
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Aprovar usuário
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <AlertTriangle className="mr-2 h-4 w-4" />
                                    Suspender usuário
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    <Ban className="mr-2 h-4 w-4" />
                                    Bloquear usuário
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
          </TabsContent>
        ))}
      </Tabs>
    </AdminDashboardShell>
  )
}

