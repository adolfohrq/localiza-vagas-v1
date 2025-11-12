"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LucideIcon, ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface TabItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  href?: string;
  count?: number;
  badgeVariant?: "default" | "destructive" | "outline" | "secondary";
  isActive?: boolean;
  description?: string;
}

interface NavigationTabsProps {
  tabs: TabItem[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  variant?: "default" | "pills" | "underline" | "cards" | "modern";
  size?: "sm" | "md" | "lg";
  showTooltips?: boolean;
}

export function NavigationTabs({
  tabs,
  defaultValue,
  onChange,
  className = "",
  variant = "modern",
  size = "md",
  showTooltips = true,
}: NavigationTabsProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.id);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Verificar se pode rolar para esquerda/direita
  const checkScrollability = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      setCanScrollLeft(scrollContainer.scrollLeft > 0);
      setCanScrollRight(
        scrollContainer.scrollLeft < scrollContainer.scrollWidth - scrollContainer.clientWidth - 5
      );
    }
  };

  // Rolar para a esquerda
  const scrollLeft = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  // Rolar para a direita
  const scrollRight = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Verificar rolagem quando o componente montar ou quando as abas mudarem
  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, [tabs]);

  // Atualizar estado quando o valor padrão mudar
  useEffect(() => {
    if (defaultValue) {
      setActiveTab(defaultValue);
    }
  }, [defaultValue]);

  // Definindo classes com base no tamanho
  const sizeClasses = {
    sm: "h-8 text-xs",
    md: "h-10 text-sm",
    lg: "h-12 text-base",
  };

  // Definindo classes com base na variante
  const variantClasses = {
    default: "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary",
    pills: "rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
    underline: "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary",
    cards: "rounded-md border border-transparent hover:border-primary/20 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary/30 data-[state=active]:shadow-sm",
    modern: "rounded-lg border border-transparent hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/10 data-[state=active]:to-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:border-primary/20",
  };

  // Definindo classes para o container com base na variante
  const containerClasses = {
    default: "border-b",
    pills: "p-1 bg-muted/30 rounded-full",
    underline: "border-b",
    cards: "gap-2 p-1",
    modern: "gap-2 p-1 relative",
  };

  // Definindo classes para o TabsList com base na variante
  const tabsListClasses = {
    default: "justify-start bg-transparent",
    pills: "justify-start bg-transparent p-0",
    underline: "justify-start bg-transparent",
    cards: "justify-start bg-transparent gap-1 p-0 flex-wrap",
    modern: "justify-start bg-transparent gap-2 p-0 flex-nowrap",
  };

  return (
    <Tabs value={activeTab} onValueChange={(value) => {
      setActiveTab(value);
      if (onChange) onChange(value);
    }}>
      <div className={`${containerClasses[variant]} ${className} relative`}>
        {/* Botões de navegação para rolagem horizontal */}
        {variant === "modern" && (
          <>
            <AnimatePresence>
              {canScrollLeft && (
                <motion.button
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-1 shadow-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                  onClick={scrollLeft}
                  aria-label="Rolar para a esquerda"
                >
                  <ChevronLeft className="h-4 w-4" />
                </motion.button>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {canScrollRight && (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-1 shadow-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                  onClick={scrollRight}
                  aria-label="Rolar para a direita"
                >
                  <ChevronRight className="h-4 w-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </>
        )}

        <div
          className={`flex overflow-x-auto scrollbar-hide ${variant === "modern" ? "px-1 py-1 snap-x" : ""}`}
          ref={scrollContainerRef}
          onScroll={checkScrollability}
        >
          <TabsList className={`${tabsListClasses[variant]} w-full`}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;
            
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={`relative ${sizeClasses[size]} ${variantClasses[variant]} px-3 md:px-4 py-2 transition-all duration-200 group hover:bg-muted/50 ${variant === "modern" ? "snap-start flex-shrink-0" : ""}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (onChange) onChange(tab.id);
                  if (tab.href) {
                    // Se tiver href, deixamos o Link lidar com a navegação
                  }
                }}
                asChild={!!tab.href}
                data-tooltip={showTooltips && tab.description ? tab.description : undefined}
              >
                {tab.href ? (
                  <Link href={tab.href} className="flex items-center justify-center w-full h-full">
                    <motion.div 
                      className="flex items-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      layout
                    >
                      {Icon && (
                        <motion.span 
                          className="relative inline-flex"
                          initial={{ opacity: 0.8 }}
                          animate={{ opacity: 1 }}
                          whileHover={{ rotate: [0, -3, 3, -3, 0] }}
                          transition={{ duration: 0.4 }}
                        >
                          <Icon className={`${size === "sm" ? "h-3.5 w-3.5" : size === "lg" ? "h-5 w-5" : "h-4 w-4"} mr-1.5 md:mr-2 group-data-[state=active]:text-primary transition-all duration-200`} />
                        </motion.span>
                      )}
                      <span className="font-medium whitespace-nowrap">{tab.label}</span>
                      {typeof tab.count !== "undefined" && (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          <Badge 
                            variant={tab.badgeVariant || "default"} 
                            className={`ml-1.5 md:ml-2 text-xs px-1.5 py-0 min-h-[18px] min-w-[18px] flex items-center justify-center ${
                              tab.badgeVariant === "destructive" 
                                ? "group-hover:animate-pulse" 
                                : variant === "pills" && isActive
                                  ? "bg-primary-foreground/20 text-primary-foreground"
                                  : variant === "cards" && isActive
                                    ? "bg-primary/20 text-primary"
                                    : variant === "modern" && isActive
                                      ? "bg-primary/20 text-primary"
                                      : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                            } transition-all duration-200`}
                          >
                            {tab.count}
                          </Badge>
                        </motion.div>
                      )}
                    </motion.div>
                    {showTooltips && tab.description && (
                      <AnimatePresence>
                        <motion.div 
                          className="absolute invisible md:group-hover:visible opacity-0 md:group-hover:opacity-100 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-black/80 backdrop-blur-sm text-white text-xs rounded-md whitespace-nowrap z-50 shadow-md"
                          initial={{ opacity: 0, y: 10 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {tab.description}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/80"></div>
                        </motion.div>
                      </AnimatePresence>
                    )}
                  </Link>
                ) : (
                  <motion.div 
                    className="flex items-center justify-center w-full h-full relative"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    layout
                  >
                    {Icon && (
                      <motion.span 
                        className="relative inline-flex"
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ rotate: [0, -3, 3, -3, 0] }}
                        transition={{ duration: 0.4 }}
                      >
                        <Icon className={`${size === "sm" ? "h-3.5 w-3.5" : size === "lg" ? "h-5 w-5" : "h-4 w-4"} mr-1.5 md:mr-2 group-data-[state=active]:text-primary transition-all duration-200`} />
                      </motion.span>
                    )}
                    <span className="font-medium whitespace-nowrap">{tab.label}</span>
                    {typeof tab.count !== "undefined" && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <Badge 
                          variant={tab.badgeVariant || "default"} 
                          className={`ml-1.5 md:ml-2 text-xs px-1.5 py-0 min-h-[18px] min-w-[18px] flex items-center justify-center ${
                            tab.badgeVariant === "destructive" 
                              ? "group-hover:animate-pulse" 
                              : variant === "pills" && isActive
                                ? "bg-primary-foreground/20 text-primary-foreground"
                                : variant === "cards" && isActive
                                  ? "bg-primary/20 text-primary"
                                  : variant === "modern" && isActive
                                    ? "bg-primary/20 text-primary"
                                    : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                          } transition-all duration-200`}
                        >
                          {tab.count}
                        </Badge>
                      </motion.div>
                    )}
                    {showTooltips && tab.description && (
                      <AnimatePresence>
                        <motion.div 
                          className="absolute invisible md:group-hover:visible opacity-0 md:group-hover:opacity-100 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-black/80 backdrop-blur-sm text-white text-xs rounded-md whitespace-nowrap z-50 shadow-md"
                          initial={{ opacity: 0, y: 10 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {tab.description}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/80"></div>
                        </motion.div>
                      </AnimatePresence>
                    )}
                  </motion.div>
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>
    </div>
    </Tabs>
  );
} 