# Guia de Refatoramento para página de Entrevistas

## Visão Geral

Este documento fornece instruções detalhadas para refatorar a página de entrevistas (`app/dashboard/interviews/page.tsx`), mantendo **exatamente o mesmo layout e funcionalidades**.

## Objetivos do Refatoramento

1. Melhorar a organização do código
2. Aumentar a modularidade e reutilização de componentes
3. Separar responsabilidades (UI vs. lógica de negócio)
4. Aplicar padrões consistentes de componentização
5. Manter 100% das funcionalidades e a aparência visual existente

## Estrutura de Arquivos Proposta

```
app/dashboard/interviews/
├── page.tsx                      # Componente principal (simplificado)
├── _components/                  # Componentes específicos desta página
│   ├── interview-list.tsx        # Visualização em lista
│   ├── interview-calendar.tsx    # Visualização em calendário
│   ├── interview-analytics.tsx   # Visualização de análise
│   ├── interview-filters.tsx     # Filtros de entrevistas
│   ├── interview-card.tsx        # Card individual de entrevista
│   ├── interview-details.tsx     # Modal de detalhes da entrevista
│   ├── interview-stats-cards.tsx # Cards de estatísticas
│   ├── interview-alerts.tsx      # Alertas e notificações
│   ├── interview-actions.tsx     # Ações em lote e individuais
│   └── interview-header.tsx      # Cabeçalho da página
└── _hooks/                       # Hooks específicos para entrevistas
    ├── use-interviews.ts         # Gerencia os dados e estado das entrevistas
    ├── use-interview-filters.ts  # Lógica de filtragem
    ├── use-interview-sort.ts     # Lógica de ordenação
    └── use-interview-actions.ts  # Lógica para ações em entrevistas
```


## Passos para o Refatoramento

### 1. Preparação
- Criar os diretórios necessários: `_components`, `_hooks`, `_types`, `_data`
- Extrair os tipos e interfaces para `_types/index.ts`
- Extrair os dados mockados para `_data/mock-data.ts`

### 2. Criar Hooks Personalizados
- Implementar `use-interviews.ts` com toda a lógica de gerenciamento de entrevistas
- Implementar `use-interview-filters.ts` com a lógica de filtragem e ordenação
- Implementar `use-interview-stats.ts` para cálculos de estatísticas

### 3. Componentizar a UI
- Dividir a interface em componentes menores conforme a estrutura proposta
- Manter todas as classes CSS e estilos exatamente como no original
- Garantir que os componentes recebam todos os props necessários

### 4. Reconstruir o Componente Principal
- Simplificar o componente principal da página usando os novos hooks e componentes
- Manter a mesma ordem e estrutura visual

## Detalhamento dos Componentes

Para cada componente, extrair a parte relevante do código original mantendo:
1. Todas as classes CSS e estilos
2. Toda a lógica de renderização condicional
3. Todos os event handlers
4. A mesma hierarquia de elementos

## Recomendações Finais

1. **Abordagem Incremental**: Refatore um componente de cada vez para minimizar erros
3. **Mantenha as Classes CSS**: Copie todas as classes CSS exatamente como estão no original
4. **Reutilize Lógica**: Extraia funções comuns para hooks personalizados
5. **Nomes Descritivos**: Use nomes claros e descritivos para componentes e props
6. **Comentários**: Adicione comentários para seções complexas
7. **Type Safety**: Mantenha tipagem forte em todos os componentes

Lembre-se de que o objetivo principal é reorganizar o código mantendo a funcionalidade e a aparência **exatamente iguais**. Qualquer mudança visual ou comportamental é inaceitável no contexto deste refatoramento. 