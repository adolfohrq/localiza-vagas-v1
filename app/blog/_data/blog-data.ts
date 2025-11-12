import { 
  Briefcase,
  TrendingUp,
  Lightbulb,
  Users,
  Rocket,
  Award
} from "lucide-react"

// Dados simulados para os artigos do blog
export const featuredPosts = [
  {
    id: "1",
    title: "Como se destacar em entrevistas remotas: Dicas de especialistas em RH",
    excerpt: "Aprenda técnicas eficazes para causar uma boa impressão em entrevistas online e aumentar suas chances de conseguir o emprego dos sonhos.",
    coverImage: "/placeholder.svg?height=400&width=800",
    category: "Carreira",
    date: "10 de março de 2023",
    readTime: "8 min de leitura",
    author: {
      name: "Ana Silva",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Especialista em RH"
    },
    featured: true
  },
  {
    id: "2",
    title: "Tendências do mercado de trabalho para 2023: O que esperar?",
    excerpt: "Análise das principais tendências que estão moldando o mercado de trabalho e como se preparar para aproveitar as novas oportunidades.",
    coverImage: "/placeholder.svg?height=400&width=800",
    category: "Mercado",
    date: "2 de março de 2023",
    readTime: "6 min de leitura",
    author: {
      name: "Carlos Santos",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Analista de Mercado"
    },
    featured: true
  },
  {
    id: "3",
    title: "Inteligência Artificial no recrutamento: Benefícios e desafios",
    excerpt: "Como a IA está transformando os processos de seleção e quais são as implicações para candidatos e recrutadores.",
    coverImage: "/placeholder.svg?height=400&width=800",
    category: "Tecnologia",
    date: "25 de fevereiro de 2023",
    readTime: "10 min de leitura",
    author: {
      name: "Mariana Costa",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Tech Recruiter"
    },
    featured: true
  }
]

export const recentPosts = [
  {
    id: "4",
    title: "Como criar um currículo que passa pelos filtros de ATS",
    excerpt: "Dicas práticas para otimizar seu currículo e garantir que ele seja aprovado pelos sistemas de rastreamento de candidatos.",
    coverImage: "/placeholder.svg?height=300&width=500",
    category: "Currículo",
    date: "18 de fevereiro de 2023",
    readTime: "5 min de leitura",
    author: {
      name: "Pedro Almeida",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Consultor de Carreira"
    }
  },
  {
    id: "5",
    title: "Soft skills mais valorizadas pelas empresas em 2023",
    excerpt: "Descubra quais habilidades comportamentais as empresas estão buscando e como desenvolvê-las para se destacar no mercado.",
    coverImage: "/placeholder.svg?height=300&width=500",
    category: "Desenvolvimento",
    date: "12 de fevereiro de 2023",
    readTime: "7 min de leitura",
    author: {
      name: "Juliana Mendes",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Psicóloga Organizacional"
    }
  },
  {
    id: "6",
    title: "Negociação salarial: Como pedir o que você merece",
    excerpt: "Estratégias eficazes para negociar seu salário com confiança e conseguir uma remuneração justa pelo seu trabalho.",
    coverImage: "/placeholder.svg?height=300&width=500",
    category: "Carreira",
    date: "5 de fevereiro de 2023",
    readTime: "6 min de leitura",
    author: {
      name: "Rafael Oliveira",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Consultor Financeiro"
    }
  },
  {
    id: "7",
    title: "Home office vs. trabalho híbrido: Qual o melhor modelo para você?",
    excerpt: "Análise comparativa dos diferentes modelos de trabalho e como identificar qual se adapta melhor ao seu perfil profissional.",
    coverImage: "/placeholder.svg?height=300&width=500",
    category: "Lifestyle",
    date: "29 de janeiro de 2023",
    readTime: "8 min de leitura",
    author: {
      name: "Fernanda Lima",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Especialista em Bem-estar Corporativo"
    }
  },
  {
    id: "8",
    title: "LinkedIn: Como otimizar seu perfil para atrair recrutadores",
    excerpt: "Guia completo para criar um perfil profissional atrativo e aumentar suas chances de ser encontrado por recrutadores.",
    coverImage: "/placeholder.svg?height=300&width=500",
    category: "Redes Sociais",
    date: "22 de janeiro de 2023",
    readTime: "9 min de leitura",
    author: {
      name: "Gustavo Martins",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Especialista em Marketing Pessoal"
    }
  },
  {
    id: "9",
    title: "Como se preparar para uma transição de carreira bem-sucedida",
    excerpt: "Passos essenciais para planejar e executar uma mudança de carreira sem comprometer sua estabilidade financeira e profissional.",
    coverImage: "/placeholder.svg?height=300&width=500",
    category: "Carreira",
    date: "15 de janeiro de 2023",
    readTime: "7 min de leitura",
    author: {
      name: "Camila Rocha",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Coach de Carreira"
    }
  }
]

export const categories = [
  { name: "Carreira", icon: Briefcase, count: 24 },
  { name: "Mercado", icon: TrendingUp, count: 18 },
  { name: "Tecnologia", icon: Rocket, count: 15 },
  { name: "Desenvolvimento", icon: Lightbulb, count: 12 },
  { name: "Lifestyle", icon: Users, count: 10 },
  { name: "Liderança", icon: Award, count: 8 }
]

export const popularTags = [
  "Entrevista", "Currículo", "Home Office", "Tecnologia", "Carreira", 
  "LinkedIn", "Soft Skills", "Produtividade", "Networking", "Salário"
] 