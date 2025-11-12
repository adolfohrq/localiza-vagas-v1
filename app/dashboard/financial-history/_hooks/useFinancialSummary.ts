"use client"

import { useMemo } from "react"
import { isThisMonth, subMonths } from "date-fns"
import { Transaction } from "../_data/transactions-data"

export function useFinancialSummary(transactions: Transaction[]) {
  return useMemo(() => {
    // Cálculos financeiros
    const currentMonthAmount = transactions
      .filter(t => isThisMonth(new Date(t.date)) && t.status !== "failed")
      .reduce((sum, t) => sum + t.amount, 0)
      
    const lastMonthAmount = transactions
      .filter(t => {
        const date = new Date(t.date)
        const lastMonth = subMonths(new Date(), 1)
        return date.getMonth() === lastMonth.getMonth() && 
          date.getFullYear() === lastMonth.getFullYear() &&
          t.status !== "failed"
      })
      .reduce((sum, t) => sum + t.amount, 0)
      
    const hasTrend = lastMonthAmount > 0
    const trend = currentMonthAmount > lastMonthAmount
    const trendPercentage = hasTrend 
      ? Math.round(Math.abs(currentMonthAmount - lastMonthAmount) / lastMonthAmount * 100)
      : 0

    return {
      currentMonthAmount,
      lastMonthAmount,
      hasTrend,
      trend,
      trendPercentage
    }
  }, [transactions])
} 