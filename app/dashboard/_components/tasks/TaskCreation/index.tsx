'use client';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTasks } from "@/app/contexts/tasks/tasksContext";

/**
 * Componente que gerencia a criação e edição de tarefas
 * Inclui o modal para adição/edição e a confirmação de exclusão
 */
export function TaskCreation() {
  const { 
    isTaskModalOpen, 
    setIsTaskModalOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    currentTask,
    formTitle,
    formDescription,
    formDueDate,
    formPriority,
    formStatus,
    formAssignee,
    formTags,
    formRelatedType,
    formRelatedItem,
    setFormTitle,
    setFormDescription,
    setFormDueDate,
    setFormPriority,
    setFormStatus,
    setFormAssignee,
    setFormTags,
    setFormRelatedType,
    setFormRelatedItem,
    saveTask,
    deleteTask
  } = useTasks();

  return (
    <>
      {/* Modal para criação/edição de tarefa */}
      <Dialog open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentTask ? "Editar Tarefa" : "Nova Tarefa"}</DialogTitle>
            <DialogDescription>
              {currentTask 
                ? "Faça as alterações desejadas e clique em Salvar quando terminar." 
                : "Preencha os detalhes da nova tarefa e clique em Criar quando terminar."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Digite o título da tarefa"
                className="col-span-3"
                autoFocus
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="Descreva os detalhes da tarefa"
                className="col-span-3 h-24"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="dueDate">Data de Vencimento</Label>
                <Input
                  id="dueDate"
                  value={formDueDate}
                  onChange={(e) => setFormDueDate(e.target.value)}
                  placeholder="Ex: Hoje, Amanhã, Sexta-feira"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formStatus} onValueChange={setFormStatus}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Selecione um status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="in-progress">Em andamento</SelectItem>
                    <SelectItem value="completed">Concluída</SelectItem>
                    <SelectItem value="cancelled">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="priority">Prioridade</Label>
                <Select value={formPriority} onValueChange={setFormPriority}>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Selecione uma prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">Urgente</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="low">Baixa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="assignee">Responsável</Label>
                <Select value={formAssignee} onValueChange={setFormAssignee}>
                  <SelectTrigger id="assignee">
                    <SelectValue placeholder="Selecione um responsável" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nenhum</SelectItem>
                    <SelectItem value="user-1">Ana Silva</SelectItem>
                    <SelectItem value="user-2">Carlos Oliveira</SelectItem>
                    <SelectItem value="user-3">Mariana Costa</SelectItem>
                    <SelectItem value="user-4">Juliana Lima</SelectItem>
                    <SelectItem value="user-5">Roberto Alves</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
              <Input
                id="tags"
                value={formTags}
                onChange={(e) => setFormTags(e.target.value)}
                placeholder="Ex: Urgente, Relatório, Reunião"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="relatedType">Relacionado a</Label>
                <Select value={formRelatedType} onValueChange={setFormRelatedType}>
                  <SelectTrigger id="relatedType">
                    <SelectValue placeholder="Selecione um tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nenhum</SelectItem>
                    <SelectItem value="job">Vaga</SelectItem>
                    <SelectItem value="candidate">Candidato</SelectItem>
                    <SelectItem value="interview">Entrevista</SelectItem>
                    <SelectItem value="project">Projeto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="relatedItem">Item Relacionado</Label>
                <Input
                  id="relatedItem"
                  value={formRelatedItem}
                  onChange={(e) => setFormRelatedItem(e.target.value)}
                  placeholder="ID do item relacionado"
                  disabled={!formRelatedType}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTaskModalOpen(false)}>Cancelar</Button>
            <Button onClick={saveTask}>{currentTask ? "Salvar" : "Criar"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Diálogo de confirmação para exclusão */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente a tarefa
              <strong> {currentTask?.title}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={deleteTask} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
} 