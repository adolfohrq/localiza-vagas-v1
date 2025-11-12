"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Menu, ChevronRight, ChevronLeft, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SidebarItem, SidebarSection } from "@/app/components/ui/sidebar-navigation-types";

interface SidebarNavigationProps {
  items: SidebarSection[];
  defaultCollapsed?: boolean;
  showMobileTrigger?: boolean;
  logo?: React.ReactNode;
  footer?: React.ReactNode;
  onLogout?: () => void;
  className?: string;
  collapsible?: boolean;
  variant?: "default" | "minimal" | "bordered";
  showTooltipsWhenCollapsed?: boolean;
}

export function SidebarNavigation({
  items,
  defaultCollapsed = false,
  showMobileTrigger = true,
  logo,
  footer,
  onLogout,
  className = "",
  collapsible = true,
  variant = "default",
  showTooltipsWhenCollapsed = true,
}: SidebarNavigationProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  // Variantes de estilo para o sidebar
  const sidebarVariants = {
    default: "bg-white border-r",
    minimal: "bg-background/50 backdrop-blur-sm",
    bordered: "bg-white border-r border-r-2 border-r-primary/10",
  };

  // Variantes de estilo para os itens
  const itemVariants = {
    default: "hover:bg-accent hover:text-accent-foreground",
    minimal: "hover:bg-primary/10 hover:text-primary",
    bordered: "hover:bg-accent hover:text-accent-foreground border-l-2 border-transparent data-[active=true]:border-l-primary",
  };

  // Variantes de estilo para itens ativos
  const activeItemVariants = {
    default: "bg-accent text-accent-foreground",
    minimal: "bg-primary/10 text-primary font-medium",
    bordered: "bg-accent/50 text-accent-foreground border-l-primary",
  };

  return (
    <>
      {/* Versão para desktop */}
      <aside 
        className={cn(
          "hidden md:flex flex-col h-[calc(100vh-3.5rem)] transition-all duration-300 ease-in-out",
          sidebarVariants[variant],
          collapsed ? "w-[70px]" : "w-[240px]",
          className
        )}
      >
        {/* Logo e botão de colapso */}
        <div className="flex items-center justify-between p-4 h-14 border-b">
          {!collapsed && logo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 overflow-hidden"
            >
              {logo}
            </motion.div>
          )}
          
          {collapsible && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setCollapsed(!collapsed)}
              className="ml-auto"
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          )}
        </div>
        
        {/* Área de navegação com scroll */}
        <ScrollArea className="flex-1 py-2">
          <nav className="grid items-start gap-1 px-2">
            {items.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-1">
                {!collapsed && section.title && (
                  <h4 className="text-xs font-semibold text-muted-foreground px-4 py-2">
                    {section.title}
                  </h4>
                )}
                
                {section.items.map((item: SidebarItem, itemIndex: number) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
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
                              collapsed ? "justify-center" : "justify-start"
                            )}
                            data-active={isActive}
                          >
                            {Icon && (
                              <Icon className={cn(
                                "flex-shrink-0",
                                collapsed ? "h-5 w-5" : "h-4 w-4 mr-2"
                              )} />
                            )}
                            
                            {!collapsed && (
                              <span className="flex-1 truncate">{item.title}</span>
                            )}
                            
                            {!collapsed && item.badge && (
                              <Badge 
                                variant={item.badge.variant || "default"} 
                                className="ml-auto"
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
                                className="ml-2"
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
        <div className="mt-auto border-t p-4">
          {!collapsed && footer ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {footer}
            </motion.div>
          ) : onLogout ? (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size={collapsed ? "icon" : "default"} 
                    onClick={onLogout}
                    className={cn(
                      "w-full justify-start text-sm font-medium hover:bg-destructive/10 hover:text-destructive transition-all duration-200",
                      collapsed ? "px-0" : "px-3"
                    )}
                  >
                    <LogOut className={cn(
                      "flex-shrink-0",
                      collapsed ? "h-5 w-5" : "h-4 w-4 mr-2"
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
          ) : null}
        </div>
      </aside>
      
      {/* Versão para mobile (Sheet) */}
      {showMobileTrigger && (
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden fixed left-4 top-4 z-40"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[280px] p-0">
            <div className="flex flex-col h-full">
              {/* Logo */}
              <div className="flex items-center p-4 h-14 border-b">
                {logo}
              </div>
              
              {/* Área de navegação com scroll */}
              <ScrollArea className="flex-1 py-2">
                <nav className="grid items-start gap-1 px-2">
                  {items.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="space-y-1">
                      {section.title && (
                        <h4 className="text-xs font-semibold text-muted-foreground px-4 py-2">
                          {section.title}
                        </h4>
                      )}
                      
                      {section.items.map((item: SidebarItem, itemIndex: number) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        
                        return (
                          <Link
                            key={itemIndex}
                            href={item.href}
                            className={cn(
                              "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                              itemVariants[variant],
                              isActive ? activeItemVariants[variant] : ""
                            )}
                            data-active={isActive}
                          >
                            {Icon && (
                              <Icon className="h-4 w-4 mr-2" />
                            )}
                            <span className="flex-1 truncate">{item.title}</span>
                            {item.badge && (
                              <Badge 
                                variant={item.badge.variant || "default"} 
                                className="ml-auto"
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
              <div className="mt-auto border-t p-4">
                {footer ? (
                  footer
                ) : onLogout ? (
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-sm font-medium hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
                    onClick={onLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Sair</span>
                  </Button>
                ) : null}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
} 