"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import {
  Search,
  Menu,
  Bell,
  User,
  Briefcase,
  Building,
  BookOpen,
  HelpCircle,
  FileText,
  ChevronRight,
  LogIn,
  UserPlus,
  Settings,
  LogOut,
  Heart,
  MessageSquare,
  X,
  Home,
  Compass,
  PlusCircle,
  ChevronDown,
} from "lucide-react"

export function HeaderMinimal() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Simulação de estado de login

  // Detecta o scroll para mudar o estilo do header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-gradient-to-r from-[#0047ab] to-[#1ca9c9] backdrop-blur-sm"
          : "bg-gradient-to-r from-[#0047ab] to-[#1ca9c9]"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-light tracking-tight text-white">
              <span className="font-bold">Localiza</span>Vagas
            </span>
          </Link>

          {/* Navegação principal - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm text-white hover:text-[#1ca9c9]">
              Início
            </Link>
            <Link href="/vagas" className="text-sm text-white hover:text-[#1ca9c9]">
              Vagas
            </Link>
            <Link href="/empresas" className="text-sm text-white hover:text-[#1ca9c9]">
              Empresas
            </Link>
            <Link href="/blog" className="text-sm text-white hover:text-[#1ca9c9]">
              Blog
            </Link>
            <Link href="/sobre" className="text-sm text-white hover:text-[#1ca9c9]">
              Sobre
            </Link>
          </nav>

          {/* Ações do usuário - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar..."
                className="pl-8 pr-4 py-1 h-8 w-40 bg-gray-50 border-gray-200 rounded-full text-sm focus:w-60 transition-all duration-300"
              />
            </div>

            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                {/* Notificações */}
                <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-gray-900">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 bg-gray-900 text-[10px]">3</Badge>
                </Button>

                {/* Avatar do usuário */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-1">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Ana Silva" />
                        <AvatarFallback className="bg-gray-100 text-gray-800">AS</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm font-medium">Ana Silva</p>
                      <p className="text-xs text-gray-500">ana.silva@email.com</p>
                    </div>
                    <DropdownMenuItem asChild>
                      <Link href="/perfil" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Meu Perfil</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/candidaturas" className="cursor-pointer">
                        <Briefcase className="mr-2 h-4 w-4" />
                        <span>Minhas Candidaturas</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/vagas-salvas" className="cursor-pointer">
                        <Heart className="mr-2 h-4 w-4" />
                        <span>Vagas Salvas</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/configuracoes" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Configurações</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={() => setIsLoggedIn(false)}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-700 hover:text-gray-900" asChild>
                  <Link href="/login">
                    Entrar
                  </Link>
                </Button>
                <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white" asChild>
                  <Link href="/cadastro">
                    Cadastre-se
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Menu mobile */}
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-gray-500">
              <Search className="h-5 w-5" />
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-500">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85%] sm:w-[350px]">
                <SheetHeader className="border-b pb-4">
                  <SheetTitle className="flex items-center">
                    <span className="text-lg font-light tracking-tight">
                      <span className="font-bold">Localiza</span>Vagas
                    </span>
                  </SheetTitle>
                </SheetHeader>

                <div className="py-4">
                  {isLoggedIn ? (
                    <div className="flex items-center p-3 mb-4 bg-gray-50 rounded-lg">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Ana Silva" />
                        <AvatarFallback className="bg-gray-100 text-gray-800">AS</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Ana Silva</p>
                        <p className="text-xs text-gray-500">ana.silva@email.com</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-2 mb-4">
                      <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white" asChild>
                        <Link href="/cadastro">
                          <UserPlus className="mr-2 h-4 w-4" />
                          Cadastre-se
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/login">
                          <LogIn className="mr-2 h-4 w-4" />
                          Entrar
                        </Link>
                      </Button>
                    </div>
                  )}

                  <div className="space-y-1">
                    <MobileNavItem href="/" icon={Home}>
                      Início
                    </MobileNavItem>
                    <MobileNavItem href="/vagas" icon={Briefcase}>
                      Vagas
                    </MobileNavItem>
                    <MobileNavItem href="/empresas" icon={Building}>
                      Empresas
                    </MobileNavItem>
                    <MobileNavItem href="/blog" icon={BookOpen}>
                      Blog
                    </MobileNavItem>
                    <MobileNavItem href="/sobre" icon={FileText}>
                      Sobre Nós
                    </MobileNavItem>
                    <MobileNavItem href="/contato" icon={MessageSquare}>
                      Contato
                    </MobileNavItem>
                    <MobileNavItem href="/faq" icon={HelpCircle}>
                      Ajuda e FAQ
                    </MobileNavItem>
                  </div>

                  {isLoggedIn && (
                    <>
                      <div className="h-px bg-gray-200 my-4"></div>
                      <div className="space-y-1">
                        <MobileNavItem href="/perfil" icon={User}>
                          Meu Perfil
                        </MobileNavItem>
                        <MobileNavItem href="/candidaturas" icon={Briefcase}>
                          Minhas Candidaturas
                        </MobileNavItem>
                        <MobileNavItem href="/vagas-salvas" icon={Heart}>
                          Vagas Salvas
                        </MobileNavItem>
                        <MobileNavItem href="/configuracoes" icon={Settings}>
                          Configurações
                        </MobileNavItem>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => setIsLoggedIn(false)}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Sair
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

// Componente para itens do menu mobile
function MobileNavItem({ 
  children, 
  href, 
  icon: Icon 
}: { 
  children: React.ReactNode; 
  href: string; 
  icon: React.ComponentType<{ className?: string }> 
}) {
  return (
    <SheetClose asChild>
      <Link 
        href={href}
        className="flex items-center py-3 px-2 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-gray-900"
      >
        <Icon className="h-5 w-5 mr-3 text-gray-500" />
        <span className="font-medium">{children}</span>
        <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
      </Link>
    </SheetClose>
  )
} 