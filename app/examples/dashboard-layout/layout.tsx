"use client";

import React from "react";
import { SidebarNavigation } from "@/app/components/ui/sidebar-navigation";
import { SidebarSection } from "@/app/components/ui/sidebar-navigation-types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, Briefcase } from "lucide-react";
import Link from "next/link";
import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  MessageSquare,
  Settings,
  HelpCircle,
  CalendarIcon,
  ClipboardCheck,
  Search,
  CreditCard,
  Receipt,
} from "lucide-react";

// Exemplo de itens para a sidebar
const sidebarItems: SidebarSection[] = [
  {
    title: "Principal",
    items: [
      {
        title: "Visão Geral",
        href: "/examples/dashboard-layout",
        icon: LayoutDashboard,
      },
      {
        title: "Gerenciar Vagas",
        href: "/examples/dashboard-layout/jobs",
        icon: FileText,
        badge: {
          content: 8,
          variant: "default",
        },
      },
      {
        title: "Candidatos",
        href: "/examples/dashboard-layout/candidates",
        icon: Users,
        badge: {
          content: 24,
          variant: "secondary",
        },
      },
      {
        title: "Entrevistas",
        href: "/examples/dashboard-layout/interviews",
        icon: CalendarIcon,
      },
      {
        title: "Tarefas",
        href: "/examples/dashboard-layout/tasks",
        icon: ClipboardCheck,
        badge: {
          content: 3,
          variant: "destructive",
        },
      },
    ],
  },
  {
    title: "Ferramentas",
    items: [
      {
        title: "Busca por IA",
        href: "/examples/dashboard-layout/ai-search",
        icon: Search,
      },
      {
        title: "Planos e Pacotes",
        href: "/examples/dashboard-layout/plans",
        icon: CreditCard,
      },
      {
        title: "Histórico Financeiro",
        href: "/examples/dashboard-layout/financial-history",
        icon: Receipt,
      },
    ],
  },
  {
    title: "Configurações",
    items: [
      {
        title: "Perfil da Empresa",
        href: "/examples/dashboard-layout/company",
        icon: Building2,
      },
      {
        title: "Mensagens",
        href: "/examples/dashboard-layout/messages",
        icon: MessageSquare,
        badge: {
          content: 5,
          variant: "destructive",
        },
      },
      {
        title: "Configurações",
        href: "/examples/dashboard-layout/settings",
        icon: Settings,
      },
      {
        title: "Ajuda & Suporte",
        href: "/examples/dashboard-layout/support",
        icon: HelpCircle,
      },
    ],
  },
];

// Exemplo de logo
const logo = (
  <div className="flex items-center space-x-2">
    <Briefcase className="h-6 w-6 text-primary" />
    <span className="text-xl font-bold">JobDash</span>
  </div>
);

// Exemplo de footer personalizado
const customFooter = (
  <div className="flex items-center space-x-3">
    <Avatar className="h-9 w-9">
      <AvatarImage src="/placeholder.svg" alt="Avatar" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
    <div className="space-y-0.5">
      <p className="text-sm font-medium">João Silva</p>
      <p className="text-xs text-muted-foreground">joao@empresa.com</p>
    </div>
  </div>
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-primary">LOCALIZA</span>
              <span className="text-xl font-bold text-gray-600">VAGAS</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                3
              </span>
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt="Nobre Lobo" />
              <AvatarFallback>NL</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex-1 items-start md:grid md:grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <SidebarNavigation
          items={sidebarItems}
          logo={logo}
          footer={customFooter}
          onLogout={() => alert("Logout clicked")}
          variant="default"
          showTooltipsWhenCollapsed={true}
          collapsible={true}
        />

        {/* Main Content */}
        <main className="flex w-full flex-col overflow-hidden p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 