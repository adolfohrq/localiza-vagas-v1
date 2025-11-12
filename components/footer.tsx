import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gray-100">
      {/* Gradiente de fundo */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white pointer-events-none"></div>
      
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] h-[500px] w-[500px] rounded-full bg-blue-600 blur-3xl"></div>
        <div className="absolute bottom-[10%] -left-[5%] h-[300px] w-[300px] rounded-full bg-blue-500 blur-3xl"></div>
      </div>
      
      {/* Newsletter Section */}
      <div className="relative border-b border-gray-100">
        <div className="container mx-auto px-4 py-12">
          <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-primary rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Receba as melhores vagas em primeira mão
                </h3>
                <p className="text-blue-100 mb-0 max-w-md">
                  Inscreva-se em nossa newsletter e receba as oportunidades mais recentes diretamente em seu e-mail.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input 
                  placeholder="Seu melhor e-mail" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-white focus:ring-white"
                />
                <Button className="bg-white hover:bg-blue-50 text-primary whitespace-nowrap">
                  Inscrever-se
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Logo e Descrição */}
          <div className="md:col-span-4 lg:col-span-5">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-primary flex items-center justify-center text-white font-bold text-xl mr-3">
                LV
              </div>
              <h3 className="text-xl font-bold text-gray-900">Localiza Vagas</h3>
            </div>
            <p className="text-gray-600 mb-6 max-w-md">
              Conectando talentos às melhores oportunidades do mercado. Nossa plataforma utiliza tecnologia avançada para criar conexões perfeitas entre candidatos e empresas.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary hover:bg-blue-100 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary hover:bg-blue-100 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary hover:bg-blue-100 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary hover:bg-blue-100 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          {/* Links Rápidos */}
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="text-lg font-semibold text-gray-900 mb-6">Navegação</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-1 text-blue-400 transition-transform group-hover:translate-x-1" />
                  Início
                </Link>
              </li>
              <li>
                <Link href="/vagas" className="text-gray-600 hover:text-primary flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-1 text-blue-400 transition-transform group-hover:translate-x-1" />
                  Vagas
                </Link>
              </li>
              <li>
                <Link href="/empresas" className="text-gray-600 hover:text-primary flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-1 text-blue-400 transition-transform group-hover:translate-x-1" />
                  Para Empresas
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-600 hover:text-primary flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-1 text-blue-400 transition-transform group-hover:translate-x-1" />
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Links Úteis */}
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="text-lg font-semibold text-gray-900 mb-6">Links Úteis</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/sobre" className="text-gray-600 hover:text-primary flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-1 text-blue-400 transition-transform group-hover:translate-x-1" />
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-primary flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-1 text-blue-400 transition-transform group-hover:translate-x-1" />
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-primary flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-1 text-blue-400 transition-transform group-hover:translate-x-1" />
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/termos" className="text-gray-600 hover:text-primary flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-1 text-blue-400 transition-transform group-hover:translate-x-1" />
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contato */}
          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="text-lg font-semibold text-gray-900 mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">E-mail</p>
                  <p className="text-gray-600">atendimento@localizavagas.com</p>
                </div>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Telefone</p>
                  <p className="text-gray-600">0800 123 4567</p>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Endereço</p>
                  <p className="text-gray-600">Av. Paulista, 1000, São Paulo - SP</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="relative border-t border-gray-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between text-center md:text-left">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Localiza Vagas. Todos os direitos reservados.
            </p>
            <div className="flex items-center justify-center md:justify-end space-x-6 mt-4 md:mt-0">
              <Link href="/privacidade" className="text-sm text-gray-600 hover:text-primary">
                Política de Privacidade
              </Link>
              <Link href="/cookies" className="text-sm text-gray-600 hover:text-primary">
                Política de Cookies
              </Link>
              <Link href="/acessibilidade" className="text-sm text-gray-600 hover:text-primary">
                Acessibilidade
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

