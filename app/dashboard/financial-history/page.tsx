"use client"

import { DashboardShell } from "@/components/dashboard-shell"
import { FinancialHeader } from "./_components/FinancialHeader"
import { FinancialSummary } from "./_components/Reports/FinancialSummary"
import { TransactionList } from "./_components/TransactionList"
import { transactions } from "./_data/transactions-data"

export default function FinancialHistoryPage() {
  return (
    <DashboardShell>
      <FinancialHeader />
      <FinancialSummary transactions={transactions} />
      <TransactionList />
    </DashboardShell>
  )
}

