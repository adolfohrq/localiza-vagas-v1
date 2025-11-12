"use client"

import { Candidate } from "../_types";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  MoreVertical, 
  Star, 
  MessageSquare, 
  Calendar, 
  Heart,
  Clock,
  User,
  Mail,
  Phone,
  Briefcase,
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { statusStyles } from "../_data/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CandidateCardProps {
  candidate: Candidate;
  isSelected?: boolean;
  onSelect?: () => void;
  onClick?: () => void;
  showCheckbox?: boolean;
  variant?: "list" | "kanban";
  stage?: string;
}

export function CandidateCard({
  candidate,
  isSelected = false,
  onSelect,
  onClick,
  showCheckbox = false,
  variant = "list",
  stage
}: CandidateCardProps) {
  // Renderização para o modo kanban
  if (variant === "kanban") {
    return (
      <div
        className={cn(
          "bg-background border rounded-md p-3 mb-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer",
        )}
        onClick={onClick}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={candidate.avatar} alt={candidate.name} />
              <AvatarFallback>{candidate.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-sm font-medium leading-none">{candidate.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">{candidate.position}</p>
            </div>
          </div>
          <Badge 
            variant={statusStyles[candidate.status].variant as any}
            className={statusStyles[candidate.status].color ?
              `bg-${statusStyles[candidate.status].color}-100 text-${statusStyles[candidate.status].color}-700 hover:bg-${statusStyles[candidate.status].color}-200` :
              ""
            }
          >
            {statusStyles[candidate.status].label}
          </Badge>
        </div>
        
        <div className="mt-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>{candidate.appliedDate}</span>
            </div>
            {candidate.nextInterview && (
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{candidate.nextInterview}</span>
              </div>
            )}
          </div>
          
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs">Match</span>
              <span className="text-xs font-medium">{candidate.matchScore}%</span>
            </div>
            <Progress value={candidate.matchScore} className="h-1.5" />
          </div>
          
          <div className="mt-2 flex flex-wrap gap-1">
            {candidate.skills.slice(0, 2).map(skill => (
              <Badge key={skill} variant="outline" className="text-xs py-0 px-1">
                {skill}
              </Badge>
            ))}
            {candidate.skills.length > 2 && (
              <Badge variant="outline" className="text-xs py-0 px-1">
                +{candidate.skills.length - 2}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="mt-2 pt-2 border-t flex justify-between items-center">
          <div className="flex space-x-1">
            {candidate.notes.length > 0 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <MessageSquare className="h-3.5 w-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{candidate.notes.length} notas</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          
          <div className="flex items-center space-x-1">
            {candidate.favorite && <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" />}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreVertical className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                <DropdownMenuItem>Enviar e-mail</DropdownMenuItem>
                <DropdownMenuItem>Agendar entrevista</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">Rejeitar</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    );
  }
  
  // Renderização para o modo lista (padrão)
  return (
    <div
      className={cn(
        "group flex items-center p-2 hover:bg-muted/50 rounded-md",
        isSelected && "bg-muted/50"
      )}
    >
      {showCheckbox && (
        <div className="mr-2">
          <Checkbox checked={isSelected} onCheckedChange={onSelect} />
        </div>
      )}
      
      <div className="flex-1 flex items-center" onClick={onClick}>
        <Avatar className="h-9 w-9 mr-3">
          <AvatarImage src={candidate.avatar} alt={candidate.name} />
          <AvatarFallback>{candidate.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center">
            <h4 className="font-medium text-sm truncate">{candidate.name}</h4>
            {candidate.favorite && (
              <Heart className="h-3.5 w-3.5 ml-1.5 fill-red-500 text-red-500" />
            )}
            {!candidate.viewed && (
              <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">Novo</Badge>
            )}
          </div>
          
          <div className="flex items-center text-xs text-muted-foreground mt-0.5">
            <Briefcase className="h-3 w-3 mr-1" />
            <span className="truncate">{candidate.position}</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-4 mx-4">
          <div className="w-24">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs">Match</span>
              <span className="text-xs font-medium">{candidate.matchScore}%</span>
            </div>
            <Progress value={candidate.matchScore} className="h-1.5" />
          </div>
          
          <div className="flex flex-wrap gap-1 w-40">
            {candidate.skills.slice(0, 3).map(skill => (
              <Badge key={skill} variant="outline" className="text-xs py-0 px-1">
                {skill}
              </Badge>
            ))}
            {candidate.skills.length > 3 && (
              <Badge variant="outline" className="text-xs py-0 px-1">
                +{candidate.skills.length - 3}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="hidden lg:flex items-center space-x-4">
          <div className="w-32 text-xs">
            <div className="flex items-center">
              <Mail className="h-3 w-3 mr-1" />
              <span className="truncate">{candidate.email}</span>
            </div>
            <div className="flex items-center mt-1">
              <Phone className="h-3 w-3 mr-1" />
              <span className="truncate">{candidate.phone}</span>
            </div>
          </div>
          
          <div className="w-24 text-xs">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>{candidate.appliedDate}</span>
            </div>
            <div className="flex items-center mt-1">
              <User className="h-3 w-3 mr-1" />
              <span>{candidate.experience}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center ml-auto">
          <Badge 
            variant={statusStyles[candidate.status].variant as any}
            className={statusStyles[candidate.status].color ?
              `bg-${statusStyles[candidate.status].color}-100 text-${statusStyles[candidate.status].color}-700 hover:bg-${statusStyles[candidate.status].color}-200` :
              ""
            }
          >
            {statusStyles[candidate.status].label}
          </Badge>
          
          <Button variant="ghost" size="icon" className="ml-2">
            <ArrowUpRight className="h-4 w-4" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Ver perfil</DropdownMenuItem>
              <DropdownMenuItem>Enviar e-mail</DropdownMenuItem>
              <DropdownMenuItem>Agendar entrevista</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">Rejeitar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
} 