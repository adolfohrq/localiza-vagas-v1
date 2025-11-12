# Instruções de Refatoração - Localiza Vagas

## Objetivo
Simplificar arquivos grandes, preservando funcionalidades e layout.


## Processo
Refatorar incrementalmente, módulo por módulo.

## Estrutura por Página
Organizar cada página em uma estrutura independente:


app/[módulo]/
├── _components/          # Componentes específicos do módulo
│   ├── [seção]/         # Subpastas por funcionalidade
│   │   ├── index.tsx    # Componente principal da seção
│   │   └── [SubComponente].tsx # Subcomponentes
├── _hooks/              # Hooks customizados
│   ├── use[Funcionalidade].ts # Hooks por funcionalidade
├── _actions/            # Server Actions
│   ├── [ação].ts       # Ações do servidor
└── page.tsx             # Página simplificada


## Passos por Página
1. Analisar: Identificar seções, lógica e dependências.
2. Extrair:
   - UI para `_components/[seção]/`
   - Lógica para `_hooks/`
   - Ações servidor para `_actions/`
3. Simplificar: Montar página com componentes, usar `Suspense` para loading.
4. Validar: Testar após cada extração (E2E, visual).

## Observação
Layout e funcionalidades devem permanecer idênticos ao original, sem qualquer alteração na experiência do usuário ou comportamento da aplicação.

## Resultado Esperado
Páginas modulares, legíveis e independentes, com responsabilidades distribuídas, mantendo URL, layout e funcionalidades inalteradas.