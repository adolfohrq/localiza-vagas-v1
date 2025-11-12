"use client"

import { Button } from "@/components/ui/button";
import { UserPlus, Download, Upload, HelpCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function CandidateHeader() {
  return (
    <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Candidatos</h2>
        <p className="text-muted-foreground">
          Gerencie candidatos, acompanhe processos seletivos e analise métricas de recrutamento.
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          <HelpCircle className="mr-2 h-4 w-4" />
          Ajuda
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              Exportar como CSV
            </DropdownMenuItem>
            <DropdownMenuItem>
              Exportar como Excel
            </DropdownMenuItem>
            <DropdownMenuItem>
              Exportar como PDF
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Exportar selecionados
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="outline" size="sm">
          <Upload className="mr-2 h-4 w-4" />
          Importar
        </Button>
        
        <Button size="sm">
          <UserPlus className="mr-2 h-4 w-4" />
          Adicionar Candidato
        </Button>
      </div>
    </div>
  );
} 