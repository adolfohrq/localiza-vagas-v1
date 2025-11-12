"use client"

import type React from "react"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function EditJobPage() {
  const params = useParams()
  const router = useRouter()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedSkills, setSelectedSkills] = useState([])
  const [selectedBenefits, setSelectedBenefits] = useState([])
  const [skillsOpen, setSkillsOpen] = useState(false)
  const [benefitsOpen, setBenefitsOpen] = useState(false)
  const [showSalary, setShowSalary] = useState(false)
  const [isHighlighted, setIsHighlighted] = useState(false)
  const [highlightedUnitsAvailable, setHighlightedUnitsAvailable] = useState(5)

  useEffect(() => {
    const fetchJob = async () => {
      try {
        // Simule uma chamada à API para buscar os dados da vaga
        const response = await fetch(`/api/jobs/${params.id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch job data")
        }
        const data = await response.json()
        setJob(data)
        setSelectedSkills(data.skills || [])
        setSelectedBenefits(data.benefits || [])
        setShowSalary(data.showSalary)
        setIsHighlighted(data.isHighlighted)
        setHighlightedUnitsAvailable(data.highlightedUnitsAvailable || 5)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchJob()
  }, [params.id])

  if (loading) return <div>Carregando...</div>
  if (error) return <div>Erro: {error}</div>
  if (!job) return <div>Vaga não encontrada</div>

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/jobs/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Todos os dados atualizados da vaga
          skills: selectedSkills,
          benefits: selectedBenefits,
          showSalary: showSalary,
          isHighlighted: isHighlighted,
          highlightedUnitsAvailable: highlightedUnitsAvailable,
        }),
      })
      if (!response.ok) {
        throw new Error("Failed to update job")
      }
      router.push("/dashboard/jobs")
    } catch (error) {
      console.error("Error updating job:", error)
      // Adicione aqui a lógica para mostrar um erro ao usuário
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">Editar Vaga</h2>
      <Button onClick={handleSubmit}>Salvar Alterações</Button>
    </div>
  )
}

