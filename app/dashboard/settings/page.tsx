"use client"

import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Bell, 
  Shield, 
  Globe, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Info,
  Settings,
  Download,
  Share2,
  HelpCircle,
  FileText
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { NotificationsSettings } from "../_components/settings/Notifications"

// Importando o componente PageHeader e o tipo PageHeaderAction
import { PageHeader, PageHeaderAction } from "@/components/ui/page-header"

export default function SettingsPage() {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [saving, setSaving] = useState(false)
  
  // Definindo as ações do dropdown como um array de PageHeaderAction
  const dropdownActions: PageHeaderAction[] = [
    {
      label: "Exportar configurações",
      icon: Download,
      onClick: () => console.log("Exportar configurações")
    },
    {
      label: "Importar configurações",
      icon: FileText,
      onClick: () => console.log("Importar configurações")
    },
    {
      label: "Compartilhar preferências",
      icon: Share2,
      onClick: () => console.log("Compartilhar preferências")
    }
  ];
  
  const handleSavePassword = () => {
    if (!currentPassword) {
      toast({
        title: "Senha atual é obrigatória",
        description: "Por favor, digite sua senha atual para confirmar a mudança",
        variant: "destructive",
      })
      return
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Senhas não coincidem",
        description: "A nova senha e a confirmação devem ser idênticas",
        variant: "destructive",
      })
      return
    }
    
    if (newPassword.length < 8) {
      toast({
        title: "Senha muito curta",
        description: "Sua nova senha deve ter pelo menos 8 caracteres",
        variant: "destructive",
      })
      return
    }
    
    // Simulação do processo de salvamento
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      toast({
        title: "Senha alterada com sucesso",
        description: "Sua senha foi atualizada com segurança",
        variant: "default",
      })
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    }, 1500)
  }

  return (
    <DashboardShell>
      <PageHeader 
        title="Configurações"
        description="Gerencie suas preferências e configurações da conta"
        icon={Settings}
        dropdownActions={dropdownActions}
        showHelpButton={true}
        onHelpClick={() => console.log("Ajuda sobre configurações")}
      />
      
      <Tabs defaultValue="security" className="space-y-4">
        <div className="border-b">
          <div className="flex overflow-x-auto">
            <TabsList className="justify-start">
              <TabsTrigger 
                value="security" 
                className="relative h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary px-4 transition-all"
              >
                <Shield className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Segurança</span>
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="relative h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary px-4 transition-all"
              >
                <Bell className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Notificações</span>
              </TabsTrigger>
              <TabsTrigger 
                value="preferences" 
                className="relative h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary px-4 transition-all"
              >
                <Globe className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Preferências</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
        
        {/* Seção de Segurança */}
        <TabsContent value="security" className="space-y-4 mt-4">
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
        </TabsContent>
        
        {/* Seção de Notificações */}
        <TabsContent value="notifications" className="space-y-4 mt-4">
          <NotificationsSettings />
        </TabsContent>
        
        {/* Seção de Preferências */}
        <TabsContent value="preferences" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Idioma e Região</CardTitle>
              <CardDescription>Configure suas preferências de idioma e região</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="language">Idioma</Label>
                <Select defaultValue="pt-BR">
                  <SelectTrigger id="language" className="w-full">
                    <SelectValue placeholder="Selecione um idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Fuso Horário</Label>
                <Select defaultValue="america-sp">
                  <SelectTrigger id="timezone" className="w-full">
                    <SelectValue placeholder="Selecione um fuso horário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="america-sp">América/São Paulo (UTC-3)</SelectItem>
                    <SelectItem value="america-ny">América/New York (UTC-4)</SelectItem>
                    <SelectItem value="europe-london">Europa/Londres (UTC+1)</SelectItem>
                    <SelectItem value="asia-tokyo">Ásia/Tóquio (UTC+9)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => {
                toast({
                  title: "Preferências atualizadas",
                  description: "Suas configurações regionais foram salvas",
                })
              }}>Salvar Preferências</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

