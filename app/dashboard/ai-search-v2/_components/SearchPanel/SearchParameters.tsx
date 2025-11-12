"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ListChecks, BookOpen, GraduationCap, MapPin, Medal } from "lucide-react"

interface SearchParametersProps {
  searchParameters: {
    skills: boolean
    education: boolean
    location: boolean
    experience: boolean
  }
  toggleSearchParameter: (param: 'skills' | 'education' | 'location' | 'experience') => void
}

export function SearchParameters({ searchParameters, toggleSearchParameter }: SearchParametersProps) {
  console.log("SearchParameters renderizado com:", searchParameters);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-3 flex items-center gap-1.5">
          <ListChecks className="h-4 w-4 text-muted-foreground" />
          Parâmetros de Busca
        </h3>
        
        <div className="space-y-2.5">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="search-skills" 
              checked={searchParameters.skills}
              onCheckedChange={() => {
                console.log("Toggle skills");
                toggleSearchParameter('skills');
              }}
            />
            <Label 
              htmlFor="search-skills" 
              className="text-sm flex items-center cursor-pointer"
            >
              <BookOpen className="h-3.5 w-3.5 text-blue-500 mr-1.5" />
              Habilidades Técnicas
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="search-education" 
              checked={searchParameters.education}
              onCheckedChange={() => {
                console.log("Toggle education");
                toggleSearchParameter('education');
              }}
            />
            <Label 
              htmlFor="search-education" 
              className="text-sm flex items-center cursor-pointer"
            >
              <GraduationCap className="h-3.5 w-3.5 text-indigo-500 mr-1.5" />
              Formação Acadêmica
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="search-location" 
              checked={searchParameters.location}
              onCheckedChange={() => {
                console.log("Toggle location");
                toggleSearchParameter('location');
              }}
            />
            <Label 
              htmlFor="search-location" 
              className="text-sm flex items-center cursor-pointer"
            >
              <MapPin className="h-3.5 w-3.5 text-red-500 mr-1.5" />
              Localização
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="search-experience" 
              checked={searchParameters.experience}
              onCheckedChange={() => {
                console.log("Toggle experience");
                toggleSearchParameter('experience');
              }}
            />
            <Label 
              htmlFor="search-experience" 
              className="text-sm flex items-center cursor-pointer"
            >
              <Medal className="h-3.5 w-3.5 text-amber-500 mr-1.5" />
              Experiência Profissional
            </Label>
          </div>
        </div>
      </div>
    </div>
  )
} 