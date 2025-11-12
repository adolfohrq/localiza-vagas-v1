"use client"

import { useState } from 'react'
import { InterviewHeader } from './interview-header'
import { InterviewStatsCards } from './interview-stats-cards'
import { InterviewAlerts } from './interview-alerts'
import { InterviewDetails } from './interview-details'
import { InterviewDashboard } from './interview-dashboard'
import { useInterviews } from '../_hooks/use-interviews'
import { useInterviewFilters } from '../_hooks/use-interview-filters'
import { useInterviewStats } from '../_hooks/use-interview-stats'
import { initialInterviews } from '../_data/mock-data'
import { InterviewStatus } from '../_types'

export function InterviewPage() {
  // Gerenciamento de estado de entrevistas
  const {
    interviews,
    selectedCandidateId, 
    setSelectedCandidateId,
    favoriteInterviews,
    selectedInterviews,
    setSelectedInterviews,
    handleStatusChange,
    toggleFavorite,
    toggleInterviewSelection,
    upcomingInterviews,
    showBatchActions,
    setShowBatchActions
  } = useInterviews(initialInterviews)

  // Gerenciamento de filtros
  const {
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
    resetFilters,
    filteredInterviews,
    sortedInterviews,
    uniqueJobs
  } = useInterviewFilters(interviews)

  // Estatísticas de entrevistas
  const stats = useInterviewStats(interviews, favoriteInterviews, uniqueJobs)

  // Estados de visualização UI
  const [viewMode, setViewMode] = useState<'list' | 'calendar' | 'analytics'>('list')
  const [highlightUpcoming, setHighlightUpcoming] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [showBanner, setShowBanner] = useState(true)

  // Detectar entrevista selecionada
  const selectedInterview = selectedCandidateId
    ? interviews.find(interview => interview.id === selectedCandidateId)
    : null

  // Objeto para dados de filtros
  const filtersData = {
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
    resetFilters,
    uniqueJobs,
    stats
  }

  return (
    <div className="space-y-6 p-6 pb-16 w-full">
      {/* Cabeçalho */}
      <InterviewHeader stats={stats} />

      {/* Cards de estatísticas */}
      <InterviewStatsCards stats={stats} />

      {/* Alertas e notificações */}
      <InterviewAlerts 
        stats={stats}
        notificationsEnabled={notificationsEnabled}
        showBanner={showBanner}
        setShowBanner={setShowBanner}
        upcomingInterviews={upcomingInterviews}
        setSelectedCandidateId={setSelectedCandidateId}
      />
      
      {/* Dashboard de entrevistas - componente unificado */}
      <div className="flex gap-6">
        <div className="w-full transition-all duration-300">
          <InterviewDashboard
            interviews={sortedInterviews}
            selectedInterviews={selectedInterviews}
            favoriteInterviews={favoriteInterviews}
            highlightUpcoming={highlightUpcoming}
            setHighlightUpcoming={setHighlightUpcoming}
            filtersData={filtersData}
            viewMode={viewMode}
            setViewMode={setViewMode}
            toggleInterviewSelection={toggleInterviewSelection}
            toggleFavorite={toggleFavorite}
            onSelectInterview={setSelectedCandidateId}
            handleStatusChange={handleStatusChange}
          />
        </div>
        
        {/* Detalhes da entrevista como modal */}
        <InterviewDetails 
          interview={selectedInterview}
          open={!!selectedCandidateId && !!selectedInterview}
          onClose={() => setSelectedCandidateId(null)}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  )
} 