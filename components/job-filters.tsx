"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Check, ChevronsUpDown, X, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

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

export function JobFilters() {
  const [keyword, setKeyword] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const [location, setLocation] = useState("")
  const [jobType, setJobType] = useState("")
  const [salaryRange, setSalaryRange] = useState([0, 100000])
  const [useGeolocation, setUseGeolocation] = useState(false)
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null)
  const [searchRadius, setSearchRadius] = useState(50) // Default 50km radius
  const [geoError, setGeoError] = useState<string | null>(null)

  const toggleSkill = (skill: string) => {
    setSelectedSkills((current) => (current.includes(skill) ? current.filter((s) => s !== skill) : [...current, skill]))
  }

  const clearFilters = () => {
    setKeyword("")
    setSelectedSkills([])
    setLocation("")
    setJobType("")
    setSalaryRange([0, 100000])
    setUseGeolocation(false)
    setSearchRadius(50)
    setGeoError(null)
  }

  useEffect(() => {
    if (useGeolocation) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            })
            setGeoError(null)
          },
          (error) => {
            console.error("Error getting location:", error)
            setGeoError("Não foi possível obter sua localização. Por favor, verifique suas permissões de localização.")
            setUseGeolocation(false)
          },
        )
      } else {
        setGeoError("Seu navegador não suporta geolocalização.")
        setUseGeolocation(false)
      }
    } else {
      setUserLocation(null)
      setGeoError(null)
    }
  }, [useGeolocation])

  return (
    <div className="space-y-6 rounded-lg bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Filtros</h2>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Pesquisar por palavra-chave</h3>
        <Input
          placeholder="Ex: Desenvolvedor Full Stack"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
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
            <SelectItem value="remoto">Remoto - Brasil</SelectItem>
            <SelectItem value="remoto-global">Remoto - Global</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Switch id="use-geolocation" checked={useGeolocation} onCheckedChange={setUseGeolocation} />
          <Label htmlFor="use-geolocation">Usar minha localização atual</Label>
        </div>
        {geoError && (
          <Alert variant="destructive">
            <AlertDescription>{geoError}</AlertDescription>
          </Alert>
        )}
        {useGeolocation && !geoError && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Raio de busca</h4>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <Slider
                value={[searchRadius]}
                onValueChange={(value) => setSearchRadius(value[0])}
                max={200}
                step={10}
                className="w-[200px]"
              />
              <span className="text-sm text-gray-500">{searchRadius} km</span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Tipo de Emprego</h3>
        <Select value={jobType} onValueChange={setJobType}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os tipos</SelectItem>
            <SelectItem value="integral">Tempo Integral</SelectItem>
            <SelectItem value="meio-periodo">Meio Período</SelectItem>
            <SelectItem value="contrato">Contrato</SelectItem>
            <SelectItem value="temporario">Temporário</SelectItem>
            <SelectItem value="estagio">Estágio</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Faixa Salarial</h3>
        <Slider
          defaultValue={salaryRange}
          max={100000}
          step={1000}
          value={salaryRange}
          onValueChange={setSalaryRange}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>R$ {salaryRange[0].toLocaleString()}</span>
          <span>R$ {salaryRange[1].toLocaleString()}</span>
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

