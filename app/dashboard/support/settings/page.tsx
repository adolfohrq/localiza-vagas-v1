"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Save, Users, Bell, Shield, Tag, Mail, MessageSquare } from "lucide-react"

export default function TicketSettingsPage() {
  const router = useRouter()
  
  // Estados para as configurações
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [autoAssign, setAutoAssign] = useState(true)
  const [defaultPriority, setDefaultPriority] = useState("média")
  const [autoCloseAfterDays, setAutoCloseAfterDays] = useState("7")
  const [requireUserFeedback, setRequireUserFeedback] = useState(true)
  const [allowFileAttachments, setAllowFileAttachments] = useState(true)
  const [maxFileSize, setMaxFileSize] = useState("10")
  const [allowedFileTypes, setAllowedFileTypes] = useState("jpg,png,pdf,doc,docx,xls,xlsx")
  const [customCategories, setCustomCategories] = useState("Currículo,Candidatura,Documentos,Notificações,Sugestão,Outro")
  const [emailTemplate, setEmailTemplate] = useState(
    "Olá {nome},\n\nRecebemos seu ticket #{ticket_id} com o assunto \"{assunto}\".\n\nNossa equipe já está analisando sua solicitação e responderemos o mais breve possível.\n\nAtenciosamente,\nEquipe de Suporte ao Candidato"
  )
  
  // Função para salvar configurações
  const saveSettings = () => {
    // Em um ambiente real, isso enviaria os dados para uma API
    console.log("Configurações salvas")
    // Simulação de salvamento bem-sucedido
    alert("Configurações salvas com sucesso!")
  }

  return (
    <DashboardShell>
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.push('/candidate-dashboard/support')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Configurações do Sistema de Tickets</h2>
          <p className="text-muted-foreground">Personalize o funcionamento do seu suporte</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="categories">Categorias</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>
                Configure o comportamento básico do sistema de tickets
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Atribuição Automática</Label>
                  <p className="text-sm text-muted-foreground">
                    Atribuir tickets automaticamente aos agentes disponíveis
                  </p>
                </div>
                <Switch 
                  checked={autoAssign} 
                  onCheckedChange={setAutoAssign} 
                />
              </div>
              
              <Separator />
              
              <div className="grid gap-2">
                <Label htmlFor="defaultPriority">Prioridade Padrão</Label>
                <Select value={defaultPriority} onValueChange={setDefaultPriority}>
                  <SelectTrigger id="defaultPriority">
                    <SelectValue placeholder="Selecione a prioridade padrão" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baixa">Baixa</SelectItem>
                    <SelectItem value="média">Média</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Prioridade atribuída automaticamente aos novos tickets
                </p>
              </div>
              
              <Separator />
              
              <div className="grid gap-2">
                <Label htmlFor="autoCloseAfterDays">Fechamento Automático (dias)</Label>
                <Input 
                  id="autoCloseAfterDays" 
                  value={autoCloseAfterDays} 
                  onChange={(e) => setAutoCloseAfterDays(e.target.value)}
                  type="number"
                  min="1"
                  max="30"
                />
                <p className="text-sm text-muted-foreground">
                  Número de dias após os quais tickets resolvidos serão fechados automaticamente
                </p>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Feedback do Candidato</Label>
                  <p className="text-sm text-muted-foreground">
                    Solicitar feedback do candidato após a resolução do ticket
                  </p>
                </div>
                <Switch 
                  checked={requireUserFeedback} 
                  onCheckedChange={setRequireUserFeedback} 
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Salvar Configurações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
              <CardDescription>
                Gerencie como e quando as notificações são enviadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações por Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Enviar notificações por email para candidatos
                  </p>
                </div>
                <Switch 
                  checked={emailNotifications} 
                  onCheckedChange={setEmailNotifications} 
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>Eventos para Notificação</Label>
                <div className="grid gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="notifyNewTicket" defaultChecked />
                    <Label htmlFor="notifyNewTicket">Novo ticket criado</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notifyResponse" defaultChecked />
                    <Label htmlFor="notifyResponse">Nova resposta adicionada</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notifyStatusChange" defaultChecked />
                    <Label htmlFor="notifyStatusChange">Alteração de status</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notifyResolution" defaultChecked />
                    <Label htmlFor="notifyResolution">Ticket resolvido</Label>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>Canais de Notificação</Label>
                <div className="grid gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="channelEmail" defaultChecked />
                    <Label htmlFor="channelEmail" className="flex items-center">
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="channelInApp" defaultChecked />
                    <Label htmlFor="channelInApp" className="flex items-center">
                      <Bell className="mr-2 h-4 w-4" />
                      Notificações no App
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="channelSMS" />
                    <Label htmlFor="channelSMS" className="flex items-center">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      SMS
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Salvar Configurações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Categorias e Etiquetas</CardTitle>
              <CardDescription>
                Personalize as categorias e etiquetas disponíveis para os tickets
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="customCategories">Categorias de Tickets</Label>
                <Textarea 
                  id="customCategories" 
                  value={customCategories} 
                  onChange={(e) => setCustomCategories(e.target.value)}
                  placeholder="Separe as categorias por vírgula"
                  className="min-h-[100px]"
                />
                <p className="text-sm text-muted-foreground">
                  Separe as categorias por vírgula. Estas categorias estarão disponíveis ao criar ou filtrar tickets.
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>Cores das Categorias</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full bg-purple-500" />
                      <span>Currículo</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full bg-cyan-500" />
                      <span>Candidatura</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full bg-pink-500" />
                      <span>Documentos</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full bg-rose-500" />
                      <span>Notificações</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full bg-teal-500" />
                      <span>Sugestão</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full bg-gray-500" />
                      <span>Outro</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="allowCustomTags">Permitir Etiquetas Personalizadas</Label>
                  <Switch id="allowCustomTags" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Permite que os candidatos criem etiquetas personalizadas ao criar tickets
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Salvar Configurações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Segurança e Anexos</CardTitle>
              <CardDescription>
                Configure as opções de segurança e gerenciamento de anexos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Permitir Anexos</Label>
                  <p className="text-sm text-muted-foreground">
                    Permitir que candidatos anexem arquivos aos tickets
                  </p>
                </div>
                <Switch 
                  checked={allowFileAttachments} 
                  onCheckedChange={setAllowFileAttachments} 
                />
              </div>
              
              <Separator />
              
              <div className="grid gap-2">
                <Label htmlFor="maxFileSize">Tamanho Máximo de Arquivo (MB)</Label>
                <Input 
                  id="maxFileSize" 
                  value={maxFileSize} 
                  onChange={(e) => setMaxFileSize(e.target.value)}
                  type="number"
                  min="1"
                  max="50"
                  disabled={!allowFileAttachments}
                />
                <p className="text-sm text-muted-foreground">
                  Tamanho máximo permitido para arquivos anexados
                </p>
              </div>
              
              <Separator />
              
              <div className="grid gap-2">
                <Label htmlFor="allowedFileTypes">Tipos de Arquivo Permitidos</Label>
                <Input 
                  id="allowedFileTypes" 
                  value={allowedFileTypes} 
                  onChange={(e) => setAllowedFileTypes(e.target.value)}
                  placeholder="jpg,png,pdf,doc,docx"
                  disabled={!allowFileAttachments}
                />
                <p className="text-sm text-muted-foreground">
                  Extensões de arquivo permitidas, separadas por vírgula
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>Permissões de Acesso</Label>
                <div className="grid gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="accessAll" defaultChecked />
                    <Label htmlFor="accessAll" className="flex items-center">
                      <Shield className="mr-2 h-4 w-4" />
                      Administradores podem ver todos os tickets
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="accessAssigned" defaultChecked />
                    <Label htmlFor="accessAssigned" className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      Agentes só veem tickets atribuídos a eles
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="accessCandidate" defaultChecked />
                    <Label htmlFor="accessCandidate" className="flex items-center">
                      <Tag className="mr-2 h-4 w-4" />
                      Candidatos só veem seus próprios tickets
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Salvar Configurações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Templates de Email</CardTitle>
              <CardDescription>
                Personalize os templates de email enviados pelo sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="emailTemplate">Template de Novo Ticket</Label>
                <Textarea 
                  id="emailTemplate" 
                  value={emailTemplate} 
                  onChange={(e) => setEmailTemplate(e.target.value)}
                  className="min-h-[200px] font-mono text-sm"
                />
                <p className="text-sm text-muted-foreground">
                  Use as variáveis {"{nome}"}, {"{ticket_id}"}, {"{assunto}"}, {"{data}"} para personalizar o template.
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>Outros Templates</Label>
                <div className="grid gap-2">
                  <Button variant="outline" className="justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    Template de Resposta
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    Template de Resolução
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    Template de Feedback
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Salvar Configurações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
} 