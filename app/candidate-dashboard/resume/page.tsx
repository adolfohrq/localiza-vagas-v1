"use client"

import type React from "react"
import { useState, useEffect, useMemo, useRef } from "react"
import { CandidateDashboardShell } from "@/components/candidate-dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Building2,
  Download,
  Upload,
  Plus,
  Trash2,
  PenLine,
  GraduationCap,
  Award,
  ExternalLink,
  X,
  Camera,
  Clock,
  Briefcase,
  MapPin,
  FileText,
  PencilIcon,
  LockOpenIcon,
  ChevronRight,
  HomeIcon,
  Globe,
  Github,
  Linkedin,
  FileIcon,
  Youtube,
  ImagePlus,
  LinkIcon, 
  ImageIcon, 
  TrashIcon, 
  PenSquare,
  Facebook, 
  Twitter, 
  Instagram,
  Eye, 
  EyeOff, 
  Calendar, 
  InfoIcon,
  Check, 
  ChevronsUpDown,
  ChevronDown,
  Pencil,
  Settings,
  Search
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Slider } from "@/components/ui/slider"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Checkbox } from "@/components/ui/checkbox"
// Importar os componentes necessários para o Combobox
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, differenceInMonths, differenceInYears } from "date-fns"
import { ptBR } from "date-fns/locale"
import Image from "next/image"
import { FaPlus, FaEdit, FaTrash, FaTimes, FaLink, FaChevronDown, FaSave, 
  FaLinkedin, FaGithub, FaTwitter, FaInstagram, FaFacebook, FaYoutube, 
  FaMedium, FaBehance, FaDribbble, FaGlobe } from 'react-icons/fa';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

type PortfolioItem = {
  id: string
  type: "link" | "file" | "image" | "github" | "linkedin"
  title: string
  description: string
  url: string
  tags: string[]
  featured: boolean
}

type SocialMediaProfile = {
  id: string
  platform: string
  username: string
  url: string
}

type HideProfileReason = {
  id: string
  label: string
}

// Adicionando tipo para campos bloqueados
type BlockedField = {
  fieldName: string
  blocked: boolean
}

// Adicionar novos tipos para as habilidades
type SkillLevel = "Básico" | "Intermediário" | "Avançado" | "Nativo" | "Fluente";

type Skill = {
  id: string;
  name: string;
  category: "technical" | "professional" | "social" | "languages";
  level?: SkillLevel;
  subcategory?: string;
};

// Adicionar tipos para as estruturas de habilidades disponíveis
type SkillsBySubcategory = {
  [subcategory: string]: string[];
};

type SkillsByCategory = {
  technical: SkillsBySubcategory;
  professional: SkillsBySubcategory;
  social: SkillsBySubcategory;
};

// Adicionar lista de habilidades disponíveis por categoria e subcategoria
const availableSkills: SkillsByCategory = {
  technical: {
    "Desenvolvimento Front-end": [
      "React", "Angular", "Vue.js", "TypeScript", "JavaScript", "HTML5", "CSS3", 
      "SASS/SCSS", "Tailwind CSS", "Bootstrap", "Material UI", "Redux", "Next.js", 
      "Gatsby", "Webpack", "Responsive Design", "Web Components", "Styled Components",
      "Jest", "Testing Library", "Cypress", "Storybook", "PWA", "Web Performance"
    ],
    "Desenvolvimento Back-end": [
      "Node.js", "Express", "NestJS", "Django", "Flask", "Ruby on Rails", "Spring Boot", 
      "ASP.NET Core", "Laravel", "PHP", "Java", "C#", "Python", "Ruby", "Go", "Rust",
      "REST API", "GraphQL", "WebSockets", "Microserviços", "Serverless", "API Gateway",
      "OAuth/OpenID", "JWT", "SOAP"
    ],
    "DevOps & Infraestrutura": [
      "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform", "Ansible",
      "Jenkins", "GitHub Actions", "CircleCI", "Travis CI", "CI/CD", "Linux", "Nginx",
      "Apache", "Monitoramento", "Logging", "ELK Stack", "Prometheus", "Grafana"
    ],
    "Banco de Dados": [
      "SQL", "MySQL", "PostgreSQL", "SQLite", "SQL Server", "Oracle", "MongoDB",
      "DynamoDB", "Cassandra", "Redis", "Elasticsearch", "Firebase", "Neo4j",
      "Modelagem de Dados", "Normalização", "Indexação", "Query Optimization"
    ],
    "Mobile": [
      "React Native", "Flutter", "Swift", "Kotlin", "Objective-C", "Java Android",
      "Xamarin", "Ionic", "Capacitor", "Mobile UI/UX", "App Store Optimization",
      "Push Notifications", "Offline First", "Mobile Performance"
    ],
    "Outros": [
      "Machine Learning", "Data Science", "Blockchain", "IoT", "AR/VR", "Game Development",
      "Segurança da Informação", "Criptografia", "Computação em Nuvem", "Big Data",
      "Sistemas Embarcados", "Redes de Computadores", "Computação Distribuída"
    ]
  },
  professional: {
    "Gestão & Liderança": [
      "Gestão de Projetos", "Liderança de Equipe", "Metodologias Ágeis", "Scrum",
      "Kanban", "OKRs", "Gestão de Stakeholders", "Gestão de Produto", "Gestão de Riscos",
      "Planejamento Estratégico", "Delegação", "Mentoria", "Coaching", "Feedback Construtivo"
    ],
    "Habilidades Analíticas": [
      "Resolução de Problemas", "Pensamento Crítico", "Análise de Dados", "Tomada de Decisão",
      "Gestão de Tempo", "Priorização", "Análise de Requisitos", "Análise de Mercado",
      "Análise Financeira", "Análise de Processos", "Pensamento Sistêmico", "Análise de Risco"
    ],
    "Organização": [
      "Gestão de Tarefas", "Documentação", "Organização de Informações", "Planejamento",
      "Definição de Processos", "Metodologias", "Gestão de Conhecimento", "Gestão de Qualidade"
    ],
    "Outros": [
      "Empreendedorismo", "Inovação", "Gestão de Mudanças", "Gestão de Conflitos",
      "Gestão de Crise", "Gestão Financeira", "Marketing Digital", "Vendas B2B",
      "Customer Success", "Experiência do Cliente", "Gestão de Comunidade"
    ]
  },
  social: {
    "Comunicação & Relacionamento": [
      "Comunicação Verbal", "Comunicação Escrita", "Trabalho em Equipe", "Networking",
      "Negociação", "Apresentações", "Feedback", "Escuta Ativa", "Persuasão",
      "Comunicação Assertiva", "Comunicação Intercultural", "Facilitação de Reuniões",
      "Storytelling", "Oratória", "Comunicação Não-Verbal"
    ],
    "Adaptabilidade & Crescimento": [
      "Adaptabilidade", "Aprendizado Contínuo", "Resiliência", "Criatividade",
      "Inteligência Emocional", "Autogestão", "Iniciativa", "Proatividade",
      "Flexibilidade", "Curiosidade", "Autodisciplina", "Perseverança",
      "Gerenciamento de Estresse", "Autoconhecimento"
    ],
    "Idiomas": [
      "Português", "Inglês", "Espanhol", "Francês", "Alemão", "Italiano",
      "Mandarim", "Japonês", "Russo", "Árabe", "Hindi", "Coreano"
    ],
    "Outros": [
      "Empatia", "Ética Profissional", "Responsabilidade Social", "Diversidade e Inclusão",
      "Consciência Cultural", "Trabalho Voluntário", "Mentoria Social", "Liderança Comunitária"
    ]
  }
};

type Experience = {
  id: string
  company: string
  position: string
  startDate: Date
  endDate?: Date
  current: boolean
  description: string
  skills: string[]
  location: string
}

type Education = {
  id: string
  institution: string
  degree: string
  startDate: Date
  endDate?: Date
  current: boolean
  achievements?: string[]
  courses?: string[]
  location: string
}

type Certificate = {
  id: string
  name: string
  issuer: string
  issueDate: Date
  expirationDate?: Date
  credentialId?: string
  credentialUrl?: string
  skills: string[]
}

// Tipos de dados
type Language = {
  id: string
  language: string
  level: "Básico" | "Intermediário" | "Avançado" | "Fluente" | "Nativo"
}

export default function ResumePage() {
  const [editMode, setEditMode] = useState(false)
  const [dateOfBirth, setDateOfBirth] = useState<Date>()
  const [age, setAge] = useState<number | null>(null)
  const [isProfileHidden, setIsProfileHidden] = useState(false)
  const [hideProfileReasons, setHideProfileReasons] = useState<string[]>([])
  const [hideReasons, setHideReasons] = useState<string[]>([])
  const [otherReason, setOtherReason] = useState("")
  const [showOtherReason, setShowOtherReason] = useState(false)
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: "1",
      type: "github",
      title: "E-commerce Platform",
      description: "A full-stack e-commerce platform built with React and Node.js",
      url: "https://github.com/johndoe/ecommerce-platform",
      tags: ["React", "Node.js", "MongoDB"],
      featured: true,
    },
    {
      id: "2",
      type: "link",
      title: "Personal Blog",
      description: "My tech blog where I write about web development and software engineering",
      url: "https://johndoe-techblog.com",
      tags: ["Next.js", "Technical Writing"],
      featured: false,
    },
    {
      id: "3",
      type: "image",
      title: "UI/UX Design Portfolio",
      description: "A collection of my best UI/UX design works",
      url: "/placeholder.svg",
      tags: ["UI/UX", "Figma", "Adobe XD"],
      featured: true,
    },
    {
      id: "4",
      type: "file",
      title: "Machine Learning Research Paper",
      description: "My published research paper on advanced ML algorithms",
      url: "/example-paper.pdf",
      tags: ["Machine Learning", "Research", "Python"],
      featured: false,
    },
    {
      id: "5",
      type: "linkedin",
      title: "LinkedIn Profile",
      description: "My professional network and career highlights",
      url: "https://www.linkedin.com/in/johndoe",
      tags: ["Professional Network", "Career"],
      featured: true,
    },
  ])
  const [newItem, setNewItem] = useState<Partial<PortfolioItem>>({ type: "link", tags: [], featured: false })
  const [newTag, setNewTag] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [socialMediaProfiles, setSocialMediaProfiles] = useState<SocialMediaProfile[]>([
    {
      id: "1",
      platform: "LinkedIn",
      username: "joao-silva",
      url: "https://www.linkedin.com/in/joao-silva",
    },
    {
      id: "2",
      platform: "GitHub",
      username: "joaosilva",
      url: "https://github.com/joaosilva",
    },
    {
      id: "3",
      platform: "Twitter",
      username: "joaosilva_dev",
      url: "https://twitter.com/joaosilva_dev",
    },
  ])
  const [newSocialMedia, setNewSocialMedia] = useState<Partial<SocialMediaProfile>>({})
  const [coverPhoto, setCoverPhoto] = useState<string>("/placeholder.svg?height=128&width=512")
  const [skills, setSkills] = useState<Skill[]>([
    // Habilidades Técnicas
    { id: "1", name: "React", level: "Avançado", category: "technical", subcategory: "Desenvolvimento Front-end" },
    { id: "2", name: "TypeScript", level: "Avançado", category: "technical", subcategory: "Desenvolvimento Front-end" },
    { id: "3", name: "Next.js", level: "Avançado", category: "technical", subcategory: "Desenvolvimento Front-end" },
    { id: "4", name: "HTML/CSS", level: "Avançado", category: "technical", subcategory: "Desenvolvimento Front-end" },
    { id: "5", name: "Tailwind CSS", level: "Intermediário", category: "technical", subcategory: "Desenvolvimento Front-end" },
    { id: "6", name: "Redux", level: "Avançado", category: "technical", subcategory: "Desenvolvimento Front-end" },
    { id: "7", name: "Styled Components", level: "Intermediário", category: "technical", subcategory: "Desenvolvimento Front-end" },
    
    { id: "8", name: "Node.js", level: "Avançado", category: "technical", subcategory: "Desenvolvimento Back-end" },
    { id: "9", name: "Express", level: "Avançado", category: "technical", subcategory: "Desenvolvimento Back-end" },
    { id: "10", name: "MongoDB", level: "Avançado", category: "technical", subcategory: "Desenvolvimento Back-end" },
    { id: "11", name: "PostgreSQL", level: "Intermediário", category: "technical", subcategory: "Desenvolvimento Back-end" },
    { id: "12", name: "GraphQL", level: "Intermediário", category: "technical", subcategory: "Desenvolvimento Back-end" },
    { id: "13", name: "REST API", level: "Avançado", category: "technical", subcategory: "Desenvolvimento Back-end" },
    { id: "14", name: "Microserviços", level: "Intermediário", category: "technical", subcategory: "Desenvolvimento Back-end" },
    
    { id: "15", name: "AWS", level: "Intermediário", category: "technical", subcategory: "DevOps & Infraestrutura" },
    { id: "16", name: "Docker", level: "Intermediário", category: "technical", subcategory: "DevOps & Infraestrutura" },
    { id: "17", name: "Git", level: "Avançado", category: "technical", subcategory: "DevOps & Infraestrutura" },
    { id: "18", name: "CI/CD", level: "Intermediário", category: "technical", subcategory: "DevOps & Infraestrutura" },
    { id: "19", name: "Linux", level: "Avançado", category: "technical", subcategory: "DevOps & Infraestrutura" },
    { id: "20", name: "Kubernetes", level: "Básico", category: "technical", subcategory: "DevOps & Infraestrutura" },
    
    // Habilidades Profissionais
    { id: "21", name: "Gestão de Projetos", level: "Avançado", category: "professional", subcategory: "Gestão & Liderança" },
    { id: "22", name: "Liderança de Equipe", level: "Avançado", category: "professional", subcategory: "Gestão & Liderança" },
    { id: "23", name: "Metodologias Ágeis", level: "Avançado", category: "professional", subcategory: "Gestão & Liderança" },
    { id: "24", name: "Scrum", level: "Avançado", category: "professional", subcategory: "Gestão & Liderança" },
    { id: "25", name: "Kanban", level: "Intermediário", category: "professional", subcategory: "Gestão & Liderança" },
    { id: "26", name: "OKRs", level: "Intermediário", category: "professional", subcategory: "Gestão & Liderança" },
    { id: "27", name: "Gestão de Stakeholders", level: "Intermediário", category: "professional", subcategory: "Gestão & Liderança" },
    
    { id: "28", name: "Resolução de Problemas", level: "Avançado", category: "professional", subcategory: "Habilidades Analíticas" },
    { id: "29", name: "Pensamento Crítico", level: "Avançado", category: "professional", subcategory: "Habilidades Analíticas" },
    { id: "30", name: "Análise de Dados", level: "Intermediário", category: "professional", subcategory: "Habilidades Analíticas" },
    { id: "31", name: "Tomada de Decisão", level: "Avançado", category: "professional", subcategory: "Habilidades Analíticas" },
    { id: "32", name: "Gestão de Tempo", level: "Intermediário", category: "professional", subcategory: "Habilidades Analíticas" },
    { id: "33", name: "Priorização", level: "Avançado", category: "professional", subcategory: "Habilidades Analíticas" },
    
    // Habilidades Sociais
    { id: "34", name: "Comunicação Verbal", level: "Avançado", category: "social", subcategory: "Comunicação & Relacionamento" },
    { id: "35", name: "Comunicação Escrita", level: "Avançado", category: "social", subcategory: "Comunicação & Relacionamento" },
    { id: "36", name: "Trabalho em Equipe", level: "Avançado", category: "social", subcategory: "Comunicação & Relacionamento" },
    { id: "37", name: "Networking", level: "Intermediário", category: "social", subcategory: "Comunicação & Relacionamento" },
    { id: "38", name: "Negociação", level: "Intermediário", category: "social", subcategory: "Comunicação & Relacionamento" },
    { id: "39", name: "Apresentações", level: "Avançado", category: "social", subcategory: "Comunicação & Relacionamento" },
    { id: "40", name: "Feedback", level: "Avançado", category: "social", subcategory: "Comunicação & Relacionamento" },
    
    { id: "41", name: "Adaptabilidade", level: "Avançado", category: "social", subcategory: "Adaptabilidade & Crescimento" },
    { id: "42", name: "Aprendizado Contínuo", level: "Avançado", category: "social", subcategory: "Adaptabilidade & Crescimento" },
    { id: "43", name: "Resiliência", level: "Avançado", category: "social", subcategory: "Adaptabilidade & Crescimento" },
    { id: "44", name: "Criatividade", level: "Intermediário", category: "social", subcategory: "Adaptabilidade & Crescimento" },
    { id: "45", name: "Inteligência Emocional", level: "Avançado", category: "social", subcategory: "Adaptabilidade & Crescimento" },
    { id: "46", name: "Autogestão", level: "Avançado", category: "social", subcategory: "Adaptabilidade & Crescimento" },
    
    { id: "47", name: "Português", level: "Nativo", category: "social", subcategory: "Idiomas" },
    { id: "48", name: "Inglês", level: "Fluente", category: "social", subcategory: "Idiomas" },
    { id: "49", name: "Espanhol", level: "Intermediário", category: "social", subcategory: "Idiomas" },
  ]);
  
  const [isAddSkillDialogOpen, setIsAddSkillDialogOpen] = useState(false);
  const [isEditSkillDialogOpen, setIsEditSkillDialogOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState<Skill | null>(null);
  const [newSkill, setNewSkill] = useState<{
    name: string;
    category: "technical" | "professional" | "social";
    level?: number;
  }>({
    name: "",
    category: "technical",
    level: 3,
  });
  
  // Adicionar estado para armazenar habilidades disponíveis filtradas
  const [availableSkillsList, setAvailableSkillsList] = useState<string[]>(
    Object.values(availableSkills.technical).flat()
  );
  
  const hideProfileReasonsList: HideProfileReason[] = [
    { id: "hired", label: "Fui contratado por uma empresa" },
    { id: "dislike", label: "Não gostei do site" },
    { id: "break", label: "Estou fazendo uma pausa na busca por emprego" },
    { id: "other", label: "Outro motivo" },
  ]

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isSkillPopoverOpen, setIsSkillPopoverOpen] = useState(false);

  // Estado para experiências profissionais
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: "1",
      company: "TechCorp",
      position: "Desenvolvedor Full Stack Senior",
      startDate: new Date(2021, 0, 1),
      current: true,
      description: "Liderança técnica de equipe, desenvolvimento de aplicações web escaláveis, implementação de microsserviços.",
      skills: ["React", "Node.js", "AWS", "Docker", "MongoDB"],
      location: "São Paulo, SP"
    },
    {
      id: "2",
      company: "InnovaSoft",
      position: "Desenvolvedor Full Stack Pleno",
      startDate: new Date(2018, 0, 1),
      endDate: new Date(2021, 0, 1),
      current: false,
      description: "Desenvolvimento de soluções web, integração com APIs, otimização de performance.",
      skills: ["Angular", "Express", "PostgreSQL", "Redis"],
      location: "São Paulo, SP"
    },
    {
      id: "3",
      company: "WebTech Solutions",
      position: "Desenvolvedor Front-end Júnior",
      startDate: new Date(2016, 0, 1),
      endDate: new Date(2018, 0, 1),
      current: false,
      description: "Desenvolvimento de interfaces de usuário, implementação de designs responsivos.",
      skills: ["HTML/CSS", "JavaScript", "React", "SASS"],
      location: "São Paulo, SP"
    }
  ])
  
  // Estado para educação
  const [educations, setEducations] = useState<Education[]>([
    {
      id: "edu-1",
      institution: "Universidade de São Paulo",
      degree: "Bacharelado em Ciência da Computação",
      startDate: new Date(2012, 0, 1),
      endDate: new Date(2016, 11, 31),
      current: false,
      achievements: [
        "Projeto de Iniciação Científica em Machine Learning",
        "Participação em maratona de programação",
        "Monitoria em Algoritmos e Estruturas de Dados"
      ],
      courses: ["Algoritmos", "Banco de Dados", "Engenharia de Software", "Redes de Computadores"],
      location: "São Paulo, SP"
    }
  ])
  
  // Estado para certificados
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: "cert-1",
      name: "AWS Certified Developer - Associate",
      issuer: "Amazon Web Services",
      issueDate: new Date(2023, 11, 15),
      expirationDate: new Date(2026, 11, 15),
      credentialId: "AWS-DEV-12345",
      credentialUrl: "https://www.credly.com/badges/aws-certified-developer-associate",
      skills: ["AWS Lambda", "DynamoDB", "S3", "CloudFormation", "API Gateway"]
    },
    { 
      id: "cert-2",
      name: "Professional Scrum Master I", 
      issuer: "Scrum.org", 
      issueDate: new Date(2023, 7, 20),
      credentialId: "PSM-I-98765",
      credentialUrl: "https://www.scrum.org/certificates/verify",
      skills: ["Scrum", "Agile", "Sprint Planning", "Retrospectives"]
    },
    { 
      id: "cert-3",
      name: "MongoDB Developer Certification", 
      issuer: "MongoDB University", 
      issueDate: new Date(2023, 5, 10),
      credentialId: "MDB-DEV-54321",
      credentialUrl: "https://university.mongodb.com/certification/verify",
      skills: ["MongoDB", "Aggregation", "Indexing", "Data Modeling"]
    },
    { 
      id: "cert-4",
      name: "Microsoft Certified: Azure Developer Associate", 
      issuer: "Microsoft", 
      issueDate: new Date(2023, 3, 5),
      expirationDate: new Date(2025, 3, 5),
      credentialId: "AZURE-DEV-67890",
      credentialUrl: "https://learn.microsoft.com/en-us/credentials/certifications/azure-developer",
      skills: ["Azure Functions", "Cosmos DB", "App Service", "Azure DevOps"]
    }
  ])
  
  // Estado para o modal de certificado
  const [certificateModalOpen, setCertificateModalOpen] = useState(false)
  const [currentCertificate, setCurrentCertificate] = useState<Certificate | null>(null)
  const [newCertificate, setNewCertificate] = useState<Partial<Certificate>>({
    name: "",
    issuer: "",
    issueDate: new Date(),
    skills: []
  })
  const [certificateSkill, setCertificateSkill] = useState("")
  
  // Estado para o modal de experiência
  const [experienceModalOpen, setExperienceModalOpen] = useState(false)
  const [currentExperience, setCurrentExperience] = useState<Experience | null>(null)
  const [newExperience, setNewExperience] = useState<Partial<Experience>>({
    company: "",
    position: "",
    startDate: new Date(),
    current: false,
    description: "",
    skills: [],
    location: ""
  })
  const [experienceSkill, setExperienceSkill] = useState("")
  
  // Estado para o modal de educação
  const [educationModalOpen, setEducationModalOpen] = useState(false)
  const [currentEducation, setCurrentEducation] = useState<Education | null>(null)
  const [newEducation, setNewEducation] = useState<Partial<Education>>({
    institution: "",
    degree: "",
    startDate: new Date(),
    current: false,
    achievements: [],
    courses: [],
    location: ""
  })
  
  // Estado para controlar campos bloqueados
  const [blockedFields, setBlockedFields] = useState<BlockedField[]>([
    { fieldName: "name", blocked: false },
    { fieldName: "email", blocked: false },
    { fieldName: "phone", blocked: false },
    { fieldName: "dateOfBirth", blocked: false },
    { fieldName: "location", blocked: false },
    { fieldName: "professionalStatus", blocked: false },
    { fieldName: "bio", blocked: false }
  ]);
  
  // Adicionar estado para idiomas
  const [languages, setLanguages] = useState<Language[]>([
    {
      id: "lang-1",
      language: "Inglês",
      level: "Fluente"
    },
    {
      id: "lang-2",
      language: "Espanhol",
      level: "Intermediário"
    },
    {
      id: "lang-3",
      language: "Alemão",
      level: "Básico"
    }
  ])
  
  // No início do componente, adicionar estados para o modal de idiomas
  const [languageModalOpen, setLanguageModalOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<Language | null>(null)
  const [newLanguage, setNewLanguage] = useState<Partial<Language>>({})
  
  const toggleEditMode = () => {
    if (editMode) {
      cancelChanges()
    } else {
      setEditMode(true)
    }
  }

  const saveChanges = () => {
    // Implement save logic here
    setEditMode(false)
    toast({
      title: "Alterações salvas",
      description: "Suas alterações foram salvas com sucesso.",
    })
  }

  const cancelChanges = () => {
    // Implement cancel logic here (e.g., reset to original state)
    setEditMode(false)
    toast({
      title: "Alterações canceladas",
      description: "Suas alterações foram descartadas.",
      variant: "destructive",
    })
  }

  const addPortfolioItem = () => {
    if (newItem.title && newItem.url) {
      setPortfolioItems([
        ...portfolioItems,
        { ...newItem, id: Date.now().toString(), tags: newItem.tags || [] } as PortfolioItem,
      ])
      setNewItem({ type: "link", tags: [], featured: false })
      setIsAddDialogOpen(false)
      toast({
        title: "Item adicionado",
        description: "O item foi adicionado com sucesso ao seu portfólio.",
      })
    }
  }

  const removePortfolioItem = (id: string) => {
    setPortfolioItems(portfolioItems.filter((item) => item.id !== id))
    toast({
      title: "Item removido",
      description: "O item foi removido do seu portfólio.",
      variant: "destructive",
    })
  }

  const editPortfolioItem = (id: string, updatedItem?: Partial<PortfolioItem>) => {
    const item = portfolioItems.find(item => item.id === id);
    if (item) {
      setNewItem(item);
      setIsEditDialogOpen(true);
    }
  };

  const addTag = () => {
    if (newTag && newItem.tags && !newItem.tags.includes(newTag)) {
      setNewItem({ ...newItem, tags: [...newItem.tags, newTag] })
      setNewTag("")
    }
  }

  const removeTag = (tag: string) => {
    if (newItem.tags) {
      setNewItem({ ...newItem, tags: newItem.tags.filter((t) => t !== tag) })
    }
  }

  const getItemIcon = (type: string) => {
    switch (type) {
      case "link":
        return <LinkIcon className="h-5 w-5 text-blue-500" />
      case "file":
        return <FileText className="h-5 w-5 text-green-500" />
      case "image":
        return <ImageIcon className="h-5 w-5 text-purple-500" />
      case "github":
        return <Github className="h-5 w-5 text-gray-700" />
      case "linkedin":
        return <Linkedin className="h-5 w-5 text-blue-700" />
      default:
        return <LinkIcon className="h-5 w-5 text-blue-500" />
    }
  }

  const calculateAge = (birthDate: Date) => {
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const handleDateOfBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const newDateOfBirth = e.target.value
    // setDateOfBirth(newDateOfBirth)
    // const calculatedAge = calculateAge(newDateOfBirth)
    // setAge(calculatedAge)
  }

  const handleHideProfileReasonChange = (reasonId: string) => {
    // setHideProfileReasons((prev) =>
    //   prev.includes(reasonId) ? prev.filter((id) => id !== reasonId) : [...prev, reasonId],
    // )
  }

  const handleHideReasonChange = (checked: boolean, reason: string) => {
    if (checked) {
      setHideReasons([...hideReasons, reason])
    } else {
      setHideReasons(hideReasons.filter((r) => r !== reason))
    }

    if (reason === "Outros") {
      setShowOtherReason(checked)
    }
  }

  const addSocialMediaProfile = () => {
    if (newSocialMedia.platform && newSocialMedia.username) {
      const url = getSocialMediaUrl(newSocialMedia.platform, newSocialMedia.username)
      setSocialMediaProfiles([
        ...socialMediaProfiles,
        { ...newSocialMedia, id: Date.now().toString(), url } as SocialMediaProfile,
      ])
      setNewSocialMedia({})
      setIsAddDialogOpen(false)
      toast({
        title: "Perfil adicionado",
        description: "O perfil de rede social foi adicionado com sucesso.",
      })
    }
  }

  const removeSocialMediaProfile = (id: string) => {
    setSocialMediaProfiles(socialMediaProfiles.filter((profile) => profile.id !== id))
    toast({
      title: "Perfil removido",
      description: "O perfil de rede social foi removido com sucesso.",
      variant: "destructive",
    })
  }

  const getSocialMediaUrl = (platform: string, username: string) => {
    switch (platform) {
      case "Facebook":
        return `https://facebook.com/${username}`
      case "Twitter":
        return `https://twitter.com/${username}`
      case "Instagram":
        return `https://instagram.com/${username}`
      case "LinkedIn":
        return `https://linkedin.com/in/${username}`
      case "GitHub":
        return `https://github.com/${username}`
      case "YouTube":
        return `https://youtube.com/@${username}`
      default:
        return username // Assume it's a custom URL
    }
  }

  const getSocialMediaIcon = (platform: string) => {
    const iconClass = "h-5 w-5"
    switch (platform) {
      case "Facebook":
        return <Facebook className={iconClass} />
      case "Twitter":
        return <Twitter className={iconClass} />
      case "Instagram":
        return <Instagram className={iconClass} />
      case "LinkedIn":
        return <Linkedin className={iconClass} />
      case "GitHub":
        return <Github className={iconClass} />
      case "YouTube":
        return <Youtube className={iconClass} />
      default:
        return <Globe className={iconClass} />
    }
  }
  
  // Função para obter a cor de fundo para cada plataforma
  const getSocialMediaColor = (platform: string): string => {
    switch (platform) {
      case "LinkedIn":
        return "#0A66C2";
      case "GitHub":
        return "#24292e";
      case "Twitter":
        return "#1DA1F2";
      case "Instagram":
        return "#E4405F";
      case "Facebook":
        return "#1877F2";
      case "YouTube":
        return "#FF0000";
      default:
        return "#6E6E6E";
    }
  };

  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCoverPhoto(reader.result as string)
      }
      reader.readAsDataURL(file)
      toast({
        title: "Foto de capa atualizada",
        description: "Sua nova foto de capa foi carregada com sucesso.",
      })
    }
  }

  // Funções para gerenciar habilidades
  const addSkill = () => {
    setNewSkill({
      name: "",
      category: "technical",
    });
    setSelectedSkills([]);
    setAvailableSkillsList(getSkillsByCategory("technical"));
    setIsAddSkillDialogOpen(true);
  };
  
  const deleteSkill = (id: string) => {
    const skillToDelete = skills.find(skill => skill.id === id);
    if (skillToDelete) {
      const updatedSkills = skills.filter(skill => skill.id !== id);
      setSkills(updatedSkills);
      
      toast({
        title: "Habilidade removida",
        description: `${skillToDelete.name} foi removida com sucesso.`,
        variant: "destructive"
      });
    }
  };
  
  const openAddSkillDialog = (category: "technical" | "professional" | "social") => {
    setNewSkill({
      name: "",
      category: category,
    });
    setSelectedSkills([]);
    setAvailableSkillsList(getSkillsByCategory(category));
    setIsAddSkillDialogOpen(true);
  };
  
  // Atualizar a função para obter lista de habilidades por categoria
  const getSkillsByCategory = (category: "technical" | "professional" | "social") => {
    if (category === "technical") {
      return Object.values(availableSkills.technical).flat();
    } else if (category === "professional") {
      return Object.values(availableSkills.professional).flat();
    } else if (category === "social") {
      return Object.values(availableSkills.social).flat();
    }
    return [];
  };
  
  // Atualizar o componente AddSkillDialog para usar Combobox em vez de Select
  const AddSkillDialog = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [localSkillsList, setLocalSkillsList] = useState<string[]>([]);
    
    // Inicializar a lista de habilidades apenas quando o modal abrir
    useEffect(() => {
      if (isAddSkillDialogOpen) {
        // Limpar busca ao abrir o modal
        setSearchTerm("");
        // Usar uma cópia local da lista de habilidades
        setLocalSkillsList(getSkillsByCategory(newSkill.category));
        
        // Foque no input após um pequeno delay
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 100);
      }
    }, [isAddSkillDialogOpen, newSkill.category]);
    
    // Função para atualizar a lista de habilidades filtradas
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value;
      setSearchTerm(term);
      
      // Não precisamos chamar setAvailableSkillsList aqui, trabalhamos com a lista local
    };
    
    // Filtra a lista com base no termo de pesquisa
    const filteredSkillsList = useMemo(() => {
      const termLower = searchTerm.toLowerCase();
      if (termLower.length > 0) {
        return localSkillsList.filter(skill => 
          skill.toLowerCase().includes(termLower)
        );
      }
      return localSkillsList;
    }, [localSkillsList, searchTerm]);
    
    // Se o modal não estiver aberto, não renderize nada
    if (!isAddSkillDialogOpen) return null;
    
    // Função para alternar a seleção de uma habilidade
    const toggleSkillSelection = (skill: string) => {
                              setSelectedSkills(prev => 
                                prev.includes(skill) 
                                  ? prev.filter(s => s !== skill) 
                                  : [...prev, skill]
                              );
    };
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Overlay com fundo escuro */}
        <div 
          className="fixed inset-0 bg-black/50" 
          onClick={() => setIsAddSkillDialogOpen(false)}
        />
        
        {/* Conteúdo do modal */}
        <div className="z-50 bg-white rounded-lg shadow-lg w-full max-w-[500px] max-h-[90vh] overflow-auto flex flex-col relative">
          {/* Cabeçalho */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">
              {newSkill.category === "technical" && "Adicionar Habilidades Técnicas"}
              {newSkill.category === "professional" && "Adicionar Habilidades Profissionais"}
              {newSkill.category === "social" && "Adicionar Habilidades Sociais"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Selecione as habilidades que deseja adicionar ao seu perfil profissional
            </p>
          </div>
          
          {/* Corpo */}
          <div className="p-6 space-y-4 flex-1 overflow-hidden flex flex-col">
            {/* Campo de pesquisa */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                ref={inputRef}
                type="search"
                placeholder="Pesquisar habilidades..."
                className="pl-8"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            
            {/* Contador de habilidades selecionadas */}
            {selectedSkills.length > 0 && (
              <div className="bg-blue-50 text-blue-900 rounded-md p-2 flex items-center justify-between">
                <span className="text-sm font-medium">
                  {selectedSkills.length} {selectedSkills.length === 1 ? 'habilidade selecionada' : 'habilidades selecionadas'}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 text-xs text-blue-700 hover:text-blue-900 hover:bg-blue-100"
                  onClick={() => setSelectedSkills([])}
                >
                  Limpar seleção
                </Button>
              </div>
            )}
            
            {/* Lista de habilidades */}
            <div className="space-y-6 pr-1 flex-1 overflow-y-auto">
              {/* Exibição ordenada por subcategorias - Técnicas */}
              {newSkill.category === "technical" && Object.entries(availableSkills.technical)
                .map(([subcategory, skills]) => {
                  const displaySkills = skills.filter(skill => filteredSkillsList.includes(skill));
                  if (displaySkills.length === 0) return null;
                  
                  return (
                    <div key={subcategory} className="space-y-2">
                      <h4 className="font-medium text-sm text-gray-700">{subcategory}</h4>
                      <div className="space-y-1">
                        {displaySkills.map(skill => (
                          <div 
                            key={skill} 
                              className={cn(
                              "flex items-center space-x-2 rounded-md border p-2 cursor-pointer transition-colors",
                              selectedSkills.includes(skill) 
                                ? "bg-blue-50 border-blue-200" 
                                : "hover:bg-slate-50"
                            )}
                            onClick={() => toggleSkillSelection(skill)}
                          >
                            <Checkbox 
                              checked={selectedSkills.includes(skill)}
                              className="pointer-events-none"
                              onCheckedChange={() => {}}
                            />
                            <span>{skill}</span>
                          </div>
                        ))}
            </div>
          </div>
                  );
                })
              }
              
              {/* Exibição ordenada por subcategorias - Profissionais */}
              {newSkill.category === "professional" && Object.entries(availableSkills.professional)
                .map(([subcategory, skills]) => {
                  const displaySkills = skills.filter(skill => filteredSkillsList.includes(skill));
                  if (displaySkills.length === 0) return null;
                  
                  return (
                    <div key={subcategory} className="space-y-2">
                      <h4 className="font-medium text-sm text-gray-700">{subcategory}</h4>
                      <div className="space-y-1">
                        {displaySkills.map(skill => (
                          <div 
                    key={skill} 
                            className={cn(
                              "flex items-center space-x-2 rounded-md border p-2 cursor-pointer transition-colors",
                              selectedSkills.includes(skill) 
                                ? "bg-purple-50 border-purple-200" 
                                : "hover:bg-slate-50"
                            )}
                            onClick={() => toggleSkillSelection(skill)}
                          >
                            <Checkbox 
                              checked={selectedSkills.includes(skill)}
                              className="pointer-events-none"
                              onCheckedChange={() => {}}
                            />
                            <span>{skill}</span>
                          </div>
                ))}
              </div>
            </div>
                  );
                })
              }
              
              {/* Exibição ordenada por subcategorias - Sociais */}
              {newSkill.category === "social" && Object.entries(availableSkills.social)
                .map(([subcategory, skills]) => {
                  const displaySkills = skills.filter(skill => filteredSkillsList.includes(skill));
                  if (displaySkills.length === 0) return null;
                  
                  return (
                    <div key={subcategory} className="space-y-2">
                      <h4 className="font-medium text-sm text-gray-700">{subcategory}</h4>
                      <div className="space-y-1">
                        {displaySkills.map(skill => (
                          <div 
                            key={skill} 
                            className={cn(
                              "flex items-center space-x-2 rounded-md border p-2 cursor-pointer transition-colors",
                              selectedSkills.includes(skill) 
                                ? "bg-purple-50 border-purple-200" 
                                : "hover:bg-slate-50"
                            )}
                            onClick={() => toggleSkillSelection(skill)}
                          >
                            <Checkbox 
                              checked={selectedSkills.includes(skill)}
                              className="pointer-events-none"
                              onCheckedChange={() => {}}
                            />
                            <span>{skill}</span>
        </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
          
          {/* Rodapé com botões */}
          <div className="border-t p-4 flex justify-end space-x-2 bg-gray-50">
            <Button 
              variant="outline" 
              onClick={() => {
                setIsAddSkillDialogOpen(false);
                setSelectedSkills([]);
              }}
            >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              if (selectedSkills.length > 0) {
                const updatedSkills = [...skills];
                selectedSkills.forEach(skillName => {
                  updatedSkills.push({
                    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                    name: skillName,
                    category: newSkill.category,
                  });
                });
                setSkills(updatedSkills);
                setSelectedSkills([]);
                setIsAddSkillDialogOpen(false);
                
                toast({
                  title: "Habilidades adicionadas",
                  description: `${selectedSkills.length} habilidade(s) adicionada(s) com sucesso.`,
                  variant: "default"
                });
              }
            }}
            disabled={selectedSkills.length === 0}
              className={cn(
                "bg-gradient-to-r",
                newSkill.category === "technical" 
                  ? "from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800" 
                  : "from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800",
                "text-white"
              )}
          >
            Adicionar {selectedSkills.length > 0 ? `(${selectedSkills.length})` : ""}
          </Button>
          </div>
        </div>
      </div>
    );
  };
  
  // Modificar a função para renderizar habilidades por categoria
  const renderSkillsByCategory = (category: "technical" | "professional" | "social") => {
    const categorySkills = skills.filter(skill => skill.category === category);
    
    const badgeColorClass = 
      category === "technical" 
        ? "bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200" 
        : category === "professional"
          ? "bg-green-100 text-green-700 border border-green-200 hover:bg-green-200" 
          : "bg-purple-100 text-purple-700 border border-purple-200 hover:bg-purple-200";
    
    const addButtonColorClass = 
      category === "technical" 
        ? "border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100" 
        : category === "professional"
          ? "border-green-200 text-green-600 bg-green-50 hover:bg-green-100" 
          : "border-purple-200 text-purple-600 bg-purple-50 hover:bg-purple-100";
    
    return (
      <div className="flex flex-wrap gap-2">
        {categorySkills.map(skill => (
          <div key={skill.id} className="group relative">
            <Badge 
              className={`px-3 py-1.5 ${badgeColorClass} transition-colors`}
            >
              {skill.name}
              {skill.subcategory === "Idiomas" && ` • ${skill.level}`}
              {editMode && (
                <button 
                  className="ml-2 text-red-400 hover:text-red-700"
                  onClick={() => deleteSkill(skill.id)}
                >
                  ×
                </button>
              )}
            </Badge>
          </div>
        ))}
        
        {/* Botão de adicionar habilidade com aparência de habilidade */}
        {editMode && (
          <div className="group relative">
            <Badge 
              className={`px-3 py-1.5 border-dashed ${addButtonColorClass} cursor-pointer transition-colors flex items-center`}
              onClick={() => openAddSkillDialog(category)}
            >
              <Plus className="mr-1 h-3 w-3" />
              Adicionar
            </Badge>
          </div>
        )}
      </div>
    );
  };

  // Atualizar o useEffect para inicializar a lista de habilidades disponíveis
  useEffect(() => {
    if (newSkill.category) {
      setAvailableSkillsList(getSkillsByCategory(newSkill.category));
    }
  }, []);

  const ExperienceCard = ({ 
    experience, 
    isEditing, 
    onEdit, 
    onDelete 
  }: { 
    experience: any // Usando any temporariamente para resolver os erros de tipo
    isEditing: boolean
    onEdit: (id: string, data: any) => void
    onDelete: (id: string) => void
  }) => {
    // Função para formatar datas de forma segura
    const formatDate = (date: any) => {
      if (!date) return '';
      
      try {
        // Verificar se a data já é um objeto Date
        const dateObj = date instanceof Date ? date : new Date(date);
        
        // Verificar se a data é válida
        if (isNaN(dateObj.getTime())) {
          return String(date); // Retorna a string original se não for uma data válida
        }
        
        // Formatar a data
        return format(dateObj, 'MMM yyyy', { locale: ptBR });
      } catch (error) {
        return String(date); // Fallback para a string original
      }
    };

    // Determinar quais campos usar com base no tipo de experiência
    const title = experience.position || experience.role || experience.degree || experience.title || '';
    const organization = experience.company || experience.institution || '';
    const location = experience.location || '';
    const description = experience.description || '';
    
    // Lidar com diferentes formatos de data
    let startDateValue = '';
    let endDateValue = '';
    
    if (experience.startDate) {
      startDateValue = formatDate(experience.startDate);
    } else if (experience.period) {
      const periodParts = experience.period.split(' - ');
      startDateValue = periodParts[0] || '';
      if (periodParts.length > 1) {
        endDateValue = periodParts[1];
      }
    }
    
    if (!endDateValue && experience.endDate) {
      endDateValue = formatDate(experience.endDate);
    }
    
    const isCurrentPosition = experience.current || false;
    if (isCurrentPosition) {
      endDateValue = 'Presente';
    }
    
    // Período formatado
    const period = endDateValue 
      ? `${startDateValue} - ${endDateValue}` 
      : startDateValue;
    
    // Determinar qual ícone e cores usar com base no tipo
    const isEducation = experience.degree || experience.institution;
    const iconBgColor = isEducation ? "bg-green-50" : "bg-blue-50";
    const iconColor = isEducation ? "text-green-600" : "text-blue-600";

    return (
      <div className="border border-gray-200 rounded-lg p-3 bg-white hover:shadow-sm transition-shadow">
        {isEditing && (
          <div className="absolute top-2 right-2 flex space-x-1 z-10">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onEdit(experience.id, {})}
              className="h-7 w-7 text-gray-500 hover:text-blue-600 bg-white/80 backdrop-blur-sm rounded-full"
            >
              <PenLine className="h-3.5 w-3.5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onDelete(experience.id)}
              className="h-7 w-7 text-gray-500 hover:text-red-500 bg-white/80 backdrop-blur-sm rounded-full"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
        
        <div className="flex items-start gap-2">
          <div className={`flex-shrink-0 w-8 h-8 ${iconBgColor} rounded-full flex items-center justify-center mt-0.5`}>
            {isEducation ? (
              <GraduationCap className={`h-4 w-4 ${iconColor}`} />
            ) : (
              <Briefcase className={`h-4 w-4 ${iconColor}`} />
            )}
          </div>
          
          <div className="w-full min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-1 gap-1">
              <div className="min-w-0">
                <h3 className="font-medium text-gray-900 line-clamp-1">{title}</h3>
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    {isEducation ? 
                      <GraduationCap className="h-3 w-3" /> : 
                      <Building2 className="h-3 w-3" />
                    }
                    {organization}
                  </span>
                  {location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {location}
                    </span>
                  )}
          </div>
        </div>
              <span className="text-xs text-gray-400 whitespace-nowrap mt-1 sm:mt-0">
            {period}
          </span>
        </div>
        
            {description && (
              <p className="mt-2 text-xs text-gray-500 line-clamp-2">
            {description}
              </p>
            )}
            
            {experience.skills && experience.skills.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {experience.skills.slice(0, 3).map((skill: string, index: number) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-full py-0 px-2 border-0"
                  >
                    {skill}
                  </Badge>
                ))}
                {experience.skills.length > 3 && (
                  <Badge 
                    variant="outline" 
                    className="text-xs rounded-full py-0 px-2 border-gray-200 text-gray-500"
                  >
                    +{experience.skills.length - 3}
                  </Badge>
                )}
          </div>
        )}
          </div>
        </div>
      </div>
    );
  };

  // Função para adicionar uma nova experiência
  const addExperience = () => {
    setCurrentExperience(null)
    setNewExperience({
      company: "",
      position: "",
      startDate: new Date(),
      current: false,
      description: "",
      skills: [],
      location: ""
    })
    setExperienceModalOpen(true)
  }
  
  // Função para editar uma experiência existente
  const editExperience = (id: string) => {
    const experience = experiences.find(exp => exp.id === id)
    if (experience) {
      setCurrentExperience(experience)
      setNewExperience({ ...experience })
      setExperienceModalOpen(true)
    }
  }
  
  // Função para remover uma experiência
  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id))
  }
  
  // Função para salvar uma experiência (nova ou editada)
  const saveExperience = () => {
    if (currentExperience) {
      // Editar experiência existente
      setExperiences(experiences.map(exp => 
        exp.id === currentExperience.id 
          ? { 
              ...exp, 
              ...newExperience, 
              id: exp.id,
              skills: exp.skills // Mantém as habilidades originais
            } as Experience
          : exp
      ))
    } else {
      // Adicionar nova experiência
      const id = `exp-${Date.now()}`
      setExperiences([
        ...experiences,
        { 
          ...newExperience, 
          id,
          skills: [] // Nova experiência começa sem habilidades
        } as Experience
      ])
    }
    setExperienceModalOpen(false)
  }
  
  // Função para adicionar uma habilidade à experiência atual
  const addExperienceSkill = () => {
    if (experienceSkill && !newExperience.skills?.includes(experienceSkill)) {
      setNewExperience({
        ...newExperience,
        skills: [...(newExperience.skills || []), experienceSkill]
      })
      setExperienceSkill("")
    }
  }
  
  // Função para remover uma habilidade da experiência atual
  const removeExperienceSkill = (skill: string) => {
    setNewExperience({
      ...newExperience,
      skills: newExperience.skills?.filter(s => s !== skill) || []
    })
  }

  // Função para adicionar uma nova educação
  const addEducation = () => {
    setCurrentEducation(null)
    setNewEducation({
      institution: "",
      degree: "",
      startDate: new Date(),
      current: false,
      achievements: [],
      courses: [],
      location: ""
    })
    setEducationModalOpen(true)
  }
  
  // Função para editar uma educação existente
  const editEducation = (id: string) => {
    const education = educations.find(edu => edu.id === id)
    if (education) {
      setCurrentEducation(education)
      setNewEducation({ ...education })
      setEducationModalOpen(true)
    }
  }
  
  // Função para remover uma educação
  const removeEducation = (id: string) => {
    setEducations(educations.filter(edu => edu.id !== id))
  }
  
  // Função para adicionar um novo certificado
  const addCertificate = () => {
    setCurrentCertificate(null)
    setNewCertificate({
      name: "",
      issuer: "",
      issueDate: new Date(),
      skills: []
    })
    setCertificateModalOpen(true)
  }
  
  // Função para editar um certificado existente
  const editCertificate = (id: string) => {
    const certificate = certificates.find(cert => cert.id === id)
    if (certificate) {
      setCurrentCertificate(certificate)
      setNewCertificate({ ...certificate })
      setCertificateModalOpen(true)
    }
  }
  
  // Função para remover um certificado
  const removeCertificate = (id: string) => {
    setCertificates(certificates.filter(cert => cert.id !== id))
    toast({
      title: "Certificado removido",
      description: "O certificado foi removido com sucesso.",
      variant: "default",
    })
  }
  
  // Função para salvar um certificado (novo ou editado)
  const saveCertificate = () => {
    if (!newCertificate.name || !newCertificate.issuer) {
      toast({
        title: "Erro ao salvar",
        description: "Nome e emissor são campos obrigatórios.",
        variant: "destructive",
      })
      return
    }
    
    if (currentCertificate) {
      // Editar certificado existente
      setCertificates(certificates.map(cert => 
        cert.id === currentCertificate.id 
          ? { 
              ...cert, 
              ...newCertificate, 
              id: cert.id,
              skills: newCertificate.skills || cert.skills
            } as Certificate
          : cert
      ))
      toast({
        title: "Certificado atualizado",
        description: "As alterações foram salvas com sucesso.",
        variant: "default",
      })
    } else {
      // Adicionar novo certificado
      const id = `cert-${Date.now()}`
      setCertificates([
        ...certificates,
        { 
          ...newCertificate, 
          id,
          skills: newCertificate.skills || []
        } as Certificate
      ])
      toast({
        title: "Certificado adicionado",
        description: "O novo certificado foi adicionado com sucesso.",
        variant: "default",
      })
    }
    setCertificateModalOpen(false)
  }
  
  // Função para adicionar uma habilidade ao certificado atual
  const addCertificateSkill = () => {
    if (certificateSkill && !newCertificate.skills?.includes(certificateSkill)) {
      setNewCertificate({
        ...newCertificate,
        skills: [...(newCertificate.skills || []), certificateSkill]
      })
      setCertificateSkill("")
    }
  }
  
  // Função para remover uma habilidade do certificado atual
  const removeCertificateSkill = (skill: string) => {
    setNewCertificate({
      ...newCertificate,
      skills: newCertificate.skills?.filter(s => s !== skill) || []
    })
  }
  
  // Função para salvar uma educação (nova ou editada)
  const saveEducation = () => {
    if (currentEducation) {
      // Editar educação existente
      setEducations(educations.map(edu => 
        edu.id === currentEducation.id 
          ? { 
              ...edu, 
              ...newEducation, 
              id: edu.id,
              achievements: newEducation.achievements || edu.achievements,
              courses: newEducation.courses || edu.courses
            } as Education
          : edu
      ))
    } else {
      // Adicionar nova educação
      const id = `edu-${Date.now()}`
      setEducations([
        ...educations,
        { 
          ...newEducation, 
          id,
          achievements: newEducation.achievements || [],
          courses: newEducation.courses || []
        } as Education
      ])
    }
    setEducationModalOpen(false)
  }

  // Componente para exibir um certificado
  const CertificateCard = ({ 
    certificate, 
    isEditing, 
    onEdit, 
    onDelete 
  }: { 
    certificate: Certificate
    isEditing: boolean
    onEdit: (id: string) => void
    onDelete: (id: string) => void
  }) => {
    // Formatar datas
    const formatDate = (date: Date) => {
      return format(date, 'MMM yyyy', { locale: ptBR });
    };
    
    const issueDate = formatDate(certificate.issueDate);
    const expirationDate = certificate.expirationDate ? formatDate(certificate.expirationDate) : null;
    
    return (
      <div className="border border-gray-200 rounded-lg p-3 bg-white hover:shadow-sm transition-shadow">
        {isEditing && (
          <div className="absolute top-2 right-2 flex space-x-1 z-10">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onEdit(certificate.id)}
              className="h-7 w-7 text-gray-500 hover:text-amber-600 bg-white/80 backdrop-blur-sm rounded-full"
            >
              <PenLine className="h-3.5 w-3.5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onDelete(certificate.id)}
              className="h-7 w-7 text-gray-500 hover:text-red-500 bg-white/80 backdrop-blur-sm rounded-full"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
        
        <div className="flex items-start gap-2">
          <div className="flex-shrink-0 w-8 h-8 bg-amber-50 rounded-full flex items-center justify-center mt-0.5">
            <Award className="h-4 w-4 text-amber-600" />
          </div>
          
          <div className="w-full min-w-0">
            <div className="flex justify-between items-start mb-1">
              <div className="min-w-0">
                <h3 className="font-medium text-gray-900 line-clamp-1">{certificate.name}</h3>
                <p className="text-xs text-gray-500">{certificate.issuer}</p>
          </div>
              {certificate.credentialUrl && (
                <a
                  href={certificate.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 text-amber-600 hover:text-amber-700 transition-colors hidden sm:block"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
        </div>
        
            <div className="flex flex-wrap items-center justify-between mt-2 text-xs text-gray-400 gap-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {issueDate}
                </span>
            {expirationDate && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span className="whitespace-nowrap">Expira: {expirationDate}</span>
                  </span>
                )}
              </div>
              {certificate.credentialId && (
                <span className="truncate max-w-[120px]" title={certificate.credentialId}>
                  ID: {certificate.credentialId}
                </span>
            )}
          </div>
          
          {certificate.skills && certificate.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
              {certificate.skills.map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-xs bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-full py-0 px-2 border-0"
                  >
                  {skill}
                </Badge>
              ))}
            </div>
          )}
          
            {/* Mobile-friendly credential link */}
          {certificate.credentialUrl && (
              <div className="mt-3 sm:hidden">
                <a
                  href={certificate.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-600 hover:text-amber-700 transition-colors py-1.5 px-3 rounded-full bg-amber-50 hover:bg-amber-100"
                >
                  <ExternalLink className="h-3 w-3" />
                  Ver credencial
                </a>
            </div>
          )}
          </div>
        </div>
      </div>
    );
  };

  // Função para alternar o estado de bloqueio de um campo
  const toggleFieldBlock = (fieldName: string) => {
    setBlockedFields(prev => 
      prev.map(field => 
        field.fieldName === fieldName 
          ? { ...field, blocked: !field.blocked } 
          : field
      )
    );
  };

  // Função para verificar se um campo está bloqueado
  const isFieldBlocked = (fieldName: string): boolean => {
    const field = blockedFields.find(f => f.fieldName === fieldName);
    return field ? field.blocked : false;
  };

  // Função para obter a cor de hover para cada plataforma
  const getSocialMediaHoverClass = (platform: string): string => {
    switch (platform) {
      case "LinkedIn":
        return "hover:bg-[#0A66C2]/10 group-hover:text-[#0A66C2]";
      case "GitHub":
        return "hover:bg-gray-100 group-hover:text-gray-900";
      case "Twitter":
        return "hover:bg-[#1DA1F2]/10 group-hover:text-[#1DA1F2]";
      case "Instagram":
        return "hover:bg-[#E4405F]/10 group-hover:text-[#E4405F]";
      case "Facebook":
        return "hover:bg-[#1877F2]/10 group-hover:text-[#1877F2]";
      case "YouTube":
        return "hover:bg-[#FF0000]/10 group-hover:text-[#FF0000]";
      default:
        return "hover:bg-gray-100 group-hover:text-gray-700";
    }
  };

  // Função para adicionar um novo idioma
  const addLanguage = () => {
    setCurrentLanguage(null)
    setNewLanguage({
      id: "",
      language: "",
      level: "Básico"
    })
    setLanguageModalOpen(true)
  }

  // Função para editar um idioma existente
  const editLanguage = (id: string) => {
    const language = languages.find(lang => lang.id === id)
    if (language) {
      setCurrentLanguage(language)
      setNewLanguage({ ...language })
      setLanguageModalOpen(true)
    }
  }

  // Função para remover um idioma
  const removeLanguage = (id: string) => {
    setLanguages(languages.filter(lang => lang.id !== id))
    toast({
      title: "Idioma removido",
      description: "O idioma foi removido com sucesso.",
      variant: "destructive",
    })
  }

  // Função para salvar um idioma (novo ou editado)
  const saveLanguage = () => {
    if (!newLanguage.language) {
      toast({
        title: "Erro",
        description: "O nome do idioma é obrigatório.",
        variant: "destructive",
      })
      return;
    }

    const level = newLanguage.level || "Básico";
    
    if (currentLanguage) {
      // Editar idioma existente
      setLanguages(languages.map(lang => 
        lang.id === currentLanguage.id
          ? { 
              id: lang.id, 
              language: newLanguage.language as string, 
              level: level as Language["level"] 
            }
          : lang
      ))
      toast({
        title: "Idioma atualizado",
        description: "As alterações foram salvas com sucesso.",
        variant: "default",
      })
    } else {
      // Adicionar novo idioma
      const id = `lang-${Date.now()}`
      setLanguages([
        ...languages,
        { 
          id, 
          language: newLanguage.language as string, 
          level: level as Language["level"] 
        }
      ])
      toast({
        title: "Idioma adicionado",
        description: "O novo idioma foi adicionado com sucesso.",
        variant: "default",
      })
    }
    setLanguageModalOpen(false)
  }

  // Função para obter a cor para cada nível de idioma
  const getLevelColor = (level: string): string => {
    switch(level) {
      case "Nativo":
        return "bg-teal-50 text-teal-700 border border-teal-200";
      case "Fluente":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case "Avançado":
        return "bg-green-50 text-green-700 border border-green-200";
      case "Intermediário":
        return "bg-amber-50 text-amber-700 border border-amber-200";
      case "Básico":
        return "bg-gray-50 text-gray-700 border border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  // Função para obter a descrição para cada nível de idioma
  const getLevelDescription = (level: string): string => {
    switch(level) {
      case "Nativo":
        return "Língua materna";
      case "Fluente":
        return "Comunicação avançada em contextos profissionais";
      case "Avançado":
        return "Boa comunicação em contextos variados";
      case "Intermediário":
        return "Comunicação básica em situações cotidianas";
      case "Básico":
        return "Conhecimentos elementares";
      default:
        return "";
    }
  };

  // Componente para exibir um projeto
  const ProjectCard = ({ 
    project, 
    isEditing, 
    onEdit, 
    onDelete 
  }: { 
    project: PortfolioItem  // Usando o tipo PortfolioItem existente
    isEditing: boolean
    onEdit: (id: string, updatedItem?: Partial<PortfolioItem>) => void
    onDelete: (id: string) => void
  }) => {
    const getProjectIcon = () => {
      switch(project.type) {
        case "github": 
          return <Github className="h-4 w-4 text-indigo-600" />;
        case "image": 
          return <FileText className="h-4 w-4 text-indigo-600" />;
        case "linkedin": 
          return <Linkedin className="h-4 w-4 text-indigo-600" />;
        case "file": 
          return <FileIcon className="h-4 w-4 text-indigo-600" />;
        case "link":
        default:
          return <ExternalLink className="h-4 w-4 text-indigo-600" />;
      }
    };
    
    const getProjectTypeLabel = () => {
      switch(project.type) {
        case "github": return "GitHub";
        case "image": return "Design";
        case "linkedin": return "LinkedIn";
        case "file": return "Arquivo";
        case "link":
        default: return "Website";
      }
    };
    
    return (
      <div className="border border-gray-200 rounded-lg p-3 bg-white hover:shadow-sm transition-shadow relative">
        {isEditing && (
          <div className="absolute top-2 right-2 flex space-x-1 z-10">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onEdit(project.id)}
              className="h-7 w-7 text-gray-500 hover:text-indigo-600 bg-white/80 backdrop-blur-sm rounded-full"
            >
              <PenLine className="h-3.5 w-3.5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onDelete(project.id)}
              className="h-7 w-7 text-gray-500 hover:text-red-500 bg-white/80 backdrop-blur-sm rounded-full"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
        
        <div className="flex items-start gap-2">
          <div className="flex-shrink-0 w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center mt-0.5">
            {getProjectIcon()}
          </div>
          
          <div className="w-full">
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="font-medium text-gray-900 line-clamp-1">{project.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">{project.description}</p>
              </div>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <div className="flex flex-wrap gap-1">
                {project.tags.slice(0, 3).map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs px-1.5 py-0 bg-indigo-50 text-indigo-600 font-normal">
                    {tag}
                  </Badge>
                ))}
                {project.tags.length > 3 && (
                  <span className="text-xs text-gray-400">+{project.tags.length - 3}</span>
                )}
              </div>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                {getProjectTypeLabel()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Adicionar função para lidar com alteração do avatar
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Aqui você implementaria a lógica para fazer upload da imagem do avatar
      // Por enquanto, apenas exibimos um alerta para o usuário
      toast({
        title: "Avatar alterado",
        description: "Sua foto de perfil foi atualizada com sucesso.",
        variant: "default",
      });
    }
  };

  return (
    <CandidateDashboardShell>
      <div className="p-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Meu Currículo</h2>
            <p className="text-muted-foreground">Gerencie suas informações profissionais</p>
          </div>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <Button variant="outline" className="w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" />
              Exportar PDF
            </Button>
            <Button onClick={toggleEditMode} className="w-full bg-gradient-to-r from-[#003495] to-[#007cfa] text-white hover:from-[#00297a] hover:to-[#0065cc] sm:w-auto">
              {editMode ? "Cancelar Edição" : "Editar Currículo"}
              {editMode ? <X className="ml-2 h-4 w-4" /> : <PenLine className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-6">
          {/* Informações Pessoais */}
          <Card className="mb-6 overflow-hidden border-blue-100">
            <div className="relative">
              <div className="h-32 w-full overflow-hidden">
                <img
                  src={coverPhoto || "/placeholder.svg?height=128&width=512"}
                  alt="Foto de capa"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#003495]/20 to-[#007cfa]/20"></div>
              </div>
              
              {/* Reposicionando a foto de perfil para ficar na parte superior da seção de informações, não no meio do banner */}
              <div className="absolute -bottom-8 left-8 z-10">
                <Avatar className="h-20 w-20 border-4 border-white shadow-md">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-gradient-to-br from-[#003495] to-[#007cfa] text-white">JP</AvatarFallback>
                </Avatar>
              </div>
              
              {editMode && (
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <label
                    htmlFor="cover-photo-upload"
                    className="cursor-pointer rounded-full bg-white p-2 text-blue-600 shadow-sm hover:bg-blue-50 transition-colors"
                  >
                    <Camera className="h-4 w-4" />
                    <input
                      id="cover-photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleCoverPhotoChange}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
            
            {/* Adicionar um pequeno espaçador para ajustar o layout */}
            <div className="h-8"></div>
            
            <CardHeader className="pt-16 pb-4">
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>Suas informações básicas de contato</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">Nome</Label>
                  <Input
                    id="name"
                    defaultValue="João Pedro Silva"
                    readOnly={!editMode}
                    className={`border-gray-200 focus:border-blue-300 focus:ring-blue-200 ${!editMode ? "bg-gray-50" : ""}`}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium text-gray-700">Título Profissional</Label>
                  <Input
                    id="title"
                    defaultValue="Desenvolvedor Full Stack Senior"
                    readOnly={!editMode}
                    className={`border-gray-200 focus:border-blue-300 focus:ring-blue-200 ${!editMode ? "bg-gray-50" : ""}`}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="joao.silva@email.com"
                    readOnly={!editMode}
                    className={`border-gray-200 focus:border-blue-300 focus:ring-blue-200 ${!editMode ? "bg-gray-50" : ""}`}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Telefone</Label>
                  <Input
                    id="phone"
                    defaultValue="(11) 98765-4321"
                    readOnly={!editMode}
                    className={`border-gray-200 focus:border-blue-300 focus:ring-blue-200 ${!editMode ? "bg-gray-50" : ""}`}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium text-gray-700">Localização</Label>
                  <Input
                    id="location"
                    defaultValue="São Paulo, SP"
                    readOnly={!editMode}
                    className={`border-gray-200 focus:border-blue-300 focus:ring-blue-200 ${!editMode ? "bg-gray-50" : ""}`}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employmentStatus" className="text-sm font-medium text-gray-700">Situação Profissional</Label>
                  <Select defaultValue="employed" disabled={!editMode}>
                    <SelectTrigger className={`w-full border-gray-200 focus:border-blue-300 focus:ring-blue-200 ${!editMode ? "bg-gray-50" : ""}`}>
                      <SelectValue placeholder="Selecione sua situação profissional" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employed">Empregado</SelectItem>
                      <SelectItem value="unemployed">Desempregado</SelectItem>
                      <SelectItem value="freelancer">Freelancer</SelectItem>
                      <SelectItem value="student">Estudante</SelectItem>
                      <SelectItem value="retired">Aposentado</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Redes Sociais */}
          <Card className="border-blue-100">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Redes Sociais</CardTitle>
                  <CardDescription>Seus perfis online e profissionais</CardDescription>
                </div>
                {editMode && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-amber-200 text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                    onClick={() => setIsAddDialogOpen(true)}
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Adicionar
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {socialMediaProfiles.map((profile) => {
                  const hoverClasses = getSocialMediaHoverClass(profile.platform);
                  const platformColor = getSocialMediaColor(profile.platform);
                  
                  return (
                    <a
                      key={profile.id}
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center p-3 gap-3 rounded-md border border-gray-200 bg-white ${hoverClasses} transition-colors group relative`}
                    >
                      <div 
                        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ 
                          backgroundColor: `${platformColor}10`,
                        }}
                      >
                        <div className="text-center" style={{ color: platformColor }}>
                        {getSocialMediaIcon(profile.platform)}
                      </div>
                      </div>
                      <div className="flex-grow">
                        <div className="font-medium text-gray-900">{profile.platform}</div>
                        <div className="text-xs text-gray-500 truncate group-hover:text-inherit">
                          @{profile.username}
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-inherit" />
                      
                    {editMode && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white shadow-sm opacity-0 transition-opacity group-hover:opacity-100 border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-200"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            removeSocialMediaProfile(profile.id);
                          }}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remover</span>
                      </Button>
                    )}
                    </a>
                  );
                })}
                
                {socialMediaProfiles.length === 0 && !editMode && (
                  <div className="text-center py-6 text-gray-500">
                    <p>Nenhuma rede social adicionada</p>
                  </div>
                )}
                
                {editMode && (
                  <button
                    onClick={() => setIsAddDialogOpen(true)}
                    className="flex h-16 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 text-gray-500 transition-colors hover:border-amber-300 hover:bg-amber-50/50 hover:text-amber-600"
                  >
                    <div className="flex items-center gap-2">
                      <Plus className="h-5 w-5" />
                      <span>Adicionar rede social</span>
                    </div>
                  </button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Add Social Media Dialog */}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar Rede Social</DialogTitle>
                <DialogDescription>Adicione um novo perfil de rede social ao seu currículo.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="platform" className="text-right">
                    Plataforma
                  </Label>
                  <Select
                    value={newSocialMedia.platform}
                    onValueChange={(value) => setNewSocialMedia({ ...newSocialMedia, platform: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione a plataforma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Facebook">Facebook</SelectItem>
                      <SelectItem value="Twitter">Twitter</SelectItem>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                      <SelectItem value="GitHub">GitHub</SelectItem>
                      <SelectItem value="YouTube">YouTube</SelectItem>
                      <SelectItem value="Other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Usuário
                  </Label>
                  <Input
                    id="username"
                    value={newSocialMedia.username || ""}
                    onChange={(e) => setNewSocialMedia({ ...newSocialMedia, username: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="submit" 
                  onClick={addSocialMediaProfile}
                  className="bg-gradient-to-r from-[#003495] to-[#007cfa] text-white hover:from-[#00297a] hover:to-[#0065cc]"
                >
                  Adicionar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Resumo Profissional */}
          <Card className="border-blue-100">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Resumo Profissional</CardTitle>
                  <CardDescription>Uma breve descrição sobre você e seus objetivos</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Textarea
                  className={`min-h-[150px] border-gray-200 focus:border-blue-300 focus:ring-blue-200 ${!editMode ? "bg-gray-50" : ""}`}
                  defaultValue="Desenvolvedor Full Stack Senior com mais de 8 anos de experiência em desenvolvimento web. Especializado em React, Node.js e arquiteturas em nuvem. Apaixonado por criar soluções escaláveis e de alta performance."
                  readOnly={!editMode}
                  placeholder="Descreva sua experiência, habilidades e objetivos profissionais..."
                />
                {!editMode && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Resumo Profissional
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Experiência Profissional */}
          <Card className="border-blue-100">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Experiência Profissional</CardTitle>
                  <CardDescription>Seu histórico de trabalho e conquistas profissionais</CardDescription>
                </div>
                {editMode && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                    onClick={addExperience}
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Adicionar
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                  {experiences.map((experience) => (
                    <ExperienceCard 
                      key={experience.id} 
                      experience={experience} 
                      isEditing={editMode} 
                      onEdit={(id, data) => editExperience(id)}
                      onDelete={removeExperience}
                    />
                  ))}
              </div>
              
              {editMode && (
                <button
                  className="flex w-full flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 text-gray-500 transition-colors hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-600 h-20"
                  onClick={addExperience}
                >
                  <Plus className="mb-1 h-5 w-5" />
                  <span className="text-sm">Adicionar experiência profissional</span>
                </button>
              )}
            </CardContent>
          </Card>

          {/* Educação */}
          <Card className="border-blue-100">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Educação</CardTitle>
                  <CardDescription>Sua formação acadêmica e cursos relevantes</CardDescription>
                </div>
                {editMode && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                    onClick={addEducation}
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Adicionar
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                  {educations.map((education) => (
                    <ExperienceCard 
                      key={education.id} 
                      experience={education} 
                      isEditing={editMode} 
                      onEdit={(id, data) => editEducation(id)}
                    onDelete={removeEducation}
                    />
                  ))}
              </div>
              
              {editMode && (
                <button
                  className="flex w-full flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 text-gray-500 transition-colors hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-600 h-20"
                  onClick={addEducation}
                >
                  <Plus className="mb-1 h-5 w-5" />
                  <span className="text-sm">Adicionar formação acadêmica</span>
                </button>
              )}
            </CardContent>
          </Card>

          {/* Habilidades */}
          <Card className="border-blue-100">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Habilidades</CardTitle>
                  <CardDescription>Suas competências técnicas, profissionais e sociais</CardDescription>
                </div>
                {/* Remoção do botão de adicionar do topo */}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Habilidades Técnicas */}
                <div>
                  <h3 className="text-base font-medium text-gray-700 mb-3">Habilidades Técnicas</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skills
                      .filter(skill => skill.category === "technical")
                      .map(skill => (
                        <div key={skill.id} className="group relative">
                          <Badge 
                            variant="secondary"
                            className="px-2 py-0.5 text-xs bg-blue-50 text-blue-700 border border-blue-100"
                          >
                            {skill.name}
                            {editMode && (
                              <button 
                                className="ml-1 text-red-400 hover:text-red-700"
                                onClick={() => deleteSkill(skill.id)}
                              >
                                ×
                              </button>
                            )}
                          </Badge>
                        </div>
                      ))}
                    {/* Botão de adicionar habilidade no final da lista */}
                    {editMode && (
                        <Badge 
                        variant="secondary"
                        className="px-2 py-0.5 text-xs border-dashed border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100 cursor-pointer transition-colors flex items-center"
                          onClick={() => openAddSkillDialog("technical")}
                        >
                          <Plus className="mr-1 h-3 w-3" />
                          Adicionar
                        </Badge>
                    )}
                  </div>
                </div>
                
                {/* Habilidades Pessoais (Profissionais + Sociais) */}
                <div>
                  <h3 className="text-base font-medium text-gray-700 mb-3">Habilidades Pessoais</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skills
                      .filter(skill => skill.category === "professional" || skill.category === "social")
                      .map(skill => (
                        <div key={skill.id} className="group relative">
                          <Badge 
                            variant="secondary"
                            className="px-2 py-0.5 text-xs bg-purple-50 text-purple-700 border border-purple-100"
                          >
                            {skill.name}
                            {editMode && (
                              <button 
                                className="ml-1 text-red-400 hover:text-red-700"
                                onClick={() => deleteSkill(skill.id)}
                              >
                                ×
                              </button>
                            )}
                          </Badge>
                        </div>
                      ))}
                    {/* Botão de adicionar habilidade no final da lista */}
                    {editMode && (
                        <Badge 
                        variant="secondary"
                        className="px-2 py-0.5 text-xs border-dashed border-purple-200 text-purple-600 bg-purple-50 hover:bg-purple-100 cursor-pointer transition-colors flex items-center"
                          onClick={() => openAddSkillDialog("professional")}
                        >
                          <Plus className="mr-1 h-3 w-3" />
                          Adicionar
                        </Badge>
                    )}
                  </div>
                        </div>
                      </div>
            </CardContent>
          </Card>

          {/* Certificados */}
          <Card className="border-blue-100">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Certificados</CardTitle>
                  <CardDescription>Suas certificações e qualificações profissionais</CardDescription>
                </div>
                {editMode && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-amber-200 text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                    onClick={addCertificate}
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Adicionar
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {certificates.map((certificate) => (
                  <CertificateCard 
                    key={certificate.id} 
                    certificate={certificate} 
                    isEditing={editMode} 
                    onEdit={editCertificate}
                    onDelete={removeCertificate}
                  />
                ))}
                
                {editMode && (
                  <button
                    className="flex h-full min-h-[120px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 text-gray-500 transition-colors hover:border-amber-300 hover:bg-amber-50/50 hover:text-amber-600"
                    onClick={addCertificate}
                  >
                    <Plus className="mb-2 h-5 w-5" />
                    <span className="text-sm">Adicionar certificado</span>
                  </button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Idiomas */}
          <Card className="border-blue-100">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Idiomas</CardTitle>
                  <CardDescription>Suas habilidades linguísticas e níveis de fluência</CardDescription>
                </div>
                {editMode && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                    className="border-teal-200 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
                    onClick={addLanguage}
                      >
                        <Plus className="mr-1 h-4 w-4" />
                        Adicionar
                      </Button>
                )}
                            </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {languages.map((lang) => (
                  <div key={lang.id} className="border border-gray-200 rounded-lg p-3 bg-white hover:shadow-sm transition-shadow relative">
                    {editMode && (
                      <div className="absolute top-2 right-2 flex space-x-1 z-10">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => editLanguage(lang.id)}
                          className="h-7 w-7 text-gray-500 hover:text-teal-600 bg-white/80 backdrop-blur-sm rounded-full"
                        >
                          <PenLine className="h-3.5 w-3.5" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeLanguage(lang.id)}
                          className="h-7 w-7 text-gray-500 hover:text-red-500 bg-white/80 backdrop-blur-sm rounded-full"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                            </div>
                    )}
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center">
                        <Globe className="h-4 w-4 text-teal-600" />
                            </div>
                      
                      <div className="flex flex-grow justify-between items-center">
                        <div>
                          <span className="font-medium text-gray-900">{lang.language}</span>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {getLevelDescription(lang.level)}
                          </div>
                            </div>
                        
                        <Badge 
                          variant="secondary"
                          className={`${getLevelColor(lang.level)} text-xs px-2 py-0.5 font-normal`}
                        >
                          {lang.level}
                            </Badge>
                        </div>
                      </div>
                        </div>
                ))}
                
                {editMode && (
                  <button
                    className="flex h-full min-h-[120px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 text-gray-500 transition-colors hover:border-teal-300 hover:bg-teal-50/50 hover:text-teal-600"
                    onClick={addLanguage}
                  >
                    <Plus className="mb-2 h-5 w-5" />
                    <span className="text-sm">Adicionar idioma</span>
                  </button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Projetos (anteriormente Portfólio) */}
          <Card className="border-blue-100">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                      <div>
                  <CardTitle>Projetos</CardTitle>
                  <CardDescription>Seus trabalhos, contribuições e portfólio</CardDescription>
                        </div>
                {editMode && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                    className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700"
                    onClick={() => setIsAddDialogOpen(true)}
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Adicionar
                          </Button>
                )}
                      </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {portfolioItems.map((item) => (
                  <ProjectCard 
                    key={item.id} 
                    project={item} 
                    isEditing={editMode} 
                    onEdit={editPortfolioItem}
                    onDelete={removePortfolioItem}
                  />
                ))}
                
                {editMode && (
                  <button
                    className="flex h-full min-h-[120px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 text-gray-500 transition-colors hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-600"
                    onClick={() => setIsAddDialogOpen(true)}
                  >
                    <Plus className="mb-2 h-5 w-5" />
                    <span className="text-sm">Adicionar projeto</span>
                  </button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Edit Portfolio Item Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Editar Item do Portfólio</DialogTitle>
                <DialogDescription>Atualize as informações do seu item de portfólio.</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-title" className="text-right">
                      Título
                    </Label>
                    <Input
                      id="edit-title"
                      value={newItem.title || ""}
                      onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                      className={`col-span-3 ${!editMode ? "no-focus-outline" : ""}`}
                      placeholder="Nome do projeto ou item"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-url" className="text-right">
                      URL
                    </Label>
                    <Input
                      id="edit-url"
                      value={newItem.url || ""}
                      onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                      className={`col-span-3 ${!editMode ? "no-focus-outline" : ""}`}
                      placeholder="https://"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="edit-description" className="text-right pt-2">
                      Descrição
                    </Label>
                    <Textarea
                      id="edit-description"
                      value={newItem.description || ""}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      className={`col-span-3 min-h-[100px] ${!editMode ? "no-focus-outline" : ""}`}
                      placeholder="Descreva brevemente este item"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-type" className="text-right">
                      Tipo
                    </Label>
                    <Select
                      value={newItem.type}
                      onValueChange={(value) => setNewItem({ ...newItem, type: value as PortfolioItem["type"] })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="link">Link</SelectItem>
                        <SelectItem value="file">Arquivo</SelectItem>
                        <SelectItem value="image">Imagem</SelectItem>
                        <SelectItem value="github">GitHub</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="edit-tags" className="text-right pt-2">
                      Tags
                    </Label>
                    <div className="col-span-3 space-y-3">
                      <div className="flex gap-2">
                        <Input
                          id="edit-tags"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Adicione tags relevantes"
                          className={`${!editMode ? "no-focus-outline" : ""}`}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              addTag()
                            }
                          }}
                        />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {newItem.tags?.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeTag(tag)}>
                              <X className="h-3 w-3" />
                              <span className="sr-only">Remover tag</span>
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-featured" className="text-right">
                      Destaque
                    </Label>
                    <div className="col-span-3 space-y-3">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="edit-featured"
                          checked={newItem.featured}
                          onCheckedChange={(checked) => setNewItem({ ...newItem, featured: checked })}
                        />
                        <Label htmlFor="edit-featured">Marcar como item em destaque</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => editPortfolioItem(newItem.id || "", newItem)}>
                  Salvar Alterações
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Visibilidade do Perfil */}
          <Card className="border-blue-100">
            <CardHeader className="pb-3">
              <CardTitle>Visibilidade do Perfil</CardTitle>
              <CardDescription>Controle como seu perfil aparece para recrutadores e empresas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-gray-900">Status do Perfil</h3>
                    <p className="text-sm text-gray-500">Defina se seu perfil está visível para recrutadores</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="profile-visibility" 
                      checked={!isProfileHidden}
                      onCheckedChange={(checked) => setIsProfileHidden(!checked)}
                      disabled={!editMode}
                    />
                    <Label htmlFor="profile-visibility" className="text-sm font-medium">
                      {isProfileHidden ? "Perfil Oculto" : "Perfil Visível"}
                    </Label>
                  </div>
                </div>

                {isProfileHidden && (
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <h3 className="mb-3 text-sm font-medium text-gray-900">Motivo da Ocultação</h3>
                    <div className="space-y-3">
                      {hideProfileReasonsList.map((reason) => (
                        <div key={reason.id} className="flex items-start space-x-2">
                          <Checkbox 
                            id={reason.id} 
                            checked={hideReasons.includes(reason.id)}
                            onCheckedChange={(checked) => handleHideReasonChange(!!checked, reason.id)}
                            disabled={!editMode}
                          />
                          <Label 
                            htmlFor={reason.id} 
                            className="text-sm text-gray-700"
                          >
                            {reason.label}
                          </Label>
                        </div>
                      ))}
                      
                      {showOtherReason && (
                        <div className="ml-6 mt-2">
                          <Input
                            placeholder="Descreva o motivo"
                            value={otherReason}
                            onChange={(e) => setOtherReason(e.target.value)}
                            className="text-sm border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                            disabled={!editMode}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-4">
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                      <Eye className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Visualização do Perfil</h3>
                      <p className="mt-1 text-sm text-gray-600">Veja como seu perfil aparece para recrutadores</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="mt-3 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                      >
                        Visualizar Perfil Público
                      </Button>
                    </div>
                  </div>
                </div>

                {!isProfileHidden && (
                  <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-4">
                    <div className="flex items-start space-x-3">
                      <div className="mt-0.5 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Ocultar Automaticamente</h3>
                        <p className="mt-1 text-sm text-gray-600">Agende quando seu perfil deve ser ocultado</p>
                        <div className="mt-3 flex items-center space-x-2">
                          <Switch 
                            id="scheduled-visibility" 
                            disabled={!editMode}
                          />
                          <Label htmlFor="scheduled-visibility" className="text-sm">
                            Ativar ocultação automática
                          </Label>
                        </div>
                        {editMode && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="mt-3 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                          >
                            Configurar Data
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        {editMode && (
          <div className="fixed bottom-6 right-6 z-10 flex space-x-2">
            <Button 
              variant="outline" 
              onClick={cancelChanges}
              className="border-gray-300 bg-white hover:bg-gray-50"
            >
              Cancelar
            </Button>
            <Button 
              onClick={saveChanges}
              className="bg-gradient-to-r from-[#003495] to-[#007cfa] text-white hover:from-[#00297a] hover:to-[#0065cc]"
            >
              Salvar Alterações
            </Button>
          </div>
        )}
      </div>
      
      {/* Adicionar os diálogos de gerenciamento de habilidades */}
      <AddSkillDialog />
      
      {/* Modal para adicionar/editar experiência profissional */}
      <Dialog open={experienceModalOpen} onOpenChange={setExperienceModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {currentExperience ? "Editar Experiência Profissional" : "Adicionar Experiência Profissional"}
            </DialogTitle>
            <DialogDescription>
              Preencha os detalhes da sua experiência profissional abaixo.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input 
                  id="company" 
                  value={newExperience.company || ""} 
                  onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                  placeholder="Nome da empresa"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="position">Cargo</Label>
                <Input 
                  id="position" 
                  value={newExperience.position || ""} 
                  onChange={(e) => setNewExperience({...newExperience, position: e.target.value})}
                  placeholder="Seu cargo ou função"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Data de Início</Label>
                <Input 
                  id="startDate" 
                  type="date" 
                  value={newExperience.startDate ? format(new Date(newExperience.startDate), 'yyyy-MM-dd') : ""} 
                  onChange={(e) => setNewExperience({
                    ...newExperience, 
                    startDate: e.target.value ? new Date(e.target.value) : new Date()
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="endDate">Data de Término</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="current" 
                      checked={newExperience.current || false}
                      onCheckedChange={(checked) => {
                        setNewExperience({
                          ...newExperience, 
                          current: checked === true,
                          endDate: checked === true ? undefined : newExperience.endDate
                        })
                      }}
                    />
                    <Label htmlFor="current" className="text-sm font-normal">Emprego atual</Label>
                  </div>
                </div>
                <Input 
                  id="endDate" 
                  type="date" 
                  disabled={newExperience.current}
                  value={newExperience.endDate && !newExperience.current ? format(new Date(newExperience.endDate), 'yyyy-MM-dd') : ""} 
                  onChange={(e) => setNewExperience({
                    ...newExperience, 
                    endDate: e.target.value ? new Date(e.target.value) : undefined
                  })}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Localização</Label>
              <Input 
                id="location" 
                value={newExperience.location || ""} 
                onChange={(e) => setNewExperience({...newExperience, location: e.target.value})}
                placeholder="Cidade, Estado"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea 
                id="description" 
                value={newExperience.description || ""} 
                onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                placeholder="Descreva suas responsabilidades e conquistas"
                rows={4}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setExperienceModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={saveExperience}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para adicionar/editar formação acadêmica */}
      <Dialog open={educationModalOpen} onOpenChange={setEducationModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {currentEducation ? "Editar Formação Acadêmica" : "Adicionar Formação Acadêmica"}
            </DialogTitle>
            <DialogDescription>
              Preencha os detalhes da sua formação acadêmica abaixo.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="institution">Instituição</Label>
                <Input 
                  id="institution" 
                  value={newEducation.institution || ""} 
                  onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})}
                  placeholder="Nome da instituição"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="degree">Curso/Grau</Label>
                <Input 
                  id="degree" 
                  value={newEducation.degree || ""} 
                  onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
                  placeholder="Ex: Bacharelado em Ciência da Computação"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eduStartDate">Data de Início</Label>
                <Input 
                  id="eduStartDate" 
                  type="date" 
                  value={newEducation.startDate ? format(new Date(newEducation.startDate), 'yyyy-MM-dd') : ""} 
                  onChange={(e) => setNewEducation({
                    ...newEducation, 
                    startDate: e.target.value ? new Date(e.target.value) : new Date()
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="eduEndDate">Data de Término</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="eduCurrent" 
                      checked={newEducation.current || false}
                      onCheckedChange={(checked) => {
                        setNewEducation({
                          ...newEducation, 
                          current: checked === true,
                          endDate: checked === true ? undefined : newEducation.endDate
                        })
                      }}
                    />
                    <Label htmlFor="eduCurrent" className="text-sm font-normal">Em andamento</Label>
                  </div>
                </div>
                <Input 
                  id="eduEndDate" 
                  type="date" 
                  disabled={newEducation.current}
                  value={newEducation.endDate && !newEducation.current ? format(new Date(newEducation.endDate), 'yyyy-MM-dd') : ""} 
                  onChange={(e) => setNewEducation({
                    ...newEducation, 
                    endDate: e.target.value ? new Date(e.target.value) : undefined
                  })}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="eduLocation">Localização</Label>
              <Input 
                id="eduLocation" 
                value={newEducation.location || ""} 
                onChange={(e) => setNewEducation({...newEducation, location: e.target.value})}
                placeholder="Cidade, Estado"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEducationModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={saveEducation}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para adicionar/editar certificado */}
      <Dialog open={certificateModalOpen} onOpenChange={setCertificateModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {currentCertificate ? "Editar Certificado" : "Adicionar Certificado"}
            </DialogTitle>
            <DialogDescription>
              Preencha os detalhes do seu certificado abaixo.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input 
                  id="name" 
                  value={newCertificate.name || ""} 
                  onChange={(e) => setNewCertificate({...newCertificate, name: e.target.value})}
                  placeholder="Nome do certificado"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="issuer">Emissor</Label>
                <Input 
                  id="issuer" 
                  value={newCertificate.issuer || ""} 
                  onChange={(e) => setNewCertificate({...newCertificate, issuer: e.target.value})}
                  placeholder="Nome do emissor"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="issueDate">Data de Emissão</Label>
                <Input 
                  id="issueDate" 
                  type="date" 
                  value={newCertificate.issueDate ? format(new Date(newCertificate.issueDate), 'yyyy-MM-dd') : ""} 
                  onChange={(e) => setNewCertificate({
                    ...newCertificate, 
                    issueDate: e.target.value ? new Date(e.target.value) : new Date()
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="expirationDate">Data de Expiração</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="expired" 
                      checked={newCertificate.expirationDate ? true : false}
                      onCheckedChange={(checked) => {
                        setNewCertificate({
                          ...newCertificate, 
                          expirationDate: checked === true ? new Date() : undefined
                        })
                      }}
                    />
                    <Label htmlFor="expired" className="text-sm font-normal">Certificado expirado</Label>
                  </div>
                </div>
                <Input 
                  id="expirationDate" 
                  type="date" 
                  disabled={newCertificate.expirationDate ? true : false}
                  value={newCertificate.expirationDate ? format(new Date(newCertificate.expirationDate), 'yyyy-MM-dd') : ""} 
                  onChange={(e) => setNewCertificate({
                    ...newCertificate, 
                    expirationDate: e.target.value ? new Date(e.target.value) : undefined
                  })}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="credentialId">ID do Credencial</Label>
              <Input 
                id="credentialId" 
                value={newCertificate.credentialId || ""} 
                onChange={(e) => setNewCertificate({...newCertificate, credentialId: e.target.value})}
                placeholder="ID do credencial"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="credentialUrl">URL do Credencial</Label>
              <Input 
                id="credentialUrl" 
                value={newCertificate.credentialUrl || ""} 
                onChange={(e) => setNewCertificate({...newCertificate, credentialUrl: e.target.value})}
                placeholder="URL do credencial"
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Habilidades</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    value={certificateSkill}
                    onChange={(e) => setCertificateSkill(e.target.value)}
                    placeholder="Adicionar habilidade"
                    className="h-8 w-[180px]"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="h-8 px-2"
                    onClick={addCertificateSkill}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md">
                {newCertificate.skills && newCertificate.skills.length > 0 ? (
                  newCertificate.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="px-2 py-1 bg-blue-50 text-blue-700">
                      {skill}
                      <X 
                        className="ml-1 h-3 w-3 cursor-pointer" 
                        onClick={() => removeCertificateSkill(skill)} 
                      />
                    </Badge>
                  ))
                ) : (
                  <div className="text-sm text-gray-400 flex items-center justify-center w-full">
                    Nenhuma habilidade adicionada
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setCertificateModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={saveCertificate}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para adicionar/editar idioma */}
      <Dialog open={languageModalOpen} onOpenChange={setLanguageModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentLanguage ? "Editar Idioma" : "Adicionar Idioma"}</DialogTitle>
            <DialogDescription>
              {currentLanguage ? "Atualize as informações do idioma." : "Adicione um novo idioma ao seu currículo."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="language" className="text-right">
                Idioma
              </Label>
              <Input
                id="language"
                placeholder="Ex: Inglês, Espanhol, Francês..."
                value={newLanguage.language || ""}
                onChange={(e) => setNewLanguage({ ...newLanguage, language: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="level" className="text-right">
                Nível
              </Label>
              <Select
                value={newLanguage.level || "Básico"}
                onValueChange={(value) => setNewLanguage({ ...newLanguage, level: value as Language["level"] })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Básico">Básico</SelectItem>
                  <SelectItem value="Intermediário">Intermediário</SelectItem>
                  <SelectItem value="Avançado">Avançado</SelectItem>
                  <SelectItem value="Fluente">Fluente</SelectItem>
                  <SelectItem value="Nativo">Nativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              onClick={saveLanguage}
              className="bg-gradient-to-r from-[#003495] to-[#007cfa] text-white hover:from-[#00297a] hover:to-[#0065cc]"
            >
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CandidateDashboardShell>
  )
}

