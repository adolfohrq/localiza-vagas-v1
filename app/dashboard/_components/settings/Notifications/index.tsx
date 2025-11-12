"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmailNotifications } from "./EmailNotifications";
import { PushNotifications } from "./PushNotifications";
import { DeviceNotifications } from "./DeviceNotifications";

export function NotificationsSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Configurações de Notificações</h3>
        <p className="text-sm text-muted-foreground">
          Gerencie como você recebe notificações e alertas da plataforma
        </p>
      </div>
      <Tabs defaultValue="email" className="space-y-4">
        <TabsList>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="push">Push</TabsTrigger>
          <TabsTrigger value="device">Dispositivo</TabsTrigger>
        </TabsList>
        <TabsContent value="email" className="space-y-4">
          <EmailNotifications />
        </TabsContent>
        <TabsContent value="push" className="space-y-4">
          <PushNotifications />
        </TabsContent>
        <TabsContent value="device" className="space-y-4">
          <DeviceNotifications />
        </TabsContent>
      </Tabs>
    </div>
  );
} 