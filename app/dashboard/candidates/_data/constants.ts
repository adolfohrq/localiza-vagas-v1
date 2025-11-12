import { StatusStylesType, StageLabelsType } from "../_types";

export const statusStyles: StatusStylesType = {
  new: { label: "Novo", variant: "default", color: "blue" },
  reviewing: { label: "Em Análise", variant: "secondary", color: "purple" },
  interviewed: { label: "Entrevistado", variant: "outline", color: "green" },
  approved: { label: "Aprovado", variant: "success", color: "green" },
  rejected: { label: "Rejeitado", variant: "destructive", color: "red" },
  hired: { label: "Contratado", variant: "success", color: "green" }
};

export const stageLabels: StageLabelsType = {
  "triagem": "Triagem inicial",
  "entrevista-tecnica": "Entrevista técnica",
  "avaliacao-tecnica": "Avaliação técnica",
  "segunda-entrevista": "Segunda entrevista",
  "entrevista-rh": "Entrevista com RH",
  "oferta": "Proposta enviada",
  "contratado": "Contratado"
}; 