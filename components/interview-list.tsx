"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { format, isFuture, isEqual } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, MapPinIcon, UserIcon, VideoIcon } from "lucide-react"
import { useState } from "react"
import { InterviewDetailsDialog } from "@/components/interview-details-dialog"
import { RescheduleDialog } from "@/components/reschedule-dialog"
import { CancelInterviewDialog } from "@/components/cancel-interview-dialog"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Interview {
  id: number
  company: string
  position: string
  date: string
  type: string
  status: string
  interviewer: string
  location: string
  notes: string
  description: string
  requirements: string[]
  agenda: string[]
}

interface InterviewListProps {
  interviews: Interview[]
  type: "all" | "scheduled" | "completed" | "finished" | "cancelled"
}

export function InterviewList({ interviews, type }: InterviewListProps) {
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false)
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)

  const handleViewDetails = (interview: Interview) => {
    setSelectedInterview(interview)
    setIsDetailsDialogOpen(true)
  }

  const handleReschedule = (interview: Interview) => {
    setSelectedInterview(interview)
    setIsRescheduleDialogOpen(true)
  }

  const handleCancel = (interview: Interview) => {
    setSelectedInterview(interview)
    setIsCancelDialogOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const isInterviewTime = (interviewDate: string) => {
    const now = new Date()
    const interview = new Date(interviewDate)
    return isEqual(now, interview) || (isFuture(interview) && now.getTime() - interview.getTime() <= 5 * 60 * 1000)
  }

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {interviews.map((interview) => {
          const canJoin = isInterviewTime(interview.date)
          return (
            <Card key={interview.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{interview.company}</h3>
                    <p className="text-sm text-gray-500">{interview.position}</p>
                  </div>
                  <Badge className={`${getStatusColor(interview.status)} capitalize`}>{interview.status}</Badge>
                </div>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                    <span>{format(new Date(interview.date), "PPP 'às' p", { locale: ptBR })}</span>
                  </div>
                  <div className="flex items-center">
                    <UserIcon className="mr-2 h-4 w-4 text-gray-400" />
                    <span>{interview.interviewer}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="mr-2 h-4 w-4 text-gray-400" />
                    <span>{interview.location}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 p-2 flex justify-end space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleViewDetails(interview)}>
                  Ver Detalhes
                </Button>
                {interview.status === "scheduled" && (
                  <>
                    <Button variant="outline" size="sm" onClick={() => handleReschedule(interview)}>
                      Remarcar
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleCancel(interview)}>
                      Cancelar
                    </Button>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>
                          <Button variant={canJoin ? "default" : "secondary"} size="sm" disabled={!canJoin}>
                            <VideoIcon className="h-4 w-4 mr-2" />
                            Entrar
                          </Button>
                        </span>
                      </TooltipTrigger>
                      {!canJoin && (
                        <TooltipContent>
                          <p>Só será possível entrar na entrevista na data e horário agendados</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </>
                )}
              </CardFooter>
            </Card>
          )
        })}
      </div>
      {selectedInterview && (
        <InterviewDetailsDialog
          interview={selectedInterview}
          open={isDetailsDialogOpen}
          onClose={() => setIsDetailsDialogOpen(false)}
        />
      )}
      {selectedInterview && (
        <RescheduleDialog
          interview={selectedInterview}
          open={isRescheduleDialogOpen}
          onClose={() => setIsRescheduleDialogOpen(false)}
        />
      )}
      {selectedInterview && (
        <CancelInterviewDialog
          interview={selectedInterview}
          open={isCancelDialogOpen}
          onClose={() => setIsCancelDialogOpen(false)}
        />
      )}
    </TooltipProvider>
  )
}

