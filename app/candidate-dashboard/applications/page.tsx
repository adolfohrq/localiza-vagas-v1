"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  AlertCircle,
  Briefcase,
  Building2,
  Calendar,
  CalendarClock,
  CheckCircle,
  ChevronRight,
  Clock,
  DollarSign,
  Eye,
  FileText,
  Filter,
  HelpCircle,
  MapPin,
  MessageSquare,
  Search,
  SlidersHorizontal,
  XCircle,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { Separator } from "@/components/ui/separator"
import { CandidateDashboardShell } from "@/components/candidate-dashboard-shell"

// Tipos
type ApplicationStatus = "pending" | "reviewing" | "interviewed" | "approved" | "rejected"
type JobType = "Remoto" | "Presencial" | "Híbrido"
type SalaryRange = "Até R$ 5.000" | "R$ 5.000 - R$ 10.000" | "R$ 10.000 - R$ 15.000" | "Acima de R$ 15.000"

interface JobApplication {
  id: string
  company: string
  position: string
  location: string
  salary: string
  appliedDate: string
  status: ApplicationStatus
  logo: string
  nextStep?: string
  feedback?: string
  interviewDate?: string
  jobType: JobType
  companyId: string
  jobId: string
  hasUnreadMessages: boolean
  description?: string
  requirements?: string[]
  benefits?: string[]
  contactPerson?: string
  skills?: string[]
  matchScore?: number
  skillsRequired?: {
    technical?: string[]
    social?: string[]
    professional?: string[]
    languages?: string[]
  }
}

// Estilos para os status
const statusStyles: Record<ApplicationStatus, { 
  label: string; 
  variant: "default" | "secondary" | "outline" | "destructive"; 
  icon: JSX.Element;
  color: string;
}> = {
  pending: {
    label: "Pendente",
    variant: "secondary",
    icon: <Clock className="h-3.5 w-3.5 mr-1" />,
    color: "bg-yellow-100 text-yellow-800"
  },
  reviewing: {
    label: "Em Análise",
    variant: "secondary",
    icon: <HelpCircle className="h-3.5 w-3.5 mr-1" />,
    color: "bg-blue-100 text-blue-800"
  },
  interviewed: {
    label: "Entrevistado",
    variant: "outline",
    icon: <Calendar className="h-3.5 w-3.5 mr-1" />,
    color: "bg-purple-100 text-purple-800"
  },
  approved: {
    label: "Aprovado",
    variant: "default",
    icon: <CheckCircle className="h-3.5 w-3.5 mr-1" />,
    color: "bg-green-100 text-green-800"
  },
  rejected: {
    label: "Rejeitado",
    variant: "destructive",
    icon: <XCircle className="h-3.5 w-3.5 mr-1" />,
    color: "bg-red-100 text-red-800"
  },
}

// Dados de exemplo
const applications: JobApplication[] = [
  {
    id: "1",
    company: "TechSolutions",
    position: "Desenvolvedor Frontend",
    location: "São Paulo, SP",
    salary: "R$ 8.000 - R$ 10.000",
    appliedDate: "2023-06-15",
    status: "approved",
    logo: "/logos/techsolutions.svg",
    feedback: "Seu perfil se encaixa perfeitamente com o que estamos procurando. Parabéns! Estamos muito animados para tê-lo em nossa equipe.",
    jobType: "Remoto",
    companyId: "1",
    jobId: "101",
    hasUnreadMessages: true,
    interviewDate: "2023-06-25T14:30:00",
    description: "Estamos buscando um desenvolvedor frontend experiente para trabalhar em projetos inovadores.",
    requirements: [
      "3+ anos de experiência com React",
      "Conhecimento em TypeScript",
      "Experiência com Next.js"
    ],
    benefits: [
      "Plano de saúde",
      "Vale refeição",
      "Horário flexível",
      "Home office"
    ],
    contactPerson: "Ana Silva",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "UI/UX"],
    matchScore: 95,
    skillsRequired: {
      technical: ["React", "TypeScript", "Next.js", "CSS/SASS", "Git"],
      social: ["Comunicação", "Trabalho em equipe", "Proatividade"],
      professional: ["Gestão de tempo", "Resolução de problemas", "Atenção aos detalhes"],
      languages: ["Inglês (intermediário)"]
    }
  },
  {
    id: "2",
    company: "InnovateX",
    position: "UX/UI Designer",
    location: "Rio de Janeiro, RJ",
    salary: "R$ 7.000 - R$ 9.000",
    appliedDate: "2023-06-10",
    status: "reviewing",
    logo: "/logos/innovatex.svg",
    nextStep: "Aguardando agendamento de entrevista técnica",
    jobType: "Presencial",
    companyId: "2",
    jobId: "102",
    hasUnreadMessages: false,
    description: "Procuramos um designer talentoso para criar interfaces intuitivas e atraentes.",
    requirements: [
      "Experiência com Figma",
      "Portfólio de projetos",
      "Conhecimento em design responsivo"
    ],
    benefits: [
      "Plano de saúde",
      "Vale refeição",
      "Ambiente descontraído"
    ],
    contactPerson: "Carlos Mendes",
    skills: ["Figma", "Adobe XD", "UI Design", "Prototipagem", "Design System"],
    matchScore: 88,
    skillsRequired: {
      technical: ["Figma", "Adobe XD", "Sketch", "Design Responsivo", "Prototipagem"],
      social: ["Criatividade", "Empatia com usuário", "Comunicação visual"],
      professional: ["Organização", "Cumprimento de prazos", "Adaptabilidade"],
      languages: ["Inglês (básico)"]
    }
  },
  {
    id: "3",
    company: "DataVision",
    position: "Analista de Dados",
    location: "Belo Horizonte, MG",
    salary: "R$ 6.500 - R$ 8.500",
    appliedDate: "2023-06-05",
    status: "rejected",
    logo: "/logos/datavision.svg",
    feedback: "Agradecemos seu interesse, mas decidimos seguir com candidatos com mais experiência em Python.",
    jobType: "Híbrido",
    companyId: "3",
    jobId: "103",
    hasUnreadMessages: false,
    description: "Buscamos um analista de dados para trabalhar com grandes volumes de informações.",
    requirements: [
      "Experiência com Python",
      "Conhecimento em SQL",
      "Familiaridade com ferramentas de visualização"
    ],
    benefits: [
      "Plano de saúde",
      "Vale refeição",
      "Gympass"
    ],
    contactPerson: "Mariana Costa",
    skills: ["SQL", "Power BI", "Excel Avançado", "Visualização de Dados"],
    matchScore: 65,
    skillsRequired: {
      technical: ["Python", "SQL", "Power BI", "Pandas", "Estatística"],
      social: ["Comunicação de dados", "Pensamento analítico", "Trabalho em equipe"],
      professional: ["Documentação", "Análise crítica", "Metodologia científica"],
      languages: ["Inglês (intermediário)"]
    }
  },
  {
    id: "4",
    company: "CloudWave",
    position: "DevOps Engineer",
    location: "Curitiba, PR",
    salary: "R$ 9.000 - R$ 12.000",
    appliedDate: "2023-06-01",
    status: "interviewed",
    logo: "/logos/cloudwave.svg",
    nextStep: "Aguardando feedback da entrevista técnica",
    interviewDate: "2023-06-20T10:00:00",
    jobType: "Remoto",
    companyId: "4",
    jobId: "104",
    hasUnreadMessages: true,
    description: "Procuramos um engenheiro DevOps para otimizar nossos processos de desenvolvimento.",
    requirements: [
      "Experiência com AWS",
      "Conhecimento em Docker e Kubernetes",
      "Familiaridade com CI/CD"
    ],
    benefits: [
      "Plano de saúde",
      "Vale refeição",
      "Horário flexível",
      "Bônus anual"
    ],
    contactPerson: "Roberto Almeida",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Jenkins", "Terraform"],
    matchScore: 82,
    skillsRequired: {
      technical: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux", "Terraform"],
      social: ["Comunicação", "Trabalho em equipe", "Resolução de conflitos"],
      professional: ["Documentação", "Monitoramento", "Gestão de incidentes"],
      languages: ["Inglês (avançado)"]
    }
  },
  {
    id: "5",
    company: "EcoTech",
    position: "Desenvolvedor Backend",
    location: "Florianópolis, SC",
    salary: "R$ 7.500 - R$ 10.500",
    appliedDate: "2023-05-28",
    status: "pending",
    logo: "/logos/ecotech.svg",
    nextStep: "Aguardando análise inicial do currículo",
    jobType: "Híbrido",
    companyId: "5",
    jobId: "105",
    hasUnreadMessages: false,
    description: "Buscamos um desenvolvedor backend para trabalhar em nossa plataforma sustentável.",
    requirements: [
      "Experiência com Node.js",
      "Conhecimento em bancos de dados NoSQL",
      "Familiaridade com APIs RESTful"
    ],
    benefits: [
      "Plano de saúde",
      "Vale refeição",
      "Horário flexível",
      "Programa de participação nos lucros"
    ],
    contactPerson: "Juliana Santos",
    skills: ["Node.js", "Express", "MongoDB", "API RESTful", "GraphQL"],
    matchScore: 78,
    skillsRequired: {
      technical: ["Node.js", "MongoDB", "Express", "API RESTful", "Git"],
      social: ["Comunicação", "Trabalho em equipe", "Autonomia"],
      professional: ["Documentação", "Testes", "Segurança de aplicações"],
      languages: ["Inglês (intermediário)"]
    }
  },
  {
    id: "6",
    company: "FinTech Brasil",
    position: "Desenvolvedor Full Stack",
    location: "São Paulo, SP",
    salary: "R$ 10.000 - R$ 13.000",
    appliedDate: "2023-05-20",
    status: "reviewing",
    logo: "/logos/fintech.svg",
    nextStep: "Teste técnico enviado, aguardando sua resposta",
    jobType: "Híbrido",
    companyId: "6",
    jobId: "106",
    hasUnreadMessages: true,
    description: "Procuramos um desenvolvedor full stack para trabalhar em nossa plataforma financeira.",
    requirements: [
      "Experiência com React e Node.js",
      "Conhecimento em bancos de dados SQL",
      "Familiaridade com metodologias ágeis"
    ],
    benefits: [
      "Plano de saúde",
      "Vale refeição",
      "Horário flexível",
      "Stock options"
    ],
    contactPerson: "Fernando Lima",
    skills: ["React", "Node.js", "PostgreSQL", "TypeScript", "Metodologias Ágeis"],
    matchScore: 91,
    skillsRequired: {
      technical: ["React", "Node.js", "PostgreSQL", "TypeScript", "Git"],
      social: ["Comunicação", "Trabalho em equipe", "Liderança"],
      professional: ["Metodologias ágeis", "Gestão de projetos", "Mentoria"],
      languages: ["Inglês (avançado)"]
    }
  }
]

// Funções utilitárias
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  }
  return new Date(dateString).toLocaleDateString('pt-BR', options)
}

const formatDateTime = (dateTimeString?: string) => {
  if (!dateTimeString) return null
  
  const options: Intl.DateTimeFormatOptions = { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  return new Date(dateTimeString).toLocaleDateString('pt-BR', options)
}

// Estilos CSS para o padrão de grade
const gridPatternStyle = {
  backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), 
                    linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)`,
  backgroundSize: '20px 20px'
}

// Componente para o modal de detalhes da aplicação
function ApplicationDetailsModal({ 
  application, 
  isOpen, 
  onClose 
}: { 
  application: JobApplication | null, 
  isOpen: boolean, 
  onClose: () => void 
}) {
  if (!application) return null

  // Função para renderizar as habilidades por categoria
  const renderSkillCategory = (title: string, skills?: string[]) => {
    if (!skills || skills.length === 0) return null

  return (
      <div className="mb-3">
        <h4 className="text-sm font-medium mb-2">{title}</h4>
        <div className="flex flex-wrap gap-1.5">
          {skills.map((skill, index) => (
            <Badge key={index} variant="outline" className="bg-muted/50 py-1">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        {/* Cabeçalho com imagem de fundo */}
        <div className="relative bg-gradient-to-r from-primary/10 to-primary/5 p-6 pb-12 overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={gridPatternStyle}></div>
          <div className="relative z-10 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-background shadow-sm">
                <AvatarImage src={application.logo} alt={application.company} />
                <AvatarFallback>{application.company[0]}</AvatarFallback>
              </Avatar>
        <div>
                <h2 className="text-2xl font-bold">{application.position}</h2>
                <div className="flex items-center gap-2 text-base mt-1">
                  <Building2 className="h-4 w-4" />
                  <span className="font-medium">{application.company}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <Badge variant="outline" className={`${statusStyles[application.status].color} px-3 py-1 text-sm`}>
                {statusStyles[application.status].icon}
                {statusStyles[application.status].label}
              </Badge>
              {application.matchScore !== undefined && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-muted-foreground">Compatibilidade:</span>
                  <div className={`px-2 py-1 rounded-md text-sm font-medium ${
                    application.matchScore >= 90 ? 'bg-green-100 text-green-800' :
                    application.matchScore >= 75 ? 'bg-blue-100 text-blue-800' :
                    application.matchScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {application.matchScore}%
                  </div>
                </div>
              )}
            </div>
        </div>
      </div>

        {/* Informações principais */}
        <div className="px-6 -mt-6">
          <div className="bg-background rounded-lg border shadow-sm p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex flex-col items-center text-center">
              <MapPin className="h-5 w-5 text-muted-foreground mb-1" />
              <span className="text-sm font-medium">{application.location}</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Briefcase className="h-5 w-5 text-muted-foreground mb-1" />
              <span className="text-sm font-medium">{application.jobType}</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <DollarSign className="h-5 w-5 text-muted-foreground mb-1" />
              <span className="text-sm font-medium">{application.salary}</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Calendar className="h-5 w-5 text-muted-foreground mb-1" />
              <span className="text-sm font-medium">{formatDate(application.appliedDate)}</span>
            </div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {/* Coluna da esquerda */}
          <div className="md:col-span-2 space-y-6">
            {/* Descrição */}
            {application.description && (
              <div className="bg-background rounded-lg border p-4">
                <h3 className="text-base font-semibold mb-2 flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Descrição da Vaga
                </h3>
                <p className="text-sm text-muted-foreground">{application.description}</p>
              </div>
            )}
            
            {/* Habilidades Necessárias */}
            {application.skillsRequired && (
              <div className="bg-background rounded-lg border p-4">
                <h3 className="text-base font-semibold mb-3 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Habilidades Necessárias
                </h3>
                <div className="space-y-4">
                  {renderSkillCategory("Habilidades Técnicas", application.skillsRequired.technical)}
                  {renderSkillCategory("Habilidades Sociais", application.skillsRequired.social)}
                  {renderSkillCategory("Habilidades Profissionais", application.skillsRequired.professional)}
                  {renderSkillCategory("Idiomas", application.skillsRequired.languages)}
                </div>
              </div>
            )}
            
            {/* Requisitos */}
            {application.requirements && application.requirements.length > 0 && (
              <div className="bg-background rounded-lg border p-4">
                <h3 className="text-base font-semibold mb-2 flex items-center">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Requisitos
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {application.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* Coluna da direita */}
          <div className="space-y-6">
            {/* Status da Candidatura */}
            <div className="bg-background rounded-lg border p-4">
              <h3 className="text-base font-semibold mb-2 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Status da Candidatura
              </h3>
              
              {application.interviewDate && (
                <div className="mb-3">
                  <h4 className="text-sm font-medium mb-1">Entrevista Agendada</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarClock className="h-4 w-4 flex-shrink-0" />
                    <span>{formatDateTime(application.interviewDate)}</span>
                  </div>
                </div>
              )}
              
              {application.nextStep && (
                <div className="mb-3">
                  <h4 className="text-sm font-medium mb-1">Próximo Passo</h4>
                  <p className="text-sm text-muted-foreground">{application.nextStep}</p>
                </div>
              )}
              
              {application.feedback && (
                <div className="mb-3">
                  <h4 className="text-sm font-medium mb-1">Feedback</h4>
                  <p className="text-sm text-muted-foreground">{application.feedback}</p>
                </div>
              )}
            </div>
            
            {/* Benefícios */}
            {application.benefits && application.benefits.length > 0 && (
              <div className="bg-background rounded-lg border p-4">
                <h3 className="text-base font-semibold mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Benefícios
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {application.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Contato */}
            {application.contactPerson && (
              <div className="bg-background rounded-lg border p-4">
                <h3 className="text-base font-semibold mb-2 flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contato
                </h3>
                <p className="text-sm text-muted-foreground">{application.contactPerson}</p>
              </div>
            )}
          </div>
        </div>

        {/* Rodapé com ações */}
        <div className="border-t p-4 flex flex-wrap gap-2 justify-end">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          <Link href={`/vagas/${application.jobId}`}>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Ver Vaga
            </Button>
          </Link>
          <Link href={`/empresas/${application.companyId}`}>
            <Button variant="outline">
              <Building2 className="h-4 w-4 mr-2" />
              Ver Empresa
            </Button>
          </Link>
          <Link href={`/candidate-dashboard/messages-v2`}>
            <Button>
              <MessageSquare className="h-4 w-4 mr-2" />
              Mensagens
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Componente de card de candidatura
function ApplicationCard({ application, onOpenDetails }: { application: JobApplication, onOpenDetails: (app: JobApplication) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-0">
          <div className="p-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex gap-4 flex-1">
              <Link href={`/empresas/${application.companyId}`} className="block">
                <Avatar className="h-12 w-12 border bg-background flex-shrink-0 hover:ring-2 hover:ring-primary/50 transition-all">
                        <AvatarImage src={application.logo} alt={application.company} />
                        <AvatarFallback>{application.company[0]}</AvatarFallback>
                      </Avatar>
              </Link>
              
              <div className="space-y-3 flex-1">
                {/* Título e empresa */}
                <div>
                  <Link href={`/vagas/${application.jobId}`} className="inline-block hover:text-primary transition-colors">
                    <h3 className="font-semibold text-base">{application.position}</h3>
                  </Link>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Building2 className="h-3.5 w-3.5 flex-shrink-0" />
                    <Link href={`/empresas/${application.companyId}`} className="hover:text-primary transition-colors">
                            <span>{application.company}</span>
                    </Link>
                  </div>
                          </div>
                
                {/* Detalhes em grid */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground/70" />
                            <span>{application.location}</span>
                          </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground/70" />
                    <span>{application.jobType}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <DollarSign className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground/70" />
                            <span>{application.salary}</span>
                          </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground/70" />
                    <span>Aplicado: {formatDate(application.appliedDate)}</span>
                  </div>
                  {application.interviewDate && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground col-span-2">
                      <CalendarClock className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground/70" />
                      <span>Entrevista: {formatDateTime(application.interviewDate)}</span>
                          </div>
                  )}
                        </div>
                      </div>
                    </div>
            
            <div className="flex flex-col items-start md:items-end gap-2 md:min-w-[150px]">
              <Badge variant="outline" className={statusStyles[application.status].color + " flex items-center"}>
                {statusStyles[application.status].icon}
                        {statusStyles[application.status].label}
                      </Badge>
              {application.nextStep && 
                !["Aguardando agendamento de entrevista técnica", 
                  "Aguardando feedback da entrevista técnica", 
                  "Aguardando análise inicial do currículo", 
                  "Teste técnico enviado, aguardando sua resposta"].includes(application.nextStep) && (
                <p className="text-sm text-muted-foreground max-w-[250px] text-left md:text-right">
                  {application.nextStep}
                </p>
                      )}
                    </div>
                  </div>
          <div className="bg-muted/30 p-3 flex flex-wrap gap-2 justify-end border-t">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={`/candidate-dashboard/messages-v2`}>
                    <Button variant="outline" size="sm" className="h-8">
                      <MessageSquare className="h-3.5 w-3.5 mr-1" />
                      Mensagens
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Conversar com a empresa</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={`/vagas/${application.jobId}`}>
                    <Button variant="outline" size="sm" className="h-8">
                      <FileText className="h-3.5 w-3.5 mr-1" />
                      Ver Vaga
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Ver detalhes da vaga</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={`/empresas/${application.companyId}`}>
                    <Button variant="outline" size="sm" className="h-8">
                      <Building2 className="h-3.5 w-3.5 mr-1" />
                      Ver Empresa
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Ver perfil da empresa</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Button size="sm" className="h-8" onClick={() => onOpenDetails(application)}>
              <Eye className="h-3.5 w-3.5 mr-1" />
              Detalhes
              <ChevronRight className="h-3.5 w-3.5 ml-1" />
            </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
  )
}

// Componente de mensagem vazia
function EmptyState({ message, description }: { message: string, description: string }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-10 text-center">
        <AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">{message}</h3>
        <p className="text-sm text-muted-foreground mt-2">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}

// Componente principal da página
export default function ApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  
  // Filtrar aplicações
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.position.toLowerCase().includes(searchTerm.toLowerCase()) || 
      app.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" || 
      (statusFilter === "em_analise" && ["applied", "screening", "technical_test"].includes(app.status)) ||
      (statusFilter === "entrevistado" && ["interview", "final_interview"].includes(app.status)) ||
      (statusFilter === "rejeitado" && app.status === "rejected");
    
    return matchesSearch && matchesStatus;
  })
  
  // Abrir modal de detalhes
  const openDetailsModal = (application: JobApplication) => {
    setSelectedApplication(application)
    setIsDetailsModalOpen(true)
  }
  
  // Fechar modal de detalhes
  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false)
  }
  
  // Estatísticas das candidaturas
  const stats = {
    total: applications.length,
    active: applications.filter(app => ['pending', 'reviewing', 'interviewed'].includes(app.status)).length,
    completed: applications.filter(app => ['approved', 'rejected'].includes(app.status)).length,
    approved: applications.filter(app => app.status === 'approved').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
    unreadMessages: applications.filter(app => app.hasUnreadMessages).length
  }

  return (
    <CandidateDashboardShell>
      <div className="flex flex-col gap-6">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Minhas Candidaturas</h2>
            <p className="text-muted-foreground">Acompanhe o status das suas candidaturas a vagas</p>
          </div>
          <div className="flex gap-2">
            <Link href="/vagas">
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Explorar Vagas
              </Button>
            </Link>
            <Link href="/candidate-dashboard/messages-v2">
              <Button>
                <MessageSquare className="h-4 w-4 mr-2" />
                Mensagens
                {stats.unreadMessages > 0 && (
                  <Badge variant="secondary" className="ml-2 bg-primary/20 text-primary">
                    {stats.unreadMessages}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total de Candidaturas</p>
                  <h3 className="text-2xl font-bold mt-1">{stats.total}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Em Andamento</p>
                  <h3 className="text-2xl font-bold mt-1">{stats.active}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Aprovadas</p>
                  <h3 className="text-2xl font-bold mt-1">{stats.approved}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rejeitadas</p>
                  <h3 className="text-2xl font-bold mt-1">{stats.rejected}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros e Pesquisa */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por empresa ou cargo..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Abas de candidaturas */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger 
              value="all" 
              onClick={() => setStatusFilter("all")}
            >
              Todas ({applications.length})
            </TabsTrigger>
            <TabsTrigger 
              value="em_analise" 
              onClick={() => setStatusFilter("em_analise")}
            >
              Em Análise ({applications.filter(app => ["applied", "screening", "technical_test"].includes(app.status)).length})
            </TabsTrigger>
            <TabsTrigger 
              value="entrevistado" 
              onClick={() => setStatusFilter("entrevistado")}
            >
              Entrevistado ({applications.filter(app => ["interview", "final_interview"].includes(app.status)).length})
            </TabsTrigger>
            <TabsTrigger 
              value="rejeitado" 
              onClick={() => setStatusFilter("rejeitado")}
            >
              Rejeitado ({applications.filter(app => app.status === "rejected").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredApplications.length === 0 ? (
              <EmptyState 
                message="Nenhuma candidatura encontrada" 
                description="Não encontramos candidaturas que correspondam aos seus filtros."
              />
            ) : (
              <AnimatePresence>
                {filteredApplications.map((application) => (
                  <ApplicationCard 
                    key={application.id} 
                    application={application} 
                    onOpenDetails={openDetailsModal}
                  />
                ))}
              </AnimatePresence>
            )}
          </TabsContent>

          <TabsContent value="em_analise" className="space-y-4">
            {filteredApplications.length === 0 ? (
              <EmptyState 
                message="Nenhuma candidatura em análise" 
                description="Não encontramos candidaturas em análise que correspondam aos seus filtros."
              />
            ) : (
              <AnimatePresence>
                {filteredApplications.map((application) => (
                  <ApplicationCard 
                    key={application.id} 
                    application={application} 
                    onOpenDetails={openDetailsModal}
                  />
                ))}
              </AnimatePresence>
            )}
        </TabsContent>

          <TabsContent value="entrevistado" className="space-y-4">
            {filteredApplications.length === 0 ? (
              <EmptyState 
                message="Nenhuma candidatura com entrevista" 
                description="Não encontramos candidaturas com entrevista que correspondam aos seus filtros."
              />
            ) : (
              <AnimatePresence>
                {filteredApplications.map((application) => (
                  <ApplicationCard 
                    key={application.id} 
                    application={application} 
                    onOpenDetails={openDetailsModal}
                  />
                ))}
              </AnimatePresence>
            )}
        </TabsContent>

          <TabsContent value="rejeitado" className="space-y-4">
            {filteredApplications.length === 0 ? (
              <EmptyState 
                message="Nenhuma candidatura rejeitada" 
                description="Não encontramos candidaturas rejeitadas que correspondam aos seus filtros."
              />
            ) : (
              <AnimatePresence>
                {filteredApplications.map((application) => (
                  <ApplicationCard 
                    key={application.id} 
                    application={application} 
                    onOpenDetails={openDetailsModal}
                  />
                ))}
              </AnimatePresence>
            )}
        </TabsContent>
      </Tabs>

        {/* Modal de detalhes */}
        {selectedApplication && (
          <ApplicationDetailsModal
            application={selectedApplication}
            isOpen={isDetailsModalOpen}
            onClose={closeDetailsModal}
          />
        )}
      </div>
    </CandidateDashboardShell>
  )
}


