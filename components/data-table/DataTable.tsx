"use client"

import React, { useState, useMemo } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, XCircle, Filter, MoreHorizontal } from 'lucide-react'
import { cn } from "@/lib/utils"

// Tipos básicos
export interface Column<T = any> {
  key: string
  header: string
  cell: (item: T, index: number) => React.ReactNode
  width?: number // Alterado para número de colunas do grid
  sortable?: boolean
  searchable?: boolean
}

export interface DataTableProps<T = any> {
  // Dados e colunas
  data: T[]
  columns: Column<T>[]
  keyExtractor: (item: T) => string
  
  // Opções de visualização
  showToolbar?: boolean
  showSearch?: boolean
  showFilters?: boolean
  searchPlaceholder?: string
  
  // Ordenação e filtros
  sortOptions?: {
    id: string
    label: string
    compareFn: (a: T, b: T) => number
  }[]
  filterOptions?: {
    id: string
    label: string
    options: {
      value: string
      label: string
    }[]
    filterFn: (item: T, value: string) => boolean
  }[]
  
  // Ações de seleção
  initialSelected?: string[]
  onSelectionChange?: (selectedKeys: string[]) => void
  
  // Interatividade
  onRowClick?: (item: T) => void
  
  // Renderização condicional
  emptyStateComponent?: React.ReactNode
  emptyStateIcon?: React.ReactNode
  emptyStateTitle?: string
  emptyStateDescription?: string
  
  // Classes
  className?: string
  rowClassName?: (item: T, isSelected: boolean) => string
}

export function DataTable<T = any>({
  // Dados e colunas
  data,
  columns,
  keyExtractor,
  
  // Opções de visualização
  showToolbar = true,
  showSearch = true,
  showFilters = true,
  searchPlaceholder = "Buscar...",
  
  // Ordenação e filtros
  sortOptions = [],
  filterOptions = [],
  
  // Ações de seleção
  initialSelected = [],
  onSelectionChange,
  
  // Interatividade
  onRowClick,
  
  // Renderização condicional
  emptyStateComponent,
  emptyStateIcon,
  emptyStateTitle = "Nenhum registro encontrado",
  emptyStateDescription = "Tente ajustar seus filtros para encontrar o que procura.",
  
  // Classes
  className,
  rowClassName
}: DataTableProps<T>) {
  // Estados
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState<Record<string, string>>({})
  const [sortBy, setSortBy] = useState(sortOptions.length > 0 ? sortOptions[0].id : "")
  const [selectedKeys, setSelectedKeys] = useState<string[]>(initialSelected)
  
  // Aplicar filtragem e ordenação
  const processedData = useMemo(() => {
    // Filtragem por busca
    let result = data;
    
    if (searchTerm) {
      const searchableColumns = columns.filter(col => col.searchable)
      if (searchableColumns.length > 0) {
        const lowerSearchTerm = searchTerm.toLowerCase()
        result = result.filter(item => {
          return searchableColumns.some(col => {
            const cellValue = String(item[col.key as keyof T] || '').toLowerCase()
            return cellValue.includes(lowerSearchTerm)
          })
        })
      }
    }
    
    // Aplicar filtros
    Object.entries(selectedFilter).forEach(([filterId, value]) => {
      if (value && value !== 'all') {
        const filter = filterOptions.find(f => f.id === filterId)
        if (filter) {
          result = result.filter(item => filter.filterFn(item, value))
        }
      }
    })
    
    // Ordenação
    if (sortBy) {
      const sorter = sortOptions.find(s => s.id === sortBy)
      if (sorter) {
        result = [...result].sort(sorter.compareFn)
      }
    }
    
    return result
  }, [data, columns, searchTerm, selectedFilter, sortBy])
  
  // Manipulação de seleção
  const handleSelectionChange = (key: string) => {
    const newSelectedKeys = selectedKeys.includes(key)
      ? selectedKeys.filter(k => k !== key)
      : [...selectedKeys, key]
      
    setSelectedKeys(newSelectedKeys)
    onSelectionChange?.(newSelectedKeys)
  }
  
  const handleSelectAll = () => {
    if (selectedKeys.length === processedData.length) {
      setSelectedKeys([])
    } else {
      setSelectedKeys(processedData.map(keyExtractor))
    }
    
    onSelectionChange?.(selectedKeys)
  }
  
  // Limpar busca
  const handleClearSearch = () => {
    setSearchTerm("")
  }
  
  // Limpar filtros
  const handleResetFilters = () => {
    setSelectedFilter({})
    setSortBy(sortOptions.length > 0 ? sortOptions[0].id : "")
  }
  
  return (
    <div className={cn("space-y-4", className)}>
      {showToolbar && (
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          {/* Busca */}
          {showSearch && (
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-7 w-7 p-0"
                  onClick={handleClearSearch}
                >
                  <XCircle className="h-4 w-4" />
                  <span className="sr-only">Limpar busca</span>
                </Button>
              )}
            </div>
          )}
          
          {/* Filtros e ordenação */}
          {showFilters && (
            <div className="flex items-center gap-2 flex-wrap">
              {/* Ordenação */}
              {sortOptions.length > 0 && (
                <Select
                  value={sortBy}
                  onValueChange={setSortBy}
                >
                  <SelectTrigger className="h-8 text-xs w-[180px]">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              
              {/* Filtros */}
              {filterOptions.map(filter => (
                <Select
                  key={filter.id}
                  value={selectedFilter[filter.id] || "all"}
                  onValueChange={(value) => 
                    setSelectedFilter(prev => ({ ...prev, [filter.id]: value }))
                  }
                >
                  <SelectTrigger className="h-8 text-xs w-[180px]">
                    <SelectValue placeholder={filter.label} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {filter.options.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}
              
              {/* Botão de resetar filtros */}
              {(Object.keys(selectedFilter).length > 0 || sortBy !== (sortOptions[0]?.id || "")) && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs flex items-center gap-1"
                  onClick={handleResetFilters}
                >
                  <Filter className="h-3.5 w-3.5" />
                  <span>Limpar filtros</span>
                </Button>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Tabela */}
      <div className="rounded-lg border overflow-hidden">
        {/* Cabeçalho da tabela */}
        <div className="flex items-center bg-muted/50 px-4 py-3 border-b">
          <div className="w-10 flex-shrink-0">
            <Checkbox
              checked={
                processedData.length > 0 && 
                selectedKeys.length === processedData.length
              }
              onCheckedChange={handleSelectAll}
              aria-label="Selecionar todos os registros"
            />
          </div>
          
          {/* Cabeçalhos das colunas */}
          <div className="flex-1 flex items-center">
            {columns.map((column, index) => (
              <div 
                key={column.key} 
                className="font-medium text-sm"
                style={{ 
                  flex: column.width || 1,
                  paddingLeft: index === 0 ? 0 : '0.5rem',
                  paddingRight: '0.5rem'
                }}
              >
                {column.header}
              </div>
            ))}
          </div>
        </div>
        
        {/* Corpo da tabela */}
        <div className="divide-y">
          {processedData.length === 0 ? (
            <div className="py-12 px-4 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                {emptyStateIcon || <Search className="h-6 w-6 text-muted-foreground" />}
              </div>
              <h3 className="text-lg font-medium mb-1">{emptyStateTitle}</h3>
              <p className="text-muted-foreground mb-4">
                {emptyStateDescription}
              </p>
              {emptyStateComponent}
            </div>
          ) : (
            processedData.map((item, index) => {
              const key = keyExtractor(item)
              const isSelected = selectedKeys.includes(key)
              
              return (
                <div 
                  key={key}
                  className={cn(
                    "flex items-center px-4 py-4 hover:bg-muted/50 group transition-colors",
                    isSelected && "bg-muted/50",
                    rowClassName && rowClassName(item, isSelected),
                    onRowClick && "cursor-pointer"
                  )}
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  {/* Checkbox */}
                  <div 
                    className="w-10 flex-shrink-0" 
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => handleSelectionChange(key)}
                      aria-label={`Selecionar item ${index + 1}`}
                    />
                  </div>
                  
                  {/* Células das colunas */}
                  <div className="flex-1 flex items-center">
                    {columns.map((column, colIndex) => (
                      <div 
                        key={column.key}
                        className={cn(
                          "flex items-center",
                          colIndex === columns.length - 1 && "justify-end" // Última coluna alinhada à direita
                        )}
                        style={{ 
                          flex: column.width || 1,
                          paddingLeft: colIndex === 0 ? 0 : '0.5rem',
                          paddingRight: '0.5rem',
                          minWidth: 0 // Importante para evitar que o conteúdo force a largura
                        }}
                      >
                        {column.cell(item, index)}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
      
      {/* Informações de paginação */}
      {processedData.length > 0 && (
        <div className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground">
            Mostrando <span className="font-medium">{processedData.length}</span> de{" "}
            <span className="font-medium">{data.length}</span> registros
          </p>
          
          {/* Informações de seleção */}
          {selectedKeys.length > 0 && (
            <div className="text-xs text-muted-foreground">
              <span>{selectedKeys.length} selecionados</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Adicionando funções helpers para criar células comuns
export const createAvatarNameCell = (
  name: string,
  subtitle?: string,
  avatarUrl?: string,
  avatarFallback?: string,
  showJobIcon?: boolean
) => {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-muted flex-shrink-0 overflow-hidden">
        {avatarUrl ? (
          <img 
            src={avatarUrl} 
            alt={name}
            className="h-full w-full object-cover" 
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary font-medium">
            {avatarFallback || name.charAt(0)}
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-medium truncate">{name}</div>
        {subtitle && (
          <div className="text-xs text-muted-foreground truncate flex items-center">
            {showJobIcon && (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="flex-shrink-0 h-3.5 w-3.5 mr-1.5 text-muted-foreground">
                <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                <rect width="20" height="14" x="2" y="6" rx="2"></rect>
              </svg>
            )}
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};

export const createBadgeCell = (
  text: string, 
  variant: 'default' | 'secondary' | 'outline' | 'destructive' | string = 'default',
  color?: string
) => {
  const getColorClasses = () => {
    if (!color) return '';
    
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
      case 'green':
        return 'bg-green-100 text-green-700 hover:bg-green-200';
      case 'red':
        return 'bg-red-100 text-red-700 hover:bg-red-200';
      case 'amber':
        return 'bg-amber-100 text-amber-700 hover:bg-amber-200';
      case 'purple':
        return 'bg-purple-100 text-purple-700 hover:bg-purple-200';
      default:
        return '';
    }
  };
  
  return (
    <div className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
      variant === 'outline' ? 'border' : '',
      color ? getColorClasses() : ''
    )}>
      {text}
    </div>
  );
}; 