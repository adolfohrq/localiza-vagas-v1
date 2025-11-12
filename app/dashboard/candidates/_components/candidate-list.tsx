"use client"

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  MoreHorizontal, 
  ArrowUpDown, 
  Download, 
  Trash2, 
  Archive, 
  Mail, 
  MessageSquare,
  UserPlus
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { CandidateCard } from "./candidate-card";
import { useCandidates } from "../_hooks/use-candidates";
import { useCandidateFilters } from "../_hooks/use-candidate-filters";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CandidateList() {
  const {
    candidates,
    selectedCandidates,
    toggleCandidateSelection,
    toggleAllCandidates,
    setSelectedCandidate
  } = useCandidates();

  const {
    filteredCandidates,
    sortConfig,
    requestSort
  } = useCandidateFilters(candidates);

  return (
    <div className="space-y-4">
      {/* Cabeçalho da tabela com ações em lote */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox 
            checked={selectedCandidates.length > 0 && selectedCandidates.length === candidates.length} 
            onCheckedChange={toggleAllCandidates}
          />
          
          {selectedCandidates.length > 0 ? (
            <>
              <span className="text-sm text-muted-foreground">
                {selectedCandidates.length} selecionado(s)
              </span>
              
              <div className="flex items-center space-x-1 ml-4">
                <Button variant="ghost" size="sm" className="h-8">
                  <Mail className="h-4 w-4 mr-1" />
                  Email
                </Button>
                <Button variant="ghost" size="sm" className="h-8">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Mensagem
                </Button>
                <Button variant="ghost" size="sm" className="h-8">
                  <Archive className="h-4 w-4 mr-1" />
                  Arquivar
                </Button>
                <Button variant="ghost" size="sm" className="h-8 text-red-600">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Excluir
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-1">
              <Button variant="outline" size="sm" className="h-8">
                <Download className="h-4 w-4 mr-1" />
                Exportar
              </Button>
              <Button variant="outline" size="sm" className="h-8">
                <UserPlus className="h-4 w-4 mr-1" />
                Adicionar
              </Button>
            </div>
          )}
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Marcar todos como vistos</DropdownMenuItem>
            <DropdownMenuItem>Exportar selecionados</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Configurações</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Cabeçalho das colunas */}
      <div className="flex items-center p-2 text-xs font-medium text-muted-foreground">
        <div className="w-8">
          <Checkbox 
            checked={selectedCandidates.length > 0 && selectedCandidates.length === candidates.length} 
            onCheckedChange={toggleAllCandidates}
          />
        </div>
        
        <div className="flex-1 flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="px-1 font-medium"
            onClick={() => requestSort('name')}
          >
            Candidato
            <ArrowUpDown className="ml-1 h-3 w-3" />
          </Button>
        </div>
        
        <div className="hidden md:flex items-center space-x-4 mx-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="px-1 font-medium w-24"
            onClick={() => requestSort('matchScore')}
          >
            Match
            <ArrowUpDown className="ml-1 h-3 w-3" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="px-1 font-medium w-40"
          >
            Habilidades
          </Button>
        </div>
        
        <div className="hidden lg:flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="px-1 font-medium w-32"
            onClick={() => requestSort('email')}
          >
            Contato
            <ArrowUpDown className="ml-1 h-3 w-3" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="px-1 font-medium w-24"
            onClick={() => requestSort('appliedDate')}
          >
            Aplicação
            <ArrowUpDown className="ml-1 h-3 w-3" />
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="px-1 font-medium ml-auto"
          onClick={() => requestSort('status')}
        >
          Status
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
        
        <div className="w-20"></div>
      </div>
      
      {/* Lista de candidatos */}
      <ScrollArea className="h-[calc(100vh-280px)]">
        <div className="space-y-1">
          {filteredCandidates.map((candidate, index) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              isSelected={selectedCandidates.includes(index)}
              onSelect={() => toggleCandidateSelection(index)}
              onClick={() => setSelectedCandidate(candidate)}
              showCheckbox
            />
          ))}
          
          {filteredCandidates.length === 0 && (
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              Nenhum candidato encontrado.
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
} 