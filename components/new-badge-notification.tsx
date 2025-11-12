"use client"

import { useState, useEffect } from "react"
import { Toast, ToastDescription, ToastTitle } from "@/components/ui/toast"
import { Award } from "lucide-react"

export function NewBadgeNotification() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Simulate a new badge being added
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <Toast>
      <div className="flex items-center">
        <Award className="h-6 w-6 text-blue-500 mr-2" />
        <div>
          <ToastTitle>Novo selo disponível!</ToastTitle>
          <ToastDescription>Conquiste o selo de Liderança Inspiradora agora!</ToastDescription>
        </div>
      </div>
    </Toast>
  )
}

