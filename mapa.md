# Mapa do Projeto

## Estrutura do Projeto

O projeto está organizado em uma arquitetura baseada em Next.js, seguindo o padrão de roteamento App Router. A estrutura principal inclui:

### Diretórios Principais
- `/app`: Contém as rotas e páginas da aplicação
- `/components`: Componentes reutilizáveis
- `/contexts`: Contextos React para gerenciamento de estado global
- `/hooks`: Hooks personalizados
- `/lib`: Utilitários e funções auxiliares
- `/public`: Arquivos estáticos
- `/styles`: Estilos globais

### Estrutura de Rotas
O projeto utiliza a estrutura de roteamento do Next.js App Router com várias seções:
- `/(auth)`: Rotas relacionadas à autenticação
- `/(main)`: Rotas principais da aplicação
- `/(dashboards)`: Dashboards para diferentes tipos de usuários
- `/admin-login`: Login administrativo
- `/blog`: Seção de blog
- `/candidate-dashboard`: Dashboard para candidatos
- `/contato`: Página de contato
- `/dashboard`: Dashboard principal
- `/empresas`: Seção para empresas
- `/faq`: Perguntas frequentes
- `/logout`: Rota de logout
- `/profissionais`: Seção para profissionais
- `/sobre`: Página sobre
- `/termos`: Termos de uso
- `/vagas`: Listagem de vagas

## Componetização

### Componentes de UI
O projeto utiliza uma biblioteca de componentes UI personalizada baseada em Radix UI e Tailwind CSS. Os componentes estão organizados em `/components/ui` e incluem:
- Componentes básicos: Button, Input, Checkbox, etc.
- Componentes de navegação: NavigationMenu, Breadcrumb, etc.
- Componentes de feedback: Toast, Alert, Dialog, etc.
- Componentes de layout: Card, Sheet, Drawer, etc.
- Componentes de data display: Table, Calendar, etc.
- Componentes de animação: AnimatedBar, AnimatedNumber, Sparkles, etc.

### Componentes de Página
Componentes específicos para diferentes seções do site:
- Headers: Múltiplas variações (Modern, Minimal, Creative, Business, Elegant, Tech)
- Dashboard: Componentes específicos para dashboards (Sidebar, Header, Nav)
- Cards: Job Card, Company Card, Professional Card
- Modais: Login Modal, Auth Dialog
- Componentes de entrevista: Interview List, Interview Calendar, Interview Feedback

## Lógica de Negócio

### Autenticação
- Gerenciada através do `AuthContext.tsx` que fornece estado e funções de autenticação
- Implementa login, registro, logout e verificação de estado de autenticação

### Dashboards
- Dashboards específicos para diferentes tipos de usuários (candidatos, empresas, admin)
- Componentes de estatísticas e visualização de dados
- Sistema de notificações e mensagens

### Sistema de Vagas
- Listagem de vagas com filtros avançados
- Sistema de candidatura
- Acompanhamento de processos seletivos

### Gamificação
- Sistema de conquistas (Achievements)
- Desafios diários (Daily Quests)
- Árvore de habilidades (Skill Tree)
- Recompensas e marcos (Milestones)

## Dependências Principais

### UI e Componentes
- Radix UI: Biblioteca de componentes primitivos acessíveis
- Tailwind CSS: Framework de CSS utilitário
- Framer Motion: Biblioteca de animações
- Embla Carousel: Carrossel de conteúdo
- Recharts: Biblioteca de gráficos
- DND Kit: Drag and drop

### Formulários
- React Hook Form: Gerenciamento de formulários
- Zod: Validação de esquemas

### Utilitários
- date-fns: Manipulação de datas
- clsx/tailwind-merge: Utilitários para classes CSS
- Lucide React: Ícones
- React Icons: Biblioteca adicional de ícones

### Desenvolvimento
- TypeScript: Tipagem estática
- ESLint: Linting de código
- Next.js: Framework React
- Concurrently/ngrok: Ferramentas de desenvolvimento

## Padrões de Refatoramento

O projeto demonstra vários padrões de refatoramento:

1. **Componentização Modular**: Componentes são divididos em unidades pequenas e reutilizáveis

2. **Separação de Responsabilidades**:
   - UI/UX separada da lógica de negócios
   - Hooks personalizados para lógica reutilizável
   - Contextos para gerenciamento de estado global

3. **Consistência de Design**:
   - Sistema de design unificado através de componentes UI
   - Variantes de componentes para diferentes contextos visuais

4. **Organização de Código**:
   - Estrutura de diretórios clara e organizada
   - Convenções de nomenclatura consistentes
   - Componentes agrupados por funcionalidade

5. **Reutilização**:
   - Componentes base reutilizáveis (UI)
   - Hooks personalizados para lógica comum
   - Utilitários compartilhados

O projeto segue uma arquitetura moderna de aplicação web com foco em componentização, reutilização e separação clara de responsabilidades. 

## Contexto do Projeto

### Estrutura de Diretórios Detalhada

```
/
├── app/                # Rotas e páginas da aplicação (Next.js App Router)
│   ├── (auth)/        # Grupo de rotas de autenticação
│   ├── (main)/        # Grupo de rotas principais
│   ├── (dashboards)/  # Grupo de rotas de dashboards
│   ├── dashboard/     # Dashboard principal
│   ├── candidate-dashboard/ # Dashboard para candidatos
│   ├── _components/   # Componentes específicos para rotas
│   ├── _data/         # Dados estáticos para rotas
│   ├── components/    # Componentes específicos para app
│   ├── contexts/      # Contextos específicos para app
│   ├── hooks/         # Hooks específicos para app
│   ├── lib/           # Utilitários específicos para app
│   └── globals.css    # Estilos globais
├── components/        # Componentes reutilizáveis em toda aplicação
│   ├── ui/            # Componentes shadcn/ui (baseados em Radix UI)
│   ├── examples/      # Componentes de exemplo
│   └── [componentes específicos] # Componentes de página e funcionalidade
├── contexts/          # Contextos React globais
│   └── AuthContext.tsx # Contexto de autenticação
├── hooks/             # Custom hooks React
│   ├── use-mobile.tsx # Hook para detecção de dispositivos móveis
│   └── use-toast.ts   # Hook para sistema de toast
├── lib/               # Utilitários e funções auxiliares
├── public/            # Arquivos estáticos
├── styles/            # Estilos globais adicionais
├── types/             # Definições de tipos TypeScript
└── config/            # Arquivos de configuração
```

### Stack Tecnológica

- **Framework Principal**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS + CSS Modules
- **Componentes UI**: Radix UI (via shadcn/ui)
- **Gerenciador de Estado**: React Context API + Hooks
- **Formulários**: React Hook Form + Zod
- **Animações**: Framer Motion
- **Ícones**: Lucide React + React Icons
- **Gráficos**: Recharts
- **Drag and Drop**: DND Kit
- **Data/Tempo**: date-fns
- **Notificações**: Sonner (toast)
- **Carrossel**: Embla Carousel

### Regras e Padrões de Desenvolvimento

- **Componentização**: Priorizar a criação de componentes pequenos, focados e reutilizáveis
- **UI Consistente**: Utilizar os componentes shadcn/ui (`/components/ui`) sempre que possível
- **Estilização**: Priorizar o uso de Tailwind CSS para estilização
- **Client Components**: Usar "use client" apenas quando necessário para otimizar performance
- **Separação de Responsabilidades**: 
  - Componentes de UI separados da lógica de negócio
  - Hooks para lógica reutilizável
  - Contextos para estado global
- **Nomenclatura**:
  - Componentes: PascalCase
  - Funções/hooks: camelCase
  - Arquivos de componentes: kebab-case.tsx
- **Organização de Código**:
  - Agrupar componentes por funcionalidade
  - Manter componentes específicos de rota dentro da pasta da rota
  - Componentes globais no diretório `/components` 