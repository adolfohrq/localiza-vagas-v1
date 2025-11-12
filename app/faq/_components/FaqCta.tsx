import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export function FaqCta() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Não encontrou o que procurava?</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Nossa equipe de suporte está pronta para ajudar com qualquer dúvida que você possa ter
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-primary hover:bg-primary/90 text-white">
            <Link href="/contato">
              Entrar em Contato
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-blue-50">
            <Link href="/blog">
              Visitar o Blog
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
} 