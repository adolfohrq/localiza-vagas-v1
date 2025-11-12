"use client"

import { useState } from 'react'
import { DataTable, Column, createAvatarNameCell, createBadgeCell } from '@/components/data-table/DataTable'
import { Interview } from '../_types/types'
import { INTERVIEW_STATUS_MAP, INTERVIEW_TYPE_MAP, PRIORITY_MAP } from '../_data/constants'
import { format, parseISO, isAfter, isBefore, isPast } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { 
  Edit, 
  Eye, 
  Calendar, 
  CheckCircle, 
  X, 
  Star, 
  Clock, 
  RotateCw, 
  MoreHorizontal, 
  Heart, 
  User, 
  PencilLine, 
  CalendarDays, 
  MessageSquare,
  VideoIcon,
  MapPin,
  Play
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { InterviewStatus } from "../_types"

interface InterviewTableProps {
  interviews: Interview[]
  selectedInterviews: string[]
  favoriteInterviews: string[]
  onStatusChange: (ids: string[] | string, newStatus: InterviewStatus) => void
  onSelectInterview: (id: string) => void
  toggleInterviewSelection: (id: string) => void
  toggleFavorite: (id: string) => void
}

// Define estilos para cada status de entrevista
const interviewStatusStyles: Record<string, { label: string, variant: string, color: string }> = {
  scheduled: { label: INTERVIEW_STATUS_MAP.scheduled, variant: "outline", color: "blue" },
  completed: { label: INTERVIEW_STATUS_MAP.completed, variant: "default", color: "green" },
  cancelled: { label: INTERVIEW_STATUS_MAP.cancelled, variant: "destructive", color: "red" },
  pending_feedback: { label: INTERVIEW_STATUS_MAP.pending_feedback, variant: "secondary", color: "amber" }
}

// Define estilos para formato da entrevista
const formatStyles: Record<string, { icon: any, label: string, color: string }> = {
  online: { icon: VideoIcon, label: "Online", color: "blue" },
  presencial: { icon: MapPin, label: "Presencial", color: "green" }
}

export function InterviewTable({
  interviews,
  selectedInterviews,
  favoriteInterviews,
  onStatusChange,
  onSelectInterview,
  toggleInterviewSelection,
  toggleFavorite
}: InterviewTableProps) {
  // Função para mapear a entrevista para o formato esperado pelo componente de detalhes
  const mapInterviewForDetails = (interview: Interview) => {
    return {
      id: interview.id,
      candidateName: interview.candidate.name,
      candidateAvatar: interview.candidate.avatar,
      position: interview.job.title,
      date: interview.date,
      duration: interview.duration,
      type: interview.remote ? 'online' : 'in-person',
      status: interview.status,
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
      createdAt: '',
      updatedAt: '',
      hasFeedback: false,
      platform: interview.remote ? 'Zoom' : undefined,
      meetingUrl: interview.remote ? 'https://zoom.us/meeting' : undefined
    };
  };

  // Modificar o handler de seleção para mapear a entrevista
  const handleSelectInterview = (id: string) => {
    onSelectInterview(id);
  };

  // Definir as colunas da tabela
  const columns: Column<Interview>[] = [
    {
      key: 'candidate',
      header: 'Candidato',
      width: 3,
      searchable: true,
      cell: (interview) => (
        createAvatarNameCell(
          interview.candidate.name,
          interview.job.title,
          interview.candidate.avatar,
          interview.candidate.name.split(' ').map(n => n[0]).join(''),
          true
        )
      )
    },
    {
      key: 'status',
      header: 'Status',
      width: 2,
      searchable: true,
      cell: (interview) => {
        // Mapeando status para corresponder à imagem
        const statusMap: Record<string, { label: string, color: string }> = {
          completed: { label: "Concluída", color: "green" },
          cancelled: { label: "Cancelada", color: "red" },
          scheduled: { label: "Agendada", color: "blue" },
          pending_feedback: { label: "Feedback Pendente", color: "amber" }
        };
        
        const status = statusMap[interview.status] || { 
          label: interviewStatusStyles[interview.status]?.label || interview.status, 
          color: interviewStatusStyles[interview.status]?.color || "gray" 
        };
        
        return createBadgeCell(
          status.label,
          "outline",
          status.color
        );
      }
    },
    {
      key: 'format',
      header: 'Formato',
      width: 2,
      searchable: true,
      cell: (interview) => {
        // Determina formato baseado no campo remote
        const isRemote = interview.remote !== undefined ? interview.remote : Math.random() > 0.5;
        const format = isRemote ? "online" : "presencial";
        const formatInfo = formatStyles[format];
        
        return (
          <div className="flex items-center">
            <Badge 
              variant="outline" 
              className={cn(
                format === "online" ? "bg-blue-50 text-blue-700" : "bg-green-50 text-green-700"
              )}
            >
              <formatInfo.icon className="h-3 w-3 mr-1" />
              {formatInfo.label}
            </Badge>
          </div>
        );
      }
    },
    {
      key: 'date',
      header: 'Data',
      width: 2,
      searchable: false,
      cell: (interview) => {
        const date = new Date(interview.date);
        const formattedDate = format(date, "d 'de' MMMM", { locale: ptBR });
        const formattedTime = format(date, "HH:mm", { locale: ptBR });
        const duration = interview.duration || Math.floor(Math.random() * 50) + 30; // Duração em minutos
        
        return (
          <div className="text-sm">
            <div>{formattedDate}</div>
            <div className="text-muted-foreground">
              {formattedTime} ({duration} min)
            </div>
          </div>
        );
      }
    },
    {
      key: 'start',
      header: 'Iniciar',
      width: 2,
      searchable: false,
      cell: (interview) => {
        const date = new Date(interview.date);
        const isExpired = isPast(date);
        const canStart = interview.status === "scheduled" && !isExpired;
        
        return (
          <div className="flex flex-col items-start">
            <Button 
              variant="ghost" 
              size="sm" 
              disabled={!canStart || interview.status === "cancelled"} 
              className={cn(
                "h-8 px-2 text-xs",
                canStart ? "text-blue-600" : "text-muted-foreground"
              )}
            >
              <Play className="h-3.5 w-3.5 mr-1.5" />
              Iniciar
            </Button>
            
            {isExpired && (
              <span className="text-xs text-muted-foreground mt-1">
                Horário expirado
              </span>
            )}
          </div>
        );
      }
    },
    {
      key: 'actions',
      header: 'Ações',
      width: 1,
      searchable: false,
      cell: (interview) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={(e) => {
                e.stopPropagation();
                handleSelectInterview(interview.id);
              }}>
                <Eye className="mr-2 h-4 w-4" />
                <span>Ver detalhes</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem>
                <PencilLine className="mr-2 h-4 w-4" />
                <span>Editar entrevista</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem>
                <CalendarDays className="mr-2 h-4 w-4" />
                <span>Reagendar</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem>
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>Adicionar feedback</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              {interview.status !== 'completed' && (
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  onStatusChange([interview.id], "completed" as InterviewStatus);
                }}>
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  <span>Marcar como realizada</span>
                </DropdownMenuItem>
              )}
              
              {interview.status !== 'cancelled' && (
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  onStatusChange([interview.id], "cancelled" as InterviewStatus);
                }}>
                  <X className="mr-2 h-4 w-4 text-red-500" />
                  <span>Cancelar entrevista</span>
                </DropdownMenuItem>
              )}
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(interview.id);
              }}>
                <Heart 
                  className="mr-2 h-4 w-4" 
                  fill={favoriteInterviews.includes(interview.id) ? "currentColor" : "none"}
                />
                <span>{favoriteInterviews.includes(interview.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  ];

  // Opções de ordenação
  const sortOptions = [
    {
      id: 'recent',
      label: 'Mais recentes',
      compareFn: (a: Interview, b: Interview) => new Date(b.date).getTime() - new Date(a.date).getTime()
    },
    {
      id: 'name',
      label: 'Nome',
      compareFn: (a: Interview, b: Interview) => a.candidate.name.localeCompare(b.candidate.name)
    },
    {
      id: 'job',
      label: 'Cargo',
      compareFn: (a: Interview, b: Interview) => a.job.title.localeCompare(b.job.title)
    },
    {
      id: 'status',
      label: 'Status',
      compareFn: (a: Interview, b: Interview) => a.status.localeCompare(b.status)
    }
  ];

  // Opções de filtro
  const filterOptions = [
    {
      id: 'status',
      label: 'Status',
      options: Object.entries(interviewStatusStyles).map(([value, { label }]) => ({
        value,
        label
      })),
      filterFn: (interview: Interview, value: string) => interview.status === value
    },
    {
      id: 'type',
      label: 'Tipo',
      options: Object.entries(INTERVIEW_TYPE_MAP).map(([value, label]) => ({
        value,
        label
      })),
      filterFn: (interview: Interview, value: string) => interview.type === value
    },
    {
      id: 'format',
      label: 'Formato',
      options: [
        { value: 'remote', label: 'Online' },
        { value: 'presencial', label: 'Presencial' }
      ],
      filterFn: (interview: Interview, value: string) => {
        if (value === 'remote') return !!interview.remote;
        if (value === 'presencial') return !interview.remote;
        return true;
      }
    }
  ];

  return (
    <div>
      <DataTable
        data={interviews}
        columns={columns}
        keyExtractor={(interview) => interview.id}
        initialSelected={selectedInterviews}
        onSelectionChange={(ids) => {
          // Atualizar seleção
          ids.forEach(id => {
            if (!selectedInterviews.includes(id)) {
              toggleInterviewSelection(id);
            }
          });
          
          selectedInterviews.forEach(id => {
            if (!ids.includes(id)) {
              toggleInterviewSelection(id);
            }
          });
        }}
        onRowClick={(interview) => handleSelectInterview(interview.id)}
        sortOptions={sortOptions}
        filterOptions={filterOptions}
        searchPlaceholder="Buscar candidatos, vagas ou entrevistas..."
        emptyStateIcon={<Calendar className="h-6 w-6" />}
        emptyStateTitle="Nenhuma entrevista encontrada"
        emptyStateDescription="Ajuste os filtros ou adicione novas entrevistas."
        rowClassName={(interview) => {
          // Calcular se a entrevista está próxima (nas próximas 24 horas)
          const isUpcoming = () => {
            const interviewDate = parseISO(interview.date)
            const now = new Date()
            return isAfter(interviewDate, now) && isBefore(interviewDate, new Date(now.getTime() + 24 * 60 * 60 * 1000))
          }
          
          return isUpcoming() ? "bg-blue-50/50" : ""
        }}
      />
    </div>
  );
} 