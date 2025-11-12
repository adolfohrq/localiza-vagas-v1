import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { UserPlus } from 'lucide-react';
import { TeamMemberDialog } from './team-member-dialog';
import { TeamMemberFormData } from '../../_types';

interface AddTeamMemberProps {
  onAddMember: (data: TeamMemberFormData) => Promise<any>;
  isLoading?: boolean;
}

export function AddTeamMember({ onAddMember, isLoading = false }: AddTeamMemberProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: TeamMemberFormData) => {
    await onAddMember(data);
    setOpen(false);
  };

  return (
    <>
      <Button 
        onClick={() => setOpen(true)} 
        className="flex items-center"
        disabled={isLoading}
      >
        <UserPlus className="h-4 w-4 mr-2" />
        Adicionar Membro
      </Button>
      
      <TeamMemberDialog
        open={open}
        onOpenChange={setOpen}
        title="Adicionar Novo Membro"
        description="Preencha os dados para adicionar um novo membro à equipe."
        onSubmit={handleSubmit}
        submitLabel="Adicionar Membro"
      />
    </>
  );
} 