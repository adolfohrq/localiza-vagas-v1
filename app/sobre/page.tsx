import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "./_components/HeroSection"
import { AboutSection } from "./_components/AboutSection"
import { ValuesSection } from "./_components/ValuesSection"
import { TimelineSection } from "./_components/TimelineSection"
import { TeamSection } from "./_components/TeamSection"
import { FaqSection } from "./_components/FaqSection"
import { CtaSection } from "./_components/CtaSection"

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <Header />

      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <ValuesSection />
        <TimelineSection />
        <TeamSection />
        <FaqSection />
        <CtaSection />
      </main>

      <Footer />
    </div>
  )
} 