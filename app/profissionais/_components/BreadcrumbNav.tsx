import React from 'react'
import Link from 'next/link'
import { HomeIcon, ChevronRight } from 'lucide-react'

export function BreadcrumbNav() {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center text-sm">
        <li className="flex items-center">
          <Link 
            href="/" 
            className="flex items-center text-gray-500 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-1"
            prefetch={false}
          >
            <HomeIcon className="h-3.5 w-3.5" />
            <span className="ml-1 sm:ml-2 hidden sm:inline">Início</span>
          </Link>
        </li>
        <li className="flex items-center mx-1 sm:mx-2 text-gray-400">
          <ChevronRight className="h-3.5 w-3.5" />
        </li>
        <li className="max-w-[180px] sm:max-w-xs truncate">
          <span 
            className="font-medium text-primary px-1 rounded" 
            title="Profissionais"
          >
            Profissionais
          </span>
        </li>
      </ol>
    </nav>
  )
} 