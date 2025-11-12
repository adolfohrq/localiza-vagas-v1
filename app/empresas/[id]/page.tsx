import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Users, Calendar, Briefcase, Globe, Phone, Mail, Linkedin, Facebook, Twitter } from "lucide-react"

// Esta função seria substituída por uma chamada real à API ou banco de dados
function getCompanyData(id: string) {
  // Dados mockados para exemplo
  return {
    id,
    name: "TechSolutions Inc.",
    logo: "/placeholder.svg?height=100&width=100",
    coverImage: "/placeholder.svg?height=300&width=1000",
    industry: "Tecnologia",
    location: "São Paulo, SP",
    employeeCount: "201-500",
    foundedYear: 2010,
    website: "https://techsolutions.example.com",
    phone: "+55 11 1234-5678",
    email: "contato@techsolutions.example.com",
    linkedin: "https://www.linkedin.com/company/techsolutions",
    facebook: "https://www.facebook.com/techsolutions",
    twitter: "https://twitter.com/techsolutions",
    description:
      "TechSolutions Inc. é uma empresa líder em soluções de software inovadoras, focada em inteligência artificial e aprendizado de máquina. Nossa missão é transformar indústrias através da tecnologia de ponta, oferecendo soluções personalizadas que impulsionam a eficiência e o crescimento de nossos clientes.",
    openPositions: 15,
    benefits: [
      "Plano de saúde abrangente",
      "Horário flexível",
      "Trabalho remoto",
      "Desenvolvimento profissional",
      "Ambiente de trabalho colaborativo",
    ],
    culture:
      "Na TechSolutions, valorizamos a inovação, a colaboração e o crescimento contínuo. Nossa cultura é baseada em respeito mútuo, diversidade e um forte compromisso com a excelência técnica.",
  }
}

export default function CompanyProfile({ params }: { params: { id: string } }) {
  const company = getCompanyData(params.id)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>Início</span>
            <span>/</span>
            <span>Empresas</span>
            <span>/</span>
            <span className="font-medium text-primary">{company.name}</span>
          </div>
          <div className="relative rounded-lg overflow-hidden mb-6">
            <img src={company.coverImage || "/placeholder.svg"} alt="" className="w-full h-48 object-cover" />
            <div className="absolute bottom-4 left-4 flex items-end gap-4">
              <img
                src={company.logo || "/placeholder.svg"}
                alt={company.name}
                className="w-24 h-24 rounded-lg border-4 border-white bg-white"
              />
              <div>
                <h1 className="text-3xl font-bold text-white drop-shadow-lg">{company.name}</h1>
                <p className="text-white drop-shadow-lg">{company.industry}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Sobre a Empresa</h2>
              <p className="text-muted-foreground">{company.description}</p>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Cultura e Benefícios</h2>
              <p className="text-muted-foreground mb-4">{company.culture}</p>
              <h3 className="font-semibold mb-2">Benefícios:</h3>
              <ul className="list-disc list-inside text-muted-foreground">
                {company.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Vagas Abertas</h2>
              <p className="text-muted-foreground">
                Atualmente, temos {company.openPositions} vagas abertas. Visite nossa página de carreiras para mais
                informações.
              </p>
              <Button className="mt-4">Ver Vagas</Button>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Informações da Empresa</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{company.employeeCount} funcionários</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Fundada em {company.foundedYear}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  <span>{company.industry}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {company.website}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{company.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <a href={`mailto:${company.email}`} className="text-primary hover:underline">
                    {company.email}
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Redes Sociais</h2>
              <div className="flex gap-4">
                <a
                  href={company.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href={company.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href={company.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark"
                >
                  <Twitter className="h-6 w-6" />
                </a>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

