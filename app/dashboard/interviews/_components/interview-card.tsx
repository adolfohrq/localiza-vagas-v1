"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { format, parseISO, isToday, isSameDay, addDays } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Interview, InterviewStatus, StatusStyle } from "../_types"
import {
  MoreHorizontal,
  Video,
  Users,
  Phone,
  Timer,
  Heart,
  Eye,
  Mail,
  Calendar,
  FileCheck,
  XCircle,
  AlertCircle,
  Clock,
  MapPin,
  Link2
} from "lucide-react"

interface InterviewCardProps {
  interview: Interview
  statusStyles: Record<InterviewStatus, StatusStyle>
  isSelected: boolean
  isFavorite: boolean
  toggleInterviewSelection: (id: string) => void
  toggleFavorite: (id: string) => void
  onSelectInterview: (id: string) => void
}

export function InterviewCard({
  interview,
  statusStyles,
  isSelected,
  isFavorite,
  toggleInterviewSelection,
  toggleFavorite,
  onSelectInterview
}: InterviewCardProps) {
  // Verifica se a entrevista está próxima (nas próximas 24h)
  const isUpcomingInterview = (date: string) => {
    const interviewDate = parseISO(date)
    const now = new Date()
    const diffInHours = (interviewDate.getTime() - now.getTime()) / (1000 * 60 * 60)
    return diffInHours > 0 && diffInHours <= 24
  }

  // Calcula o tempo até a entrevista em formato legível
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

  // Determina a cor do badge de status
  const getStatusBadgeClass = () => {
    switch (interview.status) {
      case "scheduled":
        return "bg-blue-50 text-blue-600 border-blue-200"
      case "conducted":
        return "bg-purple-50 text-purple-600 border-purple-200"
      case "completed":
        return "bg-green-50 text-green-600 border-green-200"
      case "rescheduled":
        return "bg-amber-50 text-amber-600 border-amber-200"
      case "cancelled":
        return "bg-red-50 text-red-600 border-red-200"
      default:
        return "bg-gray-50 text-gray-600 border-gray-200"
    }
  }

  // Determina o ícone do tipo de entrevista
  const getInterviewTypeIcon = () => {
    switch (interview.type) {
      case "online":
        return <Video className="h-3.5 w-3.5" />
      case "in-person":
        return <Users className="h-3.5 w-3.5" />
      case "phone":
        return <Phone className="h-3.5 w-3.5" />
      default:
        return <Video className="h-3.5 w-3.5" />
    }
  }

  // Determina a cor do badge de tipo
  const getTypeBadgeClass = () => {
    switch (interview.type) {
      case "online":
        return "bg-blue-50 text-blue-600 border-blue-200"
      case "in-person":
        return "bg-green-50 text-green-600 border-green-200"
      case "phone":
        return "bg-purple-50 text-purple-600 border-purple-200"
      default:
        return "bg-gray-50 text-gray-600 border-gray-200"
    }
  }

  // Formata a data da entrevista
  const formatInterviewDate = () => {
    if (isToday(parseISO(interview.date))) {
      return 'Hoje'
    } else if (isSameDay(parseISO(interview.date), addDays(new Date(), 1))) {
      return 'Amanhã'
    } else {
      return format(parseISO(interview.date), "dd 'de' MMMM", { locale: ptBR })
    }
  }

  return (
    <div 
      className={cn(
        "py-3 px-4 hover:bg-muted/20 transition-colors border-b last:border-b-0",
        isSelected && "bg-muted/20",
        isUpcomingInterview(interview.date) && interview.status === "scheduled" && "bg-blue-50/30",
        interview.priority === "high" && "bg-red-50/20",
        isFavorite && "bg-amber-50/20"
      )}
    >
      <div className="flex items-center gap-3">
        {/* Checkbox de seleção */}
        <Checkbox 
          id={`check-${interview.id}`}
          checked={isSelected}
          onCheckedChange={() => toggleInterviewSelection(interview.id)}
          onClick={(e) => e.stopPropagation()}
          className="mt-1"
        />
        
        {/* Avatar e informações do candidato */}
        <div className="flex-1 flex items-center gap-4">
          <div className="flex items-center gap-3 min-w-[200px]">
            <Avatar className={cn(
              "h-10 w-10",
              isUpcomingInterview(interview.date) && interview.status === "scheduled" && "ring-2 ring-blue-500 ring-offset-1"
            )}>
              <AvatarImage src={interview.candidateAvatar} />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {interview.candidateName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <div className="font-medium flex items-center gap-1.5">
                {interview.candidateName}
                {isFavorite && (
                  <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" />
                )}
                {interview.priority === "high" && (
                  <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                )}
              </div>
              <div className="text-sm text-muted-foreground">{interview.position}</div>
            </div>
          </div>
          
          {/* Badge de status */}
          <Badge
            variant="outline"
            className={cn(
              "font-medium px-2 py-0.5 h-6",
              getStatusBadgeClass()
            )}
          >
            {statusStyles[interview.status].label}
          </Badge>
          
          {/* Badge de tipo */}
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={cn(
                "font-medium px-2 py-0.5 h-6",
                getTypeBadgeClass()
              )}
            >
              {getInterviewTypeIcon()}
              <span className="ml-1.5">
                {interview.type === "online" ? "Online" : 
                interview.type === "in-person" ? "Presencial" : "Telefone"}
              </span>
            </Badge>
            
            {interview.type === "online" && interview.platform && (
              <span className="text-xs text-muted-foreground">{interview.platform}</span>
            )}
            
            {interview.type === "in-person" && interview.location && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-xs text-muted-foreground truncate max-w-[120px]">
                    <span className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {interview.location}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{interview.location}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          
          {/* Data e hora */}
          <div className="ml-auto flex items-center gap-1.5">
            <div className="text-right">
              <div className="text-sm font-medium">
                {formatInterviewDate()}
              </div>
              <div className="text-xs text-muted-foreground flex items-center justify-end">
                <Clock className="h-3 w-3 mr-1" />
                {format(parseISO(interview.date), "HH:mm")} ({interview.duration || 60} min)
              </div>
              
              {isUpcomingInterview(interview.date) && interview.status === "scheduled" && (
                <div className="text-xs text-blue-600 font-medium mt-0.5 flex items-center justify-end">
                  <Timer className="h-3 w-3 mr-1" />
                  <span>em {getHumanReadableTimeUntil(interview.date)}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Botões de ação */}
          <div className="flex items-center gap-1 ml-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 px-3 border-muted bg-white hover:bg-muted/10"
              onClick={() => onSelectInterview(interview.id)}
            >
              <Eye className="h-3.5 w-3.5 mr-1.5" />
              <span className="hidden sm:inline">Ver detalhes</span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => onSelectInterview(interview.id)}>
                  <Eye className="mr-2 h-4 w-4" />
                  <span>Ver detalhes</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Enviar mensagem</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Reagendar</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toggleFavorite(interview.id)}>
                  <Heart className={cn(
                    "mr-2 h-4 w-4",
                    isFavorite && "fill-red-500 text-red-500"
                  )} />
                  <span>{isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}</span>
                </DropdownMenuItem>
                {(interview.status === "conducted" || interview.status === "completed") && (
                  <DropdownMenuItem>
                    <FileCheck className="mr-2 h-4 w-4" />
                    <span>Registrar feedback</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <XCircle className="mr-2 h-4 w-4" />
                  <span>Cancelar entrevista</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
} 