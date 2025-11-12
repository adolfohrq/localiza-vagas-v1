import { useState, useMemo } from "react";
import { Candidate, FilterState } from "../_types";

export function useCandidateFilters(candidates: Candidate[]) {
  // Estado para os filtros
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    status: [],
    skills: [],
    positions: [],
    matchScore: 0,
    appliedDate: "",
    source: "",
    viewed: null,
    favorite: null
  });

  // Estado para a visualização atual
  const [activeView, setActiveView] = useState<"list" | "kanban" | "analytics">("list");
  
  // Estado para ordenação
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Candidate | "";
    direction: "asc" | "desc";
  }>({
    key: "",
    direction: "asc"
  });

  // Função para atualizar filtros
  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Função para limpar todos os filtros
  const clearFilters = () => {
    setFilters({
      search: "",
      status: [],
      skills: [],
      positions: [],
      matchScore: 0,
      appliedDate: "",
      source: "",
      viewed: null,
      favorite: null
    });
  };

  // Função para ordenar candidatos
  const requestSort = (key: keyof Candidate) => {
    let direction: "asc" | "desc" = "asc";
    
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    
    setSortConfig({ key, direction });
  };

  // Candidatos filtrados e ordenados
  const filteredCandidates = useMemo(() => {
    // Primeiro aplicar filtros
    let result = candidates.filter(candidate => {
      // Filtro de busca
      if (filters.search && !candidate.name.toLowerCase().includes(filters.search.toLowerCase()) &&
          !candidate.position.toLowerCase().includes(filters.search.toLowerCase()) &&
          !candidate.email.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      // Filtro de status
      if (filters.status.length > 0 && !filters.status.includes(candidate.status)) {
        return false;
      }
      
      // Filtro de habilidades
      if (filters.skills.length > 0 && !filters.skills.some(skill => candidate.skills.includes(skill))) {
        return false;
      }
      
      // Filtro de posições
      if (filters.positions.length > 0 && !filters.positions.includes(candidate.position)) {
        return false;
      }
      
      // Filtro de pontuação de correspondência
      if (filters.matchScore > 0 && candidate.matchScore < filters.matchScore) {
        return false;
      }
      
      // Filtro de data de aplicação
      if (filters.appliedDate) {
        if (filters.appliedDate === "today" && !candidate.appliedDate.includes("hoje")) {
          return false;
        } else if (filters.appliedDate === "week" && 
                  !(candidate.appliedDate.includes("dia") || 
                    candidate.appliedDate.includes("hora") || 
                    candidate.appliedDate.includes("hoje") || 
                    candidate.appliedDate.includes("ontem"))) {
          return false;
        }
      }
      
      // Filtro de fonte
      if (filters.source && candidate.source !== filters.source) {
        return false;
      }
      
      // Filtro de visualizado
      if (filters.viewed !== null && candidate.viewed !== filters.viewed) {
        return false;
      }
      
      // Filtro de favorito
      if (filters.favorite !== null && candidate.favorite !== filters.favorite) {
        return false;
      }
      
      return true;
    });
    
    // Depois aplicar ordenação
    if (sortConfig.key !== "") {
      result.sort((a, b) => {
        const key = sortConfig.key as keyof Candidate;
        
        // Tratamento seguro para comparação
        const aValue = String(a[key] || "");
        const bValue = String(b[key] || "");
        
        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    
    return result;
  }, [candidates, filters, sortConfig]);

  return {
    filters,
    updateFilter,
    clearFilters,
    activeView,
    setActiveView,
    sortConfig,
    requestSort,
    filteredCandidates
  };
} 