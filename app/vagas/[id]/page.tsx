import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Building2,
  DollarSign,
  Clock,
  Calendar,
  Users,
  Briefcase,
  Plane,
  Globe,
  FolderKanban,
  Clock3,
  CheckCircle2,
  Award,
} from "lucide-react"

// Esta função seria substituída por uma chamada real à API ou banco de dados
function getJobData(id: string) {
  return {
    id,
    company: "TechSolutions Inc.",
    title: "Desenvolvedor Full Stack",
    location: "São Paulo, SP",
    area: "Tecnologia",
    professionalArea: {
      main: "Tecnologia da Informação",
      sub: ["Desenvolvimento de Software", "Arquitetura de Sistemas"],
    },
    salary: "R$ 8.000 - R$ 12.000",
    logo: "/placeholder.svg?height=100&width=100",
    postedAt: "há 2 dias",
    type: "Tempo Integral",
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    numberOfVacancies: 3,
    skills: ["React", "Node.js", "TypeScript", "MongoDB", "AWS"],
    travelAvailability: {
      required: true,
      frequency: "Eventual",
      details: "Viagens ocasionais para reuniões com clientes e treinamentos",
    },
    requiredLanguages: [
      { language: "Português", level: "Nativo" },
      { language: "Inglês", level: "Avançado" },
      { language: "Espanhol", level: "Intermediário" },
    ],
    workSchedule: "Segunda a Sexta, das 9h às 18h, com flexibilidade para home office 2 dias por semana",
    responsibilities: [
      "Desenvolver e manter aplicações web usando React no frontend e Node.js no backend",
      "Trabalhar com bancos de dados MongoDB e implementar APIs RESTful",
      "Colaborar com designers UX/UI para implementar interfaces responsivas e intuitivas",
      "Participar de code reviews e contribuir para a melhoria contínua de nossas práticas de desenvolvimento",
      "Otimizar aplicações para máxima velocidade e escalabilidade",
    ],
    differentials: [
      "Experiência com arquitetura de microsserviços",
      "Conhecimento em práticas de DevOps e CI/CD",
      "Familiaridade com metodologias ágeis (Scrum, Kanban)",
      "Contribuições para projetos open-source",
      "Experiência em mentoria de desenvolvedores juniores",
    ],
    description: `Estamos procurando um Desenvolvedor Full Stack experiente para se juntar à nossa equipe dinâmica. O candidato ideal terá uma paixão por criar aplicações web escaláveis e de alta qualidade.

    Requisitos:
    - 3+ anos de experiência em desenvolvimento web full stack
    - Proficiência em React, Node.js, e TypeScript
    - Experiência com MongoDB e design de APIs RESTful
    - Conhecimento de práticas de DevOps e implantação em nuvem (preferencialmente AWS)
    - Excelentes habilidades de comunicação e trabalho em equipe`,
    benefits: [
      "Plano de saúde e odontológico",
      "Vale refeição/alimentação",
      "Gympass",
      "Horário flexível",
      "Trabalho remoto parcial",
      "Oportunidades de crescimento e desenvolvimento profissional",
    ],
    companyDescription:
      "A TechSolutions Inc. é uma empresa líder em soluções de software inovadoras, focada em inteligência artificial e aprendizado de máquina. Nossa missão é transformar indústrias através da tecnologia de ponta, oferecendo soluções personalizadas que impulsionam a eficiência e o crescimento de nossos clientes.",
  }
}

export default function JobDetails({ params }: { params: { id: string } }) {
  const job = getJobData(params.id)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>Início</span>
            <span>/</span>
            <span>Vagas</span>
            <span>/</span>
            <span className="font-medium text-primary">{job.title}</span>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center gap-6">
            <img
              src={job.logo || "/placeholder.svg"}
              alt={`${job.company} logo`}
              className="w-20 h-20 object-contain"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{job.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  {job.company}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Descrição da Vaga</h2>
              <div className="space-y-4 text-muted-foreground">
                {job.description.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Responsabilidades</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Diferenciais</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {job.differentials.map((differential, index) => (
                  <li key={index} className="flex items-start">
                    <Award className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>{differential}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Área Profissional</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FolderKanban className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{job.professionalArea.main}</span>
                </div>
                <div className="pl-6">
                  {job.professionalArea.sub.map((area, index) => (
                    <Badge key={index} variant="secondary" className="mr-2 mb-2">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Disponibilidade para Viagens</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Plane className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">
                    {job.travelAvailability.required ? "Necessário" : "Não necessário"}
                  </span>
                </div>
                {job.travelAvailability.required && (
                  <>
                    <p className="text-muted-foreground pl-6">Frequência: {job.travelAvailability.frequency}</p>
                    <p className="text-muted-foreground pl-6">{job.travelAvailability.details}</p>
                  </>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Idiomas Exigidos</h2>
              <div className="space-y-3">
                {job.requiredLanguages.map((lang, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <span>{lang.language}</span>
                    </div>
                    <Badge variant="outline">{lang.level}</Badge>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Habilidades Requeridas</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-50 text-primary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Benefícios</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {job.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Detalhes da Vaga</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Localização: {job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>Salário: {job.salary}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  <span>Tipo: {job.type}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Vagas: {job.numberOfVacancies}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Publicada: {job.postedAt}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Expira em: {Math.ceil((job.expirationDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} dias
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Horário de Trabalho</h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock3 className="h-4 w-4" />
                <span>{job.workSchedule}</span>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Sobre a Empresa</h2>
              <p className="text-muted-foreground">{job.companyDescription}</p>
            </Card>

            <Button className="w-full">Candidatar-se</Button>
            <Button variant="outline" className="w-full">
              Salvar Vaga
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

