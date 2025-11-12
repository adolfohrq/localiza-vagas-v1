# Guia de Refatoramento para página de Candidatos

## Visão Geral

Este documento fornece instruções detalhadas para refatorar a página de candidatos (`app/dashboard/candidates/page.tsx`), mantendo **exatamente o mesmo layout e funcionalidades**.

## Objetivos do Refatoramento

1. Melhorar a organização do código
2. Aumentar a modularidade e reutilização de componentes
3. Separar responsabilidades (UI vs. lógica de negócio)
4. Aplicar padrões consistentes de componentização
5. Manter 100% das funcionalidades e a aparência visual existente

## Estrutura de Arquivos Proposta

```
app/dashboard/candidates/
├── page.tsx                       # Componente principal (simplificado)
├── _components/                   # Componentes específicos desta página
│   ├── candidate-list.tsx         # Visualização em lista
│   ├── candidate-kanban.tsx       # Visualização em kanban
│   ├── candidate-analytics.tsx    # Visualização de análise
│   ├── candidate-filters.tsx      # Filtros de candidatos
│   ├── candidate-card.tsx         # Card individual de candidato
│   ├── candidate-profile.tsx      # Modal de perfil do candidato
│   ├── candidate-stats-cards.tsx  # Cards de estatísticas
│   ├── candidate-stage.tsx        # Componente de estágio no kanban
│   ├── candidate-actions.tsx      # Ações em lote e individuais
│   ├── candidate-header.tsx       # Cabeçalho da página
│   ├── candidate-add-form.tsx     # Formulário para adicionar candidato
│   ├── candidate-insights.tsx     # Seção de insights e recomendações
│   └── candidate-tabs.tsx         # Sistema de navegação por abas
└── _hooks/                        # Hooks específicos para candidatos
    ├── use-candidates.ts          # Gerencia os dados e estado dos candidatos
    ├── use-candidate-filters.ts   # Lógica de filtragem
    ├── use-candidate-sort.ts      # Lógica de ordenação
    ├── use-candidate-stats.ts     # Cálculos de estatísticas
    ├── use-candidate-actions.ts   # Lógica para ações em candidatos
    └── use-drag-drop.ts           # Lógica para drag and drop no kanban
```

## Passos para o Refatoramento

### 1. Preparação
- Criar os diretórios necessários: `_components`, `_hooks`, `_types`, `_data`
- Extrair os tipos e interfaces para `_types/index.ts`
- Extrair os dados mockados para `_data/mock-data.ts`
- Extrair constantes como `statusStyles` e `stageLabels` para `_data/constants.ts`

### 2. Criar Hooks Personalizados
- Implementar `use-candidates.ts` com toda a lógica de gerenciamento de candidatos
- Implementar `use-candidate-filters.ts` com a lógica de filtragem e ordenação
- Implementar `use-candidate-stats.ts` para cálculos de estatísticas
- Implementar `use-drag-drop.ts` para gerenciar a funcionalidade de arrastar e soltar

### 3. Componentizar a UI
- Dividir a interface em componentes menores conforme a estrutura proposta
- Manter todas as classes CSS e estilos exatamente como no original
- Garantir que os componentes recebam todos os props necessários
- Separar as três visualizações principais (lista, kanban, analytics) em componentes distintos

### 4. Reconstruir o Componente Principal
- Simplificar o componente principal da página usando os novos hooks e componentes
- Manter a mesma ordem e estrutura visual
- Gerenciar o estado global da aplicação de forma centralizada

## Detalhamento dos Componentes

### `candidate-list.tsx`
- Extrair a visualização em lista completa, incluindo cabeçalho da tabela e linhas de candidatos
- Manter a lógica de seleção de candidatos e ações em lote

### `candidate-kanban.tsx`
- Extrair a visualização em kanban com o contexto DndContext
- Incluir a lógica de drag and drop e os componentes de estágio

### `candidate-analytics.tsx`
- Extrair a visualização de análise completa com todos os gráficos e cards
- Manter a estrutura de grid e todos os elementos visuais

### `candidate-stage.tsx`
- Componente para representar um estágio no kanban
- Incluir a lógica de drop zone e a lista de candidatos

### `candidate-card.tsx`
- Componente reutilizável para exibir um candidato (usado tanto na lista quanto no kanban)
- Incluir variantes para diferentes contextos de exibição

### `candidate-profile.tsx`
- Modal completo de perfil do candidato
- Incluir todas as abas, formulários e ações

### `candidate-filters.tsx`
- Componente para os filtros avançados e campo de busca
- Manter toda a lógica de filtragem

### `candidate-tabs.tsx`
- Sistema de navegação por abas com contadores
- Manter a lógica de filtragem por aba

### `candidate-stats-cards.tsx`
- Cards de estatísticas no topo da página
- Incluir animações e estilos interativos

### `candidate-add-form.tsx`
- Formulário para adicionar novo candidato
- Incluir validação e gerenciamento de estado do formulário

## Recomendações Finais

1. **Abordagem Incremental**: Refatore um componente de cada vez para minimizar erros
2. **Mantenha as Classes CSS**: Copie todas as classes CSS exatamente como estão no original
3. **Reutilize Lógica**: Extraia funções comuns para hooks personalizados
4. **Nomes Descritivos**: Use nomes claros e descritivos para componentes e props
5. **Comentários**: Adicione comentários para seções complexas
6. **Type Safety**: Mantenha tipagem forte em todos os componentes
7. **Drag and Drop**: Mantenha a biblioteca DndKit e sua configuração exata

## Considerações Específicas

Lembre-se de que o objetivo principal é reorganizar o código mantendo a funcionalidade e a aparência **exatamente iguais**. Qualquer mudança visual ou comportamental é inaceitável no contexto deste refatoramento. 