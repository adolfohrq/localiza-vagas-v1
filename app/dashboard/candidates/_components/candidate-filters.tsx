"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  X, 
  Check, 
  Star, 
  Eye, 
  CalendarDays 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCandidates } from "../_hooks/use-candidates";
import { useCandidateFilters } from "../_hooks/use-candidate-filters";
import { statusStyles } from "../_data/constants";

export function CandidateFilters() {
  const { allSkills, allPositions } = useCandidates();
  
  const { 
    filters, 
    updateFilter, 
    clearFilters,
    activeView,
    setActiveView
  } = useCandidateFilters([]);
  
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Contagem de filtros ativos
  const activeFiltersCount = [
    filters.status.length > 0,
    filters.skills.length > 0,
    filters.positions.length > 0,
    filters.matchScore > 0,
    filters.appliedDate !== "",
    filters.source !== "",
    filters.viewed !== null,
    filters.favorite !== null
  ].filter(Boolean).length;
  
  return (
    <div className="flex flex-col space-y-4">
      {/* Barra de pesquisa e filtros */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar candidatos..."
            className="pl-9"
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
          />
          {filters.search && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => updateFilter('search', '')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="relative">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
              {activeFiltersCount > 0 && (
                <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[320px] p-4" align="start">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Filtros</h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2 text-muted-foreground"
                  onClick={clearFilters}
                >
                  Limpar filtros
                </Button>
              </div>
              
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Status</h5>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(statusStyles).map(([key, { label }]) => (
                    <Badge
                      key={key}
                      variant={filters.status.includes(key) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => {
                        if (filters.status.includes(key)) {
                          updateFilter('status', filters.status.filter(s => s !== key));
                        } else {
                          updateFilter('status', [...filters.status, key]);
                        }
                      }}
                    >
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Habilidades</h5>
                <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                  {allSkills.map(skill => (
                    <Badge
                      key={skill}
                      variant={filters.skills.includes(skill) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => {
                        if (filters.skills.includes(skill)) {
                          updateFilter('skills', filters.skills.filter(s => s !== skill));
                        } else {
                          updateFilter('skills', [...filters.skills, skill]);
                        }
                      }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Pontuação de Match</h5>
                <div className="px-2">
                  <Slider
                    value={[filters.matchScore]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={(value) => updateFilter('matchScore', value[0])}
                  />
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>{filters.matchScore}%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Data de aplicação</h5>
                <div className="flex gap-2">
                  <Button
                    variant={filters.appliedDate === "today" ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                    onClick={() => updateFilter('appliedDate', filters.appliedDate === "today" ? "" : "today")}
                  >
                    Hoje
                  </Button>
                  <Button
                    variant={filters.appliedDate === "week" ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                    onClick={() => updateFilter('appliedDate', filters.appliedDate === "week" ? "" : "week")}
                  >
                    Esta semana
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Outros filtros</h5>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="viewed" 
                      checked={filters.viewed === true}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFilter('viewed', true);
                        } else {
                          updateFilter('viewed', null);
                        }
                      }}
                    />
                    <label htmlFor="viewed" className="text-sm cursor-pointer">Apenas visualizados</label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="not-viewed" 
                      checked={filters.viewed === false}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFilter('viewed', false);
                        } else {
                          updateFilter('viewed', null);
                        }
                      }}
                    />
                    <label htmlFor="not-viewed" className="text-sm cursor-pointer">Apenas não visualizados</label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="favorite" 
                      checked={filters.favorite === true}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFilter('favorite', true);
                        } else {
                          updateFilter('favorite', null);
                        }
                      }}
                    />
                    <label htmlFor="favorite" className="text-sm cursor-pointer">Apenas favoritos</label>
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full" 
                onClick={() => setFiltersOpen(false)}
              >
                Aplicar filtros
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Opções
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Visualização</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={activeView === "list"}
              onCheckedChange={() => setActiveView("list")}
            >
              Lista
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activeView === "kanban"}
              onCheckedChange={() => setActiveView("kanban")}
            >
              Kanban
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activeView === "analytics"}
              onCheckedChange={() => setActiveView("analytics")}
            >
              Análise
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
              <DropdownMenuItem>
                <CalendarDays className="mr-2 h-4 w-4" />
                Data de aplicação
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Star className="mr-2 h-4 w-4" />
                Pontuação de match
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                Visualizados primeiro
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Chips de filtros ativos */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.status.length > 0 && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Status: {filters.status.length} selecionado(s)
              <button
                onClick={() => updateFilter('status', [])}
                className="ml-1 h-3.5 w-3.5 rounded-full hover:bg-muted-foreground/20"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {filters.skills.length > 0 && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Habilidades: {filters.skills.length} selecionada(s)
              <button
                onClick={() => updateFilter('skills', [])}
                className="ml-1 h-3.5 w-3.5 rounded-full hover:bg-muted-foreground/20"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {filters.matchScore > 0 && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Match: &gt;= {filters.matchScore}%
              <button
                onClick={() => updateFilter('matchScore', 0)}
                className="ml-1 h-3.5 w-3.5 rounded-full hover:bg-muted-foreground/20"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {filters.appliedDate && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Aplicação: {filters.appliedDate === "today" ? "Hoje" : "Esta semana"}
              <button
                onClick={() => updateFilter('appliedDate', "")}
                className="ml-1 h-3.5 w-3.5 rounded-full hover:bg-muted-foreground/20"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {filters.viewed !== null && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {filters.viewed ? "Visualizados" : "Não visualizados"}
              <button
                onClick={() => updateFilter('viewed', null)}
                className="ml-1 h-3.5 w-3.5 rounded-full hover:bg-muted-foreground/20"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {filters.favorite !== null && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Favoritos
              <button
                onClick={() => updateFilter('favorite', null)}
                className="ml-1 h-3.5 w-3.5 rounded-full hover:bg-muted-foreground/20"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={clearFilters}
          >
            Limpar todos
          </Button>
        </div>
      )}
    </div>
  );
} 