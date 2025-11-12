import { JobCard } from "@/components/job-card"

interface Job {
  id: string
  company: string
  title: string
  location: string
  area: string
  salary: string
  logo: string
  postedAt: string
  isNew?: boolean
  isUrgent?: boolean
  type: string
  expirationDate?: Date
  numberOfVacancies: number
  skills?: string[]
}

interface JobsListProps {
  jobs: Job[]
}

export function JobsList({ jobs }: JobsListProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {jobs.map((job, index) => (
        <JobCard key={index} {...job} />
      ))}
    </div>
  )
} 