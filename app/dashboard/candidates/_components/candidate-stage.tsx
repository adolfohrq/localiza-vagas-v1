"use client"

import { useSortable } from "@dnd-kit/sortable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Candidate } from "../_types";
import { stageLabels } from "../_data/constants";
import { CandidateAddForm } from "./candidate-add-form";

interface CandidateStageProps {
  stage: string;
  candidates: Candidate[];
  addCandidateStage: string | null;
  setAddCandidateStage: (stage: string | null) => void;
  children: React.ReactNode;
}

export function CandidateStage({
  stage,
  candidates,
  addCandidateStage,
  setAddCandidateStage,
  children
}: CandidateStageProps) {
  const {
    setNodeRef,
  } = useSortable({
    id: `stage-${stage}`,
    data: {
      type: 'stage',
      stage,
    },
  });
  
  const stageCandidates = candidates.filter(c => c.stage === stage);
  
  return (
    <div
      ref={setNodeRef}
      className="flex-shrink-0 w-[280px]"
    >
      <div className="bg-muted/50 rounded-t-md p-3 border border-b-0">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{stageLabels[stage as keyof typeof stageLabels]}</h3>
          <Badge variant="secondary" className="ml-2">
            {stageCandidates.length}
          </Badge>
        </div>
      </div>
      <div className="border rounded-b-md p-2 bg-muted/20 min-h-[500px]">
        {children}
        
        {stageCandidates.length === 0 && (
          <div className="flex items-center justify-center h-20 border border-dashed rounded-md mt-2">
            <p className="text-xs text-muted-foreground">Sem candidatos neste estágio</p>
          </div>
        )}
        
        <Dialog open={addCandidateStage === stage} onOpenChange={(open) => {
          if (!open) {
            setAddCandidateStage(null);
          }
        }}>
          <DialogTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full mt-2 text-muted-foreground hover:text-foreground"
              onClick={() => setAddCandidateStage(stage)}
            >
              <Plus className="h-3.5 w-3.5 mr-1" />
              Adicionar candidato
            </Button>
          </DialogTrigger>
          
          <CandidateAddForm 
            stage={stage} 
            stageLabel={stageLabels[stage as keyof typeof stageLabels]} 
          />
        </Dialog>
      </div>
    </div>
  );
} 