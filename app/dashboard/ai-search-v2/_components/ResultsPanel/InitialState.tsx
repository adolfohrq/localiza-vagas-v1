"use client"

import { Brain } from "lucide-react"

export function InitialState() {
  return (
    <div className="text-center py-16">
      <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-30" />
      <h3 className="text-lg font-medium">Busca Inteligente de Candidatos</h3>
      <p className="text-sm text-muted-foreground max-w-md mx-auto mt-2">
        Selecione uma vaga e os parâmetros de busca à esquerda para encontrar candidatos compatíveis.
      </p>
    </div>
  )
} 