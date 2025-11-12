"use client"

import React, { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  maxValue?: number
  minValue?: number
  color?: string
  background?: string
  height?: string
  animated?: boolean
  duration?: number
}

export function AnimatedBar({
  className,
  value,
  maxValue = 100,
  minValue = 0,
  color = "bg-primary",
  background = "bg-muted",
  height = "h-2",
  animated = true,
  duration = 800,
  ...props
}: AnimatedBarProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const previousValueRef = useRef(0)
  const startTimeRef = useRef(0)
  const frameRef = useRef(0)
  
  // Normalizar valor entre 0-100 para width
  const normalizedValue = Math.max(Math.min(value, maxValue), minValue)
  const percentValue = ((normalizedValue - minValue) / (maxValue - minValue)) * 100
  
  const animateValue = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp
    }
    
    const runtime = timestamp - startTimeRef.current
    const progress = runtime / duration
    
    if (progress < 1) {
      const newValue = previousValueRef.current + (percentValue - previousValueRef.current) * progress
      setDisplayValue(newValue)
      frameRef.current = requestAnimationFrame(animateValue)
    } else {
      setDisplayValue(percentValue)
      startTimeRef.current = 0
      previousValueRef.current = percentValue
    }
  }
  
  useEffect(() => {
    if (animated) {
      previousValueRef.current = displayValue
      frameRef.current = requestAnimationFrame(animateValue)
      
      return () => {
        cancelAnimationFrame(frameRef.current)
      }
    } else {
      setDisplayValue(percentValue)
    }
  }, [percentValue, animated])
  
  return (
    <div 
      className={cn('overflow-hidden rounded-full', background, height, className)} 
      {...props}
    >
      <div 
        className={cn(
          "h-full transition-all rounded-full", 
          animated ? "motion-safe:transition-[width] motion-safe:duration-700 motion-safe:ease-out" : "",
          color
        )}
        style={{ width: `${displayValue}%` }}
        role="progressbar"
        aria-valuemin={minValue}
        aria-valuemax={maxValue}
        aria-valuenow={value}
      />
    </div>
  )
} 