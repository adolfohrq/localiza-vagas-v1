// Mapeamento de status de entrevista para exibição em português
export const INTERVIEW_STATUS_MAP: Record<string, string> = {
  scheduled: 'Agendada',
  completed: 'Realizada',
  cancelled: 'Cancelada',
  pending_feedback: 'Feedback Pendente'
}

// Mapeamento de tipos de entrevista
export const INTERVIEW_TYPE_MAP: Record<string, string> = {
  technical: 'Técnica',
  behavioral: 'Comportamental',
  hr: 'RH',
  manager: 'Gestor'
}

// Mapeamento de prioridades
export const PRIORITY_MAP: Record<string, string> = {
  high: 'Alta',
  medium: 'Média',
  low: 'Baixa'
} 