"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle, Building2, Download, Share2, HelpCircle, FileText } from "lucide-react";
import { PageHeader, PageHeaderAction } from "@/components/ui/page-header";

interface CompanyProfileHeaderProps {
  isEdited: boolean;
  isSaving: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export function CompanyProfileHeader({
  isEdited,
  isSaving,
  onSave,
  onCancel,
}: CompanyProfileHeaderProps) {
  // Definindo as ações do dropdown como um array de PageHeaderAction
  const dropdownActions: PageHeaderAction[] = [
    {
      label: "Exportar dados",
      icon: Download,
      onClick: () => console.log("Exportar dados da empresa")
    },
    {
      label: "Compartilhar perfil",
      icon: Share2,
      onClick: () => console.log("Compartilhar perfil da empresa")
    },
    {
      label: "Gerar relatório",
      icon: FileText,
      onClick: () => console.log("Gerar relatório da empresa")
    }
  ];

  // Botões de ação personalizados para salvar/cancelar
  const extraContent = (
    <div className="flex flex-row space-x-2">
      <Button
        onClick={onCancel}
        variant="outline"
        size="sm"
        className="px-3 h-9"
        disabled={!isEdited || isSaving}
      >
        Cancelar
      </Button>
      <Button
        onClick={onSave}
        size="sm"
        className="px-3 h-9"
        disabled={!isEdited || isSaving}
      >
        {isSaving && (
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        )}
        Salvar alterações
      </Button>
    </div>
  );

  return (
    <PageHeader 
      title="Perfil da Empresa"
      description="Gerencie as informações da sua empresa"
      icon={Building2}
      dropdownActions={dropdownActions}
      showHelpButton={true}
      onHelpClick={() => console.log("Ajuda sobre o perfil da empresa")}
      extraContent={extraContent}
    />
  );
} 