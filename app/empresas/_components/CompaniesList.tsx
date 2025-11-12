import React from 'react'
import { CompanyCard } from "@/components/company-card"

interface Company {
  id: string
  name: string
  logo: string
  industry: string
  location: string
  employeeCount: string
  foundedYear: number
  openPositions: number
  description: string
  inscricaoData: string
}

interface CompaniesListProps {
  companies: Company[]
}

export function CompaniesList({ companies }: CompaniesListProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {companies.map((company) => (
        <CompanyCard key={company.id} {...company} />
      ))}
    </div>
  )
} 