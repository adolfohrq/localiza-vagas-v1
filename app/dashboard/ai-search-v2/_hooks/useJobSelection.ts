"use client"

import { useState, useEffect } from "react"
import { Job, availableJobs } from "../_data/jobs"

export function useJobSelection() {
  const [selectedJob, setSelectedJob] = useState("")
  const [selectedJobData, setSelectedJobData] = useState<Job | null>(null)

  // Atualizar os dados da vaga selecionada
  useEffect(() => {
    console.log("useJobSelection: selectedJob ID mudou para:", selectedJob);
    
    if (selectedJob) {
      const jobData = availableJobs.find(job => job.id === selectedJob)
      console.log("useJobSelection: jobData encontrado:", jobData?.title || "não encontrado");
      setSelectedJobData(jobData || null)
    } else {
      console.log("useJobSelection: limpando selectedJobData");
      setSelectedJobData(null)
    }
  }, [selectedJob])

  // Log quando selectedJobData muda
  useEffect(() => {
    console.log("useJobSelection: selectedJobData atualizado:", selectedJobData?.title || "null");
  }, [selectedJobData]);

  // Wrapper personalizado para setSelectedJob para melhor depuração
  const handleSetSelectedJob = (id: string) => {
    console.log("useJobSelection: Tentando definir selectedJob para:", id);
    setSelectedJob(id);
  }

  return {
    selectedJob,
    setSelectedJob: handleSetSelectedJob,
    selectedJobData,
    availableJobs
  }
} 