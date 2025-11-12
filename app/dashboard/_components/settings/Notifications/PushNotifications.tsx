"use client";

import { Bell } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

export function PushNotifications() {
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
          <Bell className="h-5 w-5" />
          Notificações Push
        </CardTitle>
        <CardDescription>Configure como você recebe notificações push no seu dispositivo</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="push-candidates">Candidatos</Label>
              <p className="text-sm text-muted-foreground">Receba notificações sobre novos candidatos e atualizações</p>
            </div>
            <Switch id="push-candidates" defaultChecked onCheckedChange={handleToggleNotification} />
          </div>
          <Separator />
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="push-messages">Mensagens</Label>
              <p className="text-sm text-muted-foreground">Receba notificações sobre novas mensagens</p>
            </div>
            <Switch id="push-messages" defaultChecked onCheckedChange={handleToggleNotification} />
          </div>
          <Separator />
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="push-jobs">Atualizações de vagas</Label>
              <p className="text-sm text-muted-foreground">Receba notificações sobre atualizações nas suas vagas</p>
            </div>
            <Switch id="push-jobs" defaultChecked onCheckedChange={handleToggleNotification} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 