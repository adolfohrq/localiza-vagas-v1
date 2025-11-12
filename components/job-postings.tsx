"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Users, MoreHorizontal, Calendar, FileEdit, Copy, ExternalLink, Trash2, BarChart, Clock } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface JobPostingsProps {
  filter?: string;
  sortBy?: string;
  searchTerm?: string;
}

export function JobPostings({ filter = "all", sortBy = "recent", searchTerm = "" }: JobPostingsProps) {
  const jobs = [
    {
      title: "Desenvolvedor Full Stack",
      department: "Tecnologia",
      location: "Remoto",
      type: "Tempo Integral",
      views: 245,
      applications: 12,
      status: "active",
      posted: "há 2 dias",
      daysLeft: 28,
      id: "1",
      company: {
        name: "Sua Empresa",
        logo: "/placeholder.svg"
      },
      promoted: true,
      featured: true
    },
    {
      title: "UX/UI Designer Senior",
      department: "Design",
      location: "São Paulo, SP",
      type: "Tempo Integral",
      views: 189,
      applications: 8,
      status: "active",
      posted: "há 3 dias",
      daysLeft: 27,
      id: "2",
      company: {
        name: "Sua Empresa",
        logo: "/placeholder.svg"
      }
    },
    {
      title: "Analista de Marketing Digital",
      department: "Marketing",
      location: "Híbrido",
      type: "Tempo Integral",
      views: 156,
      applications: 6,
      status: "active",
      posted: "há 4 dias",
      daysLeft: 26,
      id: "3",
      company: {
        name: "Sua Empresa",
        logo: "/placeholder.svg"
      }
    },
  ]

  const filteredJobs = jobs
    .filter(job => {
      if (filter !== "all" && job.status !== filter) return false;
      if (searchTerm && !job.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !job.department.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !job.location.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "recent") {
        return a.posted < b.posted ? 1 : -1;
      } else if (sortBy === "applications") {
        return b.applications - a.applications;
      } else if (sortBy === "views") {
        return b.views - a.views;
      }
      return 0;
    });

  if (filteredJobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Eye className="h-12 w-12 text-muted-foreground mb-4 opacity-30" />
        <h3 className="text-lg font-medium">Nenhuma vaga encontrada</h3>
        <p className="text-sm text-muted-foreground max-w-sm mt-2">
          Tente ajustar seus filtros ou criar uma nova vaga para começar.
        </p>
        <Button className="mt-4" asChild>
          <Link href="/dashboard/jobs/new/select-plan">
            Publicar Nova Vaga
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredJobs.map((job, index) => (
        <div key={index} className="flex flex-col gap-4 rounded-lg border border-border hover:border-primary/30 p-5 transition-all hover:shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex gap-4">
              <Avatar className="h-12 w-12 rounded-md border">
                <AvatarImage src={job.company?.logo} />
                <AvatarFallback>{job.company?.name[0]}</AvatarFallback>
              </Avatar>
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium break-words">{job.title}</h3>
                  
                  {job.featured && (
                    <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-200 hover:text-amber-800">
                      Destaque
                    </Badge>
                  )}
                  
                  {job.promoted && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800">
                      Promovida
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground break-words">
                  {job.department} • {job.location} • {job.type}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <Badge 
                variant={job.status === "active" ? "default" : "secondary"} 
                className={`whitespace-nowrap ${job.status === "active" ? "bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800" : ""}`}
              >
                {job.status === "active" ? "Ativa" : "Encerrada"}
              </Badge>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="flex items-center gap-1 whitespace-nowrap">
                      <Clock className="h-3 w-3" />
                      <span>{job.daysLeft} dias</span>
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Dias restantes até expirar</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/jobs/${job.id}/edit`} className="flex items-center">
                      <FileEdit className="mr-2 h-4 w-4" />
                      Editar vaga
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/jobs/${job.id}/candidates`} className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      Ver candidatos
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/jobs/${job.id}/analytics`} className="flex items-center">
                      <BarChart className="mr-2 h-4 w-4" />
                      Análise
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/jobs/${job.id}`} target="_blank" className="flex items-center">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Ver publicação
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center">
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicar
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600 focus:text-red-600 flex items-center">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Excluir vaga
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground border-t pt-4">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4 flex-shrink-0 text-blue-500" />
              <span>{job.views} visualizações</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 flex-shrink-0 text-indigo-500" />
              <Link href={`/dashboard/jobs/${job.id}/candidates`} className="hover:text-primary">
                <span>{job.applications} candidatos</span>
              </Link>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 flex-shrink-0 text-gray-400" />
              <span>Publicada {job.posted}</span>
            </div>
            <div className="ml-auto">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/dashboard/jobs/${job.id}/edit`}>
                  Gerenciar
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

