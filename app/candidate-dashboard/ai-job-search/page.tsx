"use client"

import { useState, useEffect, useRef } from "react"
import { CandidateDashboardShell } from "@/components/candidate-dashboard-shell"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Search, 
  Briefcase, 
  MapPin, 
  Building2, 
  Clock, 
  Calendar, 
  Star, 
  Sparkles, 
  CheckCircle2, 
  MessageSquare, 
  Send, 
  FileText, 
  Cpu,
  Brain,
  Lightbulb,
  Rocket,
  Target,
  Wand2,
  Bookmark,
  Filter,
  X,
  Sliders,
  PenTool,
  Gauge,
  Flame,
  ThumbsUp,
  Award,
  Bolt,
  Coins,
  Users,
  Layers,
  Scroll,
  Laptop,
  Eye,
  Info,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  Settings,
  Bell,
  BarChart,
  Zap
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

// Tipos
interface Job {
  id: string
  title: string
  company: string
  logo: string
  location: string
  remote: boolean
  salary: string
  postedDate: string
  compatibility: number
  skills: string[]
  jobType: string
  description: string
  benefits?: string[]
  companySize?: string
  industry?: string
  experience?: string
  education?: string
  applicationDeadline?: string
  isNew?: boolean
  isHot?: boolean
  isPromoted?: boolean
  views?: number
  applications?: number
  interviewRate?: number
}

interface Filter {
  jobType: string[]
  remote: boolean | null
  minSalary: number
  minCompatibility: number
  skills: string[]
  location: string[]
  experience: string[]
  postedWithin: string | null
}

interface SearchHistory {
  id: string
  query: string
  date: string
  results: number
}

// Dados simulados
const popularSearches = [
  "Desenvolvedor React",
  "UX Designer",
  "Product Manager",
  "Data Scientist",
  "DevOps Engineer"
]

const popularLocations = [
  "São Paulo, SP",
  "Rio de Janeiro, RJ",
  "Belo Horizonte, MG",
  "Curitiba, PR",
  "Remoto"
]

const popularSkills = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "UI/UX",
  "AWS",
  "Docker",
  "SQL",
  "Java",
  "Figma"
]

// Componente principal
export default function AIJobSearchPage() {
  // Estados
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchComplete, setSearchComplete] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("all")
  const [jobs, setJobs] = useState<Job[]>([])
  const [savedJobs, setSavedJobs] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [aiSuggestion, setAiSuggestion] = useState("")
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([])
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false)
  const [isFirstSearch, setIsFirstSearch] = useState(true)
  const [filters, setFilters] = useState<Filter>({
    jobType: [],
    remote: null,
    minSalary: 0,
    minCompatibility: 70,
    skills: [],
    location: [],
    experience: [],
    postedWithin: null
  })
  const [showAIInsights, setShowAIInsights] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [showJobDetails, setShowJobDetails] = useState(false)
  const [currentMessage, setCurrentMessage] = useState("Analisando seu perfil e buscando vagas compatíveis...")
  const [sortBy, setSortBy] = useState<"relevance" | "date" | "salary">("relevance")
  
  const searchInputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  // Efeito para focar no input de busca ao carregar a página
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [])
  
  // Efeito para lidar com cliques fora do dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        searchInputRef.current && 
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSearchSuggestions(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  // Simulação de busca com animações e feedback visual
  const handleSearch = () => {
    setIsSearching(true)
    setSearchComplete(false)
    setProgress(0)
    setJobs([])
    setShowSearchSuggestions(false)
    setShowAIInsights(false)
    
    // Adicionar à história de busca
    if (searchQuery.trim()) {
      const newSearchHistory: SearchHistory = {
        id: Date.now().toString(),
        query: searchQuery,
        date: new Date().toISOString(),
        results: Math.floor(Math.random() * 20) + 5
      }
      
      setSearchHistory(prev => [newSearchHistory, ...prev].slice(0, 5))
    }
    
    // Simulação de progresso com mensagens de feedback
    const messages = [
      "Analisando seu perfil profissional...",
      "Identificando suas habilidades principais...",
      "Buscando vagas compatíveis...",
      "Calculando índices de compatibilidade...",
      "Aplicando filtros de preferência...",
      "Ordenando resultados por relevância...",
      "Gerando insights personalizados..."
    ]
    
    let messageIndex = 0
    setCurrentMessage(messages[0])
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.floor(Math.random() * 5) + 1
        
        // Atualizar mensagem de feedback
        if (newProgress > (messageIndex + 1) * 15 && messageIndex < messages.length - 1) {
          messageIndex++
          setCurrentMessage(messages[messageIndex])
        }
        
        if (newProgress >= 100) {
          clearInterval(interval)
          setIsSearching(false)
          setSearchComplete(true)
          setIsFirstSearch(false)
          
          // Dados simulados de vagas
      const mockJobs: Job[] = [
        {
              id: "1",
              title: "Desenvolvedor Frontend React Senior",
              company: "TechInnovate",
              logo: "https://via.placeholder.com/150",
              location: "São Paulo, SP",
              remote: true,
              salary: "R$ 12.000 - R$ 18.000",
              postedDate: "2023-06-15",
              compatibility: 98,
              skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Git", "Redux", "Jest"],
              jobType: "CLT",
              description: "Estamos buscando um desenvolvedor frontend senior para liderar projetos inovadores utilizando React e tecnologias modernas. Você trabalhará em um ambiente colaborativo com equipes multidisciplinares.\n\nResponsabilidades:\n• Desenvolver interfaces de usuário responsivas e acessíveis\n• Colaborar com designers e desenvolvedores backend\n• Implementar e manter padrões de código\n• Participar de code reviews e mentoria de desenvolvedores juniores\n\nRequisitos:\n• Experiência sólida com React e TypeScript\n• Conhecimento de Next.js e Tailwind CSS\n• Experiência com testes automatizados\n• Boas práticas de desenvolvimento e padrões de projeto",
              benefits: ["Plano de saúde", "Vale refeição", "Horário flexível", "Home office", "Gympass"],
              companySize: "50-200 funcionários",
              industry: "Tecnologia",
              experience: "5+ anos",
              education: "Graduação em Ciência da Computação ou áreas relacionadas",
              applicationDeadline: "2023-07-15",
              isHot: true,
              views: 342,
              applications: 28,
              interviewRate: 15
            },
            {
              id: "2",
              title: "Desenvolvedor Full Stack",
              company: "FinanceApp",
              logo: "https://via.placeholder.com/150",
              location: "Remoto",
              remote: true,
              salary: "R$ 10.000 - R$ 15.000",
              postedDate: "2023-06-18",
              compatibility: 92,
              skills: ["React", "Node.js", "MongoDB", "Express", "AWS", "TypeScript", "Docker"],
              jobType: "PJ",
              description: "Procuramos um desenvolvedor full stack para integrar nosso time de desenvolvimento de produtos financeiros. Você será responsável por implementar novas funcionalidades e manter sistemas existentes.\n\nResponsabilidades:\n• Desenvolver e manter aplicações web utilizando React e Node.js\n• Implementar APIs RESTful\n• Trabalhar com bancos de dados MongoDB\n• Participar de todo o ciclo de desenvolvimento de software\n\nRequisitos:\n• Experiência com desenvolvimento full stack\n• Conhecimento de React, Node.js e MongoDB\n• Familiaridade com AWS e Docker\n• Capacidade de trabalhar de forma autônoma",
              benefits: ["Contrato PJ", "Horário flexível", "100% remoto", "Equipamentos fornecidos"],
              companySize: "20-50 funcionários",
              industry: "Fintech",
              experience: "3+ anos",
              isNew: true,
              views: 187,
              applications: 15
            },
            {
              id: "3",
              title: "Desenvolvedor Frontend Pleno",
              company: "DesignSolutions",
              logo: "https://via.placeholder.com/150",
              location: "São Paulo, SP",
              remote: false,
              salary: "R$ 8.000 - R$ 12.000",
              postedDate: "2023-06-20",
              compatibility: 85,
              skills: ["React", "JavaScript", "CSS", "UI/UX", "Figma", "Styled Components"],
              jobType: "CLT",
              description: "Buscamos um desenvolvedor frontend com foco em UI/UX para criar interfaces incríveis para nossos clientes. Você trabalhará diretamente com designers e desenvolvedores backend.\n\nResponsabilidades:\n• Implementar designs de alta fidelidade\n• Desenvolver componentes reutilizáveis\n• Otimizar aplicações para máxima performance\n• Colaborar com a equipe de design\n\nRequisitos:\n• Experiência com React e JavaScript\n• Conhecimento avançado de CSS\n• Familiaridade com Figma\n• Bom senso estético e atenção aos detalhes",
              benefits: ["Plano de saúde", "Vale refeição", "Vale transporte", "Plano de carreira"],
              companySize: "10-20 funcionários",
              industry: "Design e Tecnologia",
              experience: "2-4 anos",
              views: 156,
              applications: 22
            },
            {
              id: "4",
              title: "Desenvolvedor React Native Senior",
              company: "MobileFirst",
              logo: "https://via.placeholder.com/150",
              location: "Remoto",
              remote: true,
              salary: "R$ 15.000 - R$ 20.000",
              postedDate: "2023-06-22",
              compatibility: 88,
              skills: ["React Native", "JavaScript", "TypeScript", "Redux", "Firebase", "Jest", "CI/CD"],
              jobType: "PJ",
              description: "Estamos contratando um desenvolvedor React Native senior para liderar o desenvolvimento de aplicativos móveis inovadores. Você será responsável por arquitetar soluções e mentoriar desenvolvedores juniores.\n\nResponsabilidades:\n• Desenvolver aplicativos móveis com React Native\n• Implementar arquiteturas escaláveis\n• Configurar pipelines de CI/CD\n• Mentoriar desenvolvedores juniores\n\nRequisitos:\n• Experiência sólida com React Native\n• Conhecimento de TypeScript e Redux\n• Familiaridade com Firebase\n• Experiência com testes automatizados",
              benefits: ["Contrato PJ", "Horário flexível", "100% remoto", "Bônus por desempenho"],
              companySize: "50-100 funcionários",
              industry: "Tecnologia Móvel",
              experience: "5+ anos",
              isPromoted: true,
              views: 231,
              applications: 18,
              interviewRate: 22
            },
            {
              id: "5",
              title: "Desenvolvedor Frontend Pleno",
              company: "EduTech",
              logo: "https://via.placeholder.com/150",
              location: "Belo Horizonte, MG",
              remote: true,
              salary: "R$ 7.500 - R$ 10.000",
              postedDate: "2023-06-23",
              compatibility: 90,
              skills: ["React", "TypeScript", "Material UI", "GraphQL", "Jest", "Storybook"],
              jobType: "CLT",
              description: "Procuramos um desenvolvedor frontend para trabalhar em nossa plataforma educacional em rápido crescimento. Você fará parte de um time ágil e contribuirá para o desenvolvimento de novas funcionalidades.\n\nResponsabilidades:\n• Desenvolver interfaces de usuário com React\n• Implementar consultas GraphQL\n• Criar e manter componentes no Storybook\n• Escrever testes automatizados\n\nRequisitos:\n• Experiência com React e TypeScript\n• Conhecimento de Material UI\n• Familiaridade com GraphQL\n• Experiência com testes automatizados",
              benefits: ["Plano de saúde", "Vale refeição", "Horário flexível", "Day off no aniversário"],
              companySize: "20-50 funcionários",
              industry: "Educação e Tecnologia",
              experience: "2-4 anos",
              education: "Graduação em áreas relacionadas à tecnologia",
              views: 178,
              applications: 25
            },
            {
              id: "6",
              title: "Desenvolvedor Frontend React",
              company: "HealthTech",
              logo: "https://via.placeholder.com/150",
              location: "Curitiba, PR",
              remote: true,
              salary: "R$ 8.000 - R$ 11.000",
              postedDate: "2023-06-25",
              compatibility: 82,
              skills: ["React", "JavaScript", "CSS", "Responsive Design", "RESTful APIs"],
              jobType: "CLT",
              description: "Estamos buscando um desenvolvedor frontend para trabalhar em nossa plataforma de saúde digital. Você será responsável por implementar interfaces de usuário responsivas e acessíveis.\n\nResponsabilidades:\n• Desenvolver interfaces responsivas\n• Integrar com APIs RESTful\n• Otimizar a performance da aplicação\n• Colaborar com a equipe de produto\n\nRequisitos:\n• Experiência com React e JavaScript\n• Conhecimento avançado de CSS\n• Familiaridade com design responsivo\n• Experiência com consumo de APIs",
              benefits: ["Plano de saúde", "Vale refeição", "Gympass", "Plano de carreira"],
              companySize: "50-100 funcionários",
              industry: "Saúde e Tecnologia",
              experience: "2+ anos",
              isNew: true,
              views: 134,
              applications: 19
            }
          ]
          
          setJobs(mockJobs)
          
          // Sugestão da IA
          setAiSuggestion("Com base no seu perfil e histórico de buscas, recomendo focar em vagas de React com TypeScript em empresas de tecnologia. Suas habilidades em desenvolvimento frontend são altamente valorizadas no mercado atual, especialmente em empresas que oferecem trabalho remoto. Considere também explorar oportunidades que mencionam Next.js, já que você tem experiência relevante nessa tecnologia.")
          
          // Mostrar insights da IA após um breve delay
          setTimeout(() => {
            setShowAIInsights(true)
          }, 1500)
          
          return 100
        }
        return newProgress
      })
    }, 120)
    
    return () => clearInterval(interval)
  }
  
  // Função para alternar salvamento de vagas
  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId) 
        : [...prev, jobId]
    )
  }
  
  // Função para abrir detalhes da vaga
  const openJobDetails = (job: Job) => {
    setSelectedJob(job)
    setShowJobDetails(true)
  }
  
  // Função para fechar detalhes da vaga
  const closeJobDetails = () => {
    setShowJobDetails(false)
    setTimeout(() => setSelectedJob(null), 300)
  }
  
  // Função para aplicar filtros
  const applyFilters = (newFilters: Partial<Filter>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }))
  }
  
  // Função para limpar todos os filtros
  const clearAllFilters = () => {
    setFilters({
      jobType: [],
      remote: null,
      minSalary: 0,
      minCompatibility: 70,
      skills: [],
      location: [],
      experience: [],
      postedWithin: null
    })
  }
  
  // Função para ordenar vagas
  const sortJobs = (jobs: Job[]): Job[] => {
    switch (sortBy) {
      case "date":
        return [...jobs].sort((a, b) => 
          new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
        )
      case "salary":
        return [...jobs].sort((a, b) => {
          const aAvg = getAverageSalary(a.salary)
          const bAvg = getAverageSalary(b.salary)
          return bAvg - aAvg
        })
      case "relevance":
      default:
        return [...jobs].sort((a, b) => b.compatibility - a.compatibility)
    }
  }
  
  // Função auxiliar para extrair valor médio do salário
  const getAverageSalary = (salaryRange: string): number => {
    const matches = salaryRange.match(/R\$\s*([\d.]+)(?:\s*-\s*R\$\s*([\d.]+))?/)
    if (!matches) return 0
    
    const min = parseFloat(matches[1].replace('.', ''))
    const max = matches[2] ? parseFloat(matches[2].replace('.', '')) : min
    
    return (min + max) / 2
  }
  
  // Filtrar vagas com base nos filtros e na aba ativa
  const filteredJobs = jobs.filter(job => {
    // Filtro por aba
    if (activeTab === "all") {
      // Continuar com outros filtros
    } else if (activeTab === "remote" && !job.remote) {
      return false
    } else if (activeTab === "clt" && job.jobType !== "CLT") {
      return false
    } else if (activeTab === "pj" && job.jobType !== "PJ") {
      return false
    } else if (activeTab === "saved" && !savedJobs.includes(job.id)) {
      return false
    }
    
    // Filtros avançados
    if (filters.remote !== null && job.remote !== filters.remote) {
      return false
    }
    
    if (filters.jobType.length > 0 && !filters.jobType.includes(job.jobType)) {
      return false
    }
    
    if (job.compatibility < filters.minCompatibility) {
      return false
    }
    
    if (filters.skills.length > 0 && !filters.skills.some(skill => job.skills.includes(skill))) {
      return false
    }
    
    if (filters.location.length > 0 && !filters.location.includes(job.location)) {
      return false
    }
    
    if (filters.experience.length > 0 && job.experience) {
      const matchesExperience = filters.experience.some(exp => {
        if (exp === "0-1" && job.experience?.includes("1 ano")) return true
        if (exp === "1-3" && job.experience?.includes("2") || job.experience?.includes("3")) return true
        if (exp === "3-5" && job.experience?.includes("4") || job.experience?.includes("5")) return true
        if (exp === "5+" && job.experience?.includes("5+")) return true
        return false
      })
      
      if (!matchesExperience) return false
    }
    
    if (filters.postedWithin) {
      const postedDate = new Date(job.postedDate)
      const now = new Date()
      const diffDays = Math.floor((now.getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24))
      
      if (filters.postedWithin === "day" && diffDays > 1) return false
      if (filters.postedWithin === "week" && diffDays > 7) return false
      if (filters.postedWithin === "month" && diffDays > 30) return false
    }
    
    // Filtro por termo de busca
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
  return (
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.skills.some(skill => skill.toLowerCase().includes(query))
      )
    }
    
    return true
  })
  
  // Ordenar vagas filtradas
  const sortedJobs = sortJobs(filteredJobs)

  return (
    <CandidateDashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              Busca Inteligente de Vagas
            </h1>
            <p className="text-muted-foreground">
              Nossa IA encontra as melhores vagas com base no seu perfil e experiência
            </p>
          </div>
        </div>
        
        <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-6 md:p-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
                  <Wand2 className="h-5 w-5 text-primary" />
                  Busca Potencializada por IA
                </h2>
                <p className="text-muted-foreground">
                  Nossa IA analisa seu currículo e encontra as vagas mais compatíveis com seu perfil
                </p>
              </div>
              
              <div className="relative">
                <div className="flex">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
                      placeholder="Digite habilidades ou cargos específicos (opcional)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 h-12 rounded-r-none border-r-0"
                      disabled={isSearching}
                      ref={searchInputRef}
                      onFocus={() => !isSearching && setShowSearchSuggestions(true)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !isSearching) {
                          setShowSearchSuggestions(false)
                          handleSearch()
                        }
                      }}
                    />
                    
                    {showSearchSuggestions && !isSearching && (
                      <div 
                        ref={dropdownRef}
                        className="absolute z-50 w-full bg-white rounded-md shadow-lg border mt-1 py-2 max-h-80 overflow-y-auto"
                        style={{ display: 'block' }}
                      >
                        {/* Buscas recentes */}
                        {searchHistory.length > 0 && (
                          <div className="px-3 py-1.5">
                            <h3 className="text-xs font-medium text-muted-foreground mb-2">Buscas recentes</h3>
                            <div className="space-y-1.5">
                              {searchHistory
                                .filter(item => 
                                  searchQuery.trim() === "" || 
                                  item.query.toLowerCase().includes(searchQuery.toLowerCase())
                                )
                                .map(item => (
                                  <div 
                                    key={item.id}
                                    className="flex items-center justify-between hover:bg-muted/50 rounded-md px-2 py-1.5 cursor-pointer"
                                    onClick={() => {
                                      setSearchQuery(item.query)
                                      setShowSearchSuggestions(false)
                                    }}
                                  >
                                    <div className="flex items-center gap-2">
                                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                      <span className="text-sm">{item.query}</span>
                                    </div>
                                    <Badge variant="outline" className="text-xs">{item.results}</Badge>
                                  </div>
                                ))
                              }
                            </div>
                          </div>
                        )}
                        
                        {/* Buscas populares */}
                        <div className="px-3 py-1.5 border-t">
                          <h3 className="text-xs font-medium text-muted-foreground mb-2">Buscas populares</h3>
                          <div className="flex flex-wrap gap-1.5">
                            {popularSearches
                              .filter(search => 
                                searchQuery.trim() === "" || 
                                search.toLowerCase().includes(searchQuery.toLowerCase())
                              )
                              .slice(0, 5)
                              .map((search, index) => (
                                <Badge 
                                  key={index} 
                                  variant="outline"
                                  className="cursor-pointer hover:bg-primary/10"
                                  onClick={() => {
                                    setSearchQuery(search)
                                    setShowSearchSuggestions(false)
                                  }}
                                >
                                  {search}
                                </Badge>
                              ))
                            }
                          </div>
                        </div>
                        
                        {/* Habilidades em alta */}
                        <div className="px-3 py-1.5 border-t">
                          <h3 className="text-xs font-medium text-muted-foreground mb-2">Habilidades em alta</h3>
                          <div className="flex flex-wrap gap-1.5">
                            {popularSkills
                              .filter(skill => 
                                searchQuery.trim() === "" || 
                                skill.toLowerCase().includes(searchQuery.toLowerCase())
                              )
                              .slice(0, 5)
                              .map((skill, index) => (
                                <Badge 
                                  key={index} 
                                  variant="outline"
                                  className="cursor-pointer hover:bg-primary/10"
                                  onClick={() => {
                                    setSearchQuery(skill)
                                    setShowSearchSuggestions(false)
                                  }}
                                >
                                  {skill}
                                </Badge>
                              ))
                            }
                          </div>
                        </div>
                        
                        {/* Mensagem quando não há resultados */}
                        {searchQuery.trim() !== "" && 
                          !searchHistory.some(item => item.query.toLowerCase().includes(searchQuery.toLowerCase())) &&
                          !popularSearches.some(search => search.toLowerCase().includes(searchQuery.toLowerCase())) &&
                          !popularSkills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) && (
                            <div className="px-3 py-4 text-center">
                              <p className="text-sm text-muted-foreground">
                                Nenhum resultado encontrado para "{searchQuery}"
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Pressione Enter para buscar vagas com este termo
                              </p>
                            </div>
                          )
                        }
                      </div>
                    )}
                  </div>
                  <Button 
                    className="h-12 px-6 rounded-l-none"
                    onClick={handleSearch}
                    disabled={isSearching}
                  >
                    {isSearching ? (
                      <>
                        <Cpu className="mr-2 h-4 w-4 animate-spin" />
                        Buscando...
                      </>
                    ) : (
                      <>
                        <Rocket className="mr-2 h-4 w-4" />
                        Buscar Vagas
                      </>
                    )}
          </Button>
        </div>
                
                {isSearching && (
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>{currentMessage}</span>
                      <span className="font-medium">{progress}%</span>
        </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex flex-wrap gap-2 animate-pulse">
                      <Badge variant="outline" className="bg-primary/5">React</Badge>
                      <Badge variant="outline" className="bg-primary/5">TypeScript</Badge>
                      <Badge variant="outline" className="bg-primary/5">Frontend</Badge>
                      <Badge variant="outline" className="bg-primary/5">UI/UX</Badge>
                      <Badge variant="outline" className="bg-primary/5">Next.js</Badge>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {searchComplete && (
          <>
            {aiSuggestion && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3"
              >
                <div className="bg-blue-100 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-blue-800 text-sm">Sugestão da IA</h3>
                  <p className="text-blue-700 text-sm mt-1">{aiSuggestion}</p>
                </div>
              </motion.div>
            )}
            
            {/* Painel de Insights da IA */}
            <AnimatePresence>
              {showAIInsights && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="bg-primary/20 rounded-full p-2">
                              <Brain className="h-5 w-5 text-primary" />
                            </div>
                            <h3 className="font-semibold text-lg">Insights da IA</h3>
                          </div>
                <Button
                  variant="ghost"
                  size="sm"
                            className="h-8 text-muted-foreground"
                            onClick={() => setShowAIInsights(false)}
                >
                            <X className="h-4 w-4" />
                </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-white/80 rounded-lg p-4 shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                              <Award className="h-5 w-5 text-amber-500" />
                              <h4 className="font-medium">Habilidades em Alta</h4>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              Estas são as habilidades mais requisitadas nas vagas compatíveis com seu perfil:
                            </p>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">React</span>
                                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '90%' }}></div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">TypeScript</span>
                                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Next.js</span>
                                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '75%' }}></div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Node.js</span>
                                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '65%' }}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-white/80 rounded-lg p-4 shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                              <Target className="h-5 w-5 text-green-600" />
                              <h4 className="font-medium">Melhores Correspondências</h4>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              Tipos de vagas com maior compatibilidade com seu perfil:
                            </p>
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                  <Laptop className="h-4 w-4 text-green-600" />
                                </div>
                                <div>
                                  <h5 className="text-sm font-medium">Desenvolvedor Frontend</h5>
                                  <p className="text-xs text-muted-foreground">95% compatível</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                  <Layers className="h-4 w-4 text-green-600" />
                                </div>
                                <div>
                                  <h5 className="text-sm font-medium">Desenvolvedor Full Stack</h5>
                                  <p className="text-xs text-muted-foreground">87% compatível</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                  <PenTool className="h-4 w-4 text-green-600" />
                                </div>
                                <div>
                                  <h5 className="text-sm font-medium">UI/UX Developer</h5>
                                  <p className="text-xs text-muted-foreground">82% compatível</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-white/80 rounded-lg p-4 shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                              <Rocket className="h-5 w-5 text-blue-600" />
                              <h4 className="font-medium">Recomendações</h4>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              Para aumentar suas chances de contratação:
                            </p>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start gap-2">
                                <Sparkles className="h-4 w-4 text-blue-600 mt-0.5" />
                                <span>Destaque sua experiência com React e TypeScript no currículo</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Sparkles className="h-4 w-4 text-blue-600 mt-0.5" />
                                <span>Considere adicionar projetos com Next.js ao seu portfólio</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Sparkles className="h-4 w-4 text-blue-600 mt-0.5" />
                                <span>Busque vagas em empresas de tecnologia e startups</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Sparkles className="h-4 w-4 text-blue-600 mt-0.5" />
                                <span>Explore oportunidades remotas para aumentar suas opções</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-end">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-primary border-primary/30 hover:bg-primary/10"
                            onClick={() => setShowAIInsights(false)}
                          >
                            Fechar Insights
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-xl font-semibold">
                Vagas Encontradas <span className="text-muted-foreground font-normal">({sortedJobs.length})</span>
              </h2>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-9"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
                
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="hidden md:block">
                  <TabsList className="bg-muted/50 h-9">
                    <TabsTrigger value="all" className="text-xs h-7">Todas</TabsTrigger>
                    <TabsTrigger value="remote" className="text-xs h-7">Remotas</TabsTrigger>
                    <TabsTrigger value="clt" className="text-xs h-7">CLT</TabsTrigger>
                    <TabsTrigger value="pj" className="text-xs h-7">PJ</TabsTrigger>
                    <TabsTrigger value="saved" className="text-xs h-7">Salvas</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            
            {showFilters && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <Card className="p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Tipo de Contrato</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="clt-filter" 
                            checked={filters.jobType.includes("CLT")}
                            onCheckedChange={(checked) => {
                              applyFilters({
                                jobType: checked 
                                  ? [...filters.jobType, "CLT"] 
                                  : filters.jobType.filter(t => t !== "CLT")
                              })
                            }}
                          />
                          <Label htmlFor="clt-filter">CLT</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="pj-filter" 
                            checked={filters.jobType.includes("PJ")}
                            onCheckedChange={(checked) => {
                              applyFilters({
                                jobType: checked 
                                  ? [...filters.jobType, "PJ"] 
                                  : filters.jobType.filter(t => t !== "PJ")
                              })
                            }}
                          />
                          <Label htmlFor="pj-filter">PJ</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Modalidade</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="remote-filter" 
                            checked={filters.remote === true}
                            onCheckedChange={(checked) => {
                              applyFilters({ remote: checked ? true : null })
                            }}
                          />
                          <Label htmlFor="remote-filter">Remoto</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="presential-filter" 
                            checked={filters.remote === false}
                            onCheckedChange={(checked) => {
                              applyFilters({ remote: checked ? false : null })
                            }}
                          />
                          <Label htmlFor="presential-filter">Presencial</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Compatibilidade Mínima</h3>
                      <div className="px-2">
                        <Slider
                          defaultValue={[filters.minCompatibility]}
                          max={100}
                          step={5}
                          onValueChange={(value) => {
                            applyFilters({ minCompatibility: value[0] })
                          }}
                          className="my-5"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>70%</span>
                          <span>80%</span>
                          <span>90%</span>
                          <span>100%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={clearAllFilters}
                      className="mr-2"
                    >
                      Limpar Filtros
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => setShowFilters(false)}
                    >
                      Aplicar Filtros
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
            
            <div className="md:hidden">
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-muted/50 grid grid-cols-5 h-9">
                  <TabsTrigger value="all" className="text-xs">Todas</TabsTrigger>
                  <TabsTrigger value="remote" className="text-xs">Remotas</TabsTrigger>
                  <TabsTrigger value="clt" className="text-xs">CLT</TabsTrigger>
                  <TabsTrigger value="pj" className="text-xs">PJ</TabsTrigger>
                  <TabsTrigger value="saved" className="text-xs">Salvas</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="space-y-4">
              {sortedJobs.length === 0 ? (
                <div className="text-center py-12 bg-muted/20 rounded-lg">
                  <Target className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-1">Nenhuma vaga encontrada</h3>
                  <p className="text-muted-foreground">
                    Tente ajustar seus filtros ou fazer uma nova busca
                  </p>
                </div>
              ) : (
                sortedJobs.map((job) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <div className="p-5">
                          <div className="flex gap-4">
                            <Avatar className="h-12 w-12 rounded-md">
                              <AvatarImage src={job.logo} alt={job.company} />
                              <AvatarFallback className="rounded-md bg-primary/10">
                                {job.company.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-semibold truncate">{job.title}</h3>
                                    {job.isNew && (
                                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                                        Nova
              </Badge>
                                    )}
                                    {job.isHot && (
                                      <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
                                        <Flame className="h-3 w-3 mr-1" />
                                        Em alta
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Building2 className="h-3.5 w-3.5 flex-shrink-0" />
                                    <span>{job.company}</span>
                                  </div>
                                </div>
                                
                                <div className="flex flex-col items-end">
                                  <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <Star 
                                        key={i} 
                                        className={cn(
                                          "h-4 w-4", 
                                          i < Math.floor(job.compatibility / 20) 
                                            ? "fill-yellow-400 text-yellow-400" 
                                            : "text-muted"
                                        )} 
                                      />
            ))}
          </div>
                                  <div className="flex items-center mt-1">
                                    <Badge 
                                      className={cn(
                                        "font-medium",
                                        job.compatibility >= 90 
                                          ? "bg-green-100 text-green-800 hover:bg-green-200" 
                                          : job.compatibility >= 80 
                                            ? "bg-blue-100 text-blue-800 hover:bg-blue-200" 
                                            : "bg-orange-100 text-orange-800 hover:bg-orange-200"
                                      )}
                                    >
                                      {job.compatibility}% compatível
                                    </Badge>
          </div>
                                </div>
                              </div>
                              
                              <div className="mt-3 grid grid-cols-2 gap-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                                  <span>{job.location}</span>
                                  {job.remote && (
                                    <Badge variant="outline" className="ml-1 h-5 px-1 text-[10px]">
                                      Remoto
                                    </Badge>
        )}
      </div>
                                <div className="flex items-center gap-2">
                                  <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                                  <span>{job.jobType}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                  <span>Publicada em: {new Date(job.postedDate).toLocaleDateString('pt-BR')}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                  <span>{job.salary}</span>
                                </div>
                              </div>
                              
                              <div className="mt-3">
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {job.description}
                                </p>
                              </div>
                              
                              <div className="mt-3">
                                <div className="flex flex-wrap gap-1.5">
                                  {job.skills.slice(0, 5).map((skill) => (
                                    <Badge key={skill} variant="secondary" className="bg-muted/50">
                                      {skill}
                                    </Badge>
                                  ))}
                                  {job.skills.length > 5 && (
                                    <Badge variant="outline" className="bg-muted/30">
                                      +{job.skills.length - 5}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              
                              {job.benefits && job.benefits.length > 0 && (
                                <div className="mt-3 flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">Benefícios:</span>
                                  <div className="flex flex-wrap gap-1.5">
                                    {job.benefits.slice(0, 3).map((benefit, index) => (
                                      <span key={index} className="text-xs text-muted-foreground">
                                        {benefit}{index < Math.min(job.benefits!.length, 3) - 1 ? "," : ""}
                                      </span>
                                    ))}
                                    {job.benefits.length > 3 && (
                                      <span className="text-xs text-primary cursor-pointer" onClick={() => openJobDetails(job)}>
                                        +{job.benefits.length - 3} mais
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="p-3 flex flex-wrap gap-2 justify-between">
                          <div className="flex items-center gap-4">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8"
                              onClick={() => toggleSaveJob(job.id)}
                            >
                              <Bookmark 
                                className={cn(
                                  "h-3.5 w-3.5 mr-1", 
                                  savedJobs.includes(job.id) ? "fill-primary text-primary" : ""
                                )} 
                              />
                              {savedJobs.includes(job.id) ? "Salva" : "Salvar"}
                            </Button>
                            
                            {job.views && (
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Eye className="h-3 w-3 mr-1" />
                                {job.views} visualizações
                              </div>
                            )}
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="h-8" onClick={() => openJobDetails(job)}>
                              <FileText className="h-3.5 w-3.5 mr-1" />
                              Ver Detalhes
                            </Button>
                            <Button size="sm" className="h-8">
                              <Send className="h-3.5 w-3.5 mr-1" />
                              Candidatar-se
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </>
        )}
        
        {/* Modal de detalhes da vaga */}
        <AnimatePresence>
          {showJobDetails && selectedJob && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={closeJobDetails}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  {/* Header com gradiente */}
                  <div className="bg-gradient-to-r from-primary/80 to-primary p-6 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 rounded-md border-2 border-white/20">
                          <AvatarImage src={selectedJob.logo} alt={selectedJob.company} />
                          <AvatarFallback className="rounded-md bg-white/20 text-white">
                            {selectedJob.company.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
        <div>
                          <h2 className="text-xl font-bold">{selectedJob.title}</h2>
                          <div className="flex items-center gap-2 mt-1">
                            <Building2 className="h-4 w-4" />
                            <span className="font-medium">{selectedJob.company}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              <span className="text-sm">{selectedJob.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Briefcase className="h-3.5 w-3.5" />
                              <span className="text-sm">{selectedJob.jobType}</span>
                            </div>
                            {selectedJob.remote && (
                              <Badge className="bg-white/20 hover:bg-white/30 text-white">
                                Remoto
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
                          <Gauge className="h-4 w-4" />
                          <span className="font-medium">{selectedJob.compatibility}% compatível</span>
                        </div>
                        <div className="flex mt-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
                            onClick={() => toggleSaveJob(selectedJob.id)}
                          >
                            <Bookmark 
                              className={cn(
                                "h-3.5 w-3.5 mr-1", 
                                savedJobs.includes(selectedJob.id) ? "fill-white" : ""
                              )} 
                            />
                            {savedJobs.includes(selectedJob.id) ? "Salva" : "Salvar"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Botão de fechar */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-white hover:bg-white/20 hover:text-white"
                    onClick={closeJobDetails}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* Conteúdo do modal */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-150px)]">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Coluna principal */}
                    <div className="md:col-span-2 space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Descrição da Vaga</h3>
                        <p className="text-muted-foreground whitespace-pre-line">
                          {selectedJob.description}
                        </p>
                  </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Habilidades Requeridas</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedJob.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="px-3 py-1">
                              {skill}
                            </Badge>
                          ))}
                </div>
                </div>
                      
                      {selectedJob.benefits && selectedJob.benefits.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Benefícios</h3>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {selectedJob.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
              </div>
                      )}
                    </div>
                    
                    {/* Coluna lateral */}
                    <div className="space-y-6">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Detalhes da Vaga</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>Data de publicação</span>
                            </div>
                            <span className="text-sm font-medium">
                              {new Date(selectedJob.postedDate).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 text-sm">
                              <Coins className="h-4 w-4 text-muted-foreground" />
                              <span>Faixa salarial</span>
                            </div>
                            <span className="text-sm font-medium">{selectedJob.salary}</span>
                          </div>
                          
                          {selectedJob.experience && (
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2 text-sm">
                                <Briefcase className="h-4 w-4 text-muted-foreground" />
                                <span>Experiência</span>
                              </div>
                              <span className="text-sm font-medium">{selectedJob.experience}</span>
                            </div>
                          )}
                          
                          {selectedJob.education && (
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2 text-sm">
                                <Scroll className="h-4 w-4 text-muted-foreground" />
                                <span>Formação</span>
                              </div>
                              <span className="text-sm font-medium">{selectedJob.education}</span>
                            </div>
                          )}
                          
                          {selectedJob.companySize && (
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2 text-sm">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span>Tamanho da empresa</span>
                              </div>
                              <span className="text-sm font-medium">{selectedJob.companySize}</span>
                            </div>
                          )}
                          
                          {selectedJob.industry && (
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2 text-sm">
                                <Layers className="h-4 w-4 text-muted-foreground" />
                                <span>Indústria</span>
                              </div>
                              <span className="text-sm font-medium">{selectedJob.industry}</span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                      
                      {(selectedJob.views || selectedJob.applications || selectedJob.interviewRate) && (
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base">Estatísticas</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {selectedJob.views && (
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-sm">
                                  <Eye className="h-4 w-4 text-muted-foreground" />
                                  <span>Visualizações</span>
                                </div>
                                <span className="text-sm font-medium">{selectedJob.views}</span>
                              </div>
                            )}
                            
                            {selectedJob.applications && (
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-sm">
                                  <Users className="h-4 w-4 text-muted-foreground" />
                                  <span>Candidaturas</span>
                                </div>
                                <span className="text-sm font-medium">{selectedJob.applications}</span>
                              </div>
                            )}
                            
                            {selectedJob.interviewRate && (
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-sm">
                                  <Bolt className="h-4 w-4 text-muted-foreground" />
                                  <span>Taxa de entrevistas</span>
                                </div>
                                <span className="text-sm font-medium">{selectedJob.interviewRate}%</span>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      )}
                      
                      <Card className="bg-primary/5 border-primary/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary" />
                            Análise da IA
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Esta vaga tem <span className="font-medium text-primary">{selectedJob.compatibility}% de compatibilidade</span> com seu perfil. 
                            {selectedJob.compatibility >= 90 
                              ? " Suas habilidades e experiência são extremamente adequadas para esta posição."
                              : selectedJob.compatibility >= 80
                                ? " Você possui a maioria das habilidades necessárias para esta vaga."
                                : " Você tem algumas das habilidades necessárias, mas pode precisar desenvolver outras para aumentar suas chances."
                            }
                          </p>
                          
                          <div className="mt-3 pt-3 border-t">
                            <h4 className="text-sm font-medium mb-2">Pontos fortes do seu perfil:</h4>
                            <ul className="space-y-1">
                              {selectedJob.skills.slice(0, 3).map((skill, index) => (
                                <li key={index} className="text-sm flex items-center gap-1.5">
                                  <ThumbsUp className="h-3.5 w-3.5 text-green-500" />
                                  <span>Experiência com {skill}</span>
                                </li>
                              ))}
                            </ul>
          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
                
                {/* Footer com botões de ação */}
                <div className="border-t p-4 bg-muted/20 flex justify-between items-center">
                  <Button variant="ghost" onClick={closeJobDetails}>
                    Fechar
            </Button>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Enviar Mensagem
                    </Button>
                    <Button>
                      <Send className="h-4 w-4 mr-2" />
                      Candidatar-se
            </Button>
          </div>
        </div>
              </motion.div>
            </motion.div>
      )}
        </AnimatePresence>
    </div>
    </CandidateDashboardShell>
  )
}


