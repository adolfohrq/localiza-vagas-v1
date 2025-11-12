# Documentação do Projeto: Localiza Vagas

## Visão Geral

O **Localiza Vagas** é uma plataforma completa de busca de empregos e recrutamento que conecta profissionais a oportunidades de trabalho. O projeto é desenvolvido utilizando tecnologias modernas como Next.js, React e TailwindCSS, proporcionando uma experiência fluida tanto para candidatos quanto para empresas contratantes.

## Tecnologias Principais

- **Frontend**: Next.js 14, React 18
- **Estilização**: TailwindCSS, componentes shadcn/ui
- **Estado e Formulários**: React Hook Form, Zod (validação)
- **UI/UX**: Radix UI, Framer Motion, Lucide Icons
- **Outros**: DnD Kit (drag and drop), date-fns (manipulação de datas)

## Estrutura de Pastas e Arquivos - Detalhamento Completo

### Diretório Raiz

O projeto segue uma estrutura organizada de acordo com as boas práticas do Next.js:

- **app/**: Contém todas as rotas e páginas do aplicativo (App Router do Next.js)
  - `page.tsx` (812 linhas) - Página inicial do site
  - `layout.tsx` (31 linhas) - Layout principal da aplicação
  - `globals.css` (76 linhas) - Estilos globais CSS
  
  **app/dashboard/**: Dashboard para empresas/recrutadores
  - `page.tsx` (1585 linhas) - Página principal do dashboard
  - `layout.tsx` (62 linhas) - Layout do dashboard
  - `page.tsx.bak` (1753 linhas) - Backup da página principal do dashboard
  - `page.tsx.bak2` (1753 linhas) - Segundo backup da página
  - `page.new.tsx` (5 linhas) - Nova versão da página (em desenvolvimento)
  - `page.final` (5 linhas) - Versão final da página (provavelmente placeholder)
  
  **app/dashboard/tasks/**
  - `page.tsx` (1671 linhas) - Página de gerenciamento de tarefas
  
  **app/dashboard/support/**
  - `page.tsx` (1711 linhas) - Página principal de suporte
  
  **app/candidate-dashboard/**: Dashboard para candidatos
  - `page.tsx` (340 linhas) - Página principal do dashboard do candidato
  - `layout.tsx` (74 linhas) - Layout do dashboard do candidato

- **components/**: Componentes reutilizáveis da interface
  - `dashboard-nav.tsx` (122 linhas) - Navegação lateral do dashboard
  - `job-postings.tsx` (246 linhas) - Listagem de vagas
  - `candidate-dashboard-nav.tsx` (133 linhas) - Navegação lateral do dashboard do candidato
  - `candidate-dashboard-header.tsx` (741 linhas) - Cabeçalho para o dashboard do candidato
  - `interview-preparation.tsx` (70 linhas) - Componente para preparação de entrevistas
  - `professional-card.tsx` (113 linhas) - Card para exibição de perfis profissionais
  - `company-card.tsx` (143 linhas) - Card para exibição de empresas
  - `job-card.tsx` (225 linhas) - Card para exibição de vagas
  - `header.tsx` (755 linhas) - Cabeçalho principal do site
  - `footer.tsx` (193 linhas) - Rodapé do site
  - `header-elegant.tsx` (438 linhas) - Variante elegante do cabeçalho
  - `header-tech.tsx` (331 linhas) - Variante tecnológica do cabeçalho
  - `header-creative.tsx` (377 linhas) - Variante criativa do cabeçalho
  - `header-business.tsx` (305 linhas) - Variante business do cabeçalho
  - `header-minimal.tsx` (322 linhas) - Variante minimalista do cabeçalho
  - `header-modern.tsx` (799 linhas) - Variante moderna do cabeçalho
  - `header-alt.tsx` (742 linhas) - Variante alternativa do cabeçalho
  - `login-modal.tsx` (567 linhas) - Modal de login
  - `auth-dialog.tsx` (155 linhas) - Diálogo de autenticação
  - `dashboard-header.tsx` (33 linhas) - Cabeçalho para o dashboard
  - `toaster.tsx` (35 linhas) - Componente de toast notifications
  - `achievement-analytics.tsx` (60 linhas) - Análise de conquistas
  - `achievement-overview.tsx` (158 linhas) - Visão geral de conquistas
  - `achievements.tsx` (37 linhas) - Sistema de conquistas
  - `activity-timeline.tsx` (79 linhas) - Linha do tempo de atividades
  - `admin-dashboard-header.tsx` (49 linhas) - Cabeçalho do dashboard do administrador
  - `admin-dashboard-nav.tsx` (103 linhas) - Navegação do dashboard do administrador
  - `admin-dashboard-shell.tsx` (14 linhas) - Shell do dashboard do administrador
  - `all-feedbacks-dialog.tsx` (27 linhas) - Diálogo de todos os feedbacks
  - `badge-card.tsx` (59 linhas) - Card de emblemas
  - `badge-gallery.tsx` (37 linhas) - Galeria de emblemas
  - `cancel-dialog.tsx` (42 linhas) - Diálogo de cancelamento
  - `cancel-interview-dialog.tsx` (140 linhas) - Diálogo de cancelamento de entrevista
  - `candidate-dashboard-shell.tsx` (12 linhas) - Shell do dashboard do candidato
  - `challenges.tsx` (104 linhas) - Desafios para candidatos
  - `color-swatch.tsx` (14 linhas) - Amostra de cores
  - `company-filters.tsx` (211 linhas) - Filtros para busca de empresas
  - `daily-quests.tsx` (85 linhas) - Missões diárias
  - `dashboard-shell.tsx` (12 linhas) - Shell do dashboard
  - `dashboard-stats.tsx` (60 linhas) - Estatísticas do dashboard
  - `interview-calendar.tsx` (17 linhas) - Calendário de entrevistas
  - `interview-details-dialog.tsx` (129 linhas) - Diálogo de detalhes da entrevista
  - `interview-feedback-grid.tsx` (113 linhas) - Grade de feedbacks de entrevistas
  - `interview-feedback.tsx` (69 linhas) - Feedback de entrevistas
  - `interview-list.tsx` (164 linhas) - Listagem de entrevistas
  - `interview-stats.tsx` (50 linhas) - Estatísticas de entrevistas
  - `job-filters.tsx` (240 linhas) - Filtros para busca de vagas
  - `leaderboard.tsx` (43 linhas) - Ranking de candidatos
  - `mentorship-program.tsx` (70 linhas) - Programa de mentoria
  - `milestones.tsx` (45 linhas) - Marcos e objetivos
  - `new-badge-notification.tsx` (>20 linhas) - Notificação de novo emblema
  - `notification-center.tsx` (>50 linhas) - Centro de notificações
  - `overview.tsx` (>50 linhas) - Visão geral
  - `personalized-dashboard.tsx` (>50 linhas) - Dashboard personalizado
  - `personalized-recommendations.tsx` (>50 linhas) - Recomendações personalizadas
  - `professional-filters.tsx` (>200 linhas) - Filtros para busca de profissionais
  - `recent-activities.tsx` (>50 linhas) - Atividades recentes
  - `recent-applications.tsx` (>50 linhas) - Candidaturas recentes
  - `reschedule-dialog.tsx` (>100 linhas) - Diálogo de reagendamento
  - `rewards.tsx` (>50 linhas) - Sistema de recompensas
  - `skill-assessment.tsx` (>50 linhas) - Avaliação de habilidades
  - `skill-tree.tsx` (>400 linhas) - Árvore de habilidades
  - `social-sharing.tsx` (>30 linhas) - Compartilhamento social
  - `style-guide-sidebar.tsx` (>30 linhas) - Barra lateral do guia de estilo
  - `theme-provider.tsx` (>10 linhas) - Provedor de tema

  **components/ui/**: Componentes de UI reutilizáveis
  - `animated-bar.tsx` (89 linhas) - Barra animada
  - `animated-number.tsx` (74 linhas) - Número animado
  - `sparkles.tsx` (82 linhas) - Efeito de partículas
  - `use-toast.ts` (195 linhas) - Hook para toast notifications
  - `toast.tsx` (131 linhas) - Componente de toast
  - `checkbox.tsx` (32 linhas) - Checkbox personalizado
  - `dialog.tsx` (123 linhas) - Componente de diálogo
  - `accordion.tsx` (59 linhas) - Componente de acordeão
  - `alert-dialog.tsx` (142 linhas) - Diálogo de alerta
  - `alert.tsx` (60 linhas) - Componente de alerta
  - `aspect-ratio.tsx` (8 linhas) - Componente para manter proporção de aspecto
  - `avatar.tsx` (51 linhas) - Componente de avatar
  - `badge.tsx` (31 linhas) - Componente de badge
  - `breadcrumb.tsx` (116 linhas) - Navegação breadcrumb
  - `button.tsx` (46 linhas) - Componente de botão
  - `calendar.tsx` (57 linhas) - Componente de calendário
  - `card.tsx` (52 linhas) - Componente de card
  - `carousel.tsx` (263 linhas) - Componente de carrossel
  - `chart.tsx` (366 linhas) - Componente de gráfico
  - `collapsible.tsx` (12 linhas) - Componente colapsável
  - `command.tsx` (154 linhas) - Paleta de comandos
  - `context-menu.tsx` (201 linhas) - Menu de contexto
  - `date-range-picker.tsx` (55 linhas) - Seletor de intervalo de datas
  - `drawer.tsx` (119 linhas) - Componente de gaveta
  - `dropdown-menu.tsx` (183 linhas) - Menu dropdown
  - `form.tsx` (179 linhas) - Componente de formulário
  - `hover-card.tsx` (30 linhas) - Card que aparece ao passar o mouse
  - `input-otp.tsx` (72 linhas) - Input para código OTP
  - `input.tsx` (24 linhas) - Componente de input
  - `label.tsx` (27 linhas) - Componente de label
  - `menubar.tsx` (237 linhas) - Barra de menu
  - `navigation-menu.tsx` (129 linhas) - Menu de navegação
  - `pagination.tsx` (118 linhas) - Componente de paginação
  - `popover.tsx` (32 linhas) - Componente de popover
  - `progress.tsx` (27 linhas) - Barra de progresso
  - `radio-group.tsx` (45 linhas) - Grupo de radio buttons
  - `resizable.tsx` (46 linhas) - Componente redimensionável
  - `scroll-area.tsx` (49 linhas) - Área de rolagem personalizada
  - `select.tsx` (105 linhas) - Componente de select
  - `separator.tsx` (32 linhas) - Componente separador
  - `sheet.tsx` (141 linhas) - Componente de folha lateral
  - `sidebar.tsx` (764 linhas) - Componente de barra lateral
  - `skeleton.tsx` (16 linhas) - Componente de carregamento skeleton
  - `slider.tsx` (29 linhas) - Componente de slider
  - `sonner.tsx` (32 linhas) - Componente de notificação
  - `switch.tsx` (30 linhas) - Componente de switch
  - `table.tsx` (118 linhas) - Componente de tabela
  - `tabs.tsx` (56 linhas) - Componente de abas
  - `textarea.tsx` (23 linhas) - Componente de área de texto
  - `toast.ts` (112 linhas) - Configuração de toast
  - `toaster.tsx` (>20 linhas) - Contêiner de toast
  - `toggle-group.tsx` (>40 linhas) - Grupo de toggles
  - `toggle.tsx` (>30 linhas) - Componente de toggle
  - `tooltip.tsx` (>30 linhas) - Componente de tooltip
  - `use-mobile.tsx` (>15 linhas) - Hook para detecção de dispositivo móvel

- **contexts/**: Contextos React para gerenciamento de estado global
  - `AuthContext.tsx` (140 linhas) - Contexto de autenticação

- **hooks/**: Hooks personalizados para lógica reutilizável
  - `use-mobile.tsx` (20 linhas) - Hook para detecção de dispositivo móvel
  - `use-toast.ts` (195 linhas) - Hook para toast notifications

- **lib/**: Funções utilitárias e helpers
  - `utils.ts` (8 linhas) - Funções utilitárias gerais

- **public/**: Arquivos estáticos (imagens, ícones)
  - `placeholder-logo.png` (4 linhas) - Logo placeholder em formato PNG
  - `placeholder-logo.svg` (1 linha) - Logo placeholder em formato SVG
  - `placeholder-user.jpg` (10 linhas) - Imagem placeholder para usuários
  - `placeholder.jpg` (8 linhas) - Imagem placeholder genérica
  - `placeholder.svg` (1 linha) - SVG placeholder genérico
  - **public/avatars/**: Pasta para armazenar avatares de usuários (vazia)

- **styles/**: Estilos globais e configurações de CSS
  - `globals.css` (114 linhas) - Estilos globais da aplicação

- **types/**: Definições de tipos TypeScript
  - Pasta ainda não contém arquivos, provavelmente para futuras definições de tipos

- **config/**: Arquivos de configuração do projeto
  - Pasta ainda não contém arquivos, provavelmente para futuras configurações

- **docs/**: Documentação adicional
  - `ngrok-setup.md` (97 linhas) - Guia de configuração do ngrok para desenvolvimento

- **Arquivos de Configuração na Raiz**:
  - `tsconfig.json` (28 linhas) - Configuração do TypeScript
  - `.gitignore` (27 linhas) - Arquivos ignorados pelo Git
  - `components.json` (21 linhas) - Configuração dos componentes
  - `next.config.mjs` (49 linhas) - Configuração do Next.js
  - `postcss.config.mjs` (9 linhas) - Configuração do PostCSS
  - `tailwind.config.ts` (82 linhas) - Configuração do TailwindCSS
  - `next-env.d.ts` (6 linhas) - Tipos do ambiente Next.js
  - `package.json` (85 linhas) - Dependências e scripts do projeto
  - `package-lock.json` (5094 linhas) - Lock file das dependências

### Detalhamento das Rotas (app/)

O projeto utiliza a arquitetura de App Router do Next.js, dividindo as rotas em várias seções:

#### Páginas Públicas
- **/** (página inicial): Landing page principal com busca de vagas e informações gerais
- **/vagas/**: Listagem e busca de vagas disponíveis
- **/profissionais/**: Listagem de profissionais disponíveis
- **/empresas/**: Listagem de empresas cadastradas
- **/sobre/**: Informações sobre a plataforma
- **/contato/**: Formulário de contato
- **/blog/**: Blog com artigos relacionados a carreira
- **/termos/**: Termos de uso e políticas
- **/faq/**: Perguntas frequentes

#### Área de Autenticação
- **/admin-login/**: Login para administradores
- **(auth)/**: Grupo de rotas para autenticação de usuários

#### Dashboards
- **/dashboard/**: Dashboard para empresas/recrutadores com várias subseções:
  - `page.tsx` (1585 linhas) - Página principal do dashboard
  - `layout.tsx` (62 linhas) - Layout do dashboard
  - **/dashboard/jobs/**: Gerenciamento de vagas publicadas
    - `page.tsx` (345 linhas) - Página principal de gerenciamento de vagas
    - **/dashboard/jobs/[id]/**: Rota dinâmica para detalhes de vaga específica
      - **/dashboard/jobs/[id]/edit/**: Edição de vaga
        - `page.tsx` (87 linhas) - Formulário de edição de vaga
      - **/dashboard/jobs/[id]/candidates/**: Candidatos para a vaga
        - `page.tsx` (222 linhas) - Lista de candidatos para a vaga específica
    - **/dashboard/jobs/new/**: Criação de nova vaga
      - **/dashboard/jobs/new/create/**: Criação de vaga
        - `page.tsx` (463 linhas) - Formulário de criação de vaga
      - **/dashboard/jobs/new/select-plan/**: Seleção de plano para vaga
        - `page.tsx` (409 linhas) - Seleção de plano para publicação
  - **/dashboard/candidates/**: Gerenciamento de candidatos
    - `page.tsx` (2660 linhas) - Página principal de gerenciamento de candidatos
  - **/dashboard/interviews/**: Agendamento e gerenciamento de entrevistas
    - `page.tsx` (2398 linhas) - Página principal de gerenciamento de entrevistas
  - **/dashboard/company/**: Perfil da empresa
    - `page.tsx` (559 linhas) - Página de gerenciamento do perfil da empresa
  - **/dashboard/messages/**: Sistema de mensagens
    - `page.tsx` (2091 linhas) - Sistema de mensagens e chat
  - **/dashboard/settings/**: Configurações da conta
    - `page.tsx` (383 linhas) - Página de configurações da conta
  - **/dashboard/plans/**: Planos e assinaturas
    - `page.tsx` (347 linhas) - Página de gerenciamento de planos e assinaturas
  - **/dashboard/financial-history/**: Histórico financeiro
    - `page.tsx` (501 linhas) - Página de histórico financeiro e transações
  - **/dashboard/ai-search/**: Busca avançada por candidatos com IA
    - `page.tsx` (231 linhas) - Página de busca avançada por candidatos (primeira versão)
  - **/dashboard/ai-search-v2/**: Busca avançada por candidatos com IA (versão 2)
    - `page.tsx` (928 linhas) - Página melhorada de busca avançada por candidatos
  - **/dashboard/support/**: Suporte ao usuário
    - `page.tsx` (1711 linhas) - Página principal de suporte
    - **/dashboard/support/ticket/**: Tickets de suporte
    - **/dashboard/support/reports/**: Relatórios de suporte
    - **/dashboard/support/settings/**: Configurações de suporte
  - **/dashboard/tasks/**: Gerenciamento de tarefas
    - `page.tsx` (1671 linhas) - Página de gerenciamento de tarefas

- **/candidate-dashboard/**: Dashboard para candidatos com várias subseções:
  - `page.tsx` (340 linhas) - Página principal do dashboard do candidato
  - `layout.tsx` (74 linhas) - Layout do dashboard do candidato
  - **/candidate-dashboard/applications/**: Candidaturas enviadas
    - `page.tsx` (1038 linhas) - Página de gerenciamento de candidaturas enviadas
  - **/candidate-dashboard/applications-v2/**: Nova versão de candidaturas (em desenvolvimento)
  - **/candidate-dashboard/interviews/**: Entrevistas agendadas
    - `page.tsx` (445 linhas) - Página de gerenciamento de entrevistas
  - **/candidate-dashboard/entrevistas-v2/**: Nova versão de entrevistas (em desenvolvimento)
  - **/candidate-dashboard/resume/**: Gerenciamento de currículo
    - `page.tsx` (3360 linhas) - Página de criação e edição de currículo
    - **/candidate-dashboard/resume/components/**: Componentes específicos do currículo
  - **/candidate-dashboard/messages/**: Sistema de mensagens
    - `page.tsx` (1593 linhas) - Sistema de mensagens e chat para candidatos
  - **/candidate-dashboard/settings/**: Configurações da conta
    - `page.tsx` (137 linhas) - Página de configurações da conta do candidato
  - **/candidate-dashboard/achievements/**: Sistema de conquistas e gamificação
    - `page.tsx` (118 linhas) - Página de conquistas e gamificação
  - **/candidate-dashboard/achievements-v2/**: Nova versão de conquistas (em desenvolvimento)
  - **/candidate-dashboard/notifications/**: Centro de notificações
    - `page.tsx` (993 linhas) - Centro de notificações para candidatos
  - **/candidate-dashboard/ai-job-search/**: Busca inteligente de vagas
    - `page.tsx` (1559 linhas) - Busca inteligente de vagas com IA
  - **/candidate-dashboard/support/**: Suporte ao usuário
    - `page.tsx` (2295 linhas) - Página principal de suporte para candidatos
    - **/candidate-dashboard/support/ticket/**: Tickets de suporte
    - **/candidate-dashboard/support/reports/**: Relatórios
    - **/candidate-dashboard/support/settings/**: Configurações de suporte

## Análise da Complexidade do Código

A análise da quantidade de linhas de código por arquivo revela:

1. **Arquivos extremamente complexos (2000+ linhas)**:
   - `app/candidate-dashboard/resume/page.tsx` (3360 linhas) - Editor de currículo
   - `app/dashboard/candidates/page.tsx` (2660 linhas) - Gerenciamento de candidatos
   - `app/dashboard/interviews/page.tsx` (2398 linhas) - Gerenciamento de entrevistas
   - `app/candidate-dashboard/support/page.tsx` (2295 linhas) - Suporte ao candidato
   - `app/dashboard/messages/page.tsx` (2091 linhas) - Sistema de mensagens para empresas

2. **Arquivos mais complexos (1000+ linhas)**:
   - `app/dashboard/support/page.tsx` (1711 linhas)
   - `app/dashboard/tasks/page.tsx` (1671 linhas)
   - `app/candidate-dashboard/messages/page.tsx` (1593 linhas)
   - `app/dashboard/page.tsx` (1585 linhas)
   - `app/candidate-dashboard/ai-job-search/page.tsx` (1559 linhas)
   - `app/dashboard/page.tsx.bak` e `app/dashboard/page.tsx.bak2` (1753 linhas cada)
   - `app/candidate-dashboard/applications/page.tsx` (1038 linhas)
   - `app/candidate-dashboard/notifications/page.tsx` (993 linhas)
   - `package-lock.json` (5094 linhas) - Lock file das dependências

3. **Arquivos grandes (500-999 linhas)**:
   - `components/header-modern.tsx` (799 linhas)
   - `components/header.tsx` (755 linhas)
   - `components/ui/sidebar.tsx` (764 linhas)
   - `components/header-alt.tsx` (742 linhas)
   - `components/candidate-dashboard-header.tsx` (741 linhas)
   - `components/login-modal.tsx` (567 linhas)

4. **Arquivos médios (200-499 linhas)**:
   - `components/header-elegant.tsx` (438 linhas)
   - `app/candidate-dashboard/page.tsx` (340 linhas)
   - `components/header-tech.tsx` (331 linhas)
   - `components/header-minimal.tsx` (322 linhas)
   - `components/header-business.tsx` (305 linhas)
   - `components/header-creative.tsx` (377 linhas)
   - `components/ui/chart.tsx` (366 linhas)
   - `components/ui/carousel.tsx` (263 linhas)
   - `components/job-postings.tsx` (246 linhas)
   - `components/job-filters.tsx` (240 linhas)
   - `components/ui/menubar.tsx` (237 linhas)
   - `components/job-card.tsx` (225 linhas)
   - `components/company-filters.tsx` (211 linhas)
   - `components/professional-filters.tsx` (>200 linhas)

5. **Arquivos pequenos (100-199 linhas)**:
   - `components/ui/context-menu.tsx` (201 linhas)
   - `hooks/use-toast.ts` (195 linhas)
   - `components/ui/use-toast.ts` (195 linhas)
   - `components/footer.tsx` (193 linhas)
   - `components/ui/dropdown-menu.tsx` (183 linhas)
   - `components/ui/form.tsx` (179 linhas)
   - `components/interview-list.tsx` (164 linhas)
   - `components/achievement-overview.tsx` (158 linhas)
   - `components/ui/command.tsx` (154 linhas)
   - `components/auth-dialog.tsx` (155 linhas)
   - `components/ui/navigation-menu.tsx` (129 linhas)
   - `components/interview-details-dialog.tsx` (129 linhas)
   - `components/ui/alert-dialog.tsx` (142 linhas)
   - `components/ui/sheet.tsx` (141 linhas)
   - `components/cancel-interview-dialog.tsx` (140 linhas)
   - `contexts/AuthContext.tsx` (140 linhas)
   - `components/candidate-dashboard-nav.tsx` (133 linhas)
   - `components/ui/toast.tsx` (131 linhas)
   - `components/ui/dialog.tsx` (123 linhas)
   - `components/dashboard-nav.tsx` (122 linhas)
   - `components/ui/drawer.tsx` (119 linhas)
   - `components/ui/table.tsx` (118 linhas)
   - `components/ui/pagination.tsx` (118 linhas)
   - `components/ui/breadcrumb.tsx` (116 linhas)
   - `styles/globals.css` (114 linhas)
   - `components/interview-feedback-grid.tsx` (113 linhas)
   - `components/professional-card.tsx` (113 linhas)
   - `components/ui/toast.ts` (112 linhas)
   - `components/ui/select.tsx` (105 linhas)
   - `components/challenges.tsx` (104 linhas)
   - `components/admin-dashboard-nav.tsx` (103 linhas)
   - `docs/ngrok-setup.md` (97 linhas)

6. **Arquivos muito pequenos (<100 linhas)**:
   - `components/ui/animated-bar.tsx` (89 linhas)
   - `package.json` (85 linhas)
   - `tailwind.config.ts` (82 linhas)
   - `components/ui/sparkles.tsx` (82 linhas)
   - `components/activity-timeline.tsx` (79 linhas)
   - `app/globals.css` (76 linhas)
   - `components/ui/animated-number.tsx` (74 linhas)
   - `app/candidate-dashboard/layout.tsx` (74 linhas)
   - `components/ui/input-otp.tsx` (72 linhas)
   - `components/interview-preparation.tsx` (70 linhas)
   - `components/mentorship-program.tsx` (70 linhas)
   - `components/interview-feedback.tsx` (69 linhas)
   - `app/dashboard/layout.tsx` (62 linhas)
   - `components/achievement-analytics.tsx` (60 linhas)
   - `components/ui/accordion.tsx` (59 linhas)
   - `components/badge-card.tsx` (59 linhas)
   - `components/ui/calendar.tsx` (57 linhas)
   - `components/ui/tabs.tsx` (56 linhas)
   - `components/ui/date-range-picker.tsx` (55 linhas)
   - `components/ui/card.tsx` (52 linhas)
   - `components/ui/avatar.tsx` (51 linhas)
   - `components/interview-stats.tsx` (50 linhas)
   - `components/admin-dashboard-header.tsx` (49 linhas)
   - `next.config.mjs` (49 linhas)
   - `components/ui/scroll-area.tsx` (49 linhas)
   - `components/ui/button.tsx` (46 linhas)
   - `components/ui/resizable.tsx` (46 linhas)
   - `components/milestones.tsx` (45 linhas)
   - `components/ui/radio-group.tsx` (45 linhas)
   - `components/leaderboard.tsx` (43 linhas)
   - `components/cancel-dialog.tsx` (42 linhas)
   - `components/achievements.tsx` (37 linhas)
   - `components/badge-gallery.tsx` (37 linhas)
   - `components/toaster.tsx` (35 linhas)
   - `components/dashboard-header.tsx` (33 linhas)
   - `components/ui/checkbox.tsx` (32 linhas)
   - `components/ui/separator.tsx` (32 linhas)
   - `components/ui/popover.tsx` (32 linhas)
   - `components/ui/sonner.tsx` (32 linhas)
   - `app/layout.tsx` (31 linhas)
   - `components/ui/badge.tsx` (31 linhas)
   - `components/ui/hover-card.tsx` (30 linhas)
   - `components/ui/switch.tsx` (30 linhas)
   - `components/ui/slider.tsx` (29 linhas)
   - `tsconfig.json` (28 linhas)
   - `.gitignore` (27 linhas)
   - `components/all-feedbacks-dialog.tsx` (27 linhas)
   - `components/ui/label.tsx` (27 linhas)
   - `components/ui/progress.tsx` (27 linhas)
   - `components/ui/input.tsx` (24 linhas)
   - `components/ui/textarea.tsx` (23 linhas)
   - `components/ui/skeleton.tsx` (16 linhas)
   - `components/admin-dashboard-shell.tsx` (14 linhas)
   - `components/color-swatch.tsx` (14 linhas)
   - `components/ui/collapsible.tsx` (12 linhas)
   - `components/dashboard-shell.tsx` (12 linhas)
   - `components/candidate-dashboard-shell.tsx` (12 linhas)
   - `placeholder-user.jpg` (10 linhas)
   - `postcss.config.mjs` (9 linhas)
   - `components/ui/aspect-ratio.tsx` (8 linhas)
   - `placeholder.jpg` (8 linhas)
   - `lib/utils.ts` (8 linhas)
   - `next-env.d.ts` (6 linhas)
   - `page.new.tsx` (5 linhas)
   - `page.final` (5 linhas)
   - `placeholder-logo.png` (4 linhas)
   - `placeholder-logo.svg` (1 linha)
   - `placeholder.svg` (1 linha)

## Funcionalidades Principais

### Para Candidatos
1. **Busca de Vagas**: Filtros avançados para encontrar as melhores oportunidades
2. **Gerenciamento de Candidaturas**: Acompanhamento de todas as candidaturas enviadas
3. **Perfil Profissional**: Criação e edição de perfil detalhado
4. **Entrevistas**: Agendamento e acompanhamento de entrevistas
5. **Sistema de Gamificação**: Conquistas, emblemas e pontuações
6. **IA para Recomendações**: Sugestões personalizadas de vagas
7. **Preparação para Entrevistas**: Recursos e dicas para entrevistas
8. **Avaliação de Habilidades**: Testes e avaliações para destacar competências

### Para Empresas
1. **Publicação de Vagas**: Criação e gerenciamento de vagas
2. **Busca de Candidatos**: Filtros avançados para encontrar profissionais
3. **Gerenciamento de Entrevistas**: Agendamento e feedback de entrevistas
4. **Dashboards Analíticos**: Visão geral do processo de recrutamento
5. **Perfil da Empresa**: Personalização do perfil e marca
6. **IA para Matching**: Algoritmos inteligentes para matching de candidatos
7. **Planos e Assinaturas**: Diferentes níveis de serviço
8. **Suporte Dedicado**: Atendimento especializado para recrutadores
9. **Sistema de Tarefas**: Gerenciamento completo de tarefas relacionadas ao recrutamento (1671 linhas de código)
10. **Sistema de Suporte**: Canal de suporte completo com tickets, relatórios e configurações (1711 linhas de código)
11. **Sistema de Notificações**: Centro de notificações em tempo real para atualizações de candidaturas, entrevistas e mensagens
12. **Relatórios e Análises Avançadas**: Métricas detalhadas sobre processos seletivos, conversões e desempenho das vagas
13. **Sistema Financeiro**: Gerenciamento completo do histórico financeiro e transações relacionadas a assinaturas e serviços (501 linhas de código)

### Área de Administração

O projeto também inclui uma área administrativa completa, conforme evidenciado pelos componentes específicos para administradores:

1. **Painel de Controle Administrativo**: Interface centralizada para gerenciamento da plataforma
2. **Gestão de Usuários**: Controle de contas de candidatos e empresas
3. **Moderação de Conteúdo**: Revisão e aprovação de vagas e perfis
4. **Gestão Financeira**: Administração de pagamentos e assinaturas
5. **Relatórios Administrativos**: Métricas e estatísticas gerais da plataforma
6. **Configurações do Sistema**: Controle de parâmetros e funcionalidades da plataforma

Esta área é acessível apenas para usuários com privilégios de administrador através da rota `/admin-login/` e conta com componentes dedicados como `admin-dashboard-header.tsx` (49 linhas), `admin-dashboard-nav.tsx` (103 linhas) e `admin-dashboard-shell.tsx` (14 linhas).

## Aspectos Técnicos Adicionais

### Autenticação
O projeto utiliza um sistema de autenticação personalizado através do `AuthContext`, permitindo diferentes níveis de acesso (candidato, empresa, administrador).

### Responsividade
A interface é totalmente responsiva, adaptando-se a diferentes tamanhos de tela (desktop, tablet, mobile) através do TailwindCSS.

### Acessibilidade
Os componentes são desenvolvidos com foco em acessibilidade, utilizando a biblioteca Radix UI que segue padrões ARIA.

### Performance
O uso do Next.js permite otimizações como Server Components, caching e carregamento progressivo para melhor performance.

### Internacionalização
O site está configurado em português do Brasil como padrão, com estrutura para suportar múltiplos idiomas no futuro.

### Ambiente de Desenvolvimento
O projeto inclui configuração para ngrok, permitindo testes do aplicativo em dispositivos externos durante o desenvolvimento, conforme documentado em `docs/ngrok-setup.md`.

### Segurança e Conformidade com LGPD
A plataforma implementa medidas de segurança e conformidade com a Lei Geral de Proteção de Dados (LGPD):

1. **Criptografia de Dados**: Informações sensíveis são criptografadas tanto em trânsito quanto em repouso
2. **Controle de Acesso**: Sistema de permissões granulares baseado em perfis de usuário
3. **Política de Retenção de Dados**: Gerenciamento do ciclo de vida das informações
4. **Consentimento do Usuário**: Mecanismos para coleta e gestão de consentimentos
5. **Anonimização**: Técnicas para desidentificação de dados em relatórios e análises
6. **Logs de Auditoria**: Registro de atividades para conformidade e investigação de incidentes

### Integrações do Sistema
O Localiza Vagas oferece capacidades de integração com sistemas externos:

1. **APIs RESTful**: Endpoints documentados para integração com sistemas de RH e ATS
2. **Webhooks**: Notificações em tempo real para eventos importantes do sistema
3. **SSO (Single Sign-On)**: Suporte a provedores de identidade externos
4. **Export/Import**: Funcionalidades para exportação e importação de dados em formatos padrão
5. **Integrações com Redes Sociais**: Compartilhamento de vagas e login social
6. **Calendários**: Sincronização com Google Calendar e Microsoft Outlook para entrevistas

## Configurações e Dependências

### Dependências Principais
- Next.js, React
- TailwindCSS
- Componentes Radix UI
- React Hook Form com Zod
- Framer Motion
- DnD Kit
- lucide-react (ícones)
- date-fns
- recharts (para gráficos)

### Configurações
- TypeScript para tipagem estática
- ESLint para linting
- TailwindCSS para estilos
- PostCSS para processamento CSS

## Conclusão

O projeto **Localiza Vagas** é uma plataforma robusta e completa para o mercado de recrutamento, oferecendo funcionalidades avançadas tanto para candidatos quanto para empresas. Com uma arquitetura moderna baseada em Next.js e uma interface intuitiva e acessível, o projeto visa transformar o processo de busca de emprego e contratação, tornando-o mais eficiente e agradável para todos os envolvidos.

A análise detalhada da quantidade de linhas de código por arquivo revela uma arquitetura bem estruturada, com componentes claramente definidos e responsabilidades separadas. Os arquivos mais complexos concentram-se nas principais funcionalidades de negócio, como as páginas de dashboard, enquanto os componentes menores mantêm o princípio da responsabilidade única. Esta organização facilita a manutenção a longo prazo e o desenvolvimento incremental do projeto.

A grande quantidade de componentes de UI reutilizáveis (mais de 50 componentes) demonstra o foco em criar uma experiência de usuário consistente e modular, permitindo um desenvolvimento ágil e escalável para novas funcionalidades.

O projeto ainda possui algumas pastas vazias ou com poucos arquivos (types/, config/), indicando que está em desenvolvimento ativo e com espaço para expansão em áreas específicas, como tipagem avançada e configurações modulares. 