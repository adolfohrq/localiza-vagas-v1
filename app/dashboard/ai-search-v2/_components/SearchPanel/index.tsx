"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Brain, Cpu, Sparkles } from "lucide-react"
import { Job } from "../../_data/jobs"

import { JobSelection } from "./JobSelection"
import { SearchParameters } from "./SearchParameters"
import { ExperienceSlider } from "./ExperienceSlider"

interface SearchPanelProps {
  selectedJob: string | null
  availableJobs: Job[]
  onJobSelect: (value: string) => void
  searchParameters: {
    skills: boolean
    education: boolean
    location: boolean
    experience: boolean
  }
  onSearchParametersChange: (params: {
    skills: boolean
    education: boolean
    location: boolean
    experience: boolean
  }) => void
  toggleSearchParameter?: (param: 'skills' | 'education' | 'location' | 'experience') => void
  experienceWeight: number[]
  onExperienceWeightChange: (value: number[]) => void
  isSearching: boolean
  onSearch: () => void
}

export function SearchPanel({
  selectedJob,
  availableJobs,
  onJobSelect,
  searchParameters,
  onSearchParametersChange,
  toggleSearchParameter,
  experienceWeight,
  onExperienceWeightChange,
  isSearching,
  onSearch
}: SearchPanelProps) {
  console.log("SearchPanel renderizado", { selectedJob, searchParameters, isSearching });
  
  // Função para alternar parâmetros de busca - fallback caso não seja fornecido como prop
  const handleToggleSearchParameter = (param: 'skills' | 'education' | 'location' | 'experience') => {
    console.log("Local toggleSearchParameter chamado para:", param);
    if (toggleSearchParameter) {
      toggleSearchParameter(param);
    } else {
      onSearchParametersChange({
        ...searchParameters,
        [param]: !searchParameters[param]
      });
    }
  };

  // Encontrar os dados da vaga selecionada
  const selectedJobData = selectedJob 
    ? availableJobs.find(job => job.id === selectedJob) || null 
    : null;

  return (
    <Card className="md:col-span-3 lg:col-span-2">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-2">
          <Sparkles className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <CardTitle>Selecione a Vaga</CardTitle>
            <CardDescription>Escolha a vaga e os critérios de busca</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Seleção de Vaga */}
        <JobSelection 
          selectedJob={selectedJob || ""}
          setSelectedJob={onJobSelect}
          selectedJobData={selectedJobData}
        />
        
        <Separator />
        
        {/* Parâmetros de Busca */}
        <SearchParameters 
          searchParameters={searchParameters}
          toggleSearchParameter={handleToggleSearchParameter}
        />
        
        {/* Slider de Experiência */}
        <ExperienceSlider 
          experienceWeight={experienceWeight}
          setExperienceWeight={onExperienceWeightChange}
          showExperienceSlider={searchParameters.experience}
        />

        <div className="pt-2">
          <Button 
            className="w-full" 
            onClick={() => {
              console.log("Botão de busca clicado, isSearching:", isSearching);
              onSearch();
            }} 
            disabled={isSearching || !selectedJob}
          >
            {isSearching ? (
              <>
                <Cpu className="mr-2 h-4 w-4 animate-spin" />
                Buscando Candidatos...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                Buscar Candidatos
              </>
            )}
          </Button>
            
          {!selectedJob && (
            <p className="text-xs text-muted-foreground text-center mt-2">
              Por favor, selecione uma vaga primeiro
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 