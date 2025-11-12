// Tipos para entrevistas
export interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
}

export interface Job {
  id: string
  title: string
  department: string
}

export interface Interview {
  id: string
  candidate: Candidate
  job: Job
  date: string
  duration: number
  type: 'technical' | 'behavioral' | 'hr' | 'manager'
  status: 'scheduled' | 'completed' | 'cancelled' | 'pending_feedback'
  priority: 'high' | 'medium' | 'low'
  notes?: string
  feedback?: string
  location?: string
  remote?: boolean
} 