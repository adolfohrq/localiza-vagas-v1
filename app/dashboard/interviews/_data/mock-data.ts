import { Interview } from "../_types/types"
import { INTERVIEW_STATUS_MAP, INTERVIEW_TYPE_MAP, PRIORITY_MAP } from "./constants"

// Estilos para cada status (usado em componentes UI)
export const statusStyles: Record<string, { variant: string, color: string, label: string }> = {
  scheduled: { variant: 'outline', color: 'text-blue-700 bg-blue-50', label: 'Agendada' },
  completed: { variant: 'default', color: 'text-green-700 bg-green-50', label: 'Realizada' },
  cancelled: { variant: 'destructive', color: 'text-red-700 bg-red-50', label: 'Cancelada' },
  pending_feedback: { variant: 'secondary', color: 'text-amber-700 bg-amber-50', label: 'Feedback Pendente' }
}

export const initialInterviews: Interview[] = [
  {
    id: "1",
    candidate: {
      id: "c1",
      name: "João Silva",
      email: "joao.silva@example.com",
      phone: "(11) 98765-4321",
      avatar: "/placeholder.svg"
    },
    job: {
      id: "job-1",
      title: "Desenvolvedor Full Stack Senior",
      department: "Tecnologia"
    },
    date: "2024-05-25T14:00:00",
    duration: 60,
    type: "technical",
    status: "scheduled",
    priority: "high",
    notes: "Candidato com perfil interessante para o time de produtos digitais.",
    location: "Online (Google Meet)",
    remote: true
  },
  {
    id: "2",
    candidate: {
      id: "c2",
      name: "Maria Santos",
      email: "maria.santos@example.com",
      phone: "(11) 98765-1234",
      avatar: "/placeholder.svg"
    },
    job: {
      id: "job-2",
      title: "UX Designer Senior",
      department: "Design"
    },
    date: "2024-05-25T16:30:00",
    duration: 45,
    type: "behavioral",
    status: "scheduled",
    priority: "medium",
    location: "Online (Zoom)",
    remote: true
  },
  {
    id: "3",
    candidate: {
      id: "c3",
      name: "Pedro Costa",
      email: "pedro.costa@example.com",
      phone: "(11) 98765-5678",
      avatar: "/placeholder.svg"
    },
    job: {
      id: "job-3",
      title: "Analista de Marketing Digital",
      department: "Marketing"
    },
    date: "2024-05-26T10:00:00",
    duration: 60,
    type: "hr",
    status: "scheduled",
    priority: "medium",
    location: "Escritório SP",
    remote: false
  },
  {
    id: "4",
    candidate: {
      id: "c4",
      name: "Ana Rodrigues",
      email: "ana.rodrigues@example.com",
      phone: "(11) 98765-8765",
      avatar: "/placeholder.svg"
    },
    job: {
      id: "job-4",
      title: "Gerente de Projetos Senior",
      department: "Operações"
    },
    date: "2024-05-27T11:00:00",
    duration: 90,
    type: "manager",
    status: "scheduled",
    priority: "high",
    location: "Online (Microsoft Teams)",
    remote: true
  },
  {
    id: "5",
    candidate: {
      id: "c5",
      name: "Carlos Ferreira",
      email: "carlos.ferreira@example.com",
      phone: "(21) 98765-4321",
      avatar: "/placeholder.svg"
    },
    job: {
      id: "job-5",
      title: "Engenheiro de Dados Senior",
      department: "Dados"
    },
    date: "2024-05-28T15:00:00",
    duration: 60,
    type: "technical",
    status: "scheduled",
    priority: "low",
    location: "Escritório RJ",
    remote: false
  },
  {
    id: "6",
    candidate: {
      id: "c6",
      name: "Luisa Mendes",
      email: "luisa.mendes@example.com",
      phone: "(11) 97654-3210",
      avatar: "/placeholder.svg"
    },
    job: {
      id: "job-1",
      title: "Desenvolvedor Frontend Pleno",
      department: "Tecnologia"
    },
    date: "2024-05-22T10:00:00",
    duration: 60,
    type: "technical",
    status: "completed",
    priority: "medium",
    location: "Online (Google Meet)",
    remote: true,
    feedback: "Candidata demonstrou forte conhecimento em React e boas práticas de desenvolvimento frontend."
  },
  {
    id: "7",
    candidate: {
      id: "c7",
      name: "Rafael Oliveira",
      email: "rafael.oliveira@example.com",
      phone: "(11) 98888-7777",
      avatar: "/placeholder.svg"
    },
    job: {
      id: "job-6",
      title: "DevOps Engineer Senior",
      department: "Infraestrutura"
    },
    date: "2024-05-20T14:00:00",
    duration: 60,
    type: "technical",
    status: "cancelled",
    priority: "medium",
    notes: "Candidato pediu para cancelar e reagendar para a próxima semana.",
    location: "Online (Zoom)",
    remote: true
  },
  {
    id: "8",
    candidate: {
      id: "c8",
      name: "Juliana Costa",
      email: "juliana.costa@example.com",
      phone: "(11) 99999-8888",
      avatar: "/placeholder.svg"
    },
    job: {
      id: "job-7",
      title: "Product Manager Senior",
      department: "Produto"
    },
    date: "2024-05-21T11:00:00",
    duration: 75,
    type: "manager",
    status: "completed",
    priority: "high",
    location: "Escritório SP",
    remote: false,
    feedback: "Candidata demonstrou grande capacidade de liderança e conhecimento técnico. Será um excelente acréscimo ao time."
  },
  {
    id: "9",
    candidate: {
      id: "c9",
      name: "Thiago Moreira",
      email: "thiago.moreira@example.com",
      phone: "(11) 97777-6666",
      avatar: "/placeholder.svg"
    },
    job: {
      id: "job-8",
      title: "Analista de Dados Pleno",
      department: "Dados"
    },
    date: "2024-05-04T09:00:00",
    duration: 60,
    type: "technical",
    status: "pending_feedback",
    priority: "medium",
    location: "Online (Google Meet)",
    remote: true
  },
  {
    id: "10",
    candidate: {
      id: "c10",
      name: "Amanda Silveira",
      email: "amanda.silveira@example.com",
      phone: "(11) 96666-5555",
      avatar: "/placeholder.svg"
    },
    job: {
      id: "job-9",
      title: "Designer UI/UX",
      department: "Design"
    },
    date: "2024-05-01T15:00:00",
    duration: 60,
    type: "behavioral",
    status: "completed",
    priority: "medium",
    location: "Online (Google Meet)",
    remote: true,
    feedback: "Candidata com excelente portfólio e boa comunicação. Demonstrou conhecimento técnico adequado."
  }
]

export const themeColors = [
  { name: "Padrão", value: "default", bg: "bg-white dark:bg-zinc-950", accent: "bg-primary" },
  { name: "Azul", value: "blue", bg: "bg-blue-50 dark:bg-blue-950", accent: "bg-blue-600" },
  { name: "Verde", value: "green", bg: "bg-green-50 dark:bg-green-950", accent: "bg-green-600" },
  { name: "Roxo", value: "purple", bg: "bg-purple-50 dark:bg-purple-950", accent: "bg-purple-600" },
  { name: "Âmbar", value: "amber", bg: "bg-amber-50 dark:bg-amber-950", accent: "bg-amber-600" }
] 