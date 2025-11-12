"use client"

import { useMemo } from "react"
import { Interview, InterviewStats } from "../_types"
import { format, parseISO, isSameDay, addDays, isAfter, isBefore, isToday, startOfDay, 
         isWithinInterval } from "date-fns"

export function useInterviewStats(
  interviews: Interview[], 
  favoriteInterviews: string[], 
  uniqueJobs: { id: string; title: string }[]
): InterviewStats {
  // Calcular estatísticas de entrevistas
  return useMemo(() => {
    const today = startOfDay(new Date())
    const tomorrow = addDays(today, 1)
    const nextHour = new Date(new Date().setMinutes(new Date().getMinutes() + 60))

    return {
      total: interviews.length,
      scheduled: interviews.filter(i => i.status === "scheduled").length,
      conducted: interviews.filter(i => i.status === "conducted").length,
      completed: interviews.filter(i => i.status === "completed").length,
      cancelled: interviews.filter(i => i.status === "cancelled").length,
      rescheduled: interviews.filter(i => i.status === "rescheduled").length,
      pending: interviews.filter(i => i.status === "pending").length,
    
      todayInterviews: interviews.filter(i => 
        isToday(parseISO(i.date)) && 
        i.status === "scheduled"
      ).length,
      
      nextHourInterviews: interviews.filter(i => 
        isWithinInterval(parseISO(i.date), { start: new Date(), end: nextHour }) && 
        i.status === "scheduled"
      ).length,
    
      tomorrowInterviews: interviews.filter(i => 
        isSameDay(parseISO(i.date), addDays(new Date(), 1)) && 
        i.status === "scheduled"
      ).length,
    
      online: interviews.filter(i => i.type === "online").length,
      inPerson: interviews.filter(i => i.type === "in-person").length,
      phone: interviews.filter(i => i.type === "phone").length,
      
      highPriority: interviews.filter(i => i.priority === "high" && i.status === "scheduled").length,
      pendingFeedback: interviews.filter(i => 
        (i.status === "conducted" || i.status === "completed") && !i.hasFeedback
      ).length,
    
      completion: {
        total: interviews.length,
        done: interviews.filter(i => i.status === "completed" || i.status === "conducted" || i.status === "cancelled").length,
        percentage: Math.round((interviews.filter(i => i.status === "completed" || i.status === "conducted" || i.status === "cancelled").length / interviews.length) * 100)
      },
      
      byJob: uniqueJobs.map(job => ({
        id: job.id,
        title: job.title,
        count: interviews.filter(i => i.position === job.id).length
      })),
    
      upcoming: interviews.filter(i => 
        isAfter(parseISO(i.date), new Date()) && 
        i.status === "scheduled"
      ).sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime()).slice(0, 3),
      
      favoriteCount: favoriteInterviews.length,
      
      byWeekday: [0, 1, 2, 3, 4, 5, 6].map(day => ({
        day: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][day],
        count: interviews.filter(i => 
          parseISO(i.date).getDay() === day && 
          i.status !== "cancelled"
        ).length
      }))
    }
  }, [interviews, favoriteInterviews, uniqueJobs]);
} 