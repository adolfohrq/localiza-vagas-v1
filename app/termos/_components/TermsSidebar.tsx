import { Button } from "@/components/ui/button"
import { Eye, Shield } from "lucide-react"
import { LucideIcon } from "lucide-react"
import Link from "next/link"

interface TermSection {
  id: string
  title: string
  icon: LucideIcon
}

interface TermsSidebarProps {
  sections: TermSection[]
}

export function TermsSidebar({ sections }: TermsSidebarProps) {
  return (
    <div className="lg:col-span-3">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
        <h3 className="text-lg font-semibold mb-4 pb-4 border-b border-gray-100">Índice</h3>
        <div className="space-y-2">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <Link 
                key={section.id} 
                href={`#${section.id}`}
                className="flex items-center py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-gray-700 group-hover:text-primary transition-colors">{section.title}</span>
              </Link>
            )
          })}
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Documentos Relacionados</h3>
          <div className="space-y-3">
            <Button asChild variant="outline" className="w-full justify-start text-left border-blue-200 text-primary hover:bg-blue-50">
              <Link href="/privacidade">
                <Eye className="h-4 w-4 mr-2" />
                Política de Privacidade
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start text-left border-blue-200 text-primary hover:bg-blue-50">
              <Link href="/cookies">
                <Shield className="h-4 w-4 mr-2" />
                Política de Cookies
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 