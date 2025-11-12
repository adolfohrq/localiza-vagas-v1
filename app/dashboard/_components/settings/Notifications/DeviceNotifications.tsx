"use client";

import { Smartphone } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

export function DeviceNotifications() {
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
          <Smartphone className="h-5 w-5" />
          Notificações no Dispositivo
        </CardTitle>
        <CardDescription>Configure como você recebe alertas enquanto usa a plataforma</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="notifications-browser">Notificações no navegador</Label>
              <p className="text-sm text-muted-foreground">Receba alertas mesmo quando estiver em outra aba</p>
            </div>
            <Switch id="notifications-browser" defaultChecked onCheckedChange={handleToggleNotification} />
          </div>
          <Separator />
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="notifications-sound">Sons de notificação</Label>
              <p className="text-sm text-muted-foreground">Reproduzir um som quando receber novas notificações</p>
            </div>
            <Switch id="notifications-sound" defaultChecked onCheckedChange={handleToggleNotification} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 