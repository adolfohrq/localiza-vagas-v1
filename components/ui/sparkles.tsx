"use client"

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface SparklesProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string
  size?: number
  count?: number
}

export function Sparkles({
  className,
  color = 'currentColor',
  size = 16,
  count = 3,
  ...props
}: SparklesProps) {
  const [sparks, setSparks] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([])

  useEffect(() => {
    // Gerar faíscas aleatórias
    const newSparks = Array.from({ length: count }).map((_, index) => ({
      id: index,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 0.5 + Math.random() * 0.5, // Tamanho entre 50% e 100% do tamanho original
      delay: Math.random() * 0.5 // Atraso entre 0 e 0.5s
    }))
    setSparks(newSparks)

    // Re-gerar faíscas a cada 2 segundos para efeito contínuo
    const interval = setInterval(() => {
      const newSparks = Array.from({ length: count }).map((_, index) => ({
        id: index,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 0.5 + Math.random() * 0.5,
        delay: Math.random() * 0.5
      }))
      setSparks(newSparks)
    }, 2000)

    return () => clearInterval(interval)
  }, [count])

  return (
    <div className={cn('relative inline-block', className)} {...props}>
      {sparks.map((spark) => (
        <span
          key={spark.id}
          className="absolute inline-block animate-ping"
          style={{
            top: `${spark.y}%`,
            left: `${spark.x}%`,
            width: `${size * spark.size}px`,
            height: `${size * spark.size}px`,
            backgroundColor: color,
            borderRadius: '50%',
            opacity: 0,
            animationDelay: `${spark.delay}s`,
            animationDuration: '1s'
          }}
        />
      ))}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-pulse"
      >
        <path d="M12 3v5m0 13v-5m9-8-4.5 3M3 10l4.5 3m13 1-4.5-3M3 14l4.5-3" />
      </svg>
    </div>
  )
} 