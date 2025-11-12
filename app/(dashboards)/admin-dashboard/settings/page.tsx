"use client"

import { AdminDashboardShell } from "@/components/admin-dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function SettingsPage() {
  return (
    <AdminDashboardShell>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Configurações</h2>
          <p className="text-muted-foreground">Gerencie as configurações da plataforma</p>
        </div>
        <Button>Salvar Alterações</Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="appearance">Aparência</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>Configure as informações básicas da plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Nome do Site</Label>
                <Input id="site-name" defaultValue="Localiza Vagas" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Descrição do Site</Label>
                <Textarea
                  id="site-description"
                  defaultValue="Plataforma de empregos conectando talentos às melhores oportunidades"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email de Contato</Label>
                <Input id="contact-email" type="email" defaultValue="contato@localizavagas.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Fuso Horário</Label>
                <Select defaultValue="America/Sao_Paulo">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o fuso horário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/Sao_Paulo">América/São Paulo (UTC-3)</SelectItem>
                    <SelectItem value="America/New_York">América/Nova York (UTC-4)</SelectItem>
                    <SelectItem value="Europe/London">Europa/Londres (UTC+1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Aparência</CardTitle>
              <CardDescription>Personalize a aparência da plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tema</Label>
                <Select defaultValue="light">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Claro</SelectItem>
                    <SelectItem value="dark">Escuro</SelectItem>
                    <SelectItem value="system">Sistema</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Cor Primária</Label>
                <div className="grid grid-cols-5 gap-2">
                  {["blue", "green", "red", "purple", "orange"].map((color) => (
                    <div
                      key={color}
                      className="h-10 w-full cursor-pointer rounded-md border"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="custom-fonts" />
                <Label htmlFor="custom-fonts">Usar fontes personalizadas</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
              <CardDescription>Configure as notificações do sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Novas Candidaturas</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações quando novos candidatos se inscreverem
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Novos Usuários</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações quando novos usuários se registrarem
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Novas Empresas</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações quando novas empresas se registrarem
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>Configure as opções de segurança da plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Autenticação em Duas Etapas</Label>
                    <p className="text-sm text-muted-foreground">Requer verificação adicional ao fazer login</p>
                  </div>
                  <Switch />
                </div>
                <div className="space-y-2">
                  <Label>Política de Senhas</Label>
                  <Select defaultValue="strong">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a política" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Básica</SelectItem>
                      <SelectItem value="strong">Forte</SelectItem>
                      <SelectItem value="custom">Personalizada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tempo de Sessão (minutos)</Label>
                  <Input type="number" defaultValue="60" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>Configurações da API</CardTitle>
              <CardDescription>Gerencie as configurações da API</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Chave da API</Label>
                <div className="flex space-x-2">
                  <Input defaultValue="sk_live_..." type="password" />
                  <Button variant="outline">Gerar Nova</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Webhook URL</Label>
                <Input placeholder="https://seu-dominio.com/webhook" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="api-logs" />
                <Label htmlFor="api-logs">Habilitar logs da API</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminDashboardShell>
  )
}

