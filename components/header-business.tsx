"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
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
  MessageSquare,
  ChevronDown,
  Phone,
  Mail,
  Globe,
  Shield,
  BarChart,
  Users,
  Home,
  Calendar,
  Clock,
  Award
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

export function HeaderBusiness() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()

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
        "w-full transition-all duration-300",
        isScrolled
          ? "bg-slate-900 shadow-lg py-2"
          : "bg-slate-800 py-4"
      )}
    >
      {/* Top bar com informações de contato */}
      <div className={cn(
        "w-full text-white text-xs transition-all duration-300",
        isScrolled ? "hidden" : "block bg-slate-900 py-2 mb-2"
      )}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Phone className="h-3 w-3 mr-1" />
              <span>(11) 4321-1234</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-3 w-3 mr-1" />
              <span>contato@localizavagas.com.br</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/sobre" className="hover:text-blue-300 transition-colors">Sobre</Link>
            <Link href="/contato" className="hover:text-blue-300 transition-colors">Contato</Link>
            <Link href="/faq" className="hover:text-blue-300 transition-colors">FAQ</Link>
          </div>
        </div>
      </div>

      {/* Header principal */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-10 h-10 mr-2 overflow-hidden rounded-md bg-blue-600">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-blue-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold text-white">Localiza<span className="text-blue-400">Vagas</span></span>
              <p className="text-xs text-slate-300">Soluções Empresariais</p>
            </div>
          </Link>

          {/* Navegação principal - Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink href="/">Início</NavLink>
            <NavLink href="/solucoes">Soluções</NavLink>
            <NavLink href="/recrutamento">Recrutamento</NavLink>
            <NavLink href="/precos">Preços</NavLink>
            <NavLink href="/cases">Cases</NavLink>
            <NavLink href="/blog">Blog</NavLink>
          </nav>

          {/* Ações do usuário - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
                  <Bell className="h-4 w-4 mr-1" />
                  <span>Notificações</span>
                  <Badge className="ml-1 bg-blue-500 hover:bg-blue-600">3</Badge>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
                      <User className="h-4 w-4 mr-1" />
                      <span>{user?.name?.split(' ')[0]}</span>
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="h-4 w-4 mr-2" />
                      <span>Perfil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Building className="h-4 w-4 mr-2" />
                      <span>Minha Empresa</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Briefcase className="h-4 w-4 mr-2" />
                      <span>Vagas Publicadas</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Users className="h-4 w-4 mr-2" />
                      <span>Candidatos</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <BarChart className="h-4 w-4 mr-2" />
                      <span>Relatórios</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="h-4 w-4 mr-2" />
                      <span>Configurações</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="h-4 w-4 mr-2" />
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Briefcase className="h-4 w-4 mr-1" />
                  Publicar Vaga
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
                  <LogIn className="h-4 w-4 mr-1" />
                  Entrar
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <UserPlus className="h-4 w-4 mr-1" />
                  Cadastrar
                </Button>
              </>
            )}
          </div>

          {/* Menu mobile */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <div className="space-y-1">
                  <MobileNavItem href="/" icon={Home}>Início</MobileNavItem>
                  <MobileNavItem href="/solucoes" icon={Shield}>Soluções</MobileNavItem>
                  <MobileNavItem href="/recrutamento" icon={Users}>Recrutamento</MobileNavItem>
                  <MobileNavItem href="/precos" icon={BarChart}>Preços</MobileNavItem>
                  <MobileNavItem href="/cases" icon={Award}>Cases</MobileNavItem>
                  <MobileNavItem href="/blog" icon={BookOpen}>Blog</MobileNavItem>
                </div>
                
                <div className="border-t border-gray-200 my-4 pt-4">
                  {isAuthenticated ? (
                    <div className="space-y-1">
                      <MobileNavItem href="/perfil" icon={User}>Perfil</MobileNavItem>
                      <MobileNavItem href="/empresa" icon={Building}>Minha Empresa</MobileNavItem>
                      <MobileNavItem href="/vagas" icon={Briefcase}>Vagas Publicadas</MobileNavItem>
                      <MobileNavItem href="/candidatos" icon={Users}>Candidatos</MobileNavItem>
                      <MobileNavItem href="/relatorios" icon={BarChart}>Relatórios</MobileNavItem>
                      <MobileNavItem href="/configuracoes" icon={Settings}>Configurações</MobileNavItem>
                      <div className="pt-4">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          <Briefcase className="h-4 w-4 mr-2" />
                          Publicar Vaga
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full">
                        <LogIn className="h-4 w-4 mr-2" />
                        Entrar
                      </Button>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Cadastrar
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function NavLink({ 
  href, 
  children 
}: { 
  href: string; 
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 rounded-md transition-colors"
    >
      {children}
    </Link>
  )
}

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
    <Link
      href={href}
      className="flex items-center py-2 px-3 text-base font-medium rounded-md hover:bg-gray-100 transition-colors"
    >
      <Icon className="h-5 w-5 mr-3 text-gray-500" />
      {children}
    </Link>
  )
} 