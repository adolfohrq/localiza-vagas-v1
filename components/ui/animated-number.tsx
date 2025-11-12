"use client"

import React, { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedNumberProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: string | number
  duration?: number
  formatValue?: (value: number) => string
}

export function AnimatedNumber({
  className,
  value,
  duration = 1000,
  formatValue,
  ...props
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const previousValueRef = useRef(0)
  const startTimeRef = useRef(0)
  const frameRef = useRef(0)
  
  // Parse value to number
  const targetValue = typeof value === 'string' 
    ? parseFloat(value.replace(/,/g, '')) 
    : value

  const getFormattedValue = (val: number) => {
    if (formatValue) return formatValue(val)
    
    // Se o valor original tinha vírgulas, formata com vírgulas
    if (typeof value === 'string' && value.includes(',')) {
      return val.toLocaleString('pt-BR')
    }
    
    return val.toString()
  }

  const animateValue = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp
    }
    
    const runtime = timestamp - startTimeRef.current
    const progress = runtime / duration
    
    if (progress < 1) {
      const newValue = previousValueRef.current + (targetValue - previousValueRef.current) * progress
      setDisplayValue(newValue)
      frameRef.current = requestAnimationFrame(animateValue)
    } else {
      setDisplayValue(targetValue)
      startTimeRef.current = 0
      previousValueRef.current = targetValue
    }
  }

  useEffect(() => {
    // Inicia animação quando o valor mudar
    previousValueRef.current = displayValue
    frameRef.current = requestAnimationFrame(animateValue)
    
    return () => {
      cancelAnimationFrame(frameRef.current)
    }
  }, [targetValue])

  return (
    <span className={cn(className)} {...props}>
      {getFormattedValue(Math.floor(displayValue))}
    </span>
  )
} 