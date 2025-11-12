"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Interview, InterviewStatus } from "../_types"
import { InterviewCard } from "./interview-card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { statusStyles } from "../_data/mock-data"
import { cn } from "@/lib/utils"

interface InterviewListProps {
  interviews: Interview[]
  selectedInterviews: string[]
  favoriteInterviews: string[]
  highlightUpcoming: boolean
  toggleInterviewSelection: (id: string) => void
  toggleFavorite: (id: string) => void
  onSelectInterview: (id: string) => void
}

export function InterviewList({
  interviews,
  selectedInterviews,
  favoriteInterviews,
  highlightUpcoming,
  toggleInterviewSelection,
  toggleFavorite,
  onSelectInterview
}: InterviewListProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  
  const totalPages = Math.ceil(interviews.length / itemsPerPage)
  
  const paginatedInterviews = interviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="flex flex-col h-full">
      {/* Lista de entrevistas */}
      <div className="border rounded-md shadow-sm overflow-hidden">
        {/* Cabeçalho com contagem e paginação */}
        <div className="bg-muted/20 px-4 py-2 flex items-center justify-between border-b">
          <div className="text-sm font-medium">
            {interviews.length} entrevista{interviews.length !== 1 ? 's' : ''} encontrada{interviews.length !== 1 ? 's' : ''}
          </div>
          
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm px-2">
              Página {currentPage} de {totalPages || 1}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Lista de cards */}
        <ScrollArea className="max-h-[calc(100vh-300px)]">
          {paginatedInterviews.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-muted-foreground">
                Nenhuma entrevista encontrada com os filtros atuais.
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="mt-2"
              >
                Limpar filtros
              </Button>
            </div>
          ) : (
            <div>
              {paginatedInterviews.map((interview) => (
                <InterviewCard
                  key={interview.id}
                  interview={interview}
                  statusStyles={statusStyles}
                  isSelected={selectedInterviews.includes(interview.id)}
                  isFavorite={favoriteInterviews.includes(interview.id)}
                  toggleInterviewSelection={toggleInterviewSelection}
                  toggleFavorite={toggleFavorite}
                  onSelectInterview={onSelectInterview}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  )
} 