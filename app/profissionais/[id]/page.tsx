import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Briefcase, GraduationCap, Calendar, Mail, Linkedin, Github, Twitter, ExternalLink, Award, Clock, FileText, Building2, Download, Users, FileIcon, ChevronRight, HomeIcon, Globe } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ReactNode } from "react"
import Link from "next/link"

// Tipos para os dados do profissional
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

type Project = {
  id: string
  name: string
  description: string
  link: string
  type: "link" | "file" | "image" | "github" | "linkedin"
  tags: string[]
  featured: boolean
}

type Language = {
  language: string
  level: string
}

type Skill = {
  id: string
  name: string
  level: string
  subcategory: string
}

type WorkExperience = {
  company: string
  position: string
  period: string
  startDate: Date
  endDate?: Date
  current: boolean
  location: string
  skills: string[]
  description: string
}

type Education = {
  id: string
  institution: string
  degree: string
  startDate: Date
  endDate: Date
  current: boolean
  achievements: string[]
  courses: string[]
  location: string
}

type ProfessionalData = {
  id: string
  name: string
  title: string
  avatar: string
  coverImage: string
  location: string
  experience: string
  education: string
  lastActive: string
  age: number
  inscricaoData: string
  email: string
  linkedin: string
  github: string
  twitter: string
  bio: string
  projects: Project[]
  certificates: Certificate[]
  languages: Language[]
  skills: {
    technical: Skill[]
    professional: Skill[]
    social: Skill[]
  }
  workExperience: WorkExperience[]
  educationList: Education[]
  cvUrl: string
}

// Esta função seria substituída por uma chamada real à API ou banco de dados
function getProfessionalData(id: string): ProfessionalData {
  return {
    id,
    name: "Ana Silva",
    title: "Desenvolvedora Full Stack",
    avatar: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=300&width=1000",
    location: "São Paulo, SP",
    experience: "5 anos",
    education: "Mestrado em Ciência da Computação",
    lastActive: "há 2 horas",
    age: 28,
    inscricaoData: "15/05/2022",
    email: "ana.silva@example.com",
    linkedin: "https://www.linkedin.com/in/anasilva",
    github: "https://github.com/anasilva",
    twitter: "https://twitter.com/anasilva",
    bio: "Desenvolvedora Full Stack apaixonada por criar soluções inovadoras e escaláveis. Com 5 anos de experiência na indústria de tecnologia, tenho trabalhado em projetos desafiadores que abrangem desde startups até grandes empresas. Minha expertise inclui desenvolvimento web moderno, arquitetura de microsserviços e implementação de soluções em nuvem.",
    projects: [
      {
        id: "1",
        name: "E-commerce Platform",
        description: "Desenvolvimento de uma plataforma de e-commerce escalável usando React, Node.js e MongoDB.",
        link: "https://github.com/anasilva/ecommerce-platform",
        type: "github",
        tags: ["React", "Node.js", "MongoDB"],
        featured: true,
      },
      {
        id: "2",
        name: "Task Management App",
        description: "Aplicativo de gerenciamento de tarefas com React Native e Firebase.",
        link: "https://github.com/anasilva/task-management-app",
        type: "github",
        tags: ["React Native", "Firebase", "Mobile"],
        featured: false,
      },
      {
        id: "3",
        name: "Blog Pessoal de Tecnologia",
        description: "Meu blog onde compartilho dicas e tutoriais sobre desenvolvimento web e tecnologia.",
        link: "https://tech-blog-anasilva.vercel.app",
        type: "link",
        tags: ["Next.js", "Technical Writing", "Web Development"],
        featured: true,
      },
      {
        id: "4",
        name: "Design System Documentation",
        description: "Documentação interativa do sistema de design desenvolvido para a empresa XYZ.",
        link: "/placeholder.svg",
        type: "image",
        tags: ["UI/UX", "Documentation", "Storybook"],
        featured: false,
      },
    ],
    certificates: [
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
    ],
    languages: [
      { language: "Português", level: "Nativo" },
      { language: "Inglês", level: "Fluente" },
      { language: "Espanhol", level: "Intermediário" },
    ],
    skills: {
      technical: [
        { id: "1", name: "React", level: "Avançado", subcategory: "Desenvolvimento Front-end" },
        { id: "2", name: "TypeScript", level: "Avançado", subcategory: "Desenvolvimento Front-end" },
        { id: "3", name: "Next.js", level: "Avançado", subcategory: "Desenvolvimento Front-end" },
        { id: "4", name: "Node.js", level: "Avançado", subcategory: "Desenvolvimento Back-end" },
        { id: "5", name: "Express", level: "Avançado", subcategory: "Desenvolvimento Back-end" },
        { id: "6", name: "MongoDB", level: "Avançado", subcategory: "Banco de Dados" },
        { id: "7", name: "PostgreSQL", level: "Intermediário", subcategory: "Banco de Dados" },
        { id: "8", name: "GraphQL", level: "Intermediário", subcategory: "Desenvolvimento Back-end" },
        { id: "9", name: "AWS", level: "Intermediário", subcategory: "DevOps & Infraestrutura" },
        { id: "10", name: "Docker", level: "Intermediário", subcategory: "DevOps & Infraestrutura" },
        { id: "11", name: "Git", level: "Avançado", subcategory: "DevOps & Infraestrutura" },
      ],
      professional: [
        { id: "12", name: "Gestão de Projetos", level: "Avançado", subcategory: "Gestão & Liderança" },
        { id: "13", name: "Metodologias Ágeis", level: "Avançado", subcategory: "Gestão & Liderança" },
        { id: "14", name: "Scrum", level: "Avançado", subcategory: "Gestão & Liderança" },
        { id: "15", name: "Resolução de Problemas", level: "Avançado", subcategory: "Habilidades Analíticas" },
        { id: "16", name: "Pensamento Crítico", level: "Avançado", subcategory: "Habilidades Analíticas" },
      ],
      social: [
        { id: "17", name: "Comunicação Verbal", level: "Avançado", subcategory: "Comunicação & Relacionamento" },
        { id: "18", name: "Comunicação Escrita", level: "Avançado", subcategory: "Comunicação & Relacionamento" },
        { id: "19", name: "Trabalho em Equipe", level: "Avançado", subcategory: "Comunicação & Relacionamento" },
        { id: "20", name: "Adaptabilidade", level: "Avançado", subcategory: "Adaptabilidade & Crescimento" },
        { id: "21", name: "Aprendizado Contínuo", level: "Avançado", subcategory: "Adaptabilidade & Crescimento" },
      ],
    },
    workExperience: [
      {
        company: "TechCorp",
        position: "Desenvolvedora Full Stack Senior",
        period: "Jan 2021 - Presente",
        startDate: new Date(2021, 0, 1),
        current: true,
        location: "São Paulo, SP",
        skills: ["React", "Node.js", "AWS", "TypeScript", "MongoDB"],
        description:
          "Desenvolvimento de soluções full stack utilizando React, Node.js e AWS. Liderança técnica de equipe com 5 desenvolvedores.",
      },
      {
        company: "StartupXYZ",
        position: "Desenvolvedora Full Stack Pleno",
        period: "Mar 2019 - Dez 2020",
        startDate: new Date(2019, 2, 1),
        endDate: new Date(2020, 11, 31),
        current: false,
        location: "São Paulo, SP",
        skills: ["React", "Node.js", "GraphQL", "PostgreSQL"],
        description:
          "Desenvolvimento de aplicações web escaláveis usando React e Node.js. Implementação de microsserviços e APIs RESTful.",
      },
      {
        company: "WebSolutions",
        position: "Desenvolvedora Frontend",
        period: "Jun 2018 - Fev 2019",
        startDate: new Date(2018, 5, 1),
        endDate: new Date(2019, 1, 28),
        current: false,
        location: "Rio de Janeiro, RJ",
        skills: ["React", "JavaScript", "CSS", "HTML"],
        description: "Desenvolvimento de interfaces responsivas e componentes reutilizáveis usando React e TypeScript.",
      },
    ],
    educationList: [
      {
        id: "edu-1",
        institution: "Universidade de São Paulo",
        degree: "Mestrado em Ciência da Computação",
        startDate: new Date(2016, 2, 1),
        endDate: new Date(2018, 11, 15),
        current: false,
        achievements: [
          "Projeto de pesquisa em Machine Learning aplicado a sistemas de recomendação",
          "Publicação de artigo em conferência internacional",
        ],
        courses: ["Algoritmos Avançados", "Machine Learning", "Computação Distribuída", "Segurança da Informação"],
        location: "São Paulo, SP"
      },
      {
        id: "edu-2",
        institution: "Universidade Federal do Rio de Janeiro",
        degree: "Bacharelado em Ciência da Computação",
        startDate: new Date(2012, 2, 1),
        endDate: new Date(2016, 0, 20),
        current: false,
        achievements: [
          "Participação em maratona de programação",
          "Monitoria em Estruturas de Dados",
        ],
        courses: ["Estruturas de Dados", "Programação Orientada a Objetos", "Banco de Dados", "Redes de Computadores"],
        location: "Rio de Janeiro, RJ"
      }
    ],
    cvUrl: "/example-cv.pdf", // This would be a real CV URL in production
  }
}

export default function ProfessionalProfile({ params }: { params: { id: string } }) {
  const professional = getProfessionalData(params.id)

  // Função para formatar datas
  const formatDate = (date: Date) => {
    return format(date, 'MMM yyyy', { locale: ptBR });
  };

  // Componente para exibir um certificado
  const CertificateCard = ({ certificate }: { certificate: Certificate }) => {    
    const issueDate = formatDate(certificate.issueDate);
    const expirationDate = certificate.expirationDate ? formatDate(certificate.expirationDate) : null;
    
    return (
      <div className="border border-gray-200 rounded-lg p-3 bg-white hover:shadow-sm transition-shadow">
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
              {/* Link for large screens only */}
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

  // Componente para exibir um projeto
  const ProjectCard = ({ project }: { project: Project }) => {
    const getProjectIcon = () => {
      if (project.type === "github") {
        return <Github className="h-4 w-4 text-indigo-600" />
      } else if (project.type === "image") {
        return <FileText className="h-4 w-4 text-indigo-600" />
      } else {
        return <ExternalLink className="h-4 w-4 text-indigo-600" />
      }
    };
    
    const getProjectTypeLabel = () => {
      switch(project.type) {
        case "github": return "GitHub";
        case "image": return "Design";
        case "link": return "Website";
        case "linkedin": return "LinkedIn";
        default: return "Projeto";
      }
    };
    
    return (
      <div className="border border-gray-200 rounded-lg p-3 bg-white hover:shadow-sm transition-shadow">
        <div className="flex items-start gap-2">
          <div className="flex-shrink-0 w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center mt-0.5">
            {getProjectIcon()}
          </div>
          
          <div className="w-full">
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="font-medium text-gray-900 line-clamp-1">{project.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">{project.description}</p>
              </div>
              <a
                href={project.link}
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

  // Helper function to get a color based on language proficiency level
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

  // Helper function to provide description for each level
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          {/* Improved Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center text-sm">
              <li className="flex items-center">
                <Link 
                  href="/" 
                  className="flex items-center text-gray-500 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-1"
                  prefetch={false}
                >
                  <HomeIcon className="h-3.5 w-3.5" />
                  <span className="ml-1 sm:ml-2 hidden sm:inline">Início</span>
                </Link>
              </li>
              <li className="flex items-center mx-1 sm:mx-2 text-gray-400">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li className="flex items-center">
                <Link 
                  href="/profissionais" 
                  className="text-gray-500 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-1"
                  prefetch={false}
                >
                  <span>Profissionais</span>
                </Link>
              </li>
              <li className="flex items-center mx-1 sm:mx-2 text-gray-400">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li className="max-w-[180px] sm:max-w-xs truncate">
                <span 
                  className="font-medium text-primary px-1 rounded" 
                  title={professional.name}
                >
                  {professional.name}
                </span>
              </li>
            </ol>
          </nav>
          
          <div className="relative rounded-lg overflow-hidden mb-6">
            <img src={professional.coverImage || "/placeholder.svg"} alt="" className="w-full h-48 object-cover" />
            <div className="absolute bottom-4 left-4 flex items-end gap-4">
              <img
                src={professional.avatar || "/placeholder.svg"}
                alt={professional.name}
                className="w-24 h-24 rounded-full border-4 border-white"
              />
              <div>
                <h1 className="text-3xl font-bold text-white drop-shadow-lg">{professional.name}</h1>
                <p className="text-white drop-shadow-lg">{professional.title}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Sobre mim</h2>
              <p className="text-muted-foreground">{professional.bio}</p>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Experiências Profissionais</h2>
              <div className="grid grid-cols-1 gap-3">
                {professional.workExperience.map((experience: WorkExperience, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3 bg-white hover:shadow-sm transition-shadow">
                    <div className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center mt-0.5">
                        <Briefcase className="h-4 w-4 text-blue-600" />
                      </div>
                      
                      <div className="w-full min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-1 gap-1">
                          <div className="min-w-0">
                            <h3 className="font-medium text-gray-900 line-clamp-1">{experience.position}</h3>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Building2 className="h-3 w-3" />
                                {experience.company}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {experience.location}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs text-gray-400 whitespace-nowrap mt-1 sm:mt-0">
                            {experience.period}
                          </span>
                        </div>
                        
                        {experience.description && (
                          <p className="mt-2 text-xs text-gray-500 line-clamp-2">
                            {experience.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Educação</h2>
              <div className="grid grid-cols-1 gap-3">
                {professional.educationList.map((edu: Education, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3 bg-white hover:shadow-sm transition-shadow">
                    <div className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mt-0.5">
                        <GraduationCap className="h-4 w-4 text-green-600" />
                      </div>
                      
                      <div className="w-full min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-1 gap-1">
                          <div className="min-w-0">
                            <h3 className="font-medium text-gray-900 line-clamp-1">{edu.degree}</h3>
                            <p className="text-xs text-gray-500 truncate">{edu.institution}</p>
                          </div>
                          <span className="text-xs text-gray-400 whitespace-nowrap mt-1 sm:mt-0">
                            {formatDate(edu.startDate)} - {edu.current ? "Presente" : formatDate(edu.endDate)}
                          </span>
                        </div>
                        
                        <div className="flex items-center mt-2 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {edu.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Certificações</h2>
              <div className="grid grid-cols-1 gap-3">
                {professional.certificates.map((cert: Certificate, index: number) => (
                  <CertificateCard key={index} certificate={cert} />
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Projetos</h2>
              <div className="grid grid-cols-1 gap-3">
                {professional.projects.map((project: Project, index: number) => (
                  <ProjectCard key={index} project={project} />
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Habilidades</h2>
              
              <div className="space-y-6">
                {/* Habilidades Técnicas */}
                <div>
                  <h3 className="text-base font-medium text-gray-700 mb-3">Habilidades Técnicas</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {professional.skills.technical.map((skill: Skill) => (
                      <Badge
                        key={skill.id}
                        variant="secondary"
                        className="px-2 py-0.5 text-xs bg-blue-50 text-blue-700 border border-blue-100"
                      >
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Habilidades Pessoais */}
                <div>
                  <h3 className="text-base font-medium text-gray-700 mb-3">Habilidades Pessoais</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {[...professional.skills.professional, ...professional.skills.social].map((skill: Skill) => (
                      <Badge
                        key={skill.id}
                        variant="secondary"
                        className="px-2 py-0.5 text-xs bg-purple-50 text-purple-700 border border-purple-100"
                      >
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Idiomas</h2>
              <div className="grid grid-cols-1 gap-3">
                {professional.languages.map((lang: Language, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3 bg-white hover:shadow-sm transition-shadow">
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
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Informações do Profissional</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{professional.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  <span>{professional.experience} de experiência</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <GraduationCap className="h-4 w-4" />
                  <span>{professional.education}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{professional.age} anos</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <a href={`mailto:${professional.email}`} className="text-primary hover:underline">
                    {professional.email}
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Redes Sociais</h2>
              <div className="grid grid-cols-1 gap-3">
                <a
                  href={professional.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 gap-3 rounded-md border border-gray-200 bg-white hover:bg-blue-50 transition-colors group"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-[#0A66C2] bg-opacity-10 rounded-full flex items-center justify-center">
                    <Linkedin className="h-5 w-5 text-[#0A66C2]" />
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium text-gray-900">LinkedIn</div>
                    <div className="text-xs text-gray-500 truncate group-hover:text-blue-700">
                      {professional.linkedin.replace('https://www.linkedin.com/in/', '@')}
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                </a>
                
                <a
                  href={professional.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 gap-3 rounded-md border border-gray-200 bg-white hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-900 bg-opacity-10 rounded-full flex items-center justify-center">
                    <Github className="h-5 w-5 text-gray-900" />
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium text-gray-900">GitHub</div>
                    <div className="text-xs text-gray-500 truncate group-hover:text-gray-700">
                      {professional.github.replace('https://github.com/', '@')}
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-gray-700" />
                </a>
                
                <a
                  href={professional.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 gap-3 rounded-md border border-gray-200 bg-white hover:bg-blue-50 transition-colors group"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-[#1DA1F2] bg-opacity-10 rounded-full flex items-center justify-center">
                    <Twitter className="h-5 w-5 text-[#1DA1F2]" />
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium text-gray-900">Twitter</div>
                    <div className="text-xs text-gray-500 truncate group-hover:text-blue-500">
                      {professional.twitter.replace('https://twitter.com/', '@')}
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                </a>
              </div>
            </Card>

            <div className="grid gap-4">
              <Button className="w-full">Entrar em Contato</Button>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full flex items-center gap-2" asChild>
                  <a href={professional.cvUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Currículo Externo
                  </a>
                </Button>
                <Button variant="outline" className="w-full flex items-center gap-2 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:text-blue-800" asChild>
                  <a href={`/curriculos/interno/${professional.id}`}>
                    <Users className="h-4 w-4" />
                    Currículo Interno
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

