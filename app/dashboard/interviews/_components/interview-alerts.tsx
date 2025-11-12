"use client"

import { Button } from "@/components/ui/button"
import { Interview, InterviewStats } from "../_types"
import { AlertCircle, FileCheck, Bell, X } from "lucide-react"
import { format, parseISO } from "date-fns"
import { Dispatch, SetStateAction } from "react"

interface InterviewAlertsProps {
  stats: InterviewStats
  notificationsEnabled: boolean
  showBanner: boolean
  setShowBanner: Dispatch<SetStateAction<boolean>>
  upcomingInterviews: Interview[]
  setSelectedCandidateId: Dispatch<SetStateAction<string | null>>
}

export function InterviewAlerts({ 
  stats, 
  notificationsEnabled, 
  showBanner, 
  setShowBanner,
  upcomingInterviews = [],
  setSelectedCandidateId
}: InterviewAlertsProps) {
  return (
    <>
      {/* Sistema de alertas para entrevistas próximas */}
      {stats.todayInterviews > 0 && (
        <div className="bg-blue-50 border-l-4 border-l-blue-500 rounded-lg px-4 py-3 flex items-start space-x-3 text-blue-800 mb-4">
          <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <p className="font-medium">Você tem {stats.todayInterviews} entrevista{stats.todayInterviews > 1 ? 's' : ''} hoje</p>
            <p className="text-sm text-blue-700 mt-0.5">
              {stats.nextHourInterviews > 0 
                ? `${stats.nextHourInterviews} entrevista${stats.nextHourInterviews > 1 ? 's' : ''} na próxima hora. Prepare-se!` 
                : "Certifique-se de revisar o perfil dos candidatos antes das entrevistas"}
            </p>
          </div>
        </div>
      )}

      {/* Banner de notificação para entrevistas próximas */}
      {notificationsEnabled && showBanner && upcomingInterviews.length > 0 && (
        <div className="mb-4 rounded-lg border border-orange-200 bg-orange-50 p-4 relative">
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute right-1 top-1 h-6 w-6 p-0 rounded-full"
            onClick={() => setShowBanner(false)}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Fechar</span>
          </Button>
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-orange-800">
                {upcomingInterviews.length === 1 
                  ? "Uma entrevista agendada na próxima hora" 
                  : `${upcomingInterviews.length} entrevistas agendadas na próxima hora`}
              </h3>
              <div className="mt-1.5 text-sm text-orange-700">
                <ul className="space-y-1 list-disc list-inside">
                  {upcomingInterviews.slice(0, 3).map(interview => (
                    <li key={interview.id}>
                      <span className="font-medium">{interview.candidateName}</span> às{" "}
                      <span className="font-medium">{format(parseISO(interview.date), "HH:mm")}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-orange-800 h-auto p-0 font-normal underline ml-2"
                        onClick={() => {
                          setSelectedCandidateId(interview.id);
                          setShowBanner(false);
                        }}
                      >
                        Ver detalhes
                      </Button>
                    </li>
                  ))}
                  {upcomingInterviews.length > 3 && (
                    <li className="text-orange-600">
                      E mais {upcomingInterviews.length - 3} entrevista(s)...
                    </li>
                  )}
                </ul>
              </div>
              <div className="mt-2">
                <Button size="sm" className="h-7 bg-orange-100 hover:bg-orange-200 text-orange-800 border-orange-200">
                  <Bell className="h-3.5 w-3.5 mr-1.5" />
                  Configurar lembretes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 