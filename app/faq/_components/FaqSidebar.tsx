import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"
import Link from "next/link"
import { Category } from "../_data/faq-data"

interface FaqSidebarProps {
  categories: Category[]
  type: "candidates" | "companies"
}

export function FaqSidebar({ categories, type }: FaqSidebarProps) {
  const prefix = type === "companies" ? "company-" : ""
  
  return (
    <div className="lg:col-span-3">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
        <h3 className="text-lg font-semibold mb-4 pb-4 border-b border-gray-100">Categorias</h3>
        <div className="space-y-2">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link 
                key={category.id} 
                href={`#${prefix}${category.id}`}
                className="flex items-center py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-gray-700 group-hover:text-primary transition-colors">{category.name}</span>
              </Link>
            )
          })}
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Precisa de mais ajuda?</h3>
          <p className="text-gray-600 mb-4">
            {type === "candidates" 
              ? "Não encontrou o que procurava? Entre em contato com nossa equipe de suporte."
              : "Nossa equipe comercial está pronta para ajudar sua empresa."
            }
          </p>
          <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white">
            <Link href="/contato">
              {type === "candidates" ? "Falar com o Suporte" : "Falar com Consultor"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 