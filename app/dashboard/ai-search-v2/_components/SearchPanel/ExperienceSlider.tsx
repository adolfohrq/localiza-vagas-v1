"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface ExperienceSliderProps {
  experienceWeight: number[]
  setExperienceWeight: (value: number[]) => void
  showExperienceSlider: boolean
}

export function ExperienceSlider({ experienceWeight, setExperienceWeight, showExperienceSlider }: ExperienceSliderProps) {
  if (!showExperienceSlider) return null
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="experience-weight" className="text-sm">
          Importância da Experiência
        </Label>
        <span className="text-xs text-muted-foreground">
          {experienceWeight[0]}/10
        </span>
      </div>
      <Slider
        id="experience-weight"
        min={1}
        max={10}
        step={1}
        value={experienceWeight}
        onValueChange={setExperienceWeight}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Menor Peso</span>
        <span>Maior Peso</span>
      </div>
    </div>
  )
} 