import { useState, useEffect } from "react";
import { Candidate, CandidateStats, NewCandidate } from "../_types";
import { candidatesData } from "../_data/mock-data";
import { toast } from "@/components/ui/use-toast";

export function useCandidates() {
  const [candidates, setCandidates] = useState<Candidate[]>(candidatesData);
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draggedCandidate, setDraggedCandidate] = useState<Candidate | null>(null);
  const [addCandidateStage, setAddCandidateStage] = useState<string | null>(null);
  const [newCandidate, setNewCandidate] = useState<NewCandidate>({
    name: "",
    position: "",
    email: "",
    phone: "",
    skills: [] as string[],
    skillInput: ""
  });

  // Estatísticas para os widgets
  const stats: CandidateStats = {
    totalCandidates: candidates.length,
    newCandidates: candidates.filter(c => c.status === "new").length,
    interviewScheduled: candidates.filter(c => c.nextInterview).length,
    averageMatchScore: Math.round(candidates.reduce((acc, curr) => acc + curr.matchScore, 0) / candidates.length),
    highMatchScoreCount: candidates.filter(c => c.matchScore >= 85).length,
    weekCandidatesCount: candidates.filter(c => c.appliedDate.includes("dia") || c.appliedDate.includes("hora") || c.appliedDate.includes("hoje") || c.appliedDate.includes("ontem")).length,
    conversionRates: {
      candidaturas: 100,
      triagem: 75,
      entrevistaTecnica: 45,
      entrevistaRH: 30,
      contratados: 15,
    }
  };

  // Funções para manipulação de candidatos selecionados
  const toggleCandidateSelection = (index: number) => {
    setSelectedCandidates(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  const toggleAllCandidates = () => {
    if (selectedCandidates.length === candidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(candidates.map((_, index) => index));
    }
  };

  // Extração de todas as habilidades únicas para filtros
  const allSkills = [...new Set(candidates.flatMap(c => c.skills))].sort();
  
  // Extração de todas as posições únicas para filtros
  const allPositions = [...new Set(candidates.map(c => c.position))].sort();

  // Função para adicionar um novo candidato
  const handleAddCandidate = () => {
    if (!newCandidate.name || !newCandidate.email || !newCandidate.position) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const newCandidateObj: Candidate = {
      id: (candidates.length + 1).toString(),
      name: newCandidate.name,
      email: newCandidate.email,
      position: newCandidate.position,
      status: "new",
      appliedDate: "hoje",
      avatar: "/placeholder.svg",
      skills: newCandidate.skills,
      experience: "",
      matchScore: 70,
      jobTitle: newCandidate.position,
      phone: newCandidate.phone,
      lastActivity: "agora",
      source: "Manual",
      stage: addCandidateStage || "triagem",
      notes: [],
      education: "",
      resumeUrl: "#",
      viewed: false,
      favorite: false
    };

    setCandidates(prev => [...prev, newCandidateObj]);
    
    // Resetar o formulário
    setNewCandidate({
      name: "",
      position: "",
      email: "",
      phone: "",
      skills: [],
      skillInput: ""
    });
    
    setAddCandidateStage(null);
    
    toast({
      title: "Candidato adicionado",
      description: `${newCandidateObj.name} foi adicionado com sucesso.`
    });
  };

  // Funções para manipulação de habilidades no formulário
  const addSkill = () => {
    if (newCandidate.skillInput && !newCandidate.skills.includes(newCandidate.skillInput)) {
      setNewCandidate(prev => ({
        ...prev,
        skills: [...prev.skills, prev.skillInput],
        skillInput: ""
      }));
    }
  };

  const removeSkill = (skill: string) => {
    setNewCandidate(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  return {
    candidates,
    setCandidates,
    selectedCandidates,
    setSelectedCandidates,
    selectedCandidate,
    setSelectedCandidate,
    activeId,
    setActiveId,
    draggedCandidate,
    setDraggedCandidate,
    addCandidateStage,
    setAddCandidateStage,
    newCandidate,
    setNewCandidate,
    stats,
    toggleCandidateSelection,
    toggleAllCandidates,
    allSkills,
    allPositions,
    handleAddCandidate,
    addSkill,
    removeSkill
  };
} 