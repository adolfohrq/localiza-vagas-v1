'use client';

import { PageHeader } from "@/components/ui/page-header";
import { 
  Users, 
  Download, 
  Share2, 
  Filter, 
  Plus,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export function PageHeaderExample() {
  // Exemplo de ações para o dropdown
  const dropdownActions = [
    {
      label: "Exportar dados",
      icon: Download,
      onClick: () => console.log("Exportar dados")
    },
    {
      label: "Compartilhar",
      icon: Share2,
      onClick: () => console.log("Compartilhar")
    },
    {
      label: "Configurar visualização",
      icon: Filter,
      onClick: () => console.log("Configurar visualização")
    }
  ];

  // Exemplo de conteúdo extra (como um botão de notificações)
  const extraContent = (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full relative">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Notificações</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-[200px]">
      <PageHeader 
        title="Candidatos"
        description="Gerencie os candidatos e acompanhe o processo de recrutamento"
        icon={Users}
        badge={{
          text: "5 novos hoje",
          variant: "outline"
        }}
        primaryAction={{
          label: "Novo Candidato",
          shortLabel: "Novo",
          icon: Plus,
          onClick: () => console.log("Adicionar novo candidato")
        }}
        dropdownActions={dropdownActions}
        showHelpButton={true}
        onHelpClick={() => console.log("Ajuda solicitada")}
        extraContent={extraContent}
      />
      
      {/* Conteúdo da página viria aqui */}
      <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <p className="text-muted-foreground">Conteúdo da página...</p>
      </div>
    </div>
  );
}