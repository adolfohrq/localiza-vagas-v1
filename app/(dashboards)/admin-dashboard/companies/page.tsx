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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Plus, Mail, Building2, Users, CheckCircle, AlertTriangle, Ban } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type CompanyStatus = "active" | "pending" | "suspended" | "blocked"

interface Company {
  id: string
  name: string
  email: string
  industry: string
  status: CompanyStatus
  activeJobs: number
  totalHires: number
  joinDate: string
  logo?: string
  plan: string
  jobPackages: number
}

const companies: Company[] = [
  {
    id: "1",
    name: "Tech Solutions Inc.",
    email: "contato@techsolutions.com",
    industry: "Tecnologia",
    status: "active",
    activeJobs: 12,
    totalHires: 45,
    joinDate: "2024-01-15",
    logo: "/placeholder.svg",
    plan: "Premium",
    jobPackages: 50,
  },
  {
    id: "2",
    name: "Inovação Digital",
    email: "rh@inovacaodigital.com",
    industry: "Software",
    status: "pending",
    activeJobs: 5,
    totalHires: 8,
    joinDate: "2024-02-01",
    logo: "/placeholder.svg",
    plan: "Basic",
    jobPackages: 10,
  },
  {
    id: "3",
    name: "Global Services",
    email: "contato@globalservices.com",
    industry: "Consultoria",
    status: "active",
    activeJobs: 20,
    totalHires: 150,
    joinDate: "2023-12-10",
    logo: "/placeholder.svg",
    plan: "Free",
    jobPackages: 0,
  },
]

const statusStyles: Record<
  CompanyStatus,
  { label: string; variant: "default" | "warning" | "success" | "destructive" }
> = {
  active: { label: "Ativa", variant: "success" },
  pending: { label: "Pendente", variant: "warning" },
  suspended: { label: "Suspensa", variant: "warning" },
  blocked: { label: "Bloqueada", variant: "destructive" },
}

const planStyles: Record<string, string> = {
  Free: "bg-[#f4f7fa] text-gray-700",
  Basic: "bg-blue-100 text-blue-800",
  Premium: "bg-purple-100 text-purple-800",
  Enterprise: "bg-green-100 text-green-800",
}

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState<CompanyStatus | "all">("all")
  const [isAddingCompany, setIsAddingCompany] = useState(false)
  const [newCompany, setNewCompany] = useState({
    name: "",
    email: "",
    industry: "",
    description: "",
    website: "",
    address: "",
    phone: "",
  })

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesIndustry = industryFilter === "all" || company.industry === industryFilter
    const matchesStatus = statusFilter === "all" || company.status === statusFilter
    return matchesSearch && matchesIndustry && matchesStatus
  })

  const handleAddCompany = () => {
    // Here you would typically save the new company to your backend
    console.log("Adding company:", newCompany)
    setIsAddingCompany(false)
    setNewCompany({
      name: "",
      email: "",
      industry: "",
      description: "",
      website: "",
      address: "",
      phone: "",
    })
  }

  return (
    <AdminDashboardShell>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Empresas</h2>
          <p className="text-muted-foreground">Gerencie as empresas cadastradas na plataforma</p>
        </div>
        <Dialog open={isAddingCompany} onOpenChange={setIsAddingCompany}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Empresa
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Empresa</DialogTitle>
              <DialogDescription>Preencha os dados da empresa para cadastrá-la na plataforma.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da Empresa</Label>
                  <Input
                    id="name"
                    value={newCompany.name}
                    onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                    placeholder="Tech Solutions Inc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newCompany.email}
                    onChange={(e) => setNewCompany({ ...newCompany, email: e.target.value })}
                    placeholder="contato@empresa.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Indústria</Label>
                  <Select
                    value={newCompany.industry}
                    onValueChange={(value) => setNewCompany({ ...newCompany, industry: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a indústria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tecnologia">Tecnologia</SelectItem>
                      <SelectItem value="software">Software</SelectItem>
                      <SelectItem value="consultoria">Consultoria</SelectItem>
                      <SelectItem value="varejo">Varejo</SelectItem>
                      <SelectItem value="saude">Saúde</SelectItem>
                      <SelectItem value="educacao">Educação</SelectItem>
                      <SelectItem value="financas">Finanças</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={newCompany.website}
                    onChange={(e) => setNewCompany({ ...newCompany, website: e.target.value })}
                    placeholder="https://www.empresa.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={newCompany.description}
                  onChange={(e) => setNewCompany({ ...newCompany, description: e.target.value })}
                  placeholder="Descreva a empresa em algumas palavras..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={newCompany.phone}
                    onChange={(e) => setNewCompany({ ...newCompany, phone: e.target.value })}
                    placeholder="(00) 0000-0000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    value={newCompany.address}
                    onChange={(e) => setNewCompany({ ...newCompany, address: e.target.value })}
                    placeholder="Rua, número, cidade - Estado"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingCompany(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddCompany}>Adicionar Empresa</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Empresas</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{companies.length}</div>
            <p className="text-xs text-muted-foreground">+2 novas esta semana</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vagas Ativas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{companies.reduce((acc, company) => acc + company.activeJobs, 0)}</div>
            <p className="text-xs text-muted-foreground">+5 novas vagas hoje</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Contratações</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{companies.reduce((acc, company) => acc + company.totalHires, 0)}</div>
            <p className="text-xs text-muted-foreground">+12 este mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Empresas Pendentes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{companies.filter((c) => c.status === "pending").length}</div>
            <p className="text-xs text-muted-foreground">Aguardando aprovação</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Empresas</CardTitle>
          <CardDescription>Gerencie todas as empresas cadastradas na plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar empresas..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Indústria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                <SelectItem value="Software">Software</SelectItem>
                <SelectItem value="Consultoria">Consultoria</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as CompanyStatus | "all")}>
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
                  <th className="h-12 px-4 text-left align-middle font-medium">Empresa</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Indústria</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Plano</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Pacotes de Vagas</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Vagas Ativas</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Total Contratações</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Ações</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {filteredCompanies.map((company) => (
                  <tr
                    key={company.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={company.logo} />
                          <AvatarFallback>{company.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{company.name}</div>
                          <div className="text-sm text-muted-foreground">{company.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-middle">{company.industry}</td>
                    <td className="p-4 align-middle">
                      <Badge className={planStyles[company.plan]}>{company.plan}</Badge>
                    </td>
                    <td className="p-4 align-middle">{company.jobPackages}</td>
                    <td className="p-4 align-middle">{company.activeJobs}</td>
                    <td className="p-4 align-middle">{company.totalHires}</td>
                    <td className="p-4 align-middle">
                      <Badge variant={statusStyles[company.status].variant}>{statusStyles[company.status].label}</Badge>
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
                          <DropdownMenuItem>
                            <Building2 className="mr-2 h-4 w-4" />
                            Ver perfil
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Enviar email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Aprovar empresa
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Suspender empresa
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Ban className="mr-2 h-4 w-4" />
                            Bloquear empresa
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

