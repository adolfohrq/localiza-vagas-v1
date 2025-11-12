# Refatoração do Módulo de Busca com IA

Este diretório contém a versão refatorada do módulo de Busca com IA, seguindo as diretrizes de refatoração para melhorar a organização, manutenção e escalabilidade do código.

## Estrutura de Diretórios

```
app/dashboard/ai-search-v2/
├── _components/                # Componentes da interface
│   ├── CandidateDialog/        # Diálogo de detalhes do candidato
│   │   ├── EducationTab.tsx    # Aba de formação acadêmica
│   │   ├── ExperienceTab.tsx   # Aba de experiência profissional
│   │   ├── LocationTab.tsx     # Aba de localização
│   │   ├── SkillsTab.tsx       # Aba de habilidades
│   │   └── index.tsx           # Componente principal do diálogo
│   ├── ResultsPanel/           # Painel de resultados da busca
│   │   ├── CandidateCard.tsx   # Card de candidato
│   │   ├── EmptyState.tsx      # Estado vazio (sem resultados)
│   │   ├── InitialState.tsx    # Estado inicial (antes da busca)
│   │   ├── SearchingState.tsx  # Estado de busca em andamento
│   │   └── index.tsx           # Componente principal de resultados
│   └── SearchPanel/            # Painel de busca
│       ├── ExperienceSlider.tsx # Slider de peso da experiência
│       ├── JobSelection.tsx    # Seleção de vaga
│       ├── SearchParameters.tsx # Parâmetros de busca
│       └── index.tsx           # Componente principal de busca
├── _data/                      # Dados mockados
│   ├── candidates.ts           # Dados de candidatos
│   └── jobs.ts                 # Dados de vagas
├── _hooks/                     # Hooks personalizados
│   ├── useCandidateSearch.ts   # Hook para busca de candidatos
│   └── useJobSelection.ts      # Hook para seleção de vagas
└── page.tsx                    # Página principal
```

## Principais Melhorias

1. **Decomposição de Componentes**: O arquivo original `page.tsx` (com 928 linhas) foi decomposto em múltiplos componentes menores e mais focados.

2. **Separação de Responsabilidades**: 
   - Componentes de UI separados por funcionalidade
   - Lógica de negócio extraída para hooks personalizados
   - Dados mockados isolados em arquivos específicos

3. **Reutilização de Código**: Componentes como `CandidateCard`, `SearchParameters`, etc. podem ser facilmente reutilizados em outras partes da aplicação.

4. **Manutenibilidade**: Cada componente tem uma responsabilidade clara e bem definida, facilitando a manutenção e evolução do código.

5. **Escalabilidade**: A nova estrutura permite adicionar novas funcionalidades de forma mais organizada e com menor impacto no código existente.

## Como Usar

A página principal (`page.tsx`) integra todos os componentes e hooks, mantendo a mesma funcionalidade da versão original, mas com um código mais limpo e organizado.

Para adicionar novas funcionalidades:

1. Para novos componentes de UI, adicione-os no diretório `_components/` apropriado
2. Para novas lógicas de negócio, crie hooks personalizados no diretório `_hooks/`
3. Para novos dados mockados, adicione-os no diretório `_data/`

## Funcionalidades Preservadas

- Seleção de vagas
- Configuração de parâmetros de busca
- Visualização de resultados de candidatos
- Detalhes de compatibilidade de candidatos
- Ações de convidar candidatos e exportar resultados 