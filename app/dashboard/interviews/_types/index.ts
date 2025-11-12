export type InterviewStatus = "scheduled" | "completed" | "cancelled" | "conducted" | "rescheduled" | "pending"
export type InterviewType = "online" | "in-person" | "phone"
export type InterviewPriority = "low" | "medium" | "high"
export type FeedbackScore = 1 | 2 | 3 | 4 | 5

export interface Feedback {
  id: string
  interviewerId: string
  interviewerName: string
  score: FeedbackScore
  strengths: string[]
  weaknesses: string[]
  notes: string
  recommendation: "hire" | "reject" | "another_interview" | "undecided"
  submittedAt: string
}

export interface Interview {
  id: string
  candidateName: string
  candidateAvatar?: string
  position: string
  date: string
  duration: number // em minutos
  type: InterviewType
  status: InterviewStatus
  priority?: InterviewPriority
  platform?: string
  meetingUrl?: string
  location?: string
  email: string
  phone: string
  experience: string
  education: string
  skills?: string[]
  jobId: string
  jobTitle: string
  notes?: string
  interviewers?: Interviewer[]
  createdAt: string
  updatedAt: string
  hasFeedback: boolean
  feedback?: Feedback[]
  matchPercentage?: number
  resume?: string
  rating?: number
}

export interface Interviewer {
  name: string
  role: string
  avatar?: string
}

export interface StatusStyle {
  label: string
  variant: "default" | "success" | "secondary" | "destructive" | "outline"
  color: string
}

export type ViewMode = "list" | "calendar" | "analytics"
export type DateRangeFilter = "today" | "this-week" | "next-week" | "this-month" | "all"

export interface ThemeColor {
  name: string
  value: string
  bg: string
  accent: string
}

export interface JobSummary {
  id: string
  title: string
}

export interface StatsByDay {
  day: string
  count: number
}

export interface StatsByJob {
  id: string
  title: string
  count: number
}

export interface InterviewStats {
  total: number
  scheduled: number
  conducted: number
  completed: number
  cancelled: number
  rescheduled: number
  pending: number
  todayInterviews: number
  nextHourInterviews: number
  tomorrowInterviews: number
  online: number
  inPerson: number
  phone: number
  highPriority: number
  pendingFeedback: number
  completion: {
    total: number
    done: number
    percentage: number
  }
  byJob: StatsByJob[]
  upcoming: Interview[]
  favoriteCount: number
  byWeekday: StatsByDay[]
} 