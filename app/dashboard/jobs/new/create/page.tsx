"use client"

import type React from "react"

import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"

const availableSkills = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "nodejs", label: "Node.js" },
  { value: "python", label: "Python" },
  { value: "typescript", label: "TypeScript" },
  { value: "javascript", label: "JavaScript" },
  { value: "mongodb", label: "MongoDB" },
  { value: "postgresql", label: "PostgreSQL" },
  { value: "mysql", label: "MySQL" },
  { value: "aws", label: "AWS" },
  { value: "docker", label: "Docker" },
  { value: "kubernetes", label: "Kubernetes" },
]

const availableBenefits = [
  { value: "health", label: "Plano de Saúde" },
  { value: "dental", label: "Plano Odontológico" },
  { value: "meal", label: "Vale Refeição" },
  { value: "food", label: "Vale Alimentação" },
  { value: "transport", label: "Vale Transporte" },
  { value: "gym", label: "Gympass" },
  { value: "life_insurance", label: "Seguro de Vida" },
  { value: "profit_sharing", label: "Participação nos Lucros" },
  { value: "education", label: "Auxílio Educação" },
  { value: "home_office", label: "Home Office" },
  { value: "flexible_hours", label: "Horário Flexível" },
  { value: "daycare", label: "Auxílio Creche" },
]

const professionalAreas = [
  { value: "technology", label: "Tecnologia da Informação" },
  { value: "engineering", label: "Engenharia" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Vendas" },
  { value: "finance", label: "Finanças" },
  { value: "hr", label: "Recursos Humanos" },
  { value: "admin", label: "Administrativo" },
  { value: "legal", label: "Jurídico" },
  { value: "health", label: "Saúde" },
  { value: "education", label: "Educação" },
]

export default function CreateJobPage() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([])
  const [skillsOpen, setSkillsOpen] = useState(false)
  const [benefitsOpen, setBenefitsOpen] = useState(false)
  const [showSalary, setShowSalary] = useState(true)
  const [isHighlighted, setIsHighlighted] = useState(false)
  const router = useRouter()
  const [highlightedUnitsAvailable, setHighlightedUnitsAvailable] = useState(5) // Exemplo: 5 unidades disponíveis

  const toggleSkill = (skill: string) => {
    setSelectedSkills((current) => (current.includes(skill) ? current.filter((s) => s !== skill) : [...current, skill]))
  }

  const toggleBenefit = (benefit: string) => {
    setSelectedBenefits((current) =>
      current.includes(benefit) ? current.filter((b) => b !== benefit) : [...current, benefit],
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/dashboard/jobs")
  }

  return (
    <DashboardShell>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Publicar Nova Vaga</h2>
          <p className="text-muted-foreground">Preencha as informações da vaga que você deseja publicar</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Publicar Vaga</Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
            <CardDescription>Defina as informações principais da vaga</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título da Vaga</Label>
              <Input id="title" placeholder="Ex: Desenvolvedor Full Stack Senior" required />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="department">Departamento</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tecnologia">Tecnologia</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="vendas">Vendas</SelectItem>
                    <SelectItem value="rh">Recursos Humanos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="professional-area">Área Profissional</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a área" />
                  </SelectTrigger>
                  <SelectContent>
                    {professionalAreas.map((area) => (
                      <SelectItem key={area.value} value={area.value}>
                        {area.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Contratação</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="integral">Tempo Integral</SelectItem>
                    <SelectItem value="parcial">Meio Período</SelectItem>
                    <SelectItem value="temporario">Temporário</SelectItem>
                    <SelectItem value="estagio">Estágio</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Localização</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a localização" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remoto">Remoto</SelectItem>
                    <SelectItem value="hibrido">Híbrido</SelectItem>
                    <SelectItem value="presencial">Presencial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="travel">Disponibilidade para Viagens</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a disponibilidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Não necessário</SelectItem>
                    <SelectItem value="eventual">Eventualmente</SelectItem>
                    <SelectItem value="frequent">Frequentemente</SelectItem>
                    <SelectItem value="constant">Constantemente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vacancies">Número de Vagas</Label>
                <Input type="number" id="vacancies" min={1} required />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Remuneração</CardTitle>
            <CardDescription>Defina as informações sobre salário</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="show-salary">Informar Salário</Label>
              <Select onValueChange={(value) => setShowSalary(value === "show")} defaultValue="show">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="show">Informar salário</SelectItem>
                  <SelectItem value="hide">Não informar salário</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {showSalary && (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="salary-min">Salário Mínimo</Label>
                  <Input type="number" id="salary-min" min={0} step={100} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary-max">Salário Máximo</Label>
                  <Input type="number" id="salary-max" min={0} step={100} required />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Descrição e Requisitos</CardTitle>
            <CardDescription>Detalhe as informações sobre a vaga</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Descrição da Vaga</Label>
              <Textarea
                id="description"
                className="min-h-[100px]"
                placeholder="Descreva as principais responsabilidades e o dia a dia do profissional..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Requisitos</Label>
              <Textarea
                id="requirements"
                className="min-h-[100px]"
                placeholder="Liste os requisitos necessários para a vaga..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="differentials">Diferenciais</Label>
              <Textarea
                id="differentials"
                className="min-h-[100px]"
                placeholder="Liste os diferenciais desejáveis para a vaga..."
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Habilidades Necessárias</CardTitle>
            <CardDescription>Selecione as habilidades requeridas para a vaga</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Popover open={skillsOpen} onOpenChange={setSkillsOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={skillsOpen} className="w-full justify-between">
                  {selectedSkills.length > 0
                    ? `${selectedSkills.length} selecionada${selectedSkills.length !== 1 ? "s" : ""}`
                    : "Selecione as habilidades"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Procurar habilidade..." />
                  <CommandList>
                    <CommandEmpty>Nenhuma habilidade encontrada.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                      {availableSkills.map((skill) => (
                        <CommandItem key={skill.value} onSelect={() => toggleSkill(skill.value)}>
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedSkills.includes(skill.value) ? "opacity-100" : "opacity-0",
                            )}
                          />
                          {skill.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <div className="flex flex-wrap gap-2">
              {selectedSkills.map((skill) => (
                <Badge key={skill} variant="secondary" className="bg-blue-50 text-primary">
                  {availableSkills.find((s) => s.value === skill)?.label || skill}
                  <button onClick={() => toggleSkill(skill)} className="ml-1 text-gray-500 hover:text-gray-700">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Benefícios</CardTitle>
            <CardDescription>Selecione os benefícios oferecidos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Popover open={benefitsOpen} onOpenChange={setBenefitsOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={benefitsOpen}
                  className="w-full justify-between"
                >
                  {selectedBenefits.length > 0
                    ? `${selectedBenefits.length} selecionado${selectedBenefits.length !== 1 ? "s" : ""}`
                    : "Selecione os benefícios"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Procurar benefício..." />
                  <CommandList>
                    <CommandEmpty>Nenhum benefício encontrado.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                      {availableBenefits.map((benefit) => (
                        <CommandItem key={benefit.value} onSelect={() => toggleBenefit(benefit.value)}>
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedBenefits.includes(benefit.value) ? "opacity-100" : "opacity-0",
                            )}
                          />
                          {benefit.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <div className="flex flex-wrap gap-2">
              {selectedBenefits.map((benefit) => (
                <Badge key={benefit} variant="secondary" className="bg-blue-50 text-primary">
                  {availableBenefits.find((b) => b.value === benefit)?.label || benefit}
                  <button onClick={() => toggleBenefit(benefit)} className="ml-1 text-gray-500 hover:text-gray-700">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Horário de Trabalho</CardTitle>
            <CardDescription>Defina o horário e dias de trabalho</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="work-days">Dias de Trabalho</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione os dias" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seg-sex">Segunda a Sexta</SelectItem>
                    <SelectItem value="seg-sab">Segunda a Sábado</SelectItem>
                    <SelectItem value="escala">Escala</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="work-hours">Carga Horária</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a carga horária" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="40">40 horas semanais</SelectItem>
                    <SelectItem value="30">30 horas semanais</SelectItem>
                    <SelectItem value="20">20 horas semanais</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="work-schedule">Horário</Label>
              <Input id="work-schedule" placeholder="Ex: 09:00 às 18:00" required />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configurações Adicionais</CardTitle>
            <CardDescription>Configure opções adicionais para a vaga</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <Label>Vaga Urgente</Label>
                <p className="text-sm text-muted-foreground">Marque se a vaga precisa ser preenchida com urgência</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <Label>Vaga em Destaque</Label>
                <p className="text-sm text-muted-foreground">
                  Destaque sua vaga na página inicial e nos resultados de busca
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {highlightedUnitsAvailable} disponíveis
                </Badge>
                <Switch checked={isHighlighted} onCheckedChange={setIsHighlighted} />
              </div>
            </div>

            {isHighlighted && (
              <Alert>
                <AlertDescription>
                  Ao marcar esta opção, será descontada 1 unidade do seu pacote de vagas em destaque. Você terá{" "}
                  {highlightedUnitsAvailable - 1} unidade(s) restante(s).
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </form>
    </DashboardShell>
  )
}

