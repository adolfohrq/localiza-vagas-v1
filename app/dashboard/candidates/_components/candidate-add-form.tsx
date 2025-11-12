"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCandidates } from "../_hooks/use-candidates";

interface CandidateAddFormProps {
  stage: string;
  stageLabel: string;
}

export function CandidateAddForm({ stage, stageLabel }: CandidateAddFormProps) {
  const { 
    newCandidate, 
    setNewCandidate, 
    handleAddCandidate, 
    addSkill, 
    removeSkill 
  } = useCandidates();

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Adicionar novo candidato</DialogTitle>
        <DialogDescription>
          Adicione um novo candidato ao estágio {stageLabel}.
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Nome*
          </Label>
          <Input
            id="name"
            value={newCandidate.name}
            onChange={(e) => setNewCandidate(prev => ({ ...prev, name: e.target.value }))}
            className="col-span-3"
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email*
          </Label>
          <Input
            id="email"
            type="email"
            value={newCandidate.email}
            onChange={(e) => setNewCandidate(prev => ({ ...prev, email: e.target.value }))}
            className="col-span-3"
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="phone" className="text-right">
            Telefone
          </Label>
          <Input
            id="phone"
            value={newCandidate.phone}
            onChange={(e) => setNewCandidate(prev => ({ ...prev, phone: e.target.value }))}
            className="col-span-3"
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="position" className="text-right">
            Cargo*
          </Label>
          <Input
            id="position"
            value={newCandidate.position}
            onChange={(e) => setNewCandidate(prev => ({ ...prev, position: e.target.value }))}
            className="col-span-3"
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="skills" className="text-right">
            Habilidades
          </Label>
          <div className="col-span-3 space-y-2">
            <div className="flex gap-2">
              <Input
                id="skills"
                value={newCandidate.skillInput}
                onChange={(e) => setNewCandidate(prev => ({ ...prev, skillInput: e.target.value }))}
                placeholder="Adicionar habilidade"
                className="flex-1"
              />
              <Button type="button" size="sm" onClick={addSkill}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {newCandidate.skills.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {newCandidate.skills.map(skill => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="h-3.5 w-3.5 rounded-full hover:bg-muted-foreground/20"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <DialogFooter>
        <Button type="submit" onClick={handleAddCandidate}>Adicionar candidato</Button>
      </DialogFooter>
    </DialogContent>
  );
} 