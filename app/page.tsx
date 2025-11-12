"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Hero } from "@/app/_components/Hero"
import { Categories } from "@/app/_components/Categories"
import { FeaturedJobs } from "@/app/_components/FeaturedJobs"
import { Features } from "@/app/_components/Features"
import { Testimonials } from "@/app/_components/Testimonials"
import { Pricing } from "@/app/_components/Pricing"
import { FAQ } from "@/app/_components/FAQ"
import { CTA } from "@/app/_components/CTA"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      <main>
        <Hero />
        <Categories />
        <FeaturedJobs />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </div>
  )
}



