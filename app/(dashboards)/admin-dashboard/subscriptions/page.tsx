"use client"

import { useState } from "react"
import { AdminDashboardShell } from "@/components/admin-dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import {
  Search,
  MoreHorizontal,
  Plus,
  Package,
  CreditCard,
  CalendarIcon,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  History,
  RefreshCw,
  Edit,
  Trash2,
} from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

type SubscriptionStatus = "active" | "expired" | "cancelled" | "pending"
type PlanType = "basic" | "pro" | "enterprise"
type PackageType = "job_posts" | "featured_posts" | "cv_access"

interface PackageOption {
  id: string
  name: string
  duration: number
  price: number
  type: "job_post" | "featured" | "cv_access"
  description?: string
}

interface ExtraOption {
  id: string
  name: string
  price: number
  description: string
  type: "highlight" | "urgent" | "top" | "social"
  duration?: number
}

const packageOptions: PackageOption[] = [
  {
    id: "1",
    name: "Anúncio Básico",
    duration: 15,
    price: 50.0,
    type: "job_post",
    description: "Publicação de vaga por 15 dias",
  },
  {
    id: "2",
    name: "Anúncio Plus",
    duration: 30,
    price: 100.0,
    type: "job_post",
    description: "Publicação de vaga por 30 dias",
  },
  {
    id: "3",
    name: "Anúncio Premium",
    duration: 60,
    price: 150.0,
    type: "job_post",
    description: "Publicação de vaga por 60 dias",
  },
  {
    id: "4",
    name: "Anúncio Enterprise",
    duration: 90,
    price: 180.0,
    type: "job_post",
    description: "Publicação de vaga por 90 dias",
  },
  {
    id: "5",
    name: "Pacote de Currículos",
    duration: 30,
    price: 299.0,
    type: "cv_access",
    description: "Acesso a 100 currículos por 30 dias",
  },
  {
    id: "6",
    name: "Vagas em Destaque",
    duration: 30,
    price: 199.0,
    type: "featured",
    description: "5 vagas em destaque por 30 dias",
  },
]

const extraOptions: ExtraOption[] = [
  {
    id: "1",
    name: "Destaque na Home",
    price: 99.0,
    type: "highlight",
    description: "Sua vaga em destaque na página inicial",
    duration: 7,
  },
  {
    id: "2",
    name: "Marcação Urgente",
    price: 49.0,
    type: "urgent",
    description: "Adicione um selo de urgente à sua vaga",
  },
  {
    id: "3",
    name: "Vaga no Topo",
    price: 79.0,
    type: "top",
    description: "Mantenha sua vaga no topo dos resultados",
    duration: 7,
  },
  {
    id: "4",
    name: "Divulgação nas Redes Sociais",
    price: 149.0,
    type: "social",
    description: "Divulgação da sua vaga em nossas redes sociais",
  },
]

interface PlanFeature {
  id: string
  name: string
  included: boolean
}

interface Plan {
  id: string
  name: string
  type: PlanType
  price: number
  billingCycle: "monthly" | "annually"
  jobPostings: number
  featuredPostings: number
  cvAccess: number
  features: PlanFeature[]
}

const plans: Plan[] = [
  {
    id: "1",
    name: "Plano Básico",
    type: "basic",
    price: 99.99,
    billingCycle: "monthly",
    jobPostings: 5,
    featuredPostings: 1,
    cvAccess: 50,
    features: [
      { id: "1", name: "Postagem de vagas", included: true },
      { id: "2", name: "Destaque na busca", included: false },
      { id: "3", name: "Acesso ao banco de currículos", included: true },
      { id: "4", name: "Suporte prioritário", included: false },
    ],
  },
  {
    id: "2",
    name: "Plano Pro",
    type: "pro",
    price: 199.99,
    billingCycle: "monthly",
    jobPostings: 15,
    featuredPostings: 3,
    cvAccess: 200,
    features: [
      { id: "1", name: "Postagem de vagas", included: true },
      { id: "2", name: "Destaque na busca", included: true },
      { id: "3", name: "Acesso ao banco de currículos", included: true },
      { id: "4", name: "Suporte prioritário", included: true },
    ],
  },
  {
    id: "3",
    name: "Plano Enterprise",
    type: "enterprise",
    price: 499.99,
    billingCycle: "monthly",
    jobPostings: 50,
    featuredPostings: 10,
    cvAccess: 1000,
    features: [
      { id: "1", name: "Postagem de vagas", included: true },
      { id: "2", name: "Destaque na busca", included: true },
      { id: "3", name: "Acesso ao banco de currículos", included: true },
      { id: "4", name: "Suporte prioritário", included: true },
    ],
  },
]

interface Subscription {
  id: string
  company: {
    id: string
    name: string
    logo?: string
  }
  plan: {
    type: PlanType
    name: string
    price: number
  }
  status: SubscriptionStatus
  startDate: string
  endDate: string
  autoRenew: boolean
  lastPayment?: string
  packages: {
    type: PackageType
    name: string
    quantity: number
    used: number
    expiresAt: string
  }[]
}

const subscriptions: Subscription[] = [
  {
    id: "1",
    company: {
      id: "1",
      name: "Tech Solutions Inc.",
      logo: "/placeholder.svg",
    },
    plan: {
      type: "pro",
      name: "Plano Pro",
      price: 299.99,
    },
    status: "active",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    autoRenew: true,
    lastPayment: "2024-02-01",
    packages: [
      {
        type: "job_posts",
        name: "Vagas",
        quantity: 10,
        used: 4,
        expiresAt: "2024-12-31",
      },
      {
        type: "featured_posts",
        name: "Vagas em Destaque",
        quantity: 3,
        used: 1,
        expiresAt: "2024-12-31",
      },
    ],
  },
  {
    id: "2",
    company: {
      id: "2",
      name: "Digital Innovations",
      logo: "/placeholder.svg",
    },
    plan: {
      type: "basic",
      name: "Plano Básico",
      price: 99.99,
    },
    status: "active",
    startDate: "2024-02-01",
    endDate: "2024-07-31",
    autoRenew: false,
    lastPayment: "2024-02-01",
    packages: [
      {
        type: "job_posts",
        name: "Vagas",
        quantity: 5,
        used: 2,
        expiresAt: "2024-07-31",
      },
    ],
  },
  {
    id: "3",
    company: {
      id: "3",
      name: "Global Corp",
      logo: "/placeholder.svg",
    },
    plan: {
      type: "enterprise",
      name: "Plano Enterprise",
      price: 999.99,
    },
    status: "expired",
    startDate: "2023-01-01",
    endDate: "2024-01-31",
    autoRenew: true,
    lastPayment: "2024-01-01",
    packages: [
      {
        type: "job_posts",
        name: "Vagas",
        quantity: 50,
        used: 45,
        expiresAt: "2024-01-31",
      },
      {
        type: "featured_posts",
        name: "Vagas em Destaque",
        quantity: 10,
        used: 8,
        expiresAt: "2024-01-31",
      },
      {
        type: "cv_access",
        name: "Acesso ao Banco de Currículos",
        quantity: 1000,
        used: 750,
        expiresAt: "2024-01-31",
      },
    ],
  },
]

const statusStyles: Record<
  SubscriptionStatus,
  { label: string; variant: "default" | "success" | "destructive" | "warning" }
> = {
  active: { label: "Ativo", variant: "success" },
  expired: { label: "Expirado", variant: "destructive" },
  cancelled: { label: "Cancelado", variant: "destructive" },
  pending: { label: "Pendente", variant: "warning" },
}

const planStyles: Record<PlanType, { color: string }> = {
  basic: { color: "bg-blue-100 text-blue-800" },
  pro: { color: "bg-purple-100 text-purple-800" },
  enterprise: { color: "bg-green-100 text-green-800" },
}

export default function SubscriptionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<SubscriptionStatus | "all">("all")
  const [planFilter, setPlanFilter] = useState<PlanType | "all">("all")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null)

  const filteredSubscriptions = subscriptions.filter((subscription) => {
    const matchesSearch = subscription.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || subscription.status === statusFilter
    const matchesPlan = planFilter === "all" || subscription.plan.type === planFilter
    return matchesSearch && matchesStatus && matchesPlan
  })

  const totalRevenue = subscriptions
    .filter((s) => s.status === "active")
    .reduce((acc, curr) => acc + curr.plan.price, 0)

  return (
    <AdminDashboardShell>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Planos e Pacotes</h2>
          <p className="text-muted-foreground">Gerencie as assinaturas e pacotes das empresas</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Plano/Pacote
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Plano ou Pacote</DialogTitle>
              <DialogDescription>Preencha os detalhes do novo plano ou pacote para uma empresa.</DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="plan" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="plan">Plano</TabsTrigger>
                <TabsTrigger value="package">Pacote</TabsTrigger>
              </TabsList>
              <TabsContent value="plan">
                <form>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="company" className="text-right">
                        Empresa
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Selecione uma empresa" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tech-solutions">Tech Solutions Inc.</SelectItem>
                          <SelectItem value="digital-innovations">Digital Innovations</SelectItem>
                          <SelectItem value="global-corp">Global Corp</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="plan-type" className="text-right">
                        Tipo de Plano
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Selecione o tipo de plano" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Básico</SelectItem>
                          <SelectItem value="pro">Pro</SelectItem>
                          <SelectItem value="enterprise">Enterprise</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price" className="text-right">
                        Preço (R$)
                      </Label>
                      <Input id="price" type="number" className="col-span-3" placeholder="0.00" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="duration" className="text-right">
                        Duração (meses)
                      </Label>
                      <Input id="duration" type="number" className="col-span-3" placeholder="12" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="start-date" className="text-right">
                        Data de Início
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "col-span-3 justify-start text-left font-normal",
                              !selectedDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP") : <span>Escolha uma data</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="package">
                <form>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="company" className="text-right">
                        Empresa
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Selecione uma empresa" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tech-solutions">Tech Solutions Inc.</SelectItem>
                          <SelectItem value="digital-innovations">Digital Innovations</SelectItem>
                          <SelectItem value="global-corp">Global Corp</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="package-type" className="text-right">
                        Tipo de Pacote
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Selecione o tipo de pacote" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="job_posts">Vagas</SelectItem>
                          <SelectItem value="featured_posts">Vagas em Destaque</SelectItem>
                          <SelectItem value="cv_access">Acesso ao Banco de Currículos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="quantity" className="text-right">
                        Quantidade
                      </Label>
                      <Input id="quantity" type="number" className="col-span-3" placeholder="1" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="expiration" className="text-right">
                        Expiração (dias)
                      </Label>
                      <Input id="expiration" type="number" className="col-span-3" placeholder="30" />
                    </div>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button type="submit">Adicionar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assinaturas Ativas</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscriptions.filter((s) => s.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">+2 este mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+12% que o mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expirando em 30 dias</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Necessitam renovação</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Renovação</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">+5% que o mês anterior</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="subscriptions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="subscriptions">Assinaturas</TabsTrigger>
          <TabsTrigger value="packages">Pacotes Ativos</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="manage-plans">Gerenciar Planos e Pacotes</TabsTrigger>
        </TabsList>

        <TabsContent value="subscriptions">
          <Card>
            <CardHeader>
              <CardTitle>Assinaturas</CardTitle>
              <CardDescription>Gerencie as assinaturas ativas e expiradas</CardDescription>
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
                <Select
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value as SubscriptionStatus | "all")}
                >
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
                <Select value={planFilter} onValueChange={(value) => setPlanFilter(value as PlanType | "all")}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Plano" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="basic">Básico</SelectItem>
                    <SelectItem value="pro">Pro</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium">Empresa</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Plano</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Início</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Expira em</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Valor</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {filteredSubscriptions.map((subscription) => (
                      <tr
                        key={subscription.id}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={subscription.company.logo} alt={subscription.company.name} />
                              <AvatarFallback>{subscription.company.name[0]}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{subscription.company.name}</span>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <Badge className={planStyles[subscription.plan.type].color}>{subscription.plan.name}</Badge>
                        </td>
                        <td className="p-4 align-middle">
                          <Badge variant={statusStyles[subscription.status].variant}>
                            {statusStyles[subscription.status].label}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">{format(new Date(subscription.startDate), "dd/MM/yyyy")}</td>
                        <td className="p-4 align-middle">{format(new Date(subscription.endDate), "dd/MM/yyyy")}</td>
                        <td className="p-4 align-middle">R$ {subscription.plan.price.toFixed(2)}</td>
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
                                <Package className="mr-2 h-4 w-4" />
                                Adicionar Pacote
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CreditCard className="mr-2 h-4 w-4" />
                                Renovar Assinatura
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                Alterar Data de Expiração
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <History className="mr-2 h-4 w-4" />
                                Ver Histórico
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Cancelar Assinatura</DropdownMenuItem>
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

        <TabsContent value="packages">
          <Card>
            <CardHeader>
              <CardTitle>Pacotes Ativos</CardTitle>
              <CardDescription>Empresas com pacotes ativos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium">Empresa</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Pacotes Ativos</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Utilização</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Expira em</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {filteredSubscriptions.map(
                      (subscription) =>
                        subscription.packages.length > 0 && (
                          <tr
                            key={subscription.id}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={subscription.company.logo} alt={subscription.company.name} />
                                  <AvatarFallback>{subscription.company.name[0]}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{subscription.company.name}</span>
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="space-y-1">
                                {subscription.packages.map((pkg) => (
                                  <Badge key={pkg.type} variant="secondary" className="mr-1">
                                    {pkg.name}
                                  </Badge>
                                ))}
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="space-y-2">
                                {subscription.packages.map((pkg) => (
                                  <div key={pkg.type} className="flex items-center gap-2">
                                    <div className="w-24 h-2 rounded-full bg-secondary">
                                      <div
                                        className="h-full rounded-full bg-primary"
                                        style={{ width: `${(pkg.used / pkg.quantity) * 100}%` }}
                                      />
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                      {pkg.used}/{pkg.quantity}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td className="p-4 align-middle">{format(new Date(subscription.endDate), "dd/MM/yyyy")}</td>
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
                                    <Package className="mr-2 h-4 w-4" />
                                    Adicionar Pacote
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    Alterar Data de Expiração
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <History className="mr-2 h-4 w-4" />
                                    Ver Histórico
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ),
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Transações</CardTitle>
              <CardDescription>Histórico de todas as transações de planos e pacotes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Aqui você pode adicionar uma lista de transações históricas */}
                <div className="text-center text-muted-foreground">Histórico de transações em desenvolvimento</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="manage-plans">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Planos e Pacotes</CardTitle>
              <CardDescription>Visualize e gerencie planos, pacotes e extras</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="plans">
                <TabsList>
                  <TabsTrigger value="plans">Planos</TabsTrigger>
                  <TabsTrigger value="packages">Pacotes</TabsTrigger>
                  <TabsTrigger value="extras">Extras</TabsTrigger>
                </TabsList>
                <TabsContent value="plans">
                  <div className="mb-4">
                    <Button
                      onClick={() =>
                        setEditingPlan({
                          id: "",
                          name: "",
                          type: "basic",
                          price: 0,
                          billingCycle: "monthly",
                          jobPostings: 0,
                          featuredPostings: 0,
                          cvAccess: 0,
                          features: [],
                        })
                      }
                    >
                      <Plus className="mr-2 h-4 w-4" /> Adicionar Novo Plano
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {plans.map((plan) => (
                      <Card key={plan.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle>{plan.name}</CardTitle>
                            <Badge className={planStyles[plan.type].color}>{plan.type}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <div>
                              <p>
                                R$ {plan.price.toFixed(2)} / {plan.billingCycle === "monthly" ? "mês" : "ano"}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {plan.jobPostings} vagas, {plan.featuredPostings} destaques, {plan.cvAccess} currículos
                              </p>
                            </div>
                            <div>
                              <Button variant="outline" onClick={() => setEditingPlan(plan)}>
                                <Edit className="mr-2 h-4 w-4" /> Editar
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="packages">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">Pacotes Disponíveis</h3>
                        <p className="text-sm text-muted-foreground">
                          Gerencie os pacotes de vagas e serviços disponíveis
                        </p>
                      </div>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" /> Novo Pacote
                      </Button>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {packageOptions.map((pkg) => (
                        <Card key={pkg.id}>
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-lg">{pkg.name}</CardTitle>
                                <CardDescription>{pkg.description}</CardDescription>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" /> Editar
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Package className="mr-2 h-4 w-4" /> Duplicar
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4" /> Excluir
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Preço:</span>
                                <span className="font-semibold">R$ {pkg.price.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Duração:</span>
                                <span>{pkg.duration} dias</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Tipo:</span>
                                <Badge variant="secondary">
                                  {pkg.type === "job_post" && "Vaga"}
                                  {pkg.type === "featured" && "Destaque"}
                                  {pkg.type === "cv_access" && "Currículos"}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="extras">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">Produtos Extras</h3>
                        <p className="text-sm text-muted-foreground">Gerencie os produtos extras e complementos</p>
                      </div>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" /> Novo Extra
                      </Button>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {extraOptions.map((extra) => (
                        <Card key={extra.id}>
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-lg">{extra.name}</CardTitle>
                                <CardDescription>{extra.description}</CardDescription>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" /> Editar
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Package className="mr-2 h-4 w-4" /> Duplicar
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4" /> Excluir
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Preço:</span>
                                <span className="font-semibold">R$ {extra.price.toFixed(2)}</span>
                              </div>
                              {extra.duration && (
                                <div className="flex justify-between items-center">
                                  <span className="text-sm">Duração:</span>
                                  <span>{extra.duration} dias</span>
                                </div>
                              )}
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Tipo:</span>
                                <Badge variant="secondary">
                                  {extra.type === "highlight" && "Destaque"}
                                  {extra.type === "urgent" && "Urgente"}
                                  {extra.type === "top" && "Topo"}
                                  {extra.type === "social" && "Social"}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!editingPlan} onOpenChange={() => setEditingPlan(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingPlan?.id ? "Editar Plano" : "Adicionar Novo Plano"}</DialogTitle>
            <DialogDescription>
              {editingPlan?.id ? "Faça alterações no plano existente." : "Preencha os detalhes do novo plano."}
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="plan-name">Nome do Plano</Label>
              <Input
                id="plan-name"
                value={editingPlan?.name}
                onChange={(e) => setEditingPlan((prev) => (prev ? { ...prev, name: e.target.value } : null))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan-type">Tipo de Plano</Label>
              <Select
                value={editingPlan?.type}
                onValueChange={(value) =>
                  setEditingPlan((prev) => (prev ? { ...prev, type: value as PlanType } : null))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de plano" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Básico</SelectItem>
                  <SelectItem value="pro">Pro</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan-price">Preço (R$)</Label>
              <Input
                id="plan-price"
                type="number"
                value={editingPlan?.price}
                onChange={(e) =>
                  setEditingPlan((prev) => (prev ? { ...prev, price: Number.parseFloat(e.target.value) } : null))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billing-cycle">Ciclo de Cobrança</Label>
              <Select
                value={editingPlan?.billingCycle}
                onValueChange={(value) =>
                  setEditingPlan((prev) => (prev ? { ...prev, billingCycle: value as "monthly" | "annually" } : null))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o ciclo de cobrança" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Mensal</SelectItem>
                  <SelectItem value="annually">Anual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="job-postings">Postagens de Vagas</Label>
              <Input
                id="job-postings"
                type="number"
                value={editingPlan?.jobPostings}
                onChange={(e) =>
                  setEditingPlan((prev) => (prev ? { ...prev, jobPostings: Number.parseInt(e.target.value) } : null))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="featured-postings">Vagas em Destaque</Label>
              <Input
                id="featured-postings"
                type="number"
                value={editingPlan?.featuredPostings}
                onChange={(e) =>
                  setEditingPlan((prev) =>
                    prev ? { ...prev, featuredPostings: Number.parseInt(e.target.value) } : null,
                  )
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cv-access">Acesso a Currículos</Label>
              <Input
                id="cv-access"
                type="number"
                value={editingPlan?.cvAccess}
                onChange={(e) =>
                  setEditingPlan((prev) => (prev ? { ...prev, cvAccess: Number.parseInt(e.target.value) } : null))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Recursos</Label>
              {editingPlan?.features.map((feature, index) => (
                <div key={feature.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`feature-${feature.id}`}
                    checked={feature.included}
                    onCheckedChange={(checked) => {
                      setEditingPlan((prev) => {
                        if (!prev) return null
                        const newFeatures = [...prev.features]
                        newFeatures[index] = { ...newFeatures[index], included: checked as boolean }
                        return { ...prev, features: newFeatures }
                      })
                    }}
                  />
                  <Label htmlFor={`feature-${feature.id}`}>{feature.name}</Label>
                </div>
              ))}
            </div>
          </form>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => {
                // Here you would typically save the changes to your backend
                console.log("Saving plan:", editingPlan)
                setEditingPlan(null)
              }}
            >
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminDashboardShell>
  )
}

