'use client';

import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, X, Calendar, Tag, User, Filter, ArrowUpDown } from "lucide-react";
import { useTasks } from "@/app/contexts/tasks/tasksContext";
import { StatusFilter } from "./StatusFilter";
import { PriorityFilter } from "./PriorityFilter";
import { AssigneeFilter } from "./AssigneeFilter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

/**
 * Componente que agrupa todos os filtros para as tarefas
 * Redesenhado para um formato mais compacto e integrado
 */
export function TaskFilters() {
  const { 
    searchTerm, 
    setSearchTerm,
    filterStatus,
    filterPriority,
    filterAssignee,
    setFilterStatus,
    setFilterPriority,
    setFilterAssignee
  } = useTasks();
  
  // Estado local para filtros adicionais
  const [showDueTodayOnly, setShowDueTodayOnly] = useState(false);
  const [showWithTags, setShowWithTags] = useState(false);
  
  // Verificar se há filtros ativos
  const hasActiveFilters = 
    filterStatus !== "all" || 
    filterPriority !== "all" || 
    filterAssignee !== "all" ||
    showDueTodayOnly ||
    showWithTags;
  
  // Limpar todos os filtros
  const clearAllFilters = () => {
    setFilterStatus("all");
    setFilterPriority("all");
    setFilterAssignee("all");
    setSearchTerm("");
    setShowDueTodayOnly(false);
    setShowWithTags(false);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        {/* Campo de busca aprimorado */}
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary">
            <Search className="h-4 w-4" />
          </div>
          <Input
            type="search"
            placeholder="Buscar tarefas por título, descrição ou tags..."
            className="pl-9 pr-9 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-sm hover:border-primary/50 focus-visible:ring-1 focus-visible:ring-primary transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center transition-colors"
              onClick={() => setSearchTerm("")}
              aria-label="Limpar busca"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
        
        {/* Filtros rápidos em linha com melhor visual */}
        <div className="flex flex-wrap gap-2 items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <StatusFilter />
                </div>
              </TooltipTrigger>
              <TooltipContent>Filtrar por status</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <PriorityFilter />
                </div>
              </TooltipTrigger>
              <TooltipContent>Filtrar por prioridade</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <AssigneeFilter />
                </div>
              </TooltipTrigger>
              <TooltipContent>Filtrar por responsável</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {/* Botão de filtros avançados com visual melhorado */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700">
                <Filter className="h-4 w-4 mr-1 text-primary" />
                <span className="hidden sm:inline">Mais filtros</span>
                <span className="sm:hidden">Filtros</span>
                {hasActiveFilters && (
                  <Badge variant="outline" className="ml-1 bg-primary/10 text-primary border-primary/20 h-5 px-1">
                    {Object.values([filterStatus, filterPriority, filterAssignee, showDueTodayOnly, showWithTags]).filter(Boolean).length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filtros avançados</SheetTitle>
                <SheetDescription>
                  Refine sua busca com filtros adicionais
                </SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-6">
                {/* Filtro por data */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>Data</span>
                  </h3>
                  <div className="flex items-start gap-2">
                    <Checkbox 
                      id="due-today-modal" 
                      checked={showDueTodayOnly}
                      onCheckedChange={(checked) => setShowDueTodayOnly(checked as boolean)}
                    />
                    <div className="grid gap-1.5">
                      <Label 
                        htmlFor="due-today-modal" 
                        className="text-sm font-medium"
                      >
                        Mostrar apenas tarefas para hoje
                      </Label>
                    </div>
                  </div>
                </div>
                
                {/* Filtro por tags */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <Tag className="h-4 w-4 text-primary" />
                    <span>Tags</span>
                  </h3>
                  <div className="flex items-start gap-2">
                    <Checkbox 
                      id="with-tags-modal" 
                      checked={showWithTags}
                      onCheckedChange={(checked) => setShowWithTags(checked as boolean)}
                    />
                    <div className="grid gap-1.5">
                      <Label 
                        htmlFor="with-tags-modal" 
                        className="text-sm font-medium"
                      >
                        Mostrar apenas tarefas com tags
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
              
              <SheetFooter className="mt-4">
                {hasActiveFilters ? (
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-200 dark:border-gray-700"
                    onClick={clearAllFilters}
                  >
                    Limpar todos os filtros
                  </Button>
                ) : (
                  <p className="text-xs text-center text-muted-foreground w-full">
                    Selecione os filtros desejados para refinar sua busca
                  </p>
                )}
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Indicador de filtros ativos */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 mt-3">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-2 py-1">
            <Filter className="h-3 w-3 mr-1" />
            Filtros ativos
          </Badge>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 text-xs text-muted-foreground hover:text-foreground"
            onClick={clearAllFilters}
          >
            Limpar filtros
          </Button>
        </div>
      )}
    </div>
  );
} 