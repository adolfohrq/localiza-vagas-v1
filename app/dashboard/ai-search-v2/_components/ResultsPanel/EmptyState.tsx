"use client"

import { Search } from "lucide-react"

export function EmptyState() {
  return (
    <div className="text-center py-16">
      <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-30" />
      <h3 className="text-lg font-medium">Nenhum candidato encontrado</h3>
      <p className="text-sm text-muted-foreground max-w-md mx-auto mt-2">
        Tente ajustar os parâmetros de busca ou selecionar uma vaga diferente.
      </p>
    </div>
  )
} 