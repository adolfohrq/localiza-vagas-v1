"use client"

import { useState, useMemo } from "react"
import { Transaction, TransactionType, Status, transactions } from "../_data/transactions-data"

export function useTransactions() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<TransactionType | "all">("all")
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all")
  
  // Filtragem de transações
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((transaction) => {
        const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesType = typeFilter === "all" || transaction.type === typeFilter
        const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
        return matchesSearch && matchesType && matchesStatus
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [searchTerm, typeFilter, statusFilter])

  // Limpar filtros
  const clearFilters = () => {
    setSearchTerm("")
    setTypeFilter("all")
    setStatusFilter("all")
  }

  return {
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    filteredTransactions,
    clearFilters,
    hasActiveFilters: searchTerm !== "" || typeFilter !== "all" || statusFilter !== "all"
  }
} 