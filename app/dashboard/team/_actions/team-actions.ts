'use server';

import { TeamMember, TeamMemberFormData } from '../_types';

// Simulação de ações do servidor
// Em um ambiente real, estas funções fariam chamadas a uma API ou banco de dados

export async function addTeamMemberAction(data: TeamMemberFormData): Promise<TeamMember> {
  // Simula um atraso de rede
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simula a criação de um novo membro
  const newMember: TeamMember = {
    id: `${Date.now()}`,
    ...data,
    status: 'invited',
    dateAdded: new Date().toISOString().split('T')[0]
  };
  
  return newMember;
}

export async function updateTeamMemberAction(id: string, data: Partial<TeamMemberFormData>): Promise<TeamMember> {
  // Simula um atraso de rede
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simula a atualização de um membro existente
  // Em um ambiente real, buscaria o membro pelo ID e atualizaria seus dados
  const updatedMember: TeamMember = {
    id,
    name: data.name || 'Nome Atualizado',
    email: data.email || 'email@atualizado.com',
    role: data.role || 'viewer',
    department: data.department,
    position: data.position,
    phone: data.phone,
    status: 'active',
    dateAdded: '2023-01-01',
    lastActive: new Date().toISOString()
  };
  
  return updatedMember;
}

export async function changeTeamMemberStatusAction(id: string, status: 'active' | 'invited' | 'inactive'): Promise<TeamMember> {
  // Simula um atraso de rede
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simula a alteração de status de um membro
  // Em um ambiente real, buscaria o membro pelo ID e atualizaria seu status
  const updatedMember: TeamMember = {
    id,
    name: 'Nome do Membro',
    email: 'email@membro.com',
    role: 'viewer',
    status,
    dateAdded: '2023-01-01',
    lastActive: status === 'active' ? new Date().toISOString() : undefined
  };
  
  return updatedMember;
}

export async function removeTeamMemberAction(id: string): Promise<boolean> {
  // Simula um atraso de rede
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simula a remoção de um membro
  // Em um ambiente real, removeria o membro do banco de dados
  return true;
} 