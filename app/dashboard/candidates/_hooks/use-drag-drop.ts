import { useState } from "react";
import { DragStartEvent, DragOverEvent, DragEndEvent } from "@dnd-kit/core";
import { Candidate } from "../_types";
import { toast } from "@/components/ui/use-toast";
import { statusStyles } from "../_data/constants";

export function useDragDrop(
  candidates: Candidate[],
  setCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>,
  stageLabels: Record<string, string>
) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draggedCandidate, setDraggedCandidate] = useState<Candidate | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
    
    const candidate = candidates.find(c => c.id === active.id);
    if (candidate) {
      setDraggedCandidate(candidate);
    }
  };
  
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    
    if (!over) return;
    
    // Extrair IDs e tipos
    const activeId = active.id as string;
    const overId = over.id as string;
    
    // Não fazer nada se estiver sobre o mesmo item
    if (activeId === overId) return;
    
    // Verificar se está arrastando sobre uma coluna
    if (overId.toString().startsWith('stage-')) {
      // É uma coluna, implementado no handleDragEnd
    } 
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    // Limpar os estados de arrasto
    setActiveId(null);
    setDraggedCandidate(null);
    
    if (!over) return;
    
    // Não fazer nada se arrastar sobre o mesmo item
    if (active.id === over.id) return;
    
    // Extrair IDs para maior clareza
    const activeId = active.id as string;
    const overId = over.id as string;
    
    // Log para depuração
    console.log('Drag End:', { activeId, overId });
    
    // Se estiver arrastando sobre uma coluna (estágio)
    if (overId.toString().startsWith('stage-')) {
      const newStage = overId.toString().replace('stage-', '');
      
      // Atualizar o estágio do candidato
      setCandidates(prev => {
        return prev.map(candidate => {
          if (candidate.id === activeId) {
            // Determinar o novo status com base no estágio
            const newStatus = getStatusForStage(newStage) || candidate.status;
            
            // Retornar candidato atualizado
            return {
              ...candidate,
              stage: newStage,
              status: newStatus
            };
          }
          return candidate;
        });
      });
      
      // Encontrar o candidato que foi movido para exibir na notificação
      const candidateToMove = candidates.find(c => c.id === activeId);
      
      if (candidateToMove) {
        // Notificar o usuário sobre a mudança
        toast({
          title: "Candidato movido",
          description: `${candidateToMove.name} movido para ${stageLabels[newStage]}`,
        });
      }
    }
  };

  // Função auxiliar para mapear estágios para status
  const getStatusForStage = (stage: string): keyof typeof statusStyles | undefined => {
    const stageToStatus: Record<string, keyof typeof statusStyles> = {
      'triagem': 'new',
      'entrevista-tecnica': 'reviewing',
      'avaliacao-tecnica': 'reviewing',
      'segunda-entrevista': 'interviewed',
      'entrevista-rh': 'interviewed',
      'oferta': 'approved',
      'contratado': 'hired'
    };
    
    return stageToStatus[stage];
  };

  return {
    activeId,
    setActiveId,
    draggedCandidate,
    setDraggedCandidate,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    getStatusForStage
  };
} 