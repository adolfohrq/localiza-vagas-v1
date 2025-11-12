"use client"

import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

export function InterviewCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Calendário de Entrevistas</h3>
      <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
    </div>
  )
}

