"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function ActiveSessions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sessões Ativas</CardTitle>
        <CardDescription>Gerencie os dispositivos conectados à sua conta</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Chrome em Windows 10</p>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>
                Este dispositivo • São Paulo, Brasil
              </div>
            </div>
            <Button variant="outline" size="sm">Desconectar</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Safari em iPhone 13</p>
              <div className="text-sm text-muted-foreground">Última atividade: Hoje às 10:42</div>
            </div>
            <Button variant="outline" size="sm">Desconectar</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 