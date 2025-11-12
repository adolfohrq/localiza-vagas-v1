"use client"

import { Search, X, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { TransactionItem } from "./TransactionItem"
import { useTransactions } from "../../_hooks/useTransactions"
import { TransactionType, Status } from "../../_data/transactions-data"

export function TransactionList() {
  const {
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    filteredTransactions,
    clearFilters,
    hasActiveFilters
  } = useTransactions()

  return (
    <Card className="overflow-hidden border-slate-200">
      <div className="bg-slate-50 border-b border-slate-200 p-3 flex flex-col sm:flex-row gap-2 items-center sm:justify-between">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-[260px]">
            <Search className="absolute left-2 top-[7px] h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Buscar transações..."
              className="pl-7 h-8 text-sm border-slate-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute right-0 top-0 h-8 w-8 p-0" 
                onClick={() => setSearchTerm('')}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          
          <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as TransactionType | "all")}>
            <SelectTrigger className="h-8 w-[110px] text-xs border-slate-200">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value="payment">Pagamentos</SelectItem>
              <SelectItem value="package">Pacotes</SelectItem>
              <SelectItem value="extra">Extras</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as Status | "all")}>
            <SelectTrigger className="h-8 w-[110px] text-xs border-slate-200">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos status</SelectItem>
              <SelectItem value="completed">Pago</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="failed">Falhou</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="text-xs h-8 shrink-0"
          >
            <X className="h-3 w-3 mr-1" /> 
            Limpar filtros
          </Button>
        )}
      </div>
      
      {/* Cabeçalho da Lista */}
      <div className="border-b border-slate-100 px-4 py-2 grid grid-cols-12 text-xs font-medium text-slate-500">
        <div className="col-span-1"></div>
        <div className="col-span-6">Transação</div>
        <div className="col-span-2 text-right">Valor</div>
        <div className="col-span-2 text-center">Status</div>
        <div className="col-span-1"></div>
      </div>
      
      <div className="divide-y divide-slate-100 max-h-[420px] overflow-auto">
        {filteredTransactions.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            <p className="mb-2">Nenhuma transação encontrada</p>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-primary">
                Limpar filtros
              </Button>
            )}
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))
        )}
      </div>
      
      {filteredTransactions.length > 0 && (
        <div className="border-t border-slate-200 px-4 py-3 text-xs text-slate-500 flex justify-between items-center">
          <div>
            {filteredTransactions.length} {filteredTransactions.length === 1 ? 'transação' : 'transações'} 
            {hasActiveFilters ? " encontradas" : ""}
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 text-xs"
            asChild
          >
            <Link href="/dashboard/financial-history/report">
              Ver relatório completo
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>
      )}
    </Card>
  )
} 