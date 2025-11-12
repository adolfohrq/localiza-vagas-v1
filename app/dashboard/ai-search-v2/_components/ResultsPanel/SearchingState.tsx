"use client"

import { Cpu, Sparkles } from "lucide-react"

export function SearchingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-4">
      <div className="relative">
        <Cpu className="h-12 w-12 text-primary animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="h-6 w-6 text-primary animate-pulse" />
        </div>
      </div>
      <div className="text-center space-y-1">
        <p className="font-medium">Pesquisa Inteligente em Andamento</p>
        <p className="text-sm text-muted-foreground max-w-md">
          Nossa IA está analisando candidatos com base nos critérios selecionados...
        </p>
      </div>
    </div>
  )
} 