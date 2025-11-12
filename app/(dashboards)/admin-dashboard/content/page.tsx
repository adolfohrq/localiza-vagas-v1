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
import { Search, MoreHorizontal, Plus, FileText, Eye, Clock, Edit, Trash2 } from "lucide-react"

type ContentStatus = "published" | "draft" | "review"

interface ContentItem {
  id: string
  title: string
  type: "blog" | "page" | "faq"
  status: ContentStatus
  author: {
    name: string
    avatar?: string
  }
  views: number
  lastModified: string
  publishDate?: string
}

const content: ContentItem[] = [
  {
    id: "1",
    title: "Como se preparar para uma entrevista de emprego",
    type: "blog",
    status: "published",
    author: {
      name: "Ana Silva",
      avatar: "/placeholder.svg",
    },
    views: 1245,
    lastModified: "2024-02-20",
    publishDate: "2024-02-21",
  },
  {
    id: "2",
    title: "Termos de Uso",
    type: "page",
    status: "published",
    author: {
      name: "Admin",
      avatar: "/placeholder.svg",
    },
    views: 3500,
    lastModified: "2024-01-15",
    publishDate: "2024-01-16",
  },
  {
    id: "3",
    title: "Dicas para criar um currículo efetivo",
    type: "blog",
    status: "draft",
    author: {
      name: "Carlos Santos",
      avatar: "/placeholder.svg",
    },
    views: 0,
    lastModified: "2024-02-22",
  },
]

const statusStyles: Record<ContentStatus, { label: string; variant: "default" | "secondary" | "warning" }> = {
  published: { label: "Publicado", variant: "default" },
  draft: { label: "Rascunho", variant: "secondary" },
  review: { label: "Em Revisão", variant: "warning" },
}

export default function ContentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState<ContentStatus | "all">("all")

  const filteredContent = content.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || item.type === typeFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <AdminDashboardShell>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Conteúdo</h2>
          <p className="text-muted-foreground">Gerencie o conteúdo do site</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Post
          </Button>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Nova Página
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{content.filter((c) => c.type === "blog").length}</div>
            <p className="text-xs text-muted-foreground">+2 novos esta semana</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Páginas</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{content.filter((c) => c.type === "page").length}</div>
            <p className="text-xs text-muted-foreground">Última atualização há 2 dias</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{content.reduce((acc, c) => acc + c.views, 0)}</div>
            <p className="text-xs text-muted-foreground">+12% que o mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rascunhos</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{content.filter((c) => c.status === "draft").length}</div>
            <p className="text-xs text-muted-foreground">Aguardando publicação</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Conteúdo</CardTitle>
          <CardDescription>Gerencie todo o conteúdo do site</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar conteúdo..."
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
                <SelectItem value="blog">Blog</SelectItem>
                <SelectItem value="page">Páginas</SelectItem>
                <SelectItem value="faq">FAQ</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ContentStatus | "all")}>
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
                  <th className="h-12 px-4 text-left align-middle font-medium">Título</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Tipo</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Autor</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Visualizações</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Última Modificação</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Ações</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {filteredContent.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle font-medium">{item.title}</td>
                    <td className="p-4 align-middle">
                      <Badge variant="secondary">
                        {item.type === "blog" ? "Blog" : item.type === "page" ? "Página" : "FAQ"}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle">
                      <Badge variant={statusStyles[item.status].variant}>{statusStyles[item.status].label}</Badge>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={item.author.avatar} />
                          <AvatarFallback>{item.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <span>{item.author.name}</span>
                      </div>
                    </td>
                    <td className="p-4 align-middle">{item.views}</td>
                    <td className="p-4 align-middle">{new Date(item.lastModified).toLocaleDateString()}</td>
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
                            <Eye className="mr-2 h-4 w-4" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
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

