"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search, 
  MessageSquare, 
  Send, 
  Paperclip, 
  Image as ImageIcon, 
  Smile, 
  MoreVertical, 
  Info, 
  Star, 
  Archive, 
  Trash2, 
  Plus, 
  Filter, 
  ChevronDown,
  CheckCheck,
  Clock,
  Circle,
  X,
  ArrowLeft,
  ArrowRight,
  Bell,
  BellOff,
  Bookmark,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Keyboard,
  ArchiveRestore,
  MapPin,
  Briefcase,
  Users,
  Globe,
  Phone,
  Mail,
  Linkedin,
  Facebook,
  Twitter
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

// Dados simulados para contatos
const contacts = [
  { 
    id: 1, 
    name: "TechSolutions", 
    company: "Tecnologia", 
    city: "São Paulo",
    state: "SP",
    avatar: "https://avatars.githubusercontent.com/u/1?v=4", 
    status: "online",
    lastMessage: "Olá! Gostaríamos de agendar uma entrevista para a vaga de UX Designer. Você tem disponibilidade esta semana?",
    time: "15 min atrás",
    unread: true,
    isStarred: true,
    isCompany: true,
    isArchived: false
  },
  { 
    id: 2, 
    name: "Inovação Digital", 
    company: "Software", 
    city: "Rio de Janeiro",
    state: "RJ",
    avatar: "https://avatars.githubusercontent.com/u/2?v=4", 
    status: "online",
    lastMessage: "Seu perfil chamou nossa atenção! Temos uma vaga que combina com suas habilidades. Podemos conversar sobre isso?",
    time: "2 horas atrás",
    unread: true,
    isStarred: false,
    isCompany: true,
    isArchived: false
  },
  { 
    id: 3, 
    name: "Empresa ABC", 
    company: "Consultoria", 
    city: "Belo Horizonte",
    state: "MG",
    avatar: "https://avatars.githubusercontent.com/u/3?v=4", 
    status: "offline",
    lastMessage: "Obrigada por se candidatar à nossa vaga. Gostaríamos de saber mais sobre sua experiência com React.",
    time: "2 dias atrás",
    unread: false,
    isStarred: true,
    isCompany: true,
    isArchived: false
  },
  { 
    id: 4, 
    name: "Dev Solutions", 
    company: "Desenvolvimento", 
    city: "Curitiba",
    state: "PR",
    avatar: "https://avatars.githubusercontent.com/u/4?v=4", 
    status: "away",
    lastMessage: "Vamos agendar uma call para discutir os detalhes do projeto?",
    time: "3 dias atrás",
    unread: false,
    isStarred: false,
    isCompany: true,
    isArchived: true
  },
  { 
    id: 5, 
    name: "LocalizaVagas", 
    company: "Recrutamento", 
    city: "Florianópolis",
    state: "SC",
    avatar: "https://avatars.githubusercontent.com/u/5?v=4", 
    status: "offline",
    lastMessage: "Seu currículo foi atualizado com sucesso! Confira as novas vagas disponíveis.",
    time: "1 semana atrás",
    unread: false,
    isStarred: false,
    isCompany: true,
    isArchived: true
  },
]

// Dados simulados para mensagens
const messageHistory = [
  {
    id: 1,
    contactId: 1,
    messages: [
      {
        id: 1,
        sender: "contact",
        text: "Olá! Tudo bem?",
        time: "10:30",
        date: "Ontem",
        status: "read"
      },
      {
        id: 2,
        sender: "user",
        text: "Olá Ana! Tudo ótimo, e com você?",
        time: "10:32",
        date: "Ontem",
        status: "read"
      },
      {
        id: 3,
        sender: "contact",
        text: "Estou bem, obrigada! Estou entrando em contato porque seu perfil chamou nossa atenção para a vaga de UX Designer na TechSolutions.",
        time: "10:35",
        date: "Ontem",
        status: "read"
      },
      {
        id: 4,
        sender: "contact",
        text: "Gostaríamos de agendar uma entrevista para esta semana. Você teria disponibilidade?",
        time: "10:36",
        date: "Ontem",
        status: "read"
      },
      {
        id: 5,
        sender: "user",
        text: "Com certeza! Tenho disponibilidade na quinta e sexta-feira, no período da tarde.",
        time: "10:40",
        date: "Ontem",
        status: "read"
      },
      {
        id: 6,
        sender: "contact",
        text: "Perfeito! Podemos agendar para quinta-feira às 14h então?",
        time: "10:45",
        date: "Ontem",
        status: "read"
      },
      {
        id: 7,
        sender: "user",
        text: "Sim, quinta-feira às 14h está ótimo para mim!",
        time: "10:50",
        date: "Ontem",
        status: "read"
      },
      {
        id: 8,
        sender: "contact",
        text: "Excelente! Vou enviar um convite por e-mail com o link da reunião. Será uma entrevista com o time de design, com duração aproximada de 1 hora.",
        time: "10:55",
        date: "Ontem",
        status: "read"
      },
      {
        id: 9,
        sender: "contact",
        text: "Você poderia me confirmar seu e-mail para envio do convite?",
        time: "10:56",
        date: "Ontem",
        status: "read"
      },
      {
        id: 10,
        sender: "user",
        text: "Claro! Meu e-mail é usuario@exemplo.com",
        time: "11:00",
        date: "Ontem",
        status: "read"
      },
      {
        id: 11,
        sender: "contact",
        text: "Obrigada! Acabei de enviar o convite. Você tem alguma dúvida sobre a entrevista ou a vaga?",
        time: "11:05",
        date: "Ontem",
        status: "read"
      },
      {
        id: 12,
        sender: "user",
        text: "Gostaria de saber mais sobre as responsabilidades da posição e as tecnologias utilizadas pela equipe.",
        time: "11:10",
        date: "Ontem",
        status: "read"
      },
      {
        id: 13,
        sender: "contact",
        text: "Claro! Como UX Designer, você trabalhará diretamente com o time de produto e desenvolvimento para criar experiências intuitivas e atraentes para nossos usuários.",
        time: "11:15",
        date: "Ontem",
        status: "read"
      },
      {
        id: 14,
        sender: "contact",
        text: "Utilizamos principalmente Figma para prototipagem, e trabalhamos com metodologias ágeis. Você terá a oportunidade de participar de pesquisas com usuários e testes de usabilidade.",
        time: "11:16",
        date: "Ontem",
        status: "read"
      },
      {
        id: 15,
        sender: "contact",
        text: "Olá! Gostaríamos de agendar uma entrevista para a vaga de UX Designer. Você tem disponibilidade esta semana?",
        time: "09:30",
        date: "Hoje",
        status: "unread"
      }
    ]
  },
  {
    id: 2,
    contactId: 2,
    messages: [
      {
        id: 1,
        sender: "contact",
        text: "Olá! Seu perfil chamou nossa atenção! Temos uma vaga que combina com suas habilidades. Podemos conversar sobre isso?",
        time: "14:20",
        date: "Hoje",
        status: "unread"
      }
    ]
  }
]

// Respostas rápidas predefinidas
const quickReplies = [
  "Olá! Obrigado pelo contato.",
  "Sim, tenho interesse nessa vaga.",
  "Podemos agendar uma entrevista?",
  "Qual o próximo passo do processo seletivo?",
  "Qual a faixa salarial para essa posição?",
  "Obrigado pela oportunidade!"
]

export default function MessagesV2() {
  const [activeTab, setActiveTab] = useState("todas")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedContact, setSelectedContact] = useState<typeof contacts[0] | null>(contacts[0]) // Começa com o primeiro contato selecionado
  const [newMessage, setNewMessage] = useState("")
  const [showNewMessageDialog, setShowNewMessageDialog] = useState(false)
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const [selectedCompanyForInterview, setSelectedCompanyForInterview] = useState<number | null>(null)
  const [showQuickReplies, setShowQuickReplies] = useState(false)
  const [filteredContacts, setFilteredContacts] = useState(contacts)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messageInputRef = useRef<HTMLInputElement>(null)
  const [activeFilter, setActiveFilter] = useState("all")
  const [isTyping, setIsTyping] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "connecting" | "disconnected">("connected");
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [selectedCompanyForInfo, setSelectedCompanyForInfo] = useState<typeof contacts[0] | null>(null)
  
  const conversationListRef = useRef<HTMLDivElement>(null)

  // Filtra contatos com base na aba ativa e termo de busca
  useEffect(() => {
    let filtered = contacts
    
    // Filtra por aba
    if (activeTab === "não-lidas") {
      filtered = filtered.filter(contact => contact.unread)
    } else if (activeTab === "favoritas") {
      filtered = filtered.filter(contact => contact.isStarred)
    } else if (activeTab === "arquivadas") {
      filtered = filtered.filter(contact => contact.isArchived)
    }
    
    // Filtra por filtro rápido
    if (activeFilter === "unread") {
      filtered = filtered.filter(contact => contact.unread)
    } else if (activeFilter === "companies") {
      filtered = filtered.filter(contact => contact.isCompany)
    } else if (activeFilter === "recent") {
      // Ordena por tempo da última mensagem (mais recente primeiro)
      // Simplificação: assumindo que o formato de time é consistente para ordenação
      filtered = [...filtered].sort((a, b) => {
        // Ordenação simples baseada na string de tempo (não é perfeita, mas funciona para a demonstração)
        if (a.time.includes("min") && !b.time.includes("min")) return -1
        if (!a.time.includes("min") && b.time.includes("min")) return 1
        if (a.time.includes("hora") && !b.time.includes("hora")) return -1
        if (!a.time.includes("hora") && b.time.includes("hora")) return 1
        return 0
      }).slice(0, 10) // Pega apenas os 10 mais recentes
    }
    
    // Filtra por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(
        contact => 
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    setFilteredContacts(filtered)
  }, [activeTab, searchTerm, activeFilter])

  // Rola para a última mensagem quando a conversa é carregada ou uma nova mensagem é enviada
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [selectedContact])

  // Foca no campo de entrada quando um contato é selecionado
  useEffect(() => {
    if (selectedContact && messageInputRef.current) {
      messageInputRef.current.focus()
    }
  }, [selectedContact])

  // Simula o status de digitação quando o usuário digita
  useEffect(() => {
    if (newMessage.length > 0) {
      setIsTyping(true)
      const timer = setTimeout(() => {
        setIsTyping(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [newMessage])

  // Obtém as mensagens do contato selecionado
  const getSelectedContactMessages = () => {
    if (!selectedContact) return []
    
    const conversation = messageHistory.find(history => history.contactId === selectedContact.id)
    return conversation ? conversation.messages : []
  }

  // Função para enviar uma nova mensagem
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return
    
    // Aqui você implementaria a lógica para enviar a mensagem para o backend
    console.log(`Enviando mensagem para o contato ${selectedContact.id}: ${newMessage}`)
    
    // Limpa o campo de entrada
    setNewMessage("")
  }

  // Função para usar uma resposta rápida
  const handleQuickReply = (reply: string) => {
    setNewMessage(reply)
    setShowQuickReplies(false)
    if (messageInputRef.current) {
      messageInputRef.current.focus()
    }
  }

  // Função para marcar uma conversa como favorita
  const toggleStarConversation = (contactId: number, event: React.MouseEvent) => {
    event.stopPropagation()
    // Aqui você implementaria a lógica para marcar/desmarcar como favorita
    console.log(`Alterando status de favorito para o contato ${contactId}`)
  }

  // Função para arquivar uma conversa
  const archiveConversation = (contactId: number, event: React.MouseEvent) => {
    event.stopPropagation()
    // Atualiza o estado dos contatos para marcar o contato como arquivado
    const updatedContacts = contacts.map(contact => 
      contact.id === contactId 
        ? { ...contact, isArchived: !contact.isArchived } 
        : contact
    )
    // Em um app real, você faria uma chamada API aqui
    // Simulando a atualização do estado
    setFilteredContacts(prevContacts => 
      prevContacts.map(contact => 
        contact.id === contactId 
          ? { ...contact, isArchived: !contact.isArchived } 
          : contact
      )
    )
    console.log(`Contato ${contactId} ${contacts.find(c => c.id === contactId)?.isArchived ? 'desarquivado' : 'arquivado'}`)
  }

  // Função para excluir uma conversa
  const deleteConversation = (contactId: number, event: React.MouseEvent) => {
    event.stopPropagation()
    // Aqui você implementaria a lógica para excluir a conversa
    console.log(`Excluindo conversa com o contato ${contactId}`)
  }

  // Função para iniciar uma nova conversa
  const startNewConversation = (contactId: number) => {
    const contact = contacts.find(c => c.id === contactId)
    if (contact) {
      setSelectedContact(contact)
      setShowNewMessageDialog(false)
    }
  }

  // Renderiza o status de uma mensagem
  const renderMessageStatus = (status: string) => {
    if (status === "sent") {
      return <Circle className="h-3 w-3 text-gray-400" />
    } else if (status === "delivered") {
      return <CheckCheck className="h-3 w-3 text-gray-400" />
    } else if (status === "read") {
      return <CheckCheck className="h-3 w-3 text-blue-500" />
    }
    return null
  }

  // Função para navegar entre contatos usando o teclado
  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    if (!selectedContact) return;
    
    const currentIndex = filteredContacts.findIndex(c => c.id === selectedContact.id);
    
    if (e.key === "ArrowUp" && currentIndex > 0) {
      // Navega para o contato anterior
      setSelectedContact(filteredContacts[currentIndex - 1]);
    } else if (e.key === "ArrowDown" && currentIndex < filteredContacts.length - 1) {
      // Navega para o próximo contato
      setSelectedContact(filteredContacts[currentIndex + 1]);
    }
  };

  // Função para marcar uma conversa como lida
  const markAsRead = (contactId: number) => {
    // Aqui você implementaria a lógica para marcar a conversa como lida
    console.log(`Marcando conversa ${contactId} como lida`);
  };

  // Função para marcar todas as conversas como lidas
  const markAllAsRead = () => {
    setFilteredContacts(contacts.map(c => ({ ...c, unread: false })));
  };

  // Função para formatar o status de forma mais amigável
  const getStatusText = (status: string) => {
    switch (status) {
      case "online": return "Online";
      case "offline": return "Offline";
      case "away": return "Ausente";
      default: return status;
    }
  };

  // Função para obter a cor do indicador de status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "offline": return "bg-gray-400";
      case "away": return "bg-yellow-500";
      default: return "bg-gray-400";
    }
  };

  // Componente de status de digitação
  const TypingIndicator = () => (
    <div className="flex items-center space-x-2 text-gray-500 text-xs p-2">
      <div className="flex space-x-1">
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
      <span>{selectedContact?.name} está digitando...</span>
    </div>
  );

  // Componente de status de conexão
  const ConnectionStatus = () => {
    if (connectionStatus === "connected") return null;
    
    return (
      <div className={cn(
        "fixed bottom-4 right-4 px-4 py-2 rounded-full text-xs font-medium shadow-md flex items-center space-x-2 z-50",
        connectionStatus === "connecting" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
      )}>
        <div className={cn(
          "w-2 h-2 rounded-full",
          connectionStatus === "connecting" ? "bg-yellow-500" : "bg-red-500"
        )} />
        <span>
          {connectionStatus === "connecting" ? "Conectando..." : "Desconectado"}
        </span>
      </div>
    );
  };

  // Componente para o modal de informações da empresa
  function CompanyInfoModal({ 
    isOpen, 
    onClose, 
    company 
  }: { 
    isOpen: boolean, 
    onClose: () => void, 
    company: typeof contacts[0] 
  }) {
    // Dados simulados adicionais para o perfil da empresa
    const companyDetails = {
      industry: company.company,
      employeeCount: "201-500",
      foundedYear: 2010,
      website: "https://www.exemplo.com.br",
      phone: "+55 11 1234-5678",
      email: "contato@" + company.name.toLowerCase().replace(/\s/g, "") + ".com.br",
      linkedin: "https://www.linkedin.com/company/" + company.name.toLowerCase().replace(/\s/g, ""),
      description: `${company.name} é uma empresa líder em soluções de ${company.company}, focada em inovação e excelência. Nossa missão é transformar o mercado através de tecnologia de ponta, oferecendo soluções personalizadas que impulsionam a eficiência e o crescimento de nossos clientes.`,
      benefits: [
        "Plano de saúde abrangente",
        "Horário flexível",
        "Trabalho remoto",
        "Desenvolvimento profissional"
      ],
      openPositions: Math.floor(Math.random() * 10) + 1
    };

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-gray-200 p-1 bg-white">
                <AvatarImage src={company.avatar} alt={company.name} />
                <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">{company.name}</h2>
                <p className="text-sm text-muted-foreground">{companyDetails.industry}</p>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Informações básicas */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-md font-semibold mb-3">Informações da Empresa</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{company.city}{company.state && `, ${company.state}`}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{companyDetails.employeeCount} funcionários</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Fundada em {companyDetails.foundedYear}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{companyDetails.openPositions} vagas abertas</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <a href={companyDetails.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {companyDetails.website}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <a href={`mailto:${companyDetails.email}`} className="text-blue-600 hover:underline">
                    {companyDetails.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{companyDetails.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Circle className={`h-4 w-4 ${
                    company.status === "online" ? "text-green-500" : 
                    company.status === "away" ? "text-yellow-500" : "text-gray-400"
                  }`} />
                  <span className="text-gray-700">
                    {company.status === "online" ? "Online" : 
                     company.status === "away" ? "Ausente" : "Offline"}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Sobre a empresa */}
            <div>
              <h3 className="text-md font-semibold mb-2">Sobre a Empresa</h3>
              <p className="text-sm text-gray-600 mb-4">
                {companyDetails.description}
              </p>
            </div>
            
            {/* Benefícios */}
            <div>
              <h3 className="text-md font-semibold mb-2">Benefícios</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {companyDetails.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
            
            {/* Redes sociais */}
            <div>
              <h3 className="text-md font-semibold mb-2">Redes Sociais</h3>
              <div className="flex gap-3">
                <a
                  href={companyDetails.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
            <Link href={`/empresas/${company.id}`} passHref>
              <Button>
                Ver Perfil Completo
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  // Função para abrir o modal de informações da empresa
  const openCompanyInfoModal = (company: typeof contacts[0]) => {
    setSelectedCompanyForInfo(company);
    setShowInfoModal(true);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold">Mensagens</h1>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs"
            onClick={() => setShowNewMessageDialog(true)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Nova Conversa
          </Button>
          
          {/* Botão de notificações */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="relative text-xs">
                <Bell className="h-4 w-4" />
                {contacts.filter(c => c.unread).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {contacts.filter(c => c.unread).length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <div className="p-2 text-xs font-medium text-gray-500">Notificações</div>
              {contacts.filter(c => c.unread).length > 0 ? (
                <>
                  {contacts.filter(c => c.unread).map(contact => (
                    <DropdownMenuItem 
                      key={contact.id} 
                      className="p-2 cursor-pointer"
                      onClick={() => {
                        setSelectedContact(contact)
                        markAsRead(contact.id)
                      }}
                    >
                      <div className="flex items-start gap-2">
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage src={contact.avatar} alt={contact.name} />
                          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 overflow-hidden">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-xs">{contact.name}</span>
                            <span className="text-[10px] text-gray-400">{contact.time}</span>
        </div>
                          <p className="text-xs text-gray-500 truncate">{contact.lastMessage}</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-xs text-center text-blue-600 cursor-pointer"
                    onClick={markAllAsRead}
                  >
                    Marcar todas como lidas
                  </DropdownMenuItem>
                </>
              ) : (
                <div className="p-4 text-center">
                  <BellOff className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">Nenhuma notificação não lida</p>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Botão de ajuda com atalhos de teclado */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs">
                <Keyboard className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <div className="p-2 text-xs font-medium text-gray-500">Atalhos de Teclado</div>
              <div className="p-2">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-gray-500">↑ / ↓</div>
                  <div>Navegar entre conversas</div>
                  
                  <div className="text-gray-500">Enter</div>
                  <div>Selecionar conversa</div>
                  
                  <div className="text-gray-500">Ctrl + N</div>
                  <div>Nova conversa</div>
                  
                  <div className="text-gray-500">Ctrl + F</div>
                  <div>Buscar</div>
                  
                  <div className="text-gray-500">Esc</div>
                  <div>Limpar seleção</div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Painel lateral de conversas */}
        <div className="w-[400px] border-r flex flex-col">
          <div className="p-3 border-b">
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Buscar conversas..." 
                className="pl-9 py-2 bg-white border-gray-200 rounded-full text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
          
          <Tabs defaultValue="todas" className="flex-1 flex flex-col" onValueChange={setActiveTab}>
            <div className="px-3 pt-2 border-b">
              <TabsList className="w-full bg-gray-100 p-1">
                <TabsTrigger value="todas" className="text-xs flex-1">Todas</TabsTrigger>
                <TabsTrigger value="não-lidas" className="text-xs flex-1">
                  Não lidas
                  {contacts.filter(c => c.unread).length > 0 && (
                    <span className="ml-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                      {contacts.filter(c => c.unread).length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="favoritas" className="text-xs flex-1">
                  Favoritas
                  {contacts.filter(c => c.isStarred).length > 0 && (
                    <span className="ml-1 bg-yellow-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                      {contacts.filter(c => c.isStarred).length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="arquivadas" className="text-xs flex-1">
                  Arquivadas
                  {contacts.filter(c => c.isArchived).length > 0 && (
                    <span className="ml-1 bg-gray-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                      {contacts.filter(c => c.isArchived).length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="todas" className="flex-1 overflow-y-auto mt-0 p-0">
              <div 
                className="divide-y divide-gray-100"
                tabIndex={0}
                role="listbox"
                aria-label="Lista de conversas"
                onKeyDown={handleKeyNavigation}
              >
                {filteredContacts.map((contact) => (
                  <ConversationItem 
                    key={contact.id}
                    contact={contact}
                    isSelected={selectedContact?.id === contact.id}
                    onClick={() => {
                      setSelectedContact(contact)
                      if (contact.unread) {
                        markAsRead(contact.id)
                      }
                    }}
                    onStar={toggleStarConversation}
                    onArchive={archiveConversation}
                    onDelete={deleteConversation}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="não-lidas" className="flex-1 overflow-y-auto mt-0 p-0">
              <div 
                className="divide-y divide-gray-100"
                tabIndex={0}
                role="listbox"
                aria-label="Lista de conversas não lidas"
                onKeyDown={handleKeyNavigation}
              >
                {filteredContacts.map((contact) => (
                  <ConversationItem 
                    key={contact.id}
                    contact={contact}
                    isSelected={selectedContact?.id === contact.id}
                    onClick={() => {
                      setSelectedContact(contact)
                      if (contact.unread) {
                        markAsRead(contact.id)
                      }
                    }}
                    onStar={toggleStarConversation}
                    onArchive={archiveConversation}
                    onDelete={deleteConversation}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="favoritas" className="flex-1 overflow-y-auto mt-0 p-0">
              <div 
                className="divide-y divide-gray-100"
                tabIndex={0}
                role="listbox"
                aria-label="Lista de conversas favoritas"
                onKeyDown={handleKeyNavigation}
              >
                {filteredContacts.map((contact) => (
                  <ConversationItem 
                    key={contact.id}
                    contact={contact}
                    isSelected={selectedContact?.id === contact.id}
                    onClick={() => {
                      setSelectedContact(contact)
                      if (contact.unread) {
                        markAsRead(contact.id)
                      }
                    }}
                    onStar={toggleStarConversation}
                    onArchive={archiveConversation}
                    onDelete={deleteConversation}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="arquivadas" className="flex-1 overflow-y-auto mt-0 p-0">
              <div 
                className="divide-y divide-gray-100"
                tabIndex={0}
                role="listbox"
                aria-label="Lista de conversas arquivadas"
                onKeyDown={handleKeyNavigation}
              >
                {filteredContacts.map((contact) => (
                  <ConversationItem 
                    key={contact.id}
                    contact={contact}
                    isSelected={selectedContact?.id === contact.id}
                    onClick={() => {
                      setSelectedContact(contact)
                      if (contact.unread) {
                        markAsRead(contact.id)
                      }
                    }}
                    onStar={toggleStarConversation}
                    onArchive={archiveConversation}
                    onDelete={deleteConversation}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Área principal de mensagens */}
        {selectedContact ? (
          <div className="flex-1 flex flex-col">
            {/* Cabeçalho do chat */}
            <div className="p-3 border-b flex items-center justify-between bg-white sticky top-0 z-10 shadow-sm">
              <div className="flex items-center">
                <div className="relative">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                    <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <div className="flex items-center">
                    <h2 className="text-sm font-medium">{selectedContact.name}</h2>
                    <div className="flex items-center ml-2">
                      {selectedContact.isCompany && (
                        <>
                          <Badge variant="outline" className="px-1.5 py-0 text-[9px] bg-blue-50 text-blue-600 border-blue-200">
                            Empresa
                      </Badge>
                          <div className={`ml-1 h-2 w-2 rounded-full ${
                            selectedContact.status === "online" ? "bg-green-500" : 
                            selectedContact.status === "away" ? "bg-yellow-500" : "bg-gray-400"
                          }`} 
                               title={
                                 selectedContact.status === "online" ? "Online" : 
                                 selectedContact.status === "away" ? "Ausente" : "Offline"
                               } />
                        </>
                    )}
                  </div>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    {selectedContact.city && (
                      <>
                        <MapPin className="h-2.5 w-2.5 text-gray-400 mr-0.5" />
                        <span className="truncate text-gray-400">{selectedContact.city}{selectedContact.state && `, ${selectedContact.state}`}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                        onClick={() => openCompanyInfoModal(selectedContact)}
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Informações da empresa</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem 
                      className="text-xs cursor-pointer"
                      onClick={(e) => toggleStarConversation(selectedContact.id, e)}
                    >
                      <Star className={cn("h-4 w-4 mr-2", selectedContact.isStarred ? "fill-yellow-400 text-yellow-400" : "")} />
                      {selectedContact.isStarred ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-xs cursor-pointer"
                      onClick={(e) => archiveConversation(selectedContact.id, e)}
                    >
                      {selectedContact.isArchived ? 
                        <>
                          <ArchiveRestore className="h-4 w-4 mr-2" />
                          Desarquivar conversa
                        </> : 
                        <>
                      <Archive className="h-4 w-4 mr-2" />
                      Arquivar conversa
                        </>
                      }
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-xs text-red-600 cursor-pointer"
                      onClick={(e) => deleteConversation(selectedContact.id, e)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Excluir conversa
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {/* Área de mensagens */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {getSelectedContactMessages().length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Nenhuma mensagem ainda</h3>
                  <p className="text-sm text-gray-500 max-w-md mb-6">
                    Inicie uma conversa com {selectedContact.name} enviando uma mensagem abaixo.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      if (messageInputRef.current) {
                        messageInputRef.current.focus()
                      }
                    }}
                  >
                    Iniciar conversa
                  </Button>
                </div>
              ) : (
                <>
              {getSelectedContactMessages().map((message, index) => {
                // Verifica se deve mostrar a data
                const showDate = index === 0 || 
                  getSelectedContactMessages()[index - 1].date !== message.date
                
                return (
                  <React.Fragment key={message.id}>
                    {showDate && (
                      <div className="flex justify-center my-4">
                        <Badge variant="outline" className="bg-white text-gray-500 text-xs font-normal">
                          {message.date}
                        </Badge>
                      </div>
                    )}
                    
                    <div className={cn(
                      "flex mb-4",
                      message.sender === "user" ? "justify-end" : "justify-start"
                    )}>
                      {message.sender === "contact" && (
                        <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                          <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                          <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div className={cn(
                        "max-w-[70%] rounded-lg p-3",
                        message.sender === "user" 
                          ? "bg-blue-600 text-white" 
                          : "bg-white border border-gray-200"
                      )}>
                        <p className={cn(
                          "text-sm",
                          message.sender === "user" ? "text-white" : "text-gray-800"
                        )}>
                          {message.text}
                        </p>
                        <div className={cn(
                          "flex items-center justify-end mt-1 space-x-1",
                          message.sender === "user" ? "text-blue-200" : "text-gray-400"
                        )}>
                          <span className="text-[10px]">{message.time}</span>
                          {message.sender === "user" && renderMessageStatus(message.status)}
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                )
              })}
              <div ref={messagesEndRef} />
                  {isTyping && <TypingIndicator />}
                </>
              )}
            </div>
            
            {/* Área de entrada de mensagem */}
            <div className="p-3 border-t bg-white">
              {showQuickReplies && (
                <div className="mb-2 p-2 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-xs font-medium text-gray-700">Respostas rápidas</h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowQuickReplies(false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                  {quickReplies.map((reply, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                        className="text-xs bg-white hover:bg-gray-100"
                      onClick={() => handleQuickReply(reply)}
                    >
                      {reply}
                    </Button>
                  ))}
                  </div>
                </div>
              )}
              <div className="flex items-center bg-gray-50 rounded-full border border-gray-200 pr-2">
                <div className="flex items-center space-x-1 ml-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600 hover:bg-transparent rounded-full">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Anexar arquivo</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600 hover:bg-transparent rounded-full">
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Enviar imagem</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button 
        variant="ghost" 
        size="icon" 
                          className="h-8 w-8 text-gray-500 hover:text-blue-600 hover:bg-transparent rounded-full"
        onClick={() => setShowQuickReplies(!showQuickReplies)}
      >
        <Smile className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p className="text-xs">Respostas rápidas</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
</div>

<Input
  ref={messageInputRef}
                  type="text"
  placeholder="Digite sua mensagem..."
                  className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
  value={newMessage}
  onChange={(e) => setNewMessage(e.target.value)}
  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }}
/>

<Button 
                  type="submit"
  size="icon" 
                  className={cn(
                    "h-8 w-8 rounded-full",
                    newMessage.trim() ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-400"
                  )}
  disabled={!newMessage.trim()}
                  onClick={handleSendMessage}
>
  <Send className="h-4 w-4" />
</Button>
</div>
              <div className="mt-1 text-xs text-gray-400 text-center">
                Pressione Enter para enviar, Shift+Enter para nova linha
</div>
</div>
</div>
) : (
<div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-8">
<div className="bg-white rounded-lg p-8 shadow-sm max-w-md text-center">
<div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
<MessageSquare className="h-8 w-8" />
</div>
<h2 className="text-xl font-semibold mb-2">Nenhuma conversa selecionada</h2>
<p className="text-gray-500 mb-6">Selecione uma conversa existente ou inicie uma nova para começar a trocar mensagens.</p>
<Button 
onClick={() => setShowNewMessageDialog(true)}
className="mx-auto"
>
<Plus className="h-4 w-4 mr-2" />
Nova Conversa
</Button>
</div>
</div>
)}
</div>

{/* Diálogo para nova mensagem */}
<Dialog open={showNewMessageDialog} onOpenChange={setShowNewMessageDialog}>
<DialogContent className="sm:max-w-md">
<DialogHeader>
<DialogTitle>Nova Conversa</DialogTitle>
            <DialogDescription>
              Selecione um contato para iniciar uma nova conversa
            </DialogDescription>
</DialogHeader>
<div className="py-4">
<div className="mb-4">
<div className="relative">
<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
<Input 
placeholder="Buscar contatos..." 
className="pl-9 py-2 bg-white border-gray-200 rounded-full text-sm"
/>
</div>
</div>
<div className="space-y-2 max-h-[300px] overflow-y-auto">
{contacts.map((contact) => (
<div 
key={contact.id}
className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
onClick={() => startNewConversation(contact.id)}
>
<div className="relative">
  <Avatar className="h-10 w-10 mr-3">
    <AvatarImage src={contact.avatar} alt={contact.name} />
    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
  </Avatar>
</div>
<div>
  <div className="flex items-center">
    <h3 className="text-sm font-medium">{contact.name}</h3>
                      <div className="flex items-center ml-2">
                        {contact.isCompany && (
                          <>
                            <Badge variant="outline" className="px-1.5 py-0 text-[9px] bg-blue-50 text-blue-600 border-blue-200">
                              Empresa
      </Badge>
                            <div className={`ml-1 h-2 w-2 rounded-full ${
                              contact.status === "online" ? "bg-green-500" : 
                              contact.status === "away" ? "bg-yellow-500" : "bg-gray-400"
                            }`} 
                                 title={
                                   contact.status === "online" ? "Online" : 
                                   contact.status === "away" ? "Ausente" : "Offline"
                                 } />
                          </>
    )}
  </div>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      {contact.city && (
                        <>
                          <MapPin className="h-2.5 w-2.5 text-gray-400 mr-0.5" />
                          <span className="truncate text-gray-400">{contact.city}{contact.state && `, ${contact.state}`}</span>
                        </>
                      )}
                    </div>
</div>
</div>
))}
</div>
</div>
</DialogContent>
</Dialog>

      <ConnectionStatus />

      {/* Modal de informações da empresa */}
      {showInfoModal && selectedCompanyForInfo && (
        <CompanyInfoModal 
          isOpen={showInfoModal} 
          onClose={() => setShowInfoModal(false)} 
          company={selectedCompanyForInfo} 
        />
      )}
</div>
)
}

// Componente para item de conversa na lista lateral
interface ConversationItemProps {
contact: typeof contacts[0]
isSelected: boolean
onClick: () => void
onStar: (id: number, event: React.MouseEvent) => void
onArchive: (id: number, event: React.MouseEvent) => void
onDelete: (id: number, event: React.MouseEvent) => void
}

function ConversationItem({ 
contact, 
isSelected, 
onClick, 
onStar, 
onArchive, 
onDelete 
}: ConversationItemProps) {
  // Função para formatar o tempo de forma mais amigável
  const getTimeLabel = (time: string) => {
    if (time.includes("min")) return time;
    if (time.includes("hora")) return time;
    if (time.includes("ontem")) return "Ontem";
    return time;
  };

return (
<div 
className={cn(
        "relative p-4 hover:bg-gray-50 cursor-pointer group transition-all duration-200 border-b border-gray-100",
        isSelected ? "bg-blue-50 hover:bg-blue-50 border-l-4 border-l-blue-500 pl-3" : "",
        contact.unread && !isSelected ? "bg-blue-50/30" : ""
)}
onClick={onClick}
      role="button"
      tabIndex={0}
      aria-selected={isSelected}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
>
<div className="flex items-start">
<div className="relative">
<Avatar className="h-10 w-10 mr-3">
<AvatarImage src={contact.avatar} alt={contact.name} />
<AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
</Avatar>
</div>
<div className="flex-1 min-w-0">
<div className="flex items-center justify-between">
<div className="flex items-center">
<h3 className={cn(
"text-sm font-medium truncate",
contact.unread && "font-semibold"
)}>
{contact.name}
</h3>
              <div className="flex items-center ml-2">
                {contact.isCompany && (
                  <>
                    <Badge variant="outline" className="px-1.5 py-0 text-[9px] bg-blue-50 text-blue-600 border-blue-200">
                      Empresa
</Badge>
                    <div className={`ml-1 h-2 w-2 rounded-full ${
                      contact.status === "online" ? "bg-green-500" : 
                      contact.status === "away" ? "bg-yellow-500" : "bg-gray-400"
                    }`} 
                         title={
                           contact.status === "online" ? "Online" : 
                           contact.status === "away" ? "Ausente" : "Offline"
                         } />
                  </>
)}
</div>
</div>
            <span className="text-[10px] text-gray-500 whitespace-nowrap">
              {getTimeLabel(contact.time)}
            </span>
          </div>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            {contact.city && (
              <>
                <MapPin className="h-2.5 w-2.5 text-gray-400 mr-0.5" />
                <span className="truncate text-gray-400">{contact.city}{contact.state && `, ${contact.state}`}</span>
              </>
            )}
          </div>
          <div className="flex items-center mt-3">
            {contact.unread && (
              <Badge variant="default" className="mr-1 h-1.5 w-1.5 p-0 rounded-full bg-blue-600" />
            )}
<p className={cn(
              "text-xs truncate",
contact.unread ? "text-gray-900 font-medium" : "text-gray-500"
)}>
{contact.lastMessage}
</p>
          </div>
</div>
</div>

{/* Indicador de favorito */}
{contact.isStarred && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute top-2 right-3 text-yellow-500 bg-yellow-50 p-1 rounded-md">
                <Star className="h-3.5 w-3.5 fill-current" />
</div>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs">
              Conversa favorita
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
)}

{/* Ações rápidas (visíveis apenas no hover) */}
<div className={cn(
        "absolute right-3 top-1/2 transform -translate-y-1/2 bg-white shadow rounded-lg border border-gray-200 flex items-center opacity-0 transition-opacity p-0.5",
"group-hover:opacity-100",
isSelected && "opacity-100"
)}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
<Button 
variant="ghost" 
size="icon" 
                className="h-8 w-8 text-gray-500 hover:text-yellow-500 hover:bg-yellow-50 rounded-md"
                onClick={(e) => {
                  e.stopPropagation()
                  onStar(contact.id, e)
                }}
                aria-label={contact.isStarred ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              >
                <Star className={cn("h-4 w-4", contact.isStarred ? "fill-yellow-400 text-yellow-400" : "")} />
</Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              {contact.isStarred ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="w-px h-5 bg-gray-200 mx-0.5"></div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
<Button 
variant="ghost" 
size="icon" 
                className="h-8 w-8 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-md"
                onClick={(e) => {
                  e.stopPropagation()
                  onArchive(contact.id, e)
                }}
                aria-label={contact.isArchived ? "Desarquivar conversa" : "Arquivar conversa"}
              >
                {contact.isArchived ? 
                  <ArchiveRestore className="h-4 w-4" /> : 
                  <Archive className="h-4 w-4" />
                }
</Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              {contact.isArchived ? "Desarquivar conversa" : "Arquivar conversa"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="w-px h-5 bg-gray-200 mx-0.5"></div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
<Button 
variant="ghost" 
size="icon" 
                className="h-8 w-8 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-md"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(contact.id, e)
                }}
                aria-label="Excluir conversa"
              >
                <Trash2 className="h-4 w-4" />
</Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              Excluir conversa
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
</div>
</div>
)
}