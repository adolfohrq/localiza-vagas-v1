// Tipos
export type TransactionType = "payment" | "package" | "extra"
export type Status = "completed" | "pending" | "failed"

export interface Transaction {
  id: string
  date: string
  type: TransactionType
  description: string
  amount: number
  status: Status
  planId?: string
}

export interface Plan {
  id: string
  name: string
  color: string
}

// Dados mock - ampliados e relacionados a planos
export const transactions: Transaction[] = [
  {
    id: "1",
    date: "2024-05-05",
    type: "payment",
    description: "Assinatura Plano Pro",
    amount: 499.99,
    status: "completed",
    planId: "pro"
  },
  {
    id: "2",
    date: "2024-04-05",
    type: "payment",
    description: "Assinatura Plano Pro",
    amount: 499.99,
    status: "completed",
    planId: "pro"
  },
  {
    id: "3",
    date: "2024-04-15",
    type: "package",
    description: "Pacote de 10 vagas em destaque",
    amount: 149.99,
    status: "completed",
  },
  {
    id: "4",
    date: "2024-03-05",
    type: "payment",
    description: "Assinatura Plano Básico",
    amount: 249.99,
    status: "completed",
    planId: "basic"
  },
  {
    id: "5",
    date: "2024-03-12",
    type: "extra",
    description: "Destaque na Home",
    amount: 75.00,
    status: "completed",
  },
  {
    id: "6",
    date: "2024-06-05",
    type: "payment",
    description: "Assinatura Plano Pro",
    amount: 499.99,
    status: "pending",
    planId: "pro"
  },
  {
    id: "7",
    date: "2024-03-18",
    type: "package",
    description: "Pacote de 30 dias",
    amount: 100.00,
    status: "failed",
  }
]

// Planos relacionados
export const plans: Plan[] = [
  { id: "basic", name: "Básico", color: "blue" },
  { id: "pro", name: "Pro", color: "purple" },
  { id: "enterprise", name: "Empresarial", color: "green" }
] 