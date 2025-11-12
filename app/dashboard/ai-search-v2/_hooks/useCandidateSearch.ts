"use client"

import { useState } from "react"
import { Candidate, mockCandidates } from "../_data/candidates"
import { Job } from "../_data/jobs"

export interface SearchParameters {
  skills: boolean
  education: boolean
  location: boolean
  experience: boolean
}

export function useCandidateSearch() {
  // Estados para controle da busca
  const [searchParameters, setSearchParameters] = useState<SearchParameters>({
    skills: true,
    education: true,
    location: true,
    experience: true
  })
  
  const [experienceWeight, setExperienceWeight] = useState([5])
  const [searchResults, setSearchResults] = useState<Candidate[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  // Toggle para os parâmetros de busca
  const toggleSearchParameter = (param: keyof SearchParameters) => {
    setSearchParameters(prev => ({
      ...prev,
      [param]: !prev[param]
    }))
  }

  // Função para realizar a busca de candidatos - agora recebe selectedJobData como parâmetro
  const handleSearch = (selectedJobData: Job | null) => {
    console.log("handleSearch chamado com:", selectedJobData?.title);
    
    if (!selectedJobData) {
      console.log("Nenhuma vaga selecionada, encerrando busca");
      return;
    }

    setIsSearching(true);
    setHasSearched(false);
    console.log("Iniciando busca de candidatos...");

    // Simulação de uma chamada de API
    setTimeout(() => {
      // Ordenar candidatos pelo score de match baseado nos parâmetros selecionados
      const filteredCandidates = [...mockCandidates].sort((a, b) => {
        let aScore = 0;
        let bScore = 0;
        
        if (searchParameters.skills) {
          aScore += a.matchDetails.skills;
          bScore += b.matchDetails.skills;
        }
        
        if (searchParameters.education) {
          aScore += a.matchDetails.education;
          bScore += b.matchDetails.education;
        }
        
        if (searchParameters.location) {
          aScore += a.matchDetails.location;
          bScore += b.matchDetails.location;
        }
        
        if (searchParameters.experience) {
          aScore += a.matchDetails.experience * (experienceWeight[0] / 5);
          bScore += b.matchDetails.experience * (experienceWeight[0] / 5);
        }
        
        return bScore - aScore;
      });

      console.log("Busca concluída, encontrados:", filteredCandidates.length, "candidatos");
      setSearchResults(filteredCandidates);
      setIsSearching(false);
      setHasSearched(true);
    }, 2000);
  };

  return {
    searchParameters,
    setSearchParameters,
    toggleSearchParameter,
    experienceWeight,
    setExperienceWeight,
    searchResults,
    isSearching,
    hasSearched,
    handleSearch
  }
} 