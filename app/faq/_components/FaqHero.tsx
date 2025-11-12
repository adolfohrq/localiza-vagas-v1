"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface FaqHeroProps {
  onSearch?: (searchTerm: string) => void
}

export function FaqHero({ onSearch }: FaqHeroProps) {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const searchTerm = formData.get('search') as string
    if (onSearch) {
      onSearch(searchTerm)
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#003495] to-[#007cfa] py-16">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-20 bg-gradient-to-r from-[#007cfa] to-[#38bdf8] blur-[120px] transform translate-x-1/3 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-20 bg-gradient-to-r from-[#003495] to-[#0369a1] blur-[120px] transform -translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full opacity-15 bg-gradient-to-r from-[#38bdf8] to-[#007cfa] blur-[120px] transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      <div className="container relative mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Perguntas Frequentes
        </h1>
        <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10">
          Encontre respostas para as dúvidas mais comuns sobre nossa plataforma
        </p>
        
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
            <Input 
              name="search"
              placeholder="Buscar perguntas..." 
              className="pl-12 pr-4 py-6 bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-white focus:ring-white rounded-full"
            />
            <Button type="submit" className="absolute right-1.5 top-1.5 rounded-full bg-white text-blue-700 hover:bg-blue-50">
              Buscar
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
} 