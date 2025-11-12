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
  Sparkles,
  Palette,
  Camera,
  Music,
  Video,
  Code,
  Lightbulb,
  Heart,
  Star,
  Home,
  Zap,
  Layers
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

export function HeaderCreative() {
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
          ? "bg-white py-2 shadow-lg"
          : "bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 py-6"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className={cn(
              "relative w-10 h-10 mr-2 overflow-hidden rounded-full transition-all duration-500",
              isScrolled ? "bg-gradient-to-r from-purple-600 to-pink-500" : "bg-white"
            )}>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className={cn(
                  "h-5 w-5 transition-all duration-500",
                  isScrolled ? "text-white" : "text-purple-600"
                )} />
              </div>
            </div>
            <span className={cn(
              "text-xl font-bold transition-all duration-500",
              isScrolled ? "text-gray-800" : "text-white"
            )}>
              Cria<span className={isScrolled ? "text-purple-600" : "text-yellow-300"}>Vagas</span>
            </span>
          </Link>

          {/* Navegação principal - Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink href="/" isScrolled={isScrolled}>
              <Home className="h-4 w-4 mr-1.5" />
              Início
            </NavLink>
            <NavLink href="/design" isScrolled={isScrolled}>
              <Palette className="h-4 w-4 mr-1.5" />
              Design
            </NavLink>
            <NavLink href="/fotografia" isScrolled={isScrolled}>
              <Camera className="h-4 w-4 mr-1.5" />
              Fotografia
            </NavLink>
            <NavLink href="/audio" isScrolled={isScrolled}>
              <Music className="h-4 w-4 mr-1.5" />
              Áudio
            </NavLink>
            <NavLink href="/video" isScrolled={isScrolled}>
              <Video className="h-4 w-4 mr-1.5" />
              Vídeo
            </NavLink>
            <NavLink href="/tecnologia" isScrolled={isScrolled}>
              <Code className="h-4 w-4 mr-1.5" />
              Tecnologia
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
                  ? "text-gray-600 hover:text-purple-600 hover:bg-purple-50" 
                  : "text-white hover:text-white hover:bg-white/20"
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
                      ? "text-gray-600 hover:text-purple-600 hover:bg-purple-50" 
                      : "text-white hover:text-white hover:bg-white/20"
                  )}
                >
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-pink-500">2</Badge>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "rounded-full flex items-center gap-2 transition-all duration-500",
                        isScrolled 
                          ? "text-gray-600 hover:text-purple-600 hover:bg-purple-50" 
                          : "text-white hover:text-white hover:bg-white/20"
                      )}
                    >
                      <Avatar className="h-8 w-8 border-2 border-pink-500">
                        <AvatarImage src={user?.avatar || "/avatars/default.png"} alt={user?.name} />
                        <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                          {user?.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{user?.name?.split(' ')[0]}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 rounded-xl p-2 border-pink-100">
                    <DropdownMenuItem className="rounded-lg hover:bg-pink-50">
                      <User className="h-4 w-4 mr-2 text-pink-500" />
                      <span>Meu Perfil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg hover:bg-pink-50">
                      <Briefcase className="h-4 w-4 mr-2 text-pink-500" />
                      <span>Meus Projetos</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg hover:bg-pink-50">
                      <Heart className="h-4 w-4 mr-2 text-pink-500" />
                      <span>Favoritos</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg hover:bg-pink-50">
                      <Star className="h-4 w-4 mr-2 text-pink-500" />
                      <span>Avaliações</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg hover:bg-pink-50">
                      <Settings className="h-4 w-4 mr-2 text-pink-500" />
                      <span>Configurações</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="rounded-lg hover:bg-pink-50">
                      <LogOut className="h-4 w-4 mr-2 text-pink-500" />
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button 
                  size="sm" 
                  className={cn(
                    "rounded-full transition-all duration-500",
                    isScrolled 
                      ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90" 
                      : "bg-white text-purple-600 hover:bg-white/90"
                  )}
                >
                  <Zap className="h-4 w-4 mr-1" />
                  Publicar Projeto
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
                      ? "text-gray-600 hover:text-purple-600 hover:bg-purple-50" 
                      : "text-white hover:text-white hover:bg-white/20"
                  )}
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  Entrar
                </Button>
                <Button 
                  size="sm" 
                  className={cn(
                    "rounded-full transition-all duration-500",
                    isScrolled 
                      ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90" 
                      : "bg-white text-purple-600 hover:bg-white/90"
                  )}
                >
                  <Sparkles className="h-4 w-4 mr-1" />
                  Criar Conta
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
                    ? "text-gray-600 hover:text-purple-600 hover:bg-purple-50" 
                    : "text-white hover:text-white hover:bg-white/20"
                )}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l-pink-200 p-0">
              <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 p-6">
                <SheetHeader>
                  <SheetTitle className="text-white text-2xl font-bold">Menu Criativo</SheetTitle>
                </SheetHeader>
              </div>
              <div className="p-6">
                <div className="space-y-1">
                  <MobileNavItem href="/" icon={Home}>Início</MobileNavItem>
                  <MobileNavItem href="/design" icon={Palette}>Design</MobileNavItem>
                  <MobileNavItem href="/fotografia" icon={Camera}>Fotografia</MobileNavItem>
                  <MobileNavItem href="/audio" icon={Music}>Áudio</MobileNavItem>
                  <MobileNavItem href="/video" icon={Video}>Vídeo</MobileNavItem>
                  <MobileNavItem href="/tecnologia" icon={Code}>Tecnologia</MobileNavItem>
                </div>
                
                <div className="border-t border-gray-200 my-4 pt-4">
                  {isAuthenticated ? (
                    <div className="space-y-1">
                      <MobileNavItem href="/perfil" icon={User}>Meu Perfil</MobileNavItem>
                      <MobileNavItem href="/projetos" icon={Briefcase}>Meus Projetos</MobileNavItem>
                      <MobileNavItem href="/favoritos" icon={Heart}>Favoritos</MobileNavItem>
                      <MobileNavItem href="/avaliacoes" icon={Star}>Avaliações</MobileNavItem>
                      <MobileNavItem href="/configuracoes" icon={Settings}>Configurações</MobileNavItem>
                      <div className="pt-4">
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 rounded-full">
                          <Zap className="h-4 w-4 mr-2" />
                          Publicar Projeto
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full rounded-full">
                        <LogIn className="h-4 w-4 mr-2" />
                        Entrar
                      </Button>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 rounded-full">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Criar Conta
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
        "px-3 py-2 text-sm font-medium rounded-full flex items-center transition-all duration-500",
        isScrolled
          ? "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
          : "text-white hover:bg-white/20"
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
      className="flex items-center py-2 px-3 text-base font-medium rounded-lg hover:bg-pink-50 transition-colors"
    >
      <Icon className="h-5 w-5 mr-3 text-pink-500" />
      {children}
    </Link>
  )
} 