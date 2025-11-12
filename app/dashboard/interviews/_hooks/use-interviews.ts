"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Interview as InterviewTable } from "../_types/types"
import { Interview as InterviewDetails, InterviewStatus } from "../_types"
import { initialInterviews, statusStyles } from "../_data/mock-data"
import { toast } from "@/components/ui/use-toast"
import { 
  format, parseISO, isSameDay, addDays, isAfter, isBefore, isToday, 
  startOfDay, compareAsc, differenceInDays, differenceInMinutes, 
  isWithinInterval, formatDistanceToNow, subMinutes, addMinutes, 
  addHours, getDay 
} from "date-fns"
import { ptBR } from "date-fns/locale"

export function useInterviews(initialInterviewsData = initialInterviews) {
  // Estados básicos
  const [interviews, setInterviews] = useState<InterviewTable[]>(initialInterviewsData as any)
  const [selectedInterview, setSelectedInterview] = useState<InterviewDetails | null>(null)
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null)
  const [favoriteInterviews, setFavoriteInterviews] = useState<string[]>([])
  const [quickNotes, setQuickNotes] = useState<Record<string, string>>({})
  
  // Estados para seleção de entrevistas
  const [selectedInterviews, setSelectedInterviews] = useState<string[]>([])
  const [showBatchActions, setShowBatchActions] = useState(false)
  
  // Estado para agendamento
  const [isSchedulingOpen, setIsSchedulingOpen] = useState(false)

  // Verifica se existem entrevistas muito próximas
  const upcomingInterviewsInNextHour = useMemo(() => {
    const now = new Date();
    const oneHourLater = addHours(now, 1);
    
    return interviews
      .filter(interview => 
        interview.status === "scheduled" &&
        isAfter(parseISO(interview.date), now) &&
        isBefore(parseISO(interview.date), oneHourLater)
      )
      .sort((a, b) => compareAsc(parseISO(a.date), parseISO(b.date)));
  }, [interviews]);

  // Função para alterar status da entrevista
  const handleStatusChange = (ids: string[] | string, newStatus: InterviewStatus) => {
    // Converter para array se for uma string única
    const interviewIds = Array.isArray(ids) ? ids : [ids];
    
    setInterviews(
      interviews.map((interview) => {
        if (interviewIds.includes(interview.id)) {
          return { 
            ...interview, 
            status: newStatus as any
          };
        }
        return interview;
      })
    );
    
    // Se a entrevista selecionada for uma das que está sendo alterada, atualizar também
    if (selectedInterview && interviewIds.includes(selectedInterview.id)) {
      setSelectedInterview({
        ...selectedInterview,
        status: newStatus
      });
    }
    
    // Mostrar toast de confirmação
    const pluralSuffix = interviewIds.length > 1 ? "s" : "";
    
    toast({
      title: "Status atualizado",
      description: `Entrevista${pluralSuffix} ${newStatus === "completed" ? "marcada como realizada" : 
                    newStatus === "cancelled" ? "cancelada" : 
                    "atualizada"}${pluralSuffix} com sucesso.`,
    });
  };

  // Função para atualizar nota rápida
  const updateQuickNote = (interviewId: string, note: string) => {
    setQuickNotes(prev => ({
      ...prev,
      [interviewId]: note
    }))
  }

  // Função para favoritar/desfavoritar entrevista
  const toggleFavorite = (interviewId: string) => {
    setFavoriteInterviews(prev => 
      prev.includes(interviewId) 
        ? prev.filter(id => id !== interviewId)
        : [...prev, interviewId]
    )
  }

  // Função para verificar se uma entrevista está próxima (nas próximas 24h)
  const isUpcomingInterview = (date: string) => {
    const interviewDate = parseISO(date)
    const now = new Date()
    const diffInHours = (interviewDate.getTime() - now.getTime()) / (1000 * 60 * 60)
    return diffInHours > 0 && diffInHours <= 24
  }

  // Função para calcular tempo até a entrevista em formato legível
  const getHumanReadableTimeUntil = (date: string) => {
    const interviewDate = parseISO(date)
    const now = new Date()
    const diffInMinutes = Math.round((interviewDate.getTime() - now.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutos`
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    const remainingMinutes = diffInMinutes % 60
    
    if (diffInHours < 24) {
      return `${diffInHours}h${remainingMinutes > 0 ? ` ${remainingMinutes}min` : ''}`
    }
    
    const diffInDays = Math.floor(diffInHours / 24)
    const remainingHours = diffInHours % 24
    
    return `${diffInDays} dias${remainingHours > 0 ? ` ${remainingHours}h` : ''}`
  }

  // Função para verificar se a entrevista pode ser iniciada
  const canStartInterview = (interview: InterviewDetails) => {
    // Verifica se está agendada e ainda não foi realizada
    const interviewDateTime = parseISO(interview.date);
    const now = new Date();
    
    // Cria um intervalo de tempo: 5 minutos antes até 30 minutos depois do horário agendado
    const startWindow = subMinutes(interviewDateTime, 5);
    const endWindow = addMinutes(interviewDateTime, 30);
    
    return (
      interview.status === "scheduled" && 
      isWithinInterval(now, { start: startWindow, end: endWindow }) &&
      !interview.hasFeedback
    )
  }

  // Função para verificar se a entrevista estará disponível em breve
  const willBeAvailableSoon = (interview: InterviewDetails) => {
    const interviewDateTime = parseISO(interview.date);
    const now = new Date();
    const startWindow = subMinutes(interviewDateTime, 5);
    
    // Verifica se está a menos de 15 minutos de ficar disponível
    return (
      interview.status === "scheduled" &&
      isBefore(now, startWindow) &&
      differenceInMinutes(startWindow, now) <= 15
    );
  }
  
  // Função para gerar a mensagem de status de disponibilidade da entrevista
  const getAvailabilityStatus = (interview: InterviewDetails) => {
    const interviewDateTime = parseISO(interview.date);
    const now = new Date();
    const startWindow = subMinutes(interviewDateTime, 5);
    const endWindow = addMinutes(interviewDateTime, 30);
    
    if (canStartInterview(interview)) {
      return "Disponível agora";
    } else if (willBeAvailableSoon(interview)) {
      const minutesUntilAvailable = differenceInMinutes(startWindow, now);
      return `Disponível em ${minutesUntilAvailable} ${minutesUntilAvailable === 1 ? 'minuto' : 'minutos'}`;
    } else if (isBefore(now, interviewDateTime)) {
      return format(interviewDateTime, "'Disponível em' dd/MM 'às' HH:mm", { locale: ptBR });
    } else if (isAfter(now, endWindow)) {
      return "Horário expirado";
    } else {
      return "Não disponível";
    }
  }

  // Funções para manipulação de entrevistas selecionadas
  const toggleInterviewSelection = (interviewId: string) => {
    setSelectedInterviews(prev => 
      prev.includes(interviewId) 
        ? prev.filter(id => id !== interviewId) 
        : [...prev, interviewId]
    )
  }

  const toggleAllInterviews = (filteredInterviews: InterviewTable[]) => {
    if (selectedInterviews.length === filteredInterviews.length) {
      setSelectedInterviews([])
    } else {
      setSelectedInterviews(filteredInterviews.map(interview => interview.id))
    }
  }

  // Efeito para mostrar/esconder ações em lote
  useEffect(() => {
    setShowBatchActions(selectedInterviews.length > 0)
  }, [selectedInterviews])

  // Entrevistas que ocorrerão na próxima hora
  const upcomingInterviews = useMemo(() => {
    return interviews.filter(interview => 
      interview.status === "scheduled" && isUpcomingInterview(interview.date)
    );
  }, [interviews]);

  // Atualizar notas rápidas para uma entrevista
  const updateQuickNotes = useCallback((id: string, notes: string) => {
    setQuickNotes(prev => ({
      ...prev,
      [id]: notes
    }));
  }, []);

  // Efeito para atualizar a entrevista selecionada quando o ID muda
  useEffect(() => {
    if (selectedCandidateId) {
      const interview = interviews.find(i => i.id === selectedCandidateId);
      if (interview) {
        // Mapear a entrevista para o formato esperado pelo componente de detalhes
        const mappedInterview: InterviewDetails = {
          id: interview.id,
          candidateName: interview.candidate.name,
          candidateAvatar: interview.candidate.avatar,
          position: interview.job.title,
          date: interview.date,
          duration: interview.duration,
          type: interview.remote ? 'online' : 'in-person',
          status: interview.status as InterviewStatus,
          priority: interview.priority,
          location: interview.location,
          email: interview.candidate.email,
          phone: interview.candidate.phone,
          experience: '',
          education: '',
          skills: [],
          jobId: interview.job.id,
          jobTitle: interview.job.title,
          notes: interview.notes,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          hasFeedback: false,
          platform: interview.remote ? 'Zoom' : undefined,
          meetingUrl: interview.remote ? 'https://zoom.us/meeting' : undefined
        };
        setSelectedInterview(mappedInterview);
      } else {
        setSelectedInterview(null);
      }
    } else {
      setSelectedInterview(null);
    }
  }, [selectedCandidateId, interviews]);

  return {
    interviews,
    setInterviews,
    selectedInterview,
    setSelectedInterview,
    selectedCandidateId,
    setSelectedCandidateId,
    favoriteInterviews,
    quickNotes,
    selectedInterviews,
    setSelectedInterviews,
    upcomingInterviewsInNextHour,
    handleStatusChange,
    updateQuickNotes,
    toggleFavorite,
    isUpcomingInterview,
    getHumanReadableTimeUntil,
    canStartInterview,
    willBeAvailableSoon,
    getAvailabilityStatus,
    toggleInterviewSelection,
    toggleAllInterviews,
    isSchedulingOpen,
    setIsSchedulingOpen,
    showBatchActions,
    setShowBatchActions,
    upcomingInterviews
  }
}