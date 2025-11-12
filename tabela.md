# Estrutura da Tabela de Candidatos

## 1. Estrutura Visual

### Cabeçalho da Tabela
- Fundo: `bg-muted/50`
- Borda inferior: `border-b`
- Padding: `px-4 py-3`
- Layout em grid com 12 colunas usando `grid grid-cols-12 gap-4`

### Colunas
1. **Checkbox (w-10)** - Para seleção múltipla
2. **Candidato (col-span-3)** - Nome, avatar e cargo
3. **Status (col-span-2)** - Badge com status do candidato
4. **Cargo (col-span-2)** - Posição do candidato
5. **Compatibilidade (col-span-2)** - Barra de progresso
6. **Data (col-span-2)** - Data de aplicação
7. **Ações (col-span-1)** - Menu dropdown

### Linhas
- Hover: `hover:bg-muted/50`
- Selecionada: `bg-muted/50`
- Padding: `px-4 py-3`
- Borda divisória: `divide-y`

## 2. Componentes Utilizados

### Avatar
```tsx
<Avatar className={candidate.viewed ? "" : "ring-2 ring-primary ring-offset-2"}>
  <AvatarImage src={candidate.avatar} />
  <AvatarFallback className="bg-primary/10 text-primary font-medium">
    {candidate.name.split(' ').map(n => n[0]).join('')}
  </AvatarFallback>
</Avatar>
```

### Badge de Status
```tsx
<Badge
  variant={statusStyles[candidate.status].variant}
  className={statusStyles[candidate.status].color}
>
  {statusStyles[candidate.status].label}
</Badge>
```

### Barra de Compatibilidade
```tsx
<div className="mr-2 relative h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
  <div 
    className="absolute top-0 left-0 h-full rounded-full"
    style={{width: `${candidate.matchScore}%`}}
  />
</div>
```

### Menu de Ações
```tsx
<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="ghost" size="sm">
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    {/* Itens do menu */}
  </DropdownMenuContent>
</DropdownMenu>
```

## 3. Funcionalidades

### Seleção Múltipla
- Checkbox individual por linha
- Checkbox no cabeçalho para selecionar todos
- Estado controlado por `selectedCandidates`
- Ações em lote aparecem quando há seleção

### Ordenação
- Ordenação por:
  - Mais recentes
  - Nome
  - Cargo
  - Compatibilidade
- Controlado pelo estado `sortBy`

### Filtragem
- Busca por texto (nome, email, cargo, habilidades)
- Filtros por:
  - Status
  - Cargo
  - Vaga
  - Habilidades
- Filtros avançados em painel expansível

### Interatividade
- Hover em linhas
- Indicador visual de seleção
- Menu de ações por candidato
- Indicador de não visualizado (anel no avatar)
- Favoritos com ícone de coração

## 4. Estados e Controles

### Estados Principais
```typescript
const [searchTerm, setSearchTerm] = useState("")
const [statusFilter, setStatusFilter] = useState("all")
const [sortBy, setSortBy] = useState("recent")
const [selectedCandidates, setSelectedCandidates] = useState<number[]>([])
```

### Funções de Controle
```typescript
const toggleCandidateSelection = (index: number) => {
  setSelectedCandidates(prev => 
    prev.includes(index) 
      ? prev.filter(i => i !== index) 
      : [...prev, index]
  )
}

const toggleAllCandidates = () => {
  if (selectedCandidates.length === candidates.length) {
    setSelectedCandidates([])
  } else {
    setSelectedCandidates(candidates.map((_, index) => index))
  }
}
```

## 5. Estilos e Temas

### Cores de Status
```typescript
const statusStyles = {
  new: { label: "Novo", variant: "default", color: "blue" },
  reviewing: { label: "Em Análise", variant: "secondary", color: "purple" },
  interviewed: { label: "Entrevistado", variant: "outline", color: "green" },
  approved: { label: "Aprovado", variant: "success", color: "green" },
  rejected: { label: "Rejeitado", variant: "destructive", color: "red" },
  offer: { label: "Oferta", variant: "warning", color: "amber" },
  hired: { label: "Contratado", variant: "success", color: "green" }
}
```

### Classes Utilitárias Principais
- Layout: `flex`, `grid`, `items-center`, `justify-between`
- Espaçamento: `gap-4`, `space-x-2`, `p-4`
- Cores: `bg-muted`, `text-muted-foreground`
- Interatividade: `hover:bg-muted/50`, `group-hover`
- Transições: `transition-colors`, `transition-transform`

## 6. Responsividade

- Grid responsivo com 12 colunas
- Adaptação de espaçamentos em diferentes breakpoints
- Ocultação de colunas menos importantes em telas menores
- Menu de ações sempre acessível

## 7. Acessibilidade

- Labels semânticos para campos
- Textos alternativos para ícones
- Foco visível em elementos interativos
- Estrutura de tabela semanticamente correta
- Suporte a navegação por teclado 