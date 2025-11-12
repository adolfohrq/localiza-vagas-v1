import { useState } from "react";
import { mockCompany, Company } from "../_data/mockData";
import { saveCompanyData, loadCompanyData, uploadCompanyLogo } from "../_actions/companyActions";
import { toast } from "sonner";

export const useCompany = () => {
  // Estado da empresa
  const [company, setCompany] = useState<Company>(mockCompany);
  const [isSaving, setIsSaving] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Função para carregar os dados da empresa
  const loadCompany = async (companyId: string) => {
    setIsLoading(true);
    try {
      const data = await loadCompanyData(companyId);
      if (data) {
        setCompany(data);
      }
    } catch (error) {
      console.error("Erro ao carregar dados da empresa:", error);
      toast.error("Não foi possível carregar os dados da empresa");
    } finally {
      setIsLoading(false);
    }
  };

  // Função para atualizar um campo específico da empresa
  const updateField = (field: string, value: string | number) => {
    setCompany((prev) => {
      // Cria uma cópia do objeto anterior
      const updated = { ...prev };
      
      // Verifica se o campo contém um ponto, indicando um campo aninhado
      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        updated[parent] = {
          ...updated[parent as keyof typeof updated],
          [child]: value,
        };
      } else {
        // Atualiza diretamente o campo
        updated[field] = value;
      }
      
      setIsEdited(true);
      return updated;
    });
  };

  // Função para salvar as alterações
  const saveChanges = async () => {
    setIsSaving(true);
    
    try {
      const result = await saveCompanyData(company);
      if (result.success) {
        toast.success(result.message);
        setIsEdited(false);
      } else {
        toast.error(result.message || "Erro ao salvar os dados");
      }
    } catch (error) {
      console.error("Erro ao salvar dados da empresa:", error);
      toast.error("Ocorreu um erro ao salvar os dados da empresa");
    } finally {
      setIsSaving(false);
    }
  };

  // Função para cancelar as alterações
  const cancelChanges = () => {
    setCompany(mockCompany);
    setIsEdited(false);
    toast.info("Alterações descartadas");
  };

  // Função para limpar um campo específico
  const clearField = (field: string) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      updateField(field, "");
    } else {
      updateField(field, "");
    }
  };

  // Função para atualizar o endereço
  const updateAddress = (field: string, value: string) => {
    setCompany((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
    setIsEdited(true);
  };

  // Função para atualizar redes sociais
  const updateSocialMedia = (platform: string, value: string) => {
    setCompany((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value,
      },
    }));
    setIsEdited(true);
  };

  // Função para fazer upload do logo
  const uploadLogo = async (file: File) => {
    setIsSaving(true);
    try {
      const result = await uploadCompanyLogo(file);
      if (result.success) {
        updateField("logoUrl", result.url);
        toast.success("Logo atualizado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao fazer upload do logo:", error);
      toast.error("Não foi possível fazer o upload do logo");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    company,
    isSaving,
    isEdited,
    isLoading,
    updateField,
    saveChanges,
    cancelChanges,
    clearField,
    updateAddress,
    updateSocialMedia,
    loadCompany,
    uploadLogo
  };
}; 