"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

export function EmailNotifications() {
  const handleToggleNotification = () => {
    toast({
      title: "Configurações atualizadas",
      description: "Suas preferências de notificação foram salvas",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Notificações por Email
        </CardTitle>
        <CardDescription>Gerencie quais emails você deseja receber</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-6">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="notifications-candidates">Candidatos</Label>
              <p className="text-sm text-muted-foreground">Receba notificações sobre novos candidatos e atualizações de status</p>
            </div>
            <Switch id="notifications-candidates" defaultChecked onCheckedChange={handleToggleNotification} />
          </div>
          <Separator />
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="notifications-messages">Mensagens</Label>
              <p className="text-sm text-muted-foreground">Seja notificado quando receber novas mensagens</p>
            </div>
            <Switch id="notifications-messages" defaultChecked onCheckedChange={handleToggleNotification} />
          </div>
          <Separator />
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="notifications-jobs">Vagas de Emprego</Label>
              <p className="text-sm text-muted-foreground">Atualizações sobre suas vagas publicadas</p>
            </div>
            <Switch id="notifications-jobs" defaultChecked onCheckedChange={handleToggleNotification} />
          </div>
          <Separator />
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="notifications-marketing">Marketing</Label>
              <p className="text-sm text-muted-foreground">Receba dicas, novidades e ofertas especiais</p>
            </div>
            <Switch id="notifications-marketing" onCheckedChange={handleToggleNotification} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 