import { ChevronRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { LucideIcon } from "lucide-react"

interface Category {
  name: string
  icon: LucideIcon
  count: number
}

interface BlogSidebarProps {
  categories: Category[]
  popularTags: string[]
}

export function BlogSidebar({ categories, popularTags }: BlogSidebarProps) {
  return (
    <div className="lg:col-span-4 space-y-8">
      {/* Categorias */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold mb-4 pb-4 border-b border-gray-100">Categorias</h3>
        <div className="space-y-3">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <Link 
                key={index} 
                href={`/blog/categoria/${category.name.toLowerCase()}`}
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors group"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                    <Icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700 group-hover:text-blue-600 transition-colors">{category.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500">{category.count}</span>
                  <ChevronRight className="h-4 w-4 ml-1 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
      
      {/* Tags Populares */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold mb-4 pb-4 border-b border-gray-100">Tags Populares</h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag, index) => (
            <Link 
              key={index} 
              href={`/blog/tag/${tag.toLowerCase()}`}
              className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
      
      {/* Newsletter */}
      <div className="bg-gradient-to-r from-[#003495] to-[#007cfa] rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 mx-auto backdrop-blur-sm border border-white/10">
          <BookOpen className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-center">Newsletter Semanal</h3>
        <p className="text-blue-100 mb-4 text-center">
          Receba os melhores artigos e dicas de carreira diretamente no seu e-mail
        </p>
        <div className="space-y-3">
          <Input 
            placeholder="Seu melhor e-mail" 
            className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-white focus:ring-white"
          />
          <Button className="w-full bg-white hover:bg-blue-50 text-blue-700">
            Inscrever-se
          </Button>
        </div>
      </div>
    </div>
  )
} 