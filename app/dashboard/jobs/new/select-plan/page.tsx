"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Package, Award, CalendarDays, Star, ArrowRight, Sparkles, CheckCircle, HelpCircle, Clock, Rocket, ChevronRight, Zap } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// This would come from your backend
const currentPlan = {
  name: "Plano 01",
  jobsAvailable: 2,
  totalJobs: 3,
  expiresAt: "2024-03-24",
}

const singlePosts = [
  {
    days: 15,
    price: 50.0,
    available: 1,
    id: "single-15",
  },
  {
    days: 30,
    price: 100.0,
    available: 2,
    id: "single-30",
  },
]

const freePlan = {
  jobsAvailable: 1,
  totalJobs: 1,
  resetsAt: "2024-03-01",
}

export default function SelectPlanPage() {
  const daysRemaining = Math.ceil((new Date(currentPlan.expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  
  const hasAvailablePlans = currentPlan.jobsAvailable > 0 || freePlan.jobsAvailable > 0 || singlePosts.some(post => post.available > 0)
  
  // Lista planos ativos disponíveis em ordem de prioridade
  const availablePlans = [
    currentPlan.jobsAvailable > 0 && {
      id: "current-plan",
      name: "Plano Atual",
      available: currentPlan.jobsAvailable,
      total: currentPlan.totalJobs,
      expiry: `${daysRemaining} dias`,
      expiryRaw: daysRemaining,
      badgeText: "Recomendado",
      badgeColor: "bg-blue-100 text-blue-700",
      icon: <Package className="h-5 w-5 text-blue-600" />,
      description: `${currentPlan.name} - Válido por mais ${daysRemaining} dias`,
      buttonVariant: "default" as const,
      buttonText: "Usar Vaga do Plano",
      recommended: true,
      url: "/dashboard/jobs/new/create?source=current-plan"
    },
    
    freePlan.jobsAvailable > 0 && {
      id: "free-plan",
      name: "Vaga Gratuita",
      available: freePlan.jobsAvailable,
      total: freePlan.totalJobs,
      expiry: "7 dias",
      expiryRaw: 7,
      badgeText: "Grátis",
      badgeColor: "bg-green-100 text-green-700",
      icon: <Award className="h-5 w-5 text-green-600" />,
      description: "Visibilidade básica por 7 dias",
      buttonVariant: "outline" as const,
      buttonText: "Usar Vaga Gratuita",
      recommended: false,
      url: "/dashboard/jobs/new/create?source=free-plan"
    },
    
    ...singlePosts.map(post => post.available > 0 && {
      id: post.id,
      name: `Pacote de ${post.days} dias`,
      available: post.available,
      total: post.available,
      expiry: `${post.days} dias`,
      expiryRaw: post.days,
      badgeText: post.days === 30 ? "Destaque" : undefined,
      badgeColor: post.days === 30 ? "bg-amber-100 text-amber-700" : undefined,
      icon: <CalendarDays className="h-5 w-5 text-blue-600" />,
      description: `${post.available} ${post.available === 1 ? "vaga" : "vagas"} com exposição completa`,
      buttonVariant: post.days === 30 ? "default" as const : "outline" as const,
      buttonGradient: post.days === 30,
      buttonText: "Usar Este Pacote",
      recommended: post.days === 30,
      url: `/dashboard/jobs/new/create?source=${post.id}`
    }),
  ].filter(Boolean) as Array<{
    id: string
    name: string
    available: number
    total: number
    expiry: string
    expiryRaw: number
    badgeText?: string
    badgeColor?: string
    icon: JSX.Element
    description: string
    buttonVariant: "default" | "outline"
    buttonGradient?: boolean
    buttonText: string
    recommended: boolean
    url: string
  }>
  
  // Usar todos os planos disponíveis sem filtro
  const plansToShow = availablePlans
  
  const handlePlanSelected = (planId: string) => {
    // Na implementação real, poderia rastrear analytics ou fazer outras ações
    toast({
      title: "Plano selecionado",
      description: `Você selecionou o ${availablePlans.find(p => p.id === planId)?.name}`,
    })
  }
  
  return (
    <DashboardShell>
      <div className="relative border rounded-lg p-6 bg-gradient-to-br from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 shadow-sm">
        {/* Indicador de passo do processo */}
        <div className="absolute -top-3 left-8 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
          Passo 1 de 2
        </div>
        
        <div className="space-y-6">
          {/* Cabeçalho */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-600" />
                Publicar Nova Vaga
              </h2>
              <p className="text-muted-foreground mt-1">Selecione qual plano será usado para esta publicação</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button asChild variant="outline" size="sm" className="gap-1">
                <Link href="/dashboard/plans">
                  <span>Ver todos os planos</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
          
          {hasAvailablePlans ? (
            <>
              {/* Barra de decisão rápida */}
              <div className="bg-muted/30 p-3 rounded-md border border-dashed flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm font-medium">Você possui {availablePlans.length} {availablePlans.length === 1 ? 'plano' : 'planos'} com vagas disponíveis</span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">O que é recomendado?</span>
                </div>
              </div>
              
              {/* Cartões de planos organizados por categoria */}
              <div className="space-y-6">
                {/* Plano Atual */}
                {currentPlan.jobsAvailable > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="font-medium text-sm">Seu Plano Atual</h3>
                      <div className="h-px bg-muted flex-1"></div>
                    </div>
                    
                    {plansToShow
                      .filter(plan => plan.id === "current-plan")
                      .map((plan) => (
                        <div 
                          key={plan.id}
                          className={cn(
                            "relative rounded-lg border overflow-hidden transition-all duration-200 hover:shadow-md hover:border-blue-200",
                            plan.recommended && "shadow-sm border-blue-200 bg-blue-50/30"
                          )}
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 gap-4">
                            <div className="flex gap-4 items-start">
                              <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                                plan.recommended ? "bg-blue-100" : "bg-muted"
                              )}>
                                {plan.icon}
                              </div>
                              
                              <div>
                                <div className="flex items-center gap-2 mb-0.5">
                                  <h3 className="font-medium">{plan.name}</h3>
                                  {plan.badgeText && (
                                    <Badge variant="outline" className={plan.badgeColor}>
                                      {plan.badgeText}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">{plan.description}</p>
                                
                                <div className="mt-2 flex items-center gap-6">
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                                    <span className="text-xs">{plan.available} {plan.available === 1 ? 'vaga' : 'vagas'} disponível</span>
                                  </div>
                                  
                                  <div className="flex items-center gap-1.5">
                                    <Clock className="w-3 h-3 text-muted-foreground" />
                                    <span className="text-xs">{plan.expiry} de exposição</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 ml-14 md:ml-0">
                              <Button 
                                variant="default"
                                className="min-w-32"
                                asChild
                              >
                                <Link href={plan.url} onClick={() => handlePlanSelected(plan.id)}>
                                  <span>Usar Vaga do Plano</span>
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
                
                {/* Vaga Gratuita */}
                {freePlan.jobsAvailable > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="font-medium text-sm">Vaga Gratuita</h3>
                      <div className="h-px bg-muted flex-1"></div>
                    </div>
                    
                    {plansToShow
                      .filter(plan => plan.id === "free-plan")
                      .map((plan) => (
                        <div 
                          key={plan.id}
                          className="relative rounded-lg border-dashed border overflow-hidden transition-all duration-200 hover:shadow-md hover:border-green-200 bg-green-50/10"
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 gap-4">
                            <div className="flex gap-4 items-start">
                              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                {plan.icon}
                              </div>
                              
                              <div>
                                <div className="flex items-center gap-2 mb-0.5">
                                  <h3 className="font-medium">{plan.name}</h3>
                                  {plan.badgeText && (
                                    <Badge variant="outline" className={plan.badgeColor}>
                                      {plan.badgeText}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">{plan.description}</p>
                                
                                <div className="mt-2 flex items-center gap-6">
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-600" />
                                    <span className="text-xs">{plan.available} {plan.available === 1 ? 'vaga' : 'vagas'} disponível</span>
                                  </div>
                                  
                                  <div className="flex items-center gap-1.5">
                                    <Clock className="w-3 h-3 text-muted-foreground" />
                                    <span className="text-xs">{plan.expiry} de exposição</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 ml-14 md:ml-0">
                              <Button 
                                variant="outline"
                                className="min-w-32 border-green-200 text-green-700 hover:bg-green-50"
                                asChild
                              >
                                <Link href={plan.url} onClick={() => handlePlanSelected(plan.id)}>
                                  <span>Usar Vaga Gratuita</span>
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
                
                {/* Pacotes */}
                {singlePosts.some(post => post.available > 0) && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="font-medium text-sm">Pacotes de Vagas</h3>
                      <div className="h-px bg-muted flex-1"></div>
                    </div>
                    
                    <div className="grid gap-3 md:grid-cols-2">
                      {plansToShow
                        .filter(plan => plan.id.includes("single"))
                        .map((plan) => (
                          <div 
                            key={plan.id}
                            className="relative rounded-lg border overflow-hidden transition-all duration-200 hover:shadow-md hover:border-blue-200"
                          >
                            <div className="flex flex-col p-4 gap-3">
                              <div className="flex items-start justify-between">
                                <div className="flex gap-3 items-center">
                                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                    {plan.icon}
                                  </div>
                                  
                                  <div>
                                    <h3 className="font-medium">{plan.name}</h3>
                                    <p className="text-sm text-muted-foreground">{plan.available} {plan.available === 1 ? 'vaga' : 'vagas'} disponível</p>
                                  </div>
                                </div>
                                
                                {plan.badgeText && (
                                  <Badge variant="outline" className={plan.badgeColor}>
                                    {plan.badgeText}
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1">
                                <div className="flex items-center gap-1.5">
                                  <Clock className="w-3 h-3 text-muted-foreground" />
                                  <span className="text-xs">{plan.expiry} de exposição</span>
                                </div>
                                
                                <div className="flex items-center gap-1.5">
                                  <Rocket className="w-3 h-3 text-amber-500" />
                                  <span className="text-xs">Destaque nos resultados</span>
                                </div>
                              </div>
                              
                              <Button 
                                variant="default"
                                className="mt-2 w-full"
                                asChild
                              >
                                <Link href={plan.url} onClick={() => handlePlanSelected(plan.id)}>
                                  <span>Usar Este Pacote</span>
                                </Link>
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            // Sem planos disponíveis
            <div className="bg-muted/20 rounded-lg border border-dashed p-8 text-center">
              <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-muted-foreground opacity-70" />
              </div>
              <h3 className="text-lg font-medium mb-2">Sem vagas disponíveis</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Você não possui vagas disponíveis. Adquira um plano para continuar publicando vagas e encontrar os melhores talentos.
              </p>
              <Button asChild size="lg">
                <Link href="/dashboard/plans">
                  Ver Planos Disponíveis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {hasAvailablePlans && (
        <div className="flex items-center justify-center mt-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/jobs">
              Voltar para vagas
            </Link>
          </Button>
        </div>
      )}
    </DashboardShell>
  )
}

