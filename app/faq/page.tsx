import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FaqHero } from "./_components/FaqHero"
import { FaqTabs } from "./_components/FaqTabs"
import { FaqCta } from "./_components/FaqCta"

export const metadata: Metadata = {
  title: "Perguntas Frequentes | TechConnect",
  description: "Encontre respostas para as dúvidas mais comuns sobre nossa plataforma de recrutamento e seleção.",
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <Header />

      <main className="flex-grow">
        <FaqHero />
        <FaqTabs />
        <FaqCta />
      </main>

      <Footer />
    </div>
  )
} 