"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CandidateList } from "./candidate-list";
import { CandidateKanban } from "./candidate-kanban";
import { CandidateAnalytics } from "./candidate-analytics";
import { useCandidateFilters } from "../_hooks/use-candidate-filters";
import { useCandidates } from "../_hooks/use-candidates";

export function CandidateTabs() {
  const { candidates } = useCandidates();
  const { activeView, setActiveView } = useCandidateFilters(candidates);

  const handleTabChange = (value: string) => {
    setActiveView(value as "list" | "kanban" | "analytics");
  };

  return (
    <Tabs value={activeView} onValueChange={handleTabChange} className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="list">Lista</TabsTrigger>
        <TabsTrigger value="kanban">Kanban</TabsTrigger>
        <TabsTrigger value="analytics">Análise</TabsTrigger>
      </TabsList>
      
      <TabsContent value="list" className="space-y-4">
        <CandidateList />
      </TabsContent>
      
      <TabsContent value="kanban">
        <CandidateKanban />
      </TabsContent>
      
      <TabsContent value="analytics">
        <CandidateAnalytics />
      </TabsContent>
    </Tabs>
  );
} 