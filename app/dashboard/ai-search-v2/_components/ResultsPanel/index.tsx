"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BadgeCheck, Search } from "lucide-react"
import { Candidate } from "../../_data/candidates"
import { CandidateCard } from "./CandidateCard"
import { SearchingState } from "./SearchingState"
import { EmptyState } from "./EmptyState"
import { InitialState } from "./InitialState"

interface ResultsPanelProps {
  searchResults: Candidate[]
  isSearching: boolean
  hasSearched: boolean
  onViewDetails: (candidate: Candidate) => void
}

export function ResultsPanel({ 
  searchResults, 
  isSearching, 
  hasSearched,
  onViewDetails
}: ResultsPanelProps) {
  return (
    <Card className="md:col-span-3 lg:col-span-5">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-2">
          <Search className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <CardTitle>Candidatos Compatíveis</CardTitle>
            <CardDescription>
              {searchResults.length > 0 
                ? `${searchResults.length} candidatos encontrados por IA para esta vaga` 
                : "Candidatos serão exibidos após a busca"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isSearching ? (
          <SearchingState />
        ) : searchResults.length > 0 ? (
          <div className="space-y-6">
            {searchResults.map((candidate) => (
              <CandidateCard 
                key={candidate.id} 
                candidate={candidate}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : hasSearched ? (
          <EmptyState />
        ) : (
          <InitialState />
        )}
      </CardContent>
      {searchResults.length > 0 && (
        <CardFooter className="border-t pt-4 flex justify-between">
          <p className="text-sm text-muted-foreground flex items-center">
            <BadgeCheck className="h-4 w-4 text-green-500 mr-1.5" />
            Candidatos classificados por compatibilidade
          </p>
          <Button variant="outline" size="sm">
            Exportar Resultados
          </Button>
        </CardFooter>
      )}
    </Card>
  )
} 