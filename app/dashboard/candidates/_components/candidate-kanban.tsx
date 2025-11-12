"use client"

import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  closestCorners,
} from '@dnd-kit/core';
import {
  sortableKeyboardCoordinates,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { CandidateCard } from './candidate-card';
import { CandidateStage } from './candidate-stage';
import { useCandidates } from '../_hooks/use-candidates';
import { useDragDrop } from '../_hooks/use-drag-drop';
import { stageLabels } from '../_data/constants';
import { ScrollArea } from '@/components/ui/scroll-area';

export function CandidateKanban() {
  const {
    candidates,
    setCandidates,
    selectedCandidate,
    setSelectedCandidate,
    draggedCandidate,
    addCandidateStage,
    setAddCandidateStage,
  } = useCandidates();

  const {
    activeId,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useDragDrop(candidates, setCandidates, stageLabels);

  // Configurar sensores para detecção de eventos de arrastar
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Lista de estágios para o kanban
  const stages = [
    'triagem',
    'entrevista-tecnica',
    'avaliacao-tecnica',
    'segunda-entrevista',
    'entrevista-rh',
    'oferta',
    'contratado'
  ];

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement]}
    >
      <ScrollArea className="h-[calc(100vh-220px)]">
        <div className="flex space-x-4 p-4 min-w-max">
          {stages.map(stage => (
            <CandidateStage
              key={stage}
              stage={stage}
              candidates={candidates}
              addCandidateStage={addCandidateStage}
              setAddCandidateStage={setAddCandidateStage}
            >
              <SortableContext
                items={candidates.filter(c => c.stage === stage).map(c => c.id)}
                strategy={verticalListSortingStrategy}
              >
                {candidates
                  .filter(candidate => candidate.stage === stage)
                  .map(candidate => (
                    <CandidateCard
                      key={candidate.id}
                      candidate={candidate}
                      variant="kanban"
                      onClick={() => setSelectedCandidate(candidate)}
                    />
                  ))}
              </SortableContext>
            </CandidateStage>
          ))}
        </div>
      </ScrollArea>

      {/* Overlay para o item sendo arrastado */}
      <DragOverlay>
        {activeId && draggedCandidate ? (
          <CandidateCard
            candidate={draggedCandidate}
            variant="kanban"
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
} 