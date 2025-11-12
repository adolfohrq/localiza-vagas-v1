"use client"

import React, { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTeamMembers } from './_hooks/useTeamMembers';
import { TeamStatsCards } from './_components/team-stats';
import { TeamList } from './_components/team-list';
import { AddTeamMember } from './_components/team-form/add-team-member';

export default function TeamPage() {
  const { 
    teamMembers, 
    isLoading, 
    error, 
    stats, 
    addTeamMember, 
    updateTeamMember, 
    changeTeamMemberStatus, 
    removeTeamMember 
  } = useTeamMembers();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Equipe</h2>
          <p className="text-muted-foreground">
            Gerencie os membros da sua equipe e suas permissões de acesso.
          </p>
        </div>
        <AddTeamMember onAddMember={addTeamMember} isLoading={isLoading} />
      </div>
      
      <div className="space-y-4">
        <Suspense fallback={<TeamStatsCards stats={stats} isLoading={true} />}>
          <TeamStatsCards stats={stats} isLoading={isLoading} />
        </Suspense>
        
        <Card>
          <CardHeader>
            <CardTitle>Membros da Equipe</CardTitle>
            <CardDescription>
              Gerencie todos os membros da sua equipe
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div className="h-[400px] animate-pulse bg-gray-100 rounded-lg"></div>}>
              <TeamList 
                members={teamMembers} 
                isLoading={isLoading}
                onStatusChange={changeTeamMemberStatus}
                onRemoveMember={removeTeamMember}
                onUpdateMember={updateTeamMember}
              />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 