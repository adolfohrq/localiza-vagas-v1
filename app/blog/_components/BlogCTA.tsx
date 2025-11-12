import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function BlogCTA() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <Badge className="mb-4 bg-blue-50 text-primary hover:bg-blue-50 mx-auto">Junte-se a nós</Badge>
        <h2 className="text-3xl font-bold mb-4">Quer compartilhar seu conhecimento?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Se você é especialista em recrutamento, RH, carreira ou mercado de trabalho, considere se tornar um autor convidado em nosso blog
        </p>
        <Button className="bg-primary hover:bg-primary/90 text-white">
          Saiba como contribuir
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  )
} 