"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog"
import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Interview, InterviewStatus } from "../_types"
import { statusStyles } from "../_data/mock-data"
import {
  X,
  Video,
  Users,
  Phone,
  Calendar,
  Clock,
  MapPin,
  Link2,
  FileText,
  Star,
  Heart,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
  RotateCcw
} from "lucide-react"
import { useState } from "react"

interface InterviewDetailsProps {
  interview: Interview | null
  open: boolean
  onClose: () => void
  onStatusChange: (id: string, newStatus: InterviewStatus) => void
}

export function InterviewDetails({
  interview,
  open,
  onClose,
  onStatusChange
}: InterviewDetailsProps) {
  const [notes, setNotes] = useState("")
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) onClose();
    }}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">Detalhes da Entrevista</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
        
        {interview && (
          <ScrollArea className="max-h-[calc(90vh-8rem)]">
            <div className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={interview.candidateAvatar} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xl font-medium">
                    {interview.candidateName?.split(' ').map(n => n[0]).join('') || '?'}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">{interview.candidateName || 'Candidato'}</h2>
                  </div>
                  
                  <div className="text-muted-foreground">{interview.position || 'Cargo não especificado'}</div>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      variant={
                        statusStyles[interview.status].variant as
                          | "default"
                          | "secondary"
                          | "outline"
                          | "destructive"
                      }
                      className={statusStyles[interview.status].color ? 
                        `bg-${statusStyles[interview.status].color}-100 text-${statusStyles[interview.status].color}-700 hover:bg-${statusStyles[interview.status].color}-200` : 
                        undefined
                      }
                    >
                      {statusStyles[interview.status].label}
                    </Badge>
                    
                    {interview.priority === "high" && (
                      <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                        <AlertCircle className="h-3 w-3 mr-1.5" />
                        Alta Prioridade
                      </Badge>
                    )}
                    
                    {interview.type === "online" ? (
                      <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                        <Video className="h-3 w-3 mr-1.5" />
                        Online
                      </Badge>
                    ) : interview.type === "in-person" ? (
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                        <Users className="h-3 w-3 mr-1.5" />
                        Presencial
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
                        <Phone className="h-3 w-3 mr-1.5" />
                        Telefone
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Informações da Entrevista</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>
                          {format(parseISO(interview.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>
                          {format(parseISO(interview.date), "HH:mm")} ({interview.duration || 60} minutos)
                        </span>
                      </div>
                      
                      {interview.type === "in-person" && interview.location && (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{interview.location}</span>
                        </div>
                      )}
                      
                      {interview.type === "online" && interview.platform && (
                        <div className="flex items-center">
                          <Link2 className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{interview.platform}</span>
                          {interview.meetingUrl && (
                            <Button variant="ghost" size="sm" className="ml-2 h-6" asChild>
                              <a href={interview.meetingUrl} target="_blank" rel="noopener noreferrer">
                                Acessar
                              </a>
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {interview.skills && interview.skills.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Habilidades</h3>
                      <div className="flex flex-wrap gap-1">
                        {interview.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="bg-muted">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {interview.resume && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Documentos</h3>
                      <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                        <a href={interview.resume} target="_blank" rel="noopener noreferrer">
                          <FileText className="h-4 w-4 mr-2" />
                          Ver Currículo
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Avaliação</h3>
                    {interview.rating ? (
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-5 w-5",
                              i < interview.rating! ? "fill-amber-400 text-amber-400" : "text-muted"
                            )}
                          />
                        ))}
                        <span className="ml-2 text-sm text-muted-foreground">
                          {interview.rating}/5
                        </span>
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        Nenhuma avaliação registrada
                      </div>
                    )}
                  </div>
                  
                  {interview.feedback && typeof interview.feedback === 'string' && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Feedback</h3>
                      <div className="text-sm p-3 bg-muted rounded-md">
                        {interview.feedback}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Anotações Rápidas</h3>
                    <Textarea
                      placeholder="Adicione anotações rápidas sobre esta entrevista..."
                      className="min-h-[100px]"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Ações</h3>
                <div className="flex flex-wrap gap-2">
                  {interview.status === "scheduled" && (
                    <>
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => onStatusChange(interview.id, "conducted")}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Marcar como Realizada
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onStatusChange(interview.id, "rescheduled")}
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Remarcar
                      </Button>
                    </>
                  )}
                  
                  {interview.status === "conducted" && (
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => onStatusChange(interview.id, "completed")}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Marcar como Concluída
                    </Button>
                  )}
                  
                  {interview.status !== "cancelled" && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => onStatusChange(interview.id, "cancelled")}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancelar Entrevista
                    </Button>
                  )}
                  
                  {interview.status === "cancelled" && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onStatusChange(interview.id, "scheduled")}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Reagendar
                    </Button>
                  )}
                  
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  )
} 