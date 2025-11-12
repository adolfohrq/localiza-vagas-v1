'use client';

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { 
  HelpCircle,
  MoreHorizontal,
  Plus,
  LucideIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export interface PageHeaderAction {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
  };
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
    shortLabel?: string;
  };
  dropdownActions?: PageHeaderAction[];
  showHelpButton?: boolean;
  onHelpClick?: () => void;
  extraContent?: ReactNode;
}

/**
 * Componente reutilizável de cabeçalho de página
 * Baseado no design do TasksHeader
 */
export function PageHeader({
  title,
  description,
  icon: Icon,
  badge,
  primaryAction,
  dropdownActions,
  showHelpButton = false,
  onHelpClick,
  extraContent
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-6 mb-6">
      {/* Barra superior com título e ações principais */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center">
          {Icon && (
            <div className="mr-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="h-5 w-5 text-primary" />
              </div>
            </div>
          )}
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {title}
              </h1>
              {badge && (
                <Badge 
                  variant={badge.variant || "outline"} 
                  className={badge.variant ? "" : "bg-primary/10 text-primary border-primary/20 font-medium"}
                >
                  {badge.text}
                </Badge>
              )}
            </div>
            {description && (
              <p className="mt-1 text-sm text-muted-foreground max-w-2xl">
                {description}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap justify-end">
          {/* Conteúdo extra (opcional) */}
          {extraContent}
          
          {/* Botão de ajuda com tooltip */}
          {showHelpButton && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 rounded-full"
                    onClick={onHelpClick}
                  >
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Ajuda e dicas</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          
          {/* Menu de opções adicionais */}
          {dropdownActions && dropdownActions.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-1">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only sm:ml-1">Opções</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {dropdownActions.map((action, index) => {
                  const ActionIcon = action.icon;
                  return (
                    <DropdownMenuItem 
                      key={index} 
                      className="cursor-pointer"
                      onClick={action.onClick}
                    >
                      <ActionIcon className="h-4 w-4 mr-2" />
                      {action.label}
                    </DropdownMenuItem>
                  );
                })}
                {dropdownActions.length > 1 && <DropdownMenuSeparator />}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          {/* Botão de ação primária */}
          {primaryAction && (
            <Button 
              size="sm" 
              className="h-9 gap-1 bg-primary hover:bg-primary/90 transition-colors"
              onClick={primaryAction.onClick}
            >
              {primaryAction.icon && <primaryAction.icon className="h-4 w-4" />}
              <span className="hidden sm:inline">{primaryAction.label}</span>
              <span className="sm:hidden">{primaryAction.shortLabel || primaryAction.label}</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
} 