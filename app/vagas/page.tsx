"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { JobFilters } from "@/components/job-filters"
import { BreadcrumbNav } from "./_components/BreadcrumbNav"
import { PageHeader } from "./_components/PageHeader"
import { ResultsHeader } from "./_components/ResultsHeader"
import { JobsList } from "./_components/JobsList"
import { jobs } from "./_data/jobs-data"

export default function JobsPage() {
  const [filtersVisible, setFiltersVisible] = useState(false)

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <BreadcrumbNav />
        
        <PageHeader filtersVisible={filtersVisible} toggleFilters={toggleFilters} />

        <div className="grid gap-8 md:grid-cols-[300px,1fr]">
          {/* Filtros - visíveis em desktop, colapsáveis em mobile */}
          <div className={`${filtersVisible ? "block" : "hidden"} md:block`}>
            <JobFilters />
          </div>

          <div className="space-y-6">
            <ResultsHeader jobsCount={jobs.length} />
            <JobsList jobs={jobs} />
          </div>
        </div>
      </main>
    </div>
  )
}

