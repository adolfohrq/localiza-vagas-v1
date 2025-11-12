"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function TwoFactorAuth() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Verificação em Duas Etapas</CardTitle>
        <CardDescription>Adicione uma camada extra de segurança à sua conta</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Autenticação em Duas Etapas</Label>
            <p className="text-sm text-muted-foreground">Proteja sua conta com um código adicional ao fazer login</p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Switch id="2fa-enabled" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Ativar verificação em duas etapas</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
} 