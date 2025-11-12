import { useState, useEffect } from 'react';
import { TeamMember, TeamMemberFormData, TeamStats } from '../_types';

// Dados de exemplo para simular uma API
const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@empresa.com',
    role: 'admin',
    avatar: '/avatars/joao.png',
    department: 'Tecnologia',
    position: 'CTO',
    phone: '(11) 98765-4321',
    status: 'active',
    dateAdded: '2023-01-15',
    lastActive: '2023-03-14T10:30:00'
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    email: 'maria.oliveira@empresa.com',
    role: 'manager',
    avatar: '/avatars/maria.png',
    department: 'RH',
    position: 'Gerente de RH',
    phone: '(11) 98765-1234',
    status: 'active',
    dateAdded: '2023-02-10',
    lastActive: '2023-03-14T09:45:00'
  },
  {
    id: '3',
    name: 'Pedro Santos',
    email: 'pedro.santos@empresa.com',
    role: 'recruiter',
    avatar: '/avatars/pedro.png',
    department: 'RH',
    position: 'Recrutador Sênior',
    status: 'active',
    dateAdded: '2023-03-05',
    lastActive: '2023-03-13T16:20:00'
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'ana.costa@empresa.com',
    role: 'recruiter',
    avatar: '/avatars/ana.png',
    department: 'RH',
    position: 'Recrutadora',
    status: 'active',
    dateAdded: '2023-03-10',
    lastActive: '2023-03-14T11:15:00'
  },
  {
    id: '5',
    name: 'Carlos Mendes',
    email: 'carlos.mendes@empresa.com',
    role: 'viewer',
    department: 'Marketing',
    position: 'Analista de Marketing',
    status: 'invited',
    dateAdded: '2023-03-12'
  },
  {
    id: '6',
    name: 'Fernanda Lima',
    email: 'fernanda.lima@empresa.com',
    role: 'viewer',
    department: 'Financeiro',
    position: 'Analista Financeiro',
    status: 'inactive',
    dateAdded: '2023-02-20',
    lastActive: '2023-03-01T14:30:00'
  }
];

export function useTeamMembers() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<TeamStats>({
    total: 0,
    active: 0,
    invited: 0,
    inactive: 0,
    byRole: {
      admin: 0,
      manager: 0,
      recruiter: 0,
      viewer: 0
    }
  });

  // Simula carregamento de dados da API
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        // Simula um atraso de rede
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setTeamMembers(mockTeamMembers);
        
        // Calcula estatísticas
        const newStats: TeamStats = {
          total: mockTeamMembers.length,
          active: mockTeamMembers.filter(m => m.status === 'active').length,
          invited: mockTeamMembers.filter(m => m.status === 'invited').length,
          inactive: mockTeamMembers.filter(m => m.status === 'inactive').length,
          byRole: {
            admin: mockTeamMembers.filter(m => m.role === 'admin').length,
            manager: mockTeamMembers.filter(m => m.role === 'manager').length,
            recruiter: mockTeamMembers.filter(m => m.role === 'recruiter').length,
            viewer: mockTeamMembers.filter(m => m.role === 'viewer').length
          }
        };
        
        setStats(newStats);
        setIsLoading(false);
      } catch (err) {
        setError('Erro ao carregar membros da equipe');
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // Adicionar um novo membro
  const addTeamMember = async (data: TeamMemberFormData) => {
    try {
      setIsLoading(true);
      
      // Simula um atraso de rede
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newMember: TeamMember = {
        id: `${Date.now()}`,
        ...data,
        status: 'invited',
        dateAdded: new Date().toISOString().split('T')[0]
      };
      
      const updatedMembers = [...teamMembers, newMember];
      setTeamMembers(updatedMembers);
      
      // Atualiza estatísticas
      updateStats(updatedMembers);
      
      setIsLoading(false);
      return newMember;
    } catch (err) {
      setError('Erro ao adicionar membro');
      setIsLoading(false);
      throw err;
    }
  };

  // Atualizar um membro existente
  const updateTeamMember = async (id: string, data: Partial<TeamMemberFormData>) => {
    try {
      setIsLoading(true);
      
      // Simula um atraso de rede
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedMembers = teamMembers.map(member => 
        member.id === id ? { ...member, ...data } : member
      );
      
      setTeamMembers(updatedMembers);
      
      // Atualiza estatísticas
      updateStats(updatedMembers);
      
      setIsLoading(false);
      return updatedMembers.find(m => m.id === id);
    } catch (err) {
      setError('Erro ao atualizar membro');
      setIsLoading(false);
      throw err;
    }
  };

  // Alterar status de um membro
  const changeTeamMemberStatus = async (id: string, status: 'active' | 'invited' | 'inactive') => {
    try {
      setIsLoading(true);
      
      // Simula um atraso de rede
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedMembers = teamMembers.map(member => 
        member.id === id ? { 
          ...member, 
          status,
          lastActive: status === 'active' ? new Date().toISOString() : member.lastActive
        } : member
      );
      
      setTeamMembers(updatedMembers);
      
      // Atualiza estatísticas
      updateStats(updatedMembers);
      
      setIsLoading(false);
      return updatedMembers.find(m => m.id === id);
    } catch (err) {
      setError('Erro ao alterar status do membro');
      setIsLoading(false);
      throw err;
    }
  };

  // Remover um membro
  const removeTeamMember = async (id: string) => {
    try {
      setIsLoading(true);
      
      // Simula um atraso de rede
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedMembers = teamMembers.filter(member => member.id !== id);
      setTeamMembers(updatedMembers);
      
      // Atualiza estatísticas
      updateStats(updatedMembers);
      
      setIsLoading(false);
      return true;
    } catch (err) {
      setError('Erro ao remover membro');
      setIsLoading(false);
      throw err;
    }
  };

  // Função auxiliar para atualizar estatísticas
  const updateStats = (members: TeamMember[]) => {
    const newStats: TeamStats = {
      total: members.length,
      active: members.filter(m => m.status === 'active').length,
      invited: members.filter(m => m.status === 'invited').length,
      inactive: members.filter(m => m.status === 'inactive').length,
      byRole: {
        admin: members.filter(m => m.role === 'admin').length,
        manager: members.filter(m => m.role === 'manager').length,
        recruiter: members.filter(m => m.role === 'recruiter').length,
        viewer: members.filter(m => m.role === 'viewer').length
      }
    };
    
    setStats(newStats);
  };

  return {
    teamMembers,
    isLoading,
    error,
    stats,
    addTeamMember,
    updateTeamMember,
    changeTeamMemberStatus,
    removeTeamMember
  };
} 