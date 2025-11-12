"use client";

import React, { useState } from "react";
import { SidebarNavigation } from "@/app/components/ui/sidebar-navigation";
import { SidebarSection } from "@/app/components/ui/sidebar-navigation-types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  MessageSquare,
  Settings,
  HelpCircle,
  LogOut,
  Cpu,
  CreditCard,
  CalendarIcon,
  Receipt,
  Search,
  ClipboardCheck,
  Bell,
  Home,
  Briefcase,
} from "lucide-react";

export function SidebarExample() {
  const [variant, setVariant] = useState<"default" | "minimal" | "bordered">("default");
  const [collapsed, setCollapsed] = useState(false);
  const [showTooltips, setShowTooltips] = useState(true);
  const [showMobileTrigger, setShowMobileTrigger] = useState(true);

  // Exemplo de itens para a sidebar
  const sidebarItems: SidebarSection[] = [
    {
      title: "Principal",
      items: [
        {
          title: "Visão Geral",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Gerenciar Vagas",
          href: "/dashboard/jobs",
          icon: FileText,
          badge: {
            content: 8,
            variant: "default",
          },
        },
        {
          title: "Candidatos",
          href: "/dashboard/candidates",
          icon: Users,
          badge: {
            content: 24,
            variant: "secondary",
          },
        },
        {
          title: "Entrevistas",
          href: "/dashboard/interviews",
          icon: CalendarIcon,
        },
        {
          title: "Tarefas",
          href: "/dashboard/tasks",
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
          href: "/dashboard/ai-search",
          icon: Search,
        },
        {
          title: "Planos e Pacotes",
          href: "/dashboard/plans",
          icon: CreditCard,
        },
        {
          title: "Histórico Financeiro",
          href: "/dashboard/financial-history",
          icon: Receipt,
        },
      ],
    },
    {
      title: "Configurações",
      items: [
        {
          title: "Perfil da Empresa",
          href: "/dashboard/company",
          icon: Building2,
        },
        {
          title: "Mensagens",
          href: "/dashboard/messages",
          icon: MessageSquare,
          badge: {
            content: 5,
            variant: "destructive",
          },
        },
        {
          title: "Configurações",
          href: "/dashboard/settings",
          icon: Settings,
        },
        {
          title: "Ajuda & Suporte",
          href: "/dashboard/support",
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

  return (
    <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="relative">
        <SidebarNavigation
          items={sidebarItems}
          defaultCollapsed={collapsed}
          showMobileTrigger={showMobileTrigger}
          logo={logo}
          footer={customFooter}
          onLogout={() => alert("Logout clicked")}
          variant={variant}
          showTooltipsWhenCollapsed={showTooltips}
          collapsible={true}
        />
      </div>

      {/* Conteúdo de exemplo */}
      <div className="flex-1 overflow-auto p-4">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Configurações da Sidebar</CardTitle>
            <CardDescription>
              Personalize a aparência e o comportamento da sidebar de navegação
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="variant">Variante</Label>
                <Select 
                  value={variant} 
                  onValueChange={(value: "default" | "minimal" | "bordered") => setVariant(value)}
                >
                  <SelectTrigger id="variant">
                    <SelectValue placeholder="Selecione uma variante" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Padrão</SelectItem>
                    <SelectItem value="minimal">Minimalista</SelectItem>
                    <SelectItem value="bordered">Com Bordas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="collapsed">Recolhida por padrão</Label>
                  <Switch 
                    id="collapsed" 
                    checked={collapsed} 
                    onCheckedChange={setCollapsed} 
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="tooltips">Mostrar tooltips</Label>
                  <Switch 
                    id="tooltips" 
                    checked={showTooltips} 
                    onCheckedChange={setShowTooltips} 
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="mobile-trigger">Mostrar botão mobile</Label>
                  <Switch 
                    id="mobile-trigger" 
                    checked={showMobileTrigger} 
                    onCheckedChange={setShowMobileTrigger} 
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="prose max-w-none">
          <h2>Componente SidebarNavigation</h2>
          <p>
            Este é um componente reutilizável para navegação lateral em dashboards, 
            com suporte para múltiplas variantes visuais, recolhimento, seções, 
            badges, tooltips e muito mais.
          </p>

          <h3>Recursos</h3>
          <ul>
            <li>Sidebar recolhível com animações suaves</li>
            <li>Suporte para dispositivos móveis com menu deslizante</li>
            <li>Organização em seções</li>
            <li>Badges para indicar contadores ou status</li>
            <li>Tooltips para itens quando a sidebar está recolhida</li>
            <li>Múltiplas variantes visuais</li>
            <li>Suporte para logo e rodapé personalizado</li>
            <li>Indicação visual de item ativo</li>
          </ul>

          <h3>Como usar</h3>
          <p>
            Importe o componente e defina os itens da sidebar conforme necessário.
            Você pode personalizar a aparência e o comportamento através das props.
          </p>
        </div>
      </div>
    </div>
  );
} 