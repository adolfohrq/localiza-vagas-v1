import React, { useState } from 'react';
import { TeamMember } from '../../_types';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  MoreHorizontal, 
  UserPlus, 
  Mail, 
  UserCheck, 
  UserX, 
  Pencil, 
  Trash2, 
  ShieldCheck, 
  UserCog, 
  Briefcase, 
  Eye 
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { TeamMemberDialog } from '../team-form/team-member-dialog';

interface TeamListProps {
  members: TeamMember[];
  isLoading?: boolean;
  onStatusChange: (id: string, status: 'active' | 'invited' | 'inactive') => Promise<TeamMember | undefined>;
  onRemoveMember: (id: string) => Promise<boolean>;
  onUpdateMember: (id: string, data: any) => Promise<TeamMember | undefined>;
}

export function TeamList({ 
  members, 
  isLoading = false,
  onStatusChange,
  onRemoveMember,
  onUpdateMember
}: TeamListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editMember, setEditMember] = useState<TeamMember | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  // Função para formatar a data da última atividade
  const formatLastActive = (dateString?: string) => {
    if (!dateString) return 'Nunca';
    
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
    } catch (e) {
      return 'Data inválida';
    }
  };

  // Função para obter o ícone e cor da função
  const getRoleInfo = (role: string) => {
    switch (role) {
      case 'admin':
        return { 
          label: 'Administrador', 
          icon: <ShieldCheck className="h-3.5 w-3.5 mr-1.5" />, 
          color: 'bg-purple-100 text-purple-700 border-purple-200' 
        };
      case 'manager':
        return { 
          label: 'Gerente', 
          icon: <UserCog className="h-3.5 w-3.5 mr-1.5" />, 
          color: 'bg-indigo-100 text-indigo-700 border-indigo-200' 
        };
      case 'recruiter':
        return { 
          label: 'Recrutador', 
          icon: <Briefcase className="h-3.5 w-3.5 mr-1.5" />, 
          color: 'bg-amber-100 text-amber-700 border-amber-200' 
        };
      case 'viewer':
        return { 
          label: 'Visualizador', 
          icon: <Eye className="h-3.5 w-3.5 mr-1.5" />, 
          color: 'bg-emerald-100 text-emerald-700 border-emerald-200' 
        };
      default:
        return { 
          label: 'Desconhecido', 
          icon: <UserCog className="h-3.5 w-3.5 mr-1.5" />, 
          color: 'bg-gray-100 text-gray-700 border-gray-200' 
        };
    }
  };

  // Função para obter o ícone e cor do status
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'active':
        return { 
          label: 'Ativo', 
          icon: <UserCheck className="h-3.5 w-3.5 mr-1.5" />, 
          color: 'bg-green-100 text-green-700 border-green-200' 
        };
      case 'invited':
        return { 
          label: 'Convidado', 
          icon: <Mail className="h-3.5 w-3.5 mr-1.5" />, 
          color: 'bg-blue-100 text-blue-700 border-blue-200' 
        };
      case 'inactive':
        return { 
          label: 'Inativo', 
          icon: <UserX className="h-3.5 w-3.5 mr-1.5" />, 
          color: 'bg-gray-100 text-gray-700 border-gray-200' 
        };
      default:
        return { 
          label: 'Desconhecido', 
          icon: <UserX className="h-3.5 w-3.5 mr-1.5" />, 
          color: 'bg-gray-100 text-gray-700 border-gray-200' 
        };
    }
  };

  // Filtrar membros com base na pesquisa e filtros
  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.department && member.department.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (member.position && member.position.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Manipulador para editar membro
  const handleEditMember = (member: TeamMember) => {
    setEditMember(member);
    setShowEditDialog(true);
  };

  // Manipulador para salvar edição
  const handleSaveEdit = async (data: any) => {
    if (editMember) {
      await onUpdateMember(editMember.id, data);
      setShowEditDialog(false);
      setEditMember(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="w-1/3 h-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-1/4 h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        <div className="border rounded-md">
          <div className="h-12 border-b bg-gray-50"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center p-4 border-b last:border-0 animate-pulse">
              <div className="h-10 w-10 bg-gray-200 rounded-full mr-3"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div className="h-6 w-16 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar membros..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full sm:w-[300px]"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filtrar por função" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as funções</SelectItem>
              <SelectItem value="admin">Administradores</SelectItem>
              <SelectItem value="manager">Gerentes</SelectItem>
              <SelectItem value="recruiter">Recrutadores</SelectItem>
              <SelectItem value="viewer">Visualizadores</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="active">Ativos</SelectItem>
              <SelectItem value="invited">Convidados</SelectItem>
              <SelectItem value="inactive">Inativos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Membro</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Departamento</TableHead>
                <TableHead className="hidden lg:table-cell">Adicionado em</TableHead>
                <TableHead className="hidden lg:table-cell">Última atividade</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Nenhum membro encontrado com os filtros atuais.
                  </TableCell>
                </TableRow>
              ) : (
                filteredMembers.map((member) => {
                  const roleInfo = getRoleInfo(member.role);
                  const statusInfo = getStatusInfo(member.status);
                  
                  return (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`flex items-center w-fit ${roleInfo.color}`}>
                          {roleInfo.icon}
                          <span>{roleInfo.label}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`flex items-center w-fit ${statusInfo.color}`}>
                          {statusInfo.icon}
                          <span>{statusInfo.label}</span>
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {member.department || <span className="text-muted-foreground text-sm">Não definido</span>}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm">
                        {new Date(member.dateAdded).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm">
                        {formatLastActive(member.lastActive)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Abrir menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleEditMember(member)}>
                              <Pencil className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            
                            <DropdownMenuSeparator />
                            
                            {member.status === 'active' && (
                              <DropdownMenuItem onClick={() => onStatusChange(member.id, 'inactive')}>
                                <UserX className="h-4 w-4 mr-2" />
                                Desativar
                              </DropdownMenuItem>
                            )}
                            
                            {member.status === 'inactive' && (
                              <DropdownMenuItem onClick={() => onStatusChange(member.id, 'active')}>
                                <UserCheck className="h-4 w-4 mr-2" />
                                Ativar
                              </DropdownMenuItem>
                            )}
                            
                            {member.status === 'invited' && (
                              <DropdownMenuItem onClick={() => onStatusChange(member.id, 'active')}>
                                <UserCheck className="h-4 w-4 mr-2" />
                                Aprovar
                              </DropdownMenuItem>
                            )}
                            
                            <DropdownMenuItem 
                              onClick={() => onRemoveMember(member.id)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remover
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* Dialog para edição de membro */}
      {editMember && (
        <TeamMemberDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          title="Editar Membro da Equipe"
          description="Atualize as informações do membro da equipe."
          defaultValues={{
            name: editMember.name,
            email: editMember.email,
            role: editMember.role,
            department: editMember.department || '',
            position: editMember.position || '',
            phone: editMember.phone || ''
          }}
          onSubmit={handleSaveEdit}
          submitLabel="Salvar Alterações"
        />
      )}
    </div>
  );
} 