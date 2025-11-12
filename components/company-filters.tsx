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

const industries = [
  { value: "tech", label: "Tecnologia" },
  { value: "finance", label: "Finanças" },
  { value: "healthcare", label: "Saúde" },
  { value: "education", label: "Educação" },
  { value: "retail", label: "Varejo" },
  { value: "manufacturing", label: "Manufatura" },
  { value: "media", label: "Mídia e Entretenimento" },
  { value: "consulting", label: "Consultoria" },
  { value: "nonprofit", label: "Sem fins lucrativos" },
  { value: "hospitality", label: "Hotelaria e Turismo" },
]

export function CompanyFilters() {
  const [keyword, setKeyword] = useState("")
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const [location, setLocation] = useState("")
  const [companySize, setCompanySize] = useState("")
  const [useGeolocation, setUseGeolocation] = useState(false)
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null)
  const [searchRadius, setSearchRadius] = useState(50) // Default 50km radius
  const [geoError, setGeoError] = useState<string | null>(null)
  const [employeeRange, setEmployeeRange] = useState([0, 1000])

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries((current) =>
      current.includes(industry) ? current.filter((i) => i !== industry) : [...current, industry],
    )
  }

  const clearFilters = () => {
    setKeyword("")
    setSelectedIndustries([])
    setLocation("")
    setCompanySize("")
    setUseGeolocation(false)
    setSearchRadius(50)
    setGeoError(null)
    setEmployeeRange([0, 1000])
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
      <h2 className="text-lg font-semibold mb-4">Filtros de Empresas</h2>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Pesquisar por nome</h3>
        <Input placeholder="Ex: Tech Solutions" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Indústrias</h3>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
              {selectedIndustries.length > 0
                ? `${selectedIndustries.length} selecionada${selectedIndustries.length !== 1 ? "s" : ""}`
                : "Selecione as indústrias"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Procurar indústria..." />
              <CommandList>
                <CommandEmpty>Nenhuma indústria encontrada.</CommandEmpty>
                <CommandGroup className="max-h-64 overflow-auto">
                  {industries.map((industry) => (
                    <CommandItem key={industry.value} onSelect={() => toggleIndustry(industry.value)}>
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedIndustries.includes(industry.value) ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {industry.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedIndustries.map((industry) => (
            <Badge key={industry} variant="secondary" className="bg-blue-50 text-primary">
              {industries.find((i) => i.value === industry)?.label}
              <button onClick={() => toggleIndustry(industry)} className="ml-1 text-gray-500 hover:text-gray-700">
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
            <SelectItem value="rs">Rio Grande do Sul</SelectItem>
            <SelectItem value="pr">Paraná</SelectItem>
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
        <h3 className="text-sm font-medium">Quantidade de Funcionários</h3>
        <Slider
          defaultValue={employeeRange}
          max={1000}
          step={10}
          value={employeeRange}
          onValueChange={setEmployeeRange}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{employeeRange[0]} funcionários</span>
          <span>{employeeRange[1] === 1000 ? "1000+" : employeeRange[1]} funcionários</span>
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

