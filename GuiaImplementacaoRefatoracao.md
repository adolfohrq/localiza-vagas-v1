# Guia de Implementação para Refatoração - Localiza Vagas

## Introdução

Este documento apresenta um guia prático para implementação da refatoração do projeto Localiza Vagas, focando em diretrizes específicas, exemplos concretos e passos sequenciais. Todo o processo foi desenhado para garantir a preservação completa das funcionalidades existentes e do layout visual da aplicação.

**Compromisso com a estabilidade:**
- Zero alterações na experiência do usuário
- Manutenção integral de todas as funcionalidades
- Preservação do design visual em todos os dispositivos
- Processo incremental e seguro

## Mapeamento da Estrutura Atual

Antes de iniciar a refatoração, é importante compreender a estrutura atual e os principais pontos de atenção:

```
app/
├── dashboard/                  # Dashboard para empresas
│   ├── candidates/page.tsx     # 2660 linhas ⚠️
│   ├── interviews/page.tsx     # 2398 linhas ⚠️
│   ├── messages/page.tsx       # 2091 linhas ⚠️
│   ├── tasks/page.tsx          # 1671 linhas ⚠️
│   ├── jobs/
│   │   ├── page.tsx            # 345 linhas
│   │   ├── [id]/
│   │   │   ├── edit/page.tsx   # 87 linhas
│   │   │   └── candidates/page.tsx # 222 linhas
│   │   └── new/
│   │       ├── create/page.tsx # 463 linhas ⚠️
│   │       └── select-plan/page.tsx # 409 linhas ⚠️
│   ├── company/page.tsx        # 559 linhas ⚠️
│   ├── financial-history/page.tsx # 501 linhas ⚠️
│   └── support/page.tsx        # 1711 linhas ⚠️
├── candidate-dashboard/        # Dashboard para candidatos
│   ├── applications/page.tsx   
│   ├── resume/page.tsx         # 3360 linhas ⚠️⚠️
│   ├── settings/page.tsx       # 137 linhas
│   ├── notifications/page.tsx  # 993 linhas ⚠️
│   ├── support/page.tsx        # 2295 linhas ⚠️⚠️
│   └── ...
└── ...
```

## Diretivas de Reestruturação

### 1. Nova Estrutura de Diretórios

```
app/
├── (auth)/                     # Grupo de rotas de autenticação
│   ├── login/
│   ├── register/
│   ├── admin-login/
│   └── reset-password/
├── (shared)/                   # Componentes e layouts compartilhados
│   ├── layouts/
│   └── components/
├── dashboard/                  # Dashboard para empresas - reorganizado
│   ├── _components/            # Componentes específicos do dashboard
│   │   ├── candidates/         # Componentes específicos para gestão de candidatos
│   │   ├── jobs/               # Componentes específicos para gestão de vagas
│   │   ├── interviews/         # Componentes específicos para entrevistas
│   │   ├── messages/           # Componentes específicos para mensagens
│   │   └── ...
│   ├── _hooks/                 # Hooks específicos do dashboard
│   ├── _actions/               # Server Actions específicas do dashboard
│   ├── _utils/                 # Funções de utilidade específicas
│   ├── candidates/page.tsx     # Simplificada para ~100 linhas
│   ├── interviews/page.tsx     # Simplificada para ~100 linhas
│   ├── messages/page.tsx       # Simplificada para ~100 linhas
│   ├── ...                     # Estrutura de URL preservada
├── candidate-dashboard/        # Dashboard para candidatos - reorganizado
│   ├── _components/            # Componentes específicos para candidatos
│   ├── _hooks/                 # Hooks específicos para candidatos
│   ├── _actions/               # Server Actions específicas para candidatos
│   ├── ...                     # Estrutura de URL preservada
├── admin/                      # Área administrativa separada
│   ├── _components/
│   ├── users/
│   ├── content/
│   └── ...
└── ...
```

### 2. Regras para Decomposição de Arquivos

Para manter consistência e legibilidade:

1. **Limite de Tamanho**:
   - Arquivos de página (`page.tsx`): Máximo 150 linhas
   - Componentes: Máximo 200 linhas
   - Hooks: Máximo 100 linhas

2. **Nomenclatura Padronizada**:
   - Componentes: `PascalCase.tsx` (ex: `CandidateList.tsx`)
   - Hooks: `useCamelCase.ts` (ex: `useCandidateFilters.ts`)
   - Context: `camelCaseContext.tsx` (ex: `candidatesContext.tsx`)
   - Utilitários: `kebab-case.ts` (ex: `filter-utils.ts`)

3. **Agrupamento Funcional**:
   - Para cada módulo principal, criar diretórios específicos em `_components/`
   - Arquivos relacionados devem estar próximos na estrutura

## Instruções de Implementação por Módulo

Vamos focar nos módulos críticos, detalhando a implementação da refatoração para garantir que todas as funcionalidades permaneçam intactas.

### Módulo: Gestão de Candidatos

O arquivo `dashboard/candidates/page.tsx` com 2660 linhas será refatorado da seguinte forma:

#### 1. Estrutura de Componentes

```
dashboard/_components/candidates/
├── CandidatesList/
│   ├── index.tsx               # Componente principal da lista
│   ├── CandidateCard.tsx       # Card individual
│   ├── SkeletonCard.tsx        # Placeholder de loading
│   └── EmptyState.tsx          # Estado de lista vazia
├── Filters/
│   ├── index.tsx               # Container de filtros
│   ├── SearchInput.tsx         # Campo de busca
│   ├── StatusFilter.tsx        # Filtro por status
│   ├── SkillsFilter.tsx        # Filtro por habilidades
│   └── DateFilters.tsx         # Filtros de data
├── DetailPanel/
│   ├── index.tsx               # Container do painel
│   ├── ProfileSection.tsx      # Seção de perfil
│   ├── ExperienceSection.tsx   # Seção de experiências
│   ├── ActionsBar.tsx          # Barra de ações
│   └── Notes.tsx               # Notas e comentários
└── Actions/
    ├── email-actions.ts        # Ações relacionadas a emails
    ├── status-actions.ts       # Ações de mudança de status
    └── ...
```

#### 2. Hooks Personalizados

```
dashboard/_hooks/
├── candidates/
│   ├── useCandidateSearch.ts   # Lógica de busca
│   ├── useCandidateFilters.ts  # Lógica de filtragem
│   ├── useCandidateSort.ts     # Lógica de ordenação
│   └── useCandidatePagination.ts # Lógica de paginação
```

#### 3. Server Actions

```
dashboard/_actions/
├── candidates/
│   ├── fetch-candidates.ts     # Buscar candidatos
│   ├── update-status.ts        # Atualizar status
│   ├── send-message.ts         # Enviar mensagem
│   └── ...
```

#### 4. Página Principal Simplificada

```tsx
// dashboard/candidates/page.tsx
import { Suspense } from 'react';
import { DashboardShell } from '@/components/shells/dashboard-shell';
import { CandidatesHeader } from '@/app/dashboard/_components/candidates/CandidatesHeader';
import { CandidatesFilters } from '@/app/dashboard/_components/candidates/Filters';
import { CandidatesList } from '@/app/dashboard/_components/candidates/CandidatesList';
import { CandidatesListSkeleton } from '@/app/dashboard/_components/candidates/CandidatesList/SkeletonCard';

export default function CandidatesPage() {
  return (
    <DashboardShell>
      <CandidatesHeader />
      <CandidatesFilters />
      <Suspense fallback={<CandidatesListSkeleton />}>
        <CandidatesList />
      </Suspense>
    </DashboardShell>
  );
}
```

### Módulo: Entrevistas

O arquivo `dashboard/interviews/page.tsx` com 2398 linhas será refatorado da seguinte forma:

#### 1. Estrutura de Componentes

```
dashboard/_components/interviews/
├── InterviewsList/
│   ├── index.tsx               # Container da lista
│   ├── InterviewCard.tsx       # Card de entrevista
│   └── EmptyState.tsx          # Estado quando não há entrevistas
├── Calendar/
│   ├── index.tsx               # Visualização de calendário
│   ├── DayView.tsx             # Visualização por dia
│   ├── WeekView.tsx            # Visualização por semana
│   └── MonthView.tsx           # Visualização por mês
├── Scheduling/
│   ├── ScheduleForm.tsx        # Formulário de agendamento
│   ├── TimePicker.tsx          # Seletor de horário
│   └── CandidateSelector.tsx   # Seletor de candidato
└── ...
```

### Módulo: Mensagens

O arquivo `dashboard/messages/page.tsx` com 2091 linhas será refatorado da seguinte forma:

#### 1. Estrutura de Componentes

```
dashboard/_components/messages/
├── Conversations/
│   ├── index.tsx               # Lista de conversas
│   ├── ConversationItem.tsx    # Item individual
│   └── ConversationHeader.tsx  # Cabeçalho da conversa
├── Chat/
│   ├── index.tsx               # Container do chat
│   ├── MessageBubble.tsx       # Bolha de mensagem
│   ├── ChatInput.tsx           # Input de texto
│   └── Attachments.tsx         # Gerenciamento de anexos
├── Sidebar/
│   ├── index.tsx               # Sidebar de navegação
│   ├── FilterOptions.tsx       # Opções de filtro
│   └── SearchMessages.tsx      # Busca de mensagens
└── ...
```

### Módulo: Currículo do Candidato

O arquivo `candidate-dashboard/resume/page.tsx` com 3360 linhas é o maior arquivo do projeto e será refatorado da seguinte forma:

#### 1. Estrutura de Componentes

```
candidate-dashboard/_components/resume/
├── Header/
│   ├── index.tsx               # Cabeçalho do currículo
│   ├── ProfilePhoto.tsx        # Componente de foto do perfil
│   └── BasicInfo.tsx           # Informações básicas
├── Sections/
│   ├── PersonalInfo/
│   │   ├── index.tsx           # Container de informações pessoais
│   │   ├── ContactDetails.tsx  # Detalhes de contato
│   │   └── AboutMe.tsx         # Seção "Sobre mim"
│   ├── Education/
│   │   ├── index.tsx           # Container de formação acadêmica
│   │   ├── EducationItem.tsx   # Item individual de formação
│   │   └── EducationForm.tsx   # Formulário para adicionar/editar
│   ├── Experience/
│   │   ├── index.tsx           # Container de experiência profissional
│   │   ├── ExperienceItem.tsx  # Item individual de experiência
│   │   └── ExperienceForm.tsx  # Formulário para adicionar/editar
│   ├── Skills/
│   │   ├── index.tsx           # Container de habilidades
│   │   ├── SkillCategory.tsx   # Categoria de habilidades
│   │   └── SkillSelector.tsx   # Seletor de habilidades
│   ├── Certifications/
│   │   ├── index.tsx           # Container de certificações
│   │   ├── CertificationItem.tsx # Item individual de certificação
│   │   └── CertificationForm.tsx # Formulário para adicionar/editar
│   └── Languages/
│       ├── index.tsx           # Container de idiomas
│       ├── LanguageItem.tsx    # Item individual de idioma
│       └── LanguageForm.tsx    # Formulário para adicionar/editar
├── Preview/
│   ├── index.tsx               # Visualização do currículo
│   ├── Templates/              # Templates de currículo
│   │   ├── DefaultTemplate.tsx # Template padrão
│   │   ├── ModernTemplate.tsx  # Template moderno
│   │   └── MinimalTemplate.tsx # Template minimalista
│   └── ExportOptions.tsx       # Opções de exportação (PDF, etc.)
└── Actions/
    ├── save-resume.ts          # Salvar currículo
    ├── publish-resume.ts       # Publicar currículo
    └── export-resume.ts        # Exportar currículo
```

#### 2. Hooks Personalizados

```
candidate-dashboard/_hooks/
├── resume/
│   ├── useResumeForm.ts        # Gerenciamento do formulário
│   ├── useResumeValidation.ts  # Validação de dados
│   ├── useResumeAutosave.ts    # Autosave do currículo
│   └── useResumePreview.ts     # Preview do currículo
```

#### 3. Server Actions

```
candidate-dashboard/_actions/
├── resume/
│   ├── fetch-resume.ts         # Buscar dados do currículo
│   ├── update-section.ts       # Atualizar seção específica
│   ├── upload-certificate.ts   # Upload de certificados
│   └── generate-pdf.ts         # Gerar PDF do currículo
```

#### 4. Página Principal Simplificada

```tsx
// candidate-dashboard/resume/page.tsx
import { Suspense } from 'react';
import { DashboardShell } from '@/components/shells/dashboard-shell';
import { ResumeProvider } from '@/app/contexts/resume/resumeContext';
import { ResumeHeader } from '@/app/candidate-dashboard/_components/resume/Header';
import { PersonalInfo } from '@/app/candidate-dashboard/_components/resume/Sections/PersonalInfo';
import { Education } from '@/app/candidate-dashboard/_components/resume/Sections/Education';
import { Experience } from '@/app/candidate-dashboard/_components/resume/Sections/Experience';
import { Skills } from '@/app/candidate-dashboard/_components/resume/Sections/Skills';
import { Certifications } from '@/app/candidate-dashboard/_components/resume/Sections/Certifications';
import { Languages } from '@/app/candidate-dashboard/_components/resume/Sections/Languages';
import { ResumePreview } from '@/app/candidate-dashboard/_components/resume/Preview';
import { SectionSkeleton } from '@/app/candidate-dashboard/_components/shared/SectionSkeleton';

export default function ResumePage() {
  return (
    <ResumeProvider>
      <DashboardShell>
        <ResumeHeader />
        <div className="resume-builder">
          <div className="resume-form">
            <Suspense fallback={<SectionSkeleton />}>
              <PersonalInfo />
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
              <Education />
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
              <Experience />
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
              <Skills />
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
              <Certifications />
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
              <Languages />
            </Suspense>
          </div>
          <div className="resume-preview">
            <ResumePreview />
          </div>
        </div>
      </DashboardShell>
    </ResumeProvider>
  );
}
```

### Módulo: Suporte ao Candidato

O arquivo `candidate-dashboard/support/page.tsx` com 2295 linhas será refatorado da seguinte forma:

#### 1. Estrutura de Componentes

```
candidate-dashboard/_components/support/
├── TicketList/
│   ├── index.tsx               # Lista de tickets
│   ├── TicketItem.tsx          # Item individual
│   ├── TicketStatusBadge.tsx   # Badge de status
│   └── EmptyTickets.tsx        # Estado vazio
├── TicketDetail/
│   ├── index.tsx               # Visualização detalhada
│   ├── TicketHeader.tsx        # Cabeçalho do ticket
│   ├── MessageThread.tsx       # Thread de mensagens
│   ├── MessageItem.tsx         # Mensagem individual
│   └── ReplyForm.tsx           # Formulário de resposta
├── NewTicket/
│   ├── index.tsx               # Formulário novo ticket
│   ├── CategorySelector.tsx    # Seletor de categoria
│   ├── PrioritySelector.tsx    # Seletor de prioridade
│   └── FileAttachment.tsx      # Upload de arquivos
├── Sidebar/
│   ├── index.tsx               # Sidebar de navegação
│   ├── CategoryFilter.tsx      # Filtro por categoria
│   └── StatusFilter.tsx        # Filtro por status
└── Actions/
    ├── create-ticket.ts        # Criar novo ticket
    ├── reply-to-ticket.ts      # Responder a ticket
    └── close-ticket.ts         # Fechar ticket
```

#### 2. Hooks Personalizados

```
candidate-dashboard/_hooks/
├── support/
│   ├── useTicketsList.ts       # Gerenciar lista de tickets
│   ├── useTicketDetail.ts      # Gerenciar detalhes do ticket
│   ├── useTicketForm.ts        # Gerenciar formulário de ticket
│   └── useTicketFilters.ts     # Gerenciar filtros de tickets
```

#### 3. Server Actions

```
candidate-dashboard/_actions/
├── support/
│   ├── fetch-tickets.ts        # Buscar tickets
│   ├── fetch-ticket-detail.ts  # Buscar detalhes de um ticket
│   ├── submit-ticket.ts        # Enviar novo ticket
│   └── send-reply.ts           # Enviar resposta
```

#### 4. Página Principal Simplificada

```tsx
// candidate-dashboard/support/page.tsx
import { Suspense } from 'react';
import { DashboardShell } from '@/components/shells/dashboard-shell';
import { SupportProvider } from '@/app/contexts/support/supportContext';
import { SupportHeader } from '@/app/candidate-dashboard/_components/support/SupportHeader';
import { TicketList } from '@/app/candidate-dashboard/_components/support/TicketList';
import { TicketDetail } from '@/app/candidate-dashboard/_components/support/TicketDetail';
import { NewTicket } from '@/app/candidate-dashboard/_components/support/NewTicket';
import { Sidebar } from '@/app/candidate-dashboard/_components/support/Sidebar';
import { TicketListSkeleton } from '@/app/candidate-dashboard/_components/support/TicketList/TicketListSkeleton';

export default function SupportPage() {
  return (
    <SupportProvider>
      <DashboardShell>
        <SupportHeader />
        <div className="support-layout">
          <Sidebar />
          <div className="main-content">
            <Suspense fallback={<TicketListSkeleton />}>
              <TicketList />
            </Suspense>
            <Suspense fallback={<div>Carregando detalhes...</div>}>
              <TicketDetail />
            </Suspense>
            <NewTicket />
          </div>
        </div>
      </DashboardShell>
    </SupportProvider>
  );
}
```

### Módulo: Sistema de Tarefas

O arquivo `dashboard/tasks/page.tsx` com 1671 linhas será refatorado da seguinte forma:

#### 1. Estrutura de Componentes

```
dashboard/_components/tasks/
├── TaskBoard/
│   ├── index.tsx               # Quadro principal de tarefas
│   ├── TaskColumn.tsx          # Coluna de tarefas (Por fazer, Em andamento, etc.)
│   └── DragDropContext.tsx     # Contexto de drag-and-drop
├── TaskCard/
│   ├── index.tsx               # Card de tarefa individual
│   ├── TaskPriority.tsx        # Indicador de prioridade
│   ├── TaskAssignee.tsx        # Avatar e info de responsável
│   ├── TaskDueDate.tsx         # Data de vencimento
│   └── TaskActions.tsx         # Ações rápidas (editar, excluir)
├── TaskDetail/
│   ├── index.tsx               # Painel de detalhes da tarefa
│   ├── TaskDetailHeader.tsx    # Cabeçalho com título e status
│   ├── TaskDescription.tsx     # Descrição e detalhes completos
│   ├── TaskComments.tsx        # Seção de comentários
│   ├── SubtasksList.tsx        # Lista de subtarefas
│   └── TaskActivity.tsx        # Histórico de atividades
├── TaskCreation/
│   ├── index.tsx               # Formulário de criação de tarefa
│   ├── TaskBasicInfo.tsx       # Informações básicas (título, descrição)
│   ├── TaskAssignment.tsx      # Atribuição de responsáveis
│   ├── TaskRelations.tsx       # Relacionamentos com candidatos/vagas
│   └── TaskRecurrence.tsx      # Configuração de recorrência
└── Filters/
    ├── index.tsx               # Container de filtros
    ├── StatusFilter.tsx        # Filtro por status
    ├── AssigneeFilter.tsx      # Filtro por responsável
    └── DateRangeFilter.tsx     # Filtro por período
```

#### 2. Hooks Personalizados

```
dashboard/_hooks/
├── tasks/
│   ├── useTaskBoard.ts         # Gerenciamento do quadro de tarefas
│   ├── useTaskDragDrop.ts      # Lógica de drag-and-drop
│   ├── useTaskFilters.ts       # Gerenciamento de filtros
│   ├── useTaskDetail.ts        # Gerenciamento de detalhes da tarefa
│   └── useTaskActions.ts       # Ações de tarefa (criar, editar, excluir)
```

#### 3. Server Actions

```
dashboard/_actions/
├── tasks/
│   ├── fetch-tasks.ts          # Buscar tarefas
│   ├── create-task.ts          # Criar tarefa
│   ├── update-task-status.ts   # Atualizar status
│   ├── assign-task.ts          # Atribuir tarefa
│   └── add-comment.ts          # Adicionar comentário
```

#### 4. Página Principal Simplificada

```tsx
// dashboard/tasks/page.tsx
import { Suspense } from 'react';
import { DashboardShell } from '@/components/shells/dashboard-shell';
import { TasksProvider } from '@/app/contexts/tasks/tasksContext';
import { TasksHeader } from '@/app/dashboard/_components/tasks/TasksHeader';
import { TaskFilters } from '@/app/dashboard/_components/tasks/Filters';
import { TaskBoard } from '@/app/dashboard/_components/tasks/TaskBoard';
import { TaskDetail } from '@/app/dashboard/_components/tasks/TaskDetail';
import { TaskCreation } from '@/app/dashboard/_components/tasks/TaskCreation';
import { TaskBoardSkeleton } from '@/app/dashboard/_components/tasks/TaskBoard/TaskBoardSkeleton';

export default function TasksPage() {
  return (
    <TasksProvider>
      <DashboardShell>
        <TasksHeader />
        <TaskFilters />
        <div className="task-layout">
          <Suspense fallback={<TaskBoardSkeleton />}>
            <TaskBoard />
          </Suspense>
          <TaskDetail />
        </div>
        <TaskCreation />
      </DashboardShell>
    </TasksProvider>
  );
}
```

### Módulo: Notificações para Candidatos

O arquivo `candidate-dashboard/notifications/page.tsx` com 993 linhas será refatorado da seguinte forma:

#### 1. Estrutura de Componentes

```
candidate-dashboard/_components/notifications/
├── NotificationList/
│   ├── index.tsx               # Lista de notificações
│   ├── NotificationItem.tsx    # Item individual
│   ├── NotificationIcon.tsx    # Ícone por tipo de notificação
│   └── EmptyState.tsx          # Estado de lista vazia
├── NotificationGroups/
│   ├── index.tsx               # Agrupamento por data/tipo
│   ├── TodayNotifications.tsx  # Notificações de hoje
│   ├── WeekNotifications.tsx   # Notificações da semana
│   └── OlderNotifications.tsx  # Notificações mais antigas
├── NotificationDetail/
│   ├── index.tsx               # Detalhes da notificação
│   ├── ApplicationNotification.tsx # Notificação de candidatura
│   ├── MessageNotification.tsx # Notificação de mensagem
│   └── SystemNotification.tsx  # Notificação de sistema
├── Filters/
│   ├── index.tsx               # Filtros de notificação
│   ├── TypeFilter.tsx          # Filtro por tipo
│   └── DateFilter.tsx          # Filtro por data
└── Actions/
    ├── mark-as-read.ts         # Marcar como lida
    ├── mark-all-read.ts        # Marcar todas como lidas
    └── delete-notification.ts  # Excluir notificação
```

#### 2. Hooks Personalizados

```
candidate-dashboard/_hooks/
├── notifications/
│   ├── useNotifications.ts     # Gerenciar lista de notificações
│   ├── useNotificationActions.ts # Ações em notificações
│   ├── useNotificationFilters.ts # Filtros de notificação
│   └── useRealTimeUpdates.ts   # Atualizações em tempo real
```

#### 3. Server Actions

```
candidate-dashboard/_actions/
├── notifications/
│   ├── fetch-notifications.ts  # Buscar notificações
│   ├── mark-read.ts            # Marcar como lida
│   ├── delete-notification.ts  # Deletar notificação
│   └── update-preferences.ts   # Atualizar preferências
```

#### 4. Página Principal Simplificada

```tsx
// candidate-dashboard/notifications/page.tsx
import { Suspense } from 'react';
import { DashboardShell } from '@/components/shells/dashboard-shell';
import { NotificationsProvider } from '@/app/contexts/notifications/notificationsContext';
import { NotificationsHeader } from '@/app/candidate-dashboard/_components/notifications/NotificationsHeader';
import { NotificationFilters } from '@/app/candidate-dashboard/_components/notifications/Filters';
import { NotificationGroups } from '@/app/candidate-dashboard/_components/notifications/NotificationGroups';
import { NotificationListSkeleton } from '@/app/candidate-dashboard/_components/notifications/NotificationList/NotificationListSkeleton';

export default function NotificationsPage() {
  return (
    <NotificationsProvider>
      <DashboardShell>
        <NotificationsHeader />
        <NotificationFilters />
        <Suspense fallback={<NotificationListSkeleton />}>
          <NotificationGroups />
        </Suspense>
      </DashboardShell>
    </NotificationsProvider>
  );
}
```

### Módulo: Perfil da Empresa

O arquivo `dashboard/company/page.tsx` com 559 linhas será refatorado da seguinte forma:

#### 1. Estrutura de Componentes

```
dashboard/_components/company/
├── Profile/
│   ├── index.tsx               # Container do perfil da empresa
│   ├── CompanyLogo.tsx         # Upload e exibição de logo
│   ├── BasicInfo.tsx           # Informações básicas
│   └── CompanyDescription.tsx  # Descrição e visão geral
├── ContactInfo/
│   ├── index.tsx               # Informações de contato
│   ├── AddressForm.tsx         # Formulário de endereço
│   └── ContactDetails.tsx      # Detalhes de contato
├── TeamManagement/
│   ├── index.tsx               # Gestão de equipe
│   ├── TeamMembersList.tsx     # Lista de membros
│   ├── InviteMember.tsx        # Convite de membro
│   └── RolePermissions.tsx     # Permissões por função
├── BrandingSettings/
│   ├── index.tsx               # Configurações de marca
│   ├── ColorsSelector.tsx      # Seletor de cores
│   └── BrandingPreview.tsx     # Prévia da personalização
└── Actions/
    ├── update-company.ts       # Atualizar empresa
│   ├── invite-member.ts        # Convidar membro
│   └── update-branding.ts      # Atualizar marca
```

#### 2. Hooks Personalizados

```
dashboard/_hooks/
├── company/
│   ├── useCompanyProfile.ts    # Gerenciar perfil da empresa
│   ├── useTeamManagement.ts    # Gerenciar equipe
│   ├── useCompanyValidation.ts # Validações de dados
│   └── useCompanyBranding.ts   # Configurações de marca
```

#### 3. Server Actions

```
dashboard/_actions/
├── company/
│   ├── fetch-company.ts        # Buscar dados da empresa
│   ├── update-profile.ts       # Atualizar perfil
│   ├── upload-logo.ts          # Upload de logo
│   └── manage-team.ts          # Gerenciar equipe
```

#### 4. Página Principal Simplificada

```tsx
// dashboard/company/page.tsx
import { Suspense } from 'react';
import { DashboardShell } from '@/components/shells/dashboard-shell';
import { CompanyProvider } from '@/app/contexts/company/companyContext';
import { CompanyHeader } from '@/app/dashboard/_components/company/CompanyHeader';
import { CompanyProfile } from '@/app/dashboard/_components/company/Profile';
import { ContactInfo } from '@/app/dashboard/_components/company/ContactInfo';
import { TeamManagement } from '@/app/dashboard/_components/company/TeamManagement';
import { BrandingSettings } from '@/app/dashboard/_components/company/BrandingSettings';
import { ProfileSkeleton } from '@/app/dashboard/_components/company/Profile/ProfileSkeleton';

export default function CompanyPage() {
  return (
    <CompanyProvider>
      <DashboardShell>
        <CompanyHeader />
        <div className="company-tabs">
          <Suspense fallback={<ProfileSkeleton />}>
            <CompanyProfile />
          </Suspense>
          <ContactInfo />
          <TeamManagement />
          <BrandingSettings />
        </div>
      </DashboardShell>
    </CompanyProvider>
  );
}
```

### Módulo: Histórico Financeiro

O arquivo `dashboard/financial-history/page.tsx` com 501 linhas será refatorado da seguinte forma:

#### 1. Estrutura de Componentes

```
dashboard/_components/financial/
├── TransactionList/
│   ├── index.tsx               # Lista de transações
│   ├── TransactionItem.tsx     # Item de transação individual
│   ├── TransactionType.tsx     # Componente de tipo de transação
│   └── EmptyState.tsx          # Estado quando não há transações
├── Invoices/
│   ├── index.tsx               # Lista de faturas
│   ├── InvoiceItem.tsx         # Item de fatura
│   ├── InvoiceDetails.tsx      # Detalhes da fatura
│   └── InvoiceDownload.tsx     # Download de fatura
├── Subscription/
│   ├── index.tsx               # Detalhes da assinatura
│   ├── CurrentPlan.tsx         # Plano atual
│   ├── BillingCycle.tsx        # Ciclo de cobrança
│   └── UpgradeOptions.tsx      # Opções de upgrade
├── Reports/
│   ├── index.tsx               # Relatórios financeiros
│   ├── MonthlySpending.tsx     # Gastos mensais
│   ├── YearlyChart.tsx         # Gráfico anual
│   └── ExportReport.tsx        # Exportação de relatórios
└── Actions/
    ├── download-invoice.ts     # Download de fatura
    ├── change-plan.ts          # Mudar plano
    └── request-refund.ts       # Solicitar reembolso
```

#### 2. Hooks Personalizados

```
dashboard/_hooks/
├── financial/
│   ├── useTransactions.ts      # Gerenciar transações
│   ├── useInvoices.ts          # Gerenciar faturas
│   ├── useSubscription.ts      # Gerenciar assinatura
│   └── useFinancialReports.ts  # Gerenciar relatórios
```

#### 3. Server Actions

```
dashboard/_actions/
├── financial/
│   ├── fetch-transactions.ts   # Buscar transações
│   ├── fetch-invoices.ts       # Buscar faturas
│   ├── generate-invoice-pdf.ts # Gerar PDF da fatura
│   └── fetch-subscription.ts   # Buscar detalhes da assinatura
```

#### 4. Página Principal Simplificada

```tsx
// dashboard/financial-history/page.tsx
import { Suspense } from 'react';
import { DashboardShell } from '@/components/shells/dashboard-shell';
import { FinancialProvider } from '@/app/contexts/financial/financialContext';
import { FinancialHeader } from '@/app/dashboard/_components/financial/FinancialHeader';
import { TransactionList } from '@/app/dashboard/_components/financial/TransactionList';
import { Invoices } from '@/app/dashboard/_components/financial/Invoices';
import { Subscription } from '@/app/dashboard/_components/financial/Subscription';
import { Reports } from '@/app/dashboard/_components/financial/Reports';
import { TransactionListSkeleton } from '@/app/dashboard/_components/financial/TransactionList/TransactionListSkeleton';

export default function FinancialHistoryPage() {
  return (
    <FinancialProvider>
      <DashboardShell>
        <FinancialHeader />
        <div className="financial-content">
          <Suspense fallback={<TransactionListSkeleton />}>
            <TransactionList />
          </Suspense>
          <Invoices />
          <Subscription />
          <Reports />
        </div>
      </DashboardShell>
    </FinancialProvider>
  );
}
```

## Procedimento de Refatoração Passo a Passo

Para garantir a preservação de todas as funcionalidades, o processo de refatoração seguirá um procedimento meticuloso:

### Fase 1: Preparação (Semana 1)

1. **Criar Estrutura de Pastas**
   ```bash
   # Exemplo de comandos para criar a estrutura básica
   mkdir -p app/dashboard/_components/candidates/CandidatesList
   mkdir -p app/dashboard/_components/candidates/Filters
   mkdir -p app/dashboard/_components/candidates/DetailPanel
   mkdir -p app/dashboard/_hooks/candidates
   mkdir -p app/dashboard/_actions/candidates
   # Continuar para outros módulos
   ```

2. **Criação de Testes E2E**
   ```bash
   # Criar testes para funcionalidades críticas
   # Usando Playwright, Cypress ou similar
   npx playwright test create candidates.spec.ts
   npx playwright test create interviews.spec.ts
   ```

3. **Captura de Snapshots Visuais**
   ```bash
   # Capturar snapshots do estado atual para comparação
   npx playwright test visual-regression.spec.ts
   ```

### Fase 2: Extração dos Componentes Principais (Semanas 2-4)

Para cada arquivo grande, seguir o processo:

1. **Análise da Estrutura Interna**
   - Mapeamento de componentes e lógicas
   - Identificação de padrões repetitivos
   - Documentação de dependências

2. **Extração de Componentes**

   Exemplo para `dashboard/candidates/page.tsx`:

   ```tsx
   // Original: parte da página dashboard/candidates/page.tsx
   function CandidatesPage() {
     // ...Vários estados e lógica...
     
     return (
       <DashboardShell>
         <div className="page-header">
           <h1>Candidatos</h1>
           <div className="filters">
             {/* Muitos elementos de filtro */}
             <input type="text" value={searchTerm} onChange={...} />
             <select value={status} onChange={...}>
               {/* Opções */}
             </select>
             {/* Mais filtros */}
           </div>
         </div>
         <div className="candidates-list">
           {candidates.map(candidate => (
             <div key={candidate.id} className="candidate-card">
               {/* Muitas informações do candidato */}
             </div>
           ))}
         </div>
       </DashboardShell>
     );
   }
   ```

   ```tsx
   // Refatorado: CandidatesFilters em dashboard/_components/candidates/Filters/index.tsx
   import { useState } from 'react';
   import { SearchInput } from './SearchInput';
   import { StatusFilter } from './StatusFilter';
   // Mais imports
   
   export function CandidatesFilters() {
     // Lógica específica de filtros
     
     return (
       <div className="filters">
         <SearchInput value={searchTerm} onChange={handleSearchChange} />
         <StatusFilter value={status} onChange={handleStatusChange} />
         {/* Outros filtros */}
       </div>
     );
   }
   ```

   ```tsx
   // Refatorado: CandidatesList em dashboard/_components/candidates/CandidatesList/index.tsx
   import { CandidateCard } from './CandidateCard';
   import { useCandidateFilters } from '@/app/dashboard/_hooks/candidates/useCandidateFilters';
   
   export function CandidatesList() {
     // Usar hooks extraídos
     const { filteredCandidates } = useCandidateFilters();
     
     if (!filteredCandidates.length) {
       return <EmptyState />;
     }
     
     return (
       <div className="candidates-list">
         {filteredCandidates.map(candidate => (
           <CandidateCard key={candidate.id} candidate={candidate} />
         ))}
       </div>
     );
   }
   ```

3. **Extração de Hooks**

   ```tsx
   // dashboard/_hooks/candidates/useCandidateFilters.ts
   import { useState, useEffect } from 'react';
   import { fetchCandidates } from '@/app/dashboard/_actions/candidates/fetch-candidates';
   
   export function useCandidateFilters() {
     const [candidates, setCandidates] = useState([]);
     const [searchTerm, setSearchTerm] = useState('');
     const [status, setStatus] = useState('all');
     // Outros estados e efeitos
     
     useEffect(() => {
       // Lógica para buscar e filtrar candidatos
       async function loadCandidates() {
         const data = await fetchCandidates();
         setCandidates(data);
       }
       
       loadCandidates();
     }, []);
     
     // Filtragem
     const filteredCandidates = candidates.filter(candidate => {
       // Lógica de filtragem
       return (
         candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
         (status === 'all' || candidate.status === status)
       );
     });
     
     return {
       filteredCandidates,
       searchTerm,
       setSearchTerm,
       status,
       setStatus,
       // Outras propriedades e métodos
     };
   }
   ```

4. **Extração de Server Actions**

   ```tsx
   // dashboard/_actions/candidates/fetch-candidates.ts
   'use server';
   
   export async function fetchCandidates(params = {}) {
     // Lógica de busca de dados que estava no componente
     try {
       // Implementação da busca
       return data;
     } catch (error) {
       console.error("Error fetching candidates:", error);
       return [];
     }
   }
   ```

5. **Refatoração Gradual da Página Principal**

   ```tsx
   // dashboard/candidates/page.tsx (versão intermediária)
   import { useState, useEffect } from 'react';
   import { DashboardShell } from '@/components/shells/dashboard-shell';
   // Importar componentes parcialmente refatorados
   import { CandidatesFilters } from '@/app/dashboard/_components/candidates/Filters';
   // Manter componentes antigos temporariamente
   import { OldCandidatesList } from './components';
   
   export default function CandidatesPage() {
     // Manter estado temporariamente
     const [candidates, setCandidates] = useState([]);
     
     // Carregar componentes refatorados gradualmente
     return (
       <DashboardShell>
         <h1>Candidatos</h1>
         <CandidatesFilters /> {/* Componente refatorado */}
         <OldCandidatesList candidates={candidates} /> {/* Ainda não refatorado */}
       </DashboardShell>
     );
   }
   ```

   ```tsx
   // dashboard/candidates/page.tsx (versão final)
   import { Suspense } from 'react';
   import { DashboardShell } from '@/components/shells/dashboard-shell';
   import { CandidatesHeader } from '@/app/dashboard/_components/candidates/CandidatesHeader';
   import { CandidatesFilters } from '@/app/dashboard/_components/candidates/Filters';
   import { CandidatesList } from '@/app/dashboard/_components/candidates/CandidatesList';
   import { CandidatesListSkeleton } from '@/app/dashboard/_components/candidates/CandidatesList/SkeletonCard';
   
   export default function CandidatesPage() {
     return (
       <DashboardShell>
         <CandidatesHeader />
         <CandidatesFilters />
         <Suspense fallback={<CandidatesListSkeleton />}>
           <CandidatesList />
         </Suspense>
       </DashboardShell>
     );
   }
   ```

6. **Teste de Funcionalidade após Cada Extração**
   ```bash
   # Executar testes para garantir que a funcionalidade permanece intacta
   npm run test:e2e
   npm run test:visual
   ```

### Fase 2.1: Abordagem para Arquivos Extremamente Grandes (>3000 linhas)

Para arquivos como `candidate-dashboard/resume/page.tsx` com 3360 linhas, algumas considerações adicionais são necessárias:

1. **Decomposição por Etapas Ainda Menores**:
   - Identificar as seções completamente independentes primeiro
   - Refatorar uma seção por vez, começando pelas mais simples
   - Testar completamente cada seção antes de prosseguir

2. **Estado Temporário Compartilhado**:
   ```tsx
   // Durante a migração, podemos criar um estado temporário para compartilhar dados
   // entre componentes originais e refatorados
   const [resumeData, setResumeData] = useState(initialData);
   
   // Passar para componentes novos
   <ResumeSection1Refactored data={resumeData} onUpdate={handleUpdate} />
   
   // E para os componentes antigos ainda não refatorados
   <ResumeSection2Original data={resumeData} onUpdate={handleUpdate} />
   ```

3. **Modo de Compatibilidade**:
   ```tsx
   // Utilizar um wrapper para compatibilidade com componentes refatorados
   function CompatibilityWrapper({ children, data, legacyHandler }) {
     // Mapear entre padrões novos e antigos
     const adaptedHandler = useCallback((newData) => {
       // Converter formato do novo para o antigo
       const adaptedData = adaptDataFormat(newData);
       legacyHandler(adaptedData);
     }, [legacyHandler]);
     
     return children(data, adaptedHandler);
   }
   ```

### Fase 3: Reorganização de Estado (Semanas 5-7)

1. **Criação de Contextos por Domínio**

   ```tsx
   // app/contexts/candidates/candidatesContext.tsx
   'use client';
   
   import { createContext, useContext, useState, useEffect } from 'react';
   import { fetchCandidates } from '@/app/dashboard/_actions/candidates/fetch-candidates';
   
   const CandidatesContext = createContext(null);
   
   export function CandidatesProvider({ children }) {
     const [candidates, setCandidates] = useState([]);
     const [loading, setLoading] = useState(true);
     // Outros estados
     
     useEffect(() => {
       async function loadCandidates() {
         setLoading(true);
         const data = await fetchCandidates();
         setCandidates(data);
         setLoading(false);
       }
       
       loadCandidates();
     }, []);
     
     // Métodos e lógica
     
     const value = {
       candidates,
       loading,
       // Outros valores e métodos
     };
     
     return (
       <CandidatesContext.Provider value={value}>
         {children}
       </CandidatesContext.Provider>
     );
   }
   
   export function useCandidates() {
     const context = useContext(CandidatesContext);
     if (context === null) {
       throw new Error('useCandidates must be used within a CandidatesProvider');
     }
     return context;
   }
   ```

2. **Implementação Gradual dos Contextos**

   ```tsx
   // app/dashboard/layout.tsx
   import { CandidatesProvider } from '@/app/contexts/candidates/candidatesContext';
   import { InterviewsProvider } from '@/app/contexts/interviews/interviewsContext';
   // Outras importações
   
   export default function DashboardLayout({ children }) {
     return (
       // Manter provedores existentes
       <ExistingProviders>
         {/* Adicionar novos provedores */}
         <CandidatesProvider>
           <InterviewsProvider>
             {children}
           </InterviewsProvider>
         </CandidatesProvider>
       </ExistingProviders>
     );
   }
   ```

3. **Migração de Componentes para Usar Novos Contextos**

   ```tsx
   // dashboard/_components/candidates/CandidatesList/index.tsx
   import { useCandidates } from '@/app/contexts/candidates/candidatesContext';
   import { CandidateCard } from './CandidateCard';
   import { EmptyState } from './EmptyState';
   
   export function CandidatesList() {
     // Usar o novo contexto
     const { candidates, loading, filters } = useCandidates();
     
     // Filtragem agora feita no contexto
     const filteredCandidates = candidates.filter(/* ... */);
     
     if (loading) {
       return <div>Carregando...</div>;
     }
     
     if (!filteredCandidates.length) {
       return <EmptyState />;
     }
     
     return (
       <div className="candidates-list">
         {filteredCandidates.map(candidate => (
           <CandidateCard key={candidate.id} candidate={candidate} />
         ))}
       </div>
     );
   }
   ```

### Fase 4: Padronização e Otimização (Semanas 8-9)

1. **Implementação de Padrões de Código**

   Configurar ESLint com regras personalizadas:

   ```js
   // .eslintrc.js
   module.exports = {
     extends: [
       'next/core-web-vitals',
       // Outros extends
     ],
     rules: {
       // Regras para garantir padrões consistentes
       'react/function-component-definition': ['error', {
         namedComponents: 'function-declaration',
       }],
       'react-hooks/exhaustive-deps': 'warn',
       // Mais regras
     },
   };
   ```

2. **Otimização de Performance**

   ```tsx
   // Exemplo de memoização em componentes de lista
   import { memo } from 'react';
   
   // Antes
   export function CandidateCard({ candidate }) {
     // Renderização
   }
   
   // Depois
   export const CandidateCard = memo(function CandidateCard({ candidate }) {
     // Renderização
   });
   ```

   ```tsx
   // Uso de useMemo para cálculos caros
   import { useMemo } from 'react';
   
   function ComplexComponent({ data }) {
     const processedData = useMemo(() => {
       // Processamento de dados complexo
       return data.map(/* ... */);
     }, [data]);
     
     // Renderização usando processedData
   }
   ```

### Fase 5: Validação e Documentação (Semana 10)

1. **Teste Abrangente**
   ```bash
   # Testar todos os fluxos e funcionalidades
   npm run test:e2e -- --project=desktop
   npm run test:e2e -- --project=mobile
   npm run test:visual
   npm run test:accessibility
   ```

2. **Documentação de Componentes**

   Exemplo de documentação para um componente:

   ```tsx
   // dashboard/_components/candidates/CandidatesList/index.tsx
   /**
    * @component CandidatesList
    * 
    * @description
    * Exibe uma lista de candidatos com filtros aplicados.
    * Usa o contexto CandidatesContext para dados e estado.
    * 
    * @example
    * <CandidatesList />
    * 
    * @dependencies
    * - useCandidates
    * - CandidateCard
    * - EmptyState
    */
   export function CandidatesList() {
     // Implementação...
   }
   ```

## Estratégia de Migração para Produção

Para garantir uma transição segura:

1. **Implementação Incremental**
   - Cada módulo refatorado passa por validação isolada
   - Verificações de regressão visual em cada PR

2. **Feature Flags para Componentes Refatorados**
   ```tsx
   // Possibilidade de voltar à implementação original
   {useFeatureFlag('new-candidates-ui') ? (
     <NewCandidatesList />
   ) : (
     <OriginalCandidatesList />
   )}
   ```

3. **Monitoramento Pós-lançamento**
   - Tracking de erros em produção
   - Feedbacks de usuários
   - Métricas de performance

## Conclusão

Este guia detalhado proporciona um plano concreto para implementação da refatoração do Localiza Vagas, preservando completamente todas as funcionalidades e a experiência visual do usuário. Seguindo estas diretrizes, será possível transformar o código em uma base mais sustentável e escalável, facilitando a manutenção e a evolução do sistema no futuro.

A abordagem gradual, com testes contínuos e validação em cada etapa, minimiza os riscos e garante que os usuários não percebam alterações negativas durante o processo de refatoração.
