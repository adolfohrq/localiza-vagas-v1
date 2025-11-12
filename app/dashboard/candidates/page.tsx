"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

// Importando os componentes refatorados
import { CandidateHeader } from "./_components/candidate-header"
import { CandidateStatsCards } from "./_components/candidate-stats-cards"
import { CandidateFilters } from "./_components/candidate-filters"
import { CandidateList } from "./_components/candidate-list"
import { CandidateKanban } from "./_components/candidate-kanban"
import { CandidateAnalytics } from "./_components/candidate-analytics"

// Importando hooks
import { useCandidates } from "./_hooks/use-candidates"
import { useCandidateFilters } from "./_hooks/use-candidate-filters"

export default function CandidatesPage() {
  // Obtendo dados e estados dos hooks
  const { candidates, selectedCandidate } = useCandidates()
  const { 
    filters, 
    updateFilter,
    activeView, 
    setActiveView
  } = useCandidateFilters(candidates)
  
  // Estado local para a aba ativa
  const [activeTab, setActiveTab] = useState("all")

  return (
    <DashboardShell>
      {/* Cabeçalho da página */}
      <CandidateHeader />
      
      {/* Cards de estatísticas */}
      <CandidateStatsCards />
      
      {/* Sistema principal de navegação e conteúdo */}
      <Card className="p-0 shadow-md border">
        <CardContent className="p-0">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Filtros e controles */}
            <CandidateFilters />
            
            {/* Seletores de visualização */}
            <div className="flex items-center justify-between px-4 pb-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Visualização:</span>
                <div className="border rounded-md overflow-hidden flex">
                  <button 
                    className={`flex items-center gap-1 rounded-none h-8 px-3 ${activeView === "list" ? "bg-primary text-primary-foreground" : "bg-background"}`}
                    onClick={() => setActiveView("list")}
                  >
                    Lista
                  </button>
                  <button 
                    className={`flex items-center gap-1 rounded-none h-8 px-3 ${activeView === "kanban" ? "bg-primary text-primary-foreground" : "bg-background"}`}
                    onClick={() => setActiveView("kanban")}
                  >
                    Kanban
                  </button>
                  <button 
                    className={`flex items-center gap-1 rounded-none h-8 px-3 ${activeView === "analytics" ? "bg-primary text-primary-foreground" : "bg-background"}`}
                    onClick={() => setActiveView("analytics")}
                  >
                    Análise
                  </button>
                </div>
              </div>
            </div>

            {/* Conteúdo baseado na visualização selecionada */}
            {activeView === "list" && (
              <div className="p-4">
                <CandidateList />
              </div>
            )}
            
            {activeView === "kanban" && (
              <div className="p-4">
                <CandidateKanban />
              </div>
            )}
            
            {activeView === "analytics" && (
              <div className="p-4">
                <CandidateAnalytics />
              </div>
            )}
        </Tabs>
        </CardContent>
      </Card>

      {/* Modal de perfil do candidato renderizado condicionalmente */}
      {selectedCandidate && (
        <div className="candidate-profile-modal">
          {/* O conteúdo do modal seria renderizado aqui */}
      </div>
      )}
    </DashboardShell>
  )
}

