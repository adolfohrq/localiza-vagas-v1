"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const skills = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "nodejs", label: "Node.js" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "go", label: "Go" },
  { value: "typescript", label: "TypeScript" },
  { value: "sql", label: "SQL" },
  { value: "mongodb", label: "MongoDB" },
  { value: "aws", label: "AWS" },
  { value: "docker", label: "Docker" },
  { value: "kubernetes", label: "Kubernetes" },
  { value: "git", label: "Git" },
  { value: "figma", label: "Figma" },
  { value: "sketch", label: "Sketch" },
  { value: "adobexd", label: "Adobe XD" },
]

export function ProfessionalFilters() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [experienceRange, setExperienceRange] = useState([0, 20])
  const [ageRange, setAgeRange] = useState([18, 65])

  const toggleSkill = (skill: string) => {
    setSelectedSkills((current) => (current.includes(skill) ? current.filter((s) => s !== skill) : [...current, skill]))
  }

  const clearFilters = () => {
    setName("")
    setSelectedSkills([])
    setLocation("")
    setExperienceRange([0, 20])
    setAgeRange([18, 65])
  }

  return (
    <div className="space-y-6 rounded-lg bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Filtros</h2>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Pesquisar por nome</h3>
        <Input placeholder="Ex: João Silva" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Habilidades</h3>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
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
                  {skills.map((skill) => (
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
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedSkills.map((skill) => (
            <Badge key={skill} variant="secondary" className="bg-blue-50 text-primary">
              {skills.find((s) => s.value === skill)?.label}
              <button onClick={() => toggleSkill(skill)} className="ml-1 text-gray-500 hover:text-gray-700">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Localização</h3>
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a localização" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as localizações</SelectItem>
            <SelectItem value="sp">São Paulo</SelectItem>
            <SelectItem value="rj">Rio de Janeiro</SelectItem>
            <SelectItem value="mg">Minas Gerais</SelectItem>
            <SelectItem value="remoto">Remoto</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Anos de Experiência</h3>
        <Slider
          defaultValue={experienceRange}
          max={20}
          step={1}
          value={experienceRange}
          onValueChange={setExperienceRange}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{experienceRange[0]} anos</span>
          <span>{experienceRange[1]} anos</span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Faixa Etária</h3>
        <Slider
          defaultValue={ageRange}
          min={18}
          max={65}
          step={1}
          value={ageRange}
          onValueChange={setAgeRange}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{ageRange[0]} anos</span>
          <span>{ageRange[1]} anos</span>
        </div>
      </div>

      <div className="space-y-2">
        <Button className="w-full">Aplicar Filtros</Button>
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          Limpar Filtros
        </Button>
      </div>
    </div>
  )
}

