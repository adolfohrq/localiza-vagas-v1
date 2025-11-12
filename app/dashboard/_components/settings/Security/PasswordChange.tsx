"use client";

import { useState } from "react";
import { Eye, EyeOff, CheckCircle2, Info } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

export function PasswordChange() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSavePassword = async () => {
    setSaving(true);
    try {
      // Simulação de requisição de salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Senha atualizada",
        description: "Sua senha foi alterada com sucesso",
      });
      
      // Limpar campos após sucesso
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast({
        title: "Erro ao atualizar senha",
        description: "Ocorreu um erro ao tentar atualizar sua senha",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alterar Senha</CardTitle>
        <CardDescription>Atualize sua senha para manter sua conta segura</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="current-password">Senha Atual</Label>
          <div className="relative">
            <Input 
              id="current-password" 
              type={passwordVisible ? "text" : "password"} 
              placeholder="Digite sua senha atual"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <button 
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label={passwordVisible ? "Esconder senha" : "Mostrar senha"}
            >
              {passwordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-password">Nova Senha</Label>
          <div className="relative">
            <Input 
              id="new-password" 
              type={passwordVisible ? "text" : "password"} 
              placeholder="Digite sua nova senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className={cn(
            "text-xs flex items-center gap-1",
            newPassword.length >= 8 ? "text-green-600" : "text-muted-foreground"
          )}>
            <CheckCircle2 className={cn("h-3 w-3", newPassword.length >= 8 ? "opacity-100" : "opacity-50")} />
            Mínimo de 8 caracteres
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
          <div className="relative">
            <Input 
              id="confirm-password" 
              type={passwordVisible ? "text" : "password"} 
              placeholder="Confirme sua nova senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {confirmPassword && (
            <div className={cn(
              "text-xs flex items-center gap-1", 
              newPassword === confirmPassword ? "text-green-600" : "text-red-500"
            )}>
              {newPassword === confirmPassword ? (
                <>
                  <CheckCircle2 className="h-3 w-3" />
                  Senhas coincidem
                </>
              ) : (
                <>
                  <Info className="h-3 w-3" />
                  Senhas não coincidem
                </>
              )}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSavePassword} 
          disabled={saving || !currentPassword || !newPassword || newPassword !== confirmPassword || newPassword.length < 8}
        >
          {saving ? "Salvando..." : "Alterar Senha"}
        </Button>
      </CardFooter>
    </Card>
  );
} 