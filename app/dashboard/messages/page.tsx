"use client"

import React, { useState, useRef, useEffect } from 'react'
import { DashboardShell } from "@/components/dashboard-shell"
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
  Check,
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
  Twitter,
  ArrowDown,
  SearchX,
  User,
  Download,
  FileText,
  FileSpreadsheet,
  File,
  Medal,
  GraduationCap,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

// Importando o componente PageHeader e o tipo PageHeaderAction
import { PageHeader, PageHeaderAction } from "@/components/ui/page-header"

// Dados simulados para contatos (candidatos)
interface Contact {
  id: number
  name: string
  position: string
  city: string
  state: string
  avatar: string
  status: "online" | "offline"
  lastMessage: string
  time: string
  unread: boolean
  isStarred: boolean
  isCandidate: boolean
  isArchived: boolean
  skills: string[]
  experience: string
  education: string
}

// Adicionar a interface para anexos
interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string; // URL temporária para visualização
  file: File;  // Referência ao arquivo original
}

// Atualizar interface de Message para incluir anexos
interface Message {
  id: number
  sender: "recruiter" | "candidate"
  text: string
  time: string
  status: "sent" | "delivered" | "read"
  attachments?: Attachment[] // Opcional para compatibilidade com mensagens existentes
}

// Templates de mensagens para candidatos
interface MessageTemplate {
  id: string;
  title: string;
  description: string;
  text: string;
  category: 'inicial' | 'entrevista' | 'feedback' | 'oferta' | 'informativo';
}

const contacts: Contact[] = [
  { 
    id: 1, 
    name: "João Silva", 
    position: "Desenvolvedor Full Stack", 
    city: "São Paulo",
    state: "SP",
    avatar: "https://avatars.githubusercontent.com/u/1?v=4", 
    status: "online",
    lastMessage: "Olá! Obrigado pelo contato. Tenho interesse na vaga e gostaria de saber mais detalhes sobre o processo seletivo.",
    time: "15 min atrás",
    unread: true,
    isStarred: true,
    isCandidate: true,
    isArchived: false,
    skills: ["React", "Node.js", "TypeScript", "MongoDB"],
    experience: "5 anos",
    education: "Bacharelado em Ciência da Computação"
  },
  { 
    id: 2, 
    name: "Maria Santos", 
    position: "UX Designer", 
    city: "Rio de Janeiro",
    state: "RJ",
    avatar: "https://avatars.githubusercontent.com/u/2?v=4", 
    status: "online",
    lastMessage: "Obrigada pelo retorno! Quando podemos agendar a entrevista?",
    time: "2 horas atrás",
    unread: true,
    isStarred: false,
    isCandidate: true,
    isArchived: false,
    skills: ["Figma", "Adobe XD", "UI Design", "Pesquisa de Usuário"],
    experience: "3 anos",
    education: "Bacharelado em Design"
  },
  { 
    id: 3, 
    name: "Pedro Costa", 
    position: "Analista de Marketing", 
    city: "Belo Horizonte",
    state: "MG",
    avatar: "https://avatars.githubusercontent.com/u/3?v=4", 
    status: "offline",
    lastMessage: "Entendi. Vou enviar meu portfólio atualizado.",
    time: "1 dia atrás",
    unread: false,
    isStarred: false,
    isCandidate: true,
    isArchived: false,
    skills: ["Marketing Digital", "SEO", "Google Analytics", "Redes Sociais"],
    experience: "4 anos",
    education: "MBA em Marketing Digital"
  },
  { 
    id: 4, 
    name: "Ana Oliveira", 
    position: "Desenvolvedora Backend", 
    city: "Curitiba",
    state: "PR",
    avatar: "https://avatars.githubusercontent.com/u/4?v=4", 
    status: "offline",
    lastMessage: "Tenho experiência com Java e Spring Boot. Também trabalhei com microsserviços.",
    time: "2 dias atrás",
    unread: false,
    isStarred: true,
    isCandidate: true,
    isArchived: false,
    skills: ["Java", "Spring Boot", "Microsserviços", "SQL"],
    experience: "6 anos",
    education: "Mestrado em Engenharia de Software"
  },
  { 
    id: 5, 
    name: "Lucas Mendes", 
    position: "DevOps Engineer", 
    city: "Brasília",
    state: "DF",
    avatar: "https://avatars.githubusercontent.com/u/5?v=4", 
    status: "offline",
    lastMessage: "Possuo certificações AWS e experiência com Docker e Kubernetes.",
    time: "3 dias atrás",
    unread: false,
    isStarred: false,
    isCandidate: true,
    isArchived: true,
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
    experience: "4 anos",
    education: "Bacharelado em Sistemas de Informação"
  }
]

// Lista de contatos possíveis para iniciar uma nova conversa
const possibleContacts: Contact[] = [
  { 
    id: 6, 
    name: "Paulo Henrique", 
    position: "Engenheiro de Software", 
    city: "Florianópolis",
    state: "SC",
    avatar: "https://avatars.githubusercontent.com/u/6?v=4", 
    status: "offline",
    lastMessage: "",
    time: "",
    unread: false,
    isStarred: false,
    isCandidate: true,
    isArchived: false,
    skills: ["Java", "Kotlin", "Firebase", "Android"],
    experience: "7 anos",
    education: "Mestrado em Computação"
  },
  { 
    id: 7, 
    name: "Camila Alves", 
    position: "Product Designer", 
    city: "Salvador",
    state: "BA",
    avatar: "https://avatars.githubusercontent.com/u/7?v=4", 
    status: "online",
    lastMessage: "",
    time: "",
    unread: false,
    isStarred: false,
    isCandidate: true,
    isArchived: false,
    skills: ["UI/UX", "Design Thinking", "Sketch", "Figma"],
    experience: "4 anos",
    education: "Graduação em Design"
  },
  { 
    id: 8, 
    name: "Fernando Costa", 
    position: "Analista de Dados", 
    city: "Porto Alegre",
    state: "RS",
    avatar: "https://avatars.githubusercontent.com/u/8?v=4", 
    status: "offline",
    lastMessage: "",
    time: "",
    unread: false,
    isStarred: false,
    isCandidate: true,
    isArchived: false,
    skills: ["Python", "R", "SQL", "Tableau", "Power BI"],
    experience: "5 anos",
    education: "MBA em Business Intelligence"
  },
  { 
    id: 9, 
    name: "Carolina Martins", 
    position: "Front-end Developer", 
    city: "Recife",
    state: "PE",
    avatar: "https://avatars.githubusercontent.com/u/9?v=4", 
    status: "offline",
    lastMessage: "",
    time: "",
    unread: false,
    isStarred: false,
    isCandidate: true,
    isArchived: false,
    skills: ["React", "JavaScript", "HTML", "CSS", "Tailwind"],
    experience: "3 anos",
    education: "Graduação em Sistemas para Internet"
  },
  { 
    id: 10, 
    name: "Rodrigo Almeida", 
    position: "DevOps Specialist", 
    city: "Manaus",
    state: "AM",
    avatar: "https://avatars.githubusercontent.com/u/10?v=4", 
    status: "online",
    lastMessage: "",
    time: "",
    unread: false,
    isStarred: false,
    isCandidate: true,
    isArchived: false,
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"],
    experience: "6 anos",
    education: "Especialização em Cloud Computing"
  }
]

// Lista de emojis comuns
const commonEmojis = [
  '😊', '😄', '😍', '👍', '👏', '🙌', '🎉', '✨', '👨‍💻', '👩‍💻', 
  '📊', '📈', '📝', '👌', '🤔', '🙂', '😉', '🚀', '💯', '⭐',
  '💼', '📱', '💻', '⏰', '🔍', '📄', '📑', '🗂️', '✅', '👋'
]

// Categorias de emojis
const emojiCategories = [
  {
    name: "Expressões",
    emojis: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘']
  },
  {
    name: "Gestos",
    emojis: ['👍', '👎', '👌', '🤝', '👊', '✊', '🤛', '🤜', '🤞', '✌️', '🤟', '🤘', '👋', '🤚', '👏', '🙌', '👐']
  },
  {
    name: "Objetos",
    emojis: ['💼', '🗂️', '📁', '📂', '📅', '📆', '📊', '📈', '📉', '📋', '📌', '📍', '📎', '📏', '📐', '✂️', '📝', '✏️', '📱', '💻', '⌨️', '🖥️']
  },
  {
    name: "Símbolos",
    emojis: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '⭐', '🌟', '✨', '💫']
  }
]

// Templates de mensagens para candidatos
const messageTemplates: MessageTemplate[] = [
  {
    id: 'initial-contact',
    title: 'Contato Inicial',
    description: 'Primeira mensagem para um candidato identificado',
    text: `Olá [Nome], tudo bem? 

Sou [Seu Nome] da equipe de recrutamento da [Empresa]. Encontrei seu perfil e fiquei interessado em suas experiências, especialmente com [habilidade/tecnologia].

Estamos com uma vaga de [cargo] que acredito que seria uma excelente oportunidade para alguém com o seu conjunto de habilidades. Gostaria de conversar mais sobre isso?

Aguardo seu retorno!`,
    category: 'inicial'
  },
  {
    id: 'interview-invitation',
    title: 'Convite para Entrevista',
    description: 'Convidar o candidato para uma entrevista',
    text: `Olá [Nome],

Obrigado pelo seu interesse na vaga de [cargo]. Avaliamos seu perfil e gostaríamos de convidá-lo para uma entrevista.

Temos disponibilidade nos seguintes horários:
• [Data 1] às [Horário 1]
• [Data 2] às [Horário 2]
• [Data 3] às [Horário 3]

Por favor, informe qual seria a melhor opção para você.

A entrevista será [formato: presencial/online] e terá duração aproximada de [duração].

Aguardo sua confirmação!`,
    category: 'entrevista'
  },
  {
    id: 'tech-interview',
    title: 'Detalhes da Entrevista Técnica',
    description: 'Informações sobre a entrevista técnica',
    text: `Olá [Nome],

Confirmando nossa entrevista técnica para a vaga de [cargo], marcada para [data] às [horário].

Alguns detalhes importantes:
• A entrevista terá duração de aproximadamente [duração]
• Você conversará com [nome do entrevistador], nosso(a) [cargo do entrevistador]
• Focaremos nas seguintes tecnologias: [lista de tecnologias]
• [Outras informações relevantes]

Se precisar reagendar ou tiver dúvidas, por favor me avise com antecedência.

Boa sorte e até breve!`,
    category: 'entrevista'
  },
  {
    id: 'feedback-positive',
    title: 'Feedback Positivo',
    description: 'Feedback positivo após entrevista',
    text: `Olá [Nome],

Gostaria de agradecer por sua participação no processo seletivo para a vaga de [cargo].

Tenho o prazer de informar que você teve um ótimo desempenho na entrevista. Nosso time ficou impressionado com [ponto forte específico do candidato].

Gostaríamos de avançar para a próxima etapa do processo, que consiste em [descrição da próxima etapa].

Podemos agendar para [sugestão de data/horário]?

Aguardo seu retorno!`,
    category: 'feedback'
  },
  {
    id: 'feedback-negative',
    title: 'Feedback Negativo',
    description: 'Feedback respeitoso após decisão negativa',
    text: `Olá [Nome],

Agradeço sinceramente por sua participação no processo seletivo para a vaga de [cargo].

Após cuidadosa avaliação, decidimos seguir com outros candidatos cujo perfil está mais alinhado com nossas necessidades atuais.

Seu perfil é muito interessante, especialmente sua experiência em [área/tecnologia específica]. Gostaríamos de manter seu currículo em nosso banco de talentos para futuras oportunidades.

Desejo muito sucesso em sua carreira!`,
    category: 'feedback'
  },
  {
    id: 'additional-info',
    title: 'Solicitação de Informações',
    description: 'Pedir informações adicionais ao candidato',
    text: `Olá [Nome],

Estamos avançando em seu processo seletivo para a vaga de [cargo] e precisamos de algumas informações adicionais para prosseguir:

• [Informação 1 solicitada]
• [Informação 2 solicitada]
• [Informação 3 solicitada]

Poderia também nos informar sua pretensão salarial e disponibilidade para início?

Obrigado pela atenção!`,
    category: 'informativo'
  },
  {
    id: 'job-offer',
    title: 'Proposta de Trabalho',
    description: 'Oferta preliminar de emprego',
    text: `Olá [Nome],

É com grande satisfação que informo que você foi aprovado(a) para a vaga de [cargo] em nossa empresa!

Gostaríamos de agendar uma conversa para discutir os detalhes da proposta, incluindo:

• Salário e benefícios
• Data de início
• Regime de trabalho
• Próximos passos do processo de contratação

Você tem disponibilidade para uma conversa [presencial/virtual] na [sugestão de data/horário]?

Parabéns novamente e aguardo seu retorno!`,
    category: 'oferta'
  },
  {
    id: 'follow-up',
    title: 'Acompanhamento',
    description: 'Mensagem de acompanhamento após contato inicial',
    text: `Olá [Nome],

Estou entrando em contato para verificar se você recebeu minha mensagem anterior sobre a oportunidade de [cargo] em nossa empresa.

Continuo interessado(a) em seu perfil e gostaria de saber se você tem interesse em conversar sobre esta vaga.

Fico no aguardo do seu retorno.`,
    category: 'informativo'
  }
];

export default function MessagesPage() {
  // Estados
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [showNewConversationModal, setShowNewConversationModal] = useState(false)
  const [newConversationSearch, setNewConversationSearch] = useState('')
  const [previewCandidate, setPreviewCandidate] = useState<Contact | null>(null)
  const [showTemplates, setShowTemplates] = useState(false)
  const [templateSearch, setTemplateSearch] = useState('')
  const [activeTemplateCategory, setActiveTemplateCategory] = useState<MessageTemplate['category'] | 'all'>('all')
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [activeEmojiCategory, setActiveEmojiCategory] = useState("Expressões")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messageInputRef = useRef<HTMLTextAreaElement>(null)
  
  // Lista de todos os contatos (existentes + possíveis)
  const allContacts = [...contacts, ...possibleContacts]
  
  // Filtrar contatos com base na aba ativa e termo de busca
  const filteredContacts = contacts.filter(contact => {
    // Filtro por aba
    if (activeTab === 'starred' && !contact.isStarred) return false
    if (activeTab === 'archived' && !contact.isArchived) return false
    if (activeTab === 'all' && contact.isArchived) return false
    
    // Filtro por termo de busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      return (
        contact.name.toLowerCase().includes(term) ||
        contact.position.toLowerCase().includes(term) ||
        `${contact.city}, ${contact.state}`.toLowerCase().includes(term)
      )
    }
    
    return true
  })
  
  // Filtrar possíveis contatos para nova conversa
  const filteredPossibleContacts = possibleContacts.filter(contact => {
    if (!newConversationSearch) return true;
    
    const term = newConversationSearch.toLowerCase();
    return (
      contact.name.toLowerCase().includes(term) ||
      contact.position.toLowerCase().includes(term) ||
      `${contact.city}, ${contact.state}`.toLowerCase().includes(term) ||
      contact.skills.some(skill => skill.toLowerCase().includes(term))
    );
  });
  
  // Iniciar uma nova conversa com um contato
  const startNewConversation = (contact: Contact) => {
    setSelectedContact(contact)
    setShowNewConversationModal(false)
    setMobileSidebarOpen(false)
    
    // Criar uma nova conversa vazia
    const emptyConversation: Message[] = []
    setMessages(emptyConversation)
    
    // Adicionar o contato à lista de conversas se ainda não estiver
    if (!contacts.some(c => c.id === contact.id)) {
      const newContact = {
        ...contact,
        lastMessage: "",
        time: "agora",
        unread: false
      }
      contacts.unshift(newContact)
    }
  }
  
  // Selecionar um contato para visualizar a conversa
  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact)
    setMobileSidebarOpen(false)
    
    // Simular mensagens para este contato
    const simulatedMessages: Message[] = [
      {
        id: 1,
        sender: 'recruiter',
        text: `Olá ${contact.name}, tudo bem? Estamos com uma vaga de ${contact.position} que acredito que seria uma ótima oportunidade para você.`,
        time: '2 dias atrás',
        status: 'read'
      },
      {
        id: 2,
        sender: 'candidate',
        text: 'Olá! Tudo ótimo, obrigado por entrar em contato. Tenho interesse em saber mais sobre a vaga.',
        time: '2 dias atrás',
        status: 'read'
      },
      {
        id: 3,
        sender: 'recruiter',
        text: 'Ótimo! A vaga é para trabalhar em nossa equipe de tecnologia. Estamos buscando alguém com suas habilidades para um projeto novo.',
        time: '1 dia atrás',
        status: 'read'
      },
      {
        id: 4,
        sender: 'candidate',
        text: contact.lastMessage,
        time: contact.time,
        status: contact.unread ? 'delivered' : 'read'
      }
    ]
    
    setMessages(simulatedMessages)
  }
  
  // Rolar para a última mensagem quando as mensagens mudarem
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])
  
  // Função para ajustar a altura do textarea automaticamente
  const adjustTextareaHeight = (textarea: HTMLTextAreaElement | null) => {
    if (!textarea) return;
    
    // Salvar a altura da barra de rolagem atual
    const scrollTop = textarea.scrollTop;
    
    // Resetar a altura para calcular corretamente o scrollHeight
    textarea.style.height = 'auto';
    
    // Definir a nova altura (no mínimo 38px, máximo 180px)
    const newHeight = Math.max(38, Math.min(textarea.scrollHeight, 180));
    textarea.style.height = `${newHeight}px`;
    
    // Restaurar a posição da barra de rolagem
    textarea.scrollTop = scrollTop;
  };
  
  // Efeito para ajustar a altura do textarea quando o texto muda
  useEffect(() => {
    adjustTextareaHeight(messageInputRef.current);
  }, [newMessage]);
  
  // Estado para armazenar anexos da mensagem atual
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  
  // Referência para o input de arquivo oculto
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Referência para o input de imagem oculto
  const imageInputRef = useRef<HTMLInputElement>(null);
  
  // Toast para feedback
  const { toast } = useToast();
  
  // Constantes para validação de arquivos
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB em bytes
  const ALLOWED_FILE_TYPES = [
    // PDFs
    'application/pdf',
    // Word
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    // Excel
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    // PowerPoint
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    // Texto
    'text/plain',
    // OpenDocument
    'application/vnd.oasis.opendocument.text',
    'application/vnd.oasis.opendocument.spreadsheet',
    'application/vnd.oasis.opendocument.presentation'
  ];
  
  // Constantes para validação de imagens
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB em bytes
  const ALLOWED_IMAGE_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/bmp',
    'image/svg+xml'
  ];
  
  // Função para verificar se o tipo de arquivo é permitido
  const isAllowedFileType = (fileType: string): boolean => {
    return ALLOWED_FILE_TYPES.includes(fileType);
  };
  
  // Função para verificar se o tipo de imagem é permitido
  const isAllowedImageType = (fileType: string): boolean => {
    return ALLOWED_IMAGE_TYPES.includes(fileType);
  };
  
  // Função para formatar o tamanho do arquivo
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
    else return (bytes / 1073741824).toFixed(1) + ' GB';
  };
  
  // Abrir o seletor de arquivos
  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };
  
  // Abrir o seletor de imagens
  const handleImageClick = () => {
    imageInputRef.current?.click();
  };
  
  // Processar arquivos selecionados com validação
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    // Validar cada arquivo selecionado
    Array.from(files).forEach(file => {
      // Verificar tipo de arquivo
      if (!isAllowedFileType(file.type)) {
        toast({
          title: "Tipo de arquivo não permitido",
          description: `Apenas PDFs e documentos são permitidos. "${file.name}" não é um tipo válido.`,
          variant: "destructive"
        });
        return;
      }
      
      // Verificar tamanho do arquivo
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "Arquivo muito grande",
          description: `O arquivo "${file.name}" (${formatFileSize(file.size)}) excede o limite de ${formatFileSize(MAX_FILE_SIZE)}.`,
          variant: "destructive"
        });
        return;
      }
      
      // Arquivo válido, criar URL temporária para visualização
      const url = URL.createObjectURL(file);
      
      // Adicionar à lista de anexos
      const newAttachment: Attachment = {
        id: `attach-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        name: file.name,
        size: file.size,
        type: file.type,
        url,
        file
      };
      
      setAttachments(prev => [...prev, newAttachment]);
      
      // Notificar usuário que arquivo foi adicionado com sucesso
      toast({
        title: "Arquivo adicionado",
        description: `"${file.name}" (${formatFileSize(file.size)}) foi anexado com sucesso.`,
        variant: "default"
      });
    });
    
    // Limpar o input para permitir selecionar o mesmo arquivo novamente
    e.target.value = '';
  };
  
  // Processar imagens selecionadas com validação
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    // Validar cada imagem selecionada
    Array.from(files).forEach(file => {
      // Verificar tipo de arquivo
      if (!isAllowedImageType(file.type)) {
        toast({
          title: "Tipo de imagem não permitido",
          description: `Apenas JPG, PNG, GIF, WebP, BMP e SVG são permitidos. "${file.name}" não é um tipo válido.`,
          variant: "destructive"
        });
        return;
      }
      
      // Verificar tamanho do arquivo
      if (file.size > MAX_IMAGE_SIZE) {
        toast({
          title: "Imagem muito grande",
          description: `A imagem "${file.name}" (${formatFileSize(file.size)}) excede o limite de ${formatFileSize(MAX_IMAGE_SIZE)}.`,
          variant: "destructive"
        });
        return;
      }
      
      // Criar URL para visualização
      const url = URL.createObjectURL(file);
      
      // Verificar dimensões da imagem (exceto SVG)
      if (!file.type.includes('svg')) {
        const img = new Image();
        img.onload = () => {
          // Dimensões máximas razoáveis para uma imagem em chat (4000px)
          if (img.width > 4000 || img.height > 4000) {
            URL.revokeObjectURL(url);
            toast({
              title: "Dimensões da imagem muito grandes",
              description: `A imagem "${file.name}" (${img.width}x${img.height}px) excede o tamanho máximo permitido de 4000x4000px.`,
              variant: "destructive"
            });
            return;
          }
          
          // Tudo OK, adicionar à lista de anexos
          const newAttachment: Attachment = {
            id: `attach-img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            name: file.name,
            size: file.size,
            type: file.type,
            url,
            file
          };
          
          setAttachments(prev => [...prev, newAttachment]);
          
          toast({
            title: "Imagem adicionada",
            description: `"${file.name}" (${formatFileSize(file.size)}) foi anexada com sucesso.`,
            variant: "default"
          });
        };
        
        img.onerror = () => {
          URL.revokeObjectURL(url);
          toast({
            title: "Erro ao processar imagem",
            description: `Não foi possível carregar a imagem "${file.name}". O arquivo pode estar corrompido.`,
            variant: "destructive"
          });
        };
        
        img.src = url;
      } else {
        // Para SVGs, não verificamos dimensões
        const newAttachment: Attachment = {
          id: `attach-img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          name: file.name,
          size: file.size,
          type: file.type,
          url,
          file
        };
        
        setAttachments(prev => [...prev, newAttachment]);
        
        toast({
          title: "Imagem SVG adicionada",
          description: `"${file.name}" (${formatFileSize(file.size)}) foi anexada com sucesso.`,
          variant: "default"
        });
      }
    });
    
    // Limpar o input para permitir selecionar a mesma imagem novamente
    e.target.value = '';
  };
  
  // Remover um anexo
  const removeAttachment = (id: string) => {
    setAttachments(prev => {
      // Encontre o anexo a ser removido
      const attachmentToRemove = prev.find(a => a.id === id);
      
      // Revogue a URL do objeto para liberar memória
      if (attachmentToRemove) {
        URL.revokeObjectURL(attachmentToRemove.url);
      }
      
      // Retorne a lista filtrada
      return prev.filter(a => a.id !== id);
    });
  };
  
  // Atualizar a função handleSendMessage para incluir anexos
  const handleSendMessage = () => {
    if (!newMessage.trim() && attachments.length === 0) return;
    
    const newMsg: Message = {
      id: messages.length + 1,
      sender: 'recruiter',
      text: newMessage,
      time: 'agora',
      status: 'sent',
      attachments: attachments.length > 0 ? [...attachments] : undefined
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Limpar anexos após enviar
    attachments.forEach(attachment => {
      URL.revokeObjectURL(attachment.url);
    });
    setAttachments([]);
    
    // Resetar a altura do textarea após envio
    if (messageInputRef.current) {
      messageInputRef.current.style.height = 'auto';
    }
  };
  
  // Abrir modal de informações do candidato
  const openCandidateInfoModal = (contact: Contact) => {
    setSelectedContact(contact)
    setShowInfoModal(true)
  }
  
  // Adicionar emoji à mensagem
  const addEmoji = (emoji: string) => {
    setNewMessage(prev => prev + emoji)
    // Foca no input após adicionar o emoji
    if (messageInputRef.current) {
      messageInputRef.current.focus()
    }
  }
  
  // Abrir pré-visualização do perfil do candidato
  const openCandidatePreview = (e: React.MouseEvent, contact: Contact) => {
    e.stopPropagation(); // Evita que clique no botão também inicie a conversa
    setPreviewCandidate(contact);
  };
  
  // Aplicar template de mensagem
  const applyMessageTemplate = (template: MessageTemplate) => {
    if (!selectedContact) return;
    
    // Personalizar o template com o nome do candidato
    let personalizedText = template.text.replace('[Nome]', selectedContact.name);
    
    // Manter outros placeholders para que o usuário possa editá-los
    setNewMessage(personalizedText);
    setShowTemplates(false);
    
    // Focar na caixa de mensagem após aplicar o template
    if (messageInputRef.current) {
      messageInputRef.current.focus();
    }
  };
  
  // Filtrar templates de mensagens
  const filteredTemplates = messageTemplates.filter(template => {
    // Filtrar por categoria
    if (activeTemplateCategory !== 'all' && template.category !== activeTemplateCategory) {
      return false;
    }
    
    // Filtrar por termo de busca
    if (templateSearch) {
      const term = templateSearch.toLowerCase();
      return (
        template.title.toLowerCase().includes(term) ||
        template.description.toLowerCase().includes(term) ||
        template.text.toLowerCase().includes(term)
      );
    }
    
    return true;
  });
  
  // Renderização das imagens nos anexos
  const renderAttachmentPreview = (attachment: Attachment) => {
    // Para imagens, mostrar uma visualização
    if (attachment.type.startsWith('image/')) {
      return (
        <div className="relative group">
          <img 
            src={attachment.url} 
            alt={attachment.name}
            className="h-20 w-auto max-w-[200px] rounded-md object-cover border"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-white" 
              onClick={() => removeAttachment(attachment.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] p-1 rounded-b-md truncate">
            {attachment.name}
          </div>
        </div>
      );
    }
    
    // Para outros arquivos, manter o layout existente
    return (
      <div 
        key={attachment.id} 
        className="flex items-center gap-1.5 bg-muted px-2 py-1 rounded-md text-xs max-w-[200px] border shrink-0"
      >
        {attachment.type.startsWith('image/') ? (
          <ImageIcon className="h-3.5 w-3.5 text-blue-500" />
        ) : attachment.type.includes('pdf') ? (
          <FileText className="h-3.5 w-3.5 text-red-500" />
        ) : attachment.type.includes('word') || attachment.type.includes('document') ? (
          <FileText className="h-3.5 w-3.5 text-blue-500" />
        ) : attachment.type.includes('excel') || attachment.type.includes('sheet') ? (
          <FileSpreadsheet className="h-3.5 w-3.5 text-green-500" />
        ) : attachment.type.includes('zip') || attachment.type.includes('rar') ? (
          <Archive className="h-3.5 w-3.5 text-yellow-500" />
        ) : (
          <File className="h-3.5 w-3.5 text-slate-500" />
        )}
        <span className="truncate">{attachment.name}</span>
        <button 
          className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5"
          onClick={() => removeAttachment(attachment.id)}
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    );
  };
  
  // Definindo as ações do dropdown como um array de PageHeaderAction
  const headerDropdownActions: PageHeaderAction[] = [
    {
      label: "Arquivar todas lidas",
      icon: Archive,
      onClick: () => console.log("Arquivar todas lidas")
    },
    {
      label: "Exportar conversas",
      icon: Download,
      onClick: () => console.log("Exportar conversas")
    },
    {
      label: "Configurações de notificação",
      icon: Bell,
      onClick: () => console.log("Configurações de notificação")
    }
  ];
  
  return (
    <DashboardShell>
      <PageHeader 
        title="Mensagens"
        description="Gerencie suas conversas com candidatos em um só lugar"
        icon={MessageSquare}
        dropdownActions={headerDropdownActions}
        primaryAction={{
          label: "Nova Conversa",
          shortLabel: "Nova",
          icon: Plus,
          onClick: () => setShowNewConversationModal(true)
        }}
        showHelpButton={true}
        onHelpClick={() => console.log("Ajuda sobre mensagens")}
      />
      
      <div className="grid grid-cols-1 h-[calc(100vh-12rem)] overflow-hidden rounded-xl border bg-background shadow-sm">
        {/* Barra superior - Visível apenas em dispositivos móveis */}
        <div className="md:hidden flex items-center justify-between p-3 border-b">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-2" 
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Conversas</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
          
          {selectedContact && (
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm">{selectedContact.name}</span>
            </div>
          )}
      </div>
      
        <div className="flex h-full">
        {/* Painel de contatos */}
          <div 
            className={cn(
              "border-r bg-white w-full md:w-[320px] flex-shrink-0 flex flex-col",
              "md:static fixed inset-0 z-20 transition-transform duration-200 ease-in-out",
              mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
              mobileSidebarOpen && "bg-background/80 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none"
            )}
          >
            <div className="p-3 border-b">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm">Conversas</h3>
                <div className="flex items-center gap-1.5">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Filter className="h-3.5 w-3.5" />
              </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Circle className="mr-2 h-3 w-3 fill-current text-green-500" />
                        <span>Mostrar apenas online</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Clock className="mr-2 h-3 w-3" />
                        <span>Mais recentes primeiro</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <AlertCircle className="mr-2 h-3 w-3" />
                        <span>Não lidas primeiro</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <Dialog open={showNewConversationModal} onOpenChange={setShowNewConversationModal}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Plus className="h-3.5 w-3.5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Nova Conversa</DialogTitle>
                        <DialogDescription>
                          Inicie uma conversa com um candidato para discutir oportunidades
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="py-4 space-y-4">
                        <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar candidatos..." 
                className="pl-9"
                            value={newConversationSearch}
                            onChange={(e) => setNewConversationSearch(e.target.value)}
                            autoFocus
                          />
                        </div>
                        
                        <div className="border rounded-md overflow-hidden">
                          <div className="max-h-[300px] overflow-y-auto">
                            {filteredPossibleContacts.length === 0 ? (
                              <div className="flex flex-col items-center justify-center p-6 text-center">
                                <SearchX className="h-8 w-8 text-muted-foreground mb-2" />
                                <p className="text-sm font-medium">Nenhum candidato encontrado</p>
                                <p className="text-xs text-muted-foreground mt-1">Tente outros termos de busca</p>
                              </div>
                            ) : (
                              filteredPossibleContacts.map(contact => (
                                <div 
                                  key={contact.id}
                                  className="p-2.5 border-b last:border-0 hover:bg-muted/50 cursor-pointer transition-colors"
                                  onClick={() => startNewConversation(contact)}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="relative flex-shrink-0">
                                      <Avatar className="h-10 w-10">
                                        <AvatarImage src={contact.avatar} alt={contact.name} />
                                        <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      {contact.status === 'online' && (
                                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white"></span>
                                      )}
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between">
                                        <h4 className="font-medium text-sm">{contact.name}</h4>
                                        {contact.status === 'online' && (
                                          <Badge 
                                            variant="outline" 
                                            className="ml-2 text-xs h-5 border-green-200 text-green-700 px-1.5"
                                          >
                                            Online
                                          </Badge>
                                        )}
                                      </div>
                                      
                                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                                        <Briefcase className="h-3 w-3 flex-shrink-0 text-muted-foreground/70" />
                                        <span className="truncate">{contact.position}</span>
                                      </div>
                                      
                                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <MapPin className="h-3 w-3 flex-shrink-0 text-muted-foreground/70" />
                                        <span className="truncate">{contact.city}, {contact.state}</span>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-1">
                                      <Button 
                                        size="sm" 
                                        variant="ghost" 
                                        className="h-7 w-7 p-0 rounded-full hover:bg-muted/70"
                                        onClick={(e) => openCandidatePreview(e, contact)}
                                      >
                                        <User className="h-3.5 w-3.5 text-slate-600" />
                                        <span className="sr-only">Ver perfil</span>
                                      </Button>
                                      
                                      <Button 
                                        size="sm" 
                                        variant="ghost" 
                                        className="h-7 w-7 p-0 rounded-full hover:bg-primary/10"
                                      >
                                        <MessageSquare className="h-3.5 w-3.5 text-primary" />
                                        <span className="sr-only">Conversar</span>
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                        <Button 
                          variant="outline" 
                          onClick={() => setShowNewConversationModal(false)}
                          className="sm:mr-auto"
                        >
                          Cancelar
                        </Button>
                        <div className="flex items-center text-xs text-muted-foreground gap-1">
                          <Users className="h-3 w-3" />
                          <span>{filteredPossibleContacts.length} candidato(s) encontrado(s)</span>
                        </div>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  {/* Botão para fechar sidebar em mobile */}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 md:hidden" 
                    onClick={() => setMobileSidebarOpen(false)}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              
              <div className="relative mb-2">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input 
                  placeholder="Buscar candidatos..." 
                  className="pl-8 h-8 text-xs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 w-full h-7">
                  <TabsTrigger value="all" className="text-xs">Todos</TabsTrigger>
                  <TabsTrigger value="starred" className="text-xs">Favoritos</TabsTrigger>
                  <TabsTrigger value="archived" className="text-xs">Arquivados</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {filteredContacts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <MessageSquare className="h-8 w-8 text-muted-foreground mb-2" />
                <h4 className="font-medium">Nenhum candidato encontrado</h4>
                  <p className="text-sm text-muted-foreground mb-4">Tente ajustar seus filtros de busca</p>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={() => setShowNewConversationModal(true)}
                  >
                    <Plus className="h-4 w-4" />
                    <span>Iniciar Nova Conversa</span>
                  </Button>
              </div>
            ) : (
              filteredContacts.map(contact => (
                <div 
                  key={contact.id}
                  className={cn(
                      "py-1.5 px-2 cursor-pointer transition-colors",
                      "border-l-2 border-transparent",
                      selectedContact?.id === contact.id
                        ? "bg-primary/5 border-l-primary"
                        : "hover:bg-muted/50",
                      contact.unread && "bg-primary/5"
                  )}
                  onClick={() => handleSelectContact(contact)}
                >
                    <div className="flex items-center gap-2">
                      <div className="relative flex-shrink-0">
                        <Avatar className="h-8 w-8">
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                          <AvatarFallback className="text-xs">{contact.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      {contact.status === 'online' && (
                          <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 border-2 border-white"></span>
                      )}
                    </div>
                    
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex items-center justify-between">
                          <h4 className={cn(
                            "text-sm truncate max-w-[140px]",
                            contact.unread ? "font-semibold" : "font-medium"
                          )}>
                            {contact.name}
                          </h4>
                          <div className="flex items-center gap-1">
                      {contact.unread && (
                        <Badge className="h-2 w-2 rounded-full p-0" />
                      )}
                      {contact.isStarred && (
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            )}
                            <span className="text-[10px] text-muted-foreground whitespace-nowrap">{contact.time}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <p className="text-xs text-muted-foreground truncate max-w-full">
                            {contact.position}
                          </p>
                        </div>
                        
                        <p className={cn(
                          "text-xs truncate mt-0.5 max-w-full line-clamp-1",
                          contact.unread 
                            ? "text-foreground" 
                            : "text-muted-foreground"
                        )}>
                          {contact.lastMessage}
                        </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
            
            <div className="p-2 border-t bg-muted/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Keyboard className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">Dicas de teclado</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 text-xs px-2"
                  onClick={() => setShowNewConversationModal(true)}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Nova
                </Button>
              </div>
          </div>
        </div>
        
        {/* Área de conversa */}
          <div className="flex-1 flex flex-col bg-white relative">
          {selectedContact ? (
            <>
              {/* Cabeçalho da conversa */}
                <div className="py-3 px-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 md:h-10 md:w-10">
                    <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                    <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{selectedContact.name}</h3>
                        <Badge variant="outline" className="h-5 text-xs font-normal">
                          {selectedContact.status === 'online' ? 'Online' : 'Offline'}
                        </Badge>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span className="truncate max-w-[200px]">{selectedContact.position}</span>
                        <span className="mx-1">•</span>
                        <span>{selectedContact.city}, {selectedContact.state}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                            className="h-8 w-8"
                              onClick={() => openCandidateInfoModal(selectedContact)}
                            >
                              <Info className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                        <TooltipContent side="bottom">
                            <p>Informações do candidato</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Bell className="h-4 w-4" />
                  </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          <p>Gerenciar notificações</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Star className="mr-2 h-4 w-4" />
                        <span>{selectedContact.isStarred ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}</span>
                      </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>Agendar entrevista</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Archive className="mr-2 h-4 w-4" />
                        <span>{selectedContact.isArchived ? 'Desarquivar' : 'Arquivar'}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Excluir conversa</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              {/* Área de mensagens */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {messages.map(message => (
                  <div 
                    key={message.id}
                    className={cn(
                      "flex",
                      message.sender === 'recruiter' ? "justify-end" : "justify-start"
                    )}
                  >
                      {message.sender === 'candidate' && (
                        <Avatar className="h-8 w-8 mr-2 self-end mb-1">
                          <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                          <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                    <div 
                      className={cn(
                          "max-w-[75%] rounded-lg p-3 shadow-sm",
                        message.sender === 'recruiter' 
                            ? "bg-primary text-primary-foreground rounded-tr-none" 
                            : "bg-white border rounded-tl-none"
                      )}
                    >
                        {/* Anexos da mensagem */}
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="space-y-2 mb-2">
                            {message.attachments.map((attachment) => (
                      <div 
                                key={attachment.id}
                        className={cn(
                                  "flex items-center p-2 rounded-md gap-2",
                          message.sender === 'recruiter' 
                                    ? "bg-primary-foreground/10" 
                                    : "bg-muted"
                                )}
                              >
                                <div className="flex-shrink-0">
                                  {attachment.type.startsWith('image/') ? (
                                    <ImageIcon className="h-5 w-5" />
                                  ) : attachment.type.includes('pdf') ? (
                                    <FileText className="h-5 w-5" />
                                  ) : attachment.type.includes('word') || attachment.type.includes('document') ? (
                                    <FileText className="h-5 w-5" />
                                  ) : attachment.type.includes('excel') || attachment.type.includes('sheet') ? (
                                    <FileSpreadsheet className="h-5 w-5" />
                                  ) : attachment.type.includes('zip') || attachment.type.includes('rar') ? (
                                    <Archive className="h-5 w-5" />
                                  ) : (
                                    <File className="h-5 w-5" />
                                  )}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-xs font-medium truncate">
                                    {attachment.name}
                                  </div>
                                  <div className="text-[10px] opacity-70">
                                    {formatFileSize(attachment.size)}
                                  </div>
                                </div>
                                <a 
                                  href={attachment.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className={cn(
                                    "p-1 rounded-full hover:bg-muted transition-colors",
                                    message.sender === 'recruiter' 
                                      ? "text-primary-foreground" 
                                      : "text-foreground"
                                  )}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Download className="h-3.5 w-3.5" />
                                </a>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Texto da mensagem */}
                        {message.text.trim() && (
                          <p className="text-sm whitespace-pre-line">{message.text}</p>
                        )}
                        
                        <div 
                          className={cn(
                            "flex items-center gap-1 mt-1 text-[10px]",
                            message.sender === 'recruiter' 
                              ? "justify-end text-primary-foreground/80" 
                            : "justify-start text-muted-foreground"
                        )}
                      >
                          <span>{message.time}</span>
                        {message.sender === 'recruiter' && (
                          message.status === 'read' 
                            ? <CheckCheck className="h-3 w-3" /> 
                            : message.status === 'delivered' 
                                ? <Check className="h-3 w-3" /> 
                                : <Clock className="h-3 w-3" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                  <div ref={messagesEndRef} />
              </div>
                
                {/* Área de anexos */}
                {attachments.length > 0 && (
                  <div className="px-4 pt-2">
                    <div className="flex flex-wrap items-start gap-2 pb-2 overflow-x-auto">
                      {attachments.map(attachment => renderAttachmentPreview(attachment))}
                    </div>
                  </div>
                )}
              
              {/* Área de input */}
                <div className="p-3 border-t">
                  {/* Input de arquivo oculto para documentos */}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    multiple 
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.odt,.ods,.odp" 
                    onChange={handleFileSelect}
                  />
                  
                  {/* Input de arquivo oculto para imagens */}
                  <input 
                    type="file" 
                    ref={imageInputRef} 
                    className="hidden" 
                    multiple 
                    accept="image/jpeg,image/png,image/gif,image/webp,image/bmp,image/svg+xml" 
                    onChange={handleImageSelect}
                  />
                  
                  <div className="flex items-center gap-2 bg-muted/30 rounded-lg p-1.5">
                    <div className="flex gap-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 rounded-full"
                              onClick={handleAttachmentClick}
                            >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <p>Anexar documento (PDF/DOC, máx. 10MB)</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 rounded-full"
                              onClick={handleImageClick}
                            >
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <p>Enviar imagem (JPG/PNG, máx. 5MB)</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <PopoverTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className={cn(
                                    "h-8 w-8 rounded-full",
                                    showEmojiPicker && "bg-primary/10 text-primary"
                                  )}
                                >
                                  <Smile className="h-4 w-4" />
                                </Button>
                              </PopoverTrigger>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p>Inserir emoji</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <PopoverContent 
                          className="w-[300px] p-2" 
                          side="top"
                          align="start"
                        >
                          <div className="flex flex-col space-y-3">
                            <div className="flex overflow-x-auto pb-2 max-w-full">
                              <Tabs value={activeEmojiCategory} onValueChange={setActiveEmojiCategory}>
                                <TabsList className="h-8 flex space-x-1">
                                  {emojiCategories.map(category => (
                                    <TabsTrigger 
                                      key={category.name}
                                      value={category.name}
                                      className="h-7 px-2 text-xs"
                                    >
                                      {category.name}
                                    </TabsTrigger>
                                  ))}
                                </TabsList>
                              </Tabs>
                            </div>
                            
                            <div className="max-h-[200px] overflow-y-auto">
                              <div className="grid grid-cols-8 gap-1">
                                {emojiCategories
                                  .find(c => c.name === activeEmojiCategory)?.emojis
                                  .map((emoji, index) => (
                                    <button
                                      key={index}
                                      className="h-8 w-8 flex items-center justify-center rounded hover:bg-muted cursor-pointer text-lg"
                                      onClick={() => addEmoji(emoji)}
                                    >
                                      {emoji}
                                    </button>
                                  ))
                                }
                              </div>
                            </div>
                            
                            <div className="pt-2 border-t">
                              <div className="text-xs font-medium text-muted-foreground mb-2">Usados recentemente</div>
                              <div className="flex flex-wrap gap-1">
                                {commonEmojis.slice(0, 12).map((emoji, index) => (
                                  <button
                                    key={index}
                                    className="h-7 w-7 flex items-center justify-center rounded hover:bg-muted cursor-pointer"
                                    onClick={() => addEmoji(emoji)}
                                  >
                                    {emoji}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                      
                      <Popover open={showTemplates} onOpenChange={setShowTemplates}>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <PopoverTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className={cn(
                                    "h-8 w-8 rounded-full",
                                    showTemplates && "bg-primary/10 text-primary"
                                  )}
                                >
                                  <FileText className="h-4 w-4" />
                                </Button>
                              </PopoverTrigger>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p>Templates de mensagens</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <PopoverContent 
                          className="w-[350px] p-2" 
                          side="top"
                          align="start"
                        >
                          <div className="flex flex-col space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium">Templates de Mensagens</h4>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 w-7 p-0" 
                                onClick={() => setShowTemplates(false)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <div className="relative">
                              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input 
                                placeholder="Buscar templates..." 
                                className="pl-8 h-8 text-xs"
                                value={templateSearch}
                                onChange={(e) => setTemplateSearch(e.target.value)}
                              />
                            </div>
                            
                            <div className="flex overflow-x-auto pb-1 max-w-full">
                              <Tabs value={activeTemplateCategory} onValueChange={(value) => setActiveTemplateCategory(value as any)}>
                                <TabsList className="h-8 flex space-x-1">
                                  <TabsTrigger 
                                    value="all" 
                                    className="h-7 px-2 text-xs"
                                  >
                                    Todos
                                  </TabsTrigger>
                                  <TabsTrigger 
                                    value="inicial" 
                                    className="h-7 px-2 text-xs"
                                  >
                                    Contato
                                  </TabsTrigger>
                                  <TabsTrigger 
                                    value="entrevista" 
                                    className="h-7 px-2 text-xs"
                                  >
                                    Entrevista
                                  </TabsTrigger>
                                  <TabsTrigger 
                                    value="feedback" 
                                    className="h-7 px-2 text-xs"
                                  >
                                    Feedback
                                  </TabsTrigger>
                                  <TabsTrigger 
                                    value="oferta" 
                                    className="h-7 px-2 text-xs"
                                  >
                                    Oferta
                                  </TabsTrigger>
                                </TabsList>
                              </Tabs>
                            </div>
                            
                            <div className="max-h-[300px] overflow-y-auto pr-1">
                              <div className="space-y-2">
                                {filteredTemplates.length === 0 ? (
                                  <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                                    <p className="text-sm font-medium">Nenhum template encontrado</p>
                                    <p className="text-xs text-muted-foreground mt-1">Tente outros termos de busca</p>
                                  </div>
                                ) : (
                                  filteredTemplates.map(template => (
                                    <div 
                                      key={template.id}
                                      className="border rounded-md p-2 hover:border-primary/30 cursor-pointer transition-colors"
                                      onClick={() => applyMessageTemplate(template)}
                                    >
                                      <div className="flex items-center justify-between mb-1">
                                        <h5 className="text-sm font-medium">{template.title}</h5>
                                        <Badge 
                                          variant="outline" 
                                          className={cn(
                                            "h-5 text-xs font-normal",
                                            template.category === 'inicial' && "border-blue-200 text-blue-700",
                                            template.category === 'entrevista' && "border-purple-200 text-purple-700",
                                            template.category === 'feedback' && "border-amber-200 text-amber-700",
                                            template.category === 'oferta' && "border-green-200 text-green-700",
                                            template.category === 'informativo' && "border-slate-200 text-slate-700"
                                          )}
                                        >
                                          {template.category === 'inicial' && "Contato"}
                                          {template.category === 'entrevista' && "Entrevista"}
                                          {template.category === 'feedback' && "Feedback"}
                                          {template.category === 'oferta' && "Oferta"}
                                          {template.category === 'informativo' && "Informativo"}
                                        </Badge>
                                      </div>
                                      <p className="text-xs text-muted-foreground mb-1.5">{template.description}</p>
                                      <div className="text-xs bg-muted/50 p-1.5 rounded-sm max-h-[80px] overflow-hidden relative">
                                        <p className="whitespace-pre-line line-clamp-3">
                                          {template.text}
                                        </p>
                                        {template.text.split('\n').length > 3 && (
                                          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-muted/50 to-transparent"></div>
                                        )}
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <Textarea 
                      ref={messageInputRef}
                      placeholder={attachments.length > 0 ? "Adicionar uma mensagem... (Shift+Enter para quebrar linha)" : "Digite sua mensagem... (Shift+Enter para quebrar linha)"} 
                      className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 resize-none py-2 px-3 min-h-[38px]"
                    value={newMessage}
                      onChange={(e) => {
                        setNewMessage(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          if (e.shiftKey) {
                            // Shift+Enter: adiciona quebra de linha
                            return;
                          } else {
                            // Enter: envia a mensagem
                            e.preventDefault(); // Previne a quebra de linha padrão
                            handleSendMessage();
                          }
                        }
                      }}
                      rows={1}
                      style={{ 
                        overflow: 'hidden',
                      }}
                    />
                    
                    <Button 
                      size="sm" 
                      className={cn(
                        "rounded-full w-8 h-8 p-0 flex-shrink-0", 
                        (!newMessage.trim() && attachments.length === 0) && "opacity-50 cursor-not-allowed"
                      )} 
                      onClick={handleSendMessage} 
                      disabled={!newMessage.trim() && attachments.length === 0}
                    >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                  
                  {/* Informação sobre anexos permitidos */}
                  <div className="flex justify-between mt-1">
                    <p className="text-[10px] text-muted-foreground pl-2">
                      Arquivos: PDF, DOC (10MB) | Imagens: JPG, PNG, GIF (5MB)
                    </p>
                    <p className="text-[10px] text-muted-foreground pr-2">
                      Pressione Shift+Enter para adicionar uma nova linha
                    </p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhuma conversa selecionada</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  Selecione um candidato para visualizar a conversa ou inicie uma nova.
                </p>
                <Button 
                  onClick={() => setShowNewConversationModal(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Iniciar Nova Conversa</span>
                </Button>
            </div>
          )}
          </div>
        </div>
      </div>
      
      {/* Modal de informações do candidato */}
      {selectedContact && (
        <Dialog open={showInfoModal} onOpenChange={setShowInfoModal}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Informações do Candidato</DialogTitle>
              <DialogDescription>
                Detalhes completos sobre o candidato e suas qualificações.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                  <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div>
                  <h3 className="text-xl font-semibold">{selectedContact.name}</h3>
                  <p className="text-muted-foreground">{selectedContact.position}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{selectedContact.city}, {selectedContact.state}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Experiência
                  </h4>
                  <p className="text-sm">{selectedContact.experience}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Formação
                  </h4>
                  <p className="text-sm">{selectedContact.education}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Habilidades
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedContact.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-3">Contato</h4>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    Enviar e-mail
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Phone className="mr-2 h-4 w-4" />
                    Ligar
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    Agendar entrevista
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Button>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowInfoModal(false)}>Fechar</Button>
              <Button>Ver perfil completo</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Modal de pré-visualização do perfil do candidato */}
      {previewCandidate && (
        <Dialog open={!!previewCandidate} onOpenChange={(open) => !open && setPreviewCandidate(null)}>
          <DialogContent className="sm:max-w-[450px]">
            <DialogHeader>
              <DialogTitle>Perfil do Candidato</DialogTitle>
              <DialogDescription>
                Informações detalhadas sobre {previewCandidate?.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <div className="flex items-center gap-4 pb-4 border-b">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={previewCandidate.avatar} alt={previewCandidate.name} />
                  <AvatarFallback>{previewCandidate.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div>
                  <h3 className="text-lg font-semibold">{previewCandidate.name}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant={previewCandidate.status === 'online' ? 'default' : 'outline'} className="mt-1">
                      {previewCandidate.status === 'online' ? 'Online' : 'Offline'}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-3 pt-4">
                <div className="flex items-start gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">Cargo</h4>
                    <p className="text-sm">{previewCandidate.position}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">Localização</h4>
                    <p className="text-sm">{previewCandidate.city}, {previewCandidate.state}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Medal className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">Experiência</h4>
                    <p className="text-sm">{previewCandidate.experience}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">Formação</h4>
                    <p className="text-sm">{previewCandidate.education}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">Principais habilidades</h4>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {previewCandidate.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex gap-2">
              <Button variant="outline" onClick={() => setPreviewCandidate(null)}>
                Fechar
              </Button>
              <Button 
                className="gap-2" 
                onClick={() => {
                  if (previewCandidate) {
                    startNewConversation(previewCandidate);
                    setPreviewCandidate(null);
                  }
                }}
              >
                <MessageSquare className="h-4 w-4" />
                <span>Iniciar Conversa</span>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DashboardShell>
  )
}

