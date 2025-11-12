export interface Candidate {
  id: string;
  name: string;
  email: string;
  position: string;
  status: "new" | "reviewing" | "interviewed" | "approved" | "rejected" | "hired";
  appliedDate: string;
  avatar: string;
  skills: string[];
  experience: string;
  matchScore: number;
  jobTitle: string;
  phone: string;
  lastActivity: string;
  source: string;
  stage: string;
  nextInterview?: string;
  notes: string[];
  education: string;
  resumeUrl: string;
  viewed: boolean;
  favorite: boolean;
}

export interface CandidateStats {
  totalCandidates: number;
  newCandidates: number;
  interviewScheduled: number;
  averageMatchScore: number;
  highMatchScoreCount: number;
  weekCandidatesCount: number;
  conversionRates: {
    candidaturas: number;
    triagem: number;
    entrevistaTecnica: number;
    entrevistaRH: number;
    contratados: number;
  };
}

export interface NewCandidate {
  name: string;
  position: string;
  email: string;
  phone: string;
  skills: string[];
  skillInput: string;
}

export interface FilterState {
  search: string;
  status: string[];
  skills: string[];
  positions: string[];
  matchScore: number;
  appliedDate: string;
  source: string;
  viewed: boolean | null;
  favorite: boolean | null;
}

export type StatusStylesType = {
  new: { label: string; variant: string; color: string };
  reviewing: { label: string; variant: string; color: string };
  interviewed: { label: string; variant: string; color: string };
  approved: { label: string; variant: string; color: string };
  rejected: { label: string; variant: string; color: string };
  hired: { label: string; variant: string; color: string };
};

export type StageLabelsType = {
  "triagem": string;
  "entrevista-tecnica": string;
  "avaliacao-tecnica": string;
  "segunda-entrevista": string;
  "entrevista-rh": string;
  "oferta": string;
  "contratado": string;
}; 