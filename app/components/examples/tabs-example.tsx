"use client";

import React, { useState } from "react";
import { NavigationTabs, TabItem } from "@/app/components/ui/navigation-tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Settings, Users, Bell, FileText, Briefcase, CheckCircle, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function TabsExample() {
  const [activeVariant, setActiveVariant] = useState<"default" | "pills" | "underline" | "cards">("default");
  const [activeSize, setActiveSize] = useState<"sm" | "md" | "lg">("md");
  const [showTooltips, setShowTooltips] = useState(true);
  const [activeTab, setActiveTab] = useState("home");

  // Dados simulados para estatísticas
  const stats = {
    home: 12,
    settings: 5,
    users: 24,
    notifications: 8,
    documents: 16
  };

  // Exemplo de tabs para demonstração
  const demoTabs: TabItem[] = [
    {
      id: "home",
      label: "Início",
      icon: Home,
      count: stats.home,
      description: "Página inicial do dashboard"
    },
    {
      id: "settings",
      label: "Configurações",
      icon: Settings,
      count: stats.settings,
      description: "Ajuste as configurações do sistema"
    },
    {
      id: "users",
      label: "Usuários",
      icon: Users,
      count: stats.users,
      description: "Gerencie os usuários da plataforma"
    },
    {
      id: "notifications",
      label: "Notificações",
      icon: Bell,
      count: stats.notifications,
      badgeVariant: "destructive",
      description: "Visualize suas notificações pendentes"
    },
    {
      id: "documents",
      label: "Documentos",
      icon: FileText,
      count: stats.documents,
      badgeVariant: "secondary",
      description: "Acesse seus documentos"
    },
  ];

  // Exemplo de tabs para vagas
  const jobTabs: TabItem[] = [
    {
      id: "all",
      label: "Todas",
      icon: Briefcase,
      count: 15,
      description: "Visualize todas as suas vagas"
    },
    {
      id: "active",
      label: "Ativas",
      icon: CheckCircle,
      count: 8,
      description: "Vagas que estão ativamente recebendo candidaturas"
    },
    {
      id: "draft",
      label: "Rascunhos",
      icon: FileText,
      count: 3,
      description: "Vagas que ainda não foram publicadas"
    },
    {
      id: "closed",
      label: "Encerradas",
      icon: XCircle,
      count: 2,
      badgeVariant: "secondary",
      description: "Vagas que foram encerradas manualmente"
    },
    {
      id: "expired",
      label: "Expiradas",
      icon: Clock,
      count: 2,
      badgeVariant: "destructive",
      description: "Vagas que expiraram automaticamente"
    },
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Exemplos de NavigationTabs</CardTitle>
          <CardDescription>
            Demonstração das diferentes variantes e tamanhos do componente NavigationTabs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <div>
              <p className="text-sm font-medium mb-2">Variante</p>
              <Select value={activeVariant} onValueChange={(value: any) => setActiveVariant(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione a variante" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="pills">Pills</SelectItem>
                  <SelectItem value="underline">Underline</SelectItem>
                  <SelectItem value="cards">Cards</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2">Tamanho</p>
              <Select value={activeSize} onValueChange={(value: any) => setActiveSize(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione o tamanho" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sm">Pequeno</SelectItem>
                  <SelectItem value="md">Médio</SelectItem>
                  <SelectItem value="lg">Grande</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2">Tooltips</p>
              <Button 
                variant={showTooltips ? "default" : "outline"} 
                onClick={() => setShowTooltips(!showTooltips)}
              >
                {showTooltips ? "Desativar Tooltips" : "Ativar Tooltips"}
              </Button>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Exemplo de Navegação</h3>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <NavigationTabs
                  variant={activeVariant}
                  size={activeSize}
                  showTooltips={showTooltips}
                  tabs={demoTabs}
                  defaultValue={activeTab}
                  onChange={setActiveTab}
                />
                
                <div className="mt-4 p-4 border rounded-md">
                  <TabsContent value="home">
                    <h4 className="text-lg font-medium">Página Inicial</h4>
                    <p className="text-muted-foreground">Conteúdo da página inicial</p>
                  </TabsContent>
                  <TabsContent value="settings">
                    <h4 className="text-lg font-medium">Configurações</h4>
                    <p className="text-muted-foreground">Conteúdo das configurações</p>
                  </TabsContent>
                  <TabsContent value="users">
                    <h4 className="text-lg font-medium">Usuários</h4>
                    <p className="text-muted-foreground">Conteúdo da página de usuários</p>
                  </TabsContent>
                  <TabsContent value="notifications">
                    <h4 className="text-lg font-medium">Notificações</h4>
                    <p className="text-muted-foreground">Conteúdo das notificações</p>
                  </TabsContent>
                  <TabsContent value="documents">
                    <h4 className="text-lg font-medium">Documentos</h4>
                    <p className="text-muted-foreground">Conteúdo dos documentos</p>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Exemplo de Vagas</h3>
              <NavigationTabs
                variant={activeVariant}
                size={activeSize}
                showTooltips={showTooltips}
                tabs={jobTabs}
                defaultValue="all"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Variante: Default</h3>
              <NavigationTabs
                variant="default"
                size={activeSize}
                showTooltips={showTooltips}
                tabs={demoTabs.slice(0, 3)}
                defaultValue="home"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Variante: Pills</h3>
              <NavigationTabs
                variant="pills"
                size={activeSize}
                showTooltips={showTooltips}
                tabs={demoTabs.slice(0, 3)}
                defaultValue="home"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Variante: Underline</h3>
              <NavigationTabs
                variant="underline"
                size={activeSize}
                showTooltips={showTooltips}
                tabs={demoTabs.slice(0, 3)}
                defaultValue="home"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Variante: Cards</h3>
              <NavigationTabs
                variant="cards"
                size={activeSize}
                showTooltips={showTooltips}
                tabs={demoTabs.slice(0, 3)}
                defaultValue="home"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Tamanho: Pequeno</h3>
              <NavigationTabs
                variant={activeVariant}
                size="sm"
                showTooltips={showTooltips}
                tabs={demoTabs.slice(0, 3)}
                defaultValue="home"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Tamanho: Médio</h3>
              <NavigationTabs
                variant={activeVariant}
                size="md"
                showTooltips={showTooltips}
                tabs={demoTabs.slice(0, 3)}
                defaultValue="home"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Tamanho: Grande</h3>
              <NavigationTabs
                variant={activeVariant}
                size="lg"
                showTooltips={showTooltips}
                tabs={demoTabs.slice(0, 3)}
                defaultValue="home"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 