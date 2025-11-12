"use server";

import { Company } from "../_data/mockData";

// Simula o salvamento dos dados da empresa
export async function saveCompanyData(company: Company): Promise<{ success: boolean, message: string }> {
  // Simulação de delay para dar a impressão de uma chamada de API
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Em um ambiente real, aqui seria feita uma chamada para a API
  console.log("Dados da empresa salvos:", company);
  
  // Simula um retorno de sucesso
  return {
    success: true,
    message: "Dados da empresa salvos com sucesso!"
  };
}

// Simula o carregamento dos dados da empresa
export async function loadCompanyData(companyId: string): Promise<Company | null> {
  // Simulação de delay para dar a impressão de uma chamada de API
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  // Em um ambiente real, aqui seria feita uma chamada para a API
  // Retornando null por enquanto, já que estamos usando dados mockados
  return null;
}

// Simula o upload de um logo
export async function uploadCompanyLogo(file: File): Promise<{ success: boolean, url: string }> {
  // Simulação de delay para dar a impressão de uma chamada de API
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // Em um ambiente real, aqui seria feito o upload para um serviço de armazenamento
  console.log("Logo da empresa enviado:", file.name);
  
  // Simula um retorno de sucesso com uma URL falsa
  return {
    success: true,
    url: `/placeholders/logos/${Date.now()}.jpg`
  };
} 