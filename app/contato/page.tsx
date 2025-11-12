import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "./_components/HeroSection"
import { ContactForms } from "./_components/ContactForms"
import { ContactChannels } from "./_components/ContactChannels"
import { FAQ } from "./_components/FAQ"
import { CTASection } from "./_components/CTASection"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />

        {/* Contact Options Tabs */}
        <ContactForms />
        
        {/* Canais de Contato */}
        <ContactChannels />

        {/* FAQ Section */}
        <FAQ />

        {/* CTA Section */}
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}

