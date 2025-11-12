"use client"

import { useState, useMemo } from "react"
import { Interview } from "../_types"
import { 
  format, parseISO, isSameDay, addDays, isWithinInterval, 
  startOfDay, endOfDay, compareAsc, isToday, isBefore
} from "date-fns"

// Interface do hook
export interface UseInterviewFiltersResult {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  typeFilter: string[];
  setTypeFilter: React.Dispatch<React.SetStateAction<string[]>>;
  priorityFilter: string[];
  setPriorityFilter: React.Dispatch<React.SetStateAction<string[]>>;
  dateRangeFilter: string;
  setDateRangeFilter: React.Dispatch<React.SetStateAction<string>>;
  jobFilter: string[];
  setJobFilter: React.Dispatch<React.SetStateAction<string[]>>;
  sortOption: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
  showFilters: boolean;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  filteredInterviews: Interview[];
  sortedInterviews: Interview[];
  resetFilters: () => void;
  uniqueJobs: { id: string; title: string }[];
}

export function useInterviewFilters(interviews: Interview[]): UseInterviewFiltersResult {
  // Estados para busca e filtragem
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<string[]>([]);
  const [dateRangeFilter, setDateRangeFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("dateAsc");
  const [showFilters, setShowFilters] = useState(false);

  // Obter lista de jobs únicos para filtros
  const uniqueJobs = useMemo(() => {
    const jobsMap = new Map();
    interviews.forEach(interview => {
      if (!jobsMap.has(interview.position)) {
        jobsMap.set(interview.position, {
          id: interview.position,
          title: interview.position
        });
      }
    });
    return Array.from(jobsMap.values());
  }, [interviews]);

  // Aplicar filtros
  const filteredInterviews = useMemo(() => {
    return interviews.filter(interview => {
      // Filtro de busca por texto
      const matchesSearch = searchTerm === "" || 
        interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        interview.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (interview.skills && interview.skills.some(skill => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        ));

      // Filtro por status da entrevista (aba)
      const matchesStatus = activeTab === "all" || activeTab === interview.status;

      // Filtro por data específica
      const matchesDate = !selectedDate || isSameDay(parseISO(interview.date), parseISO(selectedDate));

      // Filtro por tipo de entrevista
      const matchesType = typeFilter.length === 0 || 
        (interview.type && typeFilter.includes(interview.type));

      // Filtro por prioridade
      const matchesPriority = priorityFilter.length === 0 || 
        (interview.priority && priorityFilter.includes(interview.priority));

      // Filtro por intervalo de data
      let matchesDateRange = true;
      const today = new Date();
      const interviewDate = parseISO(interview.date);

      if (dateRangeFilter === "today") {
        matchesDateRange = isToday(interviewDate);
      } else if (dateRangeFilter === "thisWeek") {
        const endOfWeek = addDays(today, 7);
        matchesDateRange = isWithinInterval(interviewDate, {
          start: startOfDay(today),
          end: endOfDay(endOfWeek)
        });
      } else if (dateRangeFilter === "nextMonth") {
        const endOfMonth = addDays(today, 30);
        matchesDateRange = isWithinInterval(interviewDate, {
          start: startOfDay(today),
          end: endOfDay(endOfMonth)
        });
      } else if (dateRangeFilter === "past") {
        matchesDateRange = isBefore(interviewDate, startOfDay(today));
      }

      // Filtro por cargo/job
      const matchesJob = jobFilter.length === 0 || 
        jobFilter.includes(interview.position);

      return matchesSearch && matchesStatus && matchesDate && 
             matchesType && matchesPriority && matchesDateRange && matchesJob;
    });
  }, [
    interviews, 
    searchTerm, 
    activeTab, 
    selectedDate, 
    typeFilter,
    priorityFilter, 
    dateRangeFilter, 
    jobFilter
  ]);

  // Ordenar entrevistas
  const sortedInterviews = useMemo(() => {
    return [...filteredInterviews].sort((a, b) => {
      if (sortOption === "dateAsc") {
        return compareAsc(parseISO(a.date), parseISO(b.date));
      } else if (sortOption === "dateDesc") {
        return compareAsc(parseISO(b.date), parseISO(a.date));
      } else if (sortOption === "priority") {
        const priorityOrder: Record<string, number> = { 
          high: 1, 
          medium: 2, 
          low: 3 
        };
        return (priorityOrder[a.priority || "low"] || 99) - 
              (priorityOrder[b.priority || "low"] || 99);
      } else if (sortOption === "name") {
        return a.candidateName.localeCompare(b.candidateName);
      }
      return 0;
    });
  }, [filteredInterviews, sortOption]);

  // Função para resetar todos os filtros
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedDate(null);
    setActiveTab("all");
    setTypeFilter([]);
    setPriorityFilter([]);
    setDateRangeFilter("all");
    setJobFilter([]);
    setSortOption("dateAsc");
  };

  return {
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    typeFilter,
    setTypeFilter,
    priorityFilter,
    setPriorityFilter,
    dateRangeFilter,
    setDateRangeFilter,
    jobFilter,
    setJobFilter,
    sortOption,
    setSortOption,
    showFilters,
    setShowFilters,
    filteredInterviews,
    sortedInterviews,
    resetFilters,
    uniqueJobs
  };
} 