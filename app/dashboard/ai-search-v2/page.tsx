"use client"

import { useState, useCallback } from "react"
import { SearchPanel } from "./_components/SearchPanel"
import { ResultsPanel } from "./_components/ResultsPanel"
import { CandidateDialog } from "./_components/CandidateDialog"
import { useJobSelection } from "./_hooks/useJobSelection"
import { useCandidateSearch } from "./_hooks/useCandidateSearch"
import { Candidate } from "./_data/candidates"
import { Job } from "./_data/jobs"
import { Brain, FileSearch, Download, Share2, HelpCircle } from "lucide-react"

// Importando o componente PageHeader e o tipo PageHeaderAction
import { PageHeader, PageHeaderAction } from "@/components/ui/page-header"

export default function AISearchV2Page() {
  // Estado para o diálogo de detalhes do candidato
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  
  // Hooks para gerenciar a seleção de vagas e busca de candidatos
  const { 
    selectedJob, 
    setSelectedJob, 
    selectedJobData,
    availableJobs 
  } = useJobSelection()
  
  const { 
    searchParameters, 
    setSearchParameters, 
    toggleSearchParameter,
    experienceWeight, 
    setExperienceWeight, 
    searchResults, 
    isSearching, 
    hasSearched,
    handleSearch 
  } = useCandidateSearch()
  
  // Função de wrapper para handleSearch que passa o selectedJobData atual
  const initiateSearch = useCallback(() => {
    console.log("Iniciando busca com vaga selecionada:", selectedJobData?.title);
    handleSearch(selectedJobData);
  }, [selectedJobData, handleSearch]);

  // Função para abrir o diálogo de detalhes do candidato
  const handleViewCandidateDetails = (candidate: Candidate) => {
    setSelectedCandidate(candidate)
  }

  // Função para fechar o diálogo de detalhes do candidato
  const handleCloseDialog = () => {
    setSelectedCandidate(null)
  }

  // Definindo as ações do dropdown como um array de PageHeaderAction
  const dropdownActions: PageHeaderAction[] = [
    {
      label: "Exportar resultados",
      icon: Download,
      onClick: () => console.log("Exportar resultados")
    },
    {
      label: "Compartilhar busca",
      icon: Share2,
      onClick: () => console.log("Compartilhar busca")
    },
    {
      label: "Histórico de buscas",
      icon: FileSearch,
      onClick: () => console.log("Histórico de buscas")
    }
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Substituindo o cabeçalho antigo pelo PageHeader */}
      <PageHeader 
        title="Busca Avançada com IA"
        description="Encontre os candidatos mais compatíveis para suas vagas usando nossa tecnologia de matching inteligente"
        icon={Brain}
        dropdownActions={dropdownActions}
        showHelpButton={true}
        onHelpClick={() => console.log("Ajuda sobre a busca com IA")}
      />

      <div className="flex flex-col md:flex-row gap-6">
        {/* Painel de busca */}
        <div className="w-full md:w-1/3">
          <SearchPanel 
            selectedJob={selectedJob}
            availableJobs={availableJobs}
            onJobSelect={setSelectedJob}
            searchParameters={searchParameters}
            onSearchParametersChange={setSearchParameters}
            toggleSearchParameter={toggleSearchParameter}
            experienceWeight={experienceWeight}
            onExperienceWeightChange={setExperienceWeight}
            isSearching={isSearching}
            onSearch={initiateSearch}
          />
        </div>
        
        {/* Painel de resultados */}
        <div className="w-full md:w-2/3">
          <ResultsPanel 
            searchResults={searchResults}
            isSearching={isSearching}
            hasSearched={hasSearched}
            onViewDetails={handleViewCandidateDetails}
          />
        </div>
      </div>

      {/* Diálogo de detalhes do candidato */}
      <CandidateDialog 
        isOpen={!!selectedCandidate}
        onClose={handleCloseDialog}
        candidate={selectedCandidate}
        job={selectedJobData}
      />
    </div>
  )
}


