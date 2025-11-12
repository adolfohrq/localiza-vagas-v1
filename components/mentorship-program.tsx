import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const mentors = [
  { id: 1, name: "Ana Silva", expertise: "Desenvolvimento Web", availability: "Alta", avatar: "/avatars/ana.jpg" },
  {
    id: 2,
    name: "Carlos Mendes",
    expertise: "Marketing Digital",
    availability: "Média",
    avatar: "/avatars/carlos.jpg",
  },
  {
    id: 3,
    name: "Lúcia Ferreira",
    expertise: "Gestão de Projetos",
    availability: "Baixa",
    avatar: "/avatars/lucia.jpg",
  },
]

export function MentorshipProgram() {
  const [selectedMentor, setSelectedMentor] = useState<number | null>(null)

  const requestMentorship = (mentorId: number) => {
    setSelectedMentor(mentorId)
    // In a real app, this would send a request to the mentor
  }

  return (
    <div className="space-y-4">
      <p className="text-lg">Conecte-se com mentores experientes para acelerar seu crescimento profissional.</p>
      {mentors.map((mentor) => (
        <Card key={mentor.id}>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={mentor.avatar} alt={mentor.name} />
                <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{mentor.name}</CardTitle>
                <CardDescription>{mentor.expertise}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Badge
              variant={
                mentor.availability === "Alta" ? "default" : mentor.availability === "Média" ? "secondary" : "outline"
              }
            >
              Disponibilidade: {mentor.availability}
            </Badge>
          </CardContent>
          <CardFooter>
            <Button onClick={() => requestMentorship(mentor.id)} disabled={selectedMentor === mentor.id}>
              {selectedMentor === mentor.id ? "Solicitação Enviada" : "Solicitar Mentoria"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

