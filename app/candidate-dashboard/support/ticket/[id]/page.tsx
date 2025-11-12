"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { 
  ArrowLeft, Paperclip, Send, CheckCircle, Calendar, Clock, X,
  MoreHorizontal, MessageSquare, Download, ChevronDown, ChevronUp, Smile
} from "lucide-react"

// Interfaces
interface Ticket {
  id: string
  title: string
  status: string
  priority: string
  category: string
  created: string
  updated: string
  description: string
}

interface Interaction {
  id: string
  user: string
  userRole: string
  avatar: string
  date: string
  content: string
  attachments?: { name: string, size: string, type: string }[]
}

// Nova interface para mensagens agrupadas
interface MessageGroup {
  user: string
  userRole: string
  isCandidate: boolean
  avatar: string
  messages: {
    id: string
    content: string
    date: string
    time: string
    attachments?: { name: string, size: string, type: string }[]
  }[]
}

export default function TicketDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState("")
  const [interactions, setInteractions] = useState<Interaction[]>([])
  const [showAttachmentDialog, setShowAttachmentDialog] = useState(false)
  const [attachmentName, setAttachmentName] = useState("")
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null)
  const [showDescription, setShowDescription] = useState(true)
  const [messageGroups, setMessageGroups] = useState<MessageGroup[]>([])
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  // Simular carregamento de dados do ticket
  useEffect(() => {
    // Em um ambiente real, isso seria uma chamada de API
    const fetchTicket = () => {
      // Simulando dados do ticket
      const mockTicket: Ticket = {
        id: params.id,
        title: "Problema ao publicar vaga",
        status: "em_andamento",
        priority: "alta",
        category: "publicação",
        created: "2023-10-15",
        updated: "2023-10-16",
        description: "Não consigo finalizar a publicação de uma nova vaga. O sistema trava na etapa de revisão. Já tentei em diferentes navegadores e o problema persiste."
      }

      // Simulando interações
      const mockInteractions: Interaction[] = [
        {
          id: "1",
          user: "Ana Oliveira",
          userRole: "Candidato",
          avatar: "",
          date: "2023-10-15 14:30",
          content: "Estou enfrentando dificuldades para completar meu perfil. Quando tento adicionar experiências de trabalho, o formulário não salva corretamente.",
          attachments: [
            { name: "erro_screenshot.png", size: "1.2 MB", type: "image/png" }
          ]
        },
        {
          id: "2",
          user: "Suporte Localiza Vagas",
          userRole: "Suporte",
          avatar: "",
          date: "2023-10-15 15:45",
          content: "Olá, obrigado por reportar o problema. Poderia me informar qual navegador e sistema operacional está utilizando? Também seria útil saber se aparece alguma mensagem de erro específica."
        },
        {
          id: "3",
          user: "Ana Oliveira",
          userRole: "Candidato",
          avatar: "",
          date: "2023-10-15 16:20",
          content: "Estou usando o Chrome versão 96 no Windows 10. Não aparece nenhuma mensagem de erro, a página simplesmente fica carregando indefinidamente após clicar em 'Salvar Experiência'."
        },
        {
          id: "4",
          user: "Suporte Localiza Vagas",
          userRole: "Suporte",
          avatar: "",
          date: "2023-10-16 09:10",
          content: "Consegui reproduzir o problema e já encaminhei para nossa equipe de desenvolvimento. Eles identificaram um bug na validação de formulários e estão trabalhando na correção. Devo ter uma atualização para você até o final do dia."
        }
      ]

      setTicket(mockTicket)
      setInteractions(mockInteractions)
      setLoading(false)
    }

    fetchTicket()
  }, [params.id])

  // Agrupar mensagens do mesmo usuário em sequência
  useEffect(() => {
    if (interactions.length === 0) return

    const groups: MessageGroup[] = []
    let currentGroup: MessageGroup | null = null

    // Pulamos o primeiro item (descrição original) e processamos as interações
    interactions.slice(1).forEach((interaction) => {
      const isCandidate = interaction.user === "Ana Oliveira"
      const time = interaction.date.split(' ')[1]
      const date = interaction.date.split(' ')[0]

      // Se não temos grupo atual ou o usuário mudou, criamos um novo grupo
      if (!currentGroup || currentGroup.user !== interaction.user) {
        currentGroup = {
          user: interaction.user,
          userRole: interaction.userRole,
          isCandidate,
          avatar: interaction.avatar,
          messages: [{
            id: interaction.id,
            content: interaction.content,
            date,
            time,
            attachments: interaction.attachments
          }]
        }
        groups.push(currentGroup)
      } else {
        // Adicionamos a mensagem ao grupo atual
        currentGroup.messages.push({
          id: interaction.id,
          content: interaction.content,
          date,
          time,
          attachments: interaction.attachments
        })
      }
    })

    setMessageGroups(groups)
  }, [interactions])

  // Função para obter a cor do badge de status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aberto":
        return <Badge variant="outline" className="border-blue-200 text-blue-600 bg-blue-50/50">Aberto</Badge>
      case "em_andamento":
        return <Badge variant="outline" className="border-amber-200 text-amber-600 bg-amber-50/50">Em Andamento</Badge>
      case "pendente":
        return <Badge variant="outline" className="border-orange-200 text-orange-600 bg-orange-50/50">Pendente</Badge>
      case "resolvido":
        return <Badge variant="outline" className="border-green-200 text-green-600 bg-green-50/50">Resolvido</Badge>
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  // Função para obter a cor do badge de prioridade
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "alta":
        return <Badge variant="outline" className="border-red-200 text-red-600 bg-red-50/50">Alta</Badge>
      case "média":
        return <Badge variant="outline" className="border-yellow-200 text-yellow-600 bg-yellow-50/50">Média</Badge>
      case "baixa":
        return <Badge variant="outline" className="border-green-200 text-green-600 bg-green-50/50">Baixa</Badge>
      default:
        return <Badge variant="outline">Desconhecida</Badge>
    }
  }

  // Função para adicionar novo comentário
  const handleAddComment = () => {
    if (!newComment.trim()) return

    const newInteraction: Interaction = {
      id: `${interactions.length + 1}`,
      user: "Ana Oliveira",
      userRole: "Candidato",
      avatar: "",
      date: new Date().toLocaleString(),
      content: newComment
    }

    setInteractions([...interactions, newInteraction])
    setNewComment("")
    
    // Simulação de resposta automática
    setTimeout(() => {
      const autoResponse: Interaction = {
        id: `${interactions.length + 2}`,
        user: "Sistema",
        userRole: "Automático",
        avatar: "",
        date: new Date().toLocaleString(),
        content: "Sua mensagem foi recebida. Um agente de suporte responderá em breve."
      }
      setInteractions(prev => [...prev, autoResponse])
    }, 1000)
  }

  // Função para lidar com anexos
  const handleAttachment = () => {
    if (!attachmentName.trim() || !attachmentFile) {
      alert("Por favor, selecione um arquivo e forneça um nome para o anexo.");
      return;
    }

    const newInteraction: Interaction = {
      id: `${interactions.length + 1}`,
      user: "Ana Oliveira",
      userRole: "Candidato",
      avatar: "",
      date: new Date().toLocaleString(),
      content: "Anexo adicionado ao ticket.",
      attachments: [
        { 
          name: attachmentName, 
          size: `${Math.round(attachmentFile.size / 1024)} KB`, 
          type: attachmentFile.type 
        }
      ]
    }

    setInteractions([...interactions, newInteraction])
    setShowAttachmentDialog(false)
    setAttachmentName("")
    setAttachmentFile(null)
  }

  // Função para marcar ticket como resolvido
  const markAsResolved = () => {
    if (ticket) {
      setTicket({
        ...ticket,
        status: "resolvido",
        updated: new Date().toISOString().split('T')[0]
      })
      
      const newInteraction: Interaction = {
        id: `${interactions.length + 1}`,
        user: "Ana Oliveira",
        userRole: "Candidato",
        avatar: "",
        date: new Date().toLocaleString(),
        content: "Ticket marcado como resolvido pelo candidato."
      }
      
      setInteractions([...interactions, newInteraction])
    }
  }

  // Formatar data relativa
  const formatRelativeDate = (dateString: string) => {
    const today = new Date().toISOString().split('T')[0];
    if (dateString === today) return "hoje";
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (dateString === yesterday.toISOString().split('T')[0]) return "ontem";
    
    return dateString;
  }

  // Função para adicionar emoji ao texto
  const addEmoji = (emoji: string) => {
    setNewComment(prev => prev + emoji)
    setShowEmojiPicker(false)
  }

  // Carregando
  if (loading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="h-8 w-8 rounded-full border-t-2 border-primary animate-spin"></div>
        </div>
      </DashboardShell>
    )
  }

  // Ticket não encontrado
  if (!ticket) {
    return (
      <DashboardShell>
        <Button onClick={() => router.push('/candidate-dashboard/support')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      {/* Cabeçalho simples e elegante */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => router.push('/candidate-dashboard/support')} className="rounded-full h-8 w-8 p-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-base font-medium">
            <span className="text-muted-foreground mr-1.5 text-sm">{ticket.id}</span>
            {ticket.title}
          </h2>
        </div>
        <div className="flex items-center gap-1.5">
          {getStatusBadge(ticket.status)}
          
          {ticket.status !== "resolvido" && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" variant="ghost" onClick={markAsResolved} className="text-green-600 h-7 w-7 p-0 rounded-full">
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="text-xs">Marcar como resolvido</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>

      {/* Barra de informações super compacta */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3 text-xs text-muted-foreground">
        <div className="flex items-center">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Criado: {formatRelativeDate(ticket.created)}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          <span>Atualizado: {formatRelativeDate(ticket.updated)}</span>
        </div>
        <div>
          <span>Categoria: {ticket.category}</span>
        </div>
      </div>
      
      {/* Descrição com toggle para expandir/recolher */}
      <div className="mb-4 bg-white border border-slate-100 rounded-md overflow-hidden shadow-sm">
        <div className="flex justify-between items-center px-3 py-2 border-b">
          <div className="text-xs font-medium">Descrição do problema</div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowDescription(!showDescription)} 
            className="h-6 w-6 p-0"
          >
            {showDescription ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </Button>
        </div>
        {showDescription && (
          <div className="p-3 text-sm">
            {ticket.description}
          </div>
        )}
      </div>

      {/* Interface de chat moderna com grupos de mensagens */}
      <div className="mb-4 bg-white border rounded-md shadow-sm overflow-hidden">
        <div className="flex justify-between items-center px-3 py-2 border-b">
          <div className="text-xs font-medium">Histórico de Conversa</div>
        </div>
        
        <div className="bg-slate-50/60 p-3">
          <div className="space-y-6 max-h-[420px] overflow-y-auto px-1 py-2">
            {messageGroups.map((group, groupIndex) => (
              <div key={groupIndex} className={`flex ${group.isCandidate ? "justify-end" : "justify-start"}`}>
                {!group.isCandidate && (
                  <div className="mr-2 flex-shrink-0">
                    <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                      {group.user === "Sistema" ? (
                        <AvatarFallback className="bg-slate-200 text-slate-600 text-[10px]">SIS</AvatarFallback>
                      ) : (
                        <AvatarFallback className="bg-blue-100 text-blue-700 text-[10px]">LV</AvatarFallback>
                      )}
                    </Avatar>
                  </div>
                )}
                
                <div className={`flex flex-col max-w-[75%] gap-1`}>
                  <div className={`text-[10px] font-medium ${group.isCandidate ? "text-right mr-1" : "ml-1"} text-muted-foreground`}>
                    {group.isCandidate ? "Você" : group.user === "Sistema" ? "Sistema" : "Suporte Localiza Vagas"}
                  </div>
                  
                  {group.messages.map((message, messageIndex) => (
                    <div 
                      key={message.id}
                      className={`
                        relative 
                        px-3 py-2 
                        ${messageIndex === 0 ? 
                          (group.isCandidate ? "rounded-tl-2xl rounded-bl-2xl rounded-tr-md" : "rounded-tr-2xl rounded-br-2xl rounded-tl-md") : 
                          messageIndex === group.messages.length - 1 ? 
                            (group.isCandidate ? "rounded-tl-2xl rounded-bl-2xl rounded-br-md" : "rounded-tr-2xl rounded-br-2xl rounded-bl-md") : 
                            (group.isCandidate ? "rounded-tl-2xl rounded-bl-2xl" : "rounded-tr-2xl rounded-br-2xl")
                        }
                        ${messageIndex === group.messages.length - 1 ? "mb-0" : "mb-1"}
                        ${group.isCandidate ? 
                          "bg-gradient-to-br from-primary/10 to-primary/5 text-primary border border-primary/10" : 
                          group.user === "Sistema" ? 
                            "bg-muted/20 text-muted-foreground border border-muted/20" : 
                            "bg-white text-foreground border border-slate-100 shadow-sm"
                        }
                      `}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-2 text-xs py-1.5 px-2 bg-white/80 rounded-md border border-slate-200 flex items-center">
                          <div className="flex items-center gap-1.5 truncate flex-1">
                            <div className="h-6 w-6 bg-slate-100 rounded flex items-center justify-center">
                              <Paperclip className="h-3 w-3 text-slate-500" />
                            </div>
                            <div className="flex flex-col">
                              <span className="truncate font-medium">{message.attachments[0].name}</span>
                              <span className="text-[9px] text-muted-foreground">{message.attachments[0].size}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="h-6 w-6 ml-2 p-0 rounded-full">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Data da mensagem mais recente do grupo */}
                  <div className={`text-[9px] mt-0.5 text-muted-foreground ${group.isCandidate ? "text-right mr-1" : "ml-1"}`}>
                    {formatRelativeDate(group.messages[group.messages.length - 1].date)}
                  </div>
                </div>
                
                {group.isCandidate && (
                  <div className="ml-2 flex-shrink-0">
                    <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                      <AvatarFallback className="bg-primary/10 text-primary text-[10px]">AO</AvatarFallback>
                    </Avatar>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Área de digitação */}
        <div className="p-3 border-t bg-white">
          <div className="relative">
            <Textarea 
              placeholder="Digite sua resposta..." 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[60px] resize-none pr-24 bg-slate-50/80 border-slate-200 focus-visible:ring-primary/30"
            />
            <div className="absolute right-2 bottom-2 flex items-center gap-1">
              <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full text-muted-foreground hover:text-foreground hover:bg-slate-100">
                    <Smile className="h-3.5 w-3.5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-2" align="end" alignOffset={-40}>
                  <div className="text-xs font-medium mb-1.5 text-muted-foreground">Emojis</div>
                  <div className="grid grid-cols-6 gap-1">
                    {["😊", "👍", "🙂", "😁", "🎉", "👏", "🤔", "😢", "❤️", "👌", "🙏", "😎", "🔥", "✅", "⭐", "⚠️", "❓", "📎"].map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => addEmoji(emoji)}
                        className="h-7 w-7 flex items-center justify-center rounded hover:bg-slate-100 cursor-pointer text-base"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 pt-1.5 border-t text-xs text-muted-foreground">
                    <span>Clique para adicionar</span>
                    <button 
                      onClick={() => setShowEmojiPicker(false)}
                      className="text-xs text-primary hover:underline"
                    >
                      Fechar
                    </button>
                  </div>
                </PopoverContent>
              </Popover>

              <Dialog open={showAttachmentDialog} onOpenChange={setShowAttachmentDialog}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full text-muted-foreground hover:text-foreground hover:bg-slate-100">
                    <Paperclip className="h-3.5 w-3.5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[400px]">
                  <DialogHeader>
                    <DialogTitle>Anexar arquivo</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3 py-2">
                    <div className="grid gap-1.5">
                      <Label htmlFor="attachment-file" className="text-xs">Arquivo</Label>
                      <Input
                        id="attachment-file"
                        type="file"
                        className="text-xs"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setAttachmentFile(e.target.files[0]);
                            setAttachmentName(e.target.files[0].name);
                          }
                        }}
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="attachment-name" className="text-xs">Nome (opcional)</Label>
                      <Input
                        id="attachment-name"
                        placeholder="Nome personalizado"
                        value={attachmentName}
                        onChange={(e) => setAttachmentName(e.target.value)}
                        className="text-xs"
                      />
                    </div>
                  </div>
                  <DialogFooter className="mt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowAttachmentDialog(false)} 
                      className="h-7 text-xs"
                    >
                      <X className="h-3.5 w-3.5 mr-1" />
                      Cancelar
                    </Button>
                    <Button onClick={handleAttachment} size="sm" className="h-7 text-xs">
                      <Paperclip className="h-3.5 w-3.5 mr-1" />
                      Anexar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button 
                disabled={newComment.trim().length === 0}
                onClick={handleAddComment}
                size="sm"
                className={`h-7 rounded-full transition-colors ${newComment.trim().length > 0 ? "bg-primary" : "bg-muted text-muted-foreground"}`}
              >
                <Send className="h-3.5 w-3.5 mr-1" />
                <span>Enviar</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé discreto */}
      <div className="text-center text-[10px] text-muted-foreground mt-6 pt-2 border-t">
        <div className="flex justify-center items-center gap-1">
          <MessageSquare className="h-3 w-3" />
          <span>Precisa de ajuda? 0800-123-4567</span>
        </div>
      </div>
    </DashboardShell>
  )
} 