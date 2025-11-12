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
  Diamond,
  Crown,
  Star,
  Heart,
  Gem,
  Award,
  Bookmark,
  Coffee,
  Home,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Twitter
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

export function HeaderElegant() {
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
        "w-full transition-all duration-500",
        isScrolled
          ? "bg-white py-2 shadow-sm border-b border-gray-100"
          : "bg-[#f8f5f0] py-6"
      )}
    >
      {/* Top bar com informações de contato */}
      <div className={cn(
        "w-full text-gray-600 text-xs transition-all duration-500 border-b",
        isScrolled ? "hidden" : "block border-[#e8e1d6] py-2 mb-4"
      )}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <Phone className="h-3 w-3 mr-1 text-[#b8a088]" />
              <span>(11) 3456-7890</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-3 w-3 mr-1 text-[#b8a088]" />
              <span>contato@elegantvagas.com.br</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1 text-[#b8a088]" />
              <span>São Paulo, Brasil</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="https://instagram.com" className="text-gray-500 hover:text-[#b8a088] transition-colors">
              <Instagram className="h-3.5 w-3.5" />
            </Link>
            <Link href="https://linkedin.com" className="text-gray-500 hover:text-[#b8a088] transition-colors">
              <Linkedin className="h-3.5 w-3.5" />
            </Link>
            <Link href="https://twitter.com" className="text-gray-500 hover:text-[#b8a088] transition-colors">
              <Twitter className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Header principal */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className={cn(
              "relative w-10 h-10 mr-3 overflow-hidden transition-all duration-500",
              isScrolled ? "opacity-100" : "opacity-100"
            )}>
              <div className="absolute inset-0 flex items-center justify-center">
                <Diamond className={cn(
                  "h-8 w-8 transition-all duration-500",
                  isScrolled ? "text-[#b8a088]" : "text-[#b8a088]"
                )} />
              </div>
            </div>
            <div>
              <span className={cn(
                "text-xl font-serif transition-all duration-500",
                isScrolled ? "text-gray-900" : "text-gray-900"
              )}>
                Elegant<span className="text-[#b8a088]">Vagas</span>
              </span>
              <p className="text-xs text-gray-500 italic">Carreiras Exclusivas</p>
            </div>
          </Link>

          {/* Navegação principal - Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink href="/" isScrolled={isScrolled}>
              Início
            </NavLink>
            <NavLink href="/vagas" isScrolled={isScrolled}>
              Oportunidades
            </NavLink>
            <NavLink href="/empresas" isScrolled={isScrolled}>
              Empresas
            </NavLink>
            <NavLink href="/executivos" isScrolled={isScrolled}>
              Executivos
            </NavLink>
            <NavLink href="/eventos" isScrolled={isScrolled}>
              Eventos
            </NavLink>
            <NavLink href="/blog" isScrolled={isScrolled}>
              Blog
            </NavLink>
            <NavLink href="/contato" isScrolled={isScrolled}>
              Contato
            </NavLink>
          </nav>

          {/* Ações do usuário - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "rounded-full transition-all duration-500",
                isScrolled 
                  ? "text-gray-500 hover:text-[#b8a088] hover:bg-[#f8f5f0]" 
                  : "text-gray-500 hover:text-[#b8a088] hover:bg-white/50"
              )}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {isAuthenticated ? (
              <>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn(
                    "rounded-full transition-all duration-500 relative",
                    isScrolled 
                      ? "text-gray-500 hover:text-[#b8a088] hover:bg-[#f8f5f0]" 
                      : "text-gray-500 hover:text-[#b8a088] hover:bg-white/50"
                  )}
                >
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#b8a088]">2</Badge>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "rounded-full flex items-center gap-2 transition-all duration-500",
                        isScrolled 
                          ? "text-gray-700 hover:text-[#b8a088] hover:bg-[#f8f5f0]" 
                          : "text-gray-700 hover:text-[#b8a088] hover:bg-white/50"
                      )}
                    >
                      <Avatar className="h-8 w-8 border-2 border-[#b8a088]">
                        <AvatarImage src={user?.avatar || "/avatars/default.png"} alt={user?.name} />
                        <AvatarFallback className="bg-[#b8a088] text-white">
                          {user?.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{user?.name?.split(' ')[0]}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 rounded-xl p-2 border-[#e8e1d6]">
                    <DropdownMenuLabel className="font-serif text-gray-500">Minha Conta</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-[#e8e1d6]" />
                    <DropdownMenuItem className="rounded-lg hover:bg-[#f8f5f0] hover:text-[#b8a088] focus:bg-[#f8f5f0] focus:text-[#b8a088]">
                      <User className="h-4 w-4 mr-2 text-[#b8a088]" />
                      <span>Perfil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg hover:bg-[#f8f5f0] hover:text-[#b8a088] focus:bg-[#f8f5f0] focus:text-[#b8a088]">
                      <Briefcase className="h-4 w-4 mr-2 text-[#b8a088]" />
                      <span>Candidaturas</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg hover:bg-[#f8f5f0] hover:text-[#b8a088] focus:bg-[#f8f5f0] focus:text-[#b8a088]">
                      <Bookmark className="h-4 w-4 mr-2 text-[#b8a088]" />
                      <span>Vagas Salvas</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg hover:bg-[#f8f5f0] hover:text-[#b8a088] focus:bg-[#f8f5f0] focus:text-[#b8a088]">
                      <MessageSquare className="h-4 w-4 mr-2 text-[#b8a088]" />
                      <span>Mensagens</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg hover:bg-[#f8f5f0] hover:text-[#b8a088] focus:bg-[#f8f5f0] focus:text-[#b8a088]">
                      <Settings className="h-4 w-4 mr-2 text-[#b8a088]" />
                      <span>Configurações</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-[#e8e1d6]" />
                    <DropdownMenuItem className="rounded-lg hover:bg-[#f8f5f0] hover:text-[#b8a088] focus:bg-[#f8f5f0] focus:text-[#b8a088]">
                      <LogOut className="h-4 w-4 mr-2 text-[#b8a088]" />
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button 
                  size="sm" 
                  className={cn(
                    "rounded-full transition-all duration-500 border-2",
                    isScrolled 
                      ? "bg-white text-[#b8a088] border-[#b8a088] hover:bg-[#b8a088] hover:text-white" 
                      : "bg-white text-[#b8a088] border-[#b8a088] hover:bg-[#b8a088] hover:text-white"
                  )}
                >
                  <Crown className="h-4 w-4 mr-1" />
                  Premium
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={cn(
                    "rounded-full transition-all duration-500",
                    isScrolled 
                      ? "text-gray-700 hover:text-[#b8a088] hover:bg-[#f8f5f0]" 
                      : "text-gray-700 hover:text-[#b8a088] hover:bg-white/50"
                  )}
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  Entrar
                </Button>
                <Button 
                  size="sm" 
                  className={cn(
                    "rounded-full transition-all duration-500 border-2",
                    isScrolled 
                      ? "bg-white text-[#b8a088] border-[#b8a088] hover:bg-[#b8a088] hover:text-white" 
                      : "bg-white text-[#b8a088] border-[#b8a088] hover:bg-[#b8a088] hover:text-white"
                  )}
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  Cadastrar
                </Button>
              </>
            )}
          </div>

          {/* Menu mobile */}
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "md:hidden rounded-full transition-all duration-500",
                  isScrolled 
                    ? "text-gray-700 hover:text-[#b8a088] hover:bg-[#f8f5f0]" 
                    : "text-gray-700 hover:text-[#b8a088] hover:bg-white/50"
                )}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l-[#e8e1d6] p-0">
              <div className="bg-[#f8f5f0] p-6">
                <SheetHeader>
                  <SheetTitle className="text-gray-900 text-2xl font-serif">Menu</SheetTitle>
                </SheetHeader>
              </div>
              <div className="p-6">
                <div className="space-y-1">
                  <MobileNavItem href="/" icon={Home}>Início</MobileNavItem>
                  <MobileNavItem href="/vagas" icon={Briefcase}>Oportunidades</MobileNavItem>
                  <MobileNavItem href="/empresas" icon={Building}>Empresas</MobileNavItem>
                  <MobileNavItem href="/executivos" icon={User}>Executivos</MobileNavItem>
                  <MobileNavItem href="/eventos" icon={Calendar}>Eventos</MobileNavItem>
                  <MobileNavItem href="/blog" icon={BookOpen}>Blog</MobileNavItem>
                  <MobileNavItem href="/contato" icon={Mail}>Contato</MobileNavItem>
                </div>
                
                <div className="border-t border-[#e8e1d6] my-4 pt-4">
                  {isAuthenticated ? (
                    <div className="space-y-1">
                      <MobileNavItem href="/perfil" icon={User}>Perfil</MobileNavItem>
                      <MobileNavItem href="/candidaturas" icon={Briefcase}>Candidaturas</MobileNavItem>
                      <MobileNavItem href="/vagas-salvas" icon={Bookmark}>Vagas Salvas</MobileNavItem>
                      <MobileNavItem href="/mensagens" icon={MessageSquare}>Mensagens</MobileNavItem>
                      <MobileNavItem href="/configuracoes" icon={Settings}>Configurações</MobileNavItem>
                      <div className="pt-4">
                        <Button className="w-full bg-white text-[#b8a088] border-2 border-[#b8a088] hover:bg-[#b8a088] hover:text-white rounded-full">
                          <Crown className="h-4 w-4 mr-2" />
                          Premium
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full rounded-full border-gray-300 hover:border-[#b8a088] hover:text-[#b8a088]">
                        <LogIn className="h-4 w-4 mr-2" />
                        Entrar
                      </Button>
                      <Button className="w-full bg-white text-[#b8a088] border-2 border-[#b8a088] hover:bg-[#b8a088] hover:text-white rounded-full">
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
  children,
  isScrolled
}: { 
  href: string; 
  children: React.ReactNode;
  isScrolled: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-2 text-sm font-medium rounded-full transition-all duration-500",
        isScrolled
          ? "text-gray-700 hover:text-[#b8a088]"
          : "text-gray-700 hover:text-[#b8a088]"
      )}
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
      className="flex items-center py-2 px-3 text-base font-medium rounded-lg hover:bg-[#f8f5f0] hover:text-[#b8a088] transition-colors"
    >
      <Icon className="h-5 w-5 mr-3 text-[#b8a088]" />
      {children}
    </Link>
  )
}

function Calendar({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
} 