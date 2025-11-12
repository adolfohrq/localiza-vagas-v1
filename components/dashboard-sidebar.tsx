"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Menu, 
  ChevronRight, 
  ChevronLeft, 
  LogOut, 
  Home, 
  Briefcase, 
  Users, 
  BarChart3, 
  Settings, 
  HelpCircle, 
  MessageSquare,
  Bell,
  CreditCard,
  FileText,
  Calendar,
  Building2,
  Search,
  PanelLeft,
  User,
  CircleUser,
  LayoutDashboard,
  CheckCircle,
  Clock,
  CircleSlash,
  UserCog
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

// Tipos
type UserStatus = "online" | "offline" | "away";

interface SidebarItemBadge {
  content: string | number;
  variant?: "default" | "destructive" | "outline" | "secondary";
}

interface SidebarItem {
  title: string;
  href: string;
  icon?: React.ElementType;
  badge?: SidebarItemBadge;
  disabled?: boolean;
  external?: boolean;
  onClick?: () => void;
}

interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

interface DashboardSidebarProps {
  defaultCollapsed?: boolean;
  showMobileTrigger?: boolean;
  className?: string;
  variant?: "default" | "minimal" | "bordered";
  showTooltipsWhenCollapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
}

export function DashboardSidebar({
  defaultCollapsed = false,
  showMobileTrigger = true,
  className = "",
  variant = "default",
  showTooltipsWhenCollapsed = true,
  onCollapseChange,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const { user, logout } = useAuth();
  
  // Detectar tamanho da tela para colapsar automaticamente em telas menores
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280 && !collapsed) {
        setCollapsed(true);
      } else if (window.innerWidth >= 1280 && collapsed && defaultCollapsed === false) {
        setCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Verificar no carregamento inicial
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [collapsed, defaultCollapsed]);

  // Função para obter a cor e texto do status
  const getUserStatusInfo = (status: UserStatus) => {
    switch (status) {
      case "online":
        return { color: "bg-green-500", text: "Online", textColor: "text-green-600", icon: <CheckCircle className="h-4 w-4" /> };
      case "offline":
        return { color: "bg-gray-400", text: "Offline", textColor: "text-gray-600", icon: <CircleSlash className="h-4 w-4" /> };
      case "away":
        return { color: "bg-amber-500", text: "Ausente", textColor: "text-amber-600", icon: <Clock className="h-4 w-4" /> };
    }
  };

  const statusInfo = getUserStatusInfo("online");

  // Variantes de estilo para o sidebar
  const sidebarVariants = {
    default: "border-r",
    minimal: "bg-background/50 backdrop-blur-sm",
    bordered: "border-r border-r-2 border-r-primary/10",
  };

  // Variantes de estilo para os itens
  const itemVariants = {
    default: "hover:bg-accent hover:text-accent-foreground",
    minimal: "hover:bg-primary/10 hover:text-primary",
    bordered: "hover:bg-accent hover:text-accent-foreground border-l-2 border-transparent data-[active=true]:border-l-primary",
  };

  // Variantes de estilo para itens ativos
  const activeItemVariants = {
    default: "bg-primary/10 text-primary font-medium",
    minimal: "bg-primary/10 text-primary font-medium",
    bordered: "bg-primary/5 text-primary font-medium border-l-primary",
  };

  // Itens do menu para recrutador/empresa
  const recruiterItems: SidebarSection[] = [
    {
      title: "Principal",
      items: [
        {
          title: "Visão Geral",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Minhas Vagas",
          href: "/dashboard/jobs",
          icon: Briefcase,
          badge: { content: 5, variant: "default" }
        },
        {
          title: "Candidatos",
          href: "/dashboard/candidates",
          icon: Users,
          badge: { content: 12, variant: "default" }
        },
        {
          title: "Entrevistas",
          href: "/dashboard/interviews",
          icon: Calendar,
          badge: { content: 2, variant: "secondary" }
        },
        {
          title: "Mensagens",
          href: "/dashboard/messages",
          icon: MessageSquare,
          badge: { content: 3, variant: "secondary" }
        },
        {
          title: "Tarefas",
          href: "/dashboard/tasks",
          icon: CheckCircle,
          badge: { content: 7, variant: "default" }
        },
      ],
    },
    {
      title: "Empresa",
      items: [
        {
          title: "Perfil da Empresa",
          href: "/dashboard/company",
          icon: Building2,
        },
        {
          title: "Equipe",
          href: "/dashboard/team",
          icon: UserCog
        },
        {
          title: "Planos e Assinaturas",
          href: "/dashboard/plans",
          icon: CreditCard,
        },
        {
          title: "Histórico Financeiro",
          href: "/dashboard/financial-history",
          icon: BarChart3,
        },
      ],
    },
    {
      title: "Ferramentas",
      items: [
        {
          title: "Busca com IA",
          href: "/dashboard/ai-search-v2",
          icon: Search,
        },
        {
          title: "Configurações",
          href: "/dashboard/settings",
          icon: Settings,
        },
        {
          title: "Suporte",
          href: "/dashboard/support",
          icon: HelpCircle,
        },
      ],
    },
  ];

  // Itens do menu para candidato
  const candidateItems: SidebarSection[] = [
    {
      title: "Principal",
      items: [
        {
          title: "Visão Geral",
          href: "/candidate-dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Busca com IA",
          href: "/candidate-dashboard/ai-job-search",
          icon: Search,
        },
        {
          title: "Candidaturas",
          href: "/candidate-dashboard/applications",
          icon: FileText,
          badge: { content: 3, variant: "default" }
        },
        {
          title: "Mensagens",
          href: "/candidate-dashboard/messages",
          icon: MessageSquare,
          badge: { content: 2, variant: "secondary" }
        },
        {
          title: "Entrevistas",
          href: "/candidate-dashboard/interviews",
          icon: Calendar,
          badge: { content: 1, variant: "secondary" }
        },
      ],
    },
    {
      title: "Perfil",
      items: [
        {
          title: "Visão Geral",
          href: "/candidate-dashboard/overview-v3",
          icon: User,
        },
        {
          title: "Currículo",
          href: "/candidate-dashboard/resume",
          icon: FileText,
        },
      ],
    },
    {
      title: "Sistema",
      items: [
        {
          title: "Configurações",
          href: "/candidate-dashboard/settings",
          icon: Settings,
        },
        {
          title: "Suporte",
          href: "/candidate-dashboard/support",
          icon: HelpCircle,
        },
        {
          title: "Notificações",
          href: "/candidate-dashboard/notifications",
          icon: Bell,
          badge: { content: 5, variant: "default" }
        },
      ],
    },
  ];

  // Selecionar os itens com base no tipo de usuário
  const items = user?.role === "candidate" ? candidateItems : recruiterItems;

  const handleCollapseToggle = () => {
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);
    if (onCollapseChange) {
      onCollapseChange(newCollapsedState);
    }
  };

  return (
    <>
      {/* Versão para desktop */}
      <aside 
        className={cn(
          "hidden md:flex flex-col fixed top-[65px] h-[calc(100vh-65px)] transition-all duration-300 ease-in-out z-30 bg-white",
          sidebarVariants[variant],
          collapsed ? "w-[64px]" : "w-[240px]",
          className
        )}
      >
        {/* Perfil do usuário */}
        <div className={cn(
          "flex items-center p-3.5 border-b relative bg-transparent",
          collapsed ? "justify-center" : "justify-between"
        )}>
          <div className={cn(
            "flex items-center",
            collapsed ? "w-full justify-center" : "space-x-3"
          )}>
            {collapsed ? (
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative cursor-pointer">
                      <Avatar className="h-8 w-8 border border-gray-200">
                        <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "Usuário"} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="flex flex-col items-start">
                    <p className="font-medium">{user?.name || "Usuário"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <>
                <div className="relative">
                  <Avatar className="h-9 w-9 border border-gray-200">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "Usuário"} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user?.name || "Usuário"}</p>
                </div>
              </>
            )}
          </div>
          
          {!collapsed && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleCollapseToggle}
              className="h-6.5 w-6.5 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/5"
              aria-label="Recolher menu"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
          
          {collapsed && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleCollapseToggle}
              className="absolute -right-3 top-3.5 h-6 w-6 bg-white rounded-full shadow-md border text-muted-foreground hover:text-primary"
              aria-label="Expandir menu"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
        
        {/* Área de navegação com scroll */}
        <ScrollArea className="flex-1 py-3 bg-transparent">
          <nav className="grid items-start gap-1 px-2 bg-transparent">
            {items.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-1 mb-5">
                {!collapsed && section.title && (
                  <h4 className="text-xs font-semibold text-muted-foreground px-3 py-1.5 uppercase tracking-wider">
                    {section.title}
                  </h4>
                )}
                
                {section.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || 
                    (pathname.startsWith(item.href + "/") && 
                     // Impedir que o Dashboard seja considerado ativo quando estamos em subpáginas
                     !(item.href === "/dashboard" && pathname !== "/dashboard"));
                  
                  return (
                    <TooltipProvider key={itemIndex} delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                              itemVariants[variant],
                              isActive ? activeItemVariants[variant] : "",
                              collapsed ? "justify-center" : "justify-start",
                              item.disabled && "opacity-50 pointer-events-none"
                            )}
                            data-active={isActive}
                            onClick={item.onClick}
                            target={item.external ? "_blank" : undefined}
                            rel={item.external ? "noopener noreferrer" : undefined}
                          >
                            {Icon && (
                              <Icon className={cn(
                                "flex-shrink-0",
                                collapsed ? "h-4.5 w-4.5" : "h-4 w-4 mr-2.5",
                                isActive ? "text-primary" : "text-muted-foreground group-hover:text-inherit"
                              )} />
                            )}
                            
                            {!collapsed && (
                              <span className="flex-1 truncate">{item.title}</span>
                            )}
                            
                            {!collapsed && item.badge && (
                              <Badge 
                                variant={item.badge.variant || "default"} 
                                className={cn(
                                  "ml-auto text-xs px-1.5 py-0 h-5 min-w-[18px]",
                                  item.badge.variant === "secondary" ? "bg-primary/10 text-primary hover:bg-primary/20" : ""
                                )}
                              >
                                {item.badge.content}
                              </Badge>
                            )}
                          </Link>
                        </TooltipTrigger>
                        {(collapsed && showTooltipsWhenCollapsed) && (
                          <TooltipContent side="right" className="flex items-center">
                            {item.title}
                            {item.badge && (
                              <Badge 
                                variant={item.badge.variant || "default"} 
                                className={cn(
                                  "ml-2",
                                  item.badge.variant === "secondary" ? "bg-primary/10 text-primary hover:bg-primary/20" : ""
                                )}
                              >
                                {item.badge.content}
                              </Badge>
                            )}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  );
                })}
              </div>
            ))}
          </nav>
        </ScrollArea>
        
        {/* Rodapé */}
        <div className="mt-auto border-t p-3 bg-transparent">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size={collapsed ? "icon" : "sm"} 
                  onClick={logout}
                  className={cn(
                    "w-full justify-start text-sm font-medium hover:bg-destructive/10 hover:text-destructive transition-all duration-200",
                    collapsed ? "px-0 h-9 w-9" : "px-3 py-2 h-9"
                  )}
                  aria-label="Sair da conta"
                >
                  <LogOut className={cn(
                    "flex-shrink-0",
                    collapsed ? "h-4 w-4" : "h-3.5 w-3.5 mr-2"
                  )} />
                  {!collapsed && <span>Sair</span>}
                </Button>
              </TooltipTrigger>
              {collapsed && showTooltipsWhenCollapsed && (
                <TooltipContent side="right">
                  Sair
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </aside>
      
      {/* Versão para mobile (Sheet) */}
      {showMobileTrigger && (
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden fixed left-4 top-[75px] z-40 bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white"
              aria-label="Abrir menu"
              style={{ position: 'absolute', marginLeft: 0 }}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0 bg-white">
            <div className="flex flex-col h-full bg-white">
              {/* Perfil do usuário */}
              <div className="flex items-center p-4 border-b relative bg-white">
                <div className="flex items-center space-x-3 w-full">
                  <div className="relative">
                    <Avatar className="h-9 w-9 border border-gray-200">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "Usuário"} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user?.name || "Usuário"}</p>
                  </div>
                </div>
              </div>
              
              {/* Área de navegação com scroll */}
              <ScrollArea className="flex-1 py-3 bg-white">
                <nav className="grid items-start gap-1 px-3 bg-white">
                  {items.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="space-y-1 mb-4">
                      {section.title && (
                        <h4 className="text-xs font-semibold text-muted-foreground px-3 py-1.5 uppercase tracking-wider">
                          {section.title}
                        </h4>
                      )}
                      
                      {section.items.map((item, itemIndex) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || 
                          (pathname.startsWith(item.href + "/") && 
                           // Impedir que o Dashboard seja considerado ativo quando estamos em subpáginas
                           !(item.href === "/dashboard" && pathname !== "/dashboard"));
                        
                        return (
                          <Link
                            key={itemIndex}
                            href={item.href}
                            className={cn(
                              "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                              itemVariants[variant],
                              isActive ? activeItemVariants[variant] : "",
                              item.disabled && "opacity-50 pointer-events-none"
                            )}
                            data-active={isActive}
                            onClick={item.onClick}
                            target={item.external ? "_blank" : undefined}
                            rel={item.external ? "noopener noreferrer" : undefined}
                          >
                            {Icon && (
                              <Icon className={cn(
                                "h-4 w-4 mr-2.5",
                                isActive ? "text-primary" : "text-muted-foreground group-hover:text-inherit"
                              )} />
                            )}
                            
                            <span className="flex-1 truncate">{item.title}</span>
                            
                            {item.badge && (
                              <Badge 
                                variant={item.badge.variant || "default"} 
                                className={cn(
                                  "ml-auto text-xs px-1.5 py-0 h-5 min-w-[20px]",
                                  item.badge.variant === "secondary" ? "bg-primary/10 text-primary hover:bg-primary/20" : ""
                                )}
                              >
                                {item.badge.content}
                              </Badge>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                </nav>
              </ScrollArea>
              
              {/* Rodapé */}
              <div className="mt-auto border-t p-3 bg-white">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-sm font-medium hover:bg-destructive/10 hover:text-destructive transition-all duration-200 py-2"
                  onClick={logout}
                  aria-label="Sair da conta"
                >
                  <LogOut className="h-4 w-4 mr-2.5" />
                  <span>Sair</span>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
} 