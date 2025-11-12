import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Linkedin, Twitter } from "lucide-react"

export function SocialSharing() {
  const shareOnLinkedIn = () => {
    // Implement LinkedIn sharing logic
    console.log("Shared on LinkedIn")
  }

  const shareOnTwitter = () => {
    // Implement Twitter sharing logic
    console.log("Shared on Twitter")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compartilhe Suas Conquistas</CardTitle>
        <CardDescription>Mostre ao mundo seu progresso e conquistas!</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Compartilhar suas conquistas pode ajudar a expandir sua rede profissional e atrair novas oportunidades.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={shareOnLinkedIn} variant="outline">
          <Linkedin className="mr-2 h-4 w-4" />
          Compartilhar no LinkedIn
        </Button>
        <Button onClick={shareOnTwitter} variant="outline">
          <Twitter className="mr-2 h-4 w-4" />
          Compartilhar no Twitter
        </Button>
      </CardFooter>
    </Card>
  )
}

