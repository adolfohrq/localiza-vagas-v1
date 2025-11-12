"use client"

import { useState } from "react"
import { Candidate, mockCandidates } from "../_data/candidates"
import { Job } from "../_data/jobs"

interface SearchParameters {
  skills: boolean;
  education: boolean;
  location: boolean;
  experience: boolean;
}

export function useSearch() {
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
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)

  // Toggle para os parâmetros de busca
  const toggleSearchParameter = (param: keyof SearchParameters) => {
    setSearchParameters(prev => ({
      ...prev,
      [param]: !prev[param]
    }))
  }

  // Função para realizar a busca de candidatos
  const handleSearch = (selectedJobData: Job | null) => {
    if (!selectedJobData) {
      return
    }

    setIsSearching(true)
    setHasSearched(false)

    // Simulação de uma chamada de API
    setTimeout(() => {
      // Ordenar candidatos pelo score de match baseado nos parâmetros selecionados
      const filteredCandidates = [...mockCandidates].sort((a, b) => {
        let aScore = 0
        let bScore = 0
        
        if (searchParameters.skills) {
          aScore += a.matchDetails.skills
          bScore += b.matchDetails.skills
        }
        
        if (searchParameters.education) {
          aScore += a.matchDetails.education
          bScore += b.matchDetails.education
        }
        
        if (searchParameters.location) {
          aScore += a.matchDetails.location
          bScore += b.matchDetails.location
        }
        
        if (searchParameters.experience) {
          aScore += a.matchDetails.experience * (experienceWeight[0] / 5)
          bScore += b.matchDetails.experience * (experienceWeight[0] / 5)
        }
        
        return bScore - aScore
      })

      setSearchResults(filteredCandidates)
      setIsSearching(false)
      setHasSearched(true)
    }, 2000)
  }

  return {
    searchParameters,
    experienceWeight,
    setExperienceWeight,
    searchResults,
    isSearching,
    hasSearched,
    selectedCandidate,
    setSelectedCandidate,
    toggleSearchParameter,
    handleSearch
  }
} 